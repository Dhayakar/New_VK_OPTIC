import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgForm, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/shared/common.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { FinancialViewData, FinancialDetails } from 'src/app/Models/ViewModels/Financialview';
import { DateTime } from 'wijmo/wijmo';
import { FinancialStatus } from 'src/app/Models/FinancialStatus';
import { close } from 'inspector';
import { Router } from '@angular/router';

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
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.less'],


  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})

export class FinancialComponent implements OnInit {

  isDisabled = false;

  constructor(public commonService: CommonService<FinancialViewData>, private router: Router) { }

  //applyFilter(FilterValue: String) {

  //  debugger;
  //  this.dataSource.filter = FilterValue.trim().toLowerCase();

  //}

  displayedColumns = ['tapp', 'FYDescription', 'FYFrom', 'FYTo', 'FYAccYear']
  dataSource = new MatTableDataSource();
  displayedColumns1 = ['FYStatus', 'Date', 'ClosedBy']
  dataSource1 = new MatTableDataSource();
  accessdata;
  DisableonSubmit;
  DisableUpdate;
  DisableClicksch;
  IsAdmin: boolean = false;
  ngOnInit() {
    debugger;
    var Pathname = "Administrationlazy/Financial";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (localStorage.getItem("userReferrencetag") == "A") {
      this.IsAdmin = true;
    } else {
      this.IsAdmin = false;
    }
    if (sstring == false) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableonSubmit = false;

          } else {
            this.DisableonSubmit = true;

          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.DisableUpdate = false;
            this.DisableClicksch = false;

          } else {
            this.DisableUpdate = true;
            this.DisableClicksch = true;

          }
          //if (this.accessdata.find(x => x.Print == true)) {

          //} else {

          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.DisableDelete = false;
          //} else {
          //  this.DisableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////
        this.Hideudatebutton = false;

