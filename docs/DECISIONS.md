# PShop launch decisions

Decided October 26, 2026, while preparing the App Store list. These are product and engineering choices for the working name PShop. They are not a lawyer’s opinion, a trademark clearance, or an Apple approval.

## Standalone app, not a ChatGPT Site

The consumer app does not read ChatGPT user headers and does not require an OpenAI account. `vite.config.ts` loads the Sites plugin only when `PSHOP_ENABLE_SITES=1`. The shipping path is `wrangler.toml`: a Cloudflare Worker with D1 (`DB`) and R2 (`BUCKET`). The database id in that file is a placeholder. The Account Holder creates the real database and bucket and keeps the API token off the repository.

## Local-first storage

IndexedDB (`pshop` / `kv`) is the source of truth for the kitchen. The app works with no account and no network. `localStorage` key `pshop-recovery` is only a fallback if IndexedDB throws, and a migration source. Optional sync uses a device bearer token `pshop_` plus 32 random bytes. The account id is `a_` plus the first 40 hex characters of SHA-256(token).

Conflict policy: a dirty local edit wins. A remote kitchen is applied only when the local copy is clean and the remote revision is newer.

The single D1 row `owner-kitchen` is not a consumer account. Consumer tokens cannot read or write it.

## Sign in with Apple and deletion

Anonymous device accounts are enough to use the app. Sign in with Apple is optional and links an Apple subject to that device account. The server checks the identity token: ES256, issuer `https://appleid.apple.com`, audience `com.cagefreecapital.pshop`, and nonce equal to the base64url SHA-256 of the raw nonce. The app does not request the name or email scopes. If the Apple subject is already linked to a different account, the server does not merge them silently.

Account deletion is in Household. The customer types DELETE. The device kitchen is cleared and, when the server is reachable, the cloud kitchen, photos, and Apple link are deleted. A tombstone makes the same token return 410 instead of recreating the account. Deletion does not cancel an Apple subscription. The paywall and the terms say that, and they link to Apple’s subscription page.

Production revocation of the Apple refresh token needs a client secret the Account Holder creates. Deletion of PShop data does not wait on that secret.

## Capacitor, not an Expo rewrite

The checklist recommended React Native with Expo. This release keeps the tested `app/page.jsx` interface and wraps it with Capacitor 7.4.3. Rewriting the interface would discard the menu, the regression tests, and the phone layout that already exists under 760px. Native pieces in the iOS project:

- Camera, photo library usage strings, and `@capacitor/camera`
- Share sheet, haptics, filesystem, status bar, splash
- Secure storage plugin for the Keychain
- Sign in with Apple plugin
- A StoreKit stub, `PShopStore`, that returns no products and no transactions

The web layer does not load a remote site. `capacitor.config.ts` has no `server.url`. Device feasibility is not proven on this machine. See `docs/IOS_BUILD.md`.

## Recognition stays on the device and in the binary

The engine is Transformers.js 3.8.1 with `HuggingFaceTB/SmolVLM-256M-Instruct`, q4 ONNX, WASM. WebGPU is not the iOS path; WKWebView WebGPU is not something this project treats as available. The worker sets `allowRemoteModels` false, `allowLocalModels` true, `localModelPath` `/models/`, and `wasmPaths` `/vendor/transformers/`. If the bundle or the weights are missing, recognition stops and the customer types the foods. The app does not download the runtime or the weights after install.

Weights are fetched at release-build time by `scripts/fetch-model.mjs` and are gitignored. That is bundling, not a runtime download. `models/MODEL.md` records the license and the rollback (ship the previous fetched files).

SmolVLM output is a suggestion. The model card says not to present unreliable text as fact. The confirmation screen says the same thing. Nothing is added until the customer confirms it. The prompt tells the model not to guess hidden food, quantities, dates, or freshness.

## What is free, and what Plus would be

Free: local kitchen, the full recipe library, manual inventory, photo confirmation, planning, the grocery list, export, and account deletion.

Plus, if the Account Holder creates it later, is an auto-renewable subscription:

- `com.cagefreecapital.pshop.plus.monthly`
- `com.cagefreecapital.pshop.plus.annual`

Plus would add sync across the customer’s own devices and cloud backup beyond 30 photos. Prices come only from StoreKit. A `paid: true` flag in the page cannot unlock Plus. Until StoreKit returns products, the paywall says purchases are unavailable. After cancellation, local data remains and cloud sync stops. No price is fixed in this repository. Real products, sandbox, and App Store Connect are Account Holder work. The stub plugin must be replaced with StoreKit 2 before Plus is offered.

## Audience, tracking, and deferred work

Adults and general households. Not the Kids category. No ads, no cross-app tracking, no App Tracking Transparency prompt, no HealthKit.

Deferred, and marked N/A on the tracker: iPad, extra countries and languages, live household sharing, Family Sharing, reminders and push, live supermarket prices, unconstrained AI recipe generation, and medical or child-directed features.

iPhone only. Deployment target iOS 17. That target is a proposal, not a measurement on the oldest phone. Uploads, as checked October 26, 2026, need Xcode 26 and the iOS 26 SDK. The SDK version and the deployment target are different numbers.

## Name, seller, and license

Working name: PShop. Bundle id placeholder: `com.cagefreecapital.pshop`. “PantryShop” is not the shipping name; PepsiCo uses PANTRY SHOP BY PEPSICO. This repository does not record a filed trademark search, and it does not claim the name is clear in every territory.

No monitored support mailbox or public domain is invented here. The Account Holder publishes those before submission.

No root `LICENSE` file. The copyright owner is not decided. Do not add a license that names Cage Free Capital LLC. The iOS app is intended to use Apple’s standard EULA, plus the service terms in `lib/legal.mjs`.

## Money language

Catalog prices are US dollar examples. Changing currency clears entered prices instead of relabeling dollars. Unknown quantities and missing prices leave the week comparison `incomplete`. The app does not show a “money saved” figure. Bought items are recorded separately from estimates.

## Recipe coverage

The proposed bar was 100 recipes and 100 ingredients. The library now has more than 100 of each (`lib/launch-library.mjs` plus the original dishes). Structural checks reject duplicate ids, missing steps, unknown ingredients, and non-positive quantities. That is not a cooking test. Dishes without their own photograph use one labeled standard-dish illustration. That does not satisfy the “photo of the actual recipe” bar.
