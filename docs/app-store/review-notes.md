# App Review notes

Paste into App Review Information. No demo account is required for the free path.

## Sign-in

The app opens on a sample kitchen stored on the device. Reviewers do not need an account. Sign in with Apple is optional, in Household. It does not request name or email. Account deletion is on that same screen: type DELETE. Deletion does not cancel an Apple subscription. There is no subscription to buy in this binary until StoreKit products exist. The paywall states that.

## How to see the app work

1. Open PShop. The status line says Sample kitchen.
2. My kitchen → Add photos, or add an ingredient by hand. If the on-device model is in the build, suggestions appear only as a list to confirm. If the weights were not packaged, the screen says to type the foods. That is intentional. The app does not download the model.
3. Confirm a food, including a quantity. Today’s menu changes.
4. Open a dish. Standard-dish illustrations are labeled. They are not photographs of that plate.
5. My week → Plan my week → Lock shopping week. Groceries lists missing packs. Items with unknown amounts ask for confirmation and are not priced as zero.
6. Household → Delete account. Type DELETE.

## Camera

The camera is used only from Add photos. The purpose string is in Info.plist. The photo is not sent to a recognition vendor.

## Purchases

No in-app purchase is available in this build. `PShopStore` returns no products. Do not look for a price. If a later binary includes Plus, attach the products to the version, and the paywall must show the StoreKit price, length, and that the subscription renews until canceled in Apple ID subscriptions.

## Encryption

`ITSAppUsesNonExemptEncryption` is false. The app uses HTTPS and the operating system. It does not implement its own encryption.

## Why this is not a website wrapper

The interface is bundled in the app. Camera, the share sheet, haptics, the Keychain plugin, and Sign in with Apple are native. Recognition runs on device from files in the bundle. The app functions with no network.

## Contact

Replace this line with the monitored mailbox before submission. None is on file in the repository.
