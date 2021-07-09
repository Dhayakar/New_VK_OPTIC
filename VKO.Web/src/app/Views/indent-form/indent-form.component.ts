import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { IndentViewModel, Drugdetails, Gridadata } from 'src/app/Models/ViewModels/IndentViewModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { array } from '@amcharts/amcharts4/core';


@Component({
  selector: 'app-indent-form',
  templateUrl: './indent-form.component.html',
  styleUrls: ['./indent-form.component.less']
})
export class IndentFormComponent implements OnInit {

  constructor(public commonService: CommonService<IndentViewModel>, private router: Router, public dialog: MatDialog,
    public datePipe: DatePipe,
  ) { }

  minDate = new Date();
  OPerationnames;
  Indentsurgeondetals;
  Indentdrugdetails;
  IndentUOMdetails;
  Indentraoisedby;
  M_Indent;
  M_Rqty;
  isInvalid;
  M_operationtheatre;
  M_Iraisedby;
  M_Scheduled;
  M_Cancelled;
  M_UOM;
  M_Surgeon;
  M_Drugdetails;
  selbrnd
  @ViewChild('IndentForm') Form: NgForm
  G_Transactiontypeid;
  Hideactionbmenu: boolean;
  Hidetotalgrid: boolean;
  Hidetotalgrids: boolean;
  HideUpdatetotalgrid: boolean;
  onlydrugsdate;
  ngOnInit() {
    this.HideUpdatetotalgridsubmit = false;
    this.HideUpdatetotalgrid = false;
    this.Hidetotalgrid = true;
    this.Hidetotalgrids = false;
    this.Hidestatus = false;
    this.Hideactionbmenu = false;
    this.commonService.data = new IndentViewModel();
    this.getalldropdowns();
    this.commonService.getListOfData('MedicalPrescription/getDrug/').subscribe(data => {
      debugger;
      if (data.DrugssDetail != null) {
        debugger;
        this.selbrnd = data.DrugssDetail;
        this.onlydrugsdate = data.Drugssonly;
        this.commonService.data = data;
      }
    });
    this.HideGriddata = false;


    this.commonService.getListOfData('User/GetModuletransactiondetails/' + localStorage.getItem('MenuDescription') + '/' + localStorage.getItem('CompanyID'))
      .subscribe(data => {
        this.G_Transactiontypeid = data.transactionid;
        localStorage.setItem("TransactionTypeid", this.G_Transactiontypeid)
      });
  }
  modalmeds;

  SearchSelected() {
    debugger;
    this.Hideactionbmenu = true;
    this.commonService.getListOfData('MedicalPrescription/getDrug/').subscribe(data => {
      debugger;
      if (data.DrugssDetail != null) {
        debugger;
        this.modalmeds = "block";
        this.backdrop = "block";
        this.selbrnd = data.DrugssDetail;
        this.commonService.data = data;
      }
    });

  }

  DrugDetailsSearchs() {
    debugger;
    debugger;
    this.Hideactionbmenu = true;
    this.modalmeds = "block";
    this.backdrop = "block";
    //this.commonService.getListOfData('MedicalPrescription/getDrug/').subscribe(data => {
    //  debugger;
    //  if (data.DrugssDetail != null) {

    //    this.selbrnd = data.DrugssDetail;
    //    }
    //});

  }
  AddIpDTETOTALItemDetails() {
    debugger;
    if (this.Griddetailsss.length >= 1) {
      if (this.Griddetailsss.some(x => x.Brand === "")) {
        return;
      }
    }

    let grid = new Gridadata();
    grid.Brand = "";
    grid.IndnetQTY = 0;
    grid.Manufacture = "";
    grid.Generic = "";
    grid.UOM = "";
    this.Griddetailsss.push(grid);
    this.dataSourceTotalgrid.data = this.Griddetailsss;
    this.dataSourceTotalgrid._updateChangeSubscription();

  }

