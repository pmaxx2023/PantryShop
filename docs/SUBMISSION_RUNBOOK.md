# Submission runbook

Do these in order on the day you submit. Stop if a step has no evidence.

1. Recheck Apple’s SDK minimum, privacy-manifest rules, and account-deletion rule. The notes in the checklist were checked October 26, 2026.
2. `git status` clean. Record the commit.
3. On a Mac: `pnpm install --frozen-lockfile`, `npm test`, `npm run build`, then the iOS steps in `docs/IOS_BUILD.md` including `fetch-model` and `build:ios`.
4. Archive. Upload. Wait for processing. Confirm the build number matches `CURRENT_PROJECT_VERSION`.
5. App Store Connect version: select that build. Paste listing, age rating, privacy answers, and review notes from `docs/app-store/`.
6. Support URL and privacy URL return HTTP 200 in a private browser and match `public/legal/`. The support page shows the real mailbox.
7. Screenshots are from this binary on the required iPhone sizes, or you are consciously submitting the headless captures in `docs/app-store/` and you have looked at them. Prefer device captures if the headless set crops a control.
8. Pricing: free. In-app purchases: none, until Plus is a real StoreKit product attached to this version.
9. Release: manual release. Phased release does not apply to the first version the same way it does to updates. Choose manual so you can install the public build yourself before it is available to everyone.
10. TestFlight script in `docs/TESTFLIGHT.md` completed on the same build number.
11. Account Holder submits. Reply to App Review from the Resolution Center. Do not ship a binary that downloads the model to answer a rejection. Fix the bundle instead.
12. After approval, do not release until `docs/POST_LAUNCH.md` has an owner for the first week.
