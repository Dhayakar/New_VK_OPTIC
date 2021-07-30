import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerOrderViewModel } from '../../Models/ViewModels/CustomerOrderViewModel';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-customer-order-status',
  templateUrl: './customer-order-status.component.html',
  styleUrls: ['./customer-order-status.component.less']
})
export class CustomerOrderStatusComponent implements OnInit {

  constructor(public commonService: CommonService<CustomerOrderViewModel>, private router: Router) { }

  PrintdisplayedColumns = ['Type', 'Brand', 'Description', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount', 'CGST', 'CGSTValue', 'SGST', 'SGSTValue', 'NetAmount']
  PrintdataSource = new MatTableDataSource();

  PrintdisplayedColumnsCombined = ['Types', 'Brands', 'Descriptions', 'UOMs', 'QTYs', 'Prices', 'Amounts', 'header-row-group', 'GrossAmounts', 'CGSTTax', 'SGSTTax', 'NetAmounts']

  PrintdisplayedColumnsGst = ['Type', 'Brand', 'Description', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount', 'CGST', 'CGSTValue', 'SGST', 'SGSTValue', 'NetAmount']
  PrintdisplayedColumnsGsts = ['Types', 'Brands', 'Descriptions', 'UOMs', 'QTYs', 'Prices', 'Amounts', 'header-row-group', 'GrossAmounts', 'CGSTTax', 'SGSTTax', 'NetAmounts']

  PrintdisplayedColumnsIGst = ['Type', 'Brand', 'Description', 'UOM', 'QTY', 'Price', 'Amount', 'Discount%', 'DiscountAmount', 'GrossAmount', 'IGST', 'IGSTValue', 'NetAmount']
  PrintdisplayedColumnsIGsts = ['Types', 'Brands', 'Descriptions', 'UOMs', 'QTYs', 'Prices', 'Amounts', 'header-row-group', 'GrossAmounts', 'IGSTTax', 'NetAmounts']

  displayedColumns3: string[] = ['PaymentMode', 'BankName', 'InstrumentNumber', 'InstrumentDate', 'ExpiryDate', 'Branch', 'Amount'];
  dataSource3 = new MatTableDataSource();


  displayedColumns4: string[] = ['Action', 'OrderNo', 'OrderDate', 'CustomerName', 'OrderStatus']
  dataSource4 = new MatTableDataSource();

  isNextButton;
  Tc;
  OrderedListModel;
  Getloctime;
  Country1;
  Country2;

  ngOnInit() {
    var Pathname = "Opticalslazy/CustomerOrderStatus";
    var n = Pathname;
    var sstring = n.includes("/");
    this.commonService.data = new CustomerOrderViewModel();
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    let res1 = Objdata.find(x => x.Parentmoduledescription == Pathname);
    this.Tc = res1.TransactionID;
    if (sstring == false) {

    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        if (this.Tc == null || this.Tc == undefined) {
          this.isNextButton = true;
          Swal.fire({
            type: 'warning',
            title: 'Transaction Id Undefined',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
        this.Getloctime = localStorage.getItem('GMTTIME');
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          this.Country1 = data[0].Value;
          this.Country2 = data[0].Text;
        });
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "CustomerOrder").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  getItemAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.GivenQtyPrice).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getDiscountAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.DiscountAmount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getGrossAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.GrossAmount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  GetCGSTAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.CGSTValue).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  GetSGSTAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.SGSTValue).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  GetIGSTAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.IGSTValue).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }

  getTotalAmount() {
    var restotalcost = this.commonService.data.CustomerItemOrders.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
    return restotalcost;
  }


  getPaymentTotalCost() {
    if (this.commonService.data.paymenttran.length >= 1) {
      var restotalcost = this.commonService.data.paymenttran.map(t => t.Amount).reduce((acc, value) => acc + value, 0);
      restotalcost = parseFloat(restotalcost.toFixed(2));
      return restotalcost;
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource4.filter = filterValue.trim().toLowerCase();
  }

  /* Placed Ordered List */
  PlacedOrderedList() {
    debugger
    try {
      this.OrderedListModel = 'block';
      if (this.Tc == null || this.Tc == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'Transaction Id Undefined',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        return
      }
      this.commonService.getListOfData('CustomerOrder/GetCustomerOrderedList/' + parseInt(localStorage.getItem("CompanyID")) + '/' + this.Tc).subscribe(data => {
        debugger
        if (data.Success == true) {
          if (data.CustomerOrderList.length > 0) {
            this.dataSource4.data = data.CustomerOrderList;
            this.dataSource4._updateChangeSubscription();
          }
          else {
            Swal.fire({
              type: 'warning',
              title: 'No Orders Details Found',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container',
              },
            });
            this.dataSource4.data = [];
            this.dataSource4._updateChangeSubscription();
          }
        }
        else {
          Swal.fire
            ({
              type: 'warning',
              title: data.Message,
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  M_OrderNo;
  M_OrderDate;
  M_RefNo;
  M_Refdate;
  M_Deliverydate;
  M_Remarks;
  M_CustomerName;
  M_Address;
  M_MobileNo;
  M_Status;

  OrderStatus: boolean = true;

  SelectOrderNo(element) {
    try {
      this.commonService.getListOfData('CustomerOrder/GetOrderNoStatusDetails/' + parseInt(localStorage.getItem("CompanyID")) + '/' + element.OrderNo).subscribe(data => {
        debugger
        if (data.Success == true) {
          debugger
          (<HTMLElement>document.querySelector('.ItemDetailsTab')).click();
          this.M_OrderNo = data.CustomerOrderedList.OrderNo;

          let LocTime = this.Getloctime.split(":");
          let Hours = LocTime[0];
          let Minutes = LocTime[1];

          if (data.CustomerOrderedList.Status == "Open") {
            this.M_Status = data.CustomerOrderedList.Status;
            this.OrderStatus = true;
          } else {
            this.OrderStatus = false;
            this.M_Status = data.CustomerOrderedList.Status;
          }
     
          this.M_OrderDate = new Date(data.CustomerOrderedList.OrderDate);
          this.M_OrderDate.setHours(this.M_OrderDate.getHours() + parseInt(Hours));
          this.M_OrderDate.setMinutes(this.M_OrderDate.getMinutes() + parseInt(Minutes));


          this.M_RefNo = data.CustomerOrderedList.RefNo;
          this.M_Refdate = data.CustomerOrderedList.RefDate;
          this.M_Deliverydate = data.CustomerOrderedList.Deliverydate;
          this.M_Remarks = data.CustomerOrderedList.Remarks;

          this.M_CustomerName = data.CustomerOrderedList.CustomerName;
          this.M_Address = data.CustomerOrderedList.CustomerAddress1.concat(' ', data.CustomerOrderedList.CustomerAddress2 != null ? data.CustomerOrderedList.CustomerAddress2 : '', ' ', data.CustomerOrderedList.CustomerAddress3 != null ? data.CustomerOrderedList.CustomerAddress3 : '')
          this.M_MobileNo = data.CustomerOrderedList.CustomerMobileNo;

          this.commonService.data.paymenttran = data.CustomerOrderedList.paymenttran;
          this.dataSource3.data = this.commonService.data.paymenttran;
          this.dataSource3._updateChangeSubscription();

          //this.Prints = true;

          this.commonService.data.CustomerItemOrders = data.CustomerOrderedList.CustomerItemOrders;

          if (this.commonService.data.CustomerItemOrders.some(x => x.IGST == null)) {
            this.PrintdisplayedColumns = this.PrintdisplayedColumnsGst;
            this.PrintdisplayedColumnsCombined = this.PrintdisplayedColumnsGsts;
          } else {
            this.PrintdisplayedColumns = this.PrintdisplayedColumnsIGst;
            this.PrintdisplayedColumnsCombined = this.PrintdisplayedColumnsIGsts;
          }
        
          this.PrintdataSource.data = this.commonService.data.CustomerItemOrders;
          this.PrintdataSource._updateChangeSubscription();
          this.OrderedListModel = 'none';
        }
        else {
          Swal.fire
            ({
              type: 'warning',
              title: 'Invalid Input,Please Contact Administrator',
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
    catch (Error) {
      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Customer Order" + '/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem('userroleID') + '/')
        .subscribe(data => { });
    }
  }

  Submit() {
    this.commonService.data.OrderNo = this.M_OrderNo;
    this.commonService.data.Status = this.M_Status;
    this.commonService.data.Cmpid = parseInt(localStorage.getItem("CompanyID"));
    this.commonService.postData('CustomerOrder/SubmitCustomerStatusDetail', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });
          this.clear();
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Invalid Input,Please Contact Administrator',
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

  clear() {
    (<HTMLElement>document.querySelector('.ItemDetailsTab')).click();
    this.M_OrderNo = '';
    this.M_RefNo = '';
    this.M_Refdate = '';
    this.M_CustomerName = '';
    this.M_Address = '';
    this.M_MobileNo = '';
    this.M_Deliverydate = '';
    this.M_Remarks = '';
    this.commonService.data.CustomerItemOrders = [];
    this.commonService.data.paymenttran = [];
    this.PrintdataSource.data = [];
    this.dataSource3.data = [];
    this.M_Status = null;
  }

  OrderedListModelClose() {
    this.OrderedListModel = 'none';
  }

/////////////////////////////////////////////////
}
