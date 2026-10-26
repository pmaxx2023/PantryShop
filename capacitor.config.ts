import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cagefreecapital.pshop',
  appName: 'PShop',
  webDir: 'dist/client',
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#234b3d',
    preferredContentMode: 'mobile'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#234b3d',
      showSpinner: false
    }
  }
};

export default config;
