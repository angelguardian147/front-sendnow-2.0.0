import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { 
  
  constructor(private canvasService: NgbOffcanvas) {}

  ngOnInit(): void {
  }

  openMenu(){
    this.canvasService.open(MenuLateralComponent);
  }

}
