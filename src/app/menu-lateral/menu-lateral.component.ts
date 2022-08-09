import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { JwtResponse } from '../interfaces/jwt-response';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit, OnDestroy {

  access = false;
  user!: JwtResponse;
  profileSubscription!: Subscription;

  constructor(public activeOffcanvas: NgbActiveOffcanvas,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.profile();
  }

  profile(){
    this.profileSubscription = this.loginService.profile().subscribe(
      res => {
        if(res && res.email){
          this.user = res;
          this.access = true;
          this.router.navigate(['/account']);
        }else{
          this.access = false;
          this.router.navigate(['/']);
        }
      },
      err => {
        console.log(err)
        this.access = false;
          this.router.navigate(['/']);
      }
    );
  }

  logOut(){
    this.loginService.logOut();
    this.ngOnInit();
  }

  ngOnDestroy(): void {
      this.profileSubscription.unsubscribe();
  }

}
