# PShop

A meal planner with a restaurant-style Today’s Specials menu, original dinner photography, photo-based kitchen inventory, per-person dietary adaptations, a weekly plan and a coordinated grocery list.

## Implemented

- Nine original dishes, plus fresh-pumpkin preparations, and nine original editorial food photographs.
- A clearly labeled sample kitchen, kept separate from uploaded personal inventory.
- Menu filters for everything on hand, one missing ingredient and user-prioritized ingredients.
- Whole-pack additional-purchase estimates with editable grocery prices.
- Recipe details, servings, ingredient coverage, instructions, favorites, ratings and cooked status.
- Mixed household dietary preferences and scaled portion requirements.
- Selected cooking days, equipment, time limits, retailer and budget preferences.
- Weekly meal generation from the starter recipe collection, swaps and cooked-meal inventory deduction.
- A locked shopping week with explicit ingredient changes before plan/list updates are accepted.
- Grouped groceries, copy/share, manually added items and purchase-to-inventory updates.
- Private D1 kitchen persistence with revision checks and browser recovery copies; private R2 photos.
- Browser-local photo recognition with an editable confirmation step. No paid AI API connection or key.
- Kitchen export/import.

## Photo recognition

The browser worker loads Transformers.js 3.8.1 and HuggingFaceTB/SmolVLM-256M-Instruct, using WebGPU and available q4 weights. The first use downloads approximately 265 MB of model weights, plus runtime/configuration files. Model caching and hardware support depend on the browser.

Recognition produces candidate names only. Quantities remain unknown until confirmed. Unknown quantities never qualify a meal as fully on hand. Same-ingredient review updates the quantity at a location rather than summing overlapping photos. The small model can misidentify foods and package text; candidates require review. Unsupported browsers get an explicit message and retain their uploaded photos.

Primary implementation references:

- https://raw.githubusercontent.com/huggingface/transformers.js-examples/main/smolvlm-webgpu/src/worker.js
- https://huggingface.co/docs/transformers.js/v3.8.1/guides/dtypes
- https://huggingface.co/HuggingFaceTB/SmolVLM-256M-Instruct/tree/main/onnx

## Evidence and limitations

Recipes, package prices, and nutrition figures in the starter kitchen are examples owned by this project. Nutrition values are recipe formulation estimates. Household substitutions change nutrition; standard-dish images are labeled when adaptations apply. This implementation does not include an unlimited recipe generator, live supermarket prices, a subscription checkout, or a nutrition database.

## Verification

Run `node --test tests/kitchen.test.mjs` for 15 checks covering inventory, whole-pack costing, household adaptation, stock conservation, cooking days, locked weeks and the photo-to-specials pumpkin regression.

Browser QA verified meal detail, serving changes, instructions, adding a dinner to the week, locked-plan change previews, grocery reconciliation, marking groceries bought, persistence after reload, photo upload/storage and the unsupported-WebGPU message. Mobile layout was checked in a 390px embedded viewport. Live on-device inference still requires a supported secure WebGPU browser.

## Hosting

Use the Sites workflow. Keep the Site private. The source manifest declares D1 binding DB and R2 binding BUCKET. Schema-only migrations are in drizzle/. All server writes are same-origin and the owner-private Sites boundary protects the single-owner kitchen.

## Photo-to-specials update

Confirmed photos refresh the menu immediately and prioritize dishes using those foods. Refresh specials recalculates from inventory rather than rotating fixed cards. Pumpkin purée and fresh pumpkin have three matched dishes with appropriate preparation steps and original photographs. Existing custom photo labels such as `% Pure Pumpkin.` are normalized when loading, importing or changing a kitchen; saved photos remain intact. A quantity entered as one item is not silently converted into grams. The original amount is shown in a note and requires net-weight confirmation. Unconfirmed quantities remain visible in recipes and the grocery list as checks, not instructions to buy another package. Foods without matching dishes are explicitly listed; the recipe collection is curated and finite.

Pumpkin assets: `public/food/pumpkin-pasta.webp`, `public/food/pumpkin-soup.webp`, `public/food/pumpkin-curry.webp`. Built-in image generation prompts are recorded in `docs/photography/pumpkin-photography-prompts.json`.

## App Store release plan

[Full Apple App Store release checklist](docs/APP_STORE_RELEASE_CHECKLIST.md) — 234 identified tasks with completion criteria, owners, dependencies, current prototype status and checked primary sources.

[CSV release tracker](docs/APP_STORE_RELEASE_TRACKER.csv) — filter by phase, owner, priority, status and applicability; record completion evidence as the release progresses.
