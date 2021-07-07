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
  selector: 'app-drug-stock-summary',
  templateUrl: './drug-stock-summary.component.html',
  styleUrls: ['./drug-stock-summary.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class DrugStockSummaryComponent implements OnInit {

  constructor(public commonService: CommonService<DrugStockSummaryView>, public datepipe: DatePipe, public dialog: MatDialog,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef, private router: Router) { }
  displayedColumns = ['Store', 'Brand', 'GenericName', 'DrugGroup', 'UOM', 'OpeningBalance', 'Receipt', 'Issue', 'ClosingBalance'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sheetName = 'Drug Stock Summary';
  ExcelName = 'Drug Stock Summary';
  CompanyID;
  M_BrandDataDrop;
  GetBranddata;
  M_AllSeDrop;
  BID;
  Page: boolean = true;
  //HideBranddrop: boolean = false;
  //HideBranddropp: boolean = false;
  HideBranddrop: boolean = true;
  HideBranddropp: boolean = true;
  TableData: boolean = false;
  Buttonsss: boolean = false;
  hidemain: boolean = false;
  TableMain: boolean = false;
  submitbrnd = true;
  M_FromDate;
  M_FromLable;
  M_ToLable;
  M_ToDate;
  accessdata;
  disSubmit: boolean = true;
  disprint: boolean = true;

  ngOnInit() {
    var Pathname = "Inventorylazy/DrugStockSummary";
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

        this.dataSource.paginator = this.paginator;
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

        this.dataSource.paginator = this.paginator;
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

  accesspopup;
  backdrop;

  Getformaccess() {
    debugger;
    var Pathname = "Inventorylazy/DrugStockSummary";
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


  maximize() {
    debugger;
    this.hidemain = false;

  }

  minimize() {
    debugger;
    this.hidemain = true;

  }
  StoreName = [];
  GetBranchdata = [];
  getallDropdown() {

    //this.commonService.getListOfData('Common/GetstoreDropdownvalues/' + parseInt(localStorage.getItem("CompanyID")))
    //  .subscribe(data => { this.StoreName = data; });


    this.commonService.getListOfData('Common/GetBranchAll/' + parseInt(localStorage.getItem("CompanyID"))).subscribe((data: any) => {
      debugger;
      this.GetBranchdata = data;
    });

  }

  @ViewChild('DrugStockSummary') Form: NgForm

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

  //Option Select
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
  M_AllStore;
  //OptionSelectstore() {
  //  debugger;
  //  if (this.M_AllStore == "All") {
  //    this.HideBranddropp = false;
  //    this.M_BrandDataDrop = undefined;
  //    this.TableData = false;
  //    this.commonService.data.IDArrays = undefined;
  //  }
  //  else if (this.M_AllStore == "Selective") {
  //    this.HideBranddropp = true;
  //    this.TableData = false;
  //    this.commonService.data.IDArrays = undefined;
  //  }

  //}



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


  branchid;
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


  ///Get ID
  TMP = [];
  //selectdBrand(brand, event, id) {
  //  debugger;
  //  if (this.M_AllSeDrop == "Selective") {
  //    let result = event.value;
  //    this.commonService.data.DropArray = result;
  //  }

  //}
  brandid;
  brname;
  selectdBrand(brand, event, id) {
    debugger;
    if (this.M_AllSeDrop == "Selective") {
      let result = event.value.Value;
      this.brandid = result;
    }

  }
  ////Submit
  Temp = [];
  TempArry = [];
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

      for (var i = 0; i < this.commonService.data.DropArray.length; i++) {
        var DID = this.commonService.data.DropArray[i].Value;
        let ids = this.commonService.data.DropArray.find(x => x.Value == DID).Value;
        var Med = new TempArr();
        Med.IDs = DID;
        this.commonService.data.TempArr.push(Med);
      }


      let FromDate = this.M_FromDate.toISOString();
      let ToDate = this.M_ToDate.toISOString();
      this.commonService.getListOfData('DrugStockSummary/GetSelectedStockSummary/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.brandid + '/' + this.storeid + '/')
        .subscribe(data => {
          debugger;
          if (data.Summary.length > 0) {
            //this.commonService.data = data;
            this.brname = data.Summary[0].CmpName;
            this.dataSource.data = data.Summary;
            this.TableData = true;
            this.Buttonsss = true;
            this.TableMain = false;
            this.Page = false;
            
          }
          else {
            this.TableData = false;
            this.TableMain = true;
            this.Buttonsss = false;
            this.Page = true;
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });




      this.commonService.data.IDArrays = this.TMP;
    }
    else if (this.M_AllSeDrop == "All") {
     

      this.commonService.data = new DrugStockSummaryView();
      let FromDate = this.M_FromDate.toISOString();
      let ToDate = this.M_ToDate.toISOString();
      this.commonService.getListOfData('DrugStockSummary/GetStockSummary/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.storeid + '/')
        .subscribe(data => {
          debugger;
          if (data.Summary.length > 0) {
            //this.commonService.data = data;
            this.brname = data.Summary[0].CmpName;
            this.dataSource.data = data.Summary;
            this.TableData = true;
            this.Buttonsss = true;
            this.TableMain = false;
            this.Page = false;
            
          }
          else {
            this.TableData = false;
            this.TableMain = true;
            this.Buttonsss = false;
            this.Page = true;
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Datas Found..!',
              timer: 2000
            });
          }
        });
    }
  }


  close() {

    this.TableData = false;
    this.TableMain = true;

    if (this.AllBranch == "All") {
      this.HideBranddropp = true;
    }
    else if (this.AllBranch == "Selective") {
      this.HideBranddropp = false;
    }
    else if (this.M_AllSeDrop == "All") {
      this.HideBranddrop = true;
    }
    else if (this.M_AllSeDrop == "Selective") {
      this.HideBranddrop = false;
    }
  }


  Cancel(form: NgForm) {
    debugger;
    if (this.M_AllSeDrop != undefined || this.TableData == true) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Want to Cancel",
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        reverseButtons: true
      }).then((result) => {
        debugger;
        if (result.value) {
          //this.Form.onReset();
          this.commonService.data.IDArrays = [];
          this.Temp = [];
          this.ngOnInit();
          this.TableData = false;
          this.Page = true;
          this.Buttonsss = false;
          this.submitbrnd = true;
          Swal.fire({
            type: 'success',
            title: 'Cancelled',
            timer: 2000
          })
        }
        else {
          Swal.fire(
            'Cancelled',
            'Your records has not been cancelled'
          )
        }
      })
    }
  }
  ////Excel
  @ViewChild('contentToConvert') contentToConvert: ElementRef;
  @ViewChild('table') table: ElementRef;
  fireEvent() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'DrugStockSummary.xlsx');
  }

  gserial=[];
  gserialtable = false;
  gbatchtable = false;
  gbatch;
  modalviewBatchDetailspopup;
  recept;
  bname;
  gname;
  ibgbatch = [];
  ibmodalviewBatchDetailspopup;
  ViewReceiptDetails(element) {
    debugger;
    let FromDate = this.M_FromDate.toISOString();
    let ToDate = this.M_ToDate.toISOString();
    this.recept = element.Receipt;
    this.bname = element.Brand;
    this.gname = element.GenericName;

    if (element.Receipt != 0) {

      if (element.DrugCtgy == 1) {
        this.commonService.getListOfData('DrugStockSummary/GetSerialDtls/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.storeid + '/' + element.DrugID + '/')
          .subscribe(data => {
            debugger;

            if (data.DrugSerial.length > 0) {
              this.gserial = data.DrugSerial;
              this.modalviewBatchDetailspopup = 'block';
              this.backdrop = 'block';
            }

            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'No Record Found..!',
                timer: 2000
              });
            }

          });
      }


      else if (element.DrugCtgy == 2) {
        this.commonService.getListOfData('DrugStockSummary/GetBatchDtls/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.storeid + '/' + element.DrugID + '/')
          .subscribe(data => {
            debugger;

            if (data.DrugBatch.length > 0) {
              this.ibgbatch = data.DrugBatch;
              this.ibmodalviewBatchDetailspopup = 'block';
              this.backdrop = 'block';
            }

            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'No Record Found..!',
                timer: 2000
              });
            }
          });

      }

    }

    else {

      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'No Record Found..!',
        timer: 2000
      });
    }

  }

  ModalViewBatchPopupclose() {
    this.gserial = [];
    this.modalviewBatchDetailspopup = 'none';
    this.backdrop = 'none';

  }


  ibModalViewBatchPopupclose() {

    this.ibgbatch = [];
    this.ibmodalviewBatchDetailspopup = 'none';
    this.backdrop = 'none';

  }



  issue;
  Ibnames;
  Ignames;
  igserialtable = false;
  igbatchtable = false;
  igserial = [];
  imodalviewBatchDetailspopup;
  iibgbatch=[];
  iibmodalviewBatchDetailspopup;
  ViewIssueDetails(element) {

    debugger;
    let FromDate = this.M_FromDate.toISOString();
    let ToDate = this.M_ToDate.toISOString();
    this.issue = element.Issue;
    this.Ibnames = element.Brand;
    this.Ignames = element.GenericName;

    if (element.Issue != 0) {

      if (element.DrugCtgy == 1) {
        this.commonService.getListOfData('DrugStockSummary/GetISerialDtls/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.storeid + '/' + element.DrugID + '/')
          .subscribe(data => {
            debugger;
            if (data.DrugSerial.length > 0) {
              this.igserial = data.DrugSerial;
              this.imodalviewBatchDetailspopup = 'block';
              this.backdrop = 'block';
            }

            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'No Record Found..!',
                timer: 2000
              });
            }
            

          });
      }


      else if (element.DrugCtgy == 2) {
        this.commonService.getListOfData('DrugStockSummary/GetIBatchDtls/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.storeid + '/' + element.DrugID + '/')
          .subscribe(data => {
            debugger;
            if (data.DrugBatch.length > 0) {
              this.iibgbatch = data.DrugBatch;
              this.iibmodalviewBatchDetailspopup = 'block';
              this.backdrop = 'block';
            }

            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'No Record Found..!',
                timer: 2000
              });
            }

          });

      }

    }

    else {

      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'No Record Found..!',
        timer: 2000
      });
    }


  }

  iModalViewBatchPopupclose() {
    this.igserial = [];
    this.imodalviewBatchDetailspopup = 'none';
    this.backdrop = 'none';

  }

  iibModalViewBatchPopupclose() {
    this.iibgbatch = [];
    this.iibmodalviewBatchDetailspopup = 'none';
    this.backdrop = 'none';

  }

  Cbnames;
  Cgnames;
  cigserial = [];
  cimodalviewBatchDetailspopup;
  cissue;
  cibgbatch = [];
  ciModalViewBatchPopupclose() {
    this.cigserial = [];
    this.cimodalviewBatchDetailspopup = 'none';
    this.backdrop = 'none';
  }

  cibModalViewBatchPopupclose() {
    this.cibgbatch = [];
    this.cibmodalviewBatchDetailspopup = 'none';
    this.backdrop = 'none';
  }
  cibmodalviewBatchDetailspopup;
  ViewClosingDetails(element) {

    debugger;
    let FromDate = this.M_FromDate.toISOString();
    let ToDate = this.M_ToDate.toISOString();
    this.cissue = element.ClosingBalance;
    this.Cbnames = element.Brand;
    this.Cgnames = element.GenericName;

    if (element.ClosingBalance != 0) {

      if (element.DrugCtgy == 1) {
        this.commonService.getListOfData('DrugStockSummary/GetCSerialDtls/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.storeid + '/' + element.DrugID + '/')
          .subscribe(data => {
            debugger;
           
            if (data.DrugSerial.length > 0) {
              this.cigserial = data.DrugSerial;
              this.cimodalviewBatchDetailspopup = 'block';
              this.backdrop = 'block';
            }

            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'No Record Found..!',
                timer: 2000
              });
            }

          });
      }


      else if (element.DrugCtgy == 2) {
        this.commonService.getListOfData('DrugStockSummary/GetCBatchDtls/' + FromDate + '/' + ToDate + '/' + this.CompanyID + '/' + this.storeid + '/' + element.DrugID + '/')
          .subscribe(data => {
            debugger;
            if (data.DrugBatch.length > 0) {
              this.cibgbatch = data.DrugBatch;
              this.cibmodalviewBatchDetailspopup = 'block';
              this.backdrop = 'block';
            }

            else {
              Swal.fire({
                position: 'center',
                type: 'warning',
                title: 'No Record Found..!',
                timer: 2000
              });
            }

          });

      }

    }

    else {

      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'No Record Found..!',
        timer: 2000
      });
    }

  }


}

