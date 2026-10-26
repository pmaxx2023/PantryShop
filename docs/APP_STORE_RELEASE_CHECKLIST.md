# PantryShop — Apple App Store release checklist

Last researched and audited: **October 26, 2026**. Target: the Apple App Store, beginning with iPhone, US storefront and English. Android requires a separate Play Store release plan.

**Current release status: not ready for App Store submission.** The working product is a private, single-owner web app. The core concept and much of the business logic exist; a distributable iPhone app, reliable iPhone recognition, consumer data isolation, billing and release validation are still required.

This checklist contains **234 individually identified tasks**: 8 completed prototype foundations; 211 pre-release, submission and launch tasks; 7 post-launch tasks; and 8 conditional branches. Existing Apple account readiness is unverified, not assumed absent.

## How to use this checklist

- Check a task only when its completion criterion has evidence. Add that evidence to the accompanying CSV tracker.
- `PROTOTYPE_DONE` means completed in the current web reference. It does not certify the corresponding iPhone feature.
- `TODO` means work or release verification is outstanding. `NOT_VERIFIED` means account or administrative state must be checked.
- **Apple requirement** identifies a store rule applicable to the selected implementation; **Launch quality** identifies our own product or engineering bar; **Business/legal** covers ownership and commercial readiness.
- **Conditional** items become N/A only after the relevant feature/market is explicitly excluded. Paid-plan tasks become N/A only if V1 is changed to entirely free.
- P0 tasks are the earliest material blockers; P1 tasks are still required for their applicable release stage; P2 tasks happen after release. The launch itself requires all applicable pre-release work.
- Phase dependencies indicate sequence. Account enrollment, recipe expansion and technical work can proceed in parallel where dependencies permit; these are not requests to contact anyone or incur charges.

## Recommended implementation and launch assumptions

Use a **React Native app with an Expo development build**, sharing the existing pure JavaScript kitchen calculations. Rebuild the camera, menus, persistence and purchase flows for iPhone. Use app-owned customer storage and optional account sync. Prove the recognition engine on supported iPhones before committing to a runtime; the current approximately 265 MB browser WebGPU model has not been established as the production iPhone solution. This is an implementation recommendation, not an Apple-mandated framework.

Keep the restaurant-menu identity and the money-saving purpose central. The first useful experience should show appealing dinners from food already owned, accurately distinguish anything else needed, and minimize correction effort. The proposed 100-recipe/100-ingredient library, 100-photo evaluation set and 10-household beta are **our proposed launch bars**, not App Store minimums.

The default commercial path is a free download with a useful free experience and optional Apple In-App Purchase subscription. Final prices follow cost validation. Do not treat the previous price ideas as configured products or approved economics. The proposed initial audience is adults/general households, with no advertising or cross-app tracking. Additional markets and features are handled in the conditional section.

## First blockers and release gates

| Gate | Work to finish | Evidence required |
| --- | --- | --- |
| G0: iPhone feasibility | IOS-01 through IOS-06 and SCAN engine evaluation | A signed standalone iPhone build takes a real kitchen photo and produces editable foods and a changed menu. |
| G1: customer privacy | BACKEND and DATA ownership paths | Two unrelated customer kitchens and their images remain isolated through reads, writes, sync and deletion. |
| G2: useful pantry coverage | CONTENT, SCAN and PLAN | A representative pantry yields appealing, relevant dishes without hand-coding a new recipe for every new photo. |
| G3: trustworthy money and access | MONEY and BILLING | Quantity uncertainty, package prices, subscription purchase/restore and entitlement changes pass device tests. |
| G4: tested release candidate | QA, BETA, PRIVACY and OPS | The actual candidate passes the documented device and household tests, with support and recovery ready. |
| G5: store release | ACCOUNT, STORE and RELEASE | Required agreements/metadata are complete, Apple approves the app and relevant products, and a clean public-store installation succeeds. |

## Audited starting point

