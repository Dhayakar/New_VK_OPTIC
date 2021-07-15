
import { Component, OnInit, ElementRef, ViewChild, Inject, ViewEncapsulation, QueryList, ViewChildren, Renderer } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSelect, MatInput } from '@angular/material';
import { MatAutocompleteModule, MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import * as _l from 'lodash';
import { map, startWith } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { GrnWpo, Itemdetails, SerialArraywithpo, BatchhDetails } from '../../Models/ViewModels/GRNWithoutpo.model';
import { StockMaster } from '../../Models/stockmaster.model';
import * as _moment from 'moment';
import moment = require('moment');
import { Pipe, PipeTransform } from '@angular/core';
import { object } from '@amcharts/amcharts4/core';

declare var $: any;


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
}
export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'DD-MMM-YYYY',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'

};

@Component({
  selector: 'app-grnwithoutpo',
  templateUrl: './grnwithoutpo.component.html',
  styleUrls: ['./grnwithoutpo.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },

  ],
  encapsulation: ViewEncapsulation.None,
})
export class GRNwithoutpoComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());



  @ViewChild('GrnWithoutPoForm') Form: NgForm
  @ViewChild(MatSort) sort: MatSort;

  public person =
    {
      Grossproductamount: 0,
      Totaldiscountamount: 0,
      Totalgstamount: 0,
      Totalpoamount: 0,
      Totalamount: 0,
      Totalcessamount: 0,
      TotalAdditionalcessamount: 0,
    };


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


  constructor(public commonService: CommonService<GrnWpo>,
    public datepipe: DatePipe, public el: ElementRef,
    public appComponent: AppComponent,
    private formBuilder: FormBuilder, private router: Router, public datePipe: DatePipe,) {

  }

  minToDate = new Date();
  maxToDate = new Date();
  ExpDate = new Date();


  displayedColumns: string[] = ['DrugName', 'PurchaseUOM', 'Quantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalAmount', 'Delete'];
  dataSource = new MatTableDataSource();

  displayedColumnsprint: string[] = ['DrugNameprint', 'PurchaseUOMprint', 'Quantityprint', 'UnitPriceprint', 'Amountprint', 'Discountprint', 'DiscountAmountprint', 'GrossAmountprint', 'TaxDescriptionprint', 'GSTprint', 'GSTValueprint', 'TotalAmountprint'];
  dataSourceprint = new MatTableDataSource();

  displayedColumnsview: string[] = ['DrugNameview', 'PurchaseUOMview', 'Quantityview', 'UnitPriceview', 'Amountview', 'Discountview', 'DiscountAmountview', 'GrossAmountview', 'TaxDescriptionview', 'GSTview', 'GSTValueview', 'TotalAmountview', 'View'];
  dataSourceprintview = new MatTableDataSource();

  displayedColumnsm = ['DrugNamee', 'Genericname', 'UOM', 'BatchQuantity', 'BatchNo', 'ExpiryDate', 'Delete'];
  dataSourcem = new MatTableDataSource();

  displayedColumnsms = ['DrugNameee', 'Genericnamee', 'UOM', 'SerialNumber', 'serialExpiryDate'];
  dataSourcems = new MatTableDataSource();

  displayedColumnsmview = ['DrugNameeview', 'Genericnameview', 'BatchQuantityview', 'BatchNoview', 'ExpiryDateview'];
  dataSourcemview = new MatTableDataSource();

  displayedColumnsmsview = ['DrugNameeeview', 'Genericnameeview', 'SerialNumberview', 'serialExpiryDateview'];
  dataSourcemsview = new MatTableDataSource();


  isInvalid = false;

  Suppliername;
  StoreName;
  cmpid;
  doctorname;
  docotorid;
  Getloctime;
  TransactionId;
  Country1;
  Country2;
  storename;
  GRNDate;
  quno;
  Quotationdate;
  dcno;
  dcdt;
  Supplier;
  Address1;
  Location;
  PhoneNo;
  GSTNo;
  vvid;
  Countryyy;
  DrugNameList;
  DLno;
  DLnoDate;
  Instructions;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;
  ngOnInit() {
    debugger;
    this.commonService.data = new GrnWpo();
    var Pathname = "Inventorylazy/Goodsreceiptnote";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");
    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.TransactionId = res.TransactionID;
    this.cmpid = localStorage.getItem("CompanyID");
    this.doctorname = localStorage.getItem('Doctorname');
    this.docotorid = localStorage.getItem('userroleID');
    this.Getloctime = localStorage.getItem('GMTTIME');
    this.GRNDate = this.date.value;
    this.minToDate = this.GRNDate;
    this.maxToDate = this.GRNDate;
    this.getAllDropdowns();

    if (this.TransactionId == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: "Number control needs to be created for Grn without PO",
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

    }

    if (sstring == false) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
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
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
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

  getAllDropdowns() {
    this.commonService.getListOfData('Common/Getsuppliervalues/' + this.cmpid).subscribe((data: any) => { this.Suppliername = data; });
    this.commonService.getListOfData('Common/GetstoreDropdownvaluesdesc/' + this.cmpid + '/' + "Stock Department").subscribe(data => { this.StoreName = data; });
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.Country1 = data[0].Value;
      this.Country2 = data[0].Text;
    });
  }

  Suppliersumbit() {

    this.commonService.getListOfData('purchaseorder/GetvenderDetails/' + this.Supplier + '/' + this.cmpid)
      .subscribe((data: any) => {
        data.venderdetails.forEach((x: any) => {
          debugger;
          this.Address1 = x.Address1 + " " + x.Address2;
          this.Location = x.Location + " " + "/" + " " + x.City == " / " ? " " : x.Location + " " + "/" + " " + x.City;
          this.PhoneNo = x.PhoneNo;
          this.GSTNo = x.GSTNo;
          this.DLno = x.DLNo;
          this.DLnoDate = x.DLNoDate;
          localStorage.setItem('VID', data.venderdetails[0].ID);
        });
        this.Countryyy = data.state + " " + "/" + " " + data.country == " / " ? " " : data.state + " " + "/" + " " + data.country;

        this.commonService.getListOfData('Common/GetDrugvalues/' + localStorage.getItem('VID') + '/' + this.cmpid).subscribe((data: any) => {
          this.DrugNameList = data;
          debugger;
          this.DrugNameList.forEach((x: any) => {
            x.checkStatus = false;
          });
          localStorage.setItem('DrugNameListdrop', JSON.stringify(this.DrugNameList));
          debugger;
          if (this.DrugNameList.length == 0) {
            debugger;
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'None of the drugs mapped by the supplier',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });

            this.Supplier = "";
            this.Address1 = "";
            this.Location = "";
            this.PhoneNo = "";
            this.GSTNo = "";
            this.Countryyy = "";
            this.DLno = "";
            this.DLnoDate = "";
          }

        });

      });




  }

  QuotationdateEvents() {
    debugger;
    var s = this.datePipe.transform(this.GRNDate, "dd/MM/yyyy HH:mm");
    var a = this.datePipe.transform(this.Quotationdate, "dd/MM/yyyy HH:mm");

    if (a == s) {
      var d = new Date();
      this.Quotationdate = d;
    }
  }

  tablepressevent(event): boolean {
    debugger;
    const currentChar = parseInt(String.fromCharCode(event.keyCode), 10);
    if (!isNaN(currentChar)) {
      const nextValue = $('#tablepress').val() + currentChar;
      if (parseInt(nextValue, 10) < 0) {
        return true;
      }
    }
    return false;
  }

  @ViewChildren('DrugNameinsert') DrugNameinsert: QueryList<ElementRef>;
  drugnamefirst(i) {
    debugger;
    setTimeout(() => {
      this.DrugNameinsert.toArray()[i].nativeElement.focus();
    });
  }

  FIlterdatadrug(value: string) {
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('DrugNameListdrop'));
    const filterValue = value.toLowerCase();
    this.DrugNameList = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }

  @ViewChildren('inputdrug') inputdrug: QueryList<ElementRef>;
  @ViewChild('inputdrug', { read: MatInput }) inputm: MatInput;
  someMethodDrugView(i, event, element) {
    debugger;
    this.DrugNameList = JSON.parse(localStorage.getItem('DrugNameListdrop'));
    if (this.Grnwithoutpoarray.length > 0) {
      this.Grnwithoutpoarray.forEach((y: any) => {
        this.DrugNameList.forEach((z: any) => {
          if (z.Value === y.ItemID) {
            z.checkStatus = true;
          }
        });
      });
    }

    setTimeout(() => {
      this.inputdrug.toArray()[i].nativeElement.focus();
    });
    this.inputm.value = '';
  }


  @ViewChildren('DrugNames') DrugNamesopen: QueryList<MatSelect>;
  enterDrugView(i, event) {
    this.DrugNamesopen.toArray()[i].open();
  }
  @ViewChildren('DrugNames') DrugNamesSelectclose: QueryList<MatSelect>;
  arrowrightdrug(i, event, element) {
    this.DrugNamesSelectclose.toArray()[i].close();
    this.drugnamefirst(i);
  }
  /////////////////////////////////drug name ////////////////////////////////

  @ViewChildren('Discountpercentage') DrugNamequantityleft: QueryList<ElementRef>;
  arrowleftdrug(i) {
    debugger;
    setTimeout(() => {
      this.DrugNamequantityleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('Quantityamount') DrugNamequantityright: QueryList<ElementRef>;
  arrowrightdrugs(i) {
    debugger;
    setTimeout(() => {
      this.DrugNamequantityright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DrugNameinsert') DrugNameinsertDown: QueryList<ElementRef>;
  arrowdowndrug(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.DrugNameinsertDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('DrugNameinsert') DrugNameinsertUp: QueryList<ElementRef>;
  arrowupdrug(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.DrugNameinsertUp.toArray()[id].nativeElement.focus();
    });

  }

  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////Quantity////////////////////////////////////

  @ViewChildren('Quantityamount') QuantityamountDown: QueryList<ElementRef>;
  arrowdownamount(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.QuantityamountDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Quantityamount') QuantityamountUp: QueryList<ElementRef>;
  arrowupamount(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.QuantityamountUp.toArray()[id].nativeElement.focus();
    });

  }


  @ViewChildren('DrugNameinsert') DrugNameinsertleft: QueryList<ElementRef>;
  arrowleftamount(i) {
    debugger;
    setTimeout(() => {
      this.DrugNameinsertleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('Discountpercentage') DrugNameinsertright: QueryList<ElementRef>;
  arrowrightamount(i) {
    debugger;
    setTimeout(() => {
      this.DrugNameinsertright.toArray()[i].nativeElement.focus();
    });
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////Disount Percentage////////////////////////////////////

  @ViewChildren('Discountpercentage') DiscountpercentageDown: QueryList<ElementRef>;
  arrowdownDiscountpercentage(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.DiscountpercentageDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('Discountpercentage') DiscountpercentageUp: QueryList<ElementRef>;
  arrowupDiscountpercentage(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.DiscountpercentageUp.toArray()[id].nativeElement.focus();
    });

  }


  @ViewChildren('Quantityamount') Discountpercentageleft: QueryList<ElementRef>;
  arrowleftDiscountpercentage(i) {
    debugger;
    setTimeout(() => {
      this.Discountpercentageleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DrugNameinsert') Discountpercentageright: QueryList<ElementRef>;
  arrowrightDiscountpercentage(i) {
    debugger;
    setTimeout(() => {
      this.Discountpercentageright.toArray()[i].nativeElement.focus();
    });
  }

  ///////////////////////////////////////////////////////////////////////////

  Enteramount(i) {
    debugger;
    setTimeout(() => {
      this.DrugNameinsertright.toArray()[i].nativeElement.focus();
    });
  }

  EnterDiscountpercentage(i) {
    setTimeout(() => {
      this.Discountpercentageright.toArray()[i].nativeElement.focus();
    });
  }

  disablegrn = false;
  Grnwithoutpoarray = [];
  Addstock() {
    debugger;


    if (this.Grnwithoutpoarray.length > 0) {
      if (this.Grnwithoutpoarray.some(Med => Med.ItemQty == 0 || Med.ItemQty == null || Med.ItemQty == undefined)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter the quantity',
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

    }

    if (this.Supplier == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose supplier',
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
    else if (this.Supplier == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose supplier',
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
    else if (this.Supplier == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose supplier',
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

    else {

      var ID = new Itemdetails();

      ID.ItemDrug = "";
      ID.UOMname = "";
      ID.ItemID = "";
      ID.Type = "";
      ID.GenericName = "";
      this.Grnwithoutpoarray.unshift(ID);
      this.commonService.data.Itemdetails = this.Grnwithoutpoarray;
      this.dataSource.data = this.commonService.data.Itemdetails;
      this.dataSource._updateChangeSubscription();
      this.disablegrn = true;
      let disph = this.commonService.data.Itemdetails[0].ItemID;
      let index = this.commonService.data.Itemdetails.findIndex(x => x.ItemID == disph);
      this.drugnamefirst(index);
      localStorage.setItem("Grnarray", JSON.stringify(this.Grnwithoutpoarray));
      this.Grnwithoutpoarray = JSON.parse(localStorage.getItem("Grnarray"));

    }

  }

  DrugView(event, id) {
    debugger;

    this.commonService.getListOfData('GrnWoPo/GetdrugDetails/' + event.value + '/' + this.cmpid)
      .subscribe(data => {
        debugger;
        if (data.itemorderdetails.length > 0) {
          debugger;
          this.Grnwithoutpoarray[id].ItemID = data.itemorderdetails[0].DrugID;
          this.Grnwithoutpoarray[id].ItemDrug = data.itemorderdetails[0].Drugname;
          this.Grnwithoutpoarray[id].Type = data.itemorderdetails[0].Type;
          this.Grnwithoutpoarray[id].GenericName = data.itemorderdetails[0].GenericName;
          this.Grnwithoutpoarray[id].Tracking = data.itemorderdetails[0].Tracking;
          this.Grnwithoutpoarray[id].UOMname = data.itemorderdetails[0].PurchaseUOM;
          this.Grnwithoutpoarray[id].UOMID = data.itemorderdetails[0].purchaseid;
          this.Grnwithoutpoarray[id].GSTPercentage = data.itemorderdetails[0].GST;
          this.Grnwithoutpoarray[id].CESSPercentage = data.itemorderdetails[0].CESS;
          this.Grnwithoutpoarray[id].AdditionalCESSPercentage = data.itemorderdetails[0].AdditionalCESS;
          this.Grnwithoutpoarray[id].TaxDescription = data.itemorderdetails[0].TaxDescription;
          this.Grnwithoutpoarray[id].CESSDescription = data.itemorderdetails[0].CessDescription;
          this.Grnwithoutpoarray[id].AdditionalCESSDescription = data.itemorderdetails[0].AddcessDescription;
          this.Grnwithoutpoarray[id].ItemRate = data.itemorderdetails[0].UnitPrice;
          this.Grnwithoutpoarray[id].ItemQty = data.itemorderdetails[0].ItemQty;
          this.Grnwithoutpoarray[id].ItemValue = data.itemorderdetails[0].ItemValue;
          this.Grnwithoutpoarray[id].DiscountAmount = data.itemorderdetails[0].DiscountAmount;
          this.Grnwithoutpoarray[id].GSTTaxValue = data.itemorderdetails[0].GSTTaxValue;
          this.Grnwithoutpoarray[id].CESSAmount = data.itemorderdetails[0].CESSAmount;
          this.Grnwithoutpoarray[id].AddCESSAmount = data.itemorderdetails[0].AddCESSAmount;
          this.Grnwithoutpoarray[id].TotalAmount = data.itemorderdetails[0].TotalAmount;
          this.Grnwithoutpoarray[id].GrossAmount = data.itemorderdetails[0].GrossAmount;
          this.commonService.data.Itemdetails[id].ItemDrug = this.Grnwithoutpoarray[id].ItemDrug;
          this.commonService.data.Itemdetails[id].ItemID = this.Grnwithoutpoarray[id].ItemID;
          this.commonService.data.Itemdetails[id].Type = this.Grnwithoutpoarray[id].Type;
          this.commonService.data.Itemdetails[id].GenericName = this.Grnwithoutpoarray[id].GenericName;
          this.commonService.data.Itemdetails[id].Tracking = this.Grnwithoutpoarray[id].Tracking;
          this.commonService.data.Itemdetails[id].UOMID = this.Grnwithoutpoarray[id].UOMID;
          this.commonService.data.Itemdetails[id].UOMname = this.Grnwithoutpoarray[id].UOMname;
          this.commonService.data.Itemdetails[id].GSTPercentage = this.Grnwithoutpoarray[id].GSTPercentage;
          this.commonService.data.Itemdetails[id].CESSPercentage = this.Grnwithoutpoarray[id].CESSPercentage;
          this.commonService.data.Itemdetails[id].AdditionalCESSPercentage = this.Grnwithoutpoarray[id].AdditionalCESSPercentage;
          this.commonService.data.Itemdetails[id].TaxDescription = this.Grnwithoutpoarray[id].TaxDescription;
          this.commonService.data.Itemdetails[id].CESSDescription = this.Grnwithoutpoarray[id].CESSDescription;
          this.commonService.data.Itemdetails[id].AdditionalCESSDescription = this.Grnwithoutpoarray[id].AdditionalCESSDescription;
          this.commonService.data.Itemdetails[id].ItemRate = this.Grnwithoutpoarray[id].ItemRate;
          this.commonService.data.Itemdetails[id].ItemQty = this.Grnwithoutpoarray[id].ItemQty;
          this.commonService.data.Itemdetails[id].ItemValue = this.Grnwithoutpoarray[id].ItemValue;
          this.commonService.data.Itemdetails[id].DiscountAmount = this.Grnwithoutpoarray[id].DiscountAmount;
          this.commonService.data.Itemdetails[id].GSTTaxValue = this.Grnwithoutpoarray[id].GSTTaxValue;
          this.commonService.data.Itemdetails[id].CESSAmount = this.Grnwithoutpoarray[id].CESSAmount;
          this.commonService.data.Itemdetails[id].AddCESSAmount = this.Grnwithoutpoarray[id].AddCESSAmount;
          this.commonService.data.Itemdetails[id].TotalAmount = this.Grnwithoutpoarray[id].TotalAmount;
          this.commonService.data.Itemdetails[id].GrossAmount = this.Grnwithoutpoarray[id].GrossAmount;
          this.dataSource.data = this.commonService.data.Itemdetails;
          this.dataSource._updateChangeSubscription();
          this.DrugNameList = JSON.parse(localStorage.getItem('DrugNameListdrop'));
          this.disablegrn = false;
          this.arrowrightdrugs(id);
          debugger;
          this.Grnwithoutpoarray.forEach((y: any) => {
            this.DrugNameList.forEach((z: any) => {
              if (z.Value === y.ItemID) {
                z.checkStatus = true;
              }
            });
          });

        }
      });


  }

  @ViewChild('DrugNames') DrugNames: MatSelect;
  saveDrugView(id, event) {
    debugger;
    this.DrugNames.valueChange.subscribe(value => {
      this.commonService.getListOfData('GrnWoPo/GetdrugDetails/' + value + '/' + this.cmpid)
        .subscribe(data => {
          debugger;
          if (data.itemorderdetails.length > 0) {
            debugger;
            this.Grnwithoutpoarray[id].ItemID = data.itemorderdetails[0].DrugID;
            this.Grnwithoutpoarray[id].ItemDrug = data.itemorderdetails[0].Drugname;
            this.Grnwithoutpoarray[id].Type = data.itemorderdetails[0].Type;
            this.Grnwithoutpoarray[id].GenericName = data.itemorderdetails[0].GenericName;
            this.Grnwithoutpoarray[id].Tracking = data.itemorderdetails[0].Tracking;
            this.Grnwithoutpoarray[id].UOMname = data.itemorderdetails[0].PurchaseUOM;
            this.Grnwithoutpoarray[id].UOMID = data.itemorderdetails[0].purchaseid;
            this.Grnwithoutpoarray[id].GSTPercentage = data.itemorderdetails[0].GST;
            this.Grnwithoutpoarray[id].CESSPercentage = data.itemorderdetails[0].CESS;
            this.Grnwithoutpoarray[id].AdditionalCESSPercentage = data.itemorderdetails[0].AdditionalCESS;
            this.Grnwithoutpoarray[id].TaxDescription = data.itemorderdetails[0].TaxDescription;
            this.Grnwithoutpoarray[id].CESSDescription = data.itemorderdetails[0].CessDescription;
            this.Grnwithoutpoarray[id].AdditionalCESSDescription = data.itemorderdetails[0].AddcessDescription;
            this.Grnwithoutpoarray[id].ItemRate = data.itemorderdetails[0].UnitPrice;
            this.Grnwithoutpoarray[id].ItemQty = data.itemorderdetails[0].ItemQty;
            this.Grnwithoutpoarray[id].ItemValue = data.itemorderdetails[0].ItemValue;
            this.Grnwithoutpoarray[id].DiscountAmount = data.itemorderdetails[0].DiscountAmount;
            this.Grnwithoutpoarray[id].GSTTaxValue = data.itemorderdetails[0].GSTTaxValue;
            this.Grnwithoutpoarray[id].CESSAmount = data.itemorderdetails[0].CESSAmount;
            this.Grnwithoutpoarray[id].AddCESSAmount = data.itemorderdetails[0].AddCESSAmount;
            this.Grnwithoutpoarray[id].TotalAmount = data.itemorderdetails[0].TotalAmount;
            this.Grnwithoutpoarray[id].GrossAmount = data.itemorderdetails[0].GrossAmount;
            this.commonService.data.Itemdetails[id].ItemDrug = this.Grnwithoutpoarray[id].ItemDrug;
            this.commonService.data.Itemdetails[id].ItemID = this.Grnwithoutpoarray[id].ItemID;
            this.commonService.data.Itemdetails[id].Type = this.Grnwithoutpoarray[id].Type;
            this.commonService.data.Itemdetails[id].GenericName = this.Grnwithoutpoarray[id].GenericName;
            this.commonService.data.Itemdetails[id].Tracking = this.Grnwithoutpoarray[id].Tracking;
            this.commonService.data.Itemdetails[id].UOMID = this.Grnwithoutpoarray[id].UOMID;
            this.commonService.data.Itemdetails[id].UOMname = this.Grnwithoutpoarray[id].UOMname;
            this.commonService.data.Itemdetails[id].GSTPercentage = this.Grnwithoutpoarray[id].GSTPercentage;
            this.commonService.data.Itemdetails[id].CESSPercentage = this.Grnwithoutpoarray[id].CESSPercentage;
            this.commonService.data.Itemdetails[id].AdditionalCESSPercentage = this.Grnwithoutpoarray[id].AdditionalCESSPercentage;
            this.commonService.data.Itemdetails[id].TaxDescription = this.Grnwithoutpoarray[id].TaxDescription;
            this.commonService.data.Itemdetails[id].CESSDescription = this.Grnwithoutpoarray[id].CESSDescription;
            this.commonService.data.Itemdetails[id].AdditionalCESSDescription = this.Grnwithoutpoarray[id].AdditionalCESSDescription;
            this.commonService.data.Itemdetails[id].ItemRate = this.Grnwithoutpoarray[id].ItemRate;
            this.commonService.data.Itemdetails[id].ItemQty = this.Grnwithoutpoarray[id].ItemQty;
            this.commonService.data.Itemdetails[id].ItemValue = this.Grnwithoutpoarray[id].ItemValue;
            this.commonService.data.Itemdetails[id].DiscountAmount = this.Grnwithoutpoarray[id].DiscountAmount;
            this.commonService.data.Itemdetails[id].GSTTaxValue = this.Grnwithoutpoarray[id].GSTTaxValue;
            this.commonService.data.Itemdetails[id].CESSAmount = this.Grnwithoutpoarray[id].CESSAmount;
            this.commonService.data.Itemdetails[id].AddCESSAmount = this.Grnwithoutpoarray[id].AddCESSAmount;
            this.commonService.data.Itemdetails[id].TotalAmount = this.Grnwithoutpoarray[id].TotalAmount;
            this.commonService.data.Itemdetails[id].GrossAmount = this.Grnwithoutpoarray[id].GrossAmount;
            this.dataSource.data = this.commonService.data.Itemdetails;
            this.dataSource._updateChangeSubscription();
            this.DrugNameList = JSON.parse(localStorage.getItem('DrugNameListdrop'));
            this.disablegrn = false;
            this.arrowrightdrugs(id);
            debugger;
            this.Grnwithoutpoarray.forEach((y: any) => {
              this.DrugNameList.forEach((z: any) => {
                if (z.Value === y.ItemID) {
                  z.checkStatus = true;
                }
              });
            });

          }
        });
    });

  }

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  Restrict(event) {
    if (event.target.value > 100) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Cannot More than 100% Discount',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      event.target.value = 0;
    }
  }

  changeValue(id, property: string, event: any) {
    let result: number = Number(event.target.value);
    this.Grnwithoutpoarray[id][property] = result;
    this.commonService.data.Itemdetails[id][property] = result;
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();

  }

  changeValueAmount(id, element, property: string) {
    this.Grnwithoutpoarray[id][property] = element.ItemRate;
    this.commonService.data.Itemdetails[id][property] = element.ItemRate;
  }

  changeItemValue(id, element, property: string) {
    element.ItemValue = element.ItemQty * element.ItemRate;
    this.Grnwithoutpoarray[id][property] = element.ItemValue;
    this.commonService.data.Itemdetails[id][property] = element.ItemValue;
  }

  changeValueGrossAmount(id, element, property: string) {
    element.GrossAmount = (element.ItemValue) - (element.ItemValue) * element.DiscountPercentage / 100;
    this.Grnwithoutpoarray[id][property] = element.GrossAmount;
    this.commonService.data.Itemdetails[id][property] = element.GrossAmount;
  }

  changeValueDiscountAmount(id, element, property: string) {
    element.DiscountAmount = (element.ItemQty * element.ItemRate) * element.DiscountPercentage / 100;
    this.Grnwithoutpoarray[id][property] = element.DiscountAmount;
    this.commonService.data.Itemdetails[id][property] = element.DiscountAmount;
  }

  changeValueTotal(id, element, property: string) {
    debugger;
    element.TotalAmount = element.GrossAmount + element.GSTTaxValue + element.CESSAmount + element.AddCESSAmount;
    this.Grnwithoutpoarray[id][property] = element.TotalAmount;
    this.commonService.data.Itemdetails[id][property] = element.TotalAmount;
  }

  changeGStAmount(id, element, property: string) {
    element.GSTTaxValue = element.GrossAmount * (element.GSTPercentage / 100);
    this.Grnwithoutpoarray[id][property] = element.GSTTaxValue;
    this.commonService.data.Itemdetails[id][property] = element.GSTTaxValue;

  }

  changeCESSAmount(id, element, property: string) {
    element.CESSAmount = element.GrossAmount * (element.CESSPercentage / 100);
    this.Grnwithoutpoarray[id][property] = element.CESSAmount;
    this.commonService.data.Itemdetails[id][property] = element.CESSAmount;
  }

  changeAdditionalCESSAmount(id, element, property: string) {
    debugger;
    element.AddCESSAmount = element.GrossAmount * (element.AdditionalCESSPercentage / 100);
    this.Grnwithoutpoarray[id][property] = element.AddCESSAmount;
    this.commonService.data.Itemdetails[id][property] = element.AddCESSAmount;
  }

  GetTotalcost() {
    if (this.commonService.data.Itemdetails != undefined) {
      var restotalcost = this.commonService.data.Itemdetails.map(t => t.ItemValue).reduce((acc, value) => acc + value, 0);
      this.person.Totalamount = restotalcost;
      return restotalcost;
    }

  }

  GetGrossAmount() {
    if (this.commonService.data.Itemdetails != undefined) {
      var restotalcost = this.commonService.data.Itemdetails.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      this.person.Grossproductamount = restotalcost;
      return restotalcost;
    }

  }

  GetDiscountAmount() {
    if (this.commonService.data.Itemdetails != undefined) {
      var restotalcost = this.commonService.data.Itemdetails.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
      this.person.Totaldiscountamount = restotalcost;
      return restotalcost;
    }

  }

  GetTotalAmount() {
    if (this.commonService.data.Itemdetails != undefined) {
      var restotalcost = this.commonService.data.Itemdetails.map(t => t.TotalAmount).reduce((acc, value) => acc + value, 0);
      this.person.Totalpoamount = restotalcost;
      return restotalcost;
    }

  }

  GetGSTAmount() {
    if (this.commonService.data.Itemdetails != undefined) {
      var restotalcost = this.commonService.data.Itemdetails.map(t => t.GSTTaxValue).reduce((acc, value) => acc + value, 0);
      this.person.Totalgstamount = restotalcost;
      return restotalcost;
    }

  }

  GetCESSAmount() {
    if (this.commonService.data.Itemdetails != undefined) {
      var restotalcost = this.commonService.data.Itemdetails.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
      this.person.Totalcessamount = restotalcost;
      return restotalcost;
    }

  }

  GetAdditionalCESSAmount() {
    if (this.commonService.data.Itemdetails != undefined) {
      var restotalcost = this.commonService.data.Itemdetails.map(t => t.AddCESSAmount).reduce((acc, value) => acc + value, 0);
      this.person.TotalAdditionalcessamount = restotalcost;
      return restotalcost;
    }

  }

  Taxtotalamount() {
    return this.GetGSTAmount() + this.GetCESSAmount() + this.GetAdditionalCESSAmount();
  }


  backdrop;
  modalmed;
  modalmedSerial;
  disablebatch: boolean;
  modalSuccessmedclose() {
    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  modalSuccessmed() {
    debugger;
    if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).some((d) => d.BatchQuantity == 0 || d.BatchQuantity == null)) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter quantity',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    };

    if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).some((d) => d.BatchNo == "")) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter batch no',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    };

    if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).some((d) => d.ValidExpiryDate == null || d.ValidExpiryDate == "")) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose expirydate',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    };


    if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).length > 0) {

      let itmqty = 0;
      let batchqty = 0;

      itmqty = this.Grnwithoutpoarray.filter((x) => x.ItemID == this.DrugID).map((s) => +s.ItemQty).reduce((sum, c) => sum + c);

      if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).length > 0) {
        batchqty = this.BatchhDetails.filter((x) => x.druggid == this.DrugID).map((s) => +s.BatchQuantity).reduce((sum, c) => sum + c);
      }


      if (itmqty != batchqty) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter quantity',
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
    }

    if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).length > 0) {
      Swal.fire({
        type: 'success',
        title: 'success',
        text: 'Item add successfully',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }


    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  modalSuccessmedSerialclose() {
    this.modalmedSerial = 'none';
    this.backdrop = 'none';
  }


  modalSuccessmedSerial() {

    debugger;
    if (this.SerialArraywithpo.filter((x) => x.druggid == this.DrugID).some((d) => d.SerialNumber == "")) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter serial no',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    };

    if (this.SerialArraywithpo.filter((x) => x.druggid == this.DrugID).some((d) => d.ValidExpiryDate == null || d.ValidExpiryDate == "")) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose expirydate',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    };

    Swal.fire({
      type: 'success',
      title: 'success',
      text: 'Item add successfully',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'alert-warp',
        container: 'alert-container',
      },
    });

    this.modalmedSerial = 'none';
    this.backdrop = 'none';
  }

  UOM;
  Drugname;
  DrugID;
  UommID;
  qty;
  drug;
  quantity;
  drugid;
  genernicname;
  Addbatchserial(id, item) {
    debugger;
    if (item.Tracking == 1) {
      this.qty = this.Grnwithoutpoarray.map(x => x.ItemQty)
      this.quantity = this.qty[id];
      if (this.quantity != 0) {
        this.modalmed = 'block';
        this.backdrop = 'block';
        this.Drugname = item.ItemDrug;
        this.DrugID = item.ItemID;
        this.UommID = item.UOMID;
        this.UOM = item.UOMname;
        this.genernicname = item.GenericName;

        if (this.BatchhDetails.length > 0) {
          let filterdata = this.BatchhDetails.filter((x) => x.druggid == item.ItemID);
          this.dataSourcem.data = filterdata;
          this.dataSourcem._updateChangeSubscription();
          if (filterdata.length > 0) {
            if (filterdata.filter((x) => x.druggid == item.ItemID).some((d) => d.ValidExpiryDate == null || d.ValidExpiryDate == "")) {
              this.disablebatch = false;
            }
          }
          else {
            this.disablebatch = true;
          }
        } else {

          let filterdata = this.BatchhDetails.filter((x) => x.druggid == item.ItemID);
          this.dataSourcem.data = filterdata;
          this.dataSourcem._updateChangeSubscription();
          this.disablebatch = true;
        }

        localStorage.setItem("batcharray", JSON.stringify(this.BatchhDetails));
        this.BatchhDetails = JSON.parse(localStorage.getItem("batcharray"));

      } else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter quantity',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    }
    else if (item.Tracking == 0) {
      debugger;
      this.qty = this.Grnwithoutpoarray.map(x => x.ItemQty)
      this.quantity = this.qty[id];
      if (this.quantity != 0) {
        this.modalmedSerial = 'block';
        this.backdrop = 'block';
        this.DrugID = item.ItemID;
        this.Drugname = item.ItemDrug;
        let filterserialdata = this.SerialArraywithpo.filter((x) => x.druggid == item.ItemID);

        if (filterserialdata.length < 1) {
          for (var j = 0; j < item.ItemQty; j++) {
            var Res = new SerialArraywithpo();
            debugger;
            Res.DrugName = item.ItemDrug;
            Res.druggid = item.ItemID;
            Res.Genericname = item.GenericName;
            Res.UOM = item.UOMname;
            Res.SerialNumber = "";
            Res.TC = this.TransactionId;
            Res.Store = this.storename;
            Res.CreatedBy = this.docotorid;
            Res.ExpiryDate = "";
            Res.ValidExpiryDate = "";
            Res.chk = true;
            Res.serialQuantity = 1;
            this.SerialArraywithpo.unshift(Res);
          }
        }

        this.commonService.data.SerialArraywithpo = this.SerialArraywithpo;

        let filterdata = this.SerialArraywithpo.filter((x) => x.druggid == item.ItemID);
        this.dataSourcems.data = filterdata;
        this.dataSourcems._updateChangeSubscription();

        let SerialNo = this.commonService.data.SerialArraywithpo[0].SerialNumber;
        let index = this.commonService.data.SerialArraywithpo.findIndex(x => x.SerialNumber == SerialNo);
        this.SerialArrayfirst(index);

        localStorage.setItem("serialarray", JSON.stringify(this.SerialArraywithpo));
        this.SerialArraywithpo = JSON.parse(localStorage.getItem("serialarray"));

      } else {

        if (item.Tracking == undefined) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Enter quantity',
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
            text: 'Enter quantity',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }


      }
    }
    else {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Others',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });

    }
  }
  ar;
  total = 0;
  BatchhDetails = [];
  SerialArraywithpo = [];
  @ViewChildren('BatchQuantity') BatchQuantity: QueryList<ElementRef>;
  BatchQuantityfirst(i) {
    debugger;
    setTimeout(() => {
      this.BatchQuantity.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('SerialNumber') SerialNumber: QueryList<ElementRef>;
  SerialArrayfirst(i) {
    debugger;
    setTimeout(() => {
      this.SerialNumber.toArray()[i].nativeElement.focus();
    });
  }

  /////////////////////////////////Batch Quantity ////////////////////////////////

  @ViewChildren('ExpiryDate') BatchQuantityleft: QueryList<ElementRef>;
  arrowleftBtnquantity(i) {
    debugger;
    setTimeout(() => {
      this.BatchQuantityleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('BatchNo') BatchQuantityright: QueryList<ElementRef>;
  arrowrightBtnquantity(i) {
    debugger;
    setTimeout(() => {
      this.BatchQuantityright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('BatchQuantity') BatchQuantityDown: QueryList<ElementRef>;
  arrowdownBtnquantity(i) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.BatchQuantityDown.toArray()[id].nativeElement.focus();
    });

  }

  @ViewChildren('BatchQuantity') BatchQuantityUp: QueryList<ElementRef>;
  arrowupBtnquantity(i) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.BatchQuantityUp.toArray()[id].nativeElement.focus();
    });

  }

  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////Batch No////////////////////////////////////

  @ViewChildren('BatchNo') BatchNoDown: QueryList<ElementRef>;
  arrowdownBtnno(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.BatchNoDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('BatchNo') BatchNoUp: QueryList<ElementRef>;
  arrowupBtnno(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.BatchNoUp.toArray()[id].nativeElement.focus();
    });

  }


  @ViewChildren('BatchQuantity') BatchNoleft: QueryList<ElementRef>;
  arrowleftBtnno(i) {
    debugger;
    setTimeout(() => {
      this.BatchNoleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('ExpiryDate') BatchNoright: QueryList<ElementRef>;
  arrowrightBtnno(i) {
    debugger;
    setTimeout(() => {
      this.BatchNoright.toArray()[i].nativeElement.focus();
    });
  }

  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////////Expiry Date////////////////////////////////////

  @ViewChildren('ExpiryDate') ExpiryDateDown: QueryList<ElementRef>;
  arrowdownExpdate(i, event) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.ExpiryDateDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('ExpiryDate') ExpiryDateUp: QueryList<ElementRef>;
  arrowupExpdate(i, event) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.ExpiryDateUp.toArray()[id].nativeElement.focus();
    });

  }


  @ViewChildren('BatchNo') ExpiryDateleft: QueryList<ElementRef>;
  arrowleftExpdate(i, event) {
    debugger;
    setTimeout(() => {
      this.ExpiryDateleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('BatchQuantity') ExpiryDateright: QueryList<ElementRef>;
  arrowrightExpdate(i, event) {
    debugger;
    setTimeout(() => {
      this.ExpiryDateright.toArray()[i].nativeElement.focus();
    });
  }

  ///////////////////////////////////////////////////////////////////////////

  EnterBtnquantity(i) {
    debugger;
    setTimeout(() => {
      this.BatchQuantityright.toArray()[i].nativeElement.focus();
    });
  }

  EnterBtnno(i) {
    setTimeout(() => {
      this.BatchNoright.toArray()[i].nativeElement.focus();
    });
  }

  EnterExpdate(i) {
    setTimeout(() => {
      this.ExpiryDateright.toArray()[i].nativeElement.focus();
    });
  }

  /////////////////////////////////Serial Number ////////////////////////////////

  @ViewChildren('serialExpiryDate') SerialNoleft: QueryList<ElementRef>;
  arrowleftSerialNo(i) {
    debugger;
    setTimeout(() => {
      this.SerialNoleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('serialExpiryDate') SerialNoright: QueryList<ElementRef>;
  arrowrightSerialNo(i) {
    debugger;
    setTimeout(() => {
      this.SerialNoright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('SerialNumber') SerialNoDown: QueryList<ElementRef>;
  arrowdownSerialNo(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.SerialNoDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('SerialNumber') SerialNoUp: QueryList<ElementRef>;
  arrowupSerialNo(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.SerialNoUp.toArray()[id].nativeElement.focus();
    });

  }

  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////serial ExpiryDate ////////////////////////////////

  @ViewChildren('SerialNumber') serialExpiryDateleft: QueryList<ElementRef>;
  arrowleftserialExpiryDate(i) {
    debugger;
    setTimeout(() => {
      this.serialExpiryDateleft.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('SerialNumber') serialExpiryDateright: QueryList<ElementRef>;
  arrowrightserialExpiryDate(i) {
    debugger;
    setTimeout(() => {
      this.serialExpiryDateright.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('arrowupserialExpiryDate') serialExpiryDateDown: QueryList<ElementRef>;
  arrowdownserialExpiryDate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i + 1;
      this.serialExpiryDateDown.toArray()[id].nativeElement.focus();
    });
  }

  @ViewChildren('arrowupserialExpiryDate') serialExpiryDateUp: QueryList<ElementRef>;
  arrowupserialExpiryDate(i, event, element) {
    debugger;
    setTimeout(() => {
      let id = i - 1;
      this.serialExpiryDateUp.toArray()[id].nativeElement.focus();
    });

  }

  /////////////////////////////////////////////////////////////////////////////

  EnterSerialNo(i) {
    setTimeout(() => {
      this.SerialNoright.toArray()[i].nativeElement.focus();
    });
  }

  EnterserialExpiryDate(i) {
    setTimeout(() => {
      this.serialExpiryDateright.toArray()[i].nativeElement.focus();
    });
  }

  Addbatch() {
    debugger;
    this.disablebatch = false;
    if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).length > 0) {
      if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).some((d) => d.BatchQuantity == 0 || d.BatchQuantity == null)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter quantity',
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

      if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).some((d) => d.BatchNo == "")) {

        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter batch no',
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

      if (this.BatchhDetails.filter((x) => x.druggid == this.DrugID).some((d) => d.ValidExpiryDate == null || d.ValidExpiryDate == "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose expirydate',
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
    }

    this.ar = this.Grnwithoutpoarray.filter((item) => item.ItemID == this.DrugID);
    let results = 0;
    results = this.ar.map((s) => +s.ItemQty).reduce((sum, c) => sum + c);
    this.total = results;
    this.Totalquantitycheck();
    if (this.total == this.Totalqty) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Cannot Add Items',
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
    var batch = new BatchhDetails();
    batch.DrugName = this.Drugname;
    batch.druggid = this.DrugID;
    batch.Genericname = this.genernicname;
    batch.uomm = this.UommID;
    batch.UOM = this.UOM;
    batch.BatchQuantity = this.total - this.Totalqty;
    batch.BatchNo;
    batch.chk = true;
    batch.ExpiryDate = "";
    batch.ValidExpiryDate = "";
    this.BatchhDetails.unshift(batch);
    this.commonService.data.BatchhDetails = this.BatchhDetails;
    let filterdata = this.BatchhDetails.filter((x) => x.druggid == this.DrugID);
    this.dataSourcem.data = filterdata;
    this.dataSourcem._updateChangeSubscription();

    let Bqty = this.commonService.data.BatchhDetails[0].BatchQuantity;
    let index = this.commonService.data.BatchhDetails.findIndex(x => x.BatchQuantity == Bqty);
    this.BatchQuantityfirst(index);
    localStorage.setItem("batcharray", JSON.stringify(this.BatchhDetails));
    this.BatchhDetails = JSON.parse(localStorage.getItem("batcharray"));


  }
  aray;
  Totalqty = 0;
  Totalquantitycheck() {
    debugger;
    this.aray = this.BatchhDetails.filter((item) => item.druggid == this.DrugID);
    let result = 0;
    if (this.aray.length > 0) { result = this.aray.map((s) => +s.BatchQuantity).reduce((sum, c) => sum + c); }
    this.Totalqty = result;
  }


  changeValues(id, element, property: string, event: any) {
    debugger;
    let grnresult = 0;
    let bthresult = 0;

    grnresult = this.Grnwithoutpoarray.filter((x) => x.ItemID == element.druggid).map((s) => +s.ItemQty).reduce((sum, c) => sum + c);

    bthresult = this.BatchhDetails.filter((x) => x.druggid == element.druggid).map((s) => +s.BatchQuantity).reduce((sum, c) => sum + c);

    let emptyarray = this.BatchhDetails.filter((x) => x.druggid == element.druggid);

    if (emptyarray.length > 1) { grnresult = grnresult - bthresult; };

    if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) { return false; };

    let result: number = Number(event.target.value);

    if (result <= grnresult) {
      debugger;
      this.BatchhDetails[id][property] = result;
      this.commonService.data.BatchhDetails[id][property] = result;
      this.dataSourcem.filteredData[id][property] = result;
      this.dataSourcem._updateChangeSubscription();
    }
    else {
      if (this.BatchhDetails[id].BatchQuantity != 0) {
        event.target.value = 0;
      } else {
        event.target.value = null;
      }

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Invalid quantity',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      if (this.BatchhDetails[id].BatchQuantity == 0) {
        this.BatchhDetails[id].BatchQuantity = null;
      } else {
        this.BatchhDetails[id].BatchQuantity = 0;
      }
    }
  }
  pusharray = [];
  removebatch(i, element) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
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
      if (result.value) {
        debugger;
        if (i !== -1) {
          debugger;

          this.pusharray = [];
          let BatchhDetails = this.BatchhDetails.filter((x) => x.druggid == element.druggid);
          let BD = BatchhDetails[i];
          this.pusharray.push(BD);
          this.BatchhDetails = this.BatchhDetails.filter(function (e) { return this.indexOf(e) != 0; }, this.pusharray);

          let orginaldata = this.BatchhDetails.filter((x) => x.druggid == element.druggid);
          this.dataSourcem.data = orginaldata;
          this.dataSourcem._updateChangeSubscription();

          localStorage.setItem("batcharray", JSON.stringify(this.BatchhDetails));
          this.BatchhDetails = JSON.parse(localStorage.getItem("batcharray"));

          if (orginaldata.length < 1) {
            this.disablebatch = true;
          }
        }
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted successfully',
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
          text: 'Item details not deleted',
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

  addEvent(id, element, ExpiryDate: string, ValidExpiryDate: string, event: any) {
    debugger;
    let res = event.targetElement.value.match(/\d+|[a-z]+/ig);

    if (res != null && res.length > 1) {

      let Mon = new Array(12);

      Mon["jan"] = "01";
      Mon["Feb"] = "02";
      Mon["Mar"] = "03";
      Mon["Apr"] = "04";
      Mon["May"] = "05";
      Mon["Jun"] = "06";
      Mon["Jul"] = "07";
      Mon["Aug"] = "08";
      Mon["Sep"] = "09";
      Mon["Oct"] = "10";
      Mon["Nov"] = "11";
      Mon["Dec"] = "12";

      let day = res[0];
      let month = Mon[res[1]];
      let year = res[2];
      let result = year + "-" + month + "-" + day;
      const dateformat = 'DD-MM-YYYY';
      const toDateformat = moment(new Date(result)).format(dateformat);
      const a = moment(toDateformat, dateformat, true).isValid();
      let date = new Date(result);

      if (a == false) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Incorrect Date Format',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.targetElement.value = '';
        this.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcem.filteredData[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcem._updateChangeSubscription();
        return false;
      }
      let datetoday = this.datePipe.transform(this.ExpDate, 'yyyy-MM-dd');

      if (datetoday > result) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Invalid Date',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.targetElement.value = '';
        this.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcem.filteredData[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcem._updateChangeSubscription();
        return false;
      }

      if (this.BatchhDetails.some(x => x.druggid == element.druggid && x.BatchNo.replace(/\s+/g, '').toLowerCase() == element.BatchNo.replace(/\s+/g, '').toLowerCase() && x.ValidExpiryDate == result)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Already Exists',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.targetElement.value = '';
        this.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcem.filteredData[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcem._updateChangeSubscription();
        return;
      }
      this.BatchhDetails[id][ValidExpiryDate] = result;
      this.commonService.data.BatchhDetails[id][ValidExpiryDate] = result;
      this.BatchhDetails[id][ExpiryDate] = date;
      this.commonService.data.BatchhDetails[id][ExpiryDate] = date;
      this.dataSourcem.filteredData[id][ExpiryDate] = date;
      this.dataSourcem._updateChangeSubscription();
    }
    else {
      const Bdate = event.target.value;
      const dateformat = 'DD-MM-YYYY';
      const toDateformat = moment(new Date(Bdate)).format(dateformat);
      const a = moment(toDateformat, dateformat, true).isValid();

      if (a == false) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Incorrect Date Format',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.target.value = '';
        this.BatchhDetails[id][ValidExpiryDate] = event.target.value;
        this.commonService.data.BatchhDetails[id][ValidExpiryDate] = event.target.value;
        this.BatchhDetails[id][ExpiryDate] = event.target.value;
        this.commonService.data.BatchhDetails[id][ExpiryDate] = event.target.value;
        this.dataSourcem.filteredData[id][ExpiryDate] = event.target.value;
        this.dataSourcem._updateChangeSubscription();
        return false;
      }

      let batchdate = moment(new Date(event.target.value)).format('YYYY-MM-DD');
      let datetoday = this.datePipe.transform(this.ExpDate, 'yyyy-MM-dd');
      let date = new Date(batchdate);

      if (batchdate == null) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Incorrect Date Format',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.target.value = '';
        this.BatchhDetails[id][ValidExpiryDate] = event.target.value;
        this.commonService.data.BatchhDetails[id][ValidExpiryDate] = event.target.value;
        this.BatchhDetails[id][ExpiryDate] = event.target.value;
        this.commonService.data.BatchhDetails[id][ExpiryDate] = event.target.value;
        this.dataSourcem.filteredData[id][ExpiryDate] = event.target.value;
        this.dataSourcem._updateChangeSubscription();
        return false;
      }

      if (datetoday > batchdate) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Invalid Date',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.target.value = '';
        this.BatchhDetails[id][ValidExpiryDate] = event.target.value;
        this.commonService.data.BatchhDetails[id][ValidExpiryDate] = event.target.value;
        this.BatchhDetails[id][ExpiryDate] = event.target.value;
        this.commonService.data.BatchhDetails[id][ExpiryDate] = event.target.value;
        this.dataSourcem.filteredData[id][ExpiryDate] = event.target.value;
        this.dataSourcem._updateChangeSubscription();
        return false;
      }

      if (this.BatchhDetails.some(x => x.druggid == element.druggid && x.BatchNo.replace(/\s+/g, '').toLowerCase() == element.BatchNo.replace(/\s+/g, '').toLowerCase() && x.ValidExpiryDate == batchdate)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Already Exists',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.target.value = '';
        this.BatchhDetails[id][ValidExpiryDate] = event.target.value;
        this.commonService.data.BatchhDetails[id][ValidExpiryDate] = event.target.value;
        this.BatchhDetails[id][ExpiryDate] = event.target.value;
        this.commonService.data.BatchhDetails[id][ExpiryDate] = event.target.value;
        this.dataSourcem.filteredData[id][ExpiryDate] = event.target.value;
        this.dataSourcem._updateChangeSubscription();
        return;
      }
      this.BatchhDetails[id][ValidExpiryDate] = batchdate;
      this.commonService.data.BatchhDetails[id][ValidExpiryDate] = batchdate;
      this.BatchhDetails[id][ExpiryDate] = date;
      this.commonService.data.BatchhDetails[id][ExpiryDate] = date;
      this.dataSourcem.filteredData[id][ExpiryDate] = date;
      this.dataSourcem._updateChangeSubscription();
    }
  }


  addEvents(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.BatchhDetails[id][property] = result;
    this.commonService.data.BatchhDetails[id][property] = result;
    this.dataSourcem.filteredData[id][property] = result;
    this.dataSourcem._updateChangeSubscription();
    if (this.BatchhDetails[id].BatchNo == "") {
      this.BatchhDetails[id].chk = true;
      this.commonService.data.BatchhDetails[id].chk = this.BatchhDetails[id].chk;
      this.BatchhDetails[id].ExpiryDate = event.target.value;
      this.commonService.data.BatchhDetails[id].ExpiryDate = this.BatchhDetails[id].ExpiryDate;
      this.BatchhDetails[id].ValidExpiryDate = event.target.value;
      this.commonService.data.BatchhDetails[id].ValidExpiryDate = this.BatchhDetails[id].ValidExpiryDate;
    } else {
      this.BatchhDetails[id].chk = false;
      this.commonService.data.BatchhDetails[id].chk = this.BatchhDetails[id].chk;
    }
  }

  addEventserial(id, element, ExpiryDate: string, ValidExpiryDate: string, event: any) {
    debugger;

    let res = event.targetElement.value.match(/\d+|[a-z]+/ig);

    if (res != null && res.length > 1) {

      let Mon = new Array(12);

      Mon["jan"] = "01";
      Mon["Feb"] = "02";
      Mon["Mar"] = "03";
      Mon["Apr"] = "04";
      Mon["May"] = "05";
      Mon["Jun"] = "06";
      Mon["Jul"] = "07";
      Mon["Aug"] = "08";
      Mon["Sep"] = "09";
      Mon["Oct"] = "10";
      Mon["Nov"] = "11";
      Mon["Dec"] = "12";

      let day = res[0];
      let month = Mon[res[1]];
      let year = res[2];
      let result = year + "-" + month + "-" + day;
      const dateformat = 'DD-MM-YYYY';
      const toDateformat = moment(new Date(result)).format(dateformat);
      const a = moment(toDateformat, dateformat, true).isValid();
      let date = new Date(result);

      if (a == false) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Incorrect Date Format',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.targetElement.value = '';
        this.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcem.filteredData[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcem._updateChangeSubscription();
        return false;
      }

      let datetoday = this.datePipe.transform(this.ExpDate, 'yyyy-MM-dd');


      if (datetoday > result) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Invalid Date',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.targetElement.value = '';
        this.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ValidExpiryDate] = event.targetElement.value;
        this.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.commonService.data.BatchhDetails[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcem.filteredData[id][ExpiryDate] = event.targetElement.value;
        return false;
      }

      let emptyarray = this.SerialArraywithpo.filter((x) => x.druggid == element.druggid && x.SerialNumber.replace(/\s+/g, '') != "");
      const lookup = emptyarray.reduce((a, e) => {
        a[e.SerialNumber.replace(/\s+/g, '').toLowerCase()] = ++a[e.SerialNumber.replace(/\s+/g, '').toLowerCase()] || 0;
        return a;
      }, {});
      let resultarray = emptyarray.filter(e => lookup[e.SerialNumber.replace(/\s+/g, '').toLowerCase()]);
      if (resultarray.length > 0) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Already Exists',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.targetElement.value = '';
        this.SerialArraywithpo[id][ValidExpiryDate] = event.targetElement.value;
        this.commonService.data.SerialArraywithpo[id][ValidExpiryDate] = event.targetElement.value;
        this.SerialArraywithpo[id][ExpiryDate] = event.targetElement.value;
        this.commonService.data.SerialArraywithpo[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcems.filteredData[id][ExpiryDate] = event.targetElement.value;
        this.dataSourcems._updateChangeSubscription();
        return;
      }
      this.SerialArraywithpo[id][ValidExpiryDate] = result;
      this.commonService.data.SerialArraywithpo[id][ValidExpiryDate] = result;
      this.SerialArraywithpo[id][ExpiryDate] = date;
      this.commonService.data.SerialArraywithpo[id][ExpiryDate] = date;
      this.dataSourcems.filteredData[id][ExpiryDate] = date;
      this.dataSourcems._updateChangeSubscription();

    }
    else {

      const Bdate = event.target.value;
      const dateformat = 'DD-MM-YYYY';
      const toDateformat = moment(new Date(Bdate)).format(dateformat);
      const a = moment(toDateformat, dateformat, true).isValid();

      if (a == false) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Incorrect Date Format',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.target.value = '';
        this.SerialArraywithpo[id][ValidExpiryDate] = event.target.value;
        this.commonService.data.SerialArraywithpo[id][ValidExpiryDate] = event.target.value;
        this.SerialArraywithpo[id][ExpiryDate] = event.target.value;
        this.commonService.data.SerialArraywithpo[id][ExpiryDate] = event.target.value;
        this.dataSourcems.filteredData[id][ExpiryDate] = event.target.value;
        this.dataSourcems._updateChangeSubscription();
        return false;
      }
      let serialdate = moment(new Date(event.target.value)).format('YYYY-MM-DD');
      let datetoday = this.datePipe.transform(this.ExpDate, 'yyyy-MM-dd');
      let date = new Date(serialdate);
      if (serialdate == null) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Incorrect Date Format',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.target.value = '';
        this.SerialArraywithpo[id][ValidExpiryDate] = event.target.value;
        this.commonService.data.SerialArraywithpo[id][ValidExpiryDate] = event.target.value;
        this.SerialArraywithpo[id][ExpiryDate] = event.target.value;
        this.commonService.data.SerialArraywithpo[id][ExpiryDate] = event.target.value;
        this.dataSourcems.filteredData[id][ExpiryDate] = event.target.value;
        this.dataSourcems._updateChangeSubscription();
        return false;
      }
      if (datetoday > serialdate) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Invalid Date',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.target.value = '';
        this.SerialArraywithpo[id][ValidExpiryDate] = event.target.value;
        this.commonService.data.SerialArraywithpo[id][ValidExpiryDate] = event.target.value;
        this.SerialArraywithpo[id][ExpiryDate] = event.target.value;
        this.commonService.data.SerialArraywithpo[id][ExpiryDate] = event.target.value;
        this.dataSourcems.filteredData[id][ExpiryDate] = event.target.value;
        this.dataSourcems._updateChangeSubscription();
        return false;
      }
      let emptyarray = this.SerialArraywithpo.filter((x) => x.druggid == element.druggid && x.SerialNumber.replace(/\s+/g, '') != "");
      const lookup = emptyarray.reduce((a, e) => {
        a[e.SerialNumber.replace(/\s+/g, '').toLowerCase()] = ++a[e.SerialNumber.replace(/\s+/g, '').toLowerCase()] || 0;
        return a;
      }, {});
      let resultarray = emptyarray.filter(e => lookup[e.SerialNumber.replace(/\s+/g, '').toLowerCase()]);
      if (resultarray.length > 0) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Already Exists',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        event.target.value = '';
        this.SerialArraywithpo[id][ValidExpiryDate] = event.target.value;
        this.commonService.data.SerialArraywithpo[id][ValidExpiryDate] = event.target.value;
        this.SerialArraywithpo[id][ExpiryDate] = event.target.value;
        this.commonService.data.SerialArraywithpo[id][ExpiryDate] = event.target.value;
        this.dataSourcems.filteredData[id][ExpiryDate] = event.target.value;
        this.dataSourcems._updateChangeSubscription();
        return;
      }
      this.SerialArraywithpo[id][ValidExpiryDate] = serialdate;
      this.commonService.data.SerialArraywithpo[id][ValidExpiryDate] = serialdate;
      this.SerialArraywithpo[id][ExpiryDate] = date;
      this.commonService.data.SerialArraywithpo[id][ExpiryDate] = date;
      this.dataSourcems.filteredData[id][ExpiryDate] = date;
      this.dataSourcems._updateChangeSubscription();

    }


  }

  addEventsserialno(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.SerialArraywithpo[id][property] = result;
    this.commonService.data.SerialArraywithpo[id][property] = result;
    this.dataSourcems.filteredData[id][property] = result;
    this.dataSourcems._updateChangeSubscription();
    if (this.SerialArraywithpo[id].SerialNumber == "") {
      this.SerialArraywithpo[id].chk = true;
      this.commonService.data.SerialArraywithpo[id].chk = this.SerialArraywithpo[id].chk;
      this.SerialArraywithpo[id].ExpiryDate = event.target.value;
      this.commonService.data.SerialArraywithpo[id].ExpiryDate = this.SerialArraywithpo[id].ExpiryDate;
      this.SerialArraywithpo[id].ValidExpiryDate = event.target.value;
      this.commonService.data.SerialArraywithpo[id].ValidExpiryDate = this.SerialArraywithpo[id].ValidExpiryDate;
    } else {
      this.SerialArraywithpo[id].chk = false;
      this.commonService.data.SerialArraywithpo[id].chk = this.SerialArraywithpo[id].chk;
    }
  }
  remove(i, element) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
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
      if (result.value) {
        debugger;
        if (i !== -1) {
          debugger;
          this.DrugNameList.forEach((z: any) => {
            if (z.Value === element.ItemID) {
              z.checkStatus = false;
            }
          });


          if (this.BatchhDetails.length > 0) {

            this.Grnwithoutpoarray.forEach((z: any) => {
              debugger;
              this.BatchhDetails = this.BatchhDetails.filter(function (item) {
                return item.druggid !== z.ItemID;
              });
            });
            this.commonService.data.BatchhDetails = this.BatchhDetails;
          }

          if (this.SerialArraywithpo.length > 0) {
            this.Grnwithoutpoarray.forEach((z: any) => {
              debugger;
              this.SerialArraywithpo = this.SerialArraywithpo.filter(function (item) {
                return item.druggid !== z.ItemID;
              });
            });
            this.commonService.data.SerialArraywithpo = this.SerialArraywithpo;
          }
          this.Grnwithoutpoarray.splice(i, 1);
          this.commonService.data.Itemdetails.splice(i, 1);
          this.dataSource.data = this.commonService.data.Itemdetails;
          this.dataSource._updateChangeSubscription();
        }

        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.disablegrn = false;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Item details not deleted',
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

  resetform() {
    debugger;
    this.Supplier = "";
    this.Address1 = "";
    this.Location = "";
    this.PhoneNo = "";
    this.GSTNo = "";
    this.Countryyy = "";
    this.DLno = "";
    this.DLnoDate = "";
  }
  ptotalwords;
  onSubmit(form: NgForm) {

    debugger;

    if (form.valid) {
      this.isInvalid = false;
      let itembqty = 0;
      let itemsqty = 0;
      let btchqty = 0;
      let serialqty = 0;

      if (this.Grnwithoutpoarray.length < 1) {

        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check the item details',
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


      if (this.Grnwithoutpoarray.filter((x) => x.Tracking == 1).length > 0) {
        itembqty = this.Grnwithoutpoarray.filter((x) => x.Tracking == 1).map((s) => +s.ItemQty).reduce((sum, c) => sum + c);
      }
      if (this.Grnwithoutpoarray.filter((x) => x.Tracking == 0).length > 0) {
        itemsqty = this.Grnwithoutpoarray.filter((x) => x.Tracking == 0).map((s) => +s.ItemQty).reduce((sum, c) => sum + c);
      }


      if (this.Grnwithoutpoarray.some(Med => Med.Tracking == 2 && Med.ItemQty == 0)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter quantity',
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

      if (this.BatchhDetails.length > 0) { btchqty = this.BatchhDetails.map((s) => +s.BatchQuantity).reduce((sum, c) => sum + c); }

      if (this.SerialArraywithpo.length > 0) { serialqty = this.SerialArraywithpo.map((s) => +s.serialQuantity).reduce((sum, c) => sum + c); }

      if (itembqty != btchqty) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check itembatch',
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

      if (itemsqty != serialqty) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check itemserial',
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

      if (this.BatchhDetails.some(Med => Med.BatchNo === "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check itembatch',
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

      if (this.BatchhDetails.some(Med => Med.ValidExpiryDate === "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Check itembatch',
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

      if (this.Grnwithoutpoarray.some(Med => Med.ItemDrug === "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose drug name',
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

      if (this.Grnwithoutpoarray.some(Med => Med.ItemQty === 0)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter quantity',
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


      if (this.SerialArraywithpo.some((d) => d.SerialNumber == "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter serial no',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        return;
      };

      if (this.SerialArraywithpo.some((d) => d.ValidExpiryDate == null || d.ValidExpiryDate == "")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Choose expirydate',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        return;
      };




      this.commonService.data.StockMaster = new StockMaster();

      this.commonService.data.StockMaster.VendorID = this.Supplier;
      this.commonService.data.StockMaster.StoreID = this.storename;
      this.commonService.data.StockMaster.QtnNumber = this.quno;
      this.commonService.data.StockMaster.QtnDate = this.Quotationdate;
      this.commonService.data.StockMaster.DCNumber = this.dcno;
      this.commonService.data.StockMaster.DCDate = this.dcdt;
      this.commonService.data.StockMaster.DocumentDate = this.GRNDate;
      this.commonService.data.StockMaster.TermsConditions = this.Instructions;
      this.commonService.data.StockMaster.GrossProductValue = this.person.Grossproductamount;
      this.commonService.data.StockMaster.TotalDiscountValue = this.person.Totaldiscountamount;
      this.commonService.data.StockMaster.TotalTaxValue = this.person.Totalgstamount;
      this.commonService.data.StockMaster.TotalPOValue = this.person.Totalpoamount;
      this.commonService.data.StockMaster.TotalCESSValue = this.person.Totalcessamount;
      this.commonService.data.StockMaster.TotalAdditionalCESSValue = this.person.TotalAdditionalcessamount;
      this.commonService.data.StockMaster.CreatedBy = this.docotorid;
      this.commonService.data.StockMaster.TransactionID = this.TransactionId;

      console.log(this.commonService.data);

      this.commonService.postData('GrnWoPo/UpdateGrnWoPo/' + this.cmpid + '/' + this.TransactionId + '/' + this.Getloctime, this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {

            this.commonService.getListOfData('GrnWoPo/GrnWoPoprint/' + data.RandomUniqueID + '/' + this.cmpid + '/' + this.Getloctime).subscribe((data: any) => {
              debugger;
              this.Pgrnno = data.Pgrnno;
              this.Pgrndate = data.Pgrndate;
              this.pqtnno = data.pqtnno;
              this.pqtndate = data.pqtndate;
              this.pdcno = data.pdcno;
              this.pdcdate = data.pdcdate;
              this.pname = data.pname;
              this.padress1 = data.padress1 + " " + data.padress2 != " " ? data.padress1 + " " + data.padress2 : " ";
              if (data.PLocation != null && data.Pcity != null) {
                this.PLocation = data.PLocation + " " + "/" + " " + data.Pcity;
              }

              if (data.PLocation == null && data.Pcity != null) {
                this.PLocation = data.Pcity
              }

              if (data.PLocation == null && data.Pcity == null) {
                this.PLocation = "";
              }

              if (data.Pstate == null && data.Pcountry == null) {
                this.Pstate = "";
              }

              if (data.Pstate != null && data.Pcountry != null) {
                this.Pstate = data.Pstate + " " + "/" + " " + data.Pcountry;
              }
              this.pphno = data.pphno;
              this.pgstno = data.pgstno;
              this.pdlno = data.pdlno;
              this.pdldate = this.datePipe.transform(data.pdldate, "dd-MM-yyyy HH:mm");
              this.PGrossProductValue = data.PGrossProductValue;
              this.PTotalDiscountValue = data.PTotalDiscountValue;
              this.PTotalTaxValue = data.PTotalTaxValue + data.PTotalCESSValue + data.PTotalAdditionalCESSValue;
              this.PTotalPOValue = data.PTotalPOValue;
              let ptotalwords = Math.trunc(data.PTotalPOValue);
              this.ptotalwords = ptotalwords;
              this.PAddress = data.PAddress + "" + data.PAddress1 + "" + data.PAddress2;
              this.PPhone = data.PPhone;
              this.PWeb = data.PWeb;
              this.PCompnayname = data.PCompnayname;
              this.pStorename = data.pStorename;
              this.pTremandcond = data.pTremandcond;
              this.Gettotalamount = data.Gettotalamount;
              this.dataSourceprint.data = data.Stocktransdetailss;
              this.dataSource._updateChangeSubscription();

            });
            this.backdrop = 'block';
            this.Grnwithoutpoprint = 'block';


            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Data Saved successfully',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });

            this.Form.onReset();
            this.resetform();
            this.dataSourcems.data = [];
            this.commonService.data.SerialArraywithpo = [];
            this.SerialArraywithpo = [];
            this.dataSource.data = [];
            this.commonService.data.Itemdetails = [];
            this.Grnwithoutpoarray = [];
            this.dataSourcem.data = [];
            this.commonService.data.BatchhDetails = [];
            this.BatchhDetails = [];
            this.pusharray = [];
            this.date = new FormControl(new Date());
            this.serializedDate = new FormControl((new Date()).toISOString());
            this.GRNDate = this.date.value;
          }
          else if (data.Success == false) {
            if (data.Message == "Running Number Does'nt Exist") {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Number control needs to be created for Grn without PO',
                showConfirmButton: false,
                timer: 2000
              });
            }

            else if (data.Message.includes('Violation of PRIMARY KEY')) {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: `${(data.grnwithoutpo)} already exists`,
                showConfirmButton: false,
                timer: 2000
              });
            }
            else if (data.Message == "Financial year doesn't exists") {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'Financial year doesnt exists',
                showConfirmButton: false,
                timer: 2000
              });
            }

            else {

            }
          }

        });


    }

  }

  cancelblock;
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
    this.Form.onReset();
    this.resetform();
    this.dataSourcems.data = [];
    this.commonService.data.SerialArraywithpo = [];
    this.SerialArraywithpo = [];
    this.dataSource.data = [];
    this.commonService.data.Itemdetails = [];
    this.Grnwithoutpoarray = [];
    this.dataSourcem.data = [];
    this.commonService.data.BatchhDetails = [];
    this.BatchhDetails = [];
    this.pusharray = [];
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toISOString());
    this.GRNDate = this.date.value;
    this.commonService.getListOfData('Common/GetstoreDropdownvaluesdesc/' + parseInt(localStorage.getItem("CompanyID")) + '/' + "Stock Department").subscribe(data => { this.StoreName = data; })

  }


  CancelClk() {
    if (this.GRNDate != null || this.quno != null || this.Quotationdate != null || this.dcno != null || this.dcdt != null || this.Supplier != null || this.storename != null || this.Instructions != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
  }



  accesspopup;
  accessdata;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/Goodsreceiptnote";
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
  //dsds
  modalpreview;
  dataSourcemgrn;
  grnwithoutpohistory() {
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

    debugger;
    this.commonService.getListOfData('GrnWoPo/GrnWoPohis/' + this.cmpid + '/' + this.TransactionId + '/' + this.Getloctime).subscribe(data => {
      debugger;
      if (data.length > 0) {
        debugger;
        let arr = data;
        let his = _.orderBy(arr, ['Grn'], ['desc']);
        this.dataSourcemgrn = his;

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


  Pgrnno;
  Pgrndate;
  pqtnno;
  pqtndate;
  pdcno;
  pdcdate;
  pname;
  padress1;
  pphno;
  pgstno;
  pdlno;
  pdldate;
  PLocation;
  Pstate
  pStorename;
  pTremandcond;
  PAddress;
  PAddress1;
  PAddress2;
  PPhone;
  PWeb;
  PCompnayname;
  PGrossProductValue;
  PTotalDiscountValue;
  PTotalTaxValue;
  PTotalPOValue;
  Gettotalamount;
  print(item) {
    debugger;
    this.commonService.getListOfData('GrnWoPo/GrnWoPoprint/' + item.RandomUniqueID + '/' + this.cmpid + '/' + this.Getloctime).subscribe((data: any) => {
      debugger;
      this.Pgrnno = data.Pgrnno;
      this.Pgrndate = data.Pgrndate;
      this.pqtnno = data.pqtnno;
      this.pqtndate = data.pqtndate;
      this.pdcno = data.pdcno;
      this.pdcdate = data.pdcdate;
      this.pname = data.pname;
      this.padress1 = data.padress1 + " " + data.padress2 != " " ? data.padress1 + " " + data.padress2 : " ";
      if (data.PLocation != null && data.Pcity != null) {
        this.PLocation = data.PLocation + " " + "/" + " " + data.Pcity;
      }

      if (data.PLocation == null && data.Pcity != null) {
        this.PLocation = data.Pcity
      }

      if (data.PLocation == null && data.Pcity == null) {
        this.PLocation = "";
      }

      if (data.Pstate == null && data.Pcountry == null) {
        this.Pstate = "";
      }

      if (data.Pstate != null && data.Pcountry != null) {
        this.Pstate = data.Pstate + " " + "/" + " " + data.Pcountry;
      }
      this.pphno = data.pphno;
      this.pgstno = data.pgstno;
      this.pdlno = data.pdlno;
      this.pdldate = data.pdldate;
      this.PGrossProductValue = data.PGrossProductValue;
      this.PTotalDiscountValue = data.PTotalDiscountValue;
      this.PTotalTaxValue = data.PTotalTaxValue + data.PTotalCESSValue + data.PTotalAdditionalCESSValue;
      this.PTotalPOValue = data.PTotalPOValue;
      let ptotalwords = Math.trunc(data.PTotalPOValue);
      this.ptotalwords = ptotalwords;
      this.PAddress = data.PAddress + "" + data.PAddress1 + "" + data.PAddress2;
      this.PPhone = data.PPhone;
      this.PWeb = data.PWeb;
      this.PCompnayname = data.PCompnayname;
      this.pStorename = data.pStorename;
      this.pTremandcond = data.pTremandcond;
      this.Gettotalamount = data.Gettotalamount;
      this.dataSourceprint.data = data.Stocktransdetailss;
      this.dataSource._updateChangeSubscription();
      this.modalSuccesspreview();
    });

    this.backdrop = 'block';
    this.Grnwithoutpoprint = 'block';
  }



  Grnwithoutpoprint;

  printclose(): void {
    this.backdrop = 'none';
    this.Grnwithoutpoprint = 'none';

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
    this.Grnwithoutpoprint = 'none';
  }


  modalpreviewgrn;
  selectgrnwithoutpo(item) {
    this.modalpreviewgrn = 'block';
    this.backdrop = 'block';

    this.commonService.getListOfData('GrnWoPo/GrnWoPoprint/' + item.RandomUniqueID + '/' + this.cmpid + '/' + this.Getloctime).subscribe((data: any) => {
      debugger;

      if (data.Stocktransdetailss.length > 0) {

        this.Pgrnno = data.Pgrnno;
        this.Pgrndate = data.Pgrndate;
        this.pqtnno = data.pqtnno;
        this.pqtndate = data.pqtndate;
        this.pdcno = data.pdcno;
        this.pdcdate = data.pdcdate;
        this.pname = data.pname;
        this.padress1 = data.padress1 + " " + data.padress2 != " " ? data.padress1 + " " + data.padress2 : " ";
        if (data.PLocation != null && data.Pcity != null) {
          this.PLocation = data.PLocation + " " + "/" + " " + data.Pcity;
        }

        if (data.PLocation == null && data.Pcity != null) {
          this.PLocation = data.Pcity
        }

        if (data.PLocation == null && data.Pcity == null) {
          this.PLocation = "";
        }

        if (data.Pstate == null && data.Pcountry == null) {
          this.Pstate = "";
        }

        if (data.Pstate != null && data.Pcountry != null) {
          this.Pstate = data.Pstate + " " + "/" + " " + data.Pcountry;
        }
        this.pphno = data.pphno;
        this.pgstno = data.pgstno;
        this.pdlno = data.pdlno;
        this.pdldate = data.pdldate;
        this.PGrossProductValue = data.PGrossProductValue;
        this.PTotalDiscountValue = data.PTotalDiscountValue;
        this.PTotalTaxValue = data.PTotalTaxValue + data.PTotalCESSValue + data.PTotalAdditionalCESSValue;
        this.PTotalPOValue = data.PTotalPOValue;
        this.pStorename = data.pStorename;
        this.pTremandcond = data.pTremandcond;
        this.Gettotalamount = data.Gettotalamount;
        this.dataSourceprintview.data = data.Stocktransdetailss;
        this.dataSource._updateChangeSubscription();

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

  modalSuccesspreviewgrn() {
    this.modalpreviewgrn = 'none';
    this.backdrop = 'none';
  }

  modalmedview;
  modalSuccessmedview() {
    debugger;
    this.modalmedview = 'none';
    this.backdrop = 'none';
  }

  modalmedSerialview;
  modalSuccessmedSerialview() {
    this.modalmedSerialview = 'none';
    this.backdrop = 'none';
  }

  ItemDrug;
  ItemQty;
  viewbatchserial(item) {
    debugger;
    if (item.Tracking == 1) {
      debugger;
      this.modalmedview = 'block';
      this.backdrop = 'block';
      this.ItemDrug = item.ItemDrug;
      this.ItemQty = item.ItemQty;

      this.commonService.getListOfData('GrnWoPo/GrnWoPobatchhistory/' + item.STID + '/' + this.TransactionId).subscribe(data => {
        debugger;
        if (data.length > 0) {
          debugger;
          this.dataSourcemview.data = data;
          this.dataSource._updateChangeSubscription();

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
    else if (item.Tracking == 0) {
      debugger;
      this.modalmedSerialview = 'block';
      this.backdrop = 'block';
      this.ItemDrug = item.ItemDrug;
      this.ItemQty = item.ItemQty;

      this.commonService.getListOfData('GrnWoPo/GrnWoPoserialhistory/' + this.Pgrnno + '/' + this.TransactionId).subscribe(data => {
        debugger;
        if (data.length > 0) {
          debugger;
          this.dataSourcemsview.data = data;
          this.dataSource._updateChangeSubscription();

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
    else {

    }
  }






  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
