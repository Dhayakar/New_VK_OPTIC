import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTableDataSource, MatPaginator, MatSelect } from '@angular/material';
import { CommonService } from 'src/app/shared/common.service';
import { AppComponent } from 'src/app/app.component';
import { DatePipe } from '@angular/common';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker/models';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeComponent } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { OpticalStockLedgerView, StoreArray, BrandArray } from 'src/app/Models/ViewModels/optical-stock-ledger-view';
import { FormControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material/core';
declare var $: any;
import * as _ from 'lodash';
import * as _moment from 'moment';
import moment = require('moment');
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
declare var jQuery: any;
import * as _l from 'lodash';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-optical-stock-ledger',
  templateUrl: './optical-stock-ledger.component.html',
  styleUrls: ['./optical-stock-ledger.component.less'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class OpticalStockLedgerComponent implements OnInit {

  displayedColumns: string[] = ['Document', 'DocumentNumber', 'Type', 'Store', 'Brand', 'Color', 'UOM', 'OpeningBalance', 'ClosingBalance', 'Receipt', 'Issue'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('OpticalStockLedger') Form: NgForm
  @ViewChild(MatSort) sort: MatSort;

  constructor(public commonService: CommonService<OpticalStockLedgerView>, public datepipe: DatePipe,
    public appComponent: AppComponent, public el: ElementRef, private cahngeDatectorrefs: ChangeDetectorRef, private router: Router) { }

  date = new FormControl(new Date());

  maxDate = new Date();
  mintoDate = new Date();
  

  ngOnInit() {
    debugger;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.commonService.data = new OpticalStockLedgerView();
    var Pathname = "Opticalslazy/OpticalStockLedger";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    var n = Pathname;
    var sstring = n.includes("/");
    this.CompanyID = localStorage.getItem("CompanyID");
    this.Getloctime = localStorage.getItem('GMTTIME');
    this.commonService.getListOfData('Common/GetBranchAll/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
      this.GetBranchdata = data;
    });

    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
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


  accesspopup;
  backdrop;
  StoreName;
  GetBranchdata;
  GetBranddata;
  CompanyID;
  storename;
  accessdata;
  M_FromDate;
  M_ToDate;
  BranchDrop;
  M_BrandDataDrop;
  cmpname;
  company;
  address;
  phoneno;
  website;
  Getloctime;
  isInvalid = false;
  disSubmit: boolean = true;
  disprint: boolean = true;
  TableData: boolean = false;
  TableMain: boolean = true;

  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/OpticalStockLedger";
    var n = Pathname;
    var sstring = n.includes("/");
    if (sstring == false) {
      this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }

    else if (sstring == true) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
        debugger;
        this.accessdata = data.GetAvccessDetails;
        this.backdrop = 'block';
        this.accesspopup = 'block';
      });
    }
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }



  selectdBranch(event) {
    debugger;
    this.allSelected = false;
    let result = event.value.Value;
    this.commonService.getListOfData('Common/GetbranchstoreDropdownvalues/' + result + '/' + "Stock Department").subscribe(data => { this.StoreName = data });
  }

  selectdBrand(event) {
    debugger;
    this.allSelected = false;
    let res = event.value.Value;
    this.commonService.getListOfData('Common/GetBrandAll/' + res).subscribe((data: any) => { this.GetBranddata = data; });
  }

  fromDate() {
    debugger;
    this.mintoDate = this.M_FromDate;
  }



  @ViewChild('select') select: MatSelect;
  allSelected = false;
  StoreArray = [];
  selectdstore() {
    debugger;

    this.StoreArray = [];
    this.commonService.data.StoreArray = [];
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    }
    else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }

    if (this.storename.length > 0) {
      this.storename.forEach(id => {
        debugger;
        var sa = new StoreArray();
        sa.StoreID = id.Value;
        sa.StoreName = id.Text;
        this.StoreArray.push(sa);
        this.commonService.data.StoreArray = this.StoreArray;
      });
    } else {
      this.StoreArray = this.storename;
      this.commonService.data.StoreArray = this.StoreArray;
    }

  }
  optionClick() {
    debugger;

    this.StoreArray = [];
    this.commonService.data.StoreArray = [];
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
    if (this.storename.length > 0) {
      this.storename.forEach(id => {
        debugger;
        var sa = new StoreArray();
        sa.StoreID = id.Value;
        sa.StoreName = id.Text;
        this.StoreArray.push(sa);
        this.commonService.data.StoreArray = this.StoreArray;
      });
    }
  }

  @ViewChild('selectBrand') selectBrand: MatSelect;
  allSelectedBrand = false;
  BrandArray = [];
  selectselectbrand() {
    debugger;
    this.BrandArray = [];
    this.commonService.data.BrandArray = [];
    if (this.allSelectedBrand) {
      this.selectBrand.options.forEach((item: MatOption) => item.select());
    }
    else {
      this.selectBrand.options.forEach((item: MatOption) => item.deselect());
    }

    if (this.M_BrandDataDrop.length > 0) {
      this.M_BrandDataDrop.forEach(id => {
        debugger;
        var sa = new BrandArray();
        sa.BrandID = id.Value;
        sa.BrandName = id.Text;
        this.BrandArray.push(sa);
        this.commonService.data.BrandArray = this.BrandArray;
      });
    } else {
      this.BrandArray = this.M_BrandDataDrop;
      this.commonService.data.BrandArray = this.BrandArray;
    }

  }
  optionClickBrand() {
    debugger;
    this.BrandArray = [];
    this.commonService.data.BrandArray = [];
    let newStatus = true;
    this.selectBrand.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedBrand = newStatus;
    if (this.M_BrandDataDrop.length > 0) {
      this.M_BrandDataDrop.forEach(id => {
        debugger;
        var sa = new BrandArray();
        sa.BrandID = id.Value;
        sa.BrandName = id.Text;
        this.BrandArray.push(sa);
        this.commonService.data.BrandArray = this.BrandArray;
      });
    }
  }

  array = [];

  Submit(form: NgForm) {
    debugger;

    if (this.M_FromDate == undefined || this.M_FromDate == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose From Date',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }

    if (this.M_ToDate == undefined || this.M_ToDate == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose To Date',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }

    if (form.valid) {
      this.isInvalid = false;

      let FromDate = this.datepipe.transform(this.M_FromDate, 'dd-MMM-yyyy');
      let ToDate = this.datepipe.transform(this.M_ToDate, 'dd-MMM-yyyy');

      this.commonService.postData('OpticalStockLedger/GetStockLedger/' + FromDate + '/' + ToDate + '/' + this.BranchDrop.Value + '/' + this.Getloctime, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Opticalstockledger.length > 0 || data.OpticalstockledgerI.length > 0 || data.Companycomm > 0) {
            debugger;
            this.spans = [];
            this.array = data.Opticalstockledger.concat(data.OpticalstockledgerI);
            let orderbyDate = _.orderBy(this.array, ['DocumentDate'], ['desc']);
            let orderby = _.orderBy(orderbyDate, ['ID'], ['desc']);
            this.array = orderby;
            this.dataSource.data = this.array;
            this.dataSource._updateChangeSubscription();
            this.cmpname = this.array[0].CmpName;
            this.company = data.Companycomm[0].Companyname;
            this.address = data.Companycomm[0].Address;
            this.phoneno = data.Companycomm[0].Phoneno;
            this.website = data.Companycomm[0].Web;
            this.cacheSpan('ID', d => d.ID);
            this.TableData = true;
            this.TableMain = false;
          }
          else {
            this.TableData = false;
            this.TableMain = true;
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
  }

  close() {
    this.TableData = false;
    this.TableMain = true;
    this.dataSource.data = [];
    this.dataSource.filter = '';
  }
  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTotalCost() {
    return this.array.map(t => t.Receipt).reduce((acc, value) => acc + value, 0);
  }
  getTotalCostissue() {
    return this.array.map(t => t.Issue).reduce((acc, value) => acc + value, 0);
  }
  spans = [];
  cacheSpan(key, accessor) {
    for (let i = 0; i < this.array.length;) {

      let currentValue = accessor(this.array[i]);
      let count = 1;
      for (let j = i + 1; j < this.array.length; j++) {
        if (currentValue != accessor(this.array[j])) {
          break;
        }
        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }
      this.spans[i][key] = count;
      i += count;

    }
  }
  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }
  resetform() {
    this.M_FromDate = undefined;
    this.M_ToDate = undefined;
    this.BranchDrop = undefined;
    this.storename = undefined;
    this.M_BrandDataDrop = undefined;
    this.allSelectedBrand = undefined;
    this.allSelected = undefined;
  }
  Cancel() {
    debugger;
    if (this.M_FromDate != undefined || this.M_FromDate != "" || this.M_ToDate != undefined || this.M_ToDate != ""
      || this.BranchDrop != undefined || this.BranchDrop != "" || this.storename != undefined || this.storename != ""
      || this.M_BrandDataDrop != undefined || this.M_BrandDataDrop != "") {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to Cancel",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        allowOutsideClick: false,
        reverseButtons: true,
        focusCancel: true,
      }).then((result) => {
        debugger;
        if (result.value) {
          this.Form.onReset();
          this.resetform();
          this.array = [];
          this.spans = [];
          this.StoreArray = [];
          this.commonService.data.StoreArray = [];
          this.BrandArray = [];
          this.commonService.data.BrandArray = [];
          this.dataSource.data = [];
          this.TableData = false;
          this.TableMain = true;
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Cancelled',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Your records has not been cancelled',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
      })
    }
  }
  print() {
    debugger;

    this.dataSource.data = this.array;
    this.dataSource._updateChangeSubscription();
    this.opprint = 'block';

  }
  opprint;
  prints() {
    let printContents, popupWin;
    printContents = document.getElementById('demo').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
    popupWin.document.open();
    popupWin.document.write(`
             <html>
             <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
            <title></title>
            <style> 
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
    popupWin.document.close();
    this.opprint = 'none';
  }
  printclose() {
    this.opprint = 'none';
  }


  ////Excel

  fireEvent() {
    let element = document.getElementById('contentToConvert');
    var cloneTable = element.cloneNode(true);
    jQuery(cloneTable).find('.remove-this').remove();

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(cloneTable);

    var wscols = [
      { wch: 50 },
      { wch: 12 },
      { wch: 30 },
      { wch: 10 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'OpticalStockLedger');
    XLSX.writeFile(wb, "OpticalStockLedger.xlsx");
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
