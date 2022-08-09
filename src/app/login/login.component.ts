import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Client } from '../interfaces/client';
import { JwtResponse } from '../interfaces/jwt-response';
import { Login } from '../interfaces/login';
import { AddClientComponent } from './add-client/add-client.component';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  log: Login = {};

  user: JwtResponse = {}
  clss: string = 'container';
  errorMsg2!: string;

  loginSubscription!: Subscription;

  constructor(private loginService: LoginService, 
              private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  send(){
    if(this.log.password && this.log.userName){
      this.loginSubscription = this.loginService.login(this.log.userName, this.log.password)
      .subscribe(
        res => {
          this.router.navigate(['/account']);
        },
        err => {
          this.errorMsg2 = err.error.message;
        }
      );
    }else{
      this.errorMsg2 = 'You have to fill all the fields';
    }

  }

  onShow(){
    this.modalService.open(AddClientComponent, { centered: true, size: 'lg' });
  }

  ngOnDestroy(): void {
      this.loginSubscription.unsubscribe();
  }

}
