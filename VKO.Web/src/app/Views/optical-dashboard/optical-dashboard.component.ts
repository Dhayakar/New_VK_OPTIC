import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { OpticalDashboardViewModel } from '../../Models/ViewModels/OpticalDashboardViewModel';
import { CommonService } from '../../shared/common.service';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'app-optical-dashboard',
  templateUrl: './optical-dashboard.component.html',
  styleUrls: ['./optical-dashboard.component.less']
})
export class OpticalDashboardComponent implements OnInit {

  constructor(public commonService: CommonService<OpticalDashboardViewModel>, public datepipe: DatePipe) { }
  MFromDate;
  MToDate;
  Country;
  maxDatef = new Date();
  Tc;

  displayedColumns = ['Type', 'SalesNos', 'SaleAmount', 'Collections'];
  dataSource = new MatTableDataSource();

  TypeAndBrandColumns = ['Description', 'SalesNos', 'SaleAmount'];
  TypeAndBrandSource = new MatTableDataSource();


  OpbillColumns = ['BillNo', 'BillDate', 'CustomerName', 'Description', 'Brand', 'UOM', 'Qty', 'Rate','Amount','DiscPer','DisAmount','Grossamount','TaxDescription','TaxPer','TaxAmount','NetAmount'];
  OpbillSource = new MatTableDataSource();

