import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILogin, ISignup, IForgot, IReset, AuthResponse } from './Interface/authentication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl= 'https://localhost:7120'
  http = inject(HttpClient);
  constructor() { }

  
  login(login: ILogin):Observable<AuthResponse<string>>
  {
    return this.http.post<AuthResponse<string>>(this.apiUrl+"/api/User", login);
  }
  signup(signup: ISignup):Observable<AuthResponse<string>>
  {
    return this.http.post<AuthResponse<string>>(this.apiUrl+"/api/User/register",signup);
  }
  forgot(forgot: IForgot):Observable<AuthResponse<string>>
  {
    return this.http.post<AuthResponse<string>>(this.apiUrl+"/api/User/ForgotPassword",forgot);
  }
  reset(reset:IReset):Observable<AuthResponse<string>>
  {
    return this.http.post<AuthResponse<string>>(this.apiUrl+"/api/User/ResetPassword?email="+reset.email+"&token="+reset.token,{ password:reset.password,newPassword:reset.confirmPassword });
    
  }
}