  AddItemDetails() {
    debugger;
    if (this.Griddetailsss.length >= 1) {
      if (this.Griddetailsss.some(x => x.Brand === "")) {
        return;
      }
    }

    let grid = new Gridadata();
    grid.Brand = "";
    grid.IndnetQTY = 0;
    grid.Manufacture = "";
    grid.Generic = "";
    grid.UOM = "";
    this.Griddetailsss.push(grid);
    this.dataSource.data = this.Griddetailsss;
    this.dataSource._updateChangeSubscription();

  }


  DrugDetailsSearchS(event, id) {
    debugger;
    this.modalmeds = "none";
    this.backdrop = "none";
    let DrugValue = event.option.value.IDD;
    this.dataSourceTotalgrid.data.splice(id, 1);
    this.dataSourceTotalgrid._updateChangeSubscription();
    this.commonService.getListOfData('Indent/GetdrugDetails/' + DrugValue + '/')
      .subscribe(data => {
        debugger;
        this.commonService.data.ExtraGridDeatils = data.DrugssDetailsss;
        if (data.DrugssDetailsss != null) {
          let Med = new Gridadata();
          Med.Brand = this.commonService.data.ExtraGridDeatils[0].Brand;
          Med.Drugdroup = this.commonService.data.ExtraGridDeatils[0].Drugdroup;
          Med.Generic = this.commonService.data.ExtraGridDeatils[0].Generic;
          Med.Manufacture = this.commonService.data.ExtraGridDeatils[0].Manufacture;

          Med.UOM = this.commonService.data.ExtraGridDeatils[0].UOM;
          //Med.IndnetQTY = "0";

          if (this.Griddetailsss != null || this.Griddetailsss != undefined) {
            this.Griddetailsss = [...this.Griddetailsss, Med];
            this.dataSourceTotalgrid.data = this.Griddetailsss;
            this.dataSourceTotalgrid._updateChangeSubscription();
          }
          //else {
          //  this.commonService.data.ExtraGridDeatils.push(Med);
          //  this.dataSource.data = this.commonService.data.ExtraGridDeatils;
          //  this.dataSource._updateChangeSubscription();

          //}


        }

      });


  }

  DrugDetailsSearch(event, id) {
    debugger;
    this.modalmeds = "none";
    this.backdrop = "none";
    let DrugValue = event.option.value.IDD;
    this.dataSource.data.splice(id, 1);
    this.dataSource._updateChangeSubscription();
    this.commonService.getListOfData('Indent/GetdrugDetails/' + DrugValue + '/')
      .subscribe(data => {
        debugger;
        this.commonService.data.ExtraGridDeatils = data.DrugssDetailsss;
        if (data.DrugssDetailsss != null) {
          let Med = new Gridadata();
          Med.Brand = this.commonService.data.ExtraGridDeatils[0].Brand;
          Med.Drugdroup = this.commonService.data.ExtraGridDeatils[0].Drugdroup;
          Med.Generic = this.commonService.data.ExtraGridDeatils[0].Generic;
          Med.Manufacture = this.commonService.data.ExtraGridDeatils[0].Manufacture;

          Med.UOM = this.commonService.data.ExtraGridDeatils[0].UOM;
          //Med.IndnetQTY = "0";

          if (this.Griddetailsss != null || this.Griddetailsss != undefined) {
            this.Griddetailsss = [...this.Griddetailsss, Med];
            this.dataSource.data = this.Griddetailsss;
            this.dataSource._updateChangeSubscription();
          }
          //else {
          //  this.commonService.data.ExtraGridDeatils.push(Med);
          //  this.dataSource.data = this.commonService.data.ExtraGridDeatils;
          //  this.dataSource._updateChangeSubscription();

          //}


        }

      });


  }


  //this.FrameModel = 'block';
  //this.backdrop = 'block';

  //this.Index = index;


