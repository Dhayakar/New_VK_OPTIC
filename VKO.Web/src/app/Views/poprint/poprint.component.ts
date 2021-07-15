import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { purchaseorderview, purchasedetails } from '../../Models/ViewModels/purchaseorderview.model';
import Swal from 'sweetalert2';
import * as _l from 'lodash';
import { map, startWith } from 'rxjs/operators';
import * as _ from 'lodash';
declare var $: any;


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}
export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'DD-MMM-YYYY HH:mm',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'

};

@Component({
  selector: 'app-poprint',
  templateUrl: './poprint.component.html',
  styleUrls: ['./poprint.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
  ],
})
export class POPRINTComponent implements OnInit {

  @ViewChild('purchaseorderPrintingForm') Form: NgForm

  displayedColumns: string[] = ['DrugName', 'PurchaseUOM', 'Quantity', 'recevicedQuantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalAmount'];
  dataSource = new MatTableDataSource();

  displayedColumnsprint: string[] = ['DrugNameprint', 'PurchaseUOMprint', 'Quantityprint', 'recdQuantityprint', 'UnitPriceprint', 'Amountprint', 'Discountprint', 'DiscountAmountprint', 'GrossAmountprint', 'TaxDescriptionprint', 'GSTprint', 'GSTValueprint', 'TotalAmountprint'];
  dataSourceprint = new MatTableDataSource();

  isDisabled = true;



  a = [
    '',
    'One ',
    'Two ',
    'Three ',
    'Four ',
    'Five ',
    'Six ',
    'Seven ',
    'Eight ',
    'Nine ',
    'Ten ',
    'Eleven ',
    'Twelve ',
    'Thirteen ',
    'Fourteen ',
    'Fifteen ',
    'Sixteen ',
    'Seventeen ',
    'Eighteen ',
    'Nineteen '];

  b = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety'];

