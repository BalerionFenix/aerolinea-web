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
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private auxauth = getAuth(getApp());

  private baseUrl = 'http://localhost:4000/api/register';


  constructor(private http: HttpClient) {
}
  async register({ email, password }: any) {
    await setPersistence(this.auth, inMemoryPersistence);
    return createUserWithEmailAndPassword(this.auxauth, email, password);
  }


  createUser(data: { email: string, password: string }): Observable<any>{
  return this.http.post(this.baseUrl,  data)
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
