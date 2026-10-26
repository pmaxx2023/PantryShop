# License audit

Audited October 26, 2026, for a closed-source paid iOS app. Versions below are the ones installed from `pnpm-lock.yaml` (`pnpm install --frozen-lockfile`), except the model and Transformers.js, which are not npm dependencies of this repo. License strings are the `license` field of each installed `package.json`, or the Hugging Face Hub record for models and datasets.

There is **no `LICENSE` file at the repository root.**

## Red flags

Nothing in the direct runtime set uses GPL, AGPL, SSPL, or a non-commercial / research-only license. A paid closed-source app is allowed by every license below, with the obligations and the two practical flags called out here.

1. **Runtime download of executable code and weights (distribution, not a license ban).** `public/inventory-worker.js` imports `@huggingface/transformers@3.8.1` from jsDelivr and then downloads `HuggingFaceTB/SmolVLM-256M-Instruct` (q4 ONNX) from Hugging Face on first use. Both are Apache-2.0, so the license allows bundling them in a paid app. Fetching the library as JavaScript at runtime is a poor fit for the App Store rule against downloading executable code (review guideline 2.5.2). Before submission, vendor the exact library version and the ONNX weights inside the app binary and keep the Apache notices with them. The weights are not committed in this repository.

2. **LGPL native library in the dev install only.** The lockfile overrides `miniflare` → `sharp@0.35.4` (Apache-2.0). That pulls `@img/sharp-libvips-linux-x64@1.3.3`, whose package license is **LGPL-3.0-or-later**. Application source, the worker, and the tests do not import `sharp`. Do not copy `sharp` or `libvips` into the iOS binary. Leaving it in the local Workers toolchain does not make the app a derivative of libvips.

3. **Training-data license for one upstream dataset is not stated.** The SmolVLM checkpoint itself is tagged Apache-2.0 (see below). Its card lists `HuggingFaceM4/Docmatix` (MIT) and `HuggingFaceM4/the_cauldron`. The Cauldron Hub record has no `license` field and no license tag. That is a diligence item for counsel before the weights are embedded in a paid binary, not a non-commercial clause found on the checkpoint.

4. **This repository has no proprietary notice.** Do not add an MIT, Apache, or other open-source `LICENSE` for the app. That would grant the public rights in the source, recipes, and photographs. A recommended notice is at the end of this file. Do not add it until the copyright owner is decided. Cage Free Capital LLC was a possibility, not a decision, so this audit does not name an owner.

## Runtime npm dependencies

These are `package.json` `dependencies`. MIT, ISC, and Apache-2.0 all allow closed-source commercial distribution. MIT and ISC require the copyright and permission notice to travel with substantial copies. Apache-2.0 also requires a copy of the license, retention of notices, and a statement of changes if you modify the covered work.

| Package | Locked version | License |
| --- | --- | --- |
| `@base-ui/react` | 1.7.0 | MIT |
| `@hookform/resolvers` | 5.7.1 | MIT |
| `@shadcn/react` | 0.3.0 | MIT |
| `class-variance-authority` | 0.7.1 | Apache-2.0 |
| `clsx` | 2.1.1 | MIT |
| `cmdk` | 1.1.1 | MIT |
| `date-fns` | 4.4.0 | MIT |
| `drizzle-orm` | 0.45.2 | Apache-2.0 |
| `embla-carousel-react` | 8.6.0 | MIT |
| `input-otp` | 1.4.2 | MIT |
| `lucide-react` | 1.31.0 | ISC |
| `next` | 16.3.4 | MIT |
| `next-themes` | 0.4.6 | MIT |
| `radix-ui` | 1.6.7 | MIT |
| `react` | 19.2.6 | MIT |
| `react-day-picker` | 10.0.1 | MIT |
| `react-dom` | 19.2.6 | MIT |
| `react-hook-form` | 7.85.0 | MIT |
| `react-resizable-panels` | 4.12.2 | MIT |
| `recharts` | 3.8.0 | MIT |
| `sonner` | 2.0.8 | MIT |
| `tailwind-merge` | 3.6.0 | MIT |
| `vaul` | 1.1.2 | MIT |
| `zod` | 3.25.76 | MIT |

`react-server-dom-webpack@19.2.6` is listed as a devDependency and is part of the production server bundle. Its license is MIT.

A scan of all 816 packages installed under `node_modules/.pnpm` found one copyleft license: `@img/sharp-libvips-linux-x64@1.3.3` (LGPL-3.0-or-later), described above. No GPL, AGPL, or SSPL package was present.

## Transformers.js

| Item | Detail |
| --- | --- |
| Package | `@huggingface/transformers` |
| Version loaded by the app | 3.8.1 (`public/inventory-worker.js`) |
| How it is loaded | `https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1` |
| In `package.json`? | No |
| License | Apache-2.0 (registry metadata for 3.8.1) |
| Closed-source paid app | Allowed, if the Apache-2.0 notice ships with the library |
| Extra use restriction on the license | None found |

jsDelivr is only the CDN. It does not relicense the package. The App Store problem is the runtime download, covered in red flag 1.

## SmolVLM-256M-Instruct weights

Checked against the Hugging Face model card and Hub API for `HuggingFaceTB/SmolVLM-256M-Instruct` (sha `7e3e67edbbed1bf9888184d9df282b700a323964` at the time of the API read).

