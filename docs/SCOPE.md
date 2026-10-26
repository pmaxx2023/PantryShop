# PShop V1 scope

## Promise

Photograph your kitchen, see dinners you can cook from food you already have, and see what else you would still need to buy.

## Launch slice

- iPhone only. US App Store. English.
- Consumer households. No advertising.
- The first run is a labeled sample kitchen on the device. No developer account and no ChatGPT account.
- Core path: photo or typed foods, confirm names and quantities, menu refreshes, open a recipe, plan a week, grocery list, cook, inventory updates.

## Preferences the app will adapt

Supported: vegetarian, vegan, gluten-free, and dairy-free, including combinations, with the swaps in `lib/kitchen.mjs`. Portions are 0.5, 1, 1.5, or 2 per person.

Not supported, and not described as safe: peanut-free, tree-nut-free, sesame-free, a separate shellfish-free switch, halal, kosher, low-sodium, and any medical or allergen-free diet. The household screen says preferences are not an allergen-safety guarantee.

## Coverage bar

At least 100 ingredients and 100 recipes, which this tree meets structurally. Cooking tests of the whole library are still open. Nine original dishes keep their photographs. The rest use a labeled standard-dish illustration until real photographs exist.

## Recognition bar, not yet measured

Before TestFlight is treated as evidence, measure on a consented photo set of at least 100 pictures (fridge, freezer, pantry, loose produce, packages, leftovers, glare, occlusion, low light), with a hold-out set:

- Precision of supported visible foods at least 0.8 on the hold-out set
- The customer can correct a wrong suggestion without it entering stock
- Median time from a confirmed photo to a changed menu under 2 minutes on the oldest supported iPhone
- No guessed dates, freshness, or hidden food

These thresholds are the release bar. They have not been measured.

## Money

Additional groceries are whole-pack estimates. Planned spending uses known prices only. Actual purchases are what the customer marks bought. The app does not display savings. Example prices are labeled as examples, not live supermarket prices.

## Exclusions

iPad, other countries and languages, shared household logins, Family Sharing, reminders, push, live prices, grocery ordering, public AI recipes, HealthKit, tracking, and a child-directed service are out of V1.

## Roles

Engineering and the documents in this repository can be prepared without an Apple account. The Account Holder is the only person who can enroll, sign agreements, enter tax and banking, create the App Store record, and upload a build. Spending limits for Apple membership, Cloudflare, and TestFlight devices are not approved in this repository.
