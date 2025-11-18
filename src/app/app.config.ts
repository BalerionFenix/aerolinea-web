import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideHttpClient(), provideFirebaseApp(() => initializeApp({
    projectId: "aerolinea-web",
    appId: "1:689996169115:web:a2b77c9533b0cf7df36b3e",
    storageBucket: "aerolinea-web.firebasestorage.app",
    apiKey: "AIzaSyCtk_WMtoX5uncOhhGeQMOwf-_bgHgXPo0",
    authDomain: "aerolinea-web.firebaseapp.com",
    messagingSenderId: "689996169115",
    //projectNumber: "689996169115", version: "2"
  })), provideAuth(() => getAuth())

  ]


};
