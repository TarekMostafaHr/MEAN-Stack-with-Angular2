import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  domain = 'http://localhost:4200'
  authToken;
  user;
  options;
  constructor(
    private http: Http,
  ) { }

  createAuthenticationHedaers(){
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    })
  }

  loadToken(){
    this.authToken = localStorage.getItem('token')
  }

  registerUser(user){
    return this.http.post(this.domain + '/authentication/register', user)
    .map(res => res.json());    
  }

  checkUserame(username){
    return this.http.get(this.domain + '/authentication/checkUsername/' + username)
    .map(res => res.json());    
  }

  checkEmail(email){
    return this.http.get(this.domain + '/authentication/checkEmail/' + email)
    .map(res => res.json());    
  }

  login(user){
    return this.http.post(this.domain + '/authentication/login', user).map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile(){
    this.createAuthenticationHedaers();
    return this.http.get(this.domain + '/authentication/profile', this.options).map(res =>res.json());
  }
}