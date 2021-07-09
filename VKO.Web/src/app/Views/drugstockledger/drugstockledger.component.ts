import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker/models';
//import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { CommonService } from 'src/app/shared/common.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { NgForm, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { number } from '@amcharts/amcharts4/core';
import { all } from 'q';
import { DrugStockSummaryView, TempArr } from '../../Models/ViewModels/drug-stock-summary-view';
import { Router } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM/YYYY',
  },
  display: {
    dateInput: 'MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-drugstockledger',
  templateUrl: './drugstockledger.component.html',
  styleUrls: ['./drugstockledger.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class DrugstockledgerComponent implements OnInit {

  constructor(public commonService: CommonService<DrugStockSummaryView>, public datepipe: DatePipe, public dialog: MatDialog,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef, private router: Router) { }

  M_AllSeDrop;
  accessdata = [];
  disSubmit: boolean = true;
  disprint: boolean = true;
  hidemain: boolean = false;
  TableMain: boolean = false;
  submitbrnd = true;
  GetBranddata = [];
  ngOnInit() {
    var Pathname = "Inventorylazy/drugstockledger";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");
    this.AllBranch = "All";
    this.M_AllSeDrop = "All";
    this.commonService.getListOfData('Common/GetFullstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID")))
      .subscribe(data => { this.StoreName = data; });
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {


        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });

       // this.dataSource.paginator = this.paginator;
        this.commonService.getListOfData('Common/GetBrandAllDrugs/').subscribe((data: any) => {
          debugger;
          this.GetBranddata = data;
        });

        //this.CompanyID = localStorage.getItem("CompanyID");
        this.getallDropdown();
        this.submitbrnd = true;
        this.hidemain = true;
        this.TableMain = true;
      }

      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });


      }

    }

    else if (sstring == true) {


      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {


        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });

        //this.dataSource.paginator = this.paginator;
        this.commonService.getListOfData('Common/GetBrandAllDrugs/').subscribe((data: any) => {
          debugger;
          this.GetBranddata = data;
        });

        //this.CompanyID = localStorage.getItem("CompanyID");
        this.getallDropdown();
        this.submitbrnd = true;
        this.hidemain = true;
        this.TableMain = true;
      }

      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + Pathname).subscribe(data => {
          this.router.navigate(['dash']);
        });


      }

    }



  }

  @ViewChild('DrugStockLedger') Form: NgForm

  /////Datepickers
  maxDateRMf = new Date();
  maxDatef = new Date();
  date = new FormControl(new Date());
  maxDate(): string {
    return new Date().toISOString().split('T')[0]
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  GetBranchdata = [];
  getallDropdown() {

    this.commonService.getListOfData('Common/GetBranchAll/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
      debugger;
      this.GetBranchdata = data;
    });

  }
  HideBranddrop: boolean = true;
  HideBranddropp: boolean = true;
  TableData: boolean = false;
  StoreName = [];
  AllBranch;
  BranchDrop;
  OptionSelectbr() {
    debugger;
    if (this.AllBranch == "All") {
      this.HideBranddropp = true;
      this.TableData = false;
      this.BranchDrop = '';
      this.commonService.getListOfData('Common/GetFullstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID")))
        .subscribe(data => { this.StoreName = data; });
    }
    else if (this.AllBranch == "Selective") {
      this.HideBranddropp = false;
      this.TableData = false;
      this.StoreName = [];
    }

  }

  branchid;
  CompanyID;
  selectdBranch(branch, event, id) {
    debugger;
    if (this.AllBranch == "Selective") {
      let result = event.value.Value;
      // this.branchid = result;
      this.CompanyID = result;

      this.commonService.getListOfData('Common/GetbranchstoreDropdownvalues/' + this.CompanyID)
        .subscribe(data => { this.StoreName = data; });
    }

  }

  storeid;
  scmpid;
  selectdstore(storename) {
    debugger;
    this.storeid = storename.Value;
    //this.scmpid = storename.Values;
    if (storename.Values != 0) {
      this.CompanyID = storename.Values;
    }
    this.submitbrnd = false;

  }
  M_BrandDataDrop;
  OptionSelect() {
    debugger;
    if (this.M_AllSeDrop == "All") {
      this.HideBranddrop = true;
      this.M_BrandDataDrop = undefined;
      this.TableData = false;
      this.commonService.data.IDArrays = undefined;
    }
    else if (this.M_AllSeDrop == "Selective") {
      this.HideBranddrop = false;
      this.TableData = false;
      this.commonService.data.IDArrays = undefined;
    }

  }
  brandid;
  selectdBrand(brand, event, id) {
    debugger;
    if (this.M_AllSeDrop == "Selective") {
      let result = event.value.Value;
      this.brandid = result;
    }

  }

  close() {
    this.TableData = false;
    this.TableMain = true;
  }
  TotalReciepts;
  TotalIssues;
  getTotalRecieptsValue() {
    debugger;
    var restotalcost = this.commonService.data.Ledgers.map(t => t.Receipt).reduce((acc, value) => acc + value, 0);
    this.TotalReciepts = restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }
  getTotalIssuesValue() {
    debugger;
    var restotalcost = this.commonService.data.Ledgers.map(t => t.Issue).reduce((acc, value) => acc + value, 0);
    this.TotalIssues = restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  displayedColumns = ['DNumber', 'Date', 'DocType', 'UOM', 'Receipts', 'Issues'];
  dataSource = new MatTableDataSource();

  M_ToDate;
  M_FromDate;
  brnd;
  cmpname;
  opstk;
  clostk;
  Buttonsss: boolean = false;
  Page: boolean = true;
  Submit(form: NgForm) {
    debugger;
    if (this.M_AllSeDrop == undefined && this.M_BrandDataDrop == undefined) {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Select Brand',
        showConfirmButton: true,
        timer: 2000
      });
    }

    else if (this.M_AllSeDrop == "Selective" && this.M_BrandDataDrop == undefined) {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Select Brand',
        showConfirmButton: true,
        timer: 2000
      });
    }
    else if (this.M_ToDate == undefined || this.M_FromDate == undefined) {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Select Date',
        showConfirmButton: true,
        timer: 2000
      });
    }

    else if (this.M_AllSeDrop == "Selective") {
      this.commonService.data = new DrugStockSummaryView();


      let FromDate = this.M_FromDate.toISOString();
      let ToDate = this.M_ToDate.toISOString();
      this.commonService.getListOfData('DrugStockSummary/Getdrgstockledger/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.brandid + '/' + this.storeid + '/')
        .subscribe(data => {
          debugger;
          if (data.Ledgers.length > 0) {
            this.commonService.data.Ledgers = data.Ledgers;
            this.dataSource.data = data.Ledgers;
            this.brnd = data.Ledgers[0].Brand;
            this.cmpname = data.Ledgers[0].CmpName;
            this.opstk = data.openstock;
            this.clostk = data.closestock;
            this.TableData = true;
            this.Buttonsss = true;
            this.Page = false;
            this.TableMain = false;
          }
          else {
            this.TableData = false;
            this.TableMain = true;
            this.Buttonsss = false;
            this.Page = true;
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'No data found',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }
        });



    }
    //else if (this.M_AllSeDrop == "All") {


    //  this.commonService.data = new DrugStockSummaryView();
    //  let FromDate = this.M_FromDate.toISOString();
    //  let ToDate = this.M_ToDate.toISOString();
    //  this.commonService.getListOfData('DrugStockSummary/GetStockSummary/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.storeid + '/')
    //    .subscribe(data => {
    //      debugger;
    //      if (data.Summary.length > 0) {
    //        this.brname = data.Summary[0].CmpName;
    //        this.dataSource.data = data.Summary;
    //        this.TableData = true;
    //        this.Buttonsss = true;
    //        this.TableMain = false;
    //        this.Page = false;

    //      }
    //      else {
    //        this.TableData = false;
    //        this.TableMain = true;
    //        this.Buttonsss = false;
    //        this.Page = true;
    //        Swal.fire({
    //          position: 'center',
    //          type: 'warning',
    //          title: 'No Datas Found..!',
    //          timer: 2000
    //        });
    //      }
    //    });
    //}
  }
}
