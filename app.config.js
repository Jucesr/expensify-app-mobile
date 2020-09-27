import "dotenv/config";

export default ({ config }) => ({
   ...config,
   extra: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      googleAndroidClientId: process.env.googleAndroidClientId,
   },
   android: {
      ...config.android,
      config: {
         googleSignIn: {
            apiKey: process.env.googleSignInKey,
            certificateHash: process.env.googleCertificateHash,
         },
      },
   },
});
