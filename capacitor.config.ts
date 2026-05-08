import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ronbragaglia.bichinhomatch',
  appName: 'Bichinho Match',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#FFD93D',
      showSpinner: false
    }
  }
};

export default config;
