import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonService } from '../../shared/common.service';
import { CompanyMasterView, getCompModuless, getNumbercontrolModules } from '../../Models/ViewModels/company-master-view.model';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas'

import * as XLSX from 'xlsx';
import { text } from '@angular/core/src/render3';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { SelectionModel } from '@angular/cdk/collections';
import { array } from '@amcharts/amcharts4/core';


@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.less']
})
export class CompanyMasterComponent implements OnInit {

  @ViewChild('sortCol1') sortCol1: MatSort;
  @ViewChild('sortCol2') sortCol2: MatSort;

  Emailvalid = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  displayedColumns: string[] = ['companyName','branchname'];
  dataSource = new MatTableDataSource();
  dataSourceNumbercontrol = new MatTableDataSource();
  dataSourceModules = new MatTableDataSource();

  dataSource1 = new MatTableDataSource();

  @ViewChild('CompanyForm') Form: NgForm
  C_CmpID;
  C_CompanyName;
  C_Location;
  C_Email;
  C_Address1;
  C_GSTNo;
  C_Address2;
  C_Phone1;
  C_Address3;
  C_Phone2;
  C_ContactPerson;
  C_CompanyGroup;
  C_Website;
  Locations;
  M_location;
  DisabledREV = false;
  disableLOC = true;
  Cityname;
  //email = '';
  constructor(public commonService: CommonService<CompanyMasterView>,
    private router: Router, public dialog: MatDialog) {

  }

  displayedColumnsModuyles: string[] = ['select', 'position'];

