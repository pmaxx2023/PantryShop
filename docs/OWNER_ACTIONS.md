# What only the Account Holder can do

Engineering cannot finish these. Each block is the minimum path. Dollar amounts and portal labels were checked against Apple’s public pages on October 26, 2026. Recheck them before paying.

## 1. Decide the seller

Choose Individual or Organization. The individual legal name, or the organization name, is the seller customers see. This repository does not choose. If the seller is an organization, enroll with a D-U-N-S number for that legal entity, a person with authority to bind it, and a public website Apple can review. Cage Free Capital LLC is not established in this repository. Do not enroll under a name you cannot show.

## 2. Apple Developer Program

1. Use the Apple ID that will be the Account Holder. Turn on two-factor authentication.
2. Enroll at https://developer.apple.com/programs/enroll/
3. Pay the membership. Apple lists USD 99 per year, with regional prices and some waivers shown during enrollment.
4. Invite only the people who need Admin, Developer, Finance, or App Manager access. Do not share the Account Holder password.

## 3. Agreements, tax, and banking

1. In App Store Connect, the Account Holder accepts the Paid Applications agreement if Plus or any paid app will be sold. A free app with no in-app purchase still needs the developer agreement.
2. Enter tax forms and bank account in Agreements, Tax, and Banking. Complete any beneficial-owner questions Apple asks.
3. Do not model a 15% commission until the Small Business Program shows accepted. Apply only after the legal entity is enrolled and eligible.
4. Complete the Digital Services Act trader declaration even for a US-only app. If you later sell in the EU, the extra trader contact display applies.

## 4. Public contact and URLs

Buy and monitor a domain you control. Publish:

- Support URL: the support page (`public/legal/support.html`), with a real mailbox replacing the sentence that says no mailbox is claimed.
- Privacy URL: `public/legal/privacy.html` on that domain.
- Marketing URL: optional; can be the same site.

Put the mailbox in the hosted support page and in App Store Connect. Do not use an address this repository invented, because it did not invent one.

## 5. App Store Connect record

1. Apps → New App. Platform iOS. Name PShop, or another name if PShop is rejected. Primary language English (U.S.). Bundle ID `com.cagefreecapital.pshop` after you register that exact id under Certificates, Identifiers & Profiles. SKU can be `pshop-ios`.
2. User Access: full access for the people who upload.
3. Category: Food & Drink. Secondary: none until you want one.
4. Copy the text from `docs/app-store/listing.md`, `age-rating.md`, `privacy-nutrition.md`, and `review-notes.md` into the forms. Do not leave the copyright field as a guessed LLC. Use the seller you actually enrolled, or leave it until legal tells you the line.
5. Age rating: answer from `docs/app-store/age-rating.md`. There is no alcohol, gambling, or unrestricted web in the app.
6. Pricing: free download. Do not create the Plus products until StoreKit 2 replaces `PShopStorePlugin.swift` and you have chosen prices.
7. Sign in with Apple must be enabled on the App ID. The entitlement file is already in the Xcode project.

## 6. Signing secrets

Create the distribution certificate and the App Store profile in Xcode automatic signing, or in the developer portal. Create an App Store Connect API key only if a CI Mac needs it. Store the `.p8`, `.p12`, and `.mobileprovision` files outside this git repository. They are gitignored. If one is ever committed, revoke it.

## 7. Upload from a Mac

Follow `docs/IOS_BUILD.md` through Archive → Distribute. This Linux workspace cannot do that step. After processing, answer export compliance with the Info.plist already setting non-exempt encryption to false (HTTPS and Apple’s crypto only). If you add your own cryptography, change that answer first.

## 8. TestFlight, then submit

Follow `docs/TESTFLIGHT.md`, then `docs/SUBMISSION_RUNBOOK.md`. Pressing Submit is yours. So is replying to App Review.

## 9. Leftover repository hygiene

Git history on `main` still contains the old third-party screen files in commits before the cleanup. `docs/HISTORY-PURGE.md` is the runbook. Do not force-push unless you intend that rewrite. A force-push was not done from the launch work. GitHub may also still serve an old pull-request ref. Making the repository private, and asking GitHub Support to drop cached blobs if you need them gone, are owner actions. The working tree of the cleanup commit does not contain those files.

## 10. Cloudflare, only if you turn sync on

`wrangler d1 create pshop-d1`, `wrangler r2 bucket create pshop-r2`, put the database id in `wrangler.toml` or in a wrangler environment that is not a secret, and `wrangler deploy`. Without this, the app still runs from the device. Sync returns 503 and the kitchen stays local.
