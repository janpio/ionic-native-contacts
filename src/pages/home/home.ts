import { Component } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private contacts: Contacts) {

  }

  getContacts(): void {
    this.contacts.find(
      ["displayName", "phoneNumbers","photos"],
      {multiple: true, hasPhoneNumber: true}
      ).then((contacts) => {
        console.log(contacts);
    });
  }

}
