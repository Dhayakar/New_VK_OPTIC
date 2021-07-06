import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { OpticalgrnViewModel, GetOpticalGrntrnsgrn } from 'src/app/Models/ViewModels/opticalgrn-view-model';
import { DatePipe } from '@angular/common';
import { MatDialog, MatTableDataSource, MatSort, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatExpansionPanel } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { NgForm, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { SearchComponent } from '../search/search.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { number } from '@amcharts/amcharts4/core';
import { OpticalStockMaster } from '../../Models/OpticalStockMaster.model';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as _l from 'lodash';
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

@Component({
  selector: 'app-optical-grn',
  templateUrl: './optical-grn.component.html',
  styleUrls: ['./optical-grn.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class OpticalGrnComponent implements OnInit {

  docotorid;
  CompanyID;
  G_Transactiontypeid;
  StoreName;
  M_ReceiptDate;
  Country1;
  Country2;
  Country3;
  Getloctime;
  isInvalid = false;
  orginaltable = true;
  bindingtable = false;
  submitgrn = false;

  public person =
    {
      Totalpoamount: 0,
      Totalamount: 0,
      Totaldisamt: 0,
    };

  public items =
    {
      Totalpoamount: 0,
      Totalamount: 0,
      Totaldisamt: 0,
    };

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(public commonService: CommonService<OpticalgrnViewModel>, public datepipe: DatePipe, public dialog: MatDialog,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef, private router: Router, ) { }

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

  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;
  Disabled: boolean = true;
  ngOnInit() {
    debugger;
    this.commonService.data = new OpticalgrnViewModel();
    var Pathname = "Opticalslazy/OpticalGrn";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));

    var n = Pathname;
    var sstring = n.includes("/");

    let res = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.G_Transactiontypeid = res.TransactionID;

    if (this.G_Transactiontypeid == null) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: "Number control needs to be created for Optical Grn",
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

          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.Disabled = false;
          } else {
            this.Disabled = true;
          }
        });
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
        });

        this.docotorid = localStorage.getItem('userroleID');
        this.CompanyID = localStorage.getItem("CompanyID");
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.M_ReceiptDate = this.date.value;
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => { this.StoreName = data; })
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

      $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

      $(document).ready(function () {
        $("#myInputgrn").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTablegrn tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

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

          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
          if (this.accessdata.find(x => x.Print == true)) {
            this.Disabled = false;
          } else {
            this.Disabled = true;
          }
        });
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
        });
        this.docotorid = localStorage.getItem('userroleID');
        this.CompanyID = localStorage.getItem("CompanyID");
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.M_ReceiptDate = this.date.value;
        this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
          debugger;
          this.StoreName = data;
        })
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
      $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

      $(document).ready(function () {
        $("#myInputgrn").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTablegrn tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
    }

  }



  displayedColumnss: string[] = ['DrugName', 'Type', 'Brand', 'Model', 'Color', 'PurchaseUOM', 'Quantity', 'ReceivedQuantity', 'ActualQuantity', 'Rate', 'Value', 'Discount(%)', 'DiscountValue', 'Totalamount', 'Delete'];
  dataSources = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('OpticalGrn') Form: NgForm
  modalpreview;
  backdrop
  dataSourcesq;
  GetGrn() {
    debugger;
    this.commonService.getListOfData('OpticalGrn/GetGrn/' + this.CompanyID + '/' + this.Getloctime).subscribe(data => {
      if (data.GetOpticalGrn.length > 0) {
        this.dataSourcesq = _.orderBy(data.GetOpticalGrn, ['OrderDate'], ['desc']);
        this.modalpreview = 'block';
        this.backdrop = 'block';
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
    debugger;
    window.onscroll = function () { };
    this.modalpreview = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
  }
  item;
  modalpreviewgrn;
  GetGrndetails() {
    debugger;
    this.commonService.getListOfData('OpticalGrn/GetGrndetails/' + this.CompanyID + '/' + this.Getloctime).subscribe(data => {
      debugger;
      if (data.GetOpticalGrndetails.length > 0) {
        this.item = _.orderBy(data.GetOpticalGrndetails, ['GrnDate'], ['desc']);
        this.modalpreviewgrn = 'block';
        this.backdrop = 'block';
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
    window.onscroll = function () { };
    this.modalpreviewgrn = 'none';
    this.backdrop = 'none';
    const num_q = (document.getElementById('myInputgrn') as HTMLInputElement).value = '';
  }
  OpticalOrderNumber;
  M_OrderDate;
  Supplier;
  Address1;
  Address2;
  Location;
  Statess;
  Countryyy;
  PhoneNo;
  GSTNo;
  DeliveryName;
  DAddress1;
  DAddress2;
  DAddress3;
  Locations;
  State;
  Id;
  VID;
  selecttypes(item) {
    debugger;
    this.resetfrom();
    this.OpticalOrderNumber = item.OrderNumber;
    this.M_OrderDate = item.OrderDate;
    this.M_RefNumber = item.RefNo;
    this.M_RefDate = item.RefDate;
    this.Supplier = item.SupplierName;
    this.Address1 = item.SupplierAddress;
    this.Address2 = item.SupplierAddress1;
    this.GSTNo = item.GstNo;
    this.PhoneNo = item.PhoneNo;
    this.DeliveryName = item.DeliveryName;
    this.DAddress1 = item.DeliveryAddress;
    this.DAddress2 = item.DeliveryAddress1;
    this.Id = item.ID;
    this.VID = item.VendorID;
    this.orginaltable = true;
    this.bindingtable = false;
    this.submitgrn = false;
    this.commonService.getListOfData('OpticalGrn/GetGrnloc/' + item.ID + '/').subscribe(data => {
      debugger;
      this.Location = data.Supplierlocation + " " + "/" + " " + data.Suppliercity == " / " ? " " : data.Supplierlocation + " " + "/" + " " + data.Suppliercity;
      this.Statess = data.SupplierState + " " + "/" + " " + data.Suppliercountry == " / " ? " " : data.SupplierState + " " + "/" + " " + data.Suppliercountry;
      this.Locations = data.Deliverylocation + " " + "/" + " " + data.Deliverycity == " / " ? " " : data.Deliverylocation + " " + "/" + " " + data.Deliverycity;
      this.State = data.DeliveryState + " " + "/" + " " + data.Deliverycountry == " / " ? " " : data.DeliveryState + " " + "/" + " " + data.Deliverycountry;
      this.commonService.getListOfData('OpticalGrn/GetGrntrns/' + item.ID + '/').subscribe(data => {
        debugger;
        if (data.GetOpticalGrntrns != null) {
          debugger;
          this.commonService.data.GetOpticalGrntrns = data.GetOpticalGrntrns;
          this.dataSources.data = this.commonService.data.GetOpticalGrntrns;
          this.dataSources.sort = this.sort;

        }
      });
    });
    this.modalSuccesspreview();
  }

  modalpreviewgrnfull;
  Suppliergrn;
  Address1grn;
  Address2grn;
  Statessgrn;
  citygrn;
  PhoneNogrn;
  GSTNogrn;
  DeliveryNamegrn;
  DAddress1grn;
  DAddress2grn;
  Locationsgrn;
  Locationcitygrn;
  Stategrn;
  Countrygrn;
  Idgrn;
  op;
  opd;
  opr;
  oprd;
  opg;
  opgd;
  displayedColumnssgrn: string[] = ['DrugNamegrn', 'Typegrn', 'Brandgrn', 'Modelgrn', 'Colorgrn', 'PurchaseUOMgrn', 'Quantity', 'ReceivedQuantitygrn', 'PendingQty', 'Rategrn', 'Valuegrn', 'Discountgrn(%)', 'DiscountValuegrn', 'Totalamountgrn'];
  dataSourcesgrn = new MatTableDataSource();

  displayedColumnssgrnprint: string[] = ['DrugNamegrnprint', 'Typegrnprint', 'Brandgrnprint', 'Modelgrnprint', 'Colorgrnprint', 'PurchaseUOMgrnprint', 'ReceivedQuantitygrnprint', 'Rategrnprint', 'Valuegrnprint', 'Discountgrnprint(%)', 'DiscountValuegrnprint', 'Totalamountgrnprint'];
  dataSourcesgrnprint = new MatTableDataSource();

  Grnno;
  selecttypesgrn(id) {
    debugger;
    this.op = id.OrderNumber;
    this.opd = id.OrderDate;
    this.opr = id.RefNo;
    this.oprd = id.RefDate;
    this.opg = id.GrnNumber;
    this.opgd = id.GrnDate;
    this.Suppliergrn = id.SupplierName;
    this.Address1grn = id.SupplierAddress;
    this.Address2grn = id.SupplierAddress1;
    this.GSTNogrn = id.GstNo;
    this.PhoneNogrn = id.PhoneNo;
    this.DeliveryNamegrn = id.DeliveryName;
    this.DAddress1grn = id.DeliveryAddress;
    this.DAddress2grn = id.DeliveryAddress1;
    this.Idgrn = id.RandomUniqueID;
    this.Grnno = this.opg;
    this.M_ReceiptDate = this.opgd;
    this.OpticalOrderNumber = this.op;
    this.M_OrderDate = this.opd;
    this.M_RefNumber = this.opr;
    this.M_RefDate = this.oprd;
    this.Supplier = this.Suppliergrn;
    this.Address1 = this.Address1grn;
    this.Address2 = this.Address2grn;
    this.GSTNo = this.GSTNogrn;
    this.PhoneNo = this.PhoneNogrn;
    this.Location = this.citygrn;
    this.Statess = this.Statessgrn;
    this.DeliveryName = this.DeliveryNamegrn;
    this.DAddress1 = this.DAddress1grn;
    this.DAddress2 = this.DAddress2grn;
    this.Locations = this.Locationsgrn;
    this.State = this.Locationcitygrn;
    if (id.store != null) {
      let ID = this.StoreName.find(x => x.Text == id.store)
      this.storename = ID.Value
    }
    else {
      this.storename = '';
    }
    this.Instructions = id.Termcondition;
    this.orginaltable = false;
    this.bindingtable = true;
    this.submitgrn = true;

    this.commonService.getListOfData('OpticalGrn/GetGrnlocation/' + this.Idgrn + '/').subscribe(data => {
      debugger;
      this.citygrn = data.Supplierlocation + " " + "/" + " " + data.Suppliercity == " / " ? " " : data.Supplierlocation + " " + "/" + " " + data.Suppliercity;
      this.Statessgrn = data.SupplierState + " " + "/" + " " + data.Suppliercountry == " / " ? " " : data.SupplierState + " " + "/" + " " + data.Suppliercountry;
      this.Locationsgrn = data.Deliverylocation + " " + "/" + " " + data.Deliverycity == " / " ? " " : data.Deliverylocation + " " + "/" + " " + data.Deliverycity;
      this.Locationcitygrn = data.DeliveryState + " " + "/" + " " + data.Deliverycountry == " / " ? " " : data.DeliveryState + " " + "/" + " " + data.Deliverycountry;
      this.commonService.getListOfData('OpticalGrn/GetGrntrnsdetails/' + this.Idgrn + '/').subscribe(data => {
        debugger;
        if (data.GetOpticalGrntrnsstock != null) {
          debugger;
          this.commonService.data.GetOpticalGrntrnsgrn = data.GetOpticalGrntrnsstock;
          this.commonService.data.GetOpticalGrntrnsgrn[0].TotalPOValue = data.TotalPOValue;
          this.dataSourcesgrn.data = this.commonService.data.GetOpticalGrntrnsgrn;
          this.dataSourcesgrn.sort = this.sort;
        }
      });
    });
    this.modalSuccesspreviewgrn();
  }




  TotalPOValuegrn() {
    if (this.commonService.data.GetOpticalGrntrnsgrn != undefined) {
      if (this.commonService.data.GetOpticalGrntrnsgrn.length > 0) {
        var restotalcost = this.commonService.data.GetOpticalGrntrnsgrn[0].TotalPOValue;
        restotalcost = parseFloat(restotalcost.toFixed(2));
        this.items.Totalpoamount = restotalcost;
        return restotalcost;
      }

    }

  }

  GetTtlamount() {
    if (this.commonService.data.GetOpticalGrntrnsgrn != undefined) {
      if (this.commonService.data.GetOpticalGrntrnsgrn.length > 0) {
        var restotalcost = this.commonService.data.GetOpticalGrntrnsgrn.map(t => t.Itemvalue).reduce((acc, value) => acc + value, 0);
        restotalcost = parseFloat(restotalcost.toFixed(2));
        this.person.Totalamount = restotalcost;
        return restotalcost;
      }

    }

  }


  GetDisTtlamount() {
    debugger;
    if (this.commonService.data.GetOpticalGrntrnsgrn != undefined) {
      if (this.commonService.data.GetOpticalGrntrnsgrn.length > 0) {
        var restotalcost = this.commonService.data.GetOpticalGrntrnsgrn.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
        restotalcost = parseFloat(restotalcost.toFixed(2));
        this.person.Totaldisamt = restotalcost;
        return restotalcost;
      }
    }

  }

  RestrictNegativeValues(e): boolean {
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }

  qntyrestrict(i, event) {
    let arrqty = this.commonService.data.GetOpticalGrntrns;
    let qty: number = Number(event.target.value);
    for (var k = 0; k < arrqty.length; k++) {
      this.itmqty = arrqty.map(x => x.OrderedQty)
      this.Rcvdqty = arrqty.map(x => x.ReceivedQty)
    }
    let iqty = this.itmqty[i];
    let rqty = this.Rcvdqty[i];
    if (rqty != 0) {
      let cqty = iqty - rqty;
      if (qty > cqty) {
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
        event.target.value = 0;
        return;
      }
      if (qty != 0) {
        event.target.value = qty;
      }
    }
    else if (qty > iqty) {
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
      event.target.value = 0;
      return;
    }
    if (qty != 0) {
      event.target.value = qty;
    }
  }




  changeValue(id, property: string, event: any) {
    debugger;

    let result: number = Number(event.target.value);
    this.dataSources.filteredData[id][property] = result;
    this.dataSources._updateChangeSubscription();
  }

  changeValueAmount(id, element, property: string) {
    debugger;
    element.Value = element.ActualQuantity * element.Price;
  }

  changeValueDiscountAmount(id, element, property: string) {
    var resDisAmount = (element.ActualQuantity * element.Price) * element.DiscountPercentage / 100;
    resDisAmount = parseFloat(resDisAmount.toFixed(2));
    element.DiscountAmount = resDisAmount;
  }
  changeValueTotal(id, element, property: string) {
    if (element.Value != 0) {
      var resTotal = element.Value - element.DiscountAmount;
      resTotal = parseFloat(resTotal.toFixed(2));
      element.TotalCost = resTotal;
    } else {
      element.TotalCost = 0;
    }
  }



  GetTtlamt() {

    if (this.commonService.data.GetOpticalGrntrns != undefined) {
      if (this.commonService.data.GetOpticalGrntrns.length > 0) {
        var restotalcosts = this.commonService.data.GetOpticalGrntrns.map(t => t.Value).reduce((acc, value) => acc + value, 0);
        restotalcosts = parseFloat(restotalcosts.toFixed(2));
        this.person.Totalamount = restotalcosts;
        return restotalcosts;
      }
    }
  }


  GetDisTtlamt() {
    if (this.commonService.data.GetOpticalGrntrns != undefined) {
      if (this.commonService.data.GetOpticalGrntrns.length > 0) {
        var restotalcost = this.commonService.data.GetOpticalGrntrns.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
        restotalcost = parseFloat(restotalcost.toFixed(2));
        this.person.Totaldisamt = restotalcost;
        return restotalcost;
      }

    }

  }

  GetTotalAmount() {
    if (this.commonService.data.GetOpticalGrntrns != undefined) {
      if (this.commonService.data.GetOpticalGrntrns.length > 0) {
        var restotalcost = this.commonService.data.GetOpticalGrntrns.map(t => t.TotalCost).reduce((acc, value) => acc + value, 0);
        restotalcost = parseFloat(restotalcost.toFixed(2));
        this.person.Totalpoamount = restotalcost;
        return restotalcost;
      }
    }
  }



  removeopt(i) {
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
          this.dataSources.data.splice(i, 1);
          this.dataSources._updateChangeSubscription();

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
  itmqty
  Rcvdqty
  storename;
  Instructions;
  admissionprint;
  pcompanyAddress;
  pphone;
  pweb;
  pCompnayname;
  OpOrdernumber;
  OpOrderDate;
  Refnumber;
  RefDate;
  Documentnumber;
  DocumentDate;
  SupplierName;
  SupplierAddress;
  GstNo;
  pPhoneNo;
  pDeliveryName;
  DeliveryAddress;
  Supplierlocation;
  SupplierState;
  Deliverylocation;
  DeliveryState;
  TotalPOValue;
  DiscountValue;
  AmountValue;
  optransdetails;
  totalvaluewords;
  onSubmit(form: NgForm) {
    if (this.commonService.data.GetOpticalGrntrns.some(Med => Med.ActualQuantity === 0)) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter Actual Quantity',
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

    if (this.commonService.data.GetOpticalGrntrns.length < 1) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Check The Item Details',
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
      this.commonService.data.OpticalStockMaster = new OpticalStockMaster();
      this.commonService.data.OpticalStockMaster.TransactionID = this.G_Transactiontypeid;
      this.commonService.data.OpticalStockMaster.DocumentDate = this.M_ReceiptDate;
      this.commonService.data.OpticalStockMaster.OpticalOrderID = this.Id;
      this.commonService.data.OpticalStockMaster.StoreID = this.storename;
      this.commonService.data.OpticalStockMaster.VendorID = this.VID;
      this.commonService.data.OpticalStockMaster.DepartmentID = 1;
      this.commonService.data.OpticalStockMaster.TotalPOValue = this.person.Totalpoamount;
      this.commonService.data.OpticalStockMaster.TotalDiscountValue = this.person.Totaldisamt;
      this.commonService.data.OpticalStockMaster.TermsConditions = this.Instructions;
      this.commonService.data.OpticalStockMaster.CreatedBy = this.docotorid;
      console.log(this.commonService.data)
      this.commonService.postData('OpticalGrn/Insertopticalgrn/' + this.CompanyID + '/' + this.G_Transactiontypeid + '/', this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            this.commonService.getListOfData('OpticalGrn/Opticalgrnprint/' + data.RandomUniqueID + '/' + this.CompanyID + '/' + this.Getloctime).subscribe((data: any) => {
              debugger;
              this.pcompanyAddress = data.pcompanyAddress + "" + data.pcompanyAddress1 + "" + data.pcompanyAddress2;
              this.pphone = data.pphone;
              this.pweb = data.pweb;
              this.pCompnayname = data.pCompnayname;
              this.OpOrdernumber = data.pOpOrdernumber;
              this.OpOrderDate = data.pOpOrderDate;
              this.Refnumber = data.pRefnumber;
              this.RefDate = data.pRefDate;
              this.Documentnumber = data.pDocumentnumber;
              this.DocumentDate = data.pDocumentDate;
              this.SupplierName = data.pSupplierName;
              this.SupplierAddress = data.pSupplierAddress + " " + data.pSupplierAddress1;
              this.GstNo = data.pGstNo;
              this.pPhoneNo = data.pPhoneNo;
              this.pDeliveryName = data.pDeliveryName;
              this.DeliveryAddress = data.pDeliveryAddress + " " + data.pDeliveryAddress1;
              this.Supplierlocation = data.pSupplierlocation + " " + "/" + " " + data.pSuppliercity == " / " ? " " : data.pSupplierlocation + " " + "/" + " " + data.pSuppliercity;
              this.SupplierState = data.pSupplierState + " " + "/" + " " + data.pSuppliercountry == " / " ? " " : data.pSupplierState + " " + "/" + " " + data.pSuppliercountry;
              this.Deliverylocation = data.pDeliverylocation + " " + "/" + " " + data.pDeliverycity == " / " ? " " : data.pDeliverylocation + " " + "/" + " " + data.pDeliverycity;
              this.DeliveryState = data.pDeliveryState + " " + "/" + " " + data.pDeliverycountry == " / " ? " " : data.pDeliveryState + " " + "/" + " " + data.pDeliverycountry;
              let totalvaluewords = data.pTotalPOValue;
              this.totalvaluewords = Math.trunc(totalvaluewords);
              this.TotalPOValue = data.pTotalPOValue;
              this.DiscountValue = data.optransdetails.map((s) => +s.DiscountAmount).reduce((sum, c) => sum + c);
              this.AmountValue = data.optransdetails.map((s) => +s.Itemvalue).reduce((sum, c) => sum + c);
              this.dataSourcesgrnprint.data = data.optransdetails;

            });

            this.admissionprint = 'block';
            this.backdrop = 'block';

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
            this.resetfrom();
            this.dataSources.data = [];
            this.commonService.data.GetOpticalGrntrns = [];
            this.orginaltable = true;
            this.bindingtable = false;
            this.submitgrn = false;
          }
          else if (data.Success == false) {
            if (data.Message == "Running Number Does'nt Exist") {
              Swal.fire({
                type: 'warning',
                title: 'warning',
                text: 'Number control needs to be created for Optical Grn',
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
                text: `${(data.grn)} already exists`,
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
        });
    }
  }
  cancelblock;
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClosessss() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  modalSuccesssOk() {
    this.Form.onReset();
    this.resetfrom();
    this.dataSources.data = [];
    this.commonService.data.GetOpticalGrntrns = [];
    this.orginaltable = true;
    this.bindingtable = false;
    this.submitgrn = false;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  M_RefNumber;
  M_RefDate;
  CancelClk() {
    if (this.OpticalOrderNumber != null || this.M_OrderDate != null || this.M_RefNumber != null || this.M_RefDate != null || this.storename != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
  }

  resetfrom() {
    this.OpticalOrderNumber = "";
    this.M_OrderDate = "";
    this.M_RefNumber = "";
    this.M_RefDate = "";
    this.Supplier = "";
    this.Address1 = "";
    this.Address2 = "";
    this.GSTNo = "";
    this.PhoneNo = "";
    this.Location = "";
    this.Statess = "";
    this.DeliveryName = "";
    this.DAddress1 = "";
    this.DAddress2 = "";
    this.Locations = "";
    this.State = "";
    this.Grnno = "";
    this.storename = "";
    this.Instructions = "";
    this.M_ReceiptDate = new Date();
  }

  printclose(): void {
    this.backdrop = 'none';
    this.admissionprint = 'none';
  }

  printTest() {
    let printContents, popupWin;
    printContents = document.getElementById('Printtt').innerHTML;
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
    this.admissionprint = 'none';
  }

  admissionprintt
  printclosee(): void {
    this.backdrop = 'none';
    this.admissionprintt = 'none';
  }

  printTestt() {
    let printContents, popupWin;
    printContents = document.getElementById('Printtt').innerHTML;
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
    this.admissionprintt = 'none';
  }

  selecttypesgrnprint(id) {
    debugger;
    this.commonService.getListOfData('OpticalGrn/Opticalgrnprint/' + id.RandomUniqueID + '/' + this.CompanyID + '/' + this.Getloctime).subscribe((data: any) => {
      debugger;
      this.pcompanyAddress = data.pcompanyAddress + "" + data.pcompanyAddress1 + "" + data.pcompanyAddress2;
      this.pphone = data.pphone;
      this.pweb = data.pweb;
      this.pCompnayname = data.pCompnayname;
      this.OpOrdernumber = data.pOpOrdernumber;
      this.OpOrderDate = data.pOpOrderDate;
      this.Refnumber = data.pRefnumber;
      this.RefDate = data.pRefDate;
      this.Documentnumber = data.pDocumentnumber;
      this.DocumentDate = data.pDocumentDate;
      this.SupplierName = data.pSupplierName;
      this.SupplierAddress = data.pSupplierAddress + " " + data.pSupplierAddress1;
      this.GstNo = data.pGstNo;
      this.pPhoneNo = data.pPhoneNo;
      this.pDeliveryName = data.pDeliveryName;
      this.DeliveryAddress = data.pDeliveryAddress + " " + data.pDeliveryAddress1;
      this.Supplierlocation = data.pSupplierlocation + " " + "/" + " " + data.pSuppliercity == " / " ? " " : data.pSupplierlocation + " " + "/" + " " + data.pSuppliercity;
      this.SupplierState = data.pSupplierState + " " + "/" + " " + data.pSuppliercountry == " / " ? " " : data.pSupplierState + " " + "/" + " " + data.pSuppliercountry;
      this.Deliverylocation = data.pDeliverylocation + " " + "/" + " " + data.pDeliverycity == " / " ? " " : data.pDeliverylocation + " " + "/" + " " + data.pDeliverycity;
      this.DeliveryState = data.pDeliveryState + " " + "/" + " " + data.pDeliverycountry == " / " ? " " : data.pDeliveryState + " " + "/" + " " + data.pDeliverycountry;
      let totalvaluewords = Math.trunc(data.pTotalPOValue);
      this.totalvaluewords = Math.trunc(totalvaluewords);
      this.DiscountValue = data.optransdetails.map((s) => +s.DiscountAmount).reduce((sum, c) => sum + c);
      this.AmountValue = data.optransdetails.map((s) => +s.Itemvalue).reduce((sum, c) => sum + c);
      this.TotalPOValue = data.pTotalPOValue;
      this.dataSourcesgrnprint.data = data.optransdetails;

    });
    this.modalSuccesspreviewgrn();
    this.admissionprint = 'block';
    this.backdrop = 'block';
  }




  accesspopup;

  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/OpticalGrn";
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





















  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
