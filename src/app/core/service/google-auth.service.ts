import {inject, Injectable} from '@angular/core';
import {Auth, signInWithPopup, GoogleAuthProvider, signOut} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private auth = inject(Auth);


  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logoutWithGoogle() {
    return signOut(this.auth);
  }


}
