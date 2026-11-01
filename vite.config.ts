import vinext from "vinext";
import { defineConfig } from "vite";
import hostingConfig from "./.openai/hosting.json";
import { readExecutionProfile } from "./scripts/execution-profile.mjs";
import { configureToolEnvironment } from "./scripts/tool-environment.mjs";
import { connectorPreview } from "./scripts/vite/connector-preview-plugin.mjs";

const PLACEHOLDER_DATABASE_ID = "00000000-0000-4000-8000-000000000000";

const { d1, r2 } = hostingConfig;
const enableSites = process.env.PSHOP_ENABLE_SITES === "1";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const managedLinux = readExecutionProfile() === "managed-linux";

const localBindingConfig = {
  main: "./worker/index.ts",
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: "pshop-d1",
          database_id: PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: "pshop-r2",
        },
      ]
    : [],
};

export default defineConfig(async ({ command }) => {
  configureToolEnvironment(process.cwd());

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  const sitesPlugin = enableSites
    ? (await import("./scripts/vite/sites-vite-plugin")).sites({ mockAuth: !managedLinux })
    : null;

  return {
    server: {
      ...(managedLinux
        ? { host: "0.0.0.0", allowedHosts: ["terminal.local"] }
        : {}),
      ...(isCodexSeatbeltSandbox
        ? { watch: { useFsEvents: false, usePolling: true } }
        : {}),
    },
    plugins: [
      vinext(),
      ...(sitesPlugin ? [sitesPlugin] : []),
      connectorPreview(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        inspectorPort: false,
        // wrangler.toml may already declare DB and BUCKET. Adding them again
        // produces duplicate bindings that wrangler refuses to deploy or start.
        config: (workerConfig) => ({
          main: localBindingConfig.main,
          ...(workerConfig.d1_databases?.length ? {} : { d1_databases: localBindingConfig.d1_databases }),
          ...(workerConfig.r2_buckets?.length ? {} : { r2_buckets: localBindingConfig.r2_buckets }),
          ...(command === "serve"
            ? {
                services: [
                  {
                    binding: "CONNECTORS",
                    service: "sites-connector-preview",
                    entrypoint: "ConnectorPreview",
                  },
                ],
              }
            : {}),
        }),
        ...(command === "serve"
          ? {
              auxiliaryWorkers: [
                {
                  config: {
                    name: "sites-connector-preview",
                    main: "./scripts/connector-preview/worker.mjs",
                    compatibility_date: "2026-05-15",
                  },
                },
              ],
            }
          : {}),
      }),
    ],
  };
});
