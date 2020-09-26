import "dotenv/config";

export default {
   name: "Expensify",
   slug: "expensify-app",
   version: "1.0.0",
   orientation: "portrait",
   icon: "./assets/icon.png",
   extra: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
   },
   splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
   },
   updates: {
      fallbackToCacheTimeout: 0,
   },
   assetBundlePatterns: ["**/*"],
   ios: {
      supportsTablet: true,
   },
   web: {
      favicon: "./assets/favicon.png",
   },
};