Source baseline: [pmaxx2023/PantryShop at ba6096c](https://github.com/pmaxx2023/PantryShop/commit/ba6096cf19dd460ee560405db8182e729b83212c). The matching tested Site source commit was `3f142bd55e398ee12e022a1f87646de8b620dac7`.

| Area | Evidence in the current source | Release implication |
| --- | --- | --- |
| iPhone packaging | `package.json` is a Vinext/React web project; no native iOS project is present. | Build a signed native app and device pipeline. |
| Data ownership | `app/api/kitchen/route.ts` always accesses `owner-kitchen`; photo objects are keyed by content hash. | Preserve the private demo boundary; implement ownership checks and customer isolation for consumer use. |
| Recognition | `public/inventory-worker.js` uses Transformers.js, SmolVLM and browser WebGPU. | A tester reports successful recognition, but native iPhone reliability and performance still need their own evidence. |
| Coverage | `lib/kitchen.mjs` contains 39 ingredients and 9 distinct dishes across 12 preparations. | Expand and evaluate the library and general matching behavior. |
| Commerce | No implemented StoreKit subscription flow exists in the audited source. | Implement paid products, entitlement handling, lifecycle and restore if shipping the paid plan. |
| Testing | 15 logic regressions and a successful web build; browser checks for the pumpkin path. | Keep these checks, then add physical iPhone, multi-customer, privacy and billing validation. |
| Customer controls | Export/import and prototype reset exist. | Implement production account deletion, scoped photo ownership, full schema validation and robust recovery. |

## Account Holder actions

The legal Account Holder must complete identity/enrollment, sign the applicable Apple agreements, supply accepted tax/banking details and authorize actual payments. The checklist assigns those actions explicitly. Engineering, content, design and documentation can be prepared before those account actions are complete. This document does not initiate a purchase, enrollment, invitation or submission.

## Existing foundation — completed only at web-prototype scope

Owner: **Engineering**. Dependencies: **None**. Applies: **V1**.

- [x] **BASE-01 — Keep the full app source in the PantryShop GitHub repository.** Complete when: The audited source is present on main at ba6096cf19dd460ee560405db8182e729b83212c.
- [x] **BASE-02 — Establish the restaurant-style Today’s Specials design.** Complete when: The existing web menu provides the accepted visual direction for the iPhone implementation.
- [x] **BASE-03 — Supply original starter dishes and dinner imagery.** Complete when: The source contains 9 distinct dishes, 12 preparations, 39 catalog ingredients and 9 original generated food photographs.
- [x] **BASE-04 — Implement the initial photo upload and editable ingredient review.** Complete when: Web upload, storage and review controls exist; native iPhone capture and recognition acceptance remain open below.
- [x] **BASE-05 — Connect confirmed pumpkin to matching specials.** Complete when: The saved custom label is normalized, matching dishes are featured, and uncertain units require confirmation.
- [x] **BASE-06 — Implement the initial planning, household and grocery logic.** Complete when: Per-person adaptations, week locking, quantities, whole-pack estimates and cooking deductions exist in the prototype.
- [x] **BASE-07 — Establish a regression-test baseline.** Complete when: The 15 pure-logic checks and production web build passed for the audited source; this is not iPhone release certification.
- [x] **BASE-08 — Publish a private working web reference.** Complete when: The private preview is available as the design and behavior reference; it still uses a single-owner kitchen.

## 1. Define the release and its commercial promise

Owner: **Product / PM**. Dependencies: **BASE**. Applies: **V1**.

- [ ] **SCOPE-01 — Write the V1 promise in one sentence.** Complete when: Positioning says: photograph your kitchen, discover appealing dinners from food you own, and reduce additional grocery spending.
- [ ] **SCOPE-02 — Set the initial release scope.** Complete when: Record iPhone first, US storefront, English, consumer households and no advertising as the working launch scope.
- [ ] **SCOPE-03 — Set the free experience and paid benefits.** Complete when: Document exactly what is free, what requires a subscription, and what remains available after cancellation.
- [ ] **SCOPE-04 — Choose a first-use path that delivers value.** Complete when: A new customer can explore and use a local kitchen before optional account-based cloud sync; no developer or ChatGPT account is required.
- [ ] **SCOPE-05 — Specify the complete core customer journey.** Complete when: The acceptance script covers photo, review, quantities, refreshed menu, recipe, plan, grocery gaps, cooking and updated inventory.
- [ ] **SCOPE-06 — Define supported household preferences.** Complete when: Mixed diets and portions have a written support matrix, including combinations the app cannot safely adapt.
- [ ] **SCOPE-07 — Set the recipe-coverage launch target.** Complete when: Use 100 reviewed original or licensed recipes and at least 100 common ingredients as a proposed product bar; this is not an Apple rule.
- [ ] **SCOPE-08 — Set measurable photo-recognition and usability targets.** Complete when: Agree benchmark thresholds before beta; measure name precision, visible-food recall, correction effort and time to the first useful menu.
- [ ] **SCOPE-09 — Separate estimates from measured savings.** Complete when: The app distinguishes additional purchase estimates, planned spending, actual purchases and savings supported by an explicit comparison.
- [ ] **SCOPE-10 — Set feature exclusions and conditional decisions.** Complete when: Record whether reminders, live household sharing, cloud AI, iPad support and Apple Family Sharing are included or deferred.
- [ ] **SCOPE-11 — Assign release responsibility and an expense budget.** Complete when: Product, engineering, design, QA, support and Apple Account Holder roles have named owners and approved spending limits before work that incurs charges.

Primary references: [A01](#primary-sources).

## 2. Establish the business and Apple account

Owner: **PM / Apple Account Holder**. Dependencies: **SCOPE**. Applies: **V1**.

- [ ] **ACCOUNT-01 — Check the PantryShop name and original brand.** **Business/legal.** Complete when: App-name availability and relevant trademark conflicts are checked; final branding can be used in every launch territory.
- [ ] **ACCOUNT-02 — Verify the existing Apple Developer account.** **Not verified.** Complete when: Record membership state, legal owner, team ID, access and renewal date; an account has not been verified in this audit.
- [ ] **ACCOUNT-03 — Choose the correct legal seller.** **Business/legal.** Complete when: Decide individual or organization enrollment; understand that the individual legal name or organization name appears as seller.
- [ ] **ACCOUNT-04 — Complete organization verification if applicable.** **Apple requirement.** Complete when: The legal entity, authority, company website and D-U-N-S details satisfy enrollment requirements when enrolling an organization.
- [ ] **ACCOUNT-05 — Complete enrollment and membership payment if needed.** **Apple requirement.** Complete when: Membership is active; Apple currently lists USD 99 per year, with regional prices or eligible waivers handled in enrollment.
- [ ] **ACCOUNT-06 — Secure the Account Holder and team access.** **Apple requirement.** Complete when: Two-factor authentication is enabled and team roles grant only the access needed for building, finance and release.
- [ ] **ACCOUNT-07 — Accept the required Apple agreements.** **Apple requirement.** Complete when: The authorized Account Holder completes applicable developer and paid-app agreements; no pending agreement blocks distribution or purchases.
- [ ] **ACCOUNT-08 — Complete tax and banking setup for paid sales.** **Apple requirement.** Complete when: Business information is accepted in App Store Connect, including any required identity or beneficial-owner verification.
- [ ] **ACCOUNT-09 — Assess Small Business Program eligibility.** **Business/legal.** Complete when: Enroll if eligible and confirm acceptance before modeling the reduced commission; do not assume the 15% rate automatically applies.
- [ ] **ACCOUNT-10 — Declare DSA trader status.** **Apple requirement.** Complete when: The required declaration is completed even for a US-only launch; EU distribution additionally requires applicable trader verification and displayed contact information.
- [ ] **ACCOUNT-11 — Establish public customer contact details.** **Business/legal.** Complete when: A working support address, business contact and public website domain are under our control.
- [ ] **ACCOUNT-12 — Document ownership and third-party licenses.** **Business/legal.** Complete when: Contributor rights, source dependencies, model weights, fonts, photos and recipe-content rights have a recorded owner and permitted use.

Primary references: [A03](#primary-sources), [A09](#primary-sources), [A14](#primary-sources).

## 3. Create a distributable iPhone app

Owner: **Engineering**. Dependencies: **SCOPE; ACCOUNT for device signing**. Applies: **V1**.

- [ ] **IOS-01 — Record the mobile implementation decision.** Complete when: Recommended route: React Native with an Expo development build, sharing the pure kitchen logic and rebuilding device-facing UI; a technical spike confirms feasibility.
- [ ] **IOS-02 — Create the iOS project and shared logic package.** Complete when: The app installs independently and shared calculations have one maintained source with a stable data schema.
- [ ] **IOS-03 — Register the production bundle identifier and capabilities.** **Apple requirement.** Complete when: Bundle ID, App Store Connect app record, signing team and required capabilities agree; identifiers are recorded for future updates.
- [ ] **IOS-04 — Set supported devices and minimum iOS version.** Complete when: The deployment target follows tested recognition and memory support; iPad targeting is an explicit decision.
- [ ] **IOS-05 — Configure native camera, photo selection and file handling.** Complete when: A signed development build captures or selects an actual photo on an iPhone using production-intended native modules.
- [ ] **IOS-06 — Prove the complete photo-to-menu path on hardware early.** Complete when: A real iPhone photo yields editable ingredients and an updated menu in a standalone development build before the full UI port proceeds.
- [ ] **IOS-07 — Bundle or safely deliver runtime dependencies.** Complete when: Production does not depend on the current browser worker importing executable JavaScript from a CDN; runtime and asset delivery are documented and policy-checked.
- [ ] **IOS-08 — Use a compliant current build toolchain.** **Apple requirement.** Complete when: As checked on October 26, 2026, uploads require Xcode 26+ and iOS 26 SDK+; verify the current rule again at upload and distinguish SDK version from minimum supported iOS.
- [ ] **IOS-09 — Configure development, staging and production builds.** Complete when: Each environment has separate identifiers or configuration, isolated data and a clear route to its matching backend.
- [ ] **IOS-10 — Set up protected signing and build credentials.** Complete when: Certificates, provisioning, App Store Connect API access and recovery ownership are secured outside the public repository.
- [ ] **IOS-11 — Create a reproducible build and upload pipeline.** Complete when: A clean checkout produces the signed release archive using a Mac/Xcode environment or supported macOS cloud build service.
- [ ] **IOS-12 — Version the binary and retain release artifacts.** Complete when: Marketing version, unique build number, source commit, dependency lockfile, archive and symbol files are recorded together.

Primary references: [A01](#primary-sources), [A02](#primary-sources), [E01](#primary-sources), [E02](#primary-sources).

## 4. Make photo inventory dependable

Owner: **Engineering / QA**. Dependencies: **IOS early device build; SCOPE**. Applies: **V1**.

- [ ] **SCAN-01 — Choose the production recognition engine using device evidence.** Complete when: Native on-device inference, hosted inference or a documented hybrid passes the actual iPhone benchmark; current desktop/browser behavior is not treated as proof.
- [ ] **SCAN-02 — Create a representative consented photo benchmark.** Complete when: At least 100 test photos cover refrigerators, freezers, pantry shelves, loose produce, packaged goods, leftovers, glare, occlusion and low light; hold out evaluation photos.
- [ ] **SCAN-03 — Measure recognition quality and correction effort.** Complete when: Report precision and recall on supported visible foods, unsupported-food behavior and corrections required per photo against the previously agreed release targets.
- [ ] **SCAN-04 — Read package labels and distinguish related products.** Complete when: Plain pumpkin, pie filling, fresh pumpkin, similar cans, brands and preparation states are not silently conflated; unreadable dates and food freshness are never guessed.
- [ ] **SCAN-05 — Recognize or confirm useful quantities and units.** Complete when: Net weight, volume, count, drained weight, partial packs and ambiguous labels have explicit handling; a count is never silently converted to grams.
- [ ] **SCAN-06 — Normalize names to recipe ingredients.** Complete when: Singular/plural forms, accents, OCR punctuation and common aliases connect to the catalog while preserving the original recognized label for correction.
- [ ] **SCAN-07 — Handle unfamiliar ingredients without a silent dead end.** Complete when: Supported matching recipes are searched; otherwise the app explains that the food is saved but not yet matched and offers a useful next action.
- [ ] **SCAN-08 — Prevent double-counting across photos.** Complete when: Overlapping shelf images and repeated scans reconcile the same stock; two genuinely separate packages can still be recorded separately.
- [ ] **SCAN-09 — Make confirmation quick and understandable.** Complete when: Users can accept, remove, rename, rematch and correct amounts for suggestions before they affect fully-on-hand claims.
- [ ] **SCAN-10 — Refresh specials when confirmed inventory changes.** Complete when: Photo confirmation, manual corrections, purchases and cooking update matching and ranking immediately, including the existing pumpkin regression.
- [ ] **SCAN-11 — Handle empty, failed and interrupted scans.** Complete when: Blur, no food, network failure, cancellation, app backgrounding and runtime errors recover without losing photos or inventing food.
- [ ] **SCAN-12 — Bound memory, latency and battery use.** Complete when: Scan performance is measured on the oldest supported iPhone; memory pressure, thermal limits and low-power mode do not cause unrecovered crashes.
- [ ] **SCAN-13 — Handle model download and caching if used.** Complete when: Disclose a required first-use download and its size, obtain the applicable user confirmation, show progress, support retry and avoid downloading it on every launch.
- [ ] **SCAN-14 — Version models and benchmark updates.** Complete when: Model/runtime versions, licenses, evaluation results and a rollback path accompany every recognition change.

Primary references: [A01](#primary-sources), [A04](#primary-sources), [A05](#primary-sources).

## 5. Supply enough reliable recipes and appealing imagery

Owner: **Content / Design / Engineering**. Dependencies: **SCOPE; SCAN ingredient taxonomy**. Applies: **V1**.

- [ ] **CONTENT-01 — Expand the ingredient catalog for ordinary kitchens.** Complete when: The agreed launch list covers common produce, proteins, grains, cans, freezer items, staples and common substitutions with canonical units.
- [ ] **CONTENT-02 — Build the reviewed recipe library.** Complete when: The agreed recipe target is met with original or properly licensed content; serving amounts, steps, time and equipment are complete.
- [ ] **CONTENT-03 — Design matching for combinations of owned ingredients.** Complete when: Menu candidates use the confirmed pantry and practical substitutions across the full library, rather than adding one bespoke recipe whenever a tester scans a new food.
- [ ] **CONTENT-04 — Validate each recipe’s ingredient accounting.** Complete when: Every required ingredient appears in the list, optional garnish is clearly optional and quantities scale correctly.
- [ ] **CONTENT-05 — Validate preparation and cooking instructions.** Complete when: Raw/cooked state, time, doneness and replacement-product instructions are reviewed and cooking-tested for the launch library.
- [ ] **CONTENT-06 — Validate dietary adaptations.** Complete when: Each supported adaptation is culinarily workable and accurately named; unsupported combinations are excluded or explained.
- [ ] **CONTENT-07 — Review allergy and nutrition wording.** Complete when: Preference matching does not promise allergen safety; nutrition is either supported by a defined calculation method or clearly presented as an estimate.
- [ ] **CONTENT-08 — Create the complete food-photo set.** Complete when: Every launch dish has an original or licensed, exceptionally appetizing image that reflects its actual recipe and ordinary achievable portions.
- [ ] **CONTENT-09 — Check photo-to-recipe consistency.** Complete when: Images do not quietly add unlisted food; materially different dietary variants have suitable images or a clear standard-dish label.
- [ ] **CONTENT-10 — Optimize and cache recipe assets.** Complete when: Photos remain sharp on supported screens and load without excessive download, storage or menu jank.
- [ ] **CONTENT-11 — Remove incumbent reference material from the shipping product.** **Apple requirement.** Complete when: third-party product screenshots, screen maps, and competitor branding are excluded from the consumer binary and public product content; our own identity is clear.
- [ ] **CONTENT-12 — Establish content publishing and rollback.** Complete when: Recipes have stable IDs and versions, and a corrected recipe cannot silently invalidate a locked customer plan or its grocery quantities.

Primary references: [A01](#primary-sources), [A04](#primary-sources).

## 6. Make the money-saving calculations trustworthy

Owner: **Engineering / Product / QA**. Dependencies: **CONTENT; SCOPE**. Applies: **V1**.

- [ ] **MONEY-01 — Validate units and conversion rules.** Complete when: Grams, ounces, milliliters, fluid ounces, counts, can sizes and drained weights are represented and converted without mixing mass and volume.
- [ ] **MONEY-02 — Retain uncertainty rather than treating it as zero stock.** Complete when: An unknown quantity triggers confirmation, does not qualify a meal as fully on hand and does not automatically recommend rebuying the same item.
- [ ] **MONEY-03 — Validate whole-package purchase estimates.** Complete when: Missing requirements round to actual pack sizes and use customer-entered or correctly sourced package prices.
- [ ] **MONEY-04 — Show price assumptions clearly.** Complete when: Currency, location, retailer, date or example-price status are visible; example prices are not presented as live supermarket prices.
- [ ] **MONEY-05 — Aggregate requirements across the whole week.** Complete when: Multiple meals compete for the same stock, and shared ingredients and purchases are counted once.
- [ ] **MONEY-06 — Keep prices and unit labels consistent.** Complete when: Changing currency does not merely relabel unconverted amounts; the user resets prices or receives an explicitly supported conversion.
- [ ] **MONEY-07 — Verify budget comparisons with incomplete data.** Complete when: Unknown quantities or missing prices cannot produce a false complete total or an unsupported under-budget claim.
- [ ] **MONEY-08 — Define what a savings number means.** Complete when: Any displayed savings identifies its comparison and time period; pantry value and food consumed are not automatically counted as money saved.
- [ ] **MONEY-09 — Record actual purchases separately from estimates.** Complete when: Marking bought records the right amount, updates stock once and preserves a clear estimated-versus-actual cost distinction.
- [ ] **MONEY-10 — Test cooking, leftovers, waste and corrections.** Complete when: Inventory updates conserve stock, refuse insufficient confirmed amounts and allow correction without duplicate spending or negative quantities; use-first cues reflect entered dates or user priorities.

Primary references: [A01](#primary-sources).

## 7. Finish household planning and grocery consistency

Owner: **Engineering / QA**. Dependencies: **CONTENT; MONEY**. Applies: **V1**.

- [ ] **PLAN-01 — Port all recipe and menu interactions.** Complete when: Search, filters, favorites, servings, steps, ratings and cooking actions work in the iPhone app.
- [ ] **PLAN-02 — Support mixed diets and portions together.** Complete when: Per-person restrictions and portion sizes combine without applying one eater’s substitution to everyone.
- [ ] **PLAN-03 — Respect practical cooking preferences.** Complete when: Cooking days, equipment, preparation time and ingredient exclusions affect actual generated plans.
- [ ] **PLAN-04 — Make substitutions and missing ingredients visible.** Complete when: The menu distinguishes fully covered dishes, confirm-amount dishes and meals needing additional groceries.
- [ ] **PLAN-05 — Generate a varied useful week.** Complete when: The planner uses available quantities and perishables while avoiding unnecessary purchases and monotonous repetition.
- [ ] **PLAN-06 — Preserve the lock between plan and grocery list.** Complete when: Recipe swaps, portion changes and household changes show the ingredient and spending delta before a locked week changes.
- [ ] **PLAN-07 — Handle recipe edits and removals in existing plans.** Complete when: Saved recipe versions or a clear reconciliation step preserve the customer’s shopping expectations.
- [ ] **PLAN-08 — Make grocery lists useful in a store.** Complete when: Aisle grouping, quantity, pack size, check-off, manual additions and sharing remain readable and consistent.
- [ ] **PLAN-09 — Support safe undo for common mistakes.** Complete when: Accidental bought, cooked, delete and plan changes have a reliable correction or undo path.
- [ ] **PLAN-10 — Ensure sample content remains clearly separate.** Complete when: Demo ingredients never contaminate a customer’s real pantry; sample and real modes are unmistakable.

## 8. Finish native iPhone usability and accessibility

Owner: **Design / Engineering / QA**. Dependencies: **IOS; PLAN; SCAN**. Applies: **V1**.

- [ ] **UX-01 — Port the accepted visual design to native screens.** Complete when: Today’s Specials retains the restaurant-menu feel and beautiful dinner photography at real iPhone sizes.
- [ ] **UX-02 — Build clear first-run guidance.** Complete when: The app explains the money-saving benefit, guides the first useful photo and lets users explore without a tutorial blockade.
- [ ] **UX-03 — Handle camera access at the moment of need.** Complete when: Permission explanations are specific; denied access offers library selection or manual entry and a path to system settings.
- [ ] **UX-04 — Support appropriate image inputs.** Complete when: HEIC, JPEG, PNG, rotated photos, large photos and limited-library selection work without blank previews or orientation errors.
- [ ] **UX-05 — Make corrections easy with one hand.** Complete when: Food matching, can size, partial quantities and locations can be corrected without long forms.
- [ ] **UX-06 — Handle all loading, empty and error states.** Complete when: Every screen and asynchronous action has clear progress, recovery and an appropriate next step.
- [ ] **UX-07 — Respect system layout and interaction.** Complete when: Safe areas, keyboard avoidance, back navigation, sheets, alerts and touch targets work across supported sizes.
- [ ] **UX-08 — Support VoiceOver for core tasks.** Complete when: Photo review, menu cards, quantities, recipe steps, plan changes and purchases have useful labels, order and announcements.
- [ ] **UX-09 — Support larger text and sufficient contrast.** Complete when: The core journey remains usable at accessibility text sizes; important state is not conveyed by color alone.
- [ ] **UX-10 — Support reduced motion and accessible controls.** Complete when: Animations can be reduced and focus is restored after dialogs or errors.
- [ ] **UX-11 — Respect display appearance and content readability.** Complete when: Supported light/dark appearances, long food names, currency amounts and imagery remain readable.
- [ ] **UX-12 — Provide a practical cooking view.** Complete when: Steps stay readable, accidental navigation is recoverable and any keep-screen-awake option is user-controlled.
- [ ] **UX-13 — Make settings and customer controls discoverable.** Complete when: Preferences, privacy, support, export, account deletion and subscription management have clear paths.

Primary references: [A16](#primary-sources), [A19](#primary-sources).

## 9. Replace single-owner storage with secure customer storage

Owner: **Backend / Security**. Dependencies: **SCOPE; IOS architecture decision**. Applies: **V1**.

- [ ] **BACKEND-01 — Design customer and kitchen ownership explicitly.** Complete when: Account, guest installation, kitchen, eater profile and optional membership identities have an agreed data model.
- [ ] **BACKEND-02 — Replace the global owner-kitchen record for consumer use.** Complete when: Every cloud kitchen is scoped to its verified owner; the existing private demo is never exposed as the consumer backend.
- [ ] **BACKEND-03 — Implement app-owned authentication for optional sync.** Complete when: Sign-in, sign-out, session refresh, secure credential storage and recovery work independently of the private ChatGPT Site gate.
- [ ] **BACKEND-04 — Implement Sign in with Apple for the chosen account path.** Complete when: Identity tokens, nonce, issuer, audience and account linking are validated; any additional login options meet current Apple login rules.
- [ ] **BACKEND-05 — Authorize every kitchen operation on the server.** Complete when: Reads, writes, exports, recognition requests and deletion enforce the authenticated customer or kitchen membership.
- [ ] **BACKEND-06 — Authorize every photo operation on the server.** Complete when: Photo upload, view and delete enforce ownership; knowing a hash or URL never grants access to another household’s photo.
- [ ] **BACKEND-07 — Scope deduplication and deletion correctly.** Complete when: Identical uploads across households cannot cause cross-household data sharing or allow one customer to delete another customer’s image.
- [ ] **BACKEND-08 — Replace web-only same-origin assumptions.** Complete when: The native API has deliberate authentication, request validation and abuse controls; a native request origin is not used as proof of identity.
- [ ] **BACKEND-09 — Validate the full data schema.** Complete when: Imports and API writes validate IDs, types, finite quantities, prices, limits and schema versions rather than only checking top-level arrays.
- [ ] **BACKEND-10 — Make writes resilient and idempotent.** Complete when: Retries of scans, purchases, cooking and saves do not duplicate records or lose changes.
- [ ] **BACKEND-11 — Handle multiple devices and concurrent edits.** Complete when: A documented conflict policy preserves customer edits instead of relying on repeated manual reloads.
- [ ] **BACKEND-12 — Separate environments and secrets.** Complete when: Production data, credentials and storage are isolated from demos, development and test accounts; keys remain server-side.
- [ ] **BACKEND-13 — Enforce service limits.** Complete when: Photo size, scan frequency, storage quotas and request rate limits prevent abuse and uncontrolled costs without trapping legitimate customers.
- [ ] **BACKEND-14 — Prove isolation with two unrelated customer accounts.** Complete when: Automated authorization checks and manual device tests confirm that one household cannot view or modify the other’s kitchen or photos.
- [ ] **BACKEND-15 — Review dependencies and external requests.** Complete when: Production dependencies are pinned and reviewed, unnecessary prototype packages removed, and sensitive values excluded from logs and public source.

Primary references: [A04](#primary-sources), [A06](#primary-sources).

## 10. Make persistence, deletion and recovery production-ready

Owner: **Engineering / Operations**. Dependencies: **BACKEND; IOS storage choice**. Applies: **V1**.

- [ ] **DATA-01 — Implement reliable local storage.** Complete when: Inventory, plan, grocery list and settings survive app restarts and operate without relying on browser localStorage.
- [ ] **DATA-02 — Store sessions and sensitive local material appropriately.** Complete when: Credentials use secure platform storage, local caches are scoped to the signed-in person and device backup behavior is deliberate.
- [ ] **DATA-03 — Define offline behavior and synchronization.** Complete when: The core kitchen and saved recipes remain useful offline; pending changes and reconnect conflicts have visible, tested handling.
- [ ] **DATA-04 — Create a safe migration path for existing data.** Complete when: The current pumpkin item, photos, recipes and plans can be exported or migrated with consent and rollback; prior quantities are not silently reinterpreted.
- [ ] **DATA-05 — Add complete export and import validation.** Complete when: Export includes the promised data, import round-trips supported fields and malformed or oversized files fail safely.
- [ ] **DATA-06 — Define photo retention and metadata handling.** Complete when: The policy specifies original versus compressed images, cache lifetime, EXIF/location removal and any vendor retention.
- [ ] **DATA-07 — Implement complete deletion paths.** Complete when: Single-photo, kitchen reset, guest-data removal and account deletion remove the appropriate cloud, local and cached data.
- [ ] **DATA-08 — Set backup and restoration procedures.** Complete when: Production data has defined backup frequency, retention and a rehearsed restoration process with access controls.
- [ ] **DATA-09 — Prevent deleted data from reappearing.** Complete when: Sync queues, backups, restored sessions and model caches cannot resurrect a deliberately deleted kitchen or account.
- [ ] **DATA-10 — Monitor migrations and integrity.** Complete when: Schema upgrades, partial migrations and recovery failures are observable without logging private kitchen contents.

Primary references: [A04](#primary-sources), [A06](#primary-sources).

## 11. Complete privacy, permissions and customer terms

Owner: **Product / Privacy / Engineering**. Dependencies: **BACKEND; DATA; SCAN engine decision**. Applies: **V1**.

- [ ] **PRIVACY-01 — Map all collected and shared data.** Complete when: Record food photos, household preferences, identifiers, purchases, usage, diagnostics and every service or SDK that receives them.
- [ ] **PRIVACY-02 — Review launch-region privacy obligations.** **Business/legal.** Complete when: The legal operator, customer locations, retention and data-subject rights have an appropriate documented review for the selected markets.
- [ ] **PRIVACY-03 — Publish an accurate accessible privacy policy.** **Apple requirement.** Complete when: A public URL and an in-app link explain actual collection, use, vendors, retention and deletion; access does not require app login.
- [ ] **PRIVACY-04 — Publish customer terms and the applicable license.** **Business/legal.** Complete when: Terms cover the service and billing behavior, and the Apple standard EULA or a reviewed custom EULA is selected consistently.
- [ ] **PRIVACY-05 — Complete accurate App Privacy answers.** **Apple requirement.** Complete when: App Store disclosures reflect production behavior and third-party SDKs, with linked-data and tracking classifications supported by the data map.
- [ ] **PRIVACY-06 — Add required privacy manifests and API reasons.** **Apple requirement.** Complete when: The app and applicable SDKs include valid manifests and approved reasons for covered APIs; the archive’s privacy report is reviewed.
- [ ] **PRIVACY-07 — Verify SDK signature obligations.** **Apple requirement.** Complete when: Listed SDKs, including any wrappers, satisfy Apple’s applicable manifest and binary-signature requirements.
- [ ] **PRIVACY-08 — Audit permission purpose strings and entitlements.** **Apple requirement.** Complete when: Camera and any requested photo or notification access match actual features; unnecessary permissions are removed and limited access works.
- [ ] **PRIVACY-09 — Add required consent if personal data reaches a third-party AI service.** **Apple requirement.** Complete when: The app explains the destination and purpose and obtains the required explicit permission before sharing; an on-device claim is used only when true.
- [ ] **PRIVACY-10 — Provide in-app account deletion if accounts can be created.** **Apple requirement.** Complete when: The user can initiate real deletion in the app, revoke the relevant sign-in credentials and receive a clear explanation of any legally retained records.
- [ ] **PRIVACY-11 — Distinguish account deletion from subscription cancellation.** Complete when: Deletion does not misleadingly imply Apple billing stops; management links and immediate deletion remain available.
- [ ] **PRIVACY-12 — Confirm the intended audience and data practices.** Complete when: The app is not presented as a Kids Category service; changes involving children or sensitive health data trigger the additional branch below.
- [ ] **PRIVACY-13 — Document the no-tracking decision.** Complete when: Audit analytics and vendors against that decision; add App Tracking Transparency only if actual tracking is introduced and eligible functionality remains usable after refusal.
- [ ] **PRIVACY-14 — Validate privacy end to end on a real build.** Complete when: Network observation, SDK configuration and deletion tests agree with policy wording and App Store answers.

Primary references: [A01](#primary-sources), [A04](#primary-sources), [A05](#primary-sources), [A06](#primary-sources), [A15](#primary-sources).

## 12. Build and verify App Store subscriptions

Owner: **Engineering / PM / Finance**. Dependencies: **ACCOUNT; BACKEND; SCOPE paid plan**. Applies: **V1**.

- [ ] **BILLING-01 — Check unit economics before fixing prices.** Complete when: Monthly and annual prices cover applicable Apple commission, taxes, infrastructure, recognition, support and a realistic heavy-user allowance.
- [ ] **BILLING-02 — Verify the lower-price comparison.** Complete when: Compare the same region, duration and included features against current competitor offers before making a lower-price marketing claim.
- [ ] **BILLING-03 — Create the chosen subscription products.** **Apple requirement.** Complete when: Product IDs, subscription group, levels, durations, availability, localization and base-region prices match the planned paid benefits.
- [ ] **BILLING-04 — Use StoreKit-based Apple In-App Purchase for the chosen digital plan.** **Apple requirement.** Complete when: The native purchase library works in the development and production builds; ordinary iOS digital upgrades use the planned Apple purchase flow.
- [ ] **BILLING-05 — Read live product and price information.** Complete when: Paywall prices, currency, duration and introductory eligibility come from StoreKit instead of hard-coded marketing values.
- [ ] **BILLING-06 — Make the paywall unambiguous.** **Apple requirement.** Complete when: Benefits, total charge, billing interval, auto-renewal, trial terms if any, terms and privacy links are clearly accessible before purchase.
- [ ] **BILLING-07 — Validate signed transactions and entitlements.** Complete when: The app and backend verify purchases, handle current entitlements and finish transactions without trusting a client-side paid flag.
- [ ] **BILLING-08 — Map purchases to the right person or household.** Complete when: Guest purchases, account creation, sign-out and account switching have a documented policy that prevents entitlement leakage or accidental loss.
- [ ] **BILLING-09 — Implement a visible restore-purchases path.** **Apple requirement.** Complete when: Reinstalling or using another eligible device restores the correct entitlement with a useful result message.
- [ ] **BILLING-10 — Provide subscription management and customer support.** Complete when: Users can reach Apple’s subscription management and relevant refund-support path without confusing an app-account action with billing cancellation.
- [ ] **BILLING-11 — Handle the full subscription lifecycle.** Complete when: Purchase cancellation, pending approval, renewal, upgrade/downgrade, expiration, refund, revocation, billing retry and grace period are handled correctly.
- [ ] **BILLING-12 — Secure and reconcile server billing events.** Complete when: Notifications are validated, duplicate or out-of-order events are safe, and periodic reconciliation corrects missed events.
- [ ] **BILLING-13 — Test purchases in StoreKit and Apple sandbox.** Complete when: Success, failure, interrupted purchase, trial eligibility, restore, multiple devices and signed-in/out states have recorded outcomes.
- [ ] **BILLING-14 — Test free and expired states.** Complete when: An expired subscription cannot unlock paid server work; customers can still access their data and clearly understand available free functions.
- [ ] **BILLING-15 — Prepare product review information.** **Apple requirement.** Complete when: Required localized names, descriptions and review screenshots accurately show the purchasable experience.
- [ ] **BILLING-16 — Include the first relevant In-App Purchases with an app version submission.** **Apple requirement.** Complete when: The app and the first subscription of its type are in the correct review submission; submission readiness is verified in the current console.

Primary references: [A01](#primary-sources), [A07](#primary-sources), [A08](#primary-sources), [A09](#primary-sources), [A17](#primary-sources), [E02](#primary-sources).

## 13. Complete release testing on real devices

Owner: **QA / Engineering**. Dependencies: **IOS; SCAN; CONTENT; MONEY; PLAN; UX; BACKEND; DATA; PRIVACY; BILLING**. Applies: **V1**.

- [ ] **QA-01 — Maintain and extend the logic regression suite.** Complete when: Tests cover pumpkin migration and refresh, new catalog foods, quantities, matching, portions, purchases, locks and migrations.
- [ ] **QA-02 — Test the entire first-use customer journey.** Complete when: A clean installation can scan real food, correct it, find a suitable dinner and form a consistent grocery list without help.
- [ ] **QA-03 — Test core journeys for free and paid customers.** Complete when: New, returning, expired, restored and offline customers see the correct usable experience and entitlements.
- [ ] **QA-04 — Test the smallest and oldest supported iPhones.** Complete when: Real hardware covers the declared minimum OS and memory baseline as well as a current device and latest supported OS.
- [ ] **QA-05 — Test camera and photo edge cases.** Complete when: Permission denial, limited library, HEIC, rotation, very large files, partial uploads and background interruption recover correctly.
- [ ] **QA-06 — Test network and lifecycle changes.** Complete when: Slow or absent connectivity, Wi-Fi/cellular switching, app kill/relaunch, low storage, low-power mode and expired sessions preserve the kitchen.
- [ ] **QA-07 — Test data ownership and destructive controls.** Complete when: Two-household isolation, sign-out, export, deletion, reset and backup restoration match their documented behavior.
- [ ] **QA-08 — Test quantity and recipe edge cases.** Complete when: Single servings, large portions, partial cans, duplicate photos, unavailable substitutes and food depletion produce valid results.
- [ ] **QA-09 — Test concurrent activity.** Complete when: Two devices editing or cooking at once cannot create negative stock, ghost meals, duplicated purchases or lost confirmed data.
- [ ] **QA-10 — Test billing failure and recovery on physical devices.** Complete when: StoreKit and backend states stay consistent through interrupted purchases, restore and Apple sandbox lifecycle changes.
- [ ] **QA-11 — Run the accessibility acceptance journey.** Complete when: VoiceOver, larger text, contrast, focus, keyboard and reduced-motion checks pass for the common tasks we claim to support.
- [ ] **QA-12 — Benchmark app and scan performance.** Complete when: Startup, menu rendering, photo upload, inference, memory and battery measurements meet the agreed targets on the supported baseline device.
- [ ] **QA-13 — Review security, privacy and supply-chain findings.** Complete when: Critical authorization, data-loss, secret exposure and dependency issues are fixed and verified in the actual release candidate.
- [ ] **QA-14 — Exercise a realistic meal cycle.** Complete when: Consented beta households scan, plan, shop, cook and correct stock over at least one week; drift and recurring friction are measured.
- [ ] **QA-15 — Close release-blocking defects with evidence.** Complete when: There are no unresolved crashes, cross-customer access, data loss, false fully-on-hand claims or paid-access failures; remaining minor defects have explicit disposition.

Primary references: [A01](#primary-sources), [A19](#primary-sources).

## 14. Prepare the App Store listing and compliance record

Owner: **Product / Design / Apple Account Holder**. Dependencies: **ACCOUNT; production feature set; QA evidence**. Applies: **V1**.

- [ ] **STORE-01 — Complete the app’s core record.** **Apple requirement.** Complete when: Platform, bundle ID, SKU, primary language, display name and ownership match the signed app.
- [ ] **STORE-02 — Write the app name, subtitle, description and keywords.** Complete when: Current field limits are checked; copy focuses on appetizing meals from owned food and accurate savings-related benefits.
- [ ] **STORE-03 — Choose appropriate categories and copyright details.** Complete when: Food & Drink is the working primary category, and category, copyright holder and contact details are consistent across the app and console.
- [ ] **STORE-04 — Complete current age-rating questions.** **Apple requirement.** Complete when: Answers describe the actual app, including AI or user-content capabilities if present; the rating is generated rather than guessed.
- [ ] **STORE-05 — Provide the required app icon assets.** **Apple requirement.** Complete when: Native and marketing icon assets meet current Xcode/App Store validation and are distinct from competitors.
- [ ] **STORE-06 — Capture required device screenshots from the release candidate.** **Apple requirement.** Complete when: The accepted device-size slots in the current console are filled with real app UI; the existing desktop web screenshot is not used as an iPhone capture.
- [ ] **STORE-07 — Create persuasive screenshot captions.** Complete when: Images clearly show photograph, confirm, Today’s Specials, actual recipe, household plan and the remaining grocery spend.
- [ ] **STORE-08 — Produce an app-preview video if chosen.** **Conditional.** Complete when: The video follows current specifications and demonstrates real in-app behavior and licensed media; otherwise record N/A.
- [ ] **STORE-09 — Supply a functioning support URL.** **Apple requirement.** Complete when: The page opens publicly, provides a working contact and answers basic scan, billing and account questions.
- [ ] **STORE-10 — Supply privacy and relevant license URLs.** **Apple requirement.** Complete when: URLs are public, correct, stable and consistent with the in-app documents and chosen EULA.
- [ ] **STORE-11 — Finish App Privacy and compliance answers.** **Apple requirement.** Complete when: Privacy data, content rights, advertising identifier questions and any console-required information reflect the actual release build.
- [ ] **STORE-12 — Complete export-compliance assessment.** **Apple requirement.** Complete when: Encryption answers follow the app’s actual implementation and territories; documentation or exemption declarations are supplied when applicable.
- [ ] **STORE-13 — Complete territorial availability and DSA information.** **Apple requirement.** Complete when: US-only is the initial working setting; trader declaration and any required verification are complete before adding EU territories.
- [ ] **STORE-14 — Set app and subscription pricing consistently.** Complete when: Free app download with the selected optional paid plan is configured; product availability, regional prices and display text agree.
- [ ] **STORE-15 — Evaluate App Accessibility declarations.** Complete when: Publish only accessibility support demonstrated by the release candidate; an optional accessibility information URL is accurate.
- [ ] **STORE-16 — Supply App Review access and instructions.** **Apple requirement.** Complete when: Reviewers receive a working demo account if needed, sample test photos or a reliable sample kitchen, scan instructions and access to paid features for review.
- [ ] **STORE-17 — Explain the app’s independent value to reviewers.** Complete when: Notes describe the native photo flow, owned-food matching, household adaptations and coordinated plan/list behavior without competitor-copy claims.

Primary references: [A11](#primary-sources), [A12](#primary-sources), [A13](#primary-sources), [A14](#primary-sources), [A15](#primary-sources), [A16](#primary-sources), [A19](#primary-sources).

## 15. Run TestFlight and freeze the release candidate

Owner: **QA / Engineering / Product**. Dependencies: **IOS signed archive; privacy compliance; core QA**. Applies: **V1**.

- [ ] **BETA-01 — Upload a signed build to App Store Connect.** **Apple requirement.** Complete when: Processing succeeds and signing, SDK, privacy-manifest and export warnings that block testing are resolved.
- [ ] **BETA-02 — Distribute to an internal TestFlight group.** Complete when: The team installs the standalone app through TestFlight and verifies production-intended configuration.
- [ ] **BETA-03 — Complete external beta information and review as applicable.** **Apple requirement.** Complete when: The external group and beta-review details are complete, and the first required beta review is approved before external distribution.
- [ ] **BETA-04 — Recruit representative households with consent.** Complete when: Proposed launch bar: at least 10 households, including less technical users and older supported phones; record any justified target change before testing.
- [ ] **BETA-05 — Provide a concise beta test script.** Complete when: Testers cover actual fridge/freezer/pantry photos, corrections, appealing meal choice, dietary differences, budget and a complete meal cycle.
- [ ] **BETA-06 — Collect product evidence rather than compliments alone.** Complete when: Measure first useful menu, name correction rate, missing recipe coverage, extra purchase estimates, crashes and actual return usage.
- [ ] **BETA-07 — Fix the repeated sources of failure.** Complete when: Beta failures become regression cases, including foods other than pumpkin that previously produced no matching specials.
- [ ] **BETA-08 — Run a final regression on the exact candidate.** Complete when: The candidate build, backend release, model version, recipe catalog and billing setup are fixed and tested together.
- [ ] **BETA-09 — Freeze and record the candidate.** Complete when: Version/build number, source commit, environment, test results, known limitations and approval owners are stored in the release record.

Primary references: [A10](#primary-sources), [A15](#primary-sources).

## 16. Prepare operations before release

Owner: **Engineering / Operations / Support**. Dependencies: **BACKEND; DATA; BILLING; BETA feedback**. Applies: **V1**.

- [ ] **OPS-01 — Provision production services under durable ownership.** Complete when: API, database, photo storage, model delivery, domain and billing accounts have owners and renewal/payment arrangements.
- [ ] **OPS-02 — Set usage budgets and alert thresholds.** Complete when: Recognition, storage, bandwidth and support costs have customer-level limits and service-level alerts aligned with the low-price offer.
- [ ] **OPS-03 — Instrument the useful customer journey.** Complete when: Privacy-respecting events measure install/first launch, first confirmed food, menu result, recipe choice, cooking, purchase conversion and retention.
- [ ] **OPS-04 — Monitor crashes and service health.** Complete when: Production crash reports, API failures, upload failures, scan quality and purchase/restore errors reach an accountable owner without exposing private photos.
- [ ] **OPS-05 — Rehearse backup restore and release recovery.** Complete when: Recovery objectives are documented, a restoration has been exercised and the backend can support customers on the previous app version.
- [ ] **OPS-06 — Prepare feature-disable and emergency-fix procedures.** Complete when: A failing scan model or feature can be disabled safely; an iOS defect has an expedited new-build path rather than an assumed instant binary rollback.
- [ ] **OPS-07 — Publish support and incident procedures.** Complete when: Support can handle mistaken ingredients, account access, deletion, billing, refunds, unavailable recipes and a service outage.
- [ ] **OPS-08 — Prepare launch communications and public links.** Complete when: Website, support, privacy, pricing and App Store destination are ready; claims and screenshots agree with the approved build.
- [ ] **OPS-09 — Set a launch review cadence.** Complete when: A named owner reviews operational health daily during launch and recurring spend, retention, recognition and recipe-coverage results afterward.

Primary references: [A04](#primary-sources), [A07](#primary-sources), [A19](#primary-sources).

## 17. Submit, obtain approval and release

Owner: **Apple Account Holder / Engineering / Product**. Dependencies: **All applicable pre-release tasks; BETA; OPS**. Applies: **V1**.

- [ ] **RELEASE-01 — Recheck current Apple requirements immediately before submission.** Complete when: Toolchain, policy, SDK, privacy, screenshot and commerce requirements have not changed since this checklist was researched.
- [ ] **RELEASE-02 — Perform the final installed-build acceptance test.** Complete when: Camera-to-menu, quantities, household plan, grocery list, account deletion, purchase and restore work on the final candidate.
- [ ] **RELEASE-03 — Select the exact candidate build and required review items.** **Apple requirement.** Complete when: The chosen version, build, first subscription submissions and any required content are complete and free of missing metadata.
- [ ] **RELEASE-04 — Choose controlled release settings.** Complete when: Use manual release for the first launch; Apple’s phased release setting is for version updates, so a first-release soft launch uses deliberate territories and timing.
- [ ] **RELEASE-05 — Submit the complete app for App Review.** **Apple requirement.** Complete when: The submission is sent, its status is recorded and the reviewer contact remains reachable with the backend and demo access working.
- [ ] **RELEASE-06 — Respond to review questions and fix issues.** Complete when: Responses address the specific finding; metadata-only fixes or a new build are submitted as appropriate with the relevant regression check.
- [ ] **RELEASE-07 — Confirm approval of the app and paid products.** **Apple requirement.** Complete when: The accepted version and intended subscription products are available for the chosen release, not merely uploaded or beta-approved.
- [ ] **RELEASE-08 — Complete the final owner release decision.** Complete when: Product and engineering sign off that applicable release tasks have evidence or a justified conditional N/A and that support is ready.
- [ ] **RELEASE-09 — Release to the selected storefronts.** Complete when: The authorized release action is completed and the actual App Store listing becomes available.
- [ ] **RELEASE-10 — Verify the public listing and clean App Store install.** Complete when: A fresh customer can find and download the correct app; screenshots, support links, price and login behavior match the approved release.
- [ ] **RELEASE-11 — Verify a production purchase and restore.** Complete when: An authorized tester performs and records the first real purchase, entitlement delivery and restore within an agreed spending limit.
- [ ] **RELEASE-12 — Record launch evidence and hand off operations.** Complete when: App Store URL, released source/build, approved products and first-live checks are saved and operational monitoring is actively owned.

Primary references: [A11](#primary-sources), [A17](#primary-sources), [A18](#primary-sources), [A19](#primary-sources).

## 18. Maintain the released app

Owner: **Product / Engineering / Support**. Dependencies: **RELEASE**. Applies: **After the first release**.

- [ ] **AFTER-01 — Review launch health and fix urgent failures.** Complete when: Crashes, recognition failures, purchase problems and customer reports are reviewed during the first day and first week.
- [ ] **AFTER-02 — Check whether customers actually save and return.** Complete when: Compare observed grocery behavior and repeat cooking with the defined savings method; refine the product from evidence.
- [ ] **AFTER-03 — Expand the most valuable recipe gaps.** Complete when: Unmatched food reports, frequent corrections and popular ingredients guide content and matching updates.
- [ ] **AFTER-04 — Maintain subscription and cost economics.** Complete when: Reconcile renewals, refunds, churn, storage and recognition costs; keep the lower price sustainable.
- [ ] **AFTER-05 — Release updates with compatible data migrations.** Complete when: Older installed apps remain supported through tested API and data changes; use phased release for eligible updates when useful.
- [ ] **AFTER-06 — Keep Apple membership, agreements and public documents current.** Complete when: Assign renewal and policy review responsibility, monitor SDK/privacy changes and keep contact, privacy and subscription disclosures accurate.
- [ ] **AFTER-07 — Maintain security and deletion operations.** Complete when: Dependency fixes, access reviews, backups, data requests and vendor retention obligations are handled on an ongoing schedule.

Primary references: [A03](#primary-sources), [A05](#primary-sources), [A18](#primary-sources), [A19](#primary-sources).

## 19. Conditional branches — decide, then complete or mark N/A

Owner: **Product / relevant specialist**. Dependencies: **SCOPE decisions**. Applies: **Only if the named capability or market is enabled**.

- [ ] **COND-01 — Add iPad as a supported target.** **Conditional.** Complete when: Complete tablet layouts, all supported orientations, relevant device tests and required iPad listing assets before enabling the target.
- [ ] **COND-02 — Add countries or languages beyond the initial launch.** **Conditional.** Complete when: Validate localization, ingredient names, units, actual prices/currency behavior, local privacy/consumer rules, support and required regional store disclosures.
- [ ] **COND-03 — Add shared access for multiple household accounts.** **Conditional.** Complete when: Invitation acceptance, membership authorization, roles, removal, edit conflicts and entitlement policy are tested; eater profiles alone do not imply shared account access.
- [ ] **COND-04 — Enable Apple Family Sharing for purchases.** **Conditional.** Complete when: Confirm product eligibility, console configuration and exact behavior with separate Apple accounts; this is distinct from sharing a pantry inside the app.
- [ ] **COND-05 — Add reminders or push notifications.** **Conditional.** Complete when: Implement appropriate permission timing, APNs configuration, opt-out, time zones, delivery tests and corresponding privacy disclosures.
- [ ] **COND-06 — Add live supermarket prices or grocery ordering.** **Conditional.** Complete when: Obtain licensed data and merchant permissions, handle stale/region-specific prices, attribution and any actual ordering/payment requirements before making the claim.
- [ ] **COND-07 — Add unconstrained AI recipe generation or public user content.** **Conditional.** Complete when: Add content quality/safety evaluation, recipe validation and required user-content reporting, blocking and moderation appropriate to the feature.
- [ ] **COND-08 — Add medical advice, HealthKit, tracking or a child-directed service.** **Conditional.** Complete when: Complete the applicable additional Apple rules, specialist/privacy review and supporting evidence before those capabilities ship.

Primary references: [A01](#primary-sources), [A04](#primary-sources), [A07](#primary-sources), [A14](#primary-sources), [A16](#primary-sources), [A19](#primary-sources).

## Final release record

Complete this record for the actual submitted and released version. A checked task without evidence is still open for launch sign-off.

| Field | Value |
| --- | --- |
| Legal seller / Apple Team ID | Pending verification |
| Bundle ID / App Store app ID | Pending |
| Version / build number | Pending |
| Released source commit / backend version | Pending |
| Recognition runtime and model version | Pending |
| Recipe catalog version | Pending |
| Supported devices / minimum iOS | Pending device evidence |
| Storefronts / languages | Proposed: US / English |
| Subscription product IDs and prices | Pending economics and StoreKit setup |
| Privacy policy / support / terms URLs | Pending |
| Device and beta evidence | Pending |
| Account deletion and isolation evidence | Pending |
| App Review outcome / approved products | Pending |
| Release authorization and actual release time | Pending |
| Public App Store URL | Pending |
| First clean install / production purchase / restore | Pending |
| Operations and support owner | Pending assignment |

## Primary sources

Apple policy and console requirements were checked on October 26, 2026. The selected SDK floor is a current minimum, not a promise that it will remain valid until a future submission. Recheck the sources at RELEASE-01. Framework recommendations and product-quality targets are our judgments. Apple acceptance is confirmed only by the actual review result.

- **A01:** [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- **A02:** [SDK minimum requirements, in force since April 28, 2026](https://developer.apple.com/news/upcoming-requirements/?id=04282026a)
- **A03:** [Apple Developer Program enrollment and fee](https://developer.apple.com/programs/enroll/)
- **A04:** [App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/)
- **A05:** [Third-party SDK privacy manifests and signatures](https://developer.apple.com/support/third-party-SDK-requirements/)
- **A06:** [Offering account deletion in your app](https://developer.apple.com/support/offering-account-deletion-in-your-app/)
- **A07:** [Auto-renewable subscriptions](https://developer.apple.com/app-store/subscriptions/)
- **A08:** [Restore purchases with StoreKit](https://developer.apple.com/documentation/storekit/appstore/sync())
- **A09:** [App Store Small Business Program](https://developer.apple.com/app-store/small-business-program/)
- **A10:** [TestFlight overview](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
- **A11:** [Submit an app](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app/)
- **A12:** [Screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)
- **A13:** [Required, localizable and editable properties](https://developer.apple.com/help/app-store-connect/reference/app-information/required-localizable-and-editable-properties/)
- **A14:** [DSA trader requirements](https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/)
- **A15:** [Export compliance overview](https://developer.apple.com/help/app-store-connect/manage-app-information/overview-of-export-compliance/)
- **A16:** [Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels/)
- **A17:** [Submit an In-App Purchase](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-in-app-purchase/)
- **A18:** [Phased release of a version update](https://developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases/)
- **A19:** [App Store submission overview](https://developer.apple.com/app-store/submitting/)
- **E01:** [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- **E02:** [Expo native in-app purchases](https://docs.expo.dev/guides/in-app-purchases/)
