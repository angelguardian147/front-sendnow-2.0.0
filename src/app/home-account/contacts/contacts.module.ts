import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [ContactsComponent, CardComponent],
  imports: [
    CommonModule
  ],
  providers: [ContactsService]
})
export class ContactsModule { }
