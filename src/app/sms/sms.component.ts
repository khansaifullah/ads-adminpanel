import { Component, OnInit } from '@angular/core';
import { SmsService } from './sms.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
  providers: [ SmsService ]
})
export class SmsComponent implements OnInit {

  // authorName: string;
  message: string;

  constructor(private smsService: SmsService, private router: Router) { }

  ngOnInit() {
  }

  sendMessage() {
    console.log (this.message);
    // console.log (this.authorName);
    if ( this.message === undefined ) {
      alert('Please type your Message ');
    }else {

      this.smsService.sendSms(this.message).subscribe(
        u => {
         this.ngOnInit();
         console.log (u.status);
        //  if (u.status === 'success') {
         alert('Message Sent Successfully!');
        // }

        });
        this.message = '';

    }
  }
}
