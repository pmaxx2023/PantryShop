# TestFlight plan

Do this on the archive you intend to learn from, then again on the archive you submit. A passing web test is not this plan.

## Upload

1. Finish `docs/IOS_BUILD.md` through Distribute.
2. Wait until the build finishes processing.
3. Export compliance: the plist already answers non-exempt encryption as false.
4. Internal group: up to 100 App Store Connect users on your team. No Beta App Review for internal testers.
5. External group: add What to Test from the script below. External testing needs Beta App Review. Submit the beta only when an internal phone has completed the script once.

## Devices

At least one recent iPhone and the oldest iPhone you will support (iOS 17). Airplane mode on and off. Low Power Mode on for one recognition pass.

## Script

1. Install from TestFlight. Force-quit and reopen. The sample kitchen is still labeled Sample kitchen.
2. Deny the camera, then ask again from Add photos and allow it. Take a shelf photo. Confirm or delete every suggestion. Stock must not change before confirmation.
3. Turn on airplane mode. Add a typed ingredient. Plan a week. The save line stays on-device. Kill the app. Reopen. The ingredient is still there.
4. Lock the week. Change one meal. The grocery list should show the difference, not a silent rewrite of locked quantities.
5. Mark one grocery item bought. It should not be recommended again for the same gap.
6. Share the list. The iOS share sheet opens.
7. Household: Sign in with Apple on two tester phones only if sync has been deployed. Otherwise confirm the button explains that linking needs the iOS plugin and that the local kitchen still works.
8. Type DELETE. The local kitchen returns to the sample. If the worker is deployed, a second request with the old token is 410.
9. VoiceOver: move from the menu to a recipe, to the grocery list, and to Delete account. Buttons need names. This has not been run in the web tests.
10. Write down crashes, wrong foods, and any price that appears without a number you entered.

## Evidence to keep

Build number, commit, device model, iOS version, and a note for each script step. Do not check SCAN or QA device rows done without that note.

## Stop

If the phone jetsam-kills the model, recognition is not ready. Ship the fail-closed type-the-foods behavior rather than a download prompt.