| Item | Detail |
| --- | --- |
| Hub license tag | `apache-2.0` |
| Gated | No |
| Model-card statement | "We release the SmolVLM checkpoints under the Apache 2.0 license." |
| Default-branch `LICENSE` file | Not in the file list returned by the Hub API. The card text and the license tag are the grant. Keep a copy of Apache-2.0 with any weights you vendor. |
| Closed-source paid app | Allowed. Apache-2.0 is not a non-commercial or research-only license. |
| Weights in this repo | No. The browser downloads them on first recognition (about 265 MB, as described in the README). |

The worker requests `dtype: 'q4'`. The same model repo publishes the quantized ONNX files under that license tag, including:

- `onnx/decoder_model_merged_q4.onnx`
- `onnx/decoder_model_merged_q4f16.onnx`
- `onnx/embed_tokens_q4.onnx`
- `onnx/embed_tokens_q4f16.onnx`
- `onnx/vision_encoder_q4.onnx`
- `onnx/vision_encoder_q4f16.onnx`

Those q4 files are upstream artifacts, not a third-party quant with a separate license.

### Use policy on the model card

The card's "Misuse and Out-of-scope Use" section is a use policy, not an extra clause in the Apache license. It says the model is not for high-stakes decisions about a person's well-being or livelihood, and it lists prohibited misuse: scoring people (employment, education, credit), critical automated decisions, presenting unreliable text as fact, spam, disinformation, harassment, and unauthorized surveillance.

A pantry photo that suggests ingredient names, with a person confirming them before they affect the menu, is inside the card's image-understanding use. Do not let the model be the source of an allergen-safety or nutrition guarantee. The product already treats recognition as a candidate list.

### Base models and training data

| Upstream | Hub license |
| --- | --- |
| `HuggingFaceTB/SmolLM2-135M-Instruct` (text decoder) | `apache-2.0`, not gated |
| `google/siglip-base-patch16-512` (vision encoder named on the card) | `apache-2.0`, not gated |
| `HuggingFaceM4/Docmatix` | MIT, not gated |
| `HuggingFaceM4/the_cauldron` | No license field and no license tag on the dataset API |

The card says the released SmolVLM checkpoints are Apache-2.0 even though they were built on SigLIP and SmolLM2. Both of those base models are also Apache-2.0. The Cauldron gap is red flag 3.

## Fonts, icons, images, and in-repo content

| Asset | License / status |
| --- | --- |
| Font files | None in the repo. `app/globals.css` names Georgia, Times New Roman, Arial, and Helvetica. Those faces are not redistributed. |
| `lucide-react` icons used by the UI | ISC, version 1.31.0, in the table above |
| `public/favicon.svg` | Original lettermark drawn in this repo. No third-party mark. |
| `public/food/*.webp` (9 photographs) | No embedded copyright, license, EXIF, or URL strings. Prompt records in `docs/photography/` describe them as original images from the built-in image generator. No stock-photo license is in the repo. Treat them as project assets and keep the prompt records. |
| Recipes and ingredient catalog in `lib/kitchen.mjs` | First-party text in the repo. No imported dataset and no upstream license file. Confirm before launch that the wording was written for this app. |
| `vendor/shadcn-tailwind-4.13.0.css` | MIT. Notice is `vendor/shadcn-tailwind-4.13.0.LICENSE.md`, Copyright (c) 2023 shadcn. Keep that file. |
| `scripts/vite/sites-vite-plugin.ts` | MIT, vendored from `@openai/sites-vite-plugin` 0.2.0. Notice is `scripts/vite/sites-vite-plugin.LICENSE`, Copyright (c) 2026 OpenAI. Build plugin, not the iOS UI. Keep the notice. |
| `components/ui/*` | shadcn-style components. The accompanying Tailwind bundle carries the MIT notice above. Keep that notice with any substantial copy you ship. |

## DevDependencies (not the iOS binary)

Direct devDependencies are MIT, Apache-2.0, or `MIT OR Apache-2.0` (`@cloudflare/workers-types`, `wrangler`). `vinext@1.0.0-beta.5` is MIT. `typescript@5.9.3` is Apache-2.0. They are compatible with a proprietary app. The libvips exception is the override described in red flag 2, not one of these direct entries.

## What the app's own license should be

Recommended once the copyright owner is confirmed: a proprietary all-rights-reserved notice, not an open-source license. Suggested text, to be committed only after the owner is decided:

```
Copyright (c) 2026 <confirmed legal owner>. All rights reserved.

This source, the recipe text, and the food photographs are proprietary.
No license is granted to use, copy, modify, or distribute them except
under a written agreement with the copyright owner.

Third-party components remain under the licenses named in
docs/LICENSES-AUDIT.md and the license files stored next to them.
```

Until that file exists:

- Do not add a `LICENSE` that names Cage Free Capital LLC or any other entity.
- Making the GitHub repository private stops new public copies. It does not state who owns the copyright.
- The iOS binary still needs an acknowledgements surface for the MIT, ISC, and Apache-2.0 works, including Transformers.js and the SmolVLM weights if they are bundled. Apache-2.0 wants the license text, not only the name "Apache-2.0".
