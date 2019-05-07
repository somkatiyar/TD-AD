import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../service/dataservice.service';
import { VarService } from 'src/app/service/var.service';
import { Component, OnInit } from '@angular/core';

// import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { totalmem } from 'os';

declare var jsPDF: any;

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoiceId: any;
  invoice: any;
  invoiceDetails: any[] = [];
  organisation: any;

  constructor(public varCtrl: VarService, public serviceCtrl: DataService, public activatedRoute:ActivatedRoute) { 
    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Invoice Detail";
    
  }

  ngOnInit() {
    this.invoiceId = this.activatedRoute.snapshot.params['id'];
    if(this.invoiceId){
      this.getInvoiceDetailById();
    }
  }
  goBack(){
    window.history.back();
  }
  getInvoiceDetailById(){
    let admin = JSON.parse(localStorage.getItem('adminDetail'));
    console.log("admin", admin);
    if(admin && admin['token']){
        let requestJSON = {
          "token": admin['token'],
          "invoiceId": this.invoiceId
        };
      
      this.serviceCtrl.postCall('admin/invoiceDetailById',requestJSON).subscribe(res => {
        console.log("invoiceDetail",res);
        if(res && res['status']){
          this.invoiceDetails = res['data']['rides'];
          this.organisation =  res['data']['organisation'];
          this.invoice =  res['data']['invoice'];
        }
      }, err => {
        console.log("error",err);
      });
    }
  }

  pay(){
    let admin = JSON.parse(localStorage.getItem('adminDetail'));
    console.log("admin", admin);
    if(admin && admin['token']){
        let requestJSON = {
          "token": admin['token'],
          "invoiceId": this.invoiceId
        };
      
      this.serviceCtrl.postCall('admin/updateInvoiceStatusById',requestJSON).subscribe(res => {
        console.log("invoiceDetail",res);
        if(res && res['status']){
          this.serviceCtrl.success(res['message']);
          this.getInvoiceDetailById();
        }
      }, err => {
        console.log("error",err);
      });
    }
  }

  getOnlyDate(date){
    let d = new Date(date);
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = d.getDate();
    var monthIndex = d.getMonth();
    var year = d.getFullYear();

    var hours = d.getHours();
    var minutes = ""+d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let h = hours < 10 ? "0"+hours : ""+hours;
    minutes = minutes < ""+10 ? '0'+minutes : ""+minutes;
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  getReceipt(){
    console.log("Invoice Details",this.organisation, this.invoice, this.invoiceDetails);
    var doc = new jsPDF('p','mm','a4');  
    
    doc.setFontSize(14);    
    doc.text(this.organisation.name+" INVOICE", 15, 15);
    doc.setFontSize(10);    
    doc.text("Address: "+this.organisation.address, 15, 20);
    doc.text("Contact Number: "+this.organisation.contactNumber, 15, 25);
    doc.text("Email: "+this.organisation.email, 15, 30);

    doc.setFontSize(11);    
    doc.text("Invoice Date : "+this.getOnlyDate(new Date(this.invoice.createdDate)), 15, 40);
    doc.text("Invoice ID : "+this.invoiceId.toUpperCase(), 15, 45);

    doc.setFontSize(12);
    var columns = ["#","Ride Date","Booking ID","Driver"];

    var rows = [];
    
    for(let i=0; i < this.invoiceDetails.length; i++){
      let data = [];
      data.push(i+1);
      data.push(this.getOnlyDate(this.invoiceDetails[i].startDateTime));
      data.push(this.invoiceDetails[i].bookingId);
      data.push(this.invoiceDetails[i].driverId.email);
      rows.push(data);
    }

    doc.autoTable(columns, rows, {
      theme: 'striped',
      startY: 60
    });

    let finalY = doc.autoTable.previous.finalY; // The y position on the page
    doc.setFontSize(11);
    let totalAmount = this.invoice.amount + this.invoice.tax;
    doc.text("--------------------------------------------------------------------------------------------------------------", 15, finalY+5);
    doc.text("Tax Amount(%) : "+this.invoice.tax, 15, finalY+10);
    doc.text("Total Amount($) : "+totalAmount, 75, finalY+10);
    doc.text("--------------------------------------------------------------------------------------------------------------", 15, finalY+15);

    finalY = finalY + 10 + 20;

    doc.setFontSize(12);
    doc.text("Invoice Status : "+(this.invoice.status == "NOT_PAID" ? "Unpaid" : "Paid"), 15, finalY);

    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');

  }

}