        this.commonService.getListOfData('Financial/GetFpartDetail/' + localStorage.getItem("CompanyID")).subscribe(data => {
          if (data.FinancialDetails != null) {
            debugger;
            this.commonService.data = data;
            this.dataSource.data = data.FinancialDetails;
          }

        })
      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "NumberControl").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    else if (sstring == true) {
      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {
        //////////////////////////////////////////////////////////////////////////////
        this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.DisableonSubmit = false;

          } else {
            this.DisableonSubmit = true;

          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.DisableUpdate = false;
            this.DisableClicksch = false;
          } else {
            this.DisableUpdate = true;
            this.DisableClicksch = true;
          }
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.DisableDelete = false;
          //} else {
          //  this.DisableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////
        this.Hideudatebutton = false;

        this.commonService.getListOfData('Financial/GetFpartDetail/' + localStorage.getItem("CompanyID")).subscribe(data => {
          if (data.FinancialDetails != null) {
            debugger;
            this.commonService.data = data;
            this.dataSource.data = data.FinancialDetails;
          }

        })
      }
      else {

        Swal.fire({
          text: "Un-Authorized Access, Please contact Administrator",
          type: 'warning',
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "NumberControl").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
  }

  @ViewChild('FinancialYearForm') Form: NgForm
  @ViewChild('depart_table') depart_table: ElementRef;
  @ViewChild('table1') table1: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  backdrop;
  cancelblock;
  modalS;
  Filter;
  M_IsActive;
 
  modalSs;

  modalSuccess() {
    debugger;
    this.dataSource.filter = '';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    this.modalS = "none";
    this.backdrop = "none";
  }
  modalSuccesS() {
    debugger;
    this.modalSs = "none";
    this.backdrop = "none";
    this.UserID = localStorage.getItem('userroleID')
    this.commonService.getListOfData('Financial/GetStsDetail/' + this.M_ID + '/' + this.UserID + '/').subscribe(data => {
      if (data.FinancialDetails != null) {
        debugger;
        let item = data.FinancialDetails;
        this.FYD = item[0].FYID;
      }

    })
  }

  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClose() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessOk() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.isDisabled = false;
    this.Submitdisabled = false;
    this.Hideudatebutton = false;
    this.Hidests = false;
    //this.Helped = false;
    this.Form.onReset();
    this.commonService.getListOfData('Financial/GetFpartDetail/' + localStorage.getItem("CompanyID")).subscribe(data => {
      if (data.FinancialDetails != null) {
        debugger;
        this.commonService.data = data;
        this.dataSource.data = data.FinancialDetails;
      }

    })
  }

  nameField(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 46) {
      return false;
    }
  }

  M_Des;
  M_picker;
  M_datepic;
  M_Acc;
  M_ID;
  CompanyID;
  Submitdisabled: boolean = false;
  M_Status;
  UsrID;
  Tag;

  GetStatusDetails() {
    debugger
    this.CompanyID = localStorage.getItem("CompanyID");
    this.UsrID = localStorage.getItem('userroleID');
    this.commonService.getListOfData('Financial/GetStatusDetails/' + this.UsrID + '/' + this.FYD + '/').subscribe(data => {
      if (data.FinancialDetails != null) {
        debugger;
        // this.commonService.data = data;
        this.dataSource1.data = data.FinancialDetails;
        this.FYD = null;

      }
    })
    this.modalSs = "block";
    this.backdrop = "block";
  }

  SearchClickS() {
    debugger;
    this.commonService.getListOfData('Financial/GetFpartDetail/').subscribe(data => {
      if (data.FinancialDetails != null) {
        debugger;
        // this.commonService.data = data;
        this.dataSource.data = data.FinancialDetails;
      }
    })

    this.modalS = "block";
    this.backdrop = "block";
    this.Hideudatebutton = false;
    this.Hidests = false;
    this.Form.onReset();
    this.isDisabled = false;
  }

  Hidests: boolean = false;
  //Helped: boolean = false;
  //Hidestts: boolean = false;
  Hideudatebutton: boolean = false;
  selecttype(element) {
    debugger;
    this.modalS = 'none';
    this.backdrop = 'none';
    this.dataSource.filter = '';
    const num_q = (document.getElementById('myInput') as HTMLInputElement).value = '';
    debugger;

    this.M_ID = element.ID;
    this.M_Des = element.FYDescription;
    this.M_picker = element.FYFrom;
    this.M_datepic = element.FYTo;
    this.M_Acc = element.FYAccYear;

    if (element.IsActive == "In-Active") {
      this.M_IsActive = "false";

    } else {
      this.M_IsActive = "true";
    }

    
    this.isDisabled = true;
    this.M_Status = element.FYStatus1;
    this.UserID = localStorage.getItem('userroleID')
    this.commonService.getListOfData('Financial/GetStsDetail/' + this.M_ID + '/' + this.UserID + '/').subscribe(data => {
      if (data.FinancialDetails != null) {
        debugger;

        if (data.FinancialDetails.length == 0) {
          debugger;
          //this.Hidestts = true;
          this.Hidests = false;
          //this.Helped = true;
          //this.Submitdisabled = true;
          this.FYD = null;

        }


        let item = data.FinancialDetails;

        this.FID = item[0].ID;
        this.FYD = item[0].FYID;
        this.Tag = data.Tag;
        this.M_Status = item[0].FYStatus1;
        this.Hidests = true;

        if (this.M_IsActive == "false") {
          debugger;
          this.Submitdisabled = true;
          this.Hideudatebutton = false;
        } else {
          this.Hideudatebutton = true;
          this.Submitdisabled = false;
        }

        //if (this.Tag == "A") {

        //  this.Submitdisabled = false;

        //} else {
        //  this.Submitdisabled = true;
        //}



      }

    })


  }

  fromm;
  Too;
  FID;
  FYD;

  applyFilter(event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showyear() {
    debugger;
    if (this.commonService.data.FinancialDetails.length == 0)
    {
      return;
    }
    else {
      let res = this.commonService.data.FinancialDetails[this.commonService.data.FinancialDetails.length - 1];
      this.M_Acc = res.FYAccYear + 1;
      this.fromm = res.FYTo;
      const today = new Date(this.fromm)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      this.M_picker = tomorrow;
      var second_date12 = new Date(this.M_picker);
      second_date12.setMonth(second_date12.getMonth() + 12);
      var second_date13 = new Date(second_date12.setDate(second_date12.getDate() - 1));
      this.M_datepic = second_date13;
      if (this.commonService.data.FinancialDetails.some(x => x.FYFrom !== "")) {
        this.isDisabled = true;
      }
      if (this.M_Des == null || this.M_Des == "") {
        this.M_Acc = null;
        this.M_picker = null;
        this.M_datepic = null;

      }
    }
  }

  onSubmitFinancial(form: NgForm) {
    debugger;
    if (this.M_Des == null || this.M_picker == null) {
      Swal.fire({
        type: 'warning',
        title: 'Check Inputs',
      });
      return;
    }

    if (form.valid) {
      debugger;
      this.commonService.data = new FinancialViewData();
      this.commonService.data.Fes.FYDescription = this.M_Des;
      this.commonService.data.Fes.FYFrom = this.M_picker;
      this.commonService.data.Fes.FYTo = this.M_datepic;
      this.commonService.data.Fes.FYAccYear = this.M_Acc;
      this.UserID = localStorage.getItem('userroleID');
      this.commonService.data.Fes.CreatedBy = parseInt(this.UserID);
      this.commonService.data.Fes.CMPID = localStorage.getItem('CompanyID');
      //this.commonService.data.Fts = new FinancialStatus();
      //this.commonService.data.Fts.ClosedBy = this.UserID;

      this.commonService.postData('Financial/InsertFart', this.commonService.data)
        .subscribe(data => {

          debugger;
          if (data.Success == true) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Saved Successfully',
              showConfirmButton: false,
              timer: 2000
            });
            this.Form.onReset();
           // this.ngOnInit();
            this.isDisabled = false;
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['Administrationlazy/Financial']);
            });
            this.commonService.getListOfData('Financial/GetFpartDetail/' + localStorage.getItem("CompanyID")).subscribe(data => {
              if (data.FinancialDetails != null) {
                debugger;
                this.commonService.data = data;
                this.dataSource.data = data.FinancialDetails;
              }

            });
          }
          else if (data.Success == false && data.Message == "Financial Year already exists") {
            debugger;
            Swal.fire({
              type: 'warning',
              title: 'warning',
              text: 'Financial Year already exists',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },

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


        });
    }
  }
  UserID;
  isValid;
  onUpdate(form: NgForm) {
    debugger;
    if (form.valid) {
      this.commonService.data = new FinancialViewData();
      this.commonService.data.Fes.FYDescription = this.M_Des;
      this.commonService.data.Fes.IsActive = this.M_IsActive;
      this.commonService.data.Fes.UpdatedBy = parseInt(this.UserID);
      this.commonService.data.Fts = new FinancialStatus();
      this.UserID = localStorage.getItem('userroleID');
      this.commonService.data.Fts.ClosedBy = this.UserID;
      this.commonService.data.Fts.FYStatus = this.M_Status;
      this.commonService.postData("Financial/UpdateFart/" + this.M_ID + '/' + this.FID + '/', this.commonService.data)
        .subscribe(data => {
          debugger;
          if (data.Success == true) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Updated Successfully',
              showConfirmButton: false,
              timer: 2000
            });

          
              this.isDisabled = false;
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              debugger;
              this.router.navigate(['Administrationlazy/Financial']);

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
          // this.Form.onReset();
          // this.ngOnInit();

        });
    }
  }

  //deleteclk(form: NgForm, ID) {



  //  debugger;
  //  Swal.fire({
  //    title: 'Are you sure?',
  //    text: "Want to delete Financial",
  //    type: 'warning',
  //    showCancelButton: true,
  //    confirmButtonColor: '#3085d6',
  //    cancelButtonColor: '#d33',
  //    confirmButtonText: 'Yes'
  //  }).then((result) => {

  //    debugger;
  //    if (result.value) {
  //      this.commonService.postData("Financial/deleteFart/" + ID, this.commonService.data).subscribe(result => { })
  //      Swal.fire(
  //        'Deleted!',
  //        'FinancialYear has been deleted.',
  //        'success'
  //      )
  //      this.Form.onReset();
  //      this.commonService.data.FinancialDetails = [];
  //    }


  //    else {
  //      Swal.fire(
  //        'Cancelled',
  //        'FinancialYear has not been deleted'
  //      )
  //    }

  //    this.isDisabled = false;

  //  })




  //}

  CancelClk() {
    debugger;
    if (this.M_Des != null || this.M_picker != null || this.M_datepic != null || this.M_Acc != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();


    }
  }

  dateloc() {
    debugger;
    var myDate = new Date(this.M_picker);
    var dates = myDate.getFullYear();
    this.M_Acc = dates;
    var second_date = new Date(this.M_picker);
    second_date.setMonth(second_date.getMonth() + 12);
    var second_date1 = new Date(second_date.setDate(second_date.getDate() - 1));
    this.M_datepic = second_date1;
  }


  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Administrationlazy/Financial";
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




}





