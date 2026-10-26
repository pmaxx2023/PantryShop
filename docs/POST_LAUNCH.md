# Post-launch checklist

Nothing here is done. The app is not on the store. Use this after a manual release.

## First day

- Install from the public App Store page on a phone that has never had TestFlight.
- Open, add one food, plan one dinner, force-quit, reopen.
- If Plus exists, buy it in production with a real account, restore on a second phone, and cancel in Apple subscriptions. Confirm the app does not delete the kitchen when the subscription ends.
- Read crashes. If recognition kills the process, ship a follow-up that keeps the fail-closed path rather than a download.

## First week

- Count crashes, failed photo sessions, and deletion requests. Fix crashes that repeat.
- Read support mail from the mailbox on the support page.
- Check Cloudflare error rate and storage only if sync is deployed. There is no usage cap alert until the Account Holder sets one.
- Do not add analytics after launch without a privacy-label update.

## First month

- Compare return visits with what you can actually see. The app does not phone home with usage events. If you cannot measure retention, say so. Do not invent a savings number.
- Recipe gaps: foods customers typed that matched nothing. Add recipes in a new revision. Locked weeks keep their snapshots.
- Agreements, tax, and the privacy URL still match the binary.
- Dependency updates that fix a vulnerability get a build. Run `npm test` and the TestFlight script again.
- Back up D1 before a migration. Practice a restore once before you need it.
- Membership renewal is on the Account Holder’s calendar. The USD 99 term is annual.

## Explicitly still out

iPad, other countries, push, live prices, Family Sharing, and a kids version stay out until `docs/SCOPE.md` changes and the conditional tracker rows are reopened.