  getalldropdowns() {
    this.commonService.getListOfData('Common/GetIndentSurgeonDetails').subscribe(data => { this.Indentsurgeondetals = data; });
    this.commonService.getListOfData('Common/GetIndentOTDetails').subscribe(data => { this.OPerationnames = data; });
    this.commonService.getListOfData('Common/GetIndentDrugDetails').subscribe(data => { this.Indentdrugdetails = data; });
    this.commonService.getListOfData('Common/GetIndentUOMDetails').subscribe(data => { this.IndentUOMdetails = data; });
    this.commonService.getListOfData('Common/getrolevaluesexceptadmin').subscribe(data => { this.Indentraoisedby = data; });
  }
  onBlurRqty(Rqty, Iqty) {
    debugger;
    if (Rqty > Iqty) {
      this.M_Rqty = "";
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Received Quantity Should Not Exceed More than Indent Quantity',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  changeValuea(id, property: string, event) {
    debugger;
    let result = Number(event.target.textContent);
    this.dataSource.filteredData[id][property] = result;
    this.dataSource._updateChangeSubscription();
  }



  changeValuead(id, property: string, event) {
    debugger;
    let result = Number(event.target.textContent);
    this.dataSourceTotalgrid.filteredData[id][property] = result;
    this.dataSourceTotalgrid._updateChangeSubscription();
  }

  modalSuccessmed;
  modalsuccessmeds;
  IDDDD;
  modalSuccesssuccessmedssss() {
    this.modalsuccessmeds = "none";
    this.backdrop = "none";
  }
  modalSuccesssuccessmeds() {
    this.modalsuccessmeds = "none";
    this.backdrop = "none";
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Indent']);
    });
  }
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
  onsubmitIndentForm(form: NgForm) {
    debugger;
    if (form.valid) {
      this.isInvalid = false;


      if (this.Griddetailsss.length > 0) {
        this.commonService.data = new IndentViewModel();
        this.commonService.data.GridDeatils = this.Griddetailsss;

        this.commonService.data.Indentdetails.OperationtheatreID = this.M_operationtheatre.Value;
        this.commonService.data.Indentdetails.OTRaisedBY = this.M_Iraisedby;
        this.commonService.data.Indentdetails.OTIndentdate = this.datePipe.transform(this.M_Scheduled, 'medium');
        //this.commonService.data.Indentdetails.IndnetQTY = this.M_Indent;
        this.commonService.data.Indentdetails.Storename = localStorage.getItem("Custname");
        this.commonService.data.Userid = localStorage.getItem("userroleID");
        this.commonService.data.transactionid = localStorage.getItem("TransactionTypeid");

        this.commonService.postData('Indent/Insertindent', this.commonService.data).subscribe(data => {
          debugger;
          this.commonService.data = data;

          if (data.message != "No") {


            this.modalsuccessmeds = "block";
            this.backdrop = "block";

            this.IDDDD = data.Indentiddd;

            if (data.Success == true) {
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Data Saved Successfully',
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
          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'No Running Number Exits',
              showConfirmButton: false,
              timer: 2000
            });
          }

        });
      }

      else {
        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'Please Enter Drug Details',
          showConfirmButton: false,
          timer: 2000
        });
      }

    }
    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Please fill Required Input Fields',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  Cancel() {
    debugger;
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['Indent']);
    });
  }
  Drugdata: Array<Drugdetails> = [];
 
  medicinename;
  brandname;
  medicinee;
  manfname;
  formname;
  UOMNAES;
  M_CUSTNAME;
  dataSource = new MatTableDataSource();
  displayedColumns = ['Brand', 'Genericname', 'Manufacture', 'UOM', 'Druggroup', 'IndentQty', 'Delete'];
  HideGriddata: boolean = false;
  Griddetailsss: Array<Gridadata> = [];
  Addgridadta() {
    debugger;
    var gridmenu = new Gridadata();
    gridmenu.Brand = this.brandname;
    gridmenu.IndnetQTY = this.M_Indent;
    gridmenu.Manufacture = this.manfname;
    //gridmenu.OTRAISEDDATE = this.datePipe.transform(this.M_Scheduled, 'medium');
    gridmenu.Generic = this.medicinename;
    let LocationID = this.IndentUOMdetails.find(x => x.Value == this.M_UOM)
    gridmenu.UOM = LocationID.Text;
    this.Griddetailsss.push(gridmenu);
    this.HideGriddata = true
    this.dataSource.data = this.Griddetailsss;
    //  this.dataSource._updateChangeSubscription();
  }


  selecttypesss() {
    debugger;
    var gridmenu = new Gridadata();
    gridmenu.Brand = this.brandname;
    gridmenu.IndnetQTY = this.M_Indent;
    gridmenu.Manufacture = this.manfname;
    //gridmenu.OTRAISEDDATE = this.datePipe.transform(this.M_Scheduled, 'medium');
    gridmenu.Generic = this.medicinename;
    let LocationID = this.IndentUOMdetails.find(x => x.Value == this.M_UOM)
    gridmenu.UOM = LocationID.Text;
    this.Griddetailsss.push(gridmenu);
    this.HideGriddata = true
    this.dataSource.data = this.Griddetailsss;
    this.dataSource._updateChangeSubscription();

    this.modalmeds = "none";
    this.backdrop = "none";

  }


  removePatient(i) {
    debugger;

    if (i !== -1) {
      this.dataSource.data.splice(i, 1);
      this.dataSource._updateChangeSubscription();
    }

  }
  removePatients(i) {
    debugger;

    if (i !== -1) {
      this.dataSourceTotalgrid.data.splice(i, 1);
      this.dataSourceTotalgrid._updateChangeSubscription();
    }

  }


  selecttypes(item) {
    debugger;

    this.medicinename = item.MedicineName;
    this.UOMNAES = item.uomName;
    this.manfname = item.Manufacturer;
    this.brandname = item.Brand;
    this.formname = item.DrugGroup;
    let LocationID = this.IndentUOMdetails.find(x => x.Text == item.uomName)
    this.M_UOM = LocationID.Value
    this.medicinee = item.ID;
    this.modalmed = 'none';
    this.backdrop = 'none';

  }
  M_CustomerName;
  M_CustomerID;
  M_Address;
  M_MobileNo;
  M_Location;
  M_store;
  Registeredstore() {
    debugger;
    localStorage.setItem('helpname', 'Store Information');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '70%',
      width: '85%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        debugger
        let item = result.data;
        this.M_CustomerID = item.ID
        this.M_CustomerName = item.Name


        localStorage.setItem("Custname", this.M_CustomerName)
        this.M_Address = item.Address1.concat(' ', item.Address2)
        this.M_MobileNo = item.PhoneNo
        this.M_Location = item.LocationName
        this.M_store = item.Address3

      }
    });
  }

  backdrop;
  modalmed;
  SearchClick() {
    this.modalmed = 'block';
    this.backdrop = 'block';
  }
  modalIndentDetails;

  modalIndentDetailsss() {

    this.backdrop = "none";
    this.modalIndentDetails = "none";
  }

  Indentdatas;
  HideUpdatetotalgridsubmit: boolean;
  Opensearch() {
    debugger;

    this.backdrop = "block";
    this.modalIndentDetails = "block";
    this.Hidetotalgrid = false;
    this.Hidetotalgrids = true;
    this.HideUpdatetotalgridsubmit = true;
    this.commonService.getListOfData('Help/searchStoreSearch')
      .subscribe(data => {
        this.commonService.data = data;
        this.Indentdatas = data.Getindentsearchdetails;


      });

    //debugger;
    //localStorage.setItem('helpname', 'OperationIndentSearch');
    //const dialogRef = this.dialog.open(SearchComponent, {
    //  height: '70%',
    //  width: '85%',
    //  disableClose: true
    //});

    //dialogRef.afterClosed().subscribe(result => {
    //  if (result.success) {
    //    debugger
    //    let item = result.data;
    //    this.M_operationtheatre = item.ID
    //    this.M_Iraisedby = item.Name
    //    this.M_Address = item.Address1.concat(' ', item.Address2)
    //    this.M_Scheduled = item.PhoneNo
    //    this.M_CustomerName = item.LocationName
    //    this.M_Address = item.Address3
    //    this.M_Scheduled = item.PhoneNo
    //    this.M_store = item.LocationName
    //    this.M_MobileNo = item.Address3
    //    this.brandname = item.PhoneNo
    //    this.manfname = item.LocationName
    //    this.medicinename = item.Address3
    //    this.formname = item.LocationName
    //    this.M_UOM = item.Address3
    //    this.M_Indent = item.PhoneNo

    //  }
    //});
  }
  InnsideIndentdatas;
  operatationtheatre;
  OTRaisedby;
  storenamess;
  Storenumberss;
  Indewntnumberss;
  statusss;
  Address2ss
  Address1ss;
  Indentdatesss;
  Hidestatus: boolean = false;
  M_status;
  modalpopupIndentDetails;
  
  selectDetailsSearch(data) {
    debugger;
    let POtid = data.OperationtheatreIDD;
       this.modalIndentDetails = "none";
    this.backdrop = "none";
    this.commonService.getListOfData('Help/getSearchdetailsofindent/' + POtid)
      .subscribe(data => {
        debugger;
        this.commonService.data = data;
        this.Hidestatus = true;
        this.InnsideIndentdatas = data.Getindentsearchtotaldetails;
        //this.dataSourceTotalgrid.data = this.InnsideIndentdatas;
        let LocationID = this.OPerationnames.find(x => x.Text == data.Operationtheatre)
        this.M_operationtheatre = LocationID;
        this.M_Iraisedby = data.Indentraisedby;
        this.M_Scheduled = data.Indentdate;
        this.M_CustomerName = data.storename;
        this.M_Address = data.Address1.concat(' ', data.Address2);
        this.M_store = data.Storekeeprr;
        this.M_MobileNo = data.Storenumber;
        this.Hidestatus = data.status;
        localStorage.setItem("Yesstatusss", data.Yesstatus);
       // this.Yesstatusss = data.Yesstatus;
        if (data.status == true ) {
          this.M_status = "Yes";
        } else {
          this.M_status = "No";
        }

        this.Indewntnumberss = data.Indewntnumber;


      });

  }


  onUpdateIndentForm(stautrs,indnumber) {
    debugger;
    


    if (this.Griddetailsss.length > 0) {
      this.commonService.data = new IndentViewModel();
      this.commonService.data.GridDeatils = this.Griddetailsss;
      this.commonService.data.Userid = localStorage.getItem("userroleID");
      this.commonService.data.transactionid = localStorage.getItem("TransactionTypeid");
      this.commonService.data.Statuss = stautrs;
      this.commonService.data.indentnumbers = indnumber;
      this.commonService.postData('Indent/updateindent', this.commonService.data).subscribe(data => {
        debugger;
        this.commonService.data = data;
        if (data.Success == true) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Data Updated Successfully',
            //showConfirmButton: false,
            //timer: 2000
          });
          this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
            this.router.navigate(['Indent']);
          });
        } else {
          Swal.fire({
            position: 'center',
            type: 'warning',
            title: 'Some Data Missing',
            //showConfirmButton: false,
            //timer: 2000
          });
        }

      });
    }
    else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Add Drugs',
        //showConfirmButton: false,
        //timer: 2000
      });
    }


  }
  dataSourceTotalgrid = new MatTableDataSource();
  Griddisplayedcolumns = ['Gridbrand', 'GridGeneric', 'Gridmanufacture', 'GridDruggroup', 'GridUOM', 'GrifIQTY','GridDelete'];
  overlapdata;
  AddUpdatdeItemDetails() {
    debugger;

   this.overlapdata =  localStorage.getItem("Yesstatusss")
    if (this.overlapdata != "YESRQTYISNULL") {
      this.HideUpdatetotalgrid = true;
      this.AddIpDTETOTALItemDetails();
    } else {
      Swal.fire({
        position: 'center',
        type: 'warning',
        title: 'Quantity  received against Indent,Cannot add Drugs ',
        //showConfirmButton: false,
        //timer: 2000
      });
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
