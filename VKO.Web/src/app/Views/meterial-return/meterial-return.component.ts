
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTable, MatDialog } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl, FormArray, NgForm } from '@angular/forms';
import { CommonService } from 'src/app/shared/common.service';
import { AppComponent } from 'src/app/app.component';
import { DatePipe } from '@angular/common';
import { Vmmeterial, Meterials4, PushArray, Meterials5 } from 'src/app/Models/ViewModels/vmmeterial';
import { Dmmeterial } from 'src/app/Models/dmmeterial';
import Swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
import { StockmasterModel } from 'src/app/Models/StockmasterModel';
import { StockTranModel } from 'src/app/Models/StockTranModel';
import { ItemBatchModel } from 'src/app/Models/ItemBatchModel';
import { ItemBatchTranModel } from 'src/app/Models/ItemBatchTranModel';
import { element } from 'protractor';
import { pushAll } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Local } from 'protractor/built/driverProviders';
import { SearchComponent } from '../search/search.component';


declare var $: any;

//dateformate
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
  selector: 'app-meterial-return',



  templateUrl: './meterial-return.component.html',
  styleUrls: ['./meterial-return.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],


})
export class MeterialReturnComponent implements OnInit {

  constructor(public commonService: CommonService<Vmmeterial>, public datepipe: DatePipe, public dialog: MatDialog,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef) { }
  date = new FormControl(new Date());


