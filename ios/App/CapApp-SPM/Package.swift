// swift-tools-version: 5.9
import PackageDescription

// DO NOT MODIFY THIS FILE - managed by Capacitor CLI commands
let package = Package(
    name: "CapApp-SPM",
    platforms: [.iOS(.v17)],
    products: [
        .library(
            name: "CapApp-SPM",
            targets: ["CapApp-SPM"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", exact: "7.4.3"),
        .package(name: "CapacitorCommunityAppleSignIn", path: "../../../node_modules/.pnpm/@capacitor-community+apple-sign-in@7.1.0_@capacitor+core@7.4.3/node_modules/@capacitor-community/apple-sign-in"),
        .package(name: "CapacitorApp", path: "../../../node_modules/.pnpm/@capacitor+app@7.0.2_@capacitor+core@7.4.3/node_modules/@capacitor/app"),
        .package(name: "CapacitorCamera", path: "../../../node_modules/.pnpm/@capacitor+camera@7.0.2_@capacitor+core@7.4.3/node_modules/@capacitor/camera"),
        .package(name: "CapacitorFilesystem", path: "../../../node_modules/.pnpm/@capacitor+filesystem@7.1.4_@capacitor+core@7.4.3/node_modules/@capacitor/filesystem"),
        .package(name: "CapacitorHaptics", path: "../../../node_modules/.pnpm/@capacitor+haptics@7.0.2_@capacitor+core@7.4.3/node_modules/@capacitor/haptics"),
        .package(name: "CapacitorShare", path: "../../../node_modules/.pnpm/@capacitor+share@7.0.2_@capacitor+core@7.4.3/node_modules/@capacitor/share"),
        .package(name: "CapacitorSplashScreen", path: "../../../node_modules/.pnpm/@capacitor+splash-screen@7.0.2_@capacitor+core@7.4.3/node_modules/@capacitor/splash-screen"),
        .package(name: "CapacitorStatusBar", path: "../../../node_modules/.pnpm/@capacitor+status-bar@7.0.2_@capacitor+core@7.4.3/node_modules/@capacitor/status-bar"),
        .package(name: "CapacitorSecureStoragePlugin", path: "../../../node_modules/.pnpm/capacitor-secure-storage-plugin@0.13.0_@capacitor+core@7.4.3/node_modules/capacitor-secure-storage-plugin")
    ],
    targets: [
        .target(
            name: "CapApp-SPM",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "CapacitorCommunityAppleSignIn", package: "CapacitorCommunityAppleSignIn"),
                .product(name: "CapacitorApp", package: "CapacitorApp"),
                .product(name: "CapacitorCamera", package: "CapacitorCamera"),
                .product(name: "CapacitorFilesystem", package: "CapacitorFilesystem"),
                .product(name: "CapacitorHaptics", package: "CapacitorHaptics"),
                .product(name: "CapacitorShare", package: "CapacitorShare"),
                .product(name: "CapacitorSplashScreen", package: "CapacitorSplashScreen"),
                .product(name: "CapacitorStatusBar", package: "CapacitorStatusBar"),
                .product(name: "CapacitorSecureStoragePlugin", package: "CapacitorSecureStoragePlugin")
            ]
        )
    ]
)
