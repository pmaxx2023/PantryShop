export const LEGAL_UPDATED = 'October 26, 2026';
export const WORKING_NAME = 'PShop';

export const privacy = [
  {h: 'Who this describes', p: ['This policy describes the PShop iPhone app and the optional PShop sync service. PShop is a pantry-to-dinner app. It is not a medical device and it is not directed to children.']},
  {h: 'What stays on your device', p: ['Your kitchen, plan, grocery list, prices and settings are stored on the device first, in the app’s local database. You can use that kitchen with no account and with no network. Photos you add can also stay on the device if cloud storage is unavailable.']},
  {h: 'Optional account and sync', p: ['The app creates an anonymous device account so a later sync can be tied to this install. You can link Sign in with Apple. If you do, Apple gives the app an identity token. The server checks that token with Apple and stores the Apple subject identifier with your kitchen. PShop does not receive or store your Apple ID password. ChatGPT or OpenAI account headers are not used.']},
  {h: 'Photos and recognition', p: ['Camera and photo-library access are used only when you choose to add a kitchen photo. The app redraws photos before upload, which drops typical camera location metadata. Ingredient suggestions are produced on the device with Transformers.js and SmolVLM weights that are bundled into a release build. The photo is not sent to a recognition vendor. Suggestions can be wrong. They are not added to your kitchen until you confirm them. The app does not guess freshness or dates.']},
  {h: 'Purchases', p: ['Optional PShop Plus, if you buy it, is an Apple auto-renewable subscription. Apple processes the payment. PShop does not receive your full payment card number. The app asks StoreKit for the current entitlement. A flag set inside the web page cannot unlock Plus.']},
  {h: 'What we do not do', p: ['PShop does not show ads, does not use tracking across other companies’ apps and websites, and does not use App Tracking Transparency. It does not use HealthKit. It does not sell personal information.']},
  {h: 'Deletion', p: ['In Household you can delete the device account. That removes the local kitchen and, when the server can be reached, the cloud kitchen, photos and Apple link for that account. Deletion does not cancel an Apple subscription. Cancel billing in your Apple ID subscriptions. Apple may keep its own purchase records.']},
  {h: 'Retention and security', p: ['Cloud copies remain until you delete the account or the operator removes the service. Device copies remain until you delete them or remove the app. Tokens are meant to be stored in the iOS Keychain once the secure-storage plugin is included in the signed build. Do not send your kitchen export to people you do not trust.']},
  {h: 'Contact', p: ['A public support page must be hosted by the Account Holder before App Store submission. This in-app page is the same text. The operator has not yet published a monitored mailbox in this repository.']}
];

export const terms = [
  {h: 'The app license', p: ['The iOS app is licensed to you under Apple’s standard Licensed Application End User License Agreement, unless the Account Holder later attaches a custom EULA that Apple accepts. These service terms cover how PShop behaves. If they conflict with Apple’s standard EULA on an Apple-required point, Apple’s terms win for that point.']},
  {h: 'What PShop does', p: ['PShop suggests dinners from foods you say you have, estimates additional groceries in whole packs, and keeps a plan and a list together. Catalog prices are US dollar examples until you enter your own. They are not live supermarket prices. The app does not promise that you will save money.']},
  {h: 'Recipes and nutrition', p: ['Recipes are original to this project. Nutrition figures are rough estimates, not laboratory results. Dietary preferences are cooking adaptations, not allergen controls and not medical advice. Do not rely on PShop if you have a food allergy or a diet prescribed for a health condition.']},
  {h: 'Recognition', p: ['Model output is unreliable. Confirm every suggested food. PShop will not present recognition text as a fact.']},
  {h: 'PShop Plus', p: ['The free app includes the local kitchen, the recipe library, planning, the grocery list, export and account deletion. Plus, if offered, is an optional auto-renewable subscription for sync and for cloud backup beyond 30 photos. Price, currency, length and tax come from Apple at purchase. It renews until you cancel in Apple subscriptions at least 24 hours before the period ends. Deleting your PShop account does not cancel Plus.']},
  {h: 'Your content', p: ['You keep the photos and kitchen data you add. You give the operator permission to store a copy only if you use sync. Do not upload photos you do not have rights to use.']}
];

export const support = [
  {h: 'How to try the app', p: ['Open PShop. The sample kitchen is labeled Sample kitchen and is not your food. Photograph a shelf, or add ingredients yourself. Confirm any blank quantity before the app treats that food as available. Open a special, add it to My week, then open Groceries.']},
  {h: 'If recognition does not run', p: ['A release build is supposed to contain the vision engine and the model weights. If they are missing, type the foods. The app will not download the model and will not send the photo out for recognition.']},
  {h: 'Accounts, deletion and billing', p: ['Household contains Sign in with Apple, Restore purchases, and Delete account. Deletion removes the PShop account. It does not cancel an Apple subscription. Use Apple ID subscriptions for billing, refunds and cancellation.']},
  {h: 'Contact', p: ['Before submission, the Account Holder must replace this paragraph with a monitored email address and host this page at the public support URL entered in App Store Connect. No mailbox is claimed by this repository.']}
];
