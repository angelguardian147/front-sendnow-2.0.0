import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() clt!: Client;

  constructor() { }

  ngOnInit(): void {
  }

}
