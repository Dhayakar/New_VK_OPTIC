import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDialog } from '@angular/material';
import { BusinessRule } from 'src/app/Models/BusinessRule';
import { BusinessRuleD, BusinessRT, IcdSPYarray } from 'src/app/Models/ViewModels/BusinessRuleViewModel';
import { CommonService } from 'src/app/shared/common.service';
import Swal from 'sweetalert2'
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { BusinessRuleTran } from 'src/app/Models/BusinessRuleTran';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';




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
  selector: 'app-business-rule',
  templateUrl: './business-rule.component.html',
  styleUrls: ['./business-rule.component.less'],
  providers: [


    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})


export class BusinessRuleComponent implements OnInit {

  MinWEFDate = new Date();
  @ViewChild('BusinessRule') Form: NgForm
  userid;
  cmpid;
  M_ModuleDescription;
  M_BRbasedon;
  M_From;
  M_To;
  M_Days;
  M_Amount;
  M_WEFDate;
  MVFrom: number
  HiddenDays = false;
  HiddenVisit = false;
  disableBRbasedon = false;
  hiddenMDescription = false;
  hiddenEffectivedatedetails = false;
  disableMdate = false;
  Hiddentable = false;
  requiredFT: boolean;
  requiredDays: boolean;
  HiddenBRDetails = false;
  ModuleDescription;
  disableSubmit = true;
  disableSearch = true;
  ICDSpeciality;
  constructor(public commonService: CommonService<BusinessRuleD>, private router: Router, public dialog: MatDialog,) {

  }

  getAllDropdowns()
  {
    this.commonService.getListOfData('Common/GetBRModuleDescription/' + this.cmpid).subscribe(data => { this.ModuleDescription = data; });
    this.commonService.getListOfData('Common/GetICDSpecialityDescription/').subscribe(data => { this.ICDSpeciality = data; });
  }
  displayedColumnsBR: string[] = ['SLNO', 'From', 'To', 'Amount', 'NODays', 'Delete']
  displayedColumnsBR2: string[] = ['SLNO', 'From', 'To', 'Amount', 'NODays', 'Delete']
  displayedColumnsBR1: string[] = ['SLNO', 'Amount', 'NODays', 'Delete']
  dataSourceBR = new MatTableDataSource();


  displayedColumnbussR: string[] = ['ModuleDescription', 'SpecialityDescription','EffectiveDate', 'Action']
  dataSourcebussR = new MatTableDataSource();


