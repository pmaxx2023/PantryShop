import Capacitor

/// StoreKit is not linked in this build. Restore returns no transactions, so a
/// web flag cannot unlock PShop Plus. Replace this plugin with StoreKit 2
/// before any subscription is offered for sale.
@objc(PShopStorePlugin)
public class PShopStorePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "PShopStorePlugin"
    public let jsName = "PShopStore"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getProducts", returnType: CAPPluginReturnPromise)
    ]

    @objc func restore(_ call: CAPPluginCall) {
        call.resolve(["transactions": []])
    }

    @objc func getProducts(_ call: CAPPluginCall) {
        call.resolve(["products": []])
    }
}
