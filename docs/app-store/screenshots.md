# Screenshot plan

Apple’s screenshot spec, checked October 26, 2026, asks for the 6.9-inch iPhone size (1320×2868) and the 6.5-inch size (1284×2778) when you do not supply the larger set alone. Supply both.

Captions, in order, for the five frames:

1. Dinners from food you have
2. Confirm every suggestion
3. A week, then a shorter list
4. Only the packs you still need
5. Your kitchen stays on this iPhone

Captured October 26, 2026 from the local app at `http://127.0.0.1:5173` with `scripts/capture-store-screenshots.mjs`. Files: `iphone-6.9-menu.png`, `iphone-6.9-recipe.png`, `iphone-6.9-kitchen.png`, `iphone-6.9-groceries.png`, `iphone-6.9-household.png` at 1320×2868, and the same five frames at 1284×2778 with the `iphone-6.5-` prefix. These are the real interface at the required pixel sizes. They are not photographs of a physical iPhone and they are not frames from a signed archive. Look at them before upload, and replace them if a TestFlight phone shows a control cut off.

Do not submit a desktop browser window.

## How the captures were made

`scripts/capture-store-screenshots.mjs` opens the running app, sets a mobile viewport and a device scale factor of 3, and saves PNGs here. Re-run it against the release candidate before upload if the interface changes.