  AdvanceAmountColumns = ['ReceiptNo', 'ReceiptDate', 'CustomerName', 'SaleAmount', 'CollectedAmount', 'PayMode', 'InstrumentNo', 'InstrumentDate', 'BankName', 'Expirydate', 'Amount'];
  AdvanceAmountSource = new MatTableDataSource();


  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  ngOnInit() {
    debugger
    var Pathname = "Managementlazy/OpticalDashboard";
    this.commonService.data = new OpticalDashboardViewModel();
    this.MFromDate = new Date();
    this.MToDate = new Date();
    this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => { this.Country = data[0].Text});
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.Tc = res1.TransactionID;
  }

  PeriodSearch() {
    if (this.MFromDate == null) {
      Swal.fire({
        type: 'warning',
        title: 'Select the Month',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
    }
    let FromDate = this.datepipe.transform(this.MFromDate, "dd-MMM-yyyy");
    let ToDate = this.datepipe.transform(this.MToDate, "dd-MMM-yyyy");
    this.commonService.getListOfData('OpticalDashboard/GetPeriodSearch/' + FromDate + '/' + ToDate  + '/' + localStorage.getItem('CompanyID')).subscribe(data => {
      if (data.hasOwnProperty('res')) {
        if (data.res.length > 0) {
          this.dataSource.data = data.res;
          this.TypeAndBrandSource.data = [];
          this.commonService.data.OpticalBillSalesAmounts = [];
          this.OpbillSource.data = [];
          this.commonService.data.OpticalAdvanceAmounts = [];
          this.AdvanceAmountSource.data = [];
          this.SourceData = [];
        }
        else if (data.res.length == 0) {
          this.dataSource.data = [];
          this.TypeAndBrandSource.data = [];
          this.commonService.data.OpticalBillSalesAmounts = [];
          this.OpbillSource.data = [];
          this.commonService.data.OpticalAdvanceAmounts = [];
          this.AdvanceAmountSource.data = [];
          this.SourceData = [];
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
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
        this.dataSource.data = [];
        this.TypeAndBrandSource.data = [];
        this.commonService.data.OpticalBillSalesAmounts = [];
        this.OpbillSource.data = [];
        this.commonService.data.OpticalAdvanceAmounts = [];
        this.AdvanceAmountSource.data = [];
        this.SourceData = [];
        Swal.fire({
          type: 'warning',
          title: 'Invalid Input, Please contact Administrator',
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


  ShowSalesTypeWise(element) {
    if (element.SalesNos == 0) {
      return
    }
    this.commonService.data.OpsumRandomUniquieIDs = element.OpsumRandomUniquieIDs;
    this.commonService.postData('OpticalDashboard/GetSalesTypeWiseSearch/' + parseInt(localStorage.getItem('CompanyID')), this.commonService.data).subscribe(data => {
      if (data.hasOwnProperty('res')) {
        if (data.res.length > 0) {
          this.TypeAndBrandSource.data = data.res;
        }
        else if (data.res.length == 0) {
          this.TypeAndBrandSource.data = [];
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
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
        this.TypeAndBrandSource.data = [];
        Swal.fire({
          type: 'warning',
          title: 'Invalid Input, Please contact Administrator',
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



  ShowSalesAmount(element) {
    if (element.SalesAmount == 0) {
      return
    }
    let FromDate = this.datepipe.transform(this.MFromDate, "dd-MMM-yyyy");
    let ToDate = this.datepipe.transform(this.MToDate, "dd-MMM-yyyy");
    let LensOrFrameId = element.LensOrFrameId

    this.commonService.getListOfData('OpticalDashboard/GetOpbill/' + FromDate + '/' + ToDate + '/' + localStorage.getItem('CompanyID') + '/' + LensOrFrameId).subscribe(data => {
      if (data.hasOwnProperty('res')) {
        if (data.res.length > 0) {
          debugger
          this.commonService.data.OpticalBillSalesAmounts = data.res;
          this.OpbillSource.data = this.commonService.data.OpticalBillSalesAmounts;
        }
        else if (data.res.length == 0) {
          this.commonService.data.OpticalBillSalesAmounts = [];
          this.OpbillSource.data = [];
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
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
        this.commonService.data.OpticalBillSalesAmounts = [];
        this.OpbillSource.data = [];
        Swal.fire({
          type: 'warning',
          title: 'Invalid Input, Please contact Administrator',
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


  ShowAdvanceAmount(element) {
    debugger
    if (element.Collections == 0) {
      return
    }
    this.Tc;
    let FromDate = this.datepipe.transform(this.MFromDate, "dd-MMM-yyyy");
    let ToDate = this.datepipe.transform(this.MToDate, "dd-MMM-yyyy");

    this.commonService.getListOfData('OpticalDashboard/GetAdvanceAmount/' + FromDate + '/' + ToDate + '/' + localStorage.getItem('CompanyID') + '/'+ this.Tc).subscribe(data => {
      if (data.hasOwnProperty('res')) {
        if (data.res.length > 0) {
          debugger
          this.SourceData = data.res;
          this.commonService.data.OpticalAdvanceAmounts = this.SourceData;
          this.AdvanceAmountSource.data = this.commonService.data.OpticalAdvanceAmounts;

          this.cacheSpan("ReceiptNos", d => d.ReceiptNo, 'ReceiptNo');
          this.cacheSpan("ReceiptDates", d => d.ReceiptDate, 'ReceiptNo');
          this.cacheSpan("CustomerNames", d => d.CustomerName, 'ReceiptNo');
          this.cacheSpan("SaleAmounts", d => d.SaleAmount, 'ReceiptNo');
          this.cacheSpan("CollectedAmounts", d => d.CollectedAmount, 'ReceiptNo');
        }
        else if (data.res.length == 0) {
          this.commonService.data.OpticalAdvanceAmounts = [];
          this.AdvanceAmountSource.data = [];
          this.SourceData = [];
          Swal.fire({
            type: 'warning',
            title: 'No Data Found',
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
        this.commonService.data.OpticalAdvanceAmounts = [];
        this.AdvanceAmountSource.data = [];
        this.SourceData = [];
        Swal.fire({
          type: 'warning',
          title: 'Invalid Input, Please contact Administrator',
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

  SourceData;
  spans = [];

  cacheSpan(key, accessor, Property: string) {
    for (let i = 0; i < this.SourceData.length;) {
      let currentValue = accessor(this.SourceData[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      if (Property == 'ReceiptNo') {
        for (let j = i + 1; j < this.SourceData.length; j++) {
          let res = this.SourceData[i].ReceiptNo == this.SourceData[j].ReceiptNo;

          if (res) {
            if (currentValue == accessor(this.SourceData[j])) {
              count++;
            }
          }
          else {
            break;
          }
        }
      }
      else {
        for (let j = i + 1; j < this.SourceData.length; j++) {
          if (currentValue != accessor(this.SourceData[j])) {
            break;
          }

          count++;
        }
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }



  getAmount() {
    var restotalcost = this.commonService.data.OpticalBillSalesAmounts.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }


  getDiscAmount() {
    var restotalcost = this.commonService.data.OpticalBillSalesAmounts.map(t => t.DisAmount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getGrossAmount() {
    var restotalcost = this.commonService.data.OpticalBillSalesAmounts.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getGstTotalAmount() {
    var restotalcost = this.commonService.data.OpticalBillSalesAmounts.map(t => t.GSTValue + t.CESSValue + t.AddCessValue).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getNetAmount() {
    var restotalcost = this.commonService.data.OpticalBillSalesAmounts.map(t => t.NetAmount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getAdvanceAmount() {
    var restotalcost = this.commonService.data.OpticalAdvanceAmounts.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getAdvanceSaleAmount() {
    var total = 0;
    _.chain(this.SourceData).groupBy("ReceiptNo").map(function (arr, i) {
      total = total + arr.map(t => t.SaleAmount)[0];
    }).value();
    return total;
  }

  getAdvanceCollectedAmount() {
    debugger
    var test = _.chain(this.SourceData).groupBy("ReceiptNo");
    var total = 0;
     _.chain(this.SourceData).groupBy("ReceiptNo").map(function (arr, i) {
      total = total + arr.map(t => t.CollectedAmount)[0];
    }).value();
    return total;
  }
/////////////////////////////////////////////////////////////////////////////
}
