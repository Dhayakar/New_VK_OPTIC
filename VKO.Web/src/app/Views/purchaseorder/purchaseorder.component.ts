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
import { Observable } from 'rxjs';
import { PurchaseOrder } from 'src/app/Models/PurchaseOrder.model';
import { PurchaseOrderTrans } from '../../Models/PurchaseOrderTrans.model';
import { purchaseorderview, purchasedetails, purchasedetailsDelete } from '../../Models/ViewModels/purchaseorderview.model';
import Swal from 'sweetalert2';
import * as _l from 'lodash';
import { map, startWith } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';
import * as _ from 'lodash';
//


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
  selector: 'app-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },

  ],
})


export class PurchaseorderComponent implements OnInit {

  @ViewChild('purchaseorderForm') Form: NgForm
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

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());


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
            this.a[n[5][1]])  : '';
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
    private formBuilder: FormBuilder, private router: Router, public datePipe: DatePipe, ) {
  }

  minToDate = new Date();
  Suppliername;
  Locationname;
  Supplier;
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
  Instructions;
  Locations;
  DrugNameList;
  Validity;
  Delivery;
  PaymentandTerms;
  disableaddpurchase = false;
  Purchasehistorytab = false;
  recevicedpurchase = false;
  doctorname;
  docotorid;
  Getloctime;
  TransactionId;
  Locationcity;
  contable = false;
  State1;
  Country1;
  Country2;
  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;
  displayedColumns: string[] = ['DrugName', 'PurchaseUOM', 'Quantity', 'recevicedQuantity', 'UnitPrice', 'Amount', 'Discount', 'DiscountAmount', 'GrossAmount', 'TaxDescription', 'GST', 'GSTValue', 'TotalAmount', 'Delete'];
  dataSource = new MatTableDataSource();

  displayedColumnsprint: string[] = ['DrugNameprint', 'PurchaseUOMprint', 'Quantityprint', 'recdQuantityprint', 'UnitPriceprint', 'Amountprint', 'Discountprint', 'DiscountAmountprint', 'GrossAmountprint', 'TaxDescriptionprint', 'GSTprint', 'GSTValueprint', 'TotalAmountprint'];
  dataSourceprint = new MatTableDataSource();

  ngOnInit() {
    debugger;
    this.commonService.data = new purchaseorderview();
    var Pathname = "Inventorylazy/Purchaseorder";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    var n = Pathname;
    var sstring = n.includes("/");
    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.TransactionId = res.TransactionID;
    this.Getloctime = localStorage.getItem('GMTTIME');
    this.doctorname = localStorage.getItem('Doctorname');
    this.docotorid = localStorage.getItem('userroleID');
    this.cmpid = parseInt(localStorage.getItem("CompanyID"));
    this.PurchaseDate = this.date.value;
    this.minToDate = this.PurchaseDate;
    this.getAllDropdowns();

    if (this.TransactionId == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: "Number control needs to be created for PO",
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


  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/Purchaseorder";
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


  QuotationdateEvents() {
    debugger;
    var s = this.datePipe.transform(this.PurchaseDate, "dd/MM/yyyy HH:mm");
    var a = this.datePipe.transform(this.Quotationdate, "dd/MM/yyyy HH:mm");

    if (a == s) {
      var d = new Date();
      this.Quotationdate = d;
    }
  }
  getAllDropdowns() {
    this.commonService.getListOfData('Common/Getsuppliervalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => { this.Suppliername = data; });
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => {
      this.Locationname = data;
      this.commonService.getListOfData('purchaseorder/Getcompantdetails/' + this.cmpid + '/').subscribe(data => {
        data.forEach((x: any) => {
          debugger;
          this.DeliveryName = x.CompanyName;
          this.DAddress1 = x.Address1;
          this.DAddress2 = x.Address2;
          if (x.LocationID != 0) {
            let LocationID = this.Locationname.find(y => y.Text == x.LocationName)
            this.Locations = LocationID.Value
          }
          else {
            this.Locations = '';
          }
          this.Citysumbit();
        });
      });

    });
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      this.Country1 = data[0].Value;
      this.Country2 = data[0].Text;
    });

  }


  Statecountry;
  Statesuplier;
  Suppliersumbit() {

    this.commonService.getListOfData('purchaseorder/GetvenderDetails/' + this.Supplier + '/' + this.cmpid)
      .subscribe((data: any) => {
        data.venderdetails.forEach((x: any) => {
          debugger;
          this.Address1 = x.Address1 + " " + x.Address2 == " " ? " " : x.Address1 + " " + x.Address2;
          this.Location = x.Location + " " + "/" + " " + data.venderdetails[0].City == " / " ? " " : x.Location + " " + "/" + " " + data.venderdetails[0].City;
          this.PhoneNo = x.PhoneNo;
          this.GSTNo = x.GSTNo;
          localStorage.setItem('VID', data.venderdetails[0].ID);
        });
        this.Statesuplier = data.state + " " + "/" + " " + data.country == " / " ? " " : data.state + " " + "/" + " " + data.country;

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
              text: 'None of the Drugs mapped by the Supplier',
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
            this.Statesuplier = "";
          }

        });

      });
  }
  Presentloc = true;
  Locationcitiesname;
  Citysumbit() {
    this.commonService.getListOfData('purchaseorder/GetlocationDetails/' + this.Locations + '/')
      .subscribe((data: any) => {
        this.Statecountry = data.ParentDescriptionstate + " " + "/" + " " + data.ParentDescriptioncountry == " / " ? " " : data.ParentDescriptionstate + " " + "/" + " " + data.ParentDescriptioncountry;
        if (this.Statecountry != null) {
          this.Presentloc = false;
        }
        else {
          this.Presentloc = true;
        }
        this.commonService.getListOfData('Common/Getlocationvalues/' + this.Locations).subscribe(data => {
          this.Locationcitiesname = data;
        });
      });
  }
  purchasedetailsDelete = [];
  removepurchase(i, element) {
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
          if (element.POTranID != undefined) {
            var st = new purchasedetailsDelete();
            st.ID = element.POTranID;
            st.IsDeleted = true;
            this.purchasedetailsDelete.push(st);
            this.commonService.data.purchasedetailsDelete = this.purchasedetailsDelete;
            this.DrugNameList.forEach((z: any) => {
              if (z.Value === element.ItemID) {
                z.checkStatus = false;
              }
            });
            this.purchaseorderarray.splice(i, 1);
            this.commonService.data.purchasedetails.splice(i, 1);
            this.dataSource.data = this.commonService.data.purchasedetails;
            this.dataSource._updateChangeSubscription();
          } else {
            this.DrugNameList.forEach((z: any) => {
              if (z.Value === element.ItemID) {
                z.checkStatus = false;
              }
            });
            this.purchaseorderarray.splice(i, 1);
            this.commonService.data.purchasedetails.splice(i, 1);
            this.dataSource.data = this.commonService.data.purchasedetails;
            this.dataSource._updateChangeSubscription();
          }
        }
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.disableaddpurchase = false;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Item Details not deleted',
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


  DrugName;
  Med_Pres_Tran;

  //Add table rows

  @ViewChildren('DrugNameinsert') DrugNameinsert: QueryList<ElementRef>;
  drugnamefirst(i) {
    debugger;
    setTimeout(() => {
      this.DrugNameinsert.toArray()[i].nativeElement.focus();
    });
  }

  @ViewChildren('DrugNames') DrugNamesSelectclose: QueryList<MatSelect>;
  arrowrightdrug(i, event, element) {
    this.DrugNamesSelectclose.toArray()[i].close();
    this.drugnamefirst(i);
  }

  @ViewChildren('DrugNames') DrugNamesopen: QueryList<MatSelect>;
  enterDrugView(i, event) {
    this.DrugNamesopen.toArray()[i].open();
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

  @ViewChildren('inputdrug') inputdrug: QueryList<ElementRef>;
  @ViewChild('inputdrug', { read: MatInput }) inputm: MatInput;
  someMethodDrugView(i, event, element) {
    debugger;
    this.DrugNameList = JSON.parse(localStorage.getItem('DrugNameListdrop'));
    if (this.purchaseorderarray.length > 0) {
      this.purchaseorderarray.forEach((y: any) => {
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



  FIlterdatadrug(value: string) {
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('DrugNameListdrop'));
    const filterValue = value.toLowerCase();
    this.DrugNameList = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }

  purchaseorderarray = [];
  Addpurchase() {
    debugger;

    if (this.purchaseorderarray.length > 0) {
      if (this.purchaseorderarray.some(Med => Med.Status == "PARTIALLY RECEIVED")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'This purchase order partially received',
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

    if (this.purchaseorderarray.length > 0) {
      if (this.purchaseorderarray.some(Med => Med.Status == "RECEIVED")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'This purchase order received',
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


    if (this.purchaseorderarray.length > 0) {
      if (this.purchaseorderarray.some(Med => Med.ItemQty == 0 || Med.ItemQty == null || Med.ItemQty == undefined)) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter the Quantity',
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
      var MedPres = new purchasedetails();
      MedPres.ItemDrug = "";
      MedPres.UOMname = "";
      MedPres.ItemID = "";
      this.purchaseorderarray.unshift(MedPres);
      this.commonService.data.purchasedetails = this.purchaseorderarray;
      this.dataSource.data = this.commonService.data.purchasedetails;
      this.dataSource._updateChangeSubscription();
      this.disableaddpurchase = true;
      let disph = this.commonService.data.purchasedetails[0].ItemID;
      let index = this.commonService.data.purchasedetails.findIndex(x => x.ItemID == disph);
      this.drugnamefirst(index);
      localStorage.setItem("parray", JSON.stringify(this.purchaseorderarray));
      this.purchaseorderarray = JSON.parse(localStorage.getItem("parray"));

    }
  }

  DrugView(event, id) {
    debugger;

    this.commonService.getListOfData('purchaseorder/GetdrugDetails/' + event.value + '/' + this.cmpid)
      .subscribe(data => {
        debugger;
        if (data.purchaseorderdetails.length > 0) {
          debugger;
          this.purchaseorderarray[id].ItemID = data.purchaseorderdetails[0].DrugID;
          this.purchaseorderarray[id].ItemDrug = data.purchaseorderdetails[0].Drugname;
          this.purchaseorderarray[id].UOMname = data.purchaseorderdetails[0].PurchaseUOM;
          this.purchaseorderarray[id].UOMID = data.purchaseorderdetails[0].purchaseid;
          this.purchaseorderarray[id].GSTPercentage = data.purchaseorderdetails[0].GST;
          this.purchaseorderarray[id].CESSPercentage = data.purchaseorderdetails[0].CESS;
          this.purchaseorderarray[id].AdditionalCESSPercentage = data.purchaseorderdetails[0].AdditionalCESS;
          this.purchaseorderarray[id].TaxDescription = data.purchaseorderdetails[0].TaxDescription;
          this.purchaseorderarray[id].CESSDescription = data.purchaseorderdetails[0].CessDescription;
          this.purchaseorderarray[id].AdditionalCESSDescription = data.purchaseorderdetails[0].AddcessDescription;
          this.purchaseorderarray[id].ItemRate = data.purchaseorderdetails[0].UnitPrice;
          this.purchaseorderarray[id].ItemQty = data.purchaseorderdetails[0].ItemQty;
          this.purchaseorderarray[id].ItemValue = data.purchaseorderdetails[0].ItemValue;
          this.purchaseorderarray[id].DiscountAmount = data.purchaseorderdetails[0].DiscountAmount;
          this.purchaseorderarray[id].GSTTaxValue = data.purchaseorderdetails[0].GSTTaxValue;
          this.purchaseorderarray[id].CESSAmount = data.purchaseorderdetails[0].CESSAmount;
          this.purchaseorderarray[id].AddCESSAmount = data.purchaseorderdetails[0].AddCESSAmount;
          this.purchaseorderarray[id].TotalAmount = data.purchaseorderdetails[0].TotalAmount;
          this.purchaseorderarray[id].GrossAmount = data.purchaseorderdetails[0].GrossAmount;
          this.commonService.data.purchasedetails[id].ItemDrug = this.purchaseorderarray[id].ItemDrug;
          this.commonService.data.purchasedetails[id].ItemID = this.purchaseorderarray[id].ItemID;
          this.commonService.data.purchasedetails[id].UOMID = this.purchaseorderarray[id].UOMID;
          this.commonService.data.purchasedetails[id].UOMname = this.purchaseorderarray[id].UOMname;
          this.commonService.data.purchasedetails[id].GSTPercentage = this.purchaseorderarray[id].GSTPercentage;
          this.commonService.data.purchasedetails[id].CESSPercentage = this.purchaseorderarray[id].CESSPercentage;
          this.commonService.data.purchasedetails[id].AdditionalCESSPercentage = this.purchaseorderarray[id].AdditionalCESSPercentage;
          this.commonService.data.purchasedetails[id].TaxDescription = this.purchaseorderarray[id].TaxDescription;
          this.commonService.data.purchasedetails[id].CESSDescription = this.purchaseorderarray[id].CESSDescription;
          this.commonService.data.purchasedetails[id].AdditionalCESSDescription = this.purchaseorderarray[id].AdditionalCESSDescription;
          this.commonService.data.purchasedetails[id].ItemRate = this.purchaseorderarray[id].ItemRate;
          this.commonService.data.purchasedetails[id].ItemQty = this.purchaseorderarray[id].ItemQty;
          this.commonService.data.purchasedetails[id].ItemValue = this.purchaseorderarray[id].ItemValue;
          this.commonService.data.purchasedetails[id].DiscountAmount = this.purchaseorderarray[id].DiscountAmount;
          this.commonService.data.purchasedetails[id].GSTTaxValue = this.purchaseorderarray[id].GSTTaxValue;
          this.commonService.data.purchasedetails[id].CESSAmount = this.purchaseorderarray[id].CESSAmount;
          this.commonService.data.purchasedetails[id].AddCESSAmount = this.purchaseorderarray[id].AddCESSAmount;
          this.commonService.data.purchasedetails[id].TotalAmount = this.purchaseorderarray[id].TotalAmount;
          this.commonService.data.purchasedetails[id].GrossAmount = this.purchaseorderarray[id].GrossAmount;
          this.dataSource.data = this.commonService.data.purchasedetails;
          this.dataSource._updateChangeSubscription();
          this.DrugNameList = JSON.parse(localStorage.getItem('DrugNameListdrop'));
          this.disableaddpurchase = false;
          this.arrowrightdrugs(id);
          debugger;
          this.purchaseorderarray.forEach((y: any) => {
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
      this.commonService.getListOfData('purchaseorder/GetdrugDetails/' + value + '/' + this.cmpid)
        .subscribe(data => {
          debugger;
          if (data.purchaseorderdetails.length > 0) {
            this.purchaseorderarray[id].ItemID = data.purchaseorderdetails[0].DrugID;
            this.purchaseorderarray[id].ItemDrug = data.purchaseorderdetails[0].Drugname;
            this.purchaseorderarray[id].UOMname = data.purchaseorderdetails[0].PurchaseUOM;
            this.purchaseorderarray[id].UOMID = data.purchaseorderdetails[0].purchaseid;
            this.purchaseorderarray[id].GSTPercentage = data.purchaseorderdetails[0].GST;
            this.purchaseorderarray[id].CESSPercentage = data.purchaseorderdetails[0].CESS;
            this.purchaseorderarray[id].AdditionalCESSPercentage = data.purchaseorderdetails[0].AdditionalCESS;
            this.purchaseorderarray[id].TaxDescription = data.purchaseorderdetails[0].TaxDescription;
            this.purchaseorderarray[id].CESSDescription = data.purchaseorderdetails[0].CessDescription;
            this.purchaseorderarray[id].AdditionalCESSDescription = data.purchaseorderdetails[0].AddcessDescription;
            this.purchaseorderarray[id].ItemRate = data.purchaseorderdetails[0].UnitPrice;
            this.purchaseorderarray[id].ItemQty = data.purchaseorderdetails[0].ItemQty;
            this.purchaseorderarray[id].ItemValue = data.purchaseorderdetails[0].ItemValue;
            this.purchaseorderarray[id].DiscountAmount = data.purchaseorderdetails[0].DiscountAmount;
            this.purchaseorderarray[id].GSTTaxValue = data.purchaseorderdetails[0].GSTTaxValue;
            this.purchaseorderarray[id].CESSAmount = data.purchaseorderdetails[0].CESSAmount;
            this.purchaseorderarray[id].AddCESSAmount = data.purchaseorderdetails[0].AddCESSAmount;
            this.purchaseorderarray[id].TotalAmount = data.purchaseorderdetails[0].TotalAmount;
            this.purchaseorderarray[id].GrossAmount = data.purchaseorderdetails[0].GrossAmount;
            this.commonService.data.purchasedetails[id].ItemDrug = this.purchaseorderarray[id].ItemDrug;
            this.commonService.data.purchasedetails[id].ItemID = this.purchaseorderarray[id].ItemID;
            this.commonService.data.purchasedetails[id].UOMID = this.purchaseorderarray[id].UOMID;
            this.commonService.data.purchasedetails[id].UOMname = this.purchaseorderarray[id].UOMname;
            this.commonService.data.purchasedetails[id].GSTPercentage = this.purchaseorderarray[id].GSTPercentage;
            this.commonService.data.purchasedetails[id].CESSPercentage = this.purchaseorderarray[id].CESSPercentage;
            this.commonService.data.purchasedetails[id].AdditionalCESSPercentage = this.purchaseorderarray[id].AdditionalCESSPercentage;
            this.commonService.data.purchasedetails[id].TaxDescription = this.purchaseorderarray[id].TaxDescription;
            this.commonService.data.purchasedetails[id].CESSDescription = this.purchaseorderarray[id].CESSDescription;
            this.commonService.data.purchasedetails[id].AdditionalCESSDescription = this.purchaseorderarray[id].AdditionalCESSDescription;
            this.commonService.data.purchasedetails[id].ItemRate = this.purchaseorderarray[id].ItemRate;
            this.commonService.data.purchasedetails[id].ItemQty = this.purchaseorderarray[id].ItemQty;
            this.commonService.data.purchasedetails[id].ItemValue = this.purchaseorderarray[id].ItemValue;
            this.commonService.data.purchasedetails[id].DiscountAmount = this.purchaseorderarray[id].DiscountAmount;
            this.commonService.data.purchasedetails[id].GSTTaxValue = this.purchaseorderarray[id].GSTTaxValue;
            this.commonService.data.purchasedetails[id].CESSAmount = this.purchaseorderarray[id].CESSAmount;
            this.commonService.data.purchasedetails[id].AddCESSAmount = this.purchaseorderarray[id].AddCESSAmount;
            this.commonService.data.purchasedetails[id].TotalAmount = this.purchaseorderarray[id].TotalAmount;
            this.commonService.data.purchasedetails[id].GrossAmount = this.purchaseorderarray[id].GrossAmount;
            this.dataSource.data = this.commonService.data.purchasedetails;
            this.dataSource._updateChangeSubscription();
            this.disableaddpurchase = false;
            this.DrugNameList = JSON.parse(localStorage.getItem('DrugNameListdrop'));
            this.arrowrightdrugs(id);
            this.purchaseorderarray.forEach((y: any) => {
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




  /////////////////////////////////// Add event ///////////////////////////////////


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
    this.purchaseorderarray[id][property] = result;
    this.commonService.data.purchasedetails[id][property] = result;
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();

  }

  changeValueAmount(id, element, property: string) {
    this.purchaseorderarray[id][property] = element.ItemRate;
    this.commonService.data.purchasedetails[id][property] = element.ItemRate;
  }

  changeItemValue(id, element, property: string) {
    element.ItemValue = element.ItemQty * element.ItemRate;
    this.purchaseorderarray[id][property] = element.ItemValue;
    this.commonService.data.purchasedetails[id][property] = element.ItemValue;
  }

  changeValueGrossAmount(id, element, property: string) {
    element.GrossAmount = (element.ItemValue) - (element.ItemValue) * element.DiscountPercentage / 100;
    this.purchaseorderarray[id][property] = element.GrossAmount;
    this.commonService.data.purchasedetails[id][property] = element.GrossAmount;
  }

  changeValueDiscountAmount(id, element, property: string) {
    element.DiscountAmount = (element.ItemQty * element.ItemRate) * element.DiscountPercentage / 100;
    this.purchaseorderarray[id][property] = element.DiscountAmount;
    this.commonService.data.purchasedetails[id][property] = element.DiscountAmount;
  }

  changeValueTotal(id, element, property: string) {
    debugger;
    element.TotalAmount = element.GrossAmount + element.GSTTaxValue + element.CESSAmount + element.AddCESSAmount;
    this.purchaseorderarray[id][property] = element.TotalAmount;
    this.commonService.data.purchasedetails[id][property] = element.TotalAmount;
  }

  changeGStAmount(id, element, property: string) {
    element.GSTTaxValue = element.GrossAmount * (element.GSTPercentage / 100);
    this.purchaseorderarray[id][property] = element.GSTTaxValue;
    this.commonService.data.purchasedetails[id][property] = element.GSTTaxValue;

  }

  changeCESSAmount(id, element, property: string) {
    element.CESSAmount = element.GrossAmount * (element.CESSPercentage / 100);
    this.purchaseorderarray[id][property] = element.CESSAmount;
    this.commonService.data.purchasedetails[id][property] = element.CESSAmount;
  }

  changeAdditionalCESSAmount(id, element, property: string) {
    debugger;
    element.AddCESSAmount = element.GrossAmount * (element.AdditionalCESSPercentage / 100);
    this.purchaseorderarray[id][property] = element.AddCESSAmount;
    this.commonService.data.purchasedetails[id][property] = element.AddCESSAmount;
  }

  GetTotalcost() {
    var restotalcost = this.commonService.data.purchasedetails.map(t => t.ItemValue).reduce((acc, value) => acc + value, 0);
    this.person.Totalamount = restotalcost;
    return restotalcost;
  }

  GetGrossAmount() {
    var restotalcost = this.commonService.data.purchasedetails.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    restotalcost = parseFloat(restotalcost.toFixed(2));
    this.person.Grossproductamount = restotalcost;
    return restotalcost;
  }

  GetDiscountAmount() {
    var restotalcost = this.commonService.data.purchasedetails.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
    this.person.Totaldiscountamount = restotalcost;
    return restotalcost;
  }

  GetTotalAmount() {
    var restotalcost = this.commonService.data.purchasedetails.map(t => t.TotalAmount).reduce((acc, value) => acc + value, 0);
    this.person.Totalpoamount = restotalcost;
    return restotalcost;
  }

  GetGSTAmount() {
    var restotalcost = this.commonService.data.purchasedetails.map(t => t.GSTTaxValue).reduce((acc, value) => acc + value, 0);
    this.person.Totalgstamount = restotalcost;
    return restotalcost;
  }

  GetCESSAmount() {
    var restotalcost = this.commonService.data.purchasedetails.map(t => t.CESSAmount).reduce((acc, value) => acc + value, 0);
    this.person.Totalcessamount = restotalcost;
    return restotalcost;
  }

  GetAdditionalCESSAmount() {
    var restotalcost = this.commonService.data.purchasedetails.map(t => t.AddCESSAmount).reduce((acc, value) => acc + value, 0);
    this.person.TotalAdditionalcessamount = restotalcost;
    return restotalcost;
  }

  Taxtotalamount() {
    return this.GetGSTAmount() + this.GetCESSAmount() + this.GetAdditionalCESSAmount();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ponumber
  modalpurchase;
  backdrop;
  modalSuccessssspurchaseOk() {

    this.backdrop = 'none';
    this.modalpurchase = 'none';
    this.purchaseprint = 'block';

  }
  modalSuccesspurchase() {

    this.backdrop = 'none';
    this.modalpurchase = 'none';

  }

  Pnumber;
  PDate;
  QNo;
  QDate;
  VNamee;
  VAddresss1;
  VLocationn;
  Vstate;
  VPhonenoo;
  VGstnoo;
  PDeliveryy;
  PDeliveryaddd1;
  PLocationn;
  Pstate;
  PGrosss;
  PDiscountt;
  PTotalaxx;
  PTotalpoo;
  Potransdetailss;
  CAddress;
  CPhone;
  CWebb;
  Termc;
  valid;
  deliveryy;
  paymen;
  company;
  cmpid;
  overallamount = 0;
  ptotalwords;
  isInvalid = false;
  onSubmit(form: NgForm) {
    debugger;

    if (form.valid) {
      this.isInvalid = false;
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

    if (this.Locations == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose City',
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
    else if (this.Locations == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose City',
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
    else if (this.Locations == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Choose City',
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


    if (this.DeliveryName == undefined) {
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
    else if (this.DeliveryName == "") {
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
    else if (this.DeliveryName == null) {
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
    if (this.DAddress1 == undefined) {
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
    else if (this.DAddress1 == "") {
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
    else if (this.DAddress1 == null) {
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

    if (this.purchaseorderarray === undefined) {

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

    if (this.purchaseorderarray.length < 1) {

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

    if (this.purchaseorderarray.some(Med => Med.ItemDrug === "")) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Your DrugName',
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

    if (this.purchaseorderarray.some(Med => Med.ItemQty === 0)) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter the Quantity',
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

    if (this.purchaseorderarray.length > 0) {
      if (this.purchaseorderarray.some(Med => Med.Status == "PARTIALLY RECEIVED")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'This purchase order partially received',
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

    if (this.purchaseorderarray.length > 0) {
      if (this.purchaseorderarray.some(Med => Med.Status == "RECEIVED")) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'This purchase order received',
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

    this.commonService.data.PurchaseOrder = new PurchaseOrder();

    this.commonService.data.PurchaseOrder.PODate = this.PurchaseDate;

    if (this.Quotationno != "" && this.Quotationno != null && this.Quotationno != undefined) {
      this.commonService.data.PurchaseOrder.QuotationNumber = this.Quotationno;
    }
    else {
      this.commonService.data.PurchaseOrder.QuotationNumber = undefined;
    }

    if (this.Quotationdate != undefined && this.Quotationdate != null) {

      this.commonService.data.PurchaseOrder.QuotationDate = this.Quotationdate;
    }
    else {
      this.commonService.data.PurchaseOrder.QuotationDate = undefined;
    }

    this.commonService.data.PurchaseOrder.VendorID = this.Supplier;
    this.commonService.data.PurchaseOrder.DeliveryName = this.DeliveryName;
    this.commonService.data.PurchaseOrder.DeliveryAddress1 = this.DAddress1;
      this.commonService.data.PurchaseOrder.DeliveryAddress2 = this.DAddress2;

    if (this.Locationcity != null) {
      if (this.Locationcity != "") {
        if (this.Locationcity != undefined) {
          let lc = parseInt(this.Locationcity);
          this.commonService.data.PurchaseOrder.DeliveryLocationID = lc;
        }

        else {
          if (this.Locations != null) {
            if (this.Locations != "") {
              if (this.Locations != undefined) {
                let l = parseInt(this.Locations);
                this.commonService.data.PurchaseOrder.DeliveryLocationID = l;
              }
            }
          }
        }
      }
      else {
        if (this.Locations != null) {
          if (this.Locations != ""){
            if (this.Locations != undefined) {
              let l = parseInt(this.Locations);
              this.commonService.data.PurchaseOrder.DeliveryLocationID = l;
            }
          }
        }
      }
    }
    else {
      if (this.Locations != null) {
        if (this.Locations != "") {
          if (this.Locations != undefined) {
            let l = parseInt(this.Locations);
            this.commonService.data.PurchaseOrder.DeliveryLocationID = l;
          }
        }
      }
    }
    this.commonService.data.PurchaseOrder.Validity = this.Validity;
    this.commonService.data.PurchaseOrder.Delivery = this.Delivery;
    this.commonService.data.PurchaseOrder.PaymentandTerms = this.PaymentandTerms;
    this.commonService.data.PurchaseOrder.TermsConditions = this.Instructions;
    this.commonService.data.PurchaseOrder.GrossProductValue = this.person.Grossproductamount;
    this.commonService.data.PurchaseOrder.TotalDiscountValue = this.person.Totaldiscountamount;
    this.commonService.data.PurchaseOrder.TotalTaxValue = this.person.Totalgstamount;
    this.commonService.data.PurchaseOrder.TotalPOValue = this.person.Totalpoamount;
    this.commonService.data.PurchaseOrder.CESSAmount = this.person.Totalcessamount;
    this.commonService.data.PurchaseOrder.AdditionalCESSAmount = this.person.TotalAdditionalcessamount;
    this.commonService.data.PurchaseOrder.CMPID = this.cmpid;
    this.commonService.data.PurchaseOrder.CreatedBy = this.docotorid;
    this.commonService.data.PurchaseOrder.TransactionID = this.TransactionId;
    if (this.POID != undefined) {
      if (this.POID != null) {
        if (this.POID != "") {
          this.commonService.data.PurchaseOrder.RandomUniqueID = this.POID;
          this.commonService.data.PurchaseOrder.PONumber = this.PONumber;
        }
      }
    } else {
      this.commonService.data.PurchaseOrder.RandomUniqueID = "";
      this.commonService.data.PurchaseOrder.PONumber = "";
    }
    if (this.commonService.data.purchasedetailsDelete == undefined || this.commonService.data.purchasedetailsDelete == null) {
      this.commonService.data.purchasedetailsDelete = new Array<purchasedetailsDelete>();
    }

    console.log(this.commonService.data)
    this.commonService.postData('purchaseorder/Insertpurchaseorder/' + this.cmpid + '/' + this.TransactionId + '/' + this.Getloctime, this.commonService.data)
      .subscribe(data => {
        debugger;
        if (data.Success == true) {

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

          this.commonService.getListOfData('purchaseorder/Getpurchaseprint/' + data.RandomUniqueID + '/' + this.cmpid + '/' + this.Getloctime + '/' + "Open" + '/' + data.ponum).subscribe((data: any) => {
            debugger;
            this.Pnumber = data.PooNumber;
            this.PDate = data.PooDate;
            this.QNo = data.QoNo;
            this.QDate = data.QoDate;
            this.VNamee = data.VName;
            this.VAddresss1 = data.VAddress1 + " " + data.VAddress2 != " " ? data.VAddress1 + " " + data.VAddress2 : " ";

            if (data.VLocation != null && data.VParentDescriptioncity != null) {
              this.VLocationn = data.VLocation + " " + "/" + " " + data.VParentDescriptioncity;
            }

            if (data.VLocation == null && data.VParentDescriptioncity != null) {
              this.VLocationn = data.VParentDescriptioncity
            }

            if (data.VLocation == null && data.VParentDescriptioncity == null) {
              this.VLocationn = "";
            }

            if (data.VParentDescriptionstate == null && data.VParentDescriptioncountry == null) {
              this.Vstate = "";
            }

            if (data.VParentDescriptionstate != null && data.VParentDescriptioncountry != null) {
              this.Vstate = data.VParentDescriptionstate + " " + "/" + " " + data.VParentDescriptioncountry;
            }
            this.VPhonenoo = data.VPhoneno;
            this.VGstnoo = data.VGstno;
            this.PDeliveryy = data.PDelivery;
            this.PDeliveryaddd1 = data.PDeliveryadd1 + " " + data.PDeliveryadd2 != " " ? data.PDeliveryadd1 + " " + data.PDeliveryadd2 : " ";


            if (data.PLocation != null && data.PDeliveryParentDescriptioncity != null) {
              this.PLocationn = data.PLocation + " " + "/" + " " + data.PDeliveryParentDescriptioncity;
            }

            if (data.PLocation == null && data.PDeliveryParentDescriptioncity != null) {
              this.PLocationn = data.PDeliveryParentDescriptioncity
            }
            if (data.PDeliveryParentDescriptionstate != null && data.PDeliveryParentDescriptioncountry != null) {
              this.Pstate = data.PDeliveryParentDescriptionstate + " " + "/" + " " + data.PDeliveryParentDescriptioncountry;
            }

            if (data.PLocation == null && data.PDeliveryParentDescriptioncity == null) {
              this.PLocationn = "";
            }

            if (data.PDeliveryParentDescriptionstate == null && data.PDeliveryParentDescriptioncountry == null) {
              this.Pstate = "";
            }

            this.PGrosss = data.PGross;
            this.PDiscountt = data.PDiscount;
            this.PTotalaxx = data.PTotalax + data.GetCESSAmountt + data.GetAdditionalCESSAmountt;
            this.PTotalpoo = data.PTotalpo;
            let ptotalwords = Math.trunc(data.PTotalpo);
            this.ptotalwords = ptotalwords;
            this.CAddress = data.Addresss + "" + data.cAddress1 + "" + data.cAddress2;
            this.CPhone = data.Phonee;
            this.CWebb = data.Webb;
            this.Termc = data.Term;
            this.valid = data.Validy;
            this.deliveryy = data.Deliverr;
            this.paymen = data.payments;
            this.company = data.company;
            this.dataSourceprint.data = data.Potransdetails;
            this.overallamount = data.Potransdetails.map((s) => +s.ItemValue).reduce((sum, c) => sum + c);
          });
          this.ponumber = data.ponum,
          this.backdrop = 'block';
          this.modalpurchase = 'block';
          this.dataSource.data = [];
          this.commonService.data.purchasedetails = [];
          this.purchaseorderarray = [];
          this.purchasedetailsDelete = [];
          this.commonService.data.purchasedetailsDelete = [];
          this.dataSourceprint.data = [];
          this.disableaddpurchase = false;
          this.recevicedpurchase = false;
          this.Address1 = undefined;
          this.PhoneNo = undefined;
          this.GSTNo = undefined;
          this.Location = undefined;
          this.Statesuplier = undefined;
          this.DeliveryName = undefined;
          this.DAddress1 = undefined;
          this.DAddress2 = undefined;
          this.Locations = undefined;
          this.Statecountry = undefined;
          this.Supplier = undefined;
          this.Validity = undefined;
          this.Delivery = undefined;
          this.PaymentandTerms = undefined;
          this.Instructions = undefined;
          this.Quotationno = undefined;
          this.Quotationdate = undefined;
          this.POID = undefined;
          this.PONumber = undefined;
          this.date = new FormControl(new Date());
          this.serializedDate = new FormControl((new Date()).toISOString());
          this.PurchaseDate = this.date.value;
          this.DeliveryName = data.companyname;
          this.DAddress1 = data.companyaddress1;
          this.DAddress2 = data.companyaddress2;
          if (data.companylocationID != 0) {
            let LocationID = this.Locationname.find(y => y.Text == data.companylocation)
            this.Locations = LocationID.Value;
            this.Citysumbit();
          }
          else {
            this.Locations = '';
          }
          this.Form.onReset();
        }
        else if (data.Success == false) {

          if (data.Message == "Running Number Does'nt Exist") {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Number control needs to be created for PO',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });

          }
          else if (data.Message == "Financial year doesn't exists") {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Financial year doesnt exists',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }

          else if (data.Message.includes('Violation of PRIMARY KEY')) {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: `${(data.purchase)} already exists`,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
          }

          else if (data.Message == "Quotation number already exists") {
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Quotation number already exists',
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
    this.dataSourceprint.data = [];
    this.dataSource.data = [];
    this.commonService.data.purchasedetails = [];
    this.purchaseorderarray = [];
    this.purchasedetailsDelete = [];
    this.commonService.data.purchasedetailsDelete = [];
    this.disableaddpurchase = false;
    this.Presentloc = true;
    this.recevicedpurchase = false;
    this.Address1 = undefined;
    this.PhoneNo = undefined;
    this.GSTNo = undefined;
    this.Location = undefined;
    this.Statesuplier = undefined;
    this.DeliveryName = undefined;
    this.DAddress1 = undefined;
    this.DAddress2 = undefined;
    this.Locations = undefined;
    this.Statecountry = undefined;
    this.Supplier = undefined;
    this.Validity = undefined;
    this.Delivery = undefined;
    this.PaymentandTerms = undefined;
    this.Instructions = undefined;
    this.Quotationno = undefined;
    this.Quotationdate = undefined;
    this.POID = undefined
    this.PONumber = undefined;
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.date = new FormControl(new Date());
    this.serializedDate = new FormControl((new Date()).toISOString());
    this.PurchaseDate = this.date.value;
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => {
      this.Locationname = data;
      this.commonService.getListOfData('purchaseorder/Getcompantdetails/' + this.cmpid + '/').subscribe(data => {
        data.forEach((x: any) => {
          debugger;
          this.DeliveryName = x.CompanyName;
          this.DAddress1 = x.Address1;
          this.DAddress2 = x.Address2;
          if (x.LocationID != 0) {
            let LocationID = this.Locationname.find(y => y.Text == x.LocationName)
            this.Locations = LocationID.Value
          }
          else {
            this.Locations = '';
          }
          this.Citysumbit();
        });
      });

    });

  }


  CancelClk() {
    if (this.PurchaseDate != null || this.Quotationno != null || this.Quotationdate != null || this.Supplier != null || this.Address1 != null || this.Location != null || this.PhoneNo != null || this.GSTNo != null || this.DeliveryName != null || this.DAddress1 != null || this.DAddress2 != null) {

      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
  }

  purchaseprint;

  printclose(): void {

    this.backdrop = 'none';
    this.purchaseprint = 'none';

  }
  refractionSuccessclose() {

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

  modalpreview;
  dataSourcem;
  Purchaseorderhistory() {
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
      if (data.purchaseorderhist.length > 0 || data.purchaseorderhist3.length > 0 || data.purchaseorderhist4.length > 0 || data.purchaseorderhist5.length > 0 ) {
        debugger;


        data.purchaseorderhist5.forEach((z: any) => {
          data.purchaseorderhist3 = data.purchaseorderhist3.filter(function (item) {
            return item.PONumber !== z.PONumber;
          });
        });

        let arr = data.purchaseorderhist.concat(data.purchaseorderhist3, data.purchaseorderhist4);
        if (arr.length > 0) {     
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
    }
  }


  selectpurchase(item) {
    debugger;

    if (item.Status == "PARTIALLY RECEIVED") {
      this.recevicedpurchase = true;
    }
    else if (item.Status == "RECEIVED") {
      this.recevicedpurchase = true;
    }
    else if (item.Status == "Cancelled") {
      this.recevicedpurchase = true;
    }
    else {
      this.recevicedpurchase = false;
      this.POID = item.RandomUniqueID;
      this.PONumber = item.PONumber;

    }

    this.commonService.getListOfData('Common/GetDrugvalues/' + item.VendorID + '/' + this.cmpid).subscribe((data: any) => {
      this.DrugNameList = data;
      this.commonService.getListOfData('purchaseorder/Getpurchaseprint/' + item.RandomUniqueID + '/' + this.cmpid + '/' + this.Getloctime + '/' + item.Status + '/' + item.PONumber).subscribe((data: any) => {
        debugger;
        this.PurchaseDate = data.PooDate;
        this.Quotationno = data.QoNo;
        this.Quotationdate = data.QoDate;
        if (data.VendorID != 0) {
          let VendorID = this.Suppliername.find(y => y.Text == data.VName)
          this.Supplier = VendorID.Values;
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
        if (data.PDeliveryParentDescriptioncity != "") {
          let LocationID = this.Locationname.find(y => y.Text == data.PDeliveryParentDescriptioncity)
          this.Locations = LocationID.Value;
          this.Citysumbit();
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


        this.Validity = data.Validy;
        this.Delivery = data.Deliverr;
        this.PaymentandTerms = data.payments;
        this.Instructions = data.Term;
        this.purchaseorderarray = data.Potransdetails;
        this.commonService.data.purchasedetails = this.purchaseorderarray;
        this.dataSource.data = this.commonService.data.purchasedetails;
        this.dataSource._updateChangeSubscription();
        this.overallamount = this.purchaseorderarray.map((s) => +s.ItemValue).reduce((sum, c) => sum + c);
      });

    });
    this.modalSuccesspreview();
  }




  print(item) {

    debugger;

    this.commonService.getListOfData('purchaseorder/Getpurchaseprint/' + item.RandomUniqueID + '/' + this.cmpid + '/' + this.Getloctime + '/' + item.Status + '/' + item.PONumber).subscribe((data: any) => {
      debugger;
      this.Pnumber = data.PooNumber;
      this.PDate = data.PooDate;
      this.QNo = data.QoNo;
      this.QDate = data.QoDate;
      this.VNamee = data.VName;
      this.VAddresss1 = data.VAddress1 + " " + data.VAddress2 != " " ? data.VAddress1 + " " + data.VAddress2 : " ";

      if (data.VLocation != null && data.VParentDescriptioncity != null) {
        this.VLocationn = data.VLocation + " " + "/" + " " + data.VParentDescriptioncity;
      }

      if (data.VLocation == null && data.VParentDescriptioncity != null) {
        this.VLocationn = data.VParentDescriptioncity
      }

      if (data.VLocation == null && data.VParentDescriptioncity == null) {
        this.VLocationn = "";
      }

      if (data.VParentDescriptionstate == null && data.VParentDescriptioncountry == null) {
        this.Vstate = "";
      }

      if (data.VParentDescriptionstate != null && data.VParentDescriptioncountry != null) {
        this.Vstate = data.VParentDescriptionstate + " " + "/" + " " + data.VParentDescriptioncountry;
      }
      this.VPhonenoo = data.VPhoneno;
      this.VGstnoo = data.VGstno;
      this.PDeliveryy = data.PDelivery;
      this.PDeliveryaddd1 = data.PDeliveryadd1 + " " + data.PDeliveryadd2 != " " ? data.PDeliveryadd1 + " " + data.PDeliveryadd2 : " ";


      if (data.PLocation != null && data.PDeliveryParentDescriptioncity != null) {
        this.PLocationn = data.PLocation + " " + "/" + " " + data.PDeliveryParentDescriptioncity;
      }

      if (data.PLocation == null && data.PDeliveryParentDescriptioncity != null) {
        this.PLocationn = data.PDeliveryParentDescriptioncity
      }
      if (data.PDeliveryParentDescriptionstate != null && data.PDeliveryParentDescriptioncountry != null) {
        this.Pstate = data.PDeliveryParentDescriptionstate + " " + "/" + " " + data.PDeliveryParentDescriptioncountry;
      }

      if (data.PLocation == null && data.PDeliveryParentDescriptioncity == null) {
        this.PLocationn = "";
      }

      if (data.PDeliveryParentDescriptionstate == null && data.PDeliveryParentDescriptioncountry == null) {
        this.Pstate = "";
      }

      this.PGrosss = data.PGross;
      this.PDiscountt = data.PDiscount;
      this.PTotalaxx = data.PTotalax + data.GetCESSAmountt + data.GetAdditionalCESSAmountt;
      this.PTotalpoo = data.PTotalpo;
      let ptotalwords = Math.trunc(data.PTotalpo);
      this.ptotalwords = ptotalwords;
      this.CAddress = data.Addresss + "" + data.cAddress1 + "" + data.cAddress2;
      this.CPhone = data.Phonee;
      this.CWebb = data.Webb;
      this.Termc = data.Term;
      this.valid = data.Validy;
      this.deliveryy = data.Deliverr;
      this.paymen = data.payments;
      this.company = data.company;
      this.dataSourceprint.data = data.Potransdetails;
      this.overallamount =   data.Potransdetails.map((s) => +s.ItemValue).reduce((sum, c) => sum + c);
      this.modalSuccesspreview();
    });


    this.backdrop = 'block';
    this.purchaseprint = 'block';

  }















  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
