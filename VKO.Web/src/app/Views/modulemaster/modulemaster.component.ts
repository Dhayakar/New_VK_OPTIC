import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { ModuleMasterView } from '../../Models/ViewModels/module-master-view';
import { NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';

import * as XLSX from 'xlsx';
import { SearchComponent } from '../search/search.component';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-modulemaster',
  templateUrl: './modulemaster.component.html',
  styleUrls: ['./modulemaster.component.less']
})
export class ModulemasterComponent implements OnInit {


  @ViewChild('sortCol1') sortCol1: MatSort;
  @ViewChild('sortCol2') sortCol2: MatSort;

  @ViewChild('ModuleMasterForm') Form: NgForm
  M_moduleDesc;
  M_parentmodule
  M_parentmoduleDesc;
  M_Type;
  M_parentModuleID;
  M_IsActive;
  M_TranType;
  Trantypes;
  ModuleTypes;
  showisActive: boolean = false;
  //displayedColumns: string[] = ['checked','ModuleDescription', 'ModuleType', 'ParentModule', 'IsActive'];
  //dataSource = new MatTableDataSource();

  displayedColumns1: string[] = ['ModuleDescription1'];
  dataSource1 = new MatTableDataSource();

  constructor(public commonService: CommonService<ModuleMasterView>, public dialog: MatDialog, private router: Router,) { }
  Pathname = "Administrationlazy/Modulemaster";
  disSubmit: boolean = true;
  disprint: boolean = true;
  accessdata;
  ngOnInit() {
    
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    if (Objdata.find(el => el.Parentmoduledescription === this.Pathname)) {
      this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") +
        '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
          this.commonService.data = data;
          debugger;
          this.accessdata = data.GetAvccessDetails;

          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disprint = false;
          } else {
            this.disprint = true;
          }
        });
      this.getdropdowns();
      localStorage.getItem("CompanyID");
      $(document).ready(function () {
        $("#myInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
    }
    else {

      Swal.fire({
        text: "Un-Authorized Access, Please contact Administrator",
        type: 'warning',
      });
      this.commonService.getListOfData('Common/Getlogdetailsstring/' +
        localStorage.getItem("CompanyID") + '/' + localStorage.getItem("Doctorname") + '/' + this.Pathname).subscribe(data => {
        this.router.navigate(['dash']);
      });


    }
   
  }


  accesspopup;
  Getformaccess() {
    debugger;
    this.commonService.getListOfData('Common/GetAccessdetailsstring/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + this.Pathname).subscribe(data => {
      debugger;
      this.accessdata = data.GetAvccessDetails;
      this.backdrop = 'block';
      this.accesspopup = 'block';
    });
  }
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }
  getdropdowns() {
    this.commonService.getListOfData('Common/GetTranTypes').subscribe(data => { this.Trantypes = data; });
  }


  backdrop;
  cancelblock;
  Cancel() {
    if (this.M_moduleDesc != null || this.M_Type != null || this.M_parentmodule != null ||
      this.M_parentmoduleDesc != null) {

      this.backdrop = 'block';
      this.cancelblock = 'block';


    }
    else {
      this.Form.onReset();
    }
  }

  modalClose() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CancelNo() {
    this.backdrop = 'none';
    this.cancelblock = 'none';

  }
  CancelYes() {
    debugger;

    this.backdrop = 'none';
    this.cancelblock = 'none';
    //this.hideParentmodule = false;
    //this.showisActive = false;
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Administrationlazy/Modulemaster']);
    });

  }


  ModuleMasterTable;
  SearchDet() {
    debugger;
    localStorage.setItem('helpname', 'ModuleMaster');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '60%',
      width: '95%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger;
        let item = result.data;
        this.M_ID = item.ModuleID;
        this.M_moduleDesc = item.ModuleDescription;
        this.M_Type = item.ModuleType;
        this.M_parentmoduleDesc = item.Parentmoduledescription;
        this.M_parentmodule = item.ParentModule;
        this.M_IsActive = item.IsActive.toString();

        debugger;
        if (item.TransactionID != null) {          
          let trantype = this.Trantypes.find(x => x.Value == item.TransactionID)
          this.M_TranType = trantype;
        }

        if (this.M_Type == "Module") {
          this.hideParentmodule = false;

        } else {
          this.hideParentmodule = true;
        }

        this.showisActive = true;

        debugger;
        this.commonService.getListOfData('Help/getModuleMasterDetails/' + parseInt(localStorage.getItem("CompanyID"))).subscribe(data => {
          debugger;
          if (data.getModuleMasDetails.length > 0) {
            debugger;
            this.UpdtID = data.getModuleMasDetails.find(x => x.ModuleID == this.M_ID).ParentModuleid1;
          }
        });
      }

    });


  }


  closeEnd() {
    this.ModuleMasterTable = 'none';
    this.backdrop = 'none';
  }
  M_tag;

  onSubmit(form: NgForm) {
    debugger;
    if (form.valid) {
      debugger;
      if (this.M_Type == "Form") {
        if ((this.M_Type == "Form") && (this.M_parentmodule == "" || this.M_parentmodule == null) && this.M_tag == null) {
          debugger;
          Swal.fire({
            type: 'warning',
            title: 'Select the parent Module!',
          });
        }
        else {
          this.commonService.data = new ModuleMasterView();
          this.commonService.data.CMPUID = localStorage.getItem("CompanyID");
          this.commonService.data.ModuleMaster.ModuleDescription = this.M_moduleDesc;
          this.commonService.data.ModuleMaster.ModuleType = this.M_Type;
          this.commonService.data.ModuleMaster.Parentmoduledescription = this.M_parentmoduleDesc;
          this.commonService.data.ModuleMaster.CmpID = parseInt(localStorage.getItem("CompanyID"));
          if (this.M_parentmodule == "") {
            this.commonService.data.ModuleMaster.ParentModuleid = 0;
          } else {
            this.commonService.data.ModuleMaster.ParentModuleid = this.M_parentModuleID;
            this.commonService.data.Description = this.M_parentmodule;
          }
          if (this.M_tag != null) {
            if (this.M_tag != "no") {
              if (this.M_TranType != null) {
                this.commonService.data.ModuleMaster.TransactionTypeID = this.M_TranType.Value;
                this.commonService.data.Tag = this.M_tag;
                this.commonService.postData('ModuleMaster/insertdata/', this.commonService.data).subscribe(data => {
                  debugger;
                  if (data.Success == true) {
                    Swal.fire({
                      position: 'center',
                      type: 'success',
                      title: 'Submitted!',
                      showConfirmButton: false,
                      timer: 2000
                    });
                  }
                  else {
                    Swal.fire({
                      position: 'center',
                      type: 'warning',
                      title: 'Invalid Data',
                      showConfirmButton: false,
                      timer: 2000
                    });
                  }

                  this.Form.onReset();
                  this.hideParentmodule = false;

                });
              }
              else {
                Swal.fire({
                  position: 'center',
                  type: 'warning',
                  title: 'Select Transaction Type',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
            } else {
              if (this.M_TranType != null) {
                this.commonService.data.ModuleMaster.TransactionTypeID = this.M_TranType.Value;
              }
                this.commonService.data.Tag = this.M_tag;
                this.commonService.postData('ModuleMaster/insertdata/', this.commonService.data).subscribe(data => {
                  debugger;
                  if (data.Success == true) {
                    Swal.fire({
                      position: 'center',
                      type: 'success',
                      title: 'Submitted!',
                      showConfirmButton: false,
                      timer: 2000
                    });
                  }
                  else {
                    Swal.fire({
                      position: 'center',
                      type: 'warning',
                      title: 'Invalid Data',
                      showConfirmButton: false,
                      timer: 2000
                    });
                  }

                  this.Form.onReset();
                  this.hideParentmodule = false;

                });                           
            }

          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Select Number Control Tag',
              showConfirmButton: false,
              timer: 2000
            });
          }
        }
      } else {
        if ((this.M_Type == "Form") && (this.M_parentmodule == "" || this.M_parentmodule == null) && this.M_tag == null) {
          debugger;
          Swal.fire({
            type: 'warning',
            title: 'Select the parent Module!',
          });
        }
        else {
          this.commonService.data = new ModuleMasterView();
          this.commonService.data.CMPUID = localStorage.getItem("CompanyID");
          this.commonService.data.ModuleMaster.ModuleDescription = this.M_moduleDesc;
          this.commonService.data.ModuleMaster.ModuleType = this.M_Type;
          this.commonService.data.ModuleMaster.Parentmoduledescription = this.M_parentmoduleDesc;
          this.commonService.data.ModuleMaster.CmpID = parseInt(localStorage.getItem("CompanyID"));
          if (this.M_parentmodule == "") {
            this.commonService.data.ModuleMaster.ParentModuleid = 0;
          } else {
            this.commonService.data.ModuleMaster.ParentModuleid = this.M_parentModuleID;
            this.commonService.data.Description = this.M_parentmodule;
          }
            if (this.M_TranType != null) {
              this.commonService.data.ModuleMaster.TransactionTypeID = this.M_TranType.Value;
            }
              this.commonService.data.Tag = this.M_tag;
              this.commonService.postData('ModuleMaster/insertdata/', this.commonService.data).subscribe(data => {
                debugger;
                if (data.Success == true) {
                  Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Submitted!',
                    showConfirmButton: false,
                    timer: 2000
                  });
                }
                else {
                  Swal.fire({
                    position: 'center',
                    type: 'warning',
                    title: 'Invalid Data',
                    showConfirmButton: false,
                    timer: 2000
                  });
                }

                this.Form.onReset();
                this.hideParentmodule = false;

              });
        }
      }

    }

  }
  transactionpopup;
  AddNewtransaction() {
    this.backdrop = 'block';
    this.transactionpopup = 'block';
  }

  Cancelpopup() {
    this.backdrop = 'none';
    this.transactionpopup = 'none';
    this.commonService.getListOfData('Common/GetTranTypes').subscribe(data => { this.Trantypes = data; });
  }
  M_transactiondexription;

  onUpdatetransaction() {

  }
  ParentmdlnamePopUp;
  parentSearch() {
    debugger;
    this.commonService.getListOfData('ModuleMaster/getParentModuleName/' + localStorage.getItem("CompanyID") + '/' + this.M_Type).subscribe(data => {
      debugger;
      if (data.getparentName.length > 0) {
        debugger;
        this.backdrop = "block";
        this.ParentmdlnamePopUp = "block";
        this.commonService.data.getparentName = data.getparentName;
        this.dataSource1.data = this.commonService.data.getparentName;
        this.dataSource1.sort = this.sortCol2;
      }
    });


  }

  modalClose1() {
    this.ParentmdlnamePopUp = "none";
    this.backdrop = "none";
  }
  hideParentmodule: boolean = false;

  Showparentmodule() {
    this.hideParentmodule = true;
  }
  hidearentmodule() {
    debugger;
    this.hideParentmodule = false;
    this.M_parentmodule = "";

  }

  hidemainarentmodule() {
    this.hideParentmodule = false;
    this.M_parentmodule = "";
  }

  BindParentName(element) {
    debugger;
    this.M_parentmodule = element.ModuleDescription1;
    this.M_parentModuleID = element.ModuleID1;
    this.UpdtID = this.M_parentModuleID;
    this.ParentmdlnamePopUp = "none";
    this.backdrop = "none";
  }


  NameField(event): boolean {
    debugger;
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32 || charCode == 9 || charCode == 8 || charCode == 47) {
      return true;
    }
    return false;
  }

  M_ID;
  UpdtID;
  BindSearchDet(element) {
    debugger;





    this.ModuleMasterTable = "none";
    this.backdrop = "none";

  }


  onUpdate(form: NgForm, M_ID) {
    debugger;
    if (form.valid) {

      if (this.M_ID == this.M_parentModuleID) {
        Swal.fire({

          type: 'warning',
          title: 'Child and parent were same!',

        });
      }
      else if ((this.M_Type == "Form") && (this.M_parentmodule == "" || this.M_parentmodule == null)) {

        debugger;
        Swal.fire({
          type: 'warning',
          title: 'Select the parent Module!',
        });
      }

      else {

        this.commonService.data = new ModuleMasterView();

        this.commonService.data.ModuleMaster.ModuleDescription = this.M_moduleDesc;
        this.commonService.data.ModuleMaster.ModuleType = this.M_Type;
        this.commonService.data.ModuleMaster.Parentmoduledescription = this.M_parentmoduleDesc;
        if (this.M_TranType != null) {
          this.commonService.data.ModuleMaster.TransactionTypeID = this.M_TranType.Value;
        }
        this.commonService.data.ModuleMaster.IsActive = this.M_IsActive;
        this.commonService.data.ModuleMaster.CmpID = parseInt(localStorage.getItem("CompanyID"));

        if (this.M_parentmodule == "" || this.M_parentmodule == null) {
          this.commonService.data.ModuleMaster.ParentModuleid = 0;

        } else {
          this.commonService.data.ModuleMaster.ParentModuleid = this.UpdtID;
        }
        this.commonService.postData("ModuleMaster/updatedata/" + this.M_ID, this.commonService.data).subscribe(data => {
          debugger;
          if (data.Success == true) {
            debugger;
            //this.appComponent.modalCommonReset();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Updated Successfully',
              showConfirmButton: false,
              timer: 2000
            });
          }
          else {
            //this.appComponent.modalCommonReset();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Some Data Is Missing',
              showConfirmButton: false,
              timer: 2000
            });
          }

          this.showisActive = false;
          this.Form.onReset();


        });

      }
    }


  }


  @ViewChild('M_table') M_table: ElementRef;
  @ViewChild('table') table: ElementRef;

  getPdf() {
    debugger;
    var data = document.getElementById('M_table');
    html2canvas(data).then(canvas => {
      var imgWidth = 215;
      var pageHeight = 55;
      //var imgHeight = canvas.height * imgWidth / canvas.width;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4');  // A4 size page of PDF  
      var position = 5;
      //pdf.addImage(contentDataURL, 'PDF', -2, position, imgWidth, imgHeight)
      //pdf.save('Module_Master_Details.pdf');  // Generated PDF   
    });
  }



  getExcel() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'Module_Master_Details.xlsx');

  }


  //applyFilter(FilterValue: String) {

  //  debugger;
  //  this.dataSource.filter = FilterValue.trim().toLowerCase();

  //}

}