  applyFilters(filterValue: string) {
    this.dataSourceModules.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceModules.paginator) {
      this.dataSourceModules.paginator.firstPage();
    }
  }


  applyFiltersnumber(filterValue: string) {
    this.dataSourceNumbercontrol.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceNumbercontrol.paginator) {
      this.dataSourceNumbercontrol.paginator.firstPage();
    }
  }




  selection = new SelectionModel(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceModules.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  @ViewChild(MatPaginator, { read: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { read: true }) sort: MatSort;
  CompanyModules;
  Hidenumgercointrol: boolean = false;
  ngOnInit() {
    debugger;
    this.Hidenumgercointrol = true;
    this.commonService.data = new CompanyMasterView();
    this.getdropdowns();
    this.dataSourceModules.paginator = this.paginator;
    this.dataSourceModules.sort = this.sort;
  }
  displayedColumns1: string[] = ['checked', 'CompanyName', 'Address1', 'Address2', 'Address3', 'LocationName', 'ContactPerson', 'GSTNo', 'CompanyGroup', 'Phone1', 'EmailID', 'Website'];
  displayedColumns2: string[] = ['Sno', 'Description', 'Prefix', 'RunningNumber', 'suffix'];
  getdropdowns() {
    debugger;
    this.commonService.getListOfData('Common/Getlocationcityvalues').subscribe(data => { this.Cityname = data; });
    this.commonService.getListOfData('Common/GetLocvalues').subscribe(data => {
      debugger;
      this.Locations = data;
    });
    this.commonService.getListOfData('CompanyMaster/SelectModules').subscribe(data => {
      debugger;
      this.CompanyModules = data.MMT;
      this.dataSourceModules.data = this.CompanyModules;
    });
    this.commonService.getListOfData('CompanyMaster/SelecNumberControldata').subscribe(data => {
      debugger;
      this.CompanyModules = data.getNumbercontrolModules;
      this.dataSourceNumbercontrol.data = this.CompanyModules;
    });
  }


  ActchangeValue(id, property: string, event: any) {

    debugger;
    let result = event.target.textContent;
    this.dataSourceNumbercontrol.filteredData[id][property] = result;
    this.dataSourceNumbercontrol._updateChangeSubscription();

  }

  ActSuffixchangeValue(id, property: string, event: any) {
    debugger;

    let result = event.target.textContent;
    this.dataSourceNumbercontrol.filteredData[id][property] = result;
    this.dataSourceNumbercontrol._updateChangeSubscription();

  }
  numberarray = [];
  //Getshpowdata() {
  //  debugger;
  //  this.commonService.data = new CompanyMasterView();
  //  this.numberarray = this.dataSourceNumbercontrol.data;

  //  if (this.numberarray.length != 0) {
  //    for (var i = 0; i < this.numberarray.length; i++) {
  //      var numbermall = new getNumbercontrolModules();
  //      numbermall.Desc = this.numberarray[i].Desc;
  //      numbermall.RunningNumber = this.numberarray[i].RunningNumber;
  //      numbermall.Prefix = this.numberarray[i].Prefix;
  //      numbermall.Suffix = this.numberarray[i].Suffix;
  //      this.commonService.data.getNumbercontrolModules.push(numbermall);
  //    }
  //  }
  //}



  Locationname;
  State;
  Cityy;
  Country;
  Citysumbit() {
    debugger;
    this.commonService.getListOfData('RegistrationMaster/GetlocationDetails/' + this.Cityy + '/')
      .subscribe((data: any) => {
        debugger;

        this.State = data.ParentDescriptionstate;
        this.Country = data.ParentDescriptioncountry;
        if (this.State != null) {
          this.disableLOC = false;
        }
        else {
          this.disableLOC = true;
        }
      });
    debugger;
    this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
      debugger;
      this.Locationname = data;
    });
  }

  selectedall = [];
  selectedallget = [];
  masterToggle() {
    debugger;
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceModules.data.forEach(row => this.selection.select(row));
    this.selectedall.push(this.dataSourceModules.data);


  }





  backdrop;
  cancelblock;
  CmpyNamePopUp;

  Cancel() {
    debugger;
    if (this.C_CompanyName != null || this.C_Location != null || this.C_Email != null ||
      this.C_Address1 != null || this.C_GSTNo != null || this.C_Address2 != null ||
      this.C_Address3 != null || this.C_Phone1 != null || this.C_Phone2 != null ||
      this.C_ContactPerson != null || this.C_CompanyGroup != null) {

      this.backdrop = 'block';
      this.cancelblock = 'block';

    }
    else {
      this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
        this.router.navigate(['Administrationlazy/CompanyMaster']);
      });
    }
  }

  modalClose() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  Cancel_No() {

    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';

  }
  CancelYes() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Administrationlazy/CompanyMaster']);
    });
  }


  res1;
  onSubmit(form: NgForm) {
    debugger;
    var c: any = localStorage.getItem("CompanyID");

    if (localStorage.getItem("CompanyID") != null) {
      if (form.valid) {
        debugger;
        this.commonService.data = new CompanyMasterView();
             this.numberarray = this.dataSourceNumbercontrol.data;
        if (this.numberarray.length != 0) {
          for (var i = 0; i < this.numberarray.length; i++) {
            var numbermall = new getNumbercontrolModules();
            numbermall.Desc = this.numberarray[i].Desc;
            numbermall.RunningNumber = this.numberarray[i].RunningNumber;
            numbermall.Prefix = this.numberarray[i].Prefix.trim();
            numbermall.Suffix = this.numberarray[i].Suffix.trim();
            this.commonService.data.getNumbercontrolModules.push(numbermall);
          }
        }

        debugger;

        this.commonService.data.CompanyMaster.CompanyName = this.C_CompanyName;
        this.commonService.data.CompanyMaster.Address1 = this.C_Address1;
        this.commonService.data.CompanyMaster.Address2 = this.C_Address2;
        this.commonService.data.CompanyMaster.Address3 = this.C_Address3;
        this.commonService.data.CompanyMaster.LocationName = this.M_location.Text;
        this.commonService.data.CompanyMaster.LocationID = this.M_location.Value;
        //  this.commonService.data.CompanyMaster.LocationID = this.M_location;
        this.commonService.data.CompanyMaster.GSTNo = this.C_GSTNo;
        this.commonService.data.CompanyMaster.ContactPerson = this.C_ContactPerson;
        this.commonService.data.CompanyMaster.Phone1 = this.C_Phone1;
        this.commonService.data.CompanyMaster.Phone2 = this.C_Phone2;
        this.commonService.data.CompanyMaster.EmailID = this.C_Email;
        this.commonService.data.CompanyMaster.Website = this.C_Website;
        //if (this.CmpId == null) {

        //}
        //if (this.CmpId > 0) {

        //}
        if (this.C_CompanyGroup != null) {
          this.commonService.data.companygroup = this.C_CompanyGroup;
          this.commonService.data.CompanyMaster.ParentID = c;
        } else {
          this.commonService.data.companygroup = null;
          this.commonService.data.CompanyMaster.ParentID = 0;
        }
        this.commonService.postData('CompanyMaster/insertdata/', this.commonService.data).subscribe(data => {
          debugger;
          if (data.Success == true) {
            Swal.fire({
              type: 'success',
              title: 'success',
              text: 'Credentials forwarded to your E-Mail , Please Check',
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: 'alert-warp',
                container: 'alert-container'
              },
            })
            //Swal.fire({
            //  position: 'center',
            //  type: 'success',
            //  title: 'Credentials forwarded to your E-Mail , Please Login!',
            //  showConfirmButton: false,
            //  timer: 2500
            //});
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.Form.onReset();
              this.router.navigate(['Administrationlazy/CompanyMaster']);
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

          // 
          this.CmpId = null;

        });
      }
    } else {
      if (form.valid) {
        debugger;

        var array = this.selectedall[0];

        if (array != undefined) {
          for (var i = 0; i < array.length; i++) {
            var id = array[i].ModuleName;
            var bb = id;
            this.selectedallget.push(bb);
          }
        }
        debugger;

        this.commonService.data = new CompanyMasterView();
        this.commonService.data.CompanyMaster.CompanyName = this.C_CompanyName;
        this.commonService.data.CompanyMaster.Address1 = this.C_Address1;
        this.commonService.data.CompanyMaster.Address2 = this.C_Address2;
        this.commonService.data.CompanyMaster.Address3 = this.C_Address3;
        this.commonService.data.CompanyMaster.LocationName = this.M_location.Text;
        this.commonService.data.CompanyMaster.LocationID = this.M_location.Value;
        // this.commonService.data.CompanyMaster.LocationID = this.M_location;
        this.commonService.data.CompanyMaster.GSTNo = this.C_GSTNo;
        this.commonService.data.CompanyMaster.ContactPerson = this.C_ContactPerson;
        this.commonService.data.CompanyMaster.Phone1 = this.C_Phone1;
        this.commonService.data.CompanyMaster.Phone2 = this.C_Phone2;
        this.commonService.data.CompanyMaster.EmailID = this.C_Email;
        this.commonService.data.CompanyMaster.Website = this.C_Website;
        debugger;
        if (this.CmpId == null) {
          this.commonService.data.CompanyMaster.ParentID = 0;
        }
        if (this.CmpId > 0) {
          this.commonService.data.CompanyMaster.ParentID = this.CmpId;
        }
        this.commonService.postData('CompanyMaster/insertdata/', this.commonService.data).subscribe(data => {
          debugger;
          if (data.Success == true) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Login Credentials forwarded to your E-Mail , Please Login!',
              showConfirmButton: false,
              timer: 2000
            });
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.Form.onReset();
              this.router.navigate(['Administrationlazy/CompanyMaster']);
            });

            // this.router.navigate(['']);
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
          this.CmpId = null;

        });
      }
    }

  }
  modalClose1() {
    this.CmpyNamePopUp = 'none';
    this.backdrop = 'none';
  }

  applyFilterssss(dataevent) {
    const filterValues = (dataevent.target as HTMLInputElement).value;
    this.dataSource.filter = filterValues.trim().toLowerCase();
  }

  getCompanyName() {
    debugger;
    this.commonService.getListOfData('CompanyMaster/getCompanyName/').subscribe(data => {
      if (data.getCompName.length > 0) {
        debugger;
        this.commonService.data.getCompName = data.getCompName;
        this.dataSource.data = this.commonService.data.getCompName;
        this.dataSource.sort = this.sortCol1;
        this.CmpyNamePopUp = 'block';
        this.backdrop = 'block';


      }


    });

  }


  CmpId;
  selectvalues(element) {

    debugger;
    this.C_CompanyGroup = element.companyName

    this.CmpId = this.commonService.data.getCompName.find(x => x.CmpID == element.CmpID).CmpID;

    debugger;
    if (this.C_CompanyName == this.C_CompanyGroup) {
      this.C_CompanyGroup = null;
      Swal.fire({
        title: "Company and CompanyGroup cannot be the same.",
      });
    }
    this.CmpyNamePopUp = 'none';
    this.backdrop = 'none';
  }

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  hidedotval(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 46) {
      return false;
    }
  }
  CompanyTable;

  closeEnd() {
    this.CompanyTable = 'none';
    this.backdrop = 'none';
  }
  loc;
  getCompanyTable() {
    localStorage.setItem('helpname', 'CompanyMaster');

    const dialogRef = this.dialog.open(SearchComponent, {
      height: '60%',
      width: '95%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result.success) {
        debugger;
        this.Hidenumgercointrol = false;
        let element = result.data;
        this.C_CmpID = element.CmpID,
          this.C_CompanyName = element.CompanyName;
        this.C_Address1 = element.Address1,
          this.C_Address2 = element.Address3,
          this.C_Address3 = element.Address3,
          this.C_GSTNo = element.GSTNo,
          this.C_ContactPerson = element.ContactPerson,
          this.C_Phone1 = element.Phone1,
          this.C_Phone2 = element.Phone2,
          this.C_Email = element.EmailID,
          this.C_Website = element.Website,

          this.Cityy = element.City;
        this.Citysumbit();
        debugger;
        debugger;
        this.commonService.getListOfData('Common/Getlocationvalues/' + this.Cityy).subscribe(data => {
          debugger;
          this.Locationname = data;
          debugger;
          if (element.LocationName != null) {
            let loc_name = element.LocationName
            this.loc = this.Locationname.find(x => x.Text == loc_name);
            this.M_location = this.loc;
          }
        });
        debugger;

        // this.M_location = element.LocationID
        //if (element.ParentID == 0) {
        //  this.C_CompanyGroup = null;
        //}

        if (element.CompanyGroup != null || element.CompanyGroup != undefined || element.CompanyGroup != "") {
          this.C_CompanyGroup = element.CompanyGroup;
        }

        else {
          this.C_CompanyGroup = null;
        }

        //this.CompanyTable = 'none';
        //this.backdrop = 'none';


      }

    });
  }

  bindC_Values(element) {
    debugger;
    this.C_CmpID = element.CmpID,
      this.C_CompanyName = element.CompanyName;
    this.C_Address1 = element.Address1,
      this.C_Address2 = element.Address3,
      this.C_Address3 = element.Address3,
      this.C_GSTNo = element.GSTNo,
      this.C_ContactPerson = element.ContactPerson,
      this.C_Phone1 = element.Phone1,
      this.C_Phone2 = element.Phone2,
      this.C_Email = element.EmailID,
      this.C_Website = element.Website

    debugger;
    if (element.LocationID != null) {
      //this.C_Location = element.LocationName
      let loc = this.Locations.find(x => x.Value == element.LocationID);
      this.C_Location = loc;
    }
    //if (element.ParentID == 0) {
    //  this.C_CompanyGroup = null;
    //}

    if (element.CompanyGroup != null) {
      let Cgroup = this.commonService.data.getCompDetails.find(x => x.CmpID == element.ParentID);

      this.C_CompanyGroup = Cgroup.CompanyName;
      // this.C_CompanyGroup = element.companyName            
    }
    else {
      this.C_CompanyGroup = null;
    }


    this.CompanyTable = 'none';
    this.backdrop = 'none';
  }


  onUpdate(form: NgForm, C_CmpID) {
    debugger;
    if (form.valid) {

      //   let val = this.commonService.data.getCompDetails.find(x => x.GSTNo == this.C_GSTNo)

      //  this.res = val.GSTNo;


      //if (this.res == this.C_GSTNo ) {
      //  Swal.fire({
      //    type: 'warning',
      //    title: 'GstNo already exists'
      //  });
      //}



      //  else {
      this.commonService.data = new CompanyMasterView();
      this.commonService.data.CompanyMaster.CompanyName = this.C_CompanyName;
      this.commonService.data.CompanyMaster.Address1 = this.C_Address1;
      this.commonService.data.CompanyMaster.Address2 = this.C_Address2;
      this.commonService.data.CompanyMaster.Address3 = this.C_Address3;
      this.commonService.data.CompanyMaster.LocationName = this.M_location.Text;
      this.commonService.data.CompanyMaster.LocationID = this.M_location.Value;
      // this.commonService.data.CompanyMaster.LocationID = this.M_location;
      debugger;
      //if (this.res == this.C_GSTNo) {
      //  Swal.fire({
      //    type: 'warning',
      //    title: 'GstNo already exists'
      //  });
      //}

      this.commonService.data.CompanyMaster.GSTNo = this.C_GSTNo;



      this.commonService.data.CompanyMaster.ContactPerson = this.C_ContactPerson;
      this.commonService.data.CompanyMaster.Phone1 = this.C_Phone1;
      this.commonService.data.CompanyMaster.Phone2 = this.C_Phone2;
      this.commonService.data.CompanyMaster.EmailID = this.C_Email;
      this.commonService.data.CompanyMaster.Website = this.C_Website;

      if (this.C_CompanyGroup == null) {
        this.commonService.data.CompanyMaster.ParentID = 0;
      }
      if (this.C_CompanyGroup != null) {


        this.commonService.data.CompanyMaster.ParentID = this.CmpId;
      }
      this.commonService.postData("CompanyMaster/UpdateCompanyDet/" + this.C_CmpID, this.commonService.data)
        .subscribe(data => {
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
              type: 'warning',
              title: 'Check Error logs',
              showConfirmButton: false,
              timer: 2000
            });
          }


          this.Form.onReset();


        });




    }

    //}
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    //if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    if ((charCode > 47 && charCode < 58)) {
      return true;
    }
    return false;
  }



  @ViewChild('Companytable') Companytable: ElementRef;
  @ViewChild('table') table: ElementRef;

  getPdf() {
    debugger;
    var data = document.getElementById('Companytable');
    html2canvas(data).then(canvas => {
      var imgWidth = 215;
      var pageHeight = 55;
      //var imgHeight = canvas.height * imgWidth / canvas.width;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/PDF')
      //let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;
      //pdf.addImage(contentDataURL, 'PDF', -2, position, imgWidth, imgHeight)
      //pdf.save('CancelledPODetails.pdf'); // Generated PDF   
    });

  }

  getExcel() {
    debugger;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'TaxDetails.xlsx');
  }

  res;

  DeleteId(form: NgForm, ID) {
    debugger;

    //let val2 = this.commonService.data.getCompDetails.find(x => x.ParentID == ID)
    //this.res = val2;

    if (ID != null) {

      if (this.commonService.data.getCompDetails.find(x => x.ParentID == ID)) {

      }
    }

    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to delete ",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'no, cancel!',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,

    }).then((result) => {

      debugger;
      if (result.value) {
        debugger;
        this.commonService.postData("CompanyMaster/DeleteCompanyDet/" + ID, this.commonService.data).subscribe(data => {
          debugger;
          if (data.Success == true) {
            debugger;
            Swal.fire(
              'Deleted!',
              'Record has been deleted.',
              'success'
            )

          }

          else
            Swal.fire(
              'Already this is parent company',
            )
        });

      }

      else {
        Swal.fire(
          'Cancelled',
          'Record has not been deleted'
        )
      }
      this.Form.onReset();
    })




  }



  //title: 'are you sure?',
  //text: "you won't be able to revert this!",
  //icon: 'warning',
  //showcancelbutton: true,
  //confirmbuttontext: 'yes, delete it!',
  //cancelbuttontext: 'no, cancel!',
  //reversebuttons: true




}
