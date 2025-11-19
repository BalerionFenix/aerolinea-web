import {inject, Injectable} from '@angular/core';
import { inMemoryPersistence,
  Auth,
  createUserWithEmailAndPassword, getAuth,
  sendPasswordResetEmail, setPersistence,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import {getApp} from '@angular/fire/app';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private auxauth = getAuth(getApp());


  async register({ email, password }: any) {
    await setPersistence(this.auth, inMemoryPersistence);

    return createUserWithEmailAndPassword(this.auxauth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async resetPasswordInit(email: string): Promise<void> {
    const actionCodeSettings = {
      url: 'http://localhost:4200/login',
      handleCodeInApp: true
    };

    try {
      await sendPasswordResetEmail(this.auth, email, actionCodeSettings);
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }




}
