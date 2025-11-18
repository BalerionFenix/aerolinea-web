import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);


  register({ email, password }: any) {

    return createUserWithEmailAndPassword(this.auth, email, password);
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
