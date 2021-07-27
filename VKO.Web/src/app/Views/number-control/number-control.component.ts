import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NmberControl } from '../../Models/ViewModels/NumberControlWebModel';
import { NgForm, FormControl } from '@angular/forms';
import { Number_Control } from '../../Models/NumberControl';
import { MatTableDataSource, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material'
import Swal from 'sweetalert2'
import { SearchComponent } from '../search/search.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
  selector: 'app-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class NumberControlComponent implements OnInit {
  @ViewChild('NumberControlMasterForm') Form: NgForm
  //maxDate1 = new Date();
  minDate2 = new Date();
  minDate1 = new Date();
  hiddenUpdateclk: boolean = false;
  hiddenSubmit: boolean = true;
  hiddenDelete: boolean = false;
  hiddenVCID: boolean = true;
  //hiddenAutonumber = false;
  hiddenNextFromDate = false;
  hiddenIsActive = false;
  // DisEffectiveTo = true;
  hiddenEffectivTo = false;
  hiddenEffectiveFrom = true;
  isInvalid = false;
  DisableNEffectiveFrom1 = false;
  DisableFrom1 = true;
  //hiddenNCform = true;
  hiddenNumberControl = true;
  hiddenGridHelp = false;
  backdrop;
  Deleteblock;
  cancelblock;
  previewblock;
  M_VCID;
  M_TransactionID;
  M_CmpID;
  M_Location;
  M_Prefix;
  M_Suffix;
  M_Prefix1;
  M_Suffix1;
  M_Autonumber;
  M_RunningNumber;
  M_Autonumber1;
  M_RunningNumber1;
  M_EffectiveFrom;
  M_EffectiveFrom1;
  M_EffectiveTo: Date;
  previewblock1;
  modalSuccessClosessss1() {

  }
  M_IsActive;
  M_IsActive1;
  M_IsDeleted;
  M_Description
  M_Description1;
  Trantypes;
  Cityname;
  State;
  Country;
  disableLOC = true;
  Locationname;
  Cityy;
  accessdata;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  constructor(public commonService: CommonService<NmberControl>,
    private route: ActivatedRoute,
    private router: Router,
    public appComponent: AppComponent,
    public dialog: MatDialog,) { }
  DoctorID;
  DisableonSubmit = true;
  DisableUpdate = true;
  DisableDelete = true;
  DisableClicksch = true;
  docotorid;
  ngOnInit() {
    debugger;
    
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Administrationlazy/NumberControl";
    var n = Pathname;
    var sstring = n.includes("/");
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
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
          if (this.accessdata.find(x => x.Delete == true)) {
            this.DisableDelete = false;
          } else {
            this.DisableDelete = true;
          }
        });

        //////////////////////////////////////////////////////////////////////////////




        this.M_Autonumber = "true";
        debugger;
        this.getdropdowns();
        localStorage.getItem("CompanyID");
        this.DoctorID = localStorage.getItem('userDoctorID');

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
          if (this.accessdata.find(x => x.Delete == true)) {
            this.DisableDelete = false;
          } else {
            this.DisableDelete = true;
          }
        });

        //////////////////////////////////////////////////////////////////////////////
        this.M_Autonumber = "true";
        debugger;
        this.getdropdowns();
        localStorage.getItem("CompanyID");
        this.DoctorID = localStorage.getItem('userDoctorID');
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

    /////////////////////////////////////////////////////////////////////////////////////
  }

  getdropdowns() {
    debugger;
    this.commonService.getListOfData('Common/GetNumberControlDes').subscribe(data => {
      debugger;
      this.Trantypes = data;
    });
    debugger;
    // this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });

  }

  displayedColumnspay: string[] = ['Description', 'Autonumber', 'Prefix', 'RunningNumber', 'Suffix', 'EffectiveFrom', 'IsActive'];
  dataSourcepay = new MatTableDataSource();

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if ((charCode > 34 && charCode < 41) || charCode == 46) {
        return true;
      }
      return false;
    }
    return true;
  }

  onSubmit(form: NgForm) {
    debugger;
    try {
      var cmpid = localStorage.getItem("CompanyID");
      this.M_CmpID = cmpid;
      if (form.valid) {
        this.isInvalid = false;
        if (this.commonService.data.NumColgrid != undefined && this.commonService.data.NumColgrid.length > 0) {
          debugger;
       
          this.commonService.data.NumberControl.CreatedBy = this.docotorid;
        }
        else
        {
          this.commonService.data = new NmberControl();
          this.commonService.data.NumberControl.LocationID = this.M_Location;
          this.commonService.data.NumberControl.Prefix = this.M_Prefix;
          this.commonService.data.NumberControl.Suffix = this.M_Suffix;
          this.commonService.data.NumberControl.RunningNumber = this.M_RunningNumber;
          this.commonService.data.NumberControl.EffectiveFrom = this.M_EffectiveFrom
          this.commonService.data.NumberControl.CmpID = parseInt(localStorage.getItem("CompanyID"));
          this.commonService.data.NumberControl.TransactionID = this.M_Description.Value;
          this.commonService.data.NumberControl.Description = this.M_Description.Text;
          this.commonService.data.NumberControl.CreatedBy = parseInt(this.DoctorID);
          this.commonService.data.NumberControl.IsActive = this.M_IsActive = true;
        }

        this.commonService.postData('NumberControl/InsertNum', this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.appComponent.modalCommonReset();
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Saved Successfully',
                showConfirmButton: false,
                timer: 2000
              });
            }
            else {
              this.appComponent.modalCommonReset();
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Invalid Input,Please Contact Administrator',
                showConfirmButton: false,
                timer: 2000
              });
            }
            this.Form.onReset();
            this.DisableFrom1 = false;
            this.hiddenEffectivTo = false;
            this.hiddenEffectiveFrom = true;
            this.hiddenNumberControl = true;
            this.hiddenNextFromDate = false;
            this.hiddenGridHelp = false;
            this.dataSourcepay.data = [];
            this.commonService.data.NumColgrid = [];
          });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Number Control Submit" + '/' + this.M_CmpID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }

  Updateclk(form: NgForm, M_VCID, M_RNumber) {
    debugger;
    try {
      if (M_RNumber == 0) {
        if (form.valid) {
          this.isInvalid = false;
          var CompanyID = localStorage.getItem("CompanyID");
          this.M_CmpID = CompanyID;
          this.commonService.data = new NmberControl();
          this.commonService.data.NumberControl.TransactionID = this.M_Description.Value;
          this.commonService.data.NumberControl.Description = this.M_Description.Text;
          this.commonService.data.NumberControl.CmpID = parseInt(localStorage.getItem("CompanyID"));
          this.commonService.data.NumberControl.LocationID = this.M_Location;
          this.commonService.data.NumberControl.Prefix = this.M_Prefix;
          this.commonService.data.NumberControl.Suffix = this.M_Suffix;
          this.commonService.data.NumberControl.RunningNumber = this.M_RunningNumber;
          this.commonService.data.NumberControl.EffectiveFrom = this.M_EffectiveFrom;
          this.commonService.data.NumberControl.UpdatedBy = parseInt(this.DoctorID);
          if (this.M_Autonumber == "Yes") {
            this.commonService.data.NumberControl.Autonumber = true;
          }
          else {
            this.commonService.data.NumberControl.Autonumber = false;
          }
          if (this.M_IsActive == "Yes") {
            this.commonService.data.NumberControl.IsActive = true;
          }
          else {
            this.commonService.data.NumberControl.IsActive = false;
          }
          this.commonService.postData("NumberControl/UpdateNum/" + M_VCID, this.commonService.data)
            .subscribe(data => {
              if (data.Success == true) {

                this.appComponent.modalCommonReset();
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Updated Successfully',
                  showConfirmButton: false,
                  timer: 2000
                });
                this.Form.onReset();
                this.DisableFrom1 = false;
                this.hiddenEffectivTo = false;
                this.hiddenEffectiveFrom = true;
                this.hiddenNumberControl = true;
                this.hiddenNextFromDate = false;
              }
              else {
                this.appComponent.modalCommonReset();
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Invalid Input,Please Contact Administrator',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
              //this.hiddenUpdateclk = false;
              //this.hiddenSubmit = true;
              //this.hiddenDelete = false;
              //this.hiddenIsActive = false;
              //this.hiddenNextFromDate = true;
              //this.hiddenEffectiveFrom = false;
              //this.DisableFrom1 = true;
              //this.hiddenNumberControl = false;
              //this.M_EffectiveFrom = "";
              //this.M_IsActive = "";
              //debugger;
              //this.M_EffectiveFrom1 = data.EffectiveTo;
            });
        }
      }

      else
      {
        if (form.valid) {
          this.isInvalid = false;
          var CompanyID = localStorage.getItem("CompanyID");
          this.M_CmpID = CompanyID;
          this.commonService.data = new NmberControl();
          this.commonService.data.NumberControl.TransactionID = this.M_Description.Value;
          this.commonService.data.NumberControl.Description = this.M_Description.Text;
          this.commonService.data.NumberControl.CmpID = parseInt(localStorage.getItem("CompanyID"));
          this.commonService.data.NumberControl.LocationID = this.M_Location;
          this.commonService.data.NumberControl.Prefix = this.M_Prefix;
          this.commonService.data.NumberControl.Suffix = this.M_Suffix;
          this.commonService.data.NumberControl.RunningNumber = this.M_RunningNumber;
          this.commonService.data.NumberControl.EffectiveFrom = this.M_EffectiveFrom;
          this.commonService.data.NumberControl.EffectiveTo = this.M_EffectiveTo;
          this.commonService.data.NumberControl.UpdatedBy = parseInt(this.DoctorID);
          if (this.M_Autonumber == "Yes") {
            this.commonService.data.NumberControl.Autonumber = true;
          }
          else {
            this.commonService.data.NumberControl.Autonumber = false;
          }
          if (this.M_IsActive == "Yes") {
            this.commonService.data.NumberControl.IsActive = true;
          }
          else {
            this.commonService.data.NumberControl.IsActive = false;
          }
          this.commonService.postData("NumberControl/UpdateNum/" + M_VCID, this.commonService.data)
            .subscribe(data => {
              if (data.Success == true) {

                this.appComponent.modalCommonReset();
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Updated Successfully',
                  showConfirmButton: false,
                  timer: 2000
                });







                this.commonService.data.NumberControl.LocationID = this.M_Location;
                this.commonService.data.NumberControl.Prefix = this.M_Prefix1;
                this.commonService.data.NumberControl.Suffix = this.M_Suffix1;
                this.commonService.data.NumberControl.RunningNumber = this.M_RunningNumber1;
                this.commonService.data.NumberControl.EffectiveFrom = this.M_EffectiveFrom1;
                this.commonService.data.NumberControl.CmpID = parseInt(localStorage.getItem("CompanyID"));
                this.commonService.data.NumberControl.TransactionID = this.M_Description1.Value;
                this.commonService.data.NumberControl.Description = this.M_Description1.Text;
                this.commonService.data.NumberControl.CreatedBy = parseInt(this.DoctorID);
                this.commonService.data.NumberControl.IsActive = this.M_IsActive1 = true;
                this.commonService.postData('NumberControl/InsertNum', this.commonService.data)
                  .subscribe(data => {
                    if (data.Success == true) {

                      this.appComponent.modalCommonReset();
                      Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Saved Successfully',
                        showConfirmButton: false,
                        timer: 2000
                      });
                      this.Form.onReset();
                      this.DisableFrom1 = false;
                      this.hiddenEffectivTo = false;
                      this.hiddenEffectiveFrom = true;
                      this.hiddenNumberControl = true;
                      this.hiddenNextFromDate = false;
                    }
                    else {
                      this.appComponent.modalCommonReset();
                      Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Invalid Input,Please Contact Administrator',
                        showConfirmButton: false,
                        timer: 2000
                      });
                    }
                  });
              }
              else {
                this.appComponent.modalCommonReset();
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Invalid Input,Please Contact Administrator',
                  showConfirmButton: false,
                  timer: 2000
                });
              }

              this.hiddenUpdateclk = false;
              this.hiddenSubmit = true;
              this.hiddenDelete = false;
              this.hiddenIsActive = false;
              this.hiddenEffectiveFrom = false;
              this.DisableFrom1 = true;
              this.hiddenNumberControl = false;
              this.M_EffectiveFrom = "";
              this.M_IsActive = "";
              this.hiddenNextFromDate = false;
              this.DisableNEffectiveFrom1 = false;
              this.modalSuccesssOk();
            });


        }

      }

    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Number Control Update" + '/' + this.M_CmpID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }

  modalDeleteOk(form: NgForm, M_VCID) {
    try {
      if (form.valid) {
        this.isInvalid = false;
        this.commonService.data = new NmberControl();
        if (this.M_IsDeleted == "Yes") {
          this.commonService.data.NumberControl.IsDeleted = true;
        }
        else {
          this.commonService.data.NumberControl.IsDeleted = false;
        }
        this.commonService.postData("NumberControl/DeleteNum/" + M_VCID, this.commonService.data)
          .subscribe(data => {
            if (data.Success == true) {

              this.appComponent.modalCommonReset();
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Deleted Successfully',
                showConfirmButton: false,
                timer: 2000
              });
            }
            else {
              this.appComponent.modalCommonReset();
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Invalid Input,Please Contact Administrator',
                showConfirmButton: false,
                timer: 2000
              });
            }
            this.Form.onReset();
            this.hiddenUpdateclk = false;
            this.hiddenSubmit = true;
            this.hiddenDelete = false;
            this.backdrop = 'none';
            this.Deleteblock = 'none';
          });
      }
    }
    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Number Control Delete" + '/' + this.M_CmpID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
  }


  Clicksch() {
    debugger;
    localStorage.setItem('helpname', 'NumberControl');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result.success) {
        let item = result.data;
        this.M_VCID = item.VCID
        if (item.Description != null) {
          let Desc = this.Trantypes.find(x => x.Text == item.Description)
          this.M_Description = Desc;
          this.M_Description1 = Desc;
        }
        this.M_CmpID = item.CmpID
        this.M_Location = item.Location;
        this.M_Prefix = item.Prefix
        this.M_Suffix = item.Suffix
        this.M_Prefix1 = item.Prefix
        this.M_Suffix1 = item.Suffix
        this.M_Autonumber = item.Autonumber
        this.M_Autonumber1 = item.Autonumber
        this.M_IsActive1 = "No"
        //if (this.M_Autonumber == true) {
        //  this.M_Autonumber = "Yes"
        //}
        //else {
        //  this.M_Autonumber = "No"
        //}
        this.M_Autonumber1 = "Yes"
        this.M_RunningNumber = item.RunningNumber
        this.M_RunningNumber1 = 0;
        this.M_EffectiveFrom = item.EffectiveFrom
        this.M_EffectiveTo = item.EffectiveTo
        this.M_IsActive = item.IsActive
        //if (this.M_IsActive == true) {
        //  this.M_IsActive = "Yes"
        //}
        //else {
        //  this.M_IsActive = "No"
        //}
        this.M_IsDeleted = item.IsDeleted
        //if (this.M_IsDeleted == true) {
        //  this.M_IsDeleted = "Yes"
        //}
        //else {
        //  this.M_IsDeleted = "No"
        //}
        if (this.M_RunningNumber != 0) {
          this.hiddenNextFromDate = true;
          this.DisableNEffectiveFrom1 = true;
          this.hiddenEffectivTo = true;
        }
        else {
          this.hiddenNextFromDate = false;
          this.hiddenEffectivTo = false;
          this.DisableNEffectiveFrom1 = false;
        }
      }
      this.hiddenUpdateclk = true;
      this.hiddenSubmit = false;
      this.hiddenDelete = true;
    
      this.hiddenIsActive = true;
      if (!result.success) {
        this.hiddenUpdateclk = false;
        this.hiddenSubmit = true;
        this.hiddenDelete = false;
        this.hiddenEffectivTo = false
        this.hiddenIsActive = false;
        this.Form.onReset();
      }
    });
  }

  //<----*Cancel Popup*---->

  Cancel() {
    debugger;
    if (this.M_Description != null || this.M_Autonumber != null || this.M_Prefix != null || this.M_RunningNumber != null ||
      this.M_Suffix != null || this.M_EffectiveFrom != null || this.M_EffectiveTo != null || this.commonService.data.NumColgrid.length > 0) {

      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Data Not Found',
        showConfirmButton: false,
        timer: 4000
      });
    }
  }
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.previewblock = 'none';
  }
  //modalSuccessClosessss1()
  //{
  //  debugger;
  //  this.backdrop = 'none';
  //  this.cancelblock = 'none';
  //  this.previewblock1 = 'none';
  //}
  modalSuccesssOk() {
    debugger;
    this.hiddenUpdateclk = false;
    this.hiddenSubmit = true;
    this.hiddenDelete = false;
    this.hiddenEffectivTo = false;
    this.hiddenIsActive = false;
    this.hiddenNextFromDate = false;
    this.DisableNEffectiveFrom1 = false;
    this.hiddenNumberControl = true;
    this.hiddenEffectiveFrom = true;
    this.DisableFrom1 = false;
    this.backdrop = 'none';
    this.cancelblock = 'none';
    this.hiddenGridHelp = false;
    this.dataSourcepay.data = [];
    this.commonService.data.NumColgrid = [];
    this.Form.onReset();
  }

  //<----*Delete Popup*---->

  Deleteclk() {
    this.backdrop = 'block';
    this.Deleteblock = 'block';
  }
  modalDeleteNo() {
    this.backdrop = 'none';
    this.Deleteblock = 'none';
  }
  modalDeleteClose() {
    debugger;
    this.backdrop = 'none';
    this.Deleteblock = 'none';
  }


  preview() {
    if (this.M_Prefix || this.M_Suffix || this.M_RunningNumber != null) {
      this.backdrop = 'block';
      this.previewblock = 'block';
    }
    else {
      this.appComponent.modalCommonReset();
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Invalid Input,Please Contact Administrator',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
  //previewblock1;
  //preview1()
  //{
  //  if (this.M_Prefix1 || this.M_Suffix1 || this.M_RunningNumber1 != null) {
  //    this.backdrop = 'block';
  //    this.previewblock1 = 'block';
  //  }
  //  else {
  //    this.appComponent.modalCommonReset();
  //    Swal.fire({
  //      position: 'center',
  //      type: 'warning',
  //      title: 'Invalid Input,Please Contact Administrator',
  //      showConfirmButton: false,
  //      timer: 2000
  //    });
  //  }
  //}


  SelectDescription() {
    debugger;
    var Description = this.M_Description.Value
    this.commonService.getListOfData('NumberControl/getNumberControl/' + parseInt(localStorage.getItem("CompanyID")) + '/' + Description).subscribe(data => {
      if (data.SurgeryDischarge.length > 0) {
        debugger;
        data.NumberControl;
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });


  }

  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Administrationlazy/NumberControl";
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
  EffectiveToEvent() {
    debugger;
    this.M_EffectiveTo;
    var date = new Date(this.M_EffectiveTo);
    var date1 = new Date(date.setDate(date.getDate() + 1));
    this.M_EffectiveFrom1 = date1;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  Clickschgrid()
  {
    debugger;
    this.commonService.data = new NmberControl();
    this.commonService.getListOfData('NumberControl/getgridNC/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
      if (data.NumColgrid.length > 0) {
        debugger;
        this.commonService.data.NumColgrid = data.NumColgrid;
        this.dataSourcepay.data = data.NumColgrid;
        this.hiddenGridHelp = true;
      }
      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Data Not Found',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }
  CloseGridHelp()
  {
    this.hiddenGridHelp = false;
    this.dataSourcepay.data = [];
    this.commonService.data.NumColgrid = [];
  }
  ChangeAutonumber(i, property: string, event) {
    debugger;
    this.commonService.data.NumColgrid[i].Autonumber = event.value;
    this.dataSourcepay.filteredData[i][property] = event.value;
    this.dataSourcepay._updateChangeSubscription();
  }
  ChangeIsActive(i, property: string, event)
  {
    debugger;
    this.commonService.data.NumColgrid[i].IsActive = event.value;
    this.dataSourcepay.filteredData[i][property] = event.value;
    this.dataSourcepay._updateChangeSubscription();
  }
  changeEffectiveFrom(id, property: string, event: any) {
    debugger;
    let result = event.target.value;
    this.commonService.data.NumColgrid[id][property] = result;
    this.dataSourcepay.filteredData[id][property] = result;
    this.dataSourcepay._updateChangeSubscription();
  }
  ChangePrefix(i, property: string, event)
  {
    debugger;
    let result = event.target.value;
    this.commonService.data.NumColgrid[i][property] = result;
    this.dataSourcepay.filteredData[i][property] = result;
    this.dataSourcepay._updateChangeSubscription();
  }
  ChangeRunningNumber(i, property: string, event) {
    debugger;
    let result = event.target.textContent;
    this.commonService.data.NumColgrid[i][property] = result;
    this.dataSourcepay.filteredData[i][property] = result;
    this.dataSourcepay._updateChangeSubscription();
  }
  ChangeSuffix(i, property: string, event) {
    debugger;
    let result = event.target.value;
    this.commonService.data.NumColgrid[i][property] = result;
    this.dataSourcepay.filteredData[i][property] = result;
    this.dataSourcepay._updateChangeSubscription();
  }
}
