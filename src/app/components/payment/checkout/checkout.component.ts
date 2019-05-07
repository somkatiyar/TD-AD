import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var Frames;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent implements OnInit,AfterViewInit{
  // @ViewChild('myForm') public paymentForm: any;
  // @ViewChild('payBtn') public payNowButton: any;

  constructor() { }


  ngOnInit() {
    // var paymentForm =<HTMLInputElement>document.getElementById("payment-form");
    // var payNowButton = <HTMLInputElement>document.getElementById("pay-now-button");

    // Frames.init({
    //   publicKey: 'pk_test_6ff46046-30af-41d9-bf58-929022d2cd14',
    //   containerSelector: '.frames-container',
    //   cardValidationChanged: function() {
    //     // if all fields contain valid information, the Pay now
    //     // button will be enabled and the form can be submitted
    //     payNowButton.disabled = !Frames.isCardValid();
    //   },
    //   cardSubmitted: function() {
    //     payNowButton.disabled = true;
    //     // display loader
    //   },
    //   cardTokenised: function(event) {
    //     var cardToken = event.data.cardToken;
    //     console.log(event.data.cardToken,'card token')
    //     Frames.addCardToken(paymentForm, cardToken)
    //     paymentForm.submit()
    //   },
    //   cardTokenisationFailed: function(event) {
    //     // catch the error
    //   }
    // });
    // paymentForm.addEventListener('submit', function(event) {
    //   event.preventDefault();
    //   Frames.submitCard();
    // });

    // var style = {
    //   '.embedded .card-form .input-group': {
    //       borderRadius: '5px'
    //   },
    // }

  }

  ngAfterViewInit() {
  
  //   console.log(this.paymentForm)
  //   Frames.init({
  //     publicKey: 'pk_test_6ff46046-30af-41d9-bf58-929022d2cd14',
  //     containerSelector: '.frames-container',
  //     cardValidationChanged: function() {
  //       // if all fields contain valid information, the Pay now
  //       // button will be enabled and the form can be submitted
  //       this.payNowButton.disabled = !Frames.isCardValid();
  //     },
  //     cardSubmitted: function() {
  //       this.payNowButton.disabled = true;
  //       // display loader
  //     },
  //     cardTokenised: function(event) {
  //       var cardToken = event.data.cardToken;
  //       Frames.addCardToken(this.paymentForm, cardToken)
  //       this.paymentForm.submit()


  //     },
  //     cardTokenisationFailed: function(event) {
  //       // catch the error
  //     }
  //   });
  //   this.paymentForm.addEventListener('submit', function(event) {
  //     event.preventDefault();
  //     Frames.submitCard();
  //   });
  // }

}
}