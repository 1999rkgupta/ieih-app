import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ieih.esports',
  appName: 'IEIH Esports',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#07070D',
      showSpinner: true,
      spinnerColor: '#00F0FF'
    },
    StatusBar: {
      backgroundColor: '#07070D',
      style: 'DARK'
    }
  }
};

export default config;
