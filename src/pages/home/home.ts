import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Contacts } from '@ionic-native/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private contacts: Contacts, private sanitizer: DomSanitizer) {

  }

  contactList = [];

  getContacts(): void {
    this.contacts.find(
      ["displayName", "phoneNumbers","photos"],
      {multiple: true, hasPhoneNumber: true}
      ).then((contacts) => {
        for (var i=0 ; i < contacts.length; i++){
          if(contacts[i].displayName !== null) {
            var contact = {};
            contact["name"]   = contacts[i].displayName;
            contact["number"] = contacts[i].phoneNumbers[0].value;
            if(contacts[i].photos != null) {
              console.log(contacts[i].photos);
              contact["image"] = this.sanitizer.bypassSecurityTrustUrl(contacts[i].photos[0].value);
              console.log(contact);
            } else {
              contact["image"] = "assets/dummy-profile-pic.png";

            }
            this.contactList.push(contact);
          }
        }
    });
  }

}
