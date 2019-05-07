import { Component, OnInit } from '@angular/core';
 declare var window : any;
@Component({
  selector: 'app-payment-checkout',
  templateUrl: './payment-checkout.component.html',
  styleUrls: ['./payment-checkout.component.css']
})
export class PaymentCheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.CKOConfig = {
      publicKey: 'pk_test_6ff46046-30af-41d9-bf58-929022d2cd14',
      customerEmail: 'user@email.com',
      value: 100,
      currency: 'GBP',
      paymentMode: 'cards',
      cardFormMode: 'cardTokenisation',
      cardTokenised: function(event) {
        console.log(event.data.cardToken);
      }
    }
  }

}
