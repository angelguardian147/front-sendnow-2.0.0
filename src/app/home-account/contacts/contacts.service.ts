import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { LoginService } from 'src/app/login/login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getClients(email_user: string): Observable<any[]>{
    return this.http.get<any[]>(`${environment.BASE_URL}/client/list/${email_user}`, 
      {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  find(param: string): Observable<any[]>{
    return this.http.get<any[]>(`${environment.BASE_URL}/client/search/${param}`,
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  findClient(email: string): Observable<Client>{
    return this.http.get<Client>(`${environment.BASE_URL}/client/findClient/${email}`,
      {'headers': new HttpHeaders({'Authorization':`Bearer ${this.loginService.getToken()}`})});
  }

  create(email: string, client: Client): Observable<any>{
    return this.http.post(`${environment.BASE_URL}/client/create/${email}`, client, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

  update(email: string, client: Client): Observable<any>{
    return this.http.patch(`${environment.BASE_URL}/client/update/${email}`, client, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})})
  }

  remove(email: string): Observable<any>{
    return this.http.delete(`${environment.BASE_URL}/client/delete/${email}`, 
    {'headers': new HttpHeaders({'Authorization':`Bearer  ${this.loginService.getToken()}`})});
  }

}