  accessdata;
  CompanyID;
  docotorid;
  Country1;
  Country2;
  Country3;
  ngOnInit() {
    this.CompanyID = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    //////////////////////////////////////////////////////////////////////////////////
    var Pathname = "Administrationlazy/BusinessRule";
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
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
          } else {
            this.disableSearch = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  //this.Disableprint = false;
          //  this.DisableReprint = false;
          //} else {
          //  //this.Disableprint = true;
          //  this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////














        this.M_From = 1;
        this.commonService.data = new BusinessRuleD();
        this.userid = localStorage.getItem('userroleID');
        this.cmpid = localStorage.getItem("CompanyID");
        this.getAllDropdowns();
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });

      }
      else {

        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "BusinessRule").subscribe(data => {
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
            this.disableSubmit = false;
          } else {
            this.disableSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disableSearch = false;
          } else {
            this.disableSearch = true;
          }
          //if (this.accessdata.find(x => x.Print == true)) {
          //  //this.Disableprint = false;
          //  this.DisableReprint = false;
          //} else {
          //  //this.Disableprint = true;
          //  this.DisableReprint = true;
          //}
          //if (this.accessdata.find(x => x.Delete == true)) {
          //  this.disableDelete = false;
          //} else {
          //  this.disableDelete = true;
          //}
        });

        //////////////////////////////////////////////////////////////////////////////














        this.M_From = 1;
        this.commonService.data = new BusinessRuleD();
        this.userid = localStorage.getItem('userroleID');
        this.cmpid = localStorage.getItem("CompanyID");
        this.getAllDropdowns();
        this.commonService.getListOfData('Common/GetCurrencyvalues/' + localStorage.getItem('CompanyID')).subscribe(data => {
          debugger;
          this.Country1 = data;
          this.Country2 = this.Country1[0].Text;
          this.Country3 = this.Country1[0].Value;
        });

      }
      else {

        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Un-Authorized Access, Please contact Administrator',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },
        });
        this.commonService.getListOfData('Common/Getlogdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + "BusinessRule").subscribe(data => {
          this.router.navigate(['dash']);
        });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////


  }

  /*  Validation */
  RestrictNegativeValues(e): boolean {
    debugger;
    if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
      return false;
    }
  }
  //v;
  BRBASEDON()
  {
    debugger;
    this.commonService.data = new BusinessRuleD();
    var BRule = new BusinessRuleTran();
    if (this.M_BRbasedon != null)
    {
      if (this.M_BRbasedon == "Visit") {
        this.HiddenDays = true;
        this.HiddenVisit = true;
        this.requiredFT = true;
        this.requiredDays = true;
        this.displayedColumnsBR = this.displayedColumnsBR2;
        this.Hiddentable = true;
        this.M_From = 1;
   

        BRule.From = this.M_From;
        BRule.TO;
        BRule.NODays;
        BRule.Amount;
      
        this.commonService.data.BusinessRT.push(BRule);
        this.dataSourceBR.data = this.commonService.data.BusinessRT;
        this.disableBRbasedon = true;
        this.disableMdate = true;
      }
      else {
        this.M_From = null;
        this.M_To = null;
        this.requiredDays = true;
        this.requiredFT = false;
        this.Hiddentable = true;
        this.HiddenVisit = false;
        this.HiddenDays = true;
        this.displayedColumnsBR = this.displayedColumnsBR1;
        //
        BRule.NODays;
        BRule.Amount;
        this.commonService.data.BusinessRT.push(BRule);
        this.dataSourceBR.data = this.commonService.data.BusinessRT;
        this.disableBRbasedon = false;
        this.disableMdate = false;
        this.M_From = 1;
        //
      }
    }
  }
 

  changeValue(id, property: string, event: any)
  {
    debugger;

 
    if (property == "TO") {
      let result1: number = Number(event.target.value);
      this.dataSourceBR.filteredData[id][property] = result1;
      this.dataSourceBR._updateChangeSubscription();
      this.temp = result1;
    }
    else
    {
      let result: number = Number(event.target.value);
      this.dataSourceBR.filteredData[id][property] = result;
      this.dataSourceBR._updateChangeSubscription();
    }
  } 
  temp = 0;
  AddBR(item)
  {
    debugger;
    var BRule = new BusinessRuleTran();
    if (this.M_BRbasedon == "Visit") {
      this.M_From = item.From;
      if (item.TO >= this.M_From) {
        this.M_From = + item.TO + 1;
        BRule.From = this.M_From;
        BRule.TO;
        BRule.NODays;
        BRule.Amount;
        this.commonService.data.BusinessRT.push(BRule);
        this.dataSourceBR.data = this.commonService.data.BusinessRT;
        this.disableBRbasedon = true;
        this.disableMdate = true;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'TO column is not a valid data!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container'
          },

        });
      }
    }
       else {
        BRule.NODays;
        BRule.Amount;
        this.commonService.data.BusinessRT.push(BRule);
        this.dataSourceBR.data = this.commonService.data.BusinessRT;
        this.disableBRbasedon = false;
        this.disableMdate = false;
        this.M_From = 1;
      }
  }
  DeleteBR(item, i) {
    debugger;


    if (item.From == 1)
    {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Not a valid data!',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container'
        },
      });
      return
    }



    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No',
      allowOutsideClick: false,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          debugger;
          this.dataSourceBR.data.splice(i, 1);
          this.dataSourceBR._updateChangeSubscription();
          this.commonService.data.BusinessRT.splice(i, 1);
          this.M_From =(this.commonService.data.BusinessRT[this.commonService.data.BusinessRT.length - 1].From)
          

        }
        Swal.fire
        (
          'Deleted!',
        )
      }
    })
  }
  M_ICDSpeciality;
  busstrandat;
  Submit(form: NgForm)
  {
    debugger;
    try {
      if (form.valid) {
        if (this.temp >= this.M_From) {
            this.commonService.data = new BusinessRuleD();
            this.commonService.data.BusinessRule.WEF = this.M_WEFDate;
            this.commonService.data.BusinessRule.ModuleDescription = this.M_ModuleDescription.Text;
            this.commonService.data.BusinessRule.ModuleID = this.M_ModuleDescription.Value;
            this.commonService.data.BusinessRule.BRBasedOn = this.M_BRbasedon;
            this.commonService.data.BusinessRule.CMPID = this.cmpid;
          this.commonService.data.BusinessRule.CreatedBy = this.userid;

          this.busstrandat=this.dataSourceBR.data;
          this.commonService.data.BusinessRT = this.busstrandat;
          if (this.M_ICDSpeciality != undefined ) {
            for (var i = 0; i < this.M_ICDSpeciality.length; i++) {
              if (this.M_ICDSpeciality.length > 0) {
                var icdSp = new IcdSPYarray();
                icdSp.ICDSPYDescription = this.M_ICDSpeciality[i].Text;
                icdSp.id = this.M_ICDSpeciality[i].Value;
                this.commonService.data.IcdSPYarray.push(icdSp);

              }
            }

          }

       




          this.commonService.postData('BusinessRule/InsertBusinessRule/' + localStorage.getItem("CompanyID") + '/' + this.BRID, this.commonService.data)
              .subscribe(data => {
                if (data.Success == true) {
                  Swal.fire({

                   type: 'success',
                   title: 'success',
                   text: 'Saved Successfully',
                   position: 'top-end',
                   showConfirmButton: false,
                   timer: 2500,
                   customClass: {
                     popup: 'alert-warp',
                     container: 'alert-container'
                   },
                  });
                  this.Hiddentable = false;
                  this.HiddenDays = false;
                  this.HiddenVisit = false;
                  this.disableBRbasedon = false;
                  this.disableMdate = false;
                  this.hiddenMDescription = false;
                  this.commonService.data.BusinessRT = [];
                  this.Form.onReset();
                }
                else {   
                  Swal.fire({
                    type: 'warning',
                    title: 'warning',
                    text: 'Some Data Missing',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2500,
                    customClass: {
                      popup: 'alert-warp',
                      container: 'alert-container'
                    },
                  });
                }
              });
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'TO column is not a valid data!',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },

          });
        }

      }



    }

    catch (Error) {
      alert(Error.message);

      this.commonService.getListOfData('Common/ErrorList/' + Error.message + '/' + "Users List" + '/' + this.CompanyID + '/' + this.docotorid + '/')
        .subscribe(data => {
          debugger;

        });
    }
    }
  backdrop;
  Updateblock;
  hiddenicdspy = false;
  MDescription()
  {
    var MD;
    debugger;
    var EFDate=null
    this.commonService.getListOfData('BusinessRule/GetBRMDescription/' + this.cmpid + '/' + this.M_ModuleDescription.Value + '/' + EFDate ).subscribe(data =>
    {
      debugger;
      MD = data.ModuleDescription;
     var icsspydep = data.icdspyModuleDescription;
      if (MD != "post operative") {
        if (this.M_ModuleDescription.Text == MD) {
          this.backdrop = 'block';
          this.Updateblock = 'block';
        }
        else {
          this.hiddenMDescription = true;
        }
      }
      else
      {
        this.commonService.getListOfData('Common/GetICDSpecialityDescription').subscribe(data => {
          debugger;
          let dm = data;
          this.commonService.data.icdspyModuleDescription = icsspydep;
          var H = this.commonService.data.icdspyModuleDescription;
          var b = dm.filter((c) => H.every((balanceCode) => balanceCode.ICDCODE !== c.Value));
          this.ICDSpeciality = b;
          this.hiddenMDescription = true;
        });
      }

    });

    if (this.M_ModuleDescription.Text == "post operative")
    {
      this.hiddenicdspy = true;
    }
    else
    {
      this.hiddenicdspy = false;
    }

  }
  //IcdSpyDescription()
  //{
  //  debugger;
  //  var MD;
  //  debugger;
  //  var EFDate = null
  //  this.commonService.getListOfData('BusinessRule/GetBRMDescription/' + this.cmpid + '/' + this.M_ICDSpeciality.Value + '/' + EFDate).subscribe(data => {
  //    debugger;
  //    MD = data.icdspyModuleDescription;

  //    if (this.M_ICDSpeciality.Value == MD) {
  //      this.backdrop = 'block';
  //      this.Updateblock = 'block';
  //    }
  //    else {
  //      this.hiddenMDescription = true;
  //    }

  //  });

  //}
  BRClose()
  {
    this.backdrop = 'none';
    this.Updateblock = 'none';
    this.hiddenMDescription = false;  
  }
  BRNo()
  {
    this.hiddenMDescription = false;  
    this.backdrop = 'none';
    this.Updateblock = 'none';
  }
  BRYes()
  {
    this.hiddenMDescription = true;
    this.backdrop = 'none';
    this.Updateblock = 'none';
  }
  MoDescription;
  EFDate;


  //Clicksch() {
  //  debugger;
  //  this.backdrop = 'none';
  //  this.Updateblock = 'none';
  //    localStorage.setItem('helpname', 'BusinessRule');
      
  //    const dialogRef = this.dialog.open(SearchComponent, {
  //      height: '70%',
  //      width: '85%',
  //      disableClose: true,
  //    });
  //    debugger;
  //    dialogRef.afterClosed().subscribe(result => {
  //      debugger;
  //      if (result.success) {
  //        this.commonService.data = new BusinessRuleD();
  //        let item = result.data;
  //        this.M_WEFDate = item.EffectiveDate;
  //        let EFDate1 = item.EffectiveDate;
  //        let EFDate2 = new Date(EFDate1);
  //        this.EFDate = EFDate2.toISOString();
  //        this.MoDescription = item.ModuleDescription;
  //        this.commonService.getListOfData("BusinessRule/GetBRMDescription/" + this.cmpid + '/' + item.ID + '/' + this.EFDate).subscribe(data => {
  //          debugger;
  //          data.BusinessRT1;
  //          this.commonService.data.BusinessRT1 = data.BusinessRT1;
  //          this.M_WEFDate=this.commonService.data.BusinessRT1[0].WEF;
  //          this.dataSourceBR.data = this.commonService.data.BusinessRT1;



  //          this.commonService.data.BusinessRT = this.commonService.data.BusinessRT1;
  //          var array = this.commonService.data.BusinessRT;
  //          var val = array[array.length - 1];
  //          this.temp = val.TO;
  //        });
  
  //        this.M_BRbasedon = "Visit";
  //        if (item.ModuleID != null) {
  //          let lnn = this.ModuleDescription.find(x => x.Value == item.ModuleID)
  //          this.M_ModuleDescription = lnn;
  //        }
  //        else {
  //          this.M_ModuleDescription = '';
  //        }
  //        this.hiddenMDescription = true;
  //        this.Hiddentable = true;
  //      }
  //      else
  //      {
      
  //      }
  //    });
  //  this.commonService.data = new BusinessRuleD();
  //}




  closeBRDetails()
  {
    debugger;
    this.HiddenBRDetails = false;
  }
  cancelblock;
  Cancel() {
    if (this.M_WEFDate != null || this.M_ModuleDescription != null || this.M_Amount != null || this.M_BRbasedon != null || this.M_To != null ||
      this.M_Days != null)
    {
      
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }

  }
  BRCancelClose()
  {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  BRCancelCloseNo()
  {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  BRCancelCloseYes()
  {
    this.Hiddentable = false;
    this.HiddenDays = false;
    this.HiddenVisit = false;
    this.disableBRbasedon = false;
    this.disableMdate = false;
    this.hiddenMDescription = false;
    this.commonService.data.BusinessRT = [];
    this.Form.onReset();
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }

  Editruleblock;
  Editrule()
  {
    debugger;
    this.backdrop = 'block';
    this.Editruleblock = 'block';
  }

  BREditCloseYes()
  {
    this.commonService.data.BusinessRT = this.commonService.data.BusinessRT1;
    this.dataSourceBR.data = this.commonService.data.BusinessRT;
    this.HiddenBRDetails = false;
    this.backdrop = 'none';
    this.Editruleblock = 'none';
  }
  BREditCloseNo()
  {
    this.backdrop = 'none';
    this.Editruleblock = 'none';
  }
  BREditClose()
  {
    this.backdrop = 'none';
    this.Editruleblock = 'none';
  }
//////////////////////////////////////////////////////////////
  accesspopup;

  Getformaccess() {
    debugger;
    var Pathname = "Administrationlazy/BusinessRule";
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
  else  if (sstring == true) {
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

  bussinessRdata;
  bussinessRdata1;
  BusinessRuleDetailsPopUp;
  maxValue;
  maxIndex;
  Clicksch()
  {
    this.commonService.getListOfData('Help/getBusinessRule/' + parseInt(localStorage.getItem('CompanyID')) + '/' + 0).subscribe(data => {
      debugger;
      if (data.getBusinessRule2 != null) {
        this.bussinessRdata = data.getBusinessRule2;
       //this.commonService.data = data;
        this.dataSourcebussR.data = this.bussinessRdata;
        this.BusinessRuleDetailsPopUp = 'block';
        this.backdrop = 'block';
        this.hiddenicdspy = false;
      }
    });
     
  }


  moduleD;
  moduleDS;
  bussinessdata(x) {
    debugger;
    this.commonService.getListOfData('Help/getBusinessRule/' + parseInt(localStorage.getItem('CompanyID')) + '/' + x.ID).subscribe(data => {
      debugger;
      if (data.getBusinessRule1 != null) {
        this.bussinessRdata1 = data.getBusinessRule1;
      }
    });

    if (x.ModuleDescription == "Registration") {
      this.moduleD = x.ModuleDescription;
      this.moduleDS = " ";
      this.hiddenEffectivedatedetails = true; 
    }
    else {
      this.moduleD = x.ModuleDescription;
      this.moduleDS = " " +"for" + " " + x.icdspy;
      this.hiddenEffectivedatedetails = true;
      }
 
  }




  BusinessRulePopUpClose()
  {
    this.BusinessRuleDetailsPopUp = 'none';
    this.backdrop = 'none';
    this.bussinessRdata1 = [];
    this.dataSourcebussR.data = [];
    this.moduleD = "";
    this.moduleDS = "";
    this.hiddenEffectivedatedetails = false;
  }
  BRID;
  selectDrop(element)
  {
    debugger;
    this.BRID= element.ID
    this.M_WEFDate = element.EffectiveDate;
    let EFDate1 = element.CreatedUTC;
    let EFDate2 = new Date(EFDate1);
    this.EFDate = EFDate2.toISOString();
    this.MoDescription = element.ModuleDescription;
    this.commonService.getListOfData("BusinessRule/GetBRMDescription/" + this.cmpid + '/' + element.ID + '/' + EFDate1).subscribe(data => {
            debugger;
            data.BusinessRT1;
            this.commonService.data.BusinessRT1 = data.BusinessRT1;
            this.M_WEFDate=this.commonService.data.BusinessRT1[0].WEF;
            this.dataSourceBR.data = this.commonService.data.BusinessRT1;
            this.commonService.data.BusinessRT = this.commonService.data.BusinessRT1;
            var array = this.commonService.data.BusinessRT;
            var val = array[array.length - 1];
      this.temp = val.TO;
      this.BusinessRuleDetailsPopUp = 'none';
      this.backdrop = 'none';
      //this.maxValue = this.commonService.data.BusinessRT1.;
      //this.maxIndex = this.bussinessRdata.ToList().IndexOf(this.maxValue);
          });
    this.M_BRbasedon = "Visit";
    if (element.ModuleID != null) {
      let lnn = this.ModuleDescription.find(x => x.Value == element.ModuleID)
            this.M_ModuleDescription = lnn;
          }
          else {
            this.M_ModuleDescription = '';
          }
    this.hiddenMDescription = true;
    this.Hiddentable = true;
    this.bussinessRdata1 = [];
    this.dataSourcebussR.data = [];
    //this.moduleD = "";
    //this.moduleDS = "";
    this.hiddenEffectivedatedetails = false;
  }

}
