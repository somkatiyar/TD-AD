import { DataService } from 'src/app/service/dataservice.service';
import { VarService } from 'src/app/service/var.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  paymentType: any = "";
  status: any = "all";
  isSearch: boolean = false;
  fromDate: any;
  toDate: any;
  ed: any;
  sd: any;
  schools: any[];
  searchedSchools: any[];
  schoolSearchedText: any;
  selectedSchoolId: any = "";
  p: any = 1;
  individuals: any[];
  searchedIndividuals: any[];
  individualSearchedText: any;
  selectedIndividualId: any = "";

  invoiceDetails: any[];
  txtSearch: any;
  isSearching: boolean = false;
  isSearchBox: boolean = false;
  schoolTotal: any;
  driverTotal: any;
  constructor(public varCtrl: VarService,
    @Inject('picUrl') private picUrl: string,
    public serviceCtrl: DataService) {
    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Create Invoice";
  }

  ngOnInit() {
    this.getSchools();
    this.getIndividualDrivers();
  }

  getDetails() {
    let admin = JSON.parse(localStorage.getItem('adminDetail'));
    console.log("admin", admin);
    if (admin && admin['token']) {
      let requestJSON = {};
      if (this.paymentType == "individual") {
        requestJSON = {
          "token": admin['token'],
          "type": "INDIVIDUAL",
          "driverId": this.selectedIndividualId
        };
      } else {
        requestJSON = {
          "token": admin['token'],
          "type": "SCHOOL",
          "driverId": this.selectedSchoolId
        };
      }

      this.serviceCtrl.postCall('admin/invoiceDetail', requestJSON).subscribe(res => {
        console.log("invoiceDetail", res);
        if (res && res['status']) {
          this.invoiceDetails = res['data'];
          let temp = [];
          temp = res['data'];



          if (!(this.invoiceDetails && this.invoiceDetails.length)) {
            this.serviceCtrl.error("No Data Found..!");
          } else if (this.fromDate && this.toDate) {
            this.dateWiseFilter();
          }

        }
      }, err => {
        console.log("error", err);
      });
    }
  }

  checkGetDetails() {

 if(this.selectedIndividualId || this.selectedSchoolId) {
  if (this.fromDate || this.toDate) {

    if (this.fromDate && this.toDate) {
      this.getDetails();
    }
    else {
      this.serviceCtrl.error("Select From and To Date Both.. ");
    }

  } else {
    this.getDetails();

  }

 } else {
  this.serviceCtrl.error("Please Select User Type..!")
 }
    
  

  }


  dateWiseFilter() {
    if (this.sd && this.ed && this.invoiceDetails) {

      this.invoiceDetails = this.invoiceDetails.filter(d => {
        var time = new Date(d.createdDate).getTime();

        return (this.sd <= time && time <= this.ed);
      });
      if (this.invoiceDetails.length <= 0) {
        this.serviceCtrl.error("No Data Found From Selected Date")
      }
      console.log(this.invoiceDetails, 'x val')
    } else {

    }
  }

  getSchools(currentPageCliked = 0) {

    this.individualSearchedText = "";

    let admin = JSON.parse(localStorage.getItem('adminDetail'));
    console.log("admin", admin);
    if (admin && admin['token']) {
      let requestJSON = {
        "token": admin['token'],
        "page": currentPageCliked,
        "keyword": this.schoolSearchedText,
        "isSearching": this.isSearching
      };
      this.serviceCtrl.postCall('admin/schools', requestJSON).subscribe(res => {
        console.log("schools", res);
        if (res && res['status']) {
          this.schools = res['data'];
          this.schoolTotal = res.totalPages;
        }
      }, err => {
        console.log("error", err);
      });
    }
  }

  getIndividualDrivers(currentPageCliked = 0) {


    this.schoolSearchedText = "";


    let getdriver: any = {};


    let admin = JSON.parse(localStorage.getItem('adminDetail'));
    console.log("admin", admin);
    if (admin && admin['token']) {
      let requestJSON = {
        "token": admin['token'],
        "page": currentPageCliked,
        "keyword": this.individualSearchedText,
        "isSearching": this.isSearching
      };
      this.serviceCtrl.postCall('admin/individualDrivers', requestJSON).subscribe(res => {
        console.log("individualDrivers", res);
        if (res && res['status']) {
          this.individuals = res['data'];
          this.driverTotal = res.totalPages;
        }
      }, err => {
        console.log("error", err);
      });
    }
  }

  // searchSchool() {
  //   let schoolArray = this.schools;
  //   this.searchedSchools = schoolArray.filter((item) => {
  //     return ((item.school.schoolName.toLowerCase().indexOf(this.schoolSearchedText.toLowerCase()) > -1) || (item.user.firstName.toLowerCase().indexOf(this.schoolSearchedText.toLowerCase()) > -1));
  //   });
  // }

  selectSchool(schoolId) {
    this.schoolSearchedText = "";
    this.getSchools();
    this.schools = [];
    this.selectedSchoolId = schoolId;
    // this.isSearch = !this.isSearch;
  }


  // searchIndividual() {
  //   this.isSearchBox = true;
  //   let individualArray = this.individuals;
  //   this.searchedIndividuals = individualArray.filter((item) => {
  //     return ((item.firstName && item.firstName.toLowerCase().indexOf(this.individualSearchedText.toLowerCase()) > -1) || (item.email && item.email.toLowerCase().indexOf(this.individualSearchedText.toLowerCase()) > -1));
  //   });
  // }


  selectIndividual(driverId) {
    this.individualSearchedText = "";
    this.getIndividualDrivers();
    this.individuals = [];
    this.selectedIndividualId = driverId;
    // this.isSearch = !this.isSearch;
  }

  createInvoice() {
    let admin = JSON.parse(localStorage.getItem('adminDetail'));
    console.log("admin", admin);
    if (admin && admin['token']) {
      let requestJSON = {};
      if (this.paymentType == "individual") {
        requestJSON = {
          "token": admin['token'],
          "type": "INDIVIDUAL",
          "driverId": this.selectedIndividualId
        };
      } else {
        requestJSON = {
          "token": admin['token'],
          "type": "SCHOOL",
          "driverId": this.selectedSchoolId
        };
      }

      this.serviceCtrl.postCall('admin/createInvoice', requestJSON).subscribe(res => {
        console.log("createInvoice", res);
        if (res && res['status']) {
          this.serviceCtrl.success(res['message']);
          this.invoiceDetails = [];
        } else {
          this.serviceCtrl.error("Unable to proccess at this moment!");
        }
      }, err => {
        console.log("error", err);
      });
    }
  }


  onChange() {
    if (this.fromDate || this.toDate) {

      this.ed = new Date(this.toDate).setHours(23.59)
      this.sd = new Date(this.fromDate).setHours(0.00)

      if ((Date.parse(this.toDate) <= Date.parse(this.fromDate))) {
        this.serviceCtrl.error("To  Date must be grater that From Date..!");
        this.fromDate = "";
        this.toDate = "";
      }

      if (this.invoiceDetails.length > 0) {
        this.dateWiseFilter();
      }


    }
  }

  errorHandler(e) {
    console.log(e);
    e.target.src = 'assets/images/userPlaceholder.png';
  }

  paginationForDrivers(ev) {
    this.p = ev;
    if (this.individualSearchedText == "") {
      this.getIndividualDrivers(ev - 1);
    } else {
      this.searchIndividual(this.individualSearchedText, ev - 1)
    }


  }

  // refreshPopUp() {
  //   alert("refresh")
  //   this.getSchools();
  //   this.getIndividualDrivers();

  // }

  setValue() {
    if (this.paymentType == "individual") {
      this.individualSearchedText = "";
      this.getIndividualDrivers();
      this.individuals = [];
    } else {
      this.schoolSearchedText = "";
      this.getSchools();
      this.schools = [];
    }
  }

  searchIndividual(inputName, currentPageCliked = 0) {
 
    this.isSearching = true;
    this.getIndividualDrivers();
  }


  paginationForSchool(ev) {
    this.p = ev;
    if (this.schoolSearchedText == "") {
      this.getSchools(ev - 1);
    } else {
      this.searchSchool(this.schoolSearchedText, ev - 1);
    }

  }


  searchSchool(inputName, currentPageCliked = 0) {
 
    this.isSearching = true;
    this.getSchools();
  }









}