  //NgModelNames
  M_IssueNo;
  IssueDate;
  M_ReciptNo;
  M_RDate;
  M_VName;
  M_Adress1;
  M_Adress2;
  M_Location;
  M_GST;
  M_Mobile;
  M_Remarks;
  M_VendorID
  backdrop;
  DrugNameList;
  BatchList;
  DrugList;
  hide: boolean = false;
  disableaddpurchase: boolean = false;
  DBatch: boolean = false;
  DDrug: boolean = false;
  M_StoreID;
  M_POID;
  R_Brand;
  R_BatchNumber;
  R_TotallQty;
  R_ConsumedQty;
  R_BalanceQty;
  R_ExDate;
  R_IssuedQty;
  docotorid;
  CMMPID;
  Country1;
  Country2;
  Country3;
  TransactionId;
  ngOnInit() {

    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
      debugger;
      this.Country1 = data;
      this.Country2 = this.Country1[0].Text;
      this.Country3 = this.Country1[0].Value;
    });
    this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        debugger;
        this.TransactionId = data.transactionid;

      });




    this.CMMPID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userDoctorID');

  }
  @ViewChild('MaterialReturnForm') Form: NgForm


  //Table Heder Declarations
  displayedColumns: string[] = ['DrugName', 'UOM', 'BatchNo', 'GenericName', 'RecivedQty', 'ConsumedQty', 'BalanceQtyy', 'QtyIssued', 'Rate', 'GrossProductValue', 'GSTTaxValue', 'SGSTTaxValue', 'CGSTTaxValue', 'IGSTTaxValue', 'TotalAmount', 'Delete'];
  dataSource = new MatTableDataSource();

  displayedColumnsList: string[] = ['ReciptNo', 'VendorName', 'StoreName', 'StoreID',];
  dataSourceList = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChildren(MatTable) _matTables

  ////////////////PopUp
  modalmed;
  SearchClick() {
    this.modalmed = 'block';
    this.backdrop = 'block';
  }

  Popupclose() {
    debugger;
    this.modalmed = 'none';
    this.backdrop = 'none';
  }

  ///search
  applyFilter(filterValue: string) {
    this.dataSourceList.filter = filterValue.trim().toLowerCase();
    this.DrugNameList.filter = filterValue.trim().toLowerCase();
  }

  //Select Icon
  selecttype() {
    debugger;
    this.IssueDate = null;
    this.M_IssueNo = null;
    this.M_ReciptNo = null;
    this.M_RDate = null;
    this.M_VName = null;
    this.M_Adress1 = null;
    this.M_Adress2 = null;
    this.M_Location = null;
    this.M_GST = null;
    this.M_Mobile = null;
    this.M_VendorID = null;
    this.VendorId = null;
    this.M_Remarks = null;
    this.TOTCGSTTAX = null;
    this.TOTGSTTAX = null;
    this.TOTIGSTTAX = null;
    this.TOTSGSTTAX = null;
    this.TOTAMNT = null;
    this.GT = null;
    localStorage.setItem('helpname', 'MaterialReturn');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;

        this.commonService.data = new Vmmeterial();
        this.commonService.getListOfData('Meterialreturn/VendorSearch/' + item.ReciptNumber + '/')
          .subscribe((data: any) => {
            debugger;
            data.Meterials2.forEach((x: any) => {
              debugger;

              if (data.Meterials2.some(Med => Med.IsActive == false)) {
                Swal.fire({
                  type: 'warning',
                  title: 'This Vendor No longer Exists..!',
                })

              }

              else {
                this.M_StoreID = item.StoreID;
                this.M_POID = item.PoID;
                this.IssueDate = this.date.value;
                this.M_ReciptNo = x.ReciptNo;
                this.M_RDate = x.RecipDate;
                this.M_VName = x.VendorN;
                this.M_Adress1 = x.Adress1;
                this.M_Adress2 = x.Adress2;
                this.M_Location = x.Location;
                this.M_GST = x.GSTNO;
                this.M_Mobile = x.MobileNo;
                this.M_VendorID = x.VendorId;
                this.VendorId = this.M_VendorID
                debugger;
                this.commonService.getListOfData('Common/GetDrug/' + this.M_ReciptNo + '/' + this.M_StoreID + '/' + this.CMMPID + '/').subscribe((data: any) => {
                  debugger;
                  this.DrugList = data;
                  this.disableaddpurchase = true;
                  this.DDrug = true;
                });
              }

            });
          });


      }
      if (!result.success) {


      }
    });
  }

  //Bind TextBoxes
  VendorId;
  GRN;
  storeid;
  Select(item, event) {
    debugger;
    this.modalmed = 'block';
    this.backdrop = 'block';
    this.commonService.data = new Vmmeterial();
    this.commonService.getListOfData('Meterialreturn/VendorSearch/' + item.ReciptNumber + '/').subscribe((data: any) => {
      debugger;
      data.Meterials2.forEach((x: any) => {
        debugger;
        if (data.Meterials2.some(Med => Med.IsActive == false)) {
          Swal.fire({
            type: 'warning',
            title: 'This Vendor No longer Exists..!',
          })
        }
        else {
          this.M_StoreID = item.StoreID;
          this.M_POID = item.PoID;
          this.IssueDate = this.date.value;
          this.M_ReciptNo = x.ReciptNo;
          this.M_RDate = x.RecipDate;
          this.M_VName = x.VendorN;
          this.M_Adress1 = x.Adress1;
          this.M_Adress2 = x.Adress2;
          this.M_Location = x.Location;
          this.M_GST = x.GSTNO;
          this.M_Mobile = x.MobileNo;
          this.M_VendorID = x.VendorId;
          this.VendorId = this.M_VendorID
          debugger;
          this.commonService.getListOfData('Common/GetDrug/' + this.M_ReciptNo + '/' + this.M_StoreID + '/' + this.CMMPID + '/').subscribe((data: any) => {
            debugger;
            this.DrugList = data;
            this.disableaddpurchase = true;
            this.DDrug = true;
          });
        }

      });
    });
    this.Popupclose();
  }


  ///UOM AND GENERIC
  Drugs;
  GetRelated(event, id, element) {
    debugger;
    let DRG = event.option.viewValue;
    this.Drugs = DRG;
    this.commonService.getListOfData('Meterialreturn/UOMSearch/' + this.M_ReciptNo + '/' + this.Drugs + '/')
      .subscribe(data => {
        debugger
        this.dataSource.data.splice(id, 1);
        this.commonService.data.Meterials4 = data.Meterials4;
        this.dataSource.data = this.commonService.data.Meterials4;


        if (data.Meterials4 == 0) {
          Swal.fire({
            type: 'warning',
            title: 'Out of Stock..!',
          })
          this.M_ReciptNo = null;
          this.M_RDate = null;
          this.M_IssueNo = null;
          this.IssueDate = null;
          this.M_VName = null;
          this.M_VendorID = null;
          this.M_Adress1 = null;
          this.M_Adress2 = null;
          this.M_Location = null;
          this.M_GST = null;
          this.M_Mobile = null;
        }

        if (data.Meterials4.length > 0) {
          debugger;
          var MedPres = new PushArray();
          MedPres.DrugName1 = this.commonService.data.Meterials4[0].DrugName1;
          MedPres.UOM = this.commonService.data.Meterials4[0].UOM;
          MedPres.GenericName = this.commonService.data.Meterials4[0].GenericName;
          this.Return.push(MedPres);
          this.commonService.data.PushArray = this.Return;
          this.dataSource.data = this.commonService.data.PushArray;
          this.Batchvalue(event, id, element);
          this.DBatch = true;
        }
        this.commonService.data.Meterials4 = [];
        this.disableaddpurchase = false;
      });
  }


  ////Get Batch Number
  v;
  DName;
  BatchArray = [];

  SubBatch;
  Batchvalue(event, id, element) {
    debugger;
    var name = element.DrugName1;
    this.DName = name;
    this.v = id;
    this.commonService.getListOfData('Meterialreturn/GetBatch/' + this.M_ReciptNo + '/' + this.Drugs + '/' + this.M_StoreID + '/').subscribe((data: any) => {
      debugger;
      this.BatchList = data.BatchNumbers;

      this.SubBatch = data.BatchNumbers;

      let dm = data.BatchNumbers;
      var H = this.commonService.data.PushArray;
      var b = dm.filter((c) => H.every((balanceCode) => balanceCode.BatchList1 !== c.itemvalue));
      this.BatchList = b;
      this.BatchArray = this.BatchList;

      if (element.DrugName1 == null) {
        this.disableaddpurchase = false;
      }


    });
    this.disableaddpurchase = false

  }

  ///GetQuantity
  BatchNo;
  GetQty(event, id, element, i) {
    debugger;

    let IBno = event.option.viewValue;
    this.BatchNo = IBno;
    this.commonService.getListOfData('Meterialreturn/DrugQtySearch/' + this.Drugs + '/' + this.M_ReciptNo + '/' + this.BatchNo + '/' + '/' + this.M_StoreID)
      .subscribe(data => {
        debugger;

        if (data.Meterials5.some(Med => Med.BalanceQty1 == 0) && data.Meterials5.some(Med => Med.BalanceQty2 == 0)) {
          Swal.fire({
            type: 'warning',
            title: 'Out of Stock..!',
          })


        }


        else if (data.Meterials5.some(Med => Med.BalanceQty2 > 0) && data.Meterials5.length > 0) {
          debugger;
          this.dataSource.data.splice(id, 1);
          this.commonService.data.Meterials5 = data.Meterials5;
          this.dataSource.data = this.commonService.data.Meterials5;

          debugger;
          var MedPres = new PushArray();
          MedPres.DrugName1 = this.commonService.data.Meterials5[0].DrugName1;
          MedPres.RecivedQty1 = this.commonService.data.Meterials5[0].RecivedQty1;
          MedPres.ConsumedQty1 = this.commonService.data.Meterials5[0].ConsumedQty1;
          MedPres.ConsumedQty2 = this.commonService.data.Meterials5[0].ConsumedQty2;
          MedPres.BalanceQty2 = this.commonService.data.Meterials5[0].BalanceQty2;
          MedPres.BalanceQty1 = this.commonService.data.Meterials5[0].BalanceQty1;
          MedPres.BatchList1 = this.commonService.data.Meterials5[0].BatchList1;
          MedPres.QtyIssued = this.commonService.data.Meterials5[0].QtyIssued;
          MedPres.Expired = this.commonService.data.Meterials5[0].Expired;
          MedPres.Rate = this.commonService.data.Meterials5[0].Rate;
          MedPres.GrossproductValue = this.commonService.data.Meterials5[0].GrossproductValue;
          MedPres.TotalDiscountValue = this.commonService.data.Meterials5[0].TotalDiscountValue;
          MedPres.TotalPOValue = this.commonService.data.Meterials5[0].TotalPOValue;
          MedPres.TotalSGSTTaxValue = this.commonService.data.Meterials5[0].TotalSGSTTaxValue;
          MedPres.TotalIGSTTaxValue = this.commonService.data.Meterials5[0].TotalIGSTTaxValue;
          MedPres.TotalCGSTTaxValue = this.commonService.data.Meterials5[0].TotalCGSTTaxValue;
          MedPres.TotalTaxValue = this.commonService.data.Meterials5[0].TotalTaxValue;
          MedPres.SGSTPercentage = this.commonService.data.Meterials5[0].SGSTPercentage;
          MedPres.CGSTPercentage = this.commonService.data.Meterials5[0].CGSTPercentage;
          MedPres.UOM = this.commonService.data.Meterials5[0].UOM;
          MedPres.IGSTPercentage = this.commonService.data.Meterials5[0].IGSTPercentage;
          MedPres.GenericName = this.commonService.data.Meterials5[0].GenericName;
          MedPres.ItemBatchID = this.commonService.data.Meterials5[0].ItemBatchID;
          MedPres.GSTTaxValue = this.commonService.data.Meterials5[0].GSTTaxValue;
          MedPres.CGSTTaxValue = this.commonService.data.Meterials5[0].CGSTTaxValue;
          MedPres.SGSTTaxValue = this.commonService.data.Meterials5[0].SGSTTaxValue;
          MedPres.GSTPercentage = this.commonService.data.Meterials5[0].GSTPercentage;
          MedPres.IGSTTaxValue = this.commonService.data.Meterials5[0].IGSTTaxValue;
          MedPres.DiscountPercentage = this.commonService.data.Meterials5[0].DiscountPercentage;
          MedPres.DescountAmopunt = this.commonService.data.Meterials5[0].DescountAmopunt;
          this.Return.push(MedPres);
          this.commonService.data.PushArray = this.Return;
          this.dataSource.data = this.commonService.data.PushArray;
          this.DBatch = false;
          this.DDrug = false;
          let dm = this.SubBatch;
          var H = this.commonService.data.PushArray;
          var b = dm.filter((c) => H.every((balanceCode) => balanceCode.BatchList1 !== c.itemvalue));
          this.BatchList = b;
          this.BatchArray = this.BatchList;

          if (this.BatchArray.length == 0) {
            let dm = this.DrugList;
            var H = this.commonService.data.PushArray;
            var b = dm.filter((c) => H.every((balanceCode) => balanceCode.DrugName1 !== c.Drugname));
            this.DrugList = b;
          }
          this.dataSource._updateChangeSubscription();

        }


        else {
          Swal.fire({
            type: 'warning',
            title: 'This Drug is Locked..!',
          })

          this.disableaddpurchase = true
          element.RecivedQty1 = null
          element.BalanceQty1 = null;
          element.ConsumedQty1 = null;
          element.Rate = null;
          element.GrossproductValue = null;
          element.GSTTaxValue = null;
          element.SGSTTaxValue = null;
          element.CGSTTaxValue = null;
          element.IGSTTaxValue = null;
          element.DescountAmopunt = null;
          element.TotalTaxValue = null;
          element.TOTCGSTTAX = null;
          element.TOTGSTTAX = null;
          element.TOTIGSTTAX = null;
          element.TOTSGSTTAX = null;
          element.TOTAMNT = null;
          element.QtyIssued = null;
        }
        debugger;
        if (element.QtyIssued == null || element.QtyIssued == 0) {
          this.disableaddpurchase = false
        }
        else {
          this.disableaddpurchase = true
        }
        this.commonService.data.Meterials5 = [];
      });
  }

  //Change0
  changequantity(id, property: string, event: any) {
    debugger;
    let result: number = Number(event.target.textContent);
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();

  }

  ///Number Only
  numberOnly(event): boolean {
    var charCode = event.charCode || event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    else { return true; }
  }

  ///Delete Row
  removepurchase(i, element) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Remove The Row",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'No',
      cancelButtonText: 'Yes'
    }).then((result) => {
      debugger;
      if (result.value) {
        Swal.fire(
          'Cancelled',
          'Material Return has not been Removed'
        )
      }

      else if (this.commonService.data.PushArray.length < 2) {
        if (i !== -1) {
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();

          Swal.fire(
            'Removed!',
            'Removed Successfully.',
            'success'
          )
        }
        debugger;

        this.IssueDate = null;
        this.M_IssueNo = null;
        this.M_ReciptNo = null;
        this.M_RDate = null;
        this.M_VName = null;
        this.M_Adress1 = null;
        this.M_Adress2 = null;
        this.M_Location = null;
        this.M_GST = null;
        this.M_Mobile = null;
        this.M_VendorID = null;
        this.VendorId = null;
        this.M_Remarks = null;
        this.TOTCGSTTAX = null;
        this.TOTGSTTAX = null;
        this.TOTIGSTTAX = null;
        this.TOTSGSTTAX = null;
        this.TOTAMNT = null;
        this.GT = null;
      }

      else {
        if (i !== -1) {
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
          Swal.fire(
            'Removed!',
            'Removed Successfully.',
            'success'
          )
          debugger;
          this.getTotalGrossAmount();
          this.getTotalGSTTAXValue();
          this.getTotalSGSTTAXValue();
          this.getTotalCGSTTAXValue();
          this.getTotalIGSTTAXValue();
          this.getTotalIDESC();
          this.getTotalAMNT();
        }
        this.disableaddpurchase = true;
      }

    })
  }

  ///Restrict Digit
  changeValue(id, event: any, element) {
    debugger;
    let result: number = Number(event.target.textContent);
    if (result > (9999)) {

      event.target.textContent = '';

      return false;
    }
    else {
    }
    if (event.target.textContent == 0 || event.target.textContent == '.') {
      event.target.textContent = '';
    }
    if (event.target.textContent > 0 && element.BalanceQty1 != null) {
      this.disableaddpurchase = true
    }
    else if (event.target.textContent == 0 || event.target.textContent == null) {
      this.disableaddpurchase = false
    }
  }


  //Restric Grater
  results;
  BALQTY;
  M_bal;
  TotalArray;
  Restrict(event, element, id) {
    debugger;


    if (this.commonService.data.PushArray.some(Med => Med.DrugName1 == "")) {
      Swal.fire({
        type: 'warning',
        title: 'Please Select DrugName..!',
      })
      event.target.textContent = '';
    }

    else if (this.commonService.data.PushArray.some(Med => Med.DrugName1 != "") && this.commonService.data.PushArray.some(Med => Med.BatchList1 == null)) {
      Swal.fire({
        type: 'warning',
        title: 'Please Select Batch Number..!',
      })
      event.target.textContent = '';
    }

    else if (event.target.textContent > element.BalanceQty2) {
      Swal.fire({
        type: 'warning',
        title: 'Please give less than of balance quantity',
      })
      event.target.textContent = '';

      this.M_bal = element.BalanceQty1;
    }
    else if (this.DrugList.length == 0 && this.BatchArray.length == 0) {

      this.disableaddpurchase = false;
    }
    debugger;
    let result: number = Number(event.target.textContent);
    this.results = result;
    let last = event.target.textContent;
    this.BALQTY = last;
  }


  //Clear
  clear() {
    debugger;
    this.M_Remarks = null;
    if (this.M_ReciptNo != null) {

      Swal.fire({

        title: 'Are you sure?',
        text: "Want to Cancel",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'No',
        cancelButtonText: 'Yes'


      }).then((result) => {
        debugger;
        if (result.value) {
          Swal.fire(
            'Cancelled',
            'Your Record has not been Cancelled'
          )

        }
        else {
          debugger;
          this.Form.onReset();
          this.IssueDate = null;
          this.M_IssueNo = null;
          this.M_ReciptNo = null;
          this.M_RDate = null;
          this.M_VName = null;
          this.M_Adress1 = null;
          this.M_Adress2 = null;
          this.M_Location = null;
          this.M_GST = null;
          this.M_Mobile = null;
          this.M_VendorID = null;
          this.VendorId = null;
          this.M_Remarks = null;
          this.TOTCGSTTAX = null;
          this.TOTGSTTAX = null;
          this.TOTIGSTTAX = null;
          this.TOTSGSTTAX = null;
          this.TOTAMNT = null;
          this.GT = null;
          this.disableaddpurchase = false;

          //if (i !== -1000) {
          //  this.dataSource.data.splice(i, 1000);
          //  this.dataSource._updateChangeSubscription();
          //}
          Swal.fire({
            type: 'success',
            title: 'Cancelled successfully',
            timer: 2000
          })
        }

      })
    }
  }

  CheckToDate() {

  }


  ////Calculate Gross & ToTal Gross
  changeValueGrossAmount(id, element, property: string) {
    var Gross = element.Rate * element.QtyIssued;
    element.GrossproductValue = Gross;
    this.getTotalGrossAmount();
  }
  GT;
  getTotalGrossAmount() {
    debugger;
    var restotalcost = this.commonService.data.PushArray.map(t => t.GrossproductValue).reduce((acc, value) => acc + value, 0);
    this.GT = restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }


  ////////Calculate GSTTAX & ToTal GSTTAX
  changeValueGSTTAX(id, element, property: string) {
    var GSTTAx = element.GrossproductValue * element.GSTPercentage / 100;
    element.GSTTaxValue = GSTTAx;
    this.getTotalGSTTAXValue();
  }
  TOTGSTTAX;
  getTotalGSTTAXValue() {
    debugger;
    var restotalcost = this.commonService.data.PushArray.map(t => t.GSTTaxValue).reduce((acc, value) => acc + value, 0);
    this.TOTGSTTAX = restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }


  ///////Calculate SGSTTAX & Total SGSTTAX
  changeValueSGSTTAX(id, element, property: string) {
    var SGSTTAx = element.GrossproductValue * element.SGSTPercentage / 100;
    element.SGSTTaxValue = SGSTTAx;
    this.getTotalSGSTTAXValue();
  }
  TOTSGSTTAX;
  getTotalSGSTTAXValue() {
    debugger;
    var restotalcost = this.commonService.data.PushArray.map(t => t.SGSTTaxValue).reduce((acc, value) => acc + value, 0);
    this.TOTSGSTTAX = restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }


  ////////Calculate CGSTTAX & Total CGSTTAX
  changeValueCGSTTAX(id, element, property: string) {
    var CGSTTAx = element.GrossproductValue * element.CGSTPercentage / 100;
    element.CGSTTaxValue = CGSTTAx;
    this.getTotalCGSTTAXValue();
  }
  TOTCGSTTAX;
  getTotalCGSTTAXValue() {
    debugger;
    var restotalcost = this.commonService.data.PushArray.map(t => t.CGSTTaxValue).reduce((acc, value) => acc + value, 0);
    this.TOTCGSTTAX = restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }


  ////////Calculate IGSTTAX & Total IGSTTAX
  changeValueIGSTTAX(id, element, property: string) {
    var IGSTTAx = element.GrossproductValue * element.IGSTPercentage / 100;
    element.IGSTTaxValue = IGSTTAx;
    this.getTotalIGSTTAXValue();
  }
  TOTIGSTTAX;
  getTotalIGSTTAXValue() {
    debugger;
    var restotalcost = this.commonService.data.PushArray.map(t => t.IGSTTaxValue).reduce((acc, value) => acc + value, 0);
    this.TOTIGSTTAX = restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }


  //////////////////////Calculate DISCOUNT
  changeValueDISC(id, element, property: string) {
    var DESCAMT = element.GrossproductValue * element.DiscountPercentage / 100;
    element.DescountAmopunt = DESCAMT;
    this.getTotalIDESC();
  }
  TOTDESC;
  getTotalIDESC() {
    debugger;
    var restotalcost = this.commonService.data.PushArray.map(t => t.DescountAmopunt).reduce((acc, value) => acc + value, 0);
    this.TOTDESC = restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }


  ///////////////Calculate TotalAmount
  changeValueTotalAmount(id, element, property: string) {
    var AMNT = element.GrossproductValue - element.DiscountPercentage / 100 + element.GSTTaxValue + element.IGSTTaxValue;
    element.TotalTaxValue = AMNT;
    this.getTotalAMNT();
  }
  TOTAMNT;
  getTotalAMNT() {
    debugger;
    var restotalcost = this.commonService.data.PushArray.map(t => t.TotalTaxValue).reduce((acc, value) => acc + value, 0);
    this.TOTAMNT = restotalcost = parseFloat(restotalcost.toFixed(2));
    return restotalcost;
  }

  //Submit
  OnSubmit(form: NgForm) {
    debugger;
    if (this.M_ReciptNo == null) {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please Select GRN and Continue...!',
        timer: 2000
      });
    }
    else if (this.commonService.data.PushArray.length == 0) {
      Swal.fire({
        type: 'warning',
        title: 'Please Select Drug Name...!',
      })
    }

    else if (this.commonService.data.PushArray.some(Med => Med.DrugName1 == "")) {
      Swal.fire({
        type: 'warning',
        title: 'Please Select Drug Name...!',
      })
    }


    else if (this.commonService.data.PushArray.some(Med => Med.BatchList1 == null)) {
      Swal.fire({
        type: 'warning',
        title: 'Please Select Batch Number..!',
      })
      return
    }



    else if (this.commonService.data.PushArray.some(Med => Med.QtyIssued == 0)) {
      Swal.fire({
        type: 'warning',
        title: 'Please Enter Issued Quantity..!',
      })
      return

    }
    else if (form.valid) {
      debugger;
      this.commonService.data.StockmasterModel = new StockmasterModel();
      this.commonService.data.StockmasterModel.DocumentNumber = this.M_ReciptNo;
      this.commonService.data.StockmasterModel.DocumentDate = this.IssueDate;
      this.commonService.data.StockmasterModel.POID = this.M_POID;
      this.commonService.data.StockmasterModel.StoreID = this.M_StoreID;
      this.commonService.data.StockmasterModel.VendorID = this.M_VendorID;
      this.commonService.data.StockmasterModel.CreatedUTC = this.IssueDate;
      this.commonService.data.StockmasterModel.GrossProductValue = this.GT;
      this.commonService.data.StockmasterModel.TotalDiscountValue = this.TOTDESC;
      this.commonService.data.StockmasterModel.TotalCGSTTaxValue = this.TOTCGSTTAX;
      this.commonService.data.StockmasterModel.TotalSGSTTaxValue = this.TOTSGSTTAX;
      this.commonService.data.StockmasterModel.TotalTaxValue = this.TOTAMNT;
      this.commonService.data.StockmasterModel.TotalIGSTTaxValue = this.TOTIGSTTAX;
      this.commonService.data.StockmasterModel.GRN = this.M_ReciptNo;
      this.commonService.data.StockmasterModel.QtnNumber = null;
      this.commonService.data.StockmasterModel.QtnDate = null;
      this.commonService.data.StockmasterModel.IsCancelled = false;
      this.commonService.data.StockmasterModel.TermsConditions = null;
      this.commonService.data.StockmasterModel.IsDeleted = false;
      this.commonService.data.StockmasterModel.UpdatedUTC = null;
      this.commonService.data.StockmasterModel.DCDate = null;
      this.commonService.data.StockmasterModel.DCNumber = null;
      this.commonService.data.StockmasterModel.TransactionID = this.TransactionId;
      this.commonService.data.StockmasterModel.CMPID = parseInt(localStorage.getItem("CompanyID"));

      this.commonService.data.StockTranModel = new StockTranModel();
      this.commonService.data.StockTranModel.CreatedBy = parseInt(this.docotorid);
      this.commonService.data.StockTranModel.UpdatedUTC = null;
      this.commonService.data.StockTranModel.UpdatedBy = null;
      this.commonService.data.StockTranModel.IsDeleted = false;

      this.commonService.data.ItemBatchModel = new ItemBatchModel();
      this.commonService.data.ItemBatchModel.StoreID = this.M_StoreID;
      this.commonService.data.ItemBatchModel.CreatedBy = parseInt(this.docotorid);

      this.commonService.data.ItemBatchTranModel = new ItemBatchTranModel
      this.commonService.data.ItemBatchModel.CreatedBy = parseInt(this.docotorid);
      this.commonService.data.ItemBatchModel.UpdatedBy = null;
      this.commonService.data.ItemBatchModel.UpdatedUTC = null;

      console.log(this.commonService.data)
      this.commonService.postData('Meterialreturn/InsertQty/', this.commonService.data).subscribe(data => {
        debugger;
        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Saved Successfully',
            showConfirmButton: false,
            timer: 2000

          });
        }
        else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Some Data Missing',
            showConfirmButton: false,
            timer: 2000
          });
        }
        this.Form.onReset();
       // this.Remov(i);
      });

    }
  }

  Return = [];

  AddReturn() {
    debugger;
    this.DDrug = true;
    var MedPres = new PushArray();
    MedPres.DrugName1 = "";
    MedPres.RecivedQty1 = 0;
    MedPres.ConsumedQty1 = 0;
    MedPres.ConsumedQty2 = 0;
    MedPres.BalanceQty2 = 0;
    MedPres.BalanceQty1 = 0;
    MedPres.BatchList1 = "";
    MedPres.QtyIssued = 0;
    MedPres.Expired;
    MedPres.Rate = 0;
    MedPres.GrossproductValue = 0;
    MedPres.TotalDiscountValue = 0;
    MedPres.TotalPOValue = 0;
    MedPres.TotalSGSTTaxValue = 0;
    MedPres.TotalIGSTTaxValue = 0;
    MedPres.TotalCGSTTaxValue = 0;
    MedPres.TotalTaxValue = 0;
    MedPres.SGSTPercentage = 0;
    MedPres.CGSTPercentage = 0;
    MedPres.UOM = "";
    MedPres.IGSTPercentage = 0;
    MedPres.GenericName = "";
    MedPres.ItemBatchID = 0;
    MedPres.GSTTaxValue = 0;
    MedPres.CGSTTaxValue = 0;
    MedPres.SGSTTaxValue = 0;
    MedPres.GSTPercentage = 0;
    MedPres.IGSTTaxValue = 0;
    MedPres.DiscountPercentage = 0;
    MedPres.DescountAmopunt = 0;
    this.Return.push(MedPres);
    this.commonService.data.PushArray = this.Return;
    this.dataSource.data = this.commonService.data.PushArray;
    this.dataSource._updateChangeSubscription();
    this.disableaddpurchase = false;
    this.DBatch = false;
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////
}



