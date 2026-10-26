# App Privacy answers

Match these to the binary that is actually submitted. If StoreKit receipts or analytics are added later, update this sheet and the privacy policy before the next version.

Tracking: No. No tracking domains. No ATT prompt.

Data linked to the user, used for app functionality, not used for tracking, not used for third-party advertising:

| Data type | Collected | Why |
| --- | --- | --- |
| Photos or Videos | Yes | Kitchen photos the customer adds. Optional upload if sync is on. |
| Other User Content | Yes | Kitchen inventory, plan, and grocery list. On device, and in the optional cloud copy. |
| User ID | Yes | Device account token, and the Apple subject if the customer uses Sign in with Apple. |

Not collected by PShop, so answer No:

- Name, email, phone. Sign in with Apple is called without name or email scopes.
- Health, fitness.
- Precise or coarse location. Photos are redrawn before upload, which drops typical camera location metadata. Do not declare location unless a build starts reading it.
- Contacts, browsing history, search history.
- Payment info and credit info. Apple processes the subscription. The app does not receive the card number.
- Purchase history. The current build does not send receipts to a PShop server. The StoreKit stub returns no transactions. If you add server receipt validation, declare Purchases.
- Product interaction, advertising data, crash data, performance data, other diagnostic data. There is no analytics SDK in the app. Do not declare diagnostics you do not collect. If Xcode or a later SDK adds a crash reporter you turn on, declare it then.
- Device ID. The app does not read IDFA or IDFV for its own use.

Purposes for every Yes row: App Functionality only.

The same answers are in `ios/App/App/PrivacyInfo.xcprivacy`.
