import { Router } from '@angular/router';
import { DataService } from './../../service/dataservice.service';
import { VarService } from 'src/app/service/var.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  @ViewChild('close') modalClose: ElementRef;

  paymentType: any = "";
  status: any = "All";
  isSearch: boolean = false;
  fromDate: any;
  toDate: any;
  p: Number = 1;
  total: any;
  schools: any[];
  searchedSchools: any[];
  schoolSearchedText: any;
  selectedSchoolId: any = "";

  individuals: any[];
  searchedIndividuals: any[];
  individualSearchedText: any;
  selectedIndividualId: any = "";
  isInvoicesData : boolean = false;

  invoices: any[];
  tempInvoices: any[];

  constructor(public varCtrl: VarService, public serviceCtrl: DataService, public router: Router) {
    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Payment History";
  }

  ngOnInit() {
    this.getSchools();
    this.getIndividualDrivers();
    this.getInvoices();
  }

  getInvoices(currentPageCliked = 0) {
    let admin = JSON.parse(localStorage.getItem('adminDetail'));
    console.log("admin", admin);
    if (admin && admin['token']) {
      let requestJSON = {
        "token": admin['token'],
        "page": currentPageCliked

      };
      this.serviceCtrl.postCall('admin/invoices', requestJSON).subscribe(res => {
        console.log("invoices", res);
        if (res && res['status']) {
          this.invoices = res['data'];
          this.total = res.totalPages;
          this.tempInvoices = res['data'];
          this.isInvoicesData = true;;

        } else {
          this.isInvoicesData = false;;
        }
      }, err => {
        console.log("error", err);
      });
    }
  }

  paginationForInvoices(ev) {
    //console.log(ev);
    this.p = ev;
    this.getInvoices(ev - 1);
  }

  closeModal() {
    let el: HTMLElement = this.modalClose.nativeElement as HTMLElement;
    el.click();
  }
  sortInvoices() {

    if (this.status) {
      let s = "";
      if (this.status == 'Unpaid') {
        s = "NOT_PAID";
        this.invoices = this.tempInvoices.filter(o => o.status == "NOT_PAID");

        this.closeModal()

      }
      else if (this.status == 'Paid') {
        s = "PAID";
        this.invoices = this.tempInvoices.filter(o => o.status == "PAID");

        this.closeModal()
      }
      else {
        this.invoices = this.tempInvoices;

        this.closeModal()
      }
    }
  }

  getSchools() {
    let admin = JSON.parse(localStorage.getItem('adminDetail'));
    console.log("admin", admin);
    if (admin && admin['token']) {
      let requestJSON = {
        "token": admin['token']
      };
      this.serviceCtrl.postCall('admin/schools', requestJSON).subscribe(res => {
        console.log("schools", res);
        if (res && res['status']) {
          this.schools = res['data'];
        }
      }, err => {
        console.log("error", err);
      });
    }
  }

  getIndividualDrivers() {
    let admin = JSON.parse(localStorage.getItem('adminDetail'));
    console.log("admin", admin);
    if (admin && admin['token']) {
      let requestJSON = {
        "token": admin['token']
      };
      this.serviceCtrl.postCall('admin/individualDrivers', requestJSON).subscribe(res => {
        console.log("individualDrivers", res);
        if (res && res['status']) {
          this.individuals = res['data'];
        }
      }, err => {
        console.log("error", err);
      });
    }
  }

  searchSchool() {
    let schoolArray = this.schools;
    this.searchedSchools = schoolArray.filter((item) => {
      return ((item.school.schoolName.toLowerCase().indexOf(this.schoolSearchedText.toLowerCase()) > -1) || (item.user.firstName.toLowerCase().indexOf(this.schoolSearchedText.toLowerCase()) > -1));
    });
  }

  selectSchool(schoolId) {
    this.selectedSchoolId = schoolId;
    this.isSearch = !this.isSearch;
  }


  searchIndividual() {
    let individualArray = this.individuals;
    this.searchedIndividuals = individualArray.filter((item) => {
      return ((item.firstName && item.firstName.toLowerCase().indexOf(this.individualSearchedText.toLowerCase()) > -1) || (item.email && item.email.toLowerCase().indexOf(this.individualSearchedText.toLowerCase()) > -1));
    });
  }

  selectIndividual(driverId) {
    this.selectedIndividualId = driverId;
    this.isSearch = !this.isSearch;
  }

  navigateToinvoiceDetail(id) {
    this.router.navigate(['/invoice-detail', id]);
  }
}
