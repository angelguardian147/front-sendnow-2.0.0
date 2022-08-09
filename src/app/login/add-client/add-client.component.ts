import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit, OnDestroy {
  
  data: Client = { 
    firstName: '',
    lastName: '',
    charge: '',
    company: '',
    email: '',
    estado: '',
    address: '',
  };

  log: Login = { 
    data: this.data 
  };

  errorMsg!: string;

  createSubscription!: Subscription;

  constructor(public activeModal: NgbActiveModal,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    
  }
  
  save(){
    this.loginService.create(this.log)
      .subscribe(
        res => {
          this.router.navigate(['/account']);
        },
        err => {
          this.errorMsg = err.error.message;
        }
      );
  }

  ngOnDestroy(): void {
      this.createSubscription.unsubscribe();
  }

}
