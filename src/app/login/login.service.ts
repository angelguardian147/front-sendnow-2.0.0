import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { JwtResponse } from '../interfaces/jwt-response';
import { Login } from '../interfaces/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  //username and password must be the same that in the validate() method of the server
  login(username: string, password: string): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(`${environment.BASE_URL}/auth/login`, {username,password}).pipe(tap(
      (res: JwtResponse) => {
        if(res && res.access_token){
          this.setToken(res.access_token);
        }
      }
    ));
  }

  create(login: Login): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(`${environment.BASE_URL}/auth/create`, login).pipe(tap(
      (res: JwtResponse) => {
        if(res && res.access_token){
          this.setToken(res.access_token);
        }
      },
      (err: HttpErrorResponse) => {
        err.error.message
      }
    ));
  }

  profile(): Observable<JwtResponse>{
    return this.http.get<JwtResponse>(`${environment.BASE_URL}/auth/profile`, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.getToken()}`})});
  }

  getUserEmail(email: string): Observable<JwtResponse>{
    return this.http.get<JwtResponse>(`${environment.BASE_URL}/auth/finduser/${email}`, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.getToken()}`})})
  }

  private setToken(token: string): void{
    this.cookie.set("token", token);
  }

  getToken(): string{
    return this.cookie.get("token");;
  }

  logOut(): void{
    this.cookie.delete("token");
  }

}