  transformValue(value: any, args?: any): any {
    if (value) {
      let num: any = Number(value);
      if (num) {
        if ((num = num.toString()).length > 9) { return 'We are not the Iron Bank, you can lower down the stakes :)'; }
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) { return ''; }
        let str = '';
        str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'crore ' : '';
        str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'lakh ' : '';
        str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'thousand ' : '';
        str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'hundred ' : '';
        str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') +
          (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' +
            this.a[n[5][1]]) : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }


  constructor(public commonService: CommonService<purchaseorderview>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder) {
  }

  Country1;
  Country2;
  TransactionId;
  Getloctime;
  cmpid;
  ngOnInit() {
    debugger;
    this.commonService.data = new purchaseorderview();
    var Pathname = "Inventorylazy/POPRINT";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.TransactionId = res.TransactionID;
    this.Getloctime = localStorage.getItem('GMTTIME');
    this.cmpid = parseInt(localStorage.getItem("CompanyID"));
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.Country1 = data[0].Value;
      this.Country2 = data[0].Text;
    });
    this.commonService.getListOfData('Common/Getsuppliervalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => { this.Suppliername = data; });
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => {
      this.Locationname = data;
    });

  }
  modalpreview;
  backdrop;
  dataSourcem;
  Purchaseorderhistory() {
    this.modalpreview = 'block';
    this.backdrop = 'block';
    this.modalpreview = 'block';
    this.backdrop = 'block';
    $(document).ready(function () {
      $("#myInputgrn").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTablegrn tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

    this.commonService.getListOfData('purchaseorder/purchasehis/' + this.cmpid + '/' + this.TransactionId + '/' + this.Getloctime).subscribe(data => {
      debugger;
      if (data.purchaseorderhist.length > 0 || data.purchaseorderhist3.length > 0 || data.purchaseorderhist4.length > 0) {
        debugger;
        let arr = data.purchaseorderhist.concat(data.purchaseorderhist3, data.purchaseorderhist4);
        let his = _.orderBy(arr, ['PONumber'], ['desc']);
        this.dataSourcem = his;

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data not found',
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
  modalSuccesspreview() {
    this.modalpreview = 'none';
    this.backdrop = 'none';

  }
  getColor(Status) {
    switch (Status) {
      case "Open":
        return "green";
      case "PARTIALLY RECEIVED":
        return "blue";
      case "RECEIVED":
        return "red";
      case "Cancelled":
        return "yellow";
    }
  }

  Locationcitiesname;
  Statecountry;
  Locationcity;
  Statesuplier;
  Suppliername;
  Locationname;
  Supplier;
  Suppliernameprint;
  Address1;
  Location;
  PhoneNo;
  GSTNo;
  PurchaseDate;
  POID;
  PONumber;
  Quotationno;
  Quotationdate;
  DeliveryName;
  DAddress1;
  DAddress2;
  DAddress3;
  PLocationn;
  purchaseno;
  CAddress;
  CPhone;
  CWebb;
  company;
  Instructions;
  Locations;
  DrugNameList;
  Validity;
  Delivery;
  PaymentandTerms;
  purchaseorderarray = [];
  PTotalpoo;
  ptotalwords;
  selectpurchase(item) {
    debugger;
    this.commonService.getListOfData('Common/GetDrugvalues/' + item.VendorID + '/' + this.cmpid).subscribe((data: any) => {
      this.DrugNameList = data;
      this.commonService.getListOfData('purchaseorder/GetlocationDetails/' + item.DeliverylocationID + '/')
        .subscribe((data: any) => {
          this.Statecountry = data.ParentDescriptionstate + " " + "/" + " " + data.ParentDescriptioncountry == " / " ? " " : data.ParentDescriptionstate + " " + "/" + " " + data.ParentDescriptioncountry;
          this.commonService.getListOfData('Common/Getlocationvalues/' + item.DeliverylocationID).subscribe(data => {
            debugger;
            this.Locationcitiesname = data;
            this.commonService.getListOfData('purchaseorder/Getpurchaseprint/' + item.RandomUniqueID + '/' + this.cmpid + '/' + this.Getloctime + '/' + item.Status + '/' + item.PONumber).subscribe((data: any) => {
              debugger;
              this.isDisabled = false;
              this.purchaseno = data.PooNumber;
              this.PurchaseDate = data.PooDate;
              this.Quotationno = data.QoNo;
              this.Quotationdate = data.QoDate;
              if (data.VendorID != 0) {
                let VendorID = this.Suppliername.find(y => y.Text == data.VName)
                this.Supplier = VendorID.Values;
                this.Suppliernameprint = data.VName;
              }
              else {
                this.Supplier = '';
              }
              this.Address1 = data.VAddress1 + " " + data.VAddress2 == " " ? " " : data.VAddress1 + " " + data.VAddress2;
              if (data.VLocation != null && data.VParentDescriptioncity != null) {
                this.Location = data.VLocation + " " + "/" + " " + data.VParentDescriptioncity;
              }

              if (data.VLocation == null && data.VParentDescriptioncity != null) {
                this.Location = data.VParentDescriptioncity
              }

              if (data.VLocation == null && data.VParentDescriptioncity == null) {
                this.Location = "";
              }

              if (data.VParentDescriptionstate == null && data.VParentDescriptioncountry == null) {
                this.Statesuplier = "";
              }

              if (data.VParentDescriptionstate != null && data.VParentDescriptioncountry != null) {
                this.Statesuplier = data.VParentDescriptionstate + " " + "/" + " " + data.VParentDescriptioncountry;
              }
              this.PhoneNo = data.VPhoneno;
              this.GSTNo = data.VGstno;
              this.DeliveryName = data.PDelivery;
              this.DAddress1 = data.PDeliveryadd1;
              this.DAddress2 = data.PDeliveryadd2;
              this.DAddress3 = data.PDeliveryadd1 + " " + data.PDeliveryadd2 == " " ? " " : data.PDeliveryadd1 + " " + data.PDeliveryadd2;
              if (data.PDeliveryParentDescriptioncity != "") {
                let LocationID = this.Locationname.find(y => y.Text == data.PDeliveryParentDescriptioncity)
                this.Locations = LocationID.Value;
              }
              else {
                this.Locations = '';
              }

              if (data.PLocation != "") {
                if (data.PLocation != null) {
                  let LocationID = this.Locationcitiesname.find(y => y.Text == data.PLocation)
                  this.Locationcity = LocationID.Value;
                }
                else {
                  this.Locationcity = '';
                }
              }

              if (data.PLocation != null && data.PDeliveryParentDescriptioncity != null) {
                this.PLocationn = data.PLocation + " " + "/" + " " + data.PDeliveryParentDescriptioncity;
              }
              if (data.PLocation == null && data.PDeliveryParentDescriptioncity != null) {
                this.PLocationn = data.PDeliveryParentDescriptioncity
              }

              if (data.PLocation == null && data.PDeliveryParentDescriptioncity == null) {
                this.PLocationn = "";
              }

              let PTotalpoo = this.GetTotalAmount();
              this.PTotalpoo = Math.trunc(PTotalpoo);
              let ptotalwords = Math.trunc(data.PTotalpo);
              this.ptotalwords = ptotalwords;
              this.Validity = data.Validy;
              this.Delivery = data.Deliverr;
              this.PaymentandTerms = data.payments;
              this.Instructions = data.Term;
              this.CAddress = data.Addresss + "" + data.cAddress1 + "" + data.cAddress2;
              this.CPhone = data.Phonee;
              this.CWebb = data.Webb;
              this.company = data.company;
              this.purchaseorderarray = data.Potransdetails;
              this.commonService.data.purchasedetails = this.purchaseorderarray;
              this.dataSource.data = this.commonService.data.purchasedetails;
              this.dataSourceprint.data = this.commonService.data.purchasedetails;
              this.dataSource._updateChangeSubscription();
              this.modalSuccesspreview();
            });
          });
        });
    });

  }

  purchaseprint;
  printclose(): void {
    this.backdrop = 'none';
    this.purchaseprint = 'none';
  }
  printsss() {

    let printContents, popupWin;
    printContents = document.getElementById('printss').innerHTML;
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
    this.purchaseprint = 'none';
  }

  cancelblock;
  CancelClk() {
    debugger;
    if (this.PurchaseDate != null || this.Quotationno != null || this.Quotationdate != null || this.Supplier != null || this.Address1 != null || this.Location != null || this.PhoneNo != null || this.GSTNo != null || this.DeliveryName != null || this.DAddress1 != null || this.DAddress2 != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
  }
  modalcloseOk() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    debugger;
    this.CAddress = undefined;
    this.CPhone = undefined;
    this.CWebb = undefined;
    this.company = undefined;
    this.purchaseno = undefined;
    this.PLocationn = undefined;
    this.DAddress3 = undefined;
    this.Suppliernameprint = undefined;
    this.PhoneNo = undefined;
    this.GSTNo = undefined;
    this.Address1 = undefined;
    this.Location = undefined;
    this.Statesuplier = undefined;
    this.Form.onReset();
    this.dataSource.data = [];
    this.purchaseorderarray = [];
    this.commonService.data.purchasedetails = [];
    this.isDisabled = true;
    this.backdrop = 'none';
    this.cancelblock = 'none';

  }


  GetTotalcost() {
    return this.commonService.data.purchasedetails.map(t => t.ItemValue).reduce((acc, value) => acc + value, 0);
  }

  GetGrossAmount() {
    return this.commonService.data.purchasedetails.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);

  }

  GetDiscountAmount() {
    return this.commonService.data.purchasedetails.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
  }

  GetTotalAmount() {
    return this.commonService.data.purchasedetails.map(t => t.TotalAmount).reduce((acc, value) => acc + value, 0);
  }

  GetGSTAmount() {
    return this.commonService.data.purchasedetails.map(t => t.GSTTaxValue).reduce((acc, value) => acc + value, 0);

  }

  GetCESSAmount() {
    return this.commonService.data.purchasedetails.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
  }

  GetAdditionalCESSAmount() {
    return this.commonService.data.purchasedetails.map(t => t.AddCESSAmount).reduce((acc, value) => acc + value, 0);
  }

  Taxtotalamount() {
    return this.GetGSTAmount() + this.GetCESSAmount() + this.GetAdditionalCESSAmount();
  }


  print() {
    debugger;
    this.backdrop = 'block';
    this.purchaseprint = 'block';
  }




}
