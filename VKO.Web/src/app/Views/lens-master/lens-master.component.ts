
import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { LensViewmodel } from 'src/app/Models/ViewModels/lens-viewmodel';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { string, DataSource } from '@amcharts/amcharts4/core';
import { LensMasModel } from 'src/app/Models/lens-mas-model';
import { LensTranModel } from 'src/app/Models/lens-tran-model';
import { pushAll } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { text } from '@angular/core/src/render3';
import { SearchComponent } from '../search/search.component';
import { Lensmaster } from '../../Models/LensMaster.model';
import { OneLine_Master } from '../../Models/OneLineMaster';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatPaginator, MatDialogConfig, MatInput, MatSelect, MatDialog } from '@angular/material'
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
  selector: 'app-lens-master',
  templateUrl: './lens-master.component.html',
  styleUrls: ['./lens-master.component.less'],

  encapsulation: ViewEncapsulation.None,
})
export class LensMasterComponent implements OnInit {

  M_SelectedType;
  getBranddata;
  getGSTdata;
  getUOMdata;
  getFrameShape;
  getFrameType;
  getFrameStyle;
  getFrameWidth;
  M_HSNNo;
  FrameModel = false;
  LensType = true;
  M_Branddisable = true;
  M_Indexdisable = true;
  docotorid;
  cmpid;
  hiddenUpdate = false;
  hiddenSubmit = true;
  Framechoose = false;
  selectdisable = false;
  orginaltable = true;
  orginaltablefilter = true;
  bindingtable = false;
  bindingtablefilter = false;
  getIndexsdata;

  displayedColumnssq = ['Brand', 'lensoption', 'Model', 'Index', 'Color', 'Size', 'Description', 'Price', 'UOM', 'TaxDescription', 'GST', 'Delete'];
  dataSourcesq = new MatTableDataSource();

  displayedColumnssqq = ['Brand', 'lensoption', 'FrameShape', 'FrameType', 'FrameWidth', 'FrameStyle', 'Model', 'Color', 'Size', 'Description', 'Price', 'UOM', 'TaxDescription', 'GST', 'Delete'];
  dataSourcesqq = new MatTableDataSource();

  displayedColumnssqd = ['Action', 'Description', 'IsActive'];
  dataSourcesqd = new MatTableDataSource();

  displayedColumnssqt = ['Action', 'Description', 'IsActive'];
  dataSourcesqt = new MatTableDataSource();

  displayedColumnssqs = ['Action', 'Description', 'IsActive'];
  dataSourcesqs = new MatTableDataSource();

  displayedColumnssqw = ['Action', 'Description', 'IsActive'];
  dataSourcesqw = new MatTableDataSource();

  constructor(public commonService: CommonService<LensViewmodel>, public datepipe: DatePipe, public dialog: MatDialog,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef, private router: Router, ) { }


  accessdata;
  disSubmit: boolean = true;
  disupdate: boolean = true;
  disdelete: boolean = true;


  ngOnInit() {
    this.commonService.data = new LensViewmodel();
    var Pathname = "Opticalslazy/LensMaster";
    var Objdata = JSON.parse(localStorage.getItem("AllCollectionData"));
    var n = Pathname;
    var sstring = n.includes("/");
    this.cmpid = localStorage.getItem("CompanyID");
    this.docotorid = localStorage.getItem('userroleID');
    if (sstring == false) {

      if (Objdata.find(el => el.Parentmoduledescription === Pathname)) {

        this.commonService.getListOfData('Common/GetAccessdetails/' + localStorage.getItem("CompanyID") + '/' + localStorage.getItem("userroleID") + '/' + Pathname).subscribe(data => {
          debugger;
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }

          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });


        this.commonService.getListOfData('Common/GstSearch/').subscribe((data: any) => {
          this.getGSTdata = data;
        });

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
          this.accessdata = data.GetAvccessDetails;
          if (this.accessdata.find(x => x.Add == true)) {
            this.disSubmit = false;
          } else {
            this.disSubmit = true;
          }
          if (this.accessdata.find(x => x.Edit == true)) {
            this.disupdate = false;
          } else {
            this.disupdate = true;
          }

          if (this.accessdata.find(x => x.Delete == true)) {
            this.disdelete = false;
          } else {
            this.disdelete = true;
          }
        });
        this.commonService.getListOfData('Common/GstSearch/').subscribe((data: any) => {
          this.getGSTdata = data;
        });
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



  M_UOM;
  LTD;
  OptionSelect() {
    debugger;
    if (this.M_SelectedType == "Frame") {
      this.bindingtable = true;
      this.bindingtablefilter = true;
      this.orginaltable = false;
      this.orginaltablefilter = false;
      this.M_Indexdisable = true;
      this.commonService.getListOfData('Common/GetBrandFrame/' + this.cmpid + '/').subscribe((data: any) => {
        this.getBranddata = data;
        this.LensType = false;
        this.FrameModel = true;
        this.M_Branddisable = false;
        this.Framechoose = true;
      });
      this.commonService.getListOfData('Common/UOMSearch/').subscribe((data: any) => {
        this.getUOMdata = data;
        this.M_UOM = this.getUOMdata[0];
      });
      this.commonService.getListOfData('Common/GetFrameShape/').subscribe((data: any) => {
        this.getFrameShape = data;
      });
      this.commonService.getListOfData('Common/GetFrameType/').subscribe((data: any) => {
        this.getFrameType = data;
      });
      this.commonService.getListOfData('Common/GetFrameWidth/').subscribe((data: any) => {
        this.getFrameWidth = data;
      });
      this.commonService.getListOfData('Common/GetFrameStyle/').subscribe((data: any) => {
        this.getFrameStyle = data;
      });
      this.commonService.getListOfData('LensMaster/Getframe/' + this.M_SelectedType + '/' + this.cmpid)
        .subscribe((data: any) => {
          debugger;
          if (data.ResData != null) {
            debugger;
            this.disupdate = true;
            this.hiddenUpdate = true;
            this.hiddenSubmit = false;
            this.bindingtable = true;
            this.bindingtablefilter = true;
            this.orginaltable = false;
            this.orginaltablefilter = false;
            this.LTD = data.ResData;
            this.commonService.getListOfData('LensMaster/Getlensfull/' + this.LTD + '/' + this.cmpid + '/' + this.M_SelectedType)
              .subscribe((data: any) => {
                debugger;
                this.selectedarray = data.Taxnamelensmastertrans;
                this.commonService.data.LensTranModel = this.selectedarray;
                this.dataSourcesqq.data = this.commonService.data.LensTranModel;
              });
          }
          else {
            this.disupdate = false;
            this.hiddenUpdate = false;
            this.hiddenSubmit = true;
            this.bindingtable = true;
            this.bindingtablefilter = true;
            this.orginaltable = false;
            this.orginaltablefilter = false;
            this.commonService.data.LensTranModel = [];
            this.selectedarray = [];
          }
        });
    }
    else {
      this.bindingtable = false;
      this.bindingtablefilter = false;
      this.orginaltable = true;
      this.orginaltablefilter = true;
      this.commonService.getListOfData('Common/GetBrandLens/' + this.cmpid + '/').subscribe((data: any) => {
        this.getBranddata = data;
        this.LensType = true;
        this.FrameModel = false;
        this.M_Branddisable = false;
        this.Framechoose = false;
      });
      this.commonService.getListOfData('Common/UOMSearch/').subscribe((data: any) => {
        this.getUOMdata = data;
        this.M_UOM = this.getUOMdata[0];
      });
      this.commonService.getListOfData('Common/Getindex/').subscribe((data: any) => {
        this.getIndexsdata = data;
        this.M_Indexdisable = false;
      });
      this.commonService.getListOfData('LensMaster/Getframe/' + this.M_SelectedType + '/' + this.cmpid)
        .subscribe((data: any) => {
          debugger;
          if (data.ResData != null) {
            debugger;
            this.disupdate = true;
            this.hiddenUpdate = true;
            this.hiddenSubmit = false;
            this.bindingtable = false;
            this.bindingtablefilter = false;
            this.orginaltable = true;
            this.orginaltablefilter = true;
            this.LTD = data.ResData;
            debugger;
            this.commonService.getListOfData('LensMaster/Getlensfull/' + this.LTD + '/' + this.cmpid + '/' + this.M_SelectedType)
              .subscribe((data: any) => {
                debugger;
                this.selectedarray = data.Taxnamelensmastertrans;
                this.commonService.data.LensTranModel = this.selectedarray;
                this.dataSourcesq.data = this.commonService.data.LensTranModel;
              });
          }
          else {
            this.disupdate = false;
            this.hiddenUpdate = false;
            this.hiddenSubmit = true;
            this.bindingtable = false;
            this.bindingtablefilter = false;
            this.orginaltable = true;
            this.orginaltablefilter = true;
            this.commonService.data.LensTranModel = [];
            this.selectedarray = [];
          }
        });
    }
  }

  M_GSTPER;
  M_CESSPER;
  M_ADDCESSPER;
  M_BGST;
  Tax;
  Addltax;
  Addltax1;
  GSTSelected() {
    debugger;
    if (this.M_GSTPER != undefined) {
      this.commonService.getListOfData('LensMaster/GettaxDetails/' + this.M_GSTPER.Value + '/')
        .subscribe((data: any) => {
          data.Taxname.forEach((x: any) => {
            this.M_CESSPER = x.Cesspercentage;
            this.M_ADDCESSPER = x.AdditionalCesspercentage;
            this.M_BGST = x.GSTNo;
            this.Addltax = x.CessDescription;
            this.Addltax1 = x.AddtionalDescription;
          });
        });
    }
    else {
      this.M_CESSPER = undefined;
      this.M_ADDCESSPER = undefined;
      this.M_BGST = undefined;
      this.Addltax = undefined;
      this.Addltax1 = undefined;
    }

  }

  M_Brand;
  M_Description;
  M_FrameModel;
  M_LensType;
  M_Index;
  M_Price;
  M_Color;
  M_Size;
  M_Model;
  M_FrameShape;
  M_FrameType;
  M_FrameStyle;
  M_FrameWidth;
  selectedarray = [];

  AddRows() {
    debugger;

    this.commonService.data.LensTranModel = this.selectedarray;

    if (this.M_SelectedType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Type',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    else if (this.M_SelectedType == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select Type',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    else {
    }

    if (this.M_Brand == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select brand',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    else if (this.M_Brand == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select brand',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    else {
    }


    if (this.M_Price == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter price',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    else if (this.M_Price == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter price',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    else { }

    if (this.M_SelectedType == "Frame") {
      if (this.M_FrameModel == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter frameoption',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        return;
      }
      else if (this.M_FrameModel == "") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter frameoption',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        return;
      }
      else {
      }
    }

    if (this.M_SelectedType == "Lens") {
      if (this.M_LensType == undefined) {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter lensoption',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
        return;
      }
      else if (this.M_LensType == "") {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Enter lensoption',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        })
        return;
      }
      else {
      }
    }

    var LTM = new LensTranModel();

    LTM.Brand = this.M_Brand.Value;
    LTM.Brandname = this.M_Brand.Text;

    if (this.M_Index != undefined) {
      LTM.Index = this.M_Index.Value;
      LTM.Indexname = this.M_Index.Text;
    }
    LTM.Colour = this.M_Color;
    LTM.UOMID = this.M_UOM.Value;
    LTM.UOMname = this.M_UOM.Text;
    LTM.HSNNo = this.M_HSNNo;
    LTM.Size = this.M_Size;
    LTM.Prize = this.M_Price;
    LTM.Model = this.M_Model;
    LTM.CESSAmount = this.M_CESSPER;
    LTM.ADDCESSAmount = this.M_ADDCESSPER;
    LTM.GST = this.M_BGST;
    if (this.M_GSTPER != undefined) {
      LTM.TaxDescription = this.M_GSTPER.Text;
      LTM.TaxID = this.M_GSTPER.Value;
    }
    if (this.M_SelectedType == "Frame") {
      if (this.M_FrameShape != undefined) {
        LTM.FrameShape = this.M_FrameShape.Text;
        LTM.FrameShapeID = this.M_FrameShape.Value;
      }
      if (this.M_FrameType != undefined) {
        LTM.FrameType = this.M_FrameType.Text;
        LTM.FrameTypeID = this.M_FrameType.Value;
      }
      if (this.M_FrameWidth != undefined) {
        LTM.FrameWidth = this.M_FrameWidth.Text;
        LTM.FrameWidthID = this.M_FrameWidth.Value;
      }
      if (this.M_FrameStyle != undefined) {
        LTM.FrameStyle = this.M_FrameStyle.Text;
        LTM.FrameStyleID = this.M_FrameStyle.Value;
      }
    }
    if (this.lensTID != undefined) {
      LTM.ID = this.lensTID;
      this.disupdate = false;
    } else {
      this.disupdate = false;
    }

    LTM.CessDescription = this.Addltax;
    LTM.AddtionalDescription = this.Addltax1;
    LTM.Description = this.M_Description;

    if (this.M_SelectedType == "Frame") {
      LTM.LensOption = this.M_FrameModel;
    } else {
      LTM.LensOption = this.M_LensType;
    }
    this.commonService.data.LensTranModel.unshift(LTM);
    if (this.M_SelectedType == "Lens") {
      this.dataSourcesq.data = this.commonService.data.LensTranModel;
    }
    else {
      this.dataSourcesqq.data = this.commonService.data.LensTranModel;
    }
    this.M_Index = undefined;
    this.M_Color = undefined;
    this.M_Size = undefined;
    this.M_Price = undefined;
    this.M_LensType = undefined;
    this.M_FrameModel = undefined;
    this.M_Model = undefined;
    this.M_Brand = undefined;
    this.M_HSNNo = undefined;
    this.M_BGST = undefined;
    this.M_CESSPER = undefined;
    this.M_ADDCESSPER = undefined;
    this.M_GSTPER = undefined;
    this.M_Description = undefined;
    this.Addltax = undefined;
    this.Addltax1 = undefined;
    this.lensTID = undefined;
    if (this.M_SelectedType == "Frame") {
      this.M_FrameShape = undefined;
      this.M_FrameType = undefined;
      this.M_FrameWidth = undefined;
      this.M_FrameStyle = undefined;
    }
    this.selectdisable = true;
    this.hiddenDeleted = false;
  }
  remove(i, element) {
    debugger;
    this.commonService.data.LensTranModel = this.selectedarray;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          this.dataSourcesq.data.splice(i, 1);
          this.dataSourcesq._updateChangeSubscription();
        }
        if (this.commonService.data.LensTranModel.length == 0) {
          this.selectdisable = false;
        }
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Lens not deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    })


  }
  removeframe(i, element) {
    debugger;
    this.commonService.data.LensTranModel = this.selectedarray;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        if (i !== -1) {
          debugger;
          this.dataSourcesqq.data.splice(i, 1);
          this.dataSourcesqq._updateChangeSubscription();
        }
        if (this.commonService.data.LensTranModel.length == 0) {
          this.selectdisable = false;
        }

        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Frame not deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    })

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
  onSubmit() {
    debugger;

    this.commonService.data.LensTranModel = this.selectedarray;
    if (this.M_SelectedType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select type',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return;
    }
    else if (this.M_SelectedType == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select type',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return;
    }
    else {
    }

    if (this.commonService.data.LensTranModel.length < 1) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter item details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      })
      return;
    }


    this.commonService.data.Lensmaster = new Lensmaster();
    this.commonService.data.Lensmaster.LensType = this.M_SelectedType;
    this.commonService.data.Lensmaster.CMPID = this.cmpid;
    this.commonService.data.Lensmaster.CreatedBy = this.docotorid;

    console.log(this.commonService.data);

    this.commonService.postData('LensMaster/Insertlensmaster', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {

          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.commonService.data.LensTranModel = [];
          this.selectedarray = [];
          this.dataSourcesq.data = [];
          this.dataSourcesqq.data = [];
          this.M_Description = undefined;
          this.M_SelectedType = undefined;
          this.M_GSTPER = undefined;
          this.M_CESSPER = undefined;
          this.M_ADDCESSPER = undefined;
          this.Addltax = undefined;
          this.Addltax1 = undefined;
          this.M_BGST = undefined;
          this.M_Index = undefined;
          this.M_Color = undefined;
          this.M_Size = undefined;
          this.M_Price = undefined;
          this.M_LensType = undefined;
          this.M_FrameModel = undefined;
          this.M_Model = undefined;
          this.M_Brand = undefined;
          this.M_UOM = undefined;
          this.M_HSNNo = undefined;
          this.M_BGST = undefined;
          this.M_CESSPER = undefined;
          this.M_ADDCESSPER = undefined;
          this.M_GSTPER = undefined;
          this.M_Description = undefined;
          this.hiddenSubmit = true;
          this.hiddenUpdate = false;
          this.hiddenDeleted = false;
          this.selectdisable = false;
          this.orginaltable = true;
          this.orginaltablefilter = true;
          this.bindingtable = false;
          this.bindingtablefilter = false;
          this.Framechoose = false;
          this.M_Branddisable = true;
          this.M_Indexdisable = true;
        }
        else {

        }
      });

  }
  lensTID;
  Editlensframemaster(i, element) {
    debugger;

    this.lensTID = element.ID;
    if (this.lensTID != undefined) {
      this.disupdate = true;
    }

    if (this.M_SelectedType == "Frame") {
      this.M_FrameModel = element.LensOption;
    } else {
      this.M_LensType = element.LensOption;
    }
    this.M_Model = element.Model;
    this.M_Color = element.Colour;
    this.M_Size = element.Size;
    this.M_Price = element.Prize;
    this.M_Description = element.Description;
    this.M_HSNNo = element.HSNNo;
    if (element.Brand != null) {
      let BrandID = this.getBranddata.find(x => x.Text == element.Brandname)
      this.M_Brand = BrandID
    }
    else {
      this.M_Brand = undefined;
    }

    if (element.FrameShapeID != null && element.FrameShapeID != 0) {
      let FrameShapeID = this.getFrameShape.find(x => x.Text == element.FrameShape)
      this.M_FrameShape = FrameShapeID
    }
    else {
      this.M_FrameShape = undefined;
    }

    if (element.FrameStyleID != null && element.FrameStyleID != 0) {
      let FrameStyleID = this.getFrameStyle.find(x => x.Text == element.FrameStyle)
      this.M_FrameStyle = FrameStyleID
    }
    else {
      this.M_FrameStyle = undefined;
    }

    if (element.FrameTypeID != null && element.FrameTypeID != 0) {
      let FrameTypeID = this.getFrameType.find(x => x.Text == element.FrameType)
      this.M_FrameType = FrameTypeID
    }
    else {
      this.M_FrameType = undefined;
    }

    if (element.FrameWidthID != null && element.FrameStyleID != 0) {
      let FrameWidthID = this.getFrameWidth.find(x => x.Text == element.FrameWidth)
      this.M_FrameWidth = FrameWidthID
    }
    else {
      this.M_FrameWidth = undefined;
    }

    if (element.Index != null) {
      let ind = this.getIndexsdata.find(x => x.Text == element.Indexname)
      this.M_Index = ind
    }
    else {
      this.M_Index = undefined;
    }

    if (element.TaxID != null && element.TaxID != 0) {
      let TaxID = this.getGSTdata.find(x => x.Text == element.TaxDescription)
      this.M_GSTPER = TaxID
      this.GSTSelected();
    }
    else {
      this.M_GSTPER = undefined;
    }
    if (this.M_SelectedType == "Lens") {
      this.dataSourcesq.data.splice(i, 1);
      this.dataSourcesq._updateChangeSubscription();
    }
    else {
      this.dataSourcesqq.data.splice(i, 1);
      this.dataSourcesqq._updateChangeSubscription();
    }
    if (this.lensTID != undefined) {
      this.hiddenDeleted = true;
    } else {
      this.hiddenDeleted = false;
    }
  }
  onupdate() {
    debugger;
    this.commonService.data.LensTranModel = this.selectedarray;
    if (this.M_SelectedType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select type',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    else if (this.M_SelectedType == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Select type',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }
    else {
    }



    if (this.commonService.data.LensTranModel.length < 1) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter item details',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      return;
    }

    console.log(this.commonService.data);
    this.commonService.postData('LensMaster/Updatelensmaster/' + this.LTD + '/' + this.docotorid, this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.commonService.data.LensTranModel = [];
          this.selectedarray = [];
          this.dataSourcesq.data = [];
          this.dataSourcesqq.data = [];
          this.M_Description = undefined;
          this.M_SelectedType = undefined;
          this.M_GSTPER = undefined;
          this.M_CESSPER = undefined;
          this.M_ADDCESSPER = undefined;
          this.M_BGST = undefined;
          this.M_Index = undefined;
          this.M_Color = undefined;
          this.M_Size = undefined;
          this.M_Price = undefined;
          this.M_LensType = undefined;
          this.M_FrameModel = undefined;
          this.M_Model = undefined;
          this.Addltax = undefined;
          this.Addltax1 = undefined;
          this.M_Brand = undefined;
          this.M_UOM = undefined;
          this.M_HSNNo = undefined;
          this.M_BGST = undefined;
          this.M_CESSPER = undefined;
          this.M_ADDCESSPER = undefined;
          this.M_GSTPER = undefined;
          this.M_Description = undefined;
          this.hiddenSubmit = true;
          this.hiddenUpdate = false;
          this.hiddenDeleted = false;
          this.selectdisable = false;
          this.orginaltable = true;
          this.orginaltablefilter = true;
          this.bindingtable = false;
          this.bindingtablefilter = false;
          this.Framechoose = false;
          this.M_Branddisable = true;
          this.M_Indexdisable = true;
        }
        else {

        }

      });

  }
  backdrop;
  cancelblock;
  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.commonService.data.LensTranModel = [];
    this.selectedarray = [];
    this.dataSourcesq.data = [];
    this.dataSourcesqq.data = [];
    this.M_Description = undefined;
    this.M_SelectedType = undefined;
    this.M_GSTPER = undefined;
    this.M_CESSPER = undefined;
    this.M_ADDCESSPER = undefined;
    this.M_BGST = undefined;
    this.M_Index = undefined;
    this.M_Color = undefined;
    this.M_Size = undefined;
    this.M_Price = undefined;
    this.M_LensType = undefined;
    this.M_FrameModel = undefined;
    this.M_Model = undefined;
    this.M_Brand = undefined;
    this.M_UOM = undefined;
    this.M_HSNNo = undefined;
    this.M_BGST = undefined;
    this.M_CESSPER = undefined;
    this.M_ADDCESSPER = undefined;
    this.M_GSTPER = undefined;
    this.Addltax = undefined;
    this.Addltax1 = undefined;
    this.M_Description = undefined;
    this.hiddenSubmit = true;
    this.hiddenUpdate = false;
    this.hiddenDeleted = false;
    this.selectdisable = false;
    this.orginaltable = true;
    this.orginaltablefilter = true;
    this.bindingtable = false;
    this.bindingtablefilter = false;
    this.Framechoose = false;
    this.M_Branddisable = true;
    this.M_Indexdisable = true;
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  CancelClk() {
    debugger;

    if (this.M_SelectedType != null || this.M_Description != null || this.M_Price != null || this.M_Index != null || this.M_Color != null) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }

  }
  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesq.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFrameShape(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqd.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFrameType(event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqt.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFrameStyle(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqs.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFrameWidth(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqw.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesqq.filter = filterValue.trim().toLowerCase();
  }

  IsActive;
  modalframeshape;
  masterFrameShape;
  tableFrameShape = false;
  Activeisd = false;
  hiddenSubmitd = true;
  hiddenUpdated = false;
  hiddenDeleted = false;
  @ViewChild('FrameShapefocus') FrameShapefocus;
  AddFrameShape() {
    debugger;
    setTimeout(() => {
      this.FrameShapefocus.nativeElement.focus()
    }, 50)
    this.modalframeshape = 'block';
    this.backdrop = 'block';
  }
  modalSuccessframeshape() {
    debugger;
    this.modalframeshape = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitd = true;
    this.hiddenUpdated = false;
    this.hiddenDeleted = false;
    this.tableFrameShape = false;
    this.Activeisd = false;
    this.masterFrameShape = "";
    this.dataSourcesqd.filter = '';
  }
  oncancelFrameShape() {
    debugger;
    this.masterFrameShape = "";
    this.modalframeshape = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitd = true;
    this.hiddenUpdated = false;
    this.hiddenDeleted = false;
    this.tableFrameShape = false;
    this.Activeisd = false;
    this.dataSourcesqd.filter = '';
  }
  onSubmitFrameShape() {
    if (this.masterFrameShape == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameShape',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameShapefocus.nativeElement.focus()
      }, 50)
      return;
    } else if (this.masterFrameShape == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameShape',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameShapefocus.nativeElement.focus()
      }, 50)
      return;
    }

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterFrameShape;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('LensMaster/InsertFrameShape', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.hiddenUpdated = false;
          this.hiddenSubmitd = true;
          this.masterFrameShape = "";
          setTimeout(() => {
            this.FrameShapefocus.nativeElement.focus()
          }, 50)
          this.commonService.getListOfData('Common/GetFrameShape/').subscribe((data: any) => {
            this.getFrameShape = data;
          });
        }

        else {

        }
      });
  }
  IDD;
  selecttyped(item) {
    debugger;
    this.masterFrameShape = item.Description;
    this.IsActive = item.Active.toString();
    this.IDD = item.ID;
    this.Activeisd = true;
    this.tableFrameShape = false;
    this.hiddenSubmitd = false;
    this.hiddenUpdated = true;
    this.hiddenDeleted = true;
  }
  onupdateFrameShape() {
    debugger;

    if (this.masterFrameShape == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameShape',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameShapefocus.nativeElement.focus()
      }, 50)
      return;
    } else if (this.masterFrameShape == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameShape',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameShapefocus.nativeElement.focus()
      }, 50)
      return;
    }
    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterFrameShape;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData("LensMaster/updateFrameShape/" + this.IDD, this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.masterFrameShape = "";
          setTimeout(() => {
            this.FrameShapefocus.nativeElement.focus()
          }, 50)
          this.commonService.getListOfData('Common/GetFrameShape/').subscribe((data: any) => {
            this.getFrameShape = data;
          });
        }
        else {

        }

      });

  }
  onDeleteFrameShape() {



    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        debugger;
        this.commonService.postData("LensMaster/DeleteFrameShape/" + this.IDD, this.commonService.data).subscribe(result => {
          this.oncancelFrameShape();
          this.commonService.getListOfData('Common/GetFrameShape/').subscribe((data: any) => {
            this.getFrameShape = data;
          })

        });

        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'FrameShape not deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    })



  }
  ClickFrameShape() {
    debugger;
    this.commonService.getListOfData('LensMaster/lensmasterFrameShape').subscribe(data => {
      debugger;


      if (data.FrameShapehis.length) {
        this.dataSourcesqd.data = data.FrameShapehis;
        this.tableFrameShape = true;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data not found',
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


  IsActivet;
  modalframetype;
  masterFrameType;
  tableFrameType = false;
  Activeist = false;
  hiddenSubmitt = true;
  hiddenUpdatet = false;
  hiddenDeletet = false;
  @ViewChild('FrameTypefocus') FrameTypefocus;
  AddFrameType() {
    debugger;
    setTimeout(() => {
      this.FrameTypefocus.nativeElement.focus()
    }, 50)
    this.modalframetype = 'block';
    this.backdrop = 'block';
  }
  modalSuccessframetype() {
    this.modalframetype = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitt = true;
    this.hiddenUpdatet = false;
    this.hiddenDeletet = false;
    this.tableFrameType = false;
    this.Activeist = false;
    this.masterFrameType = "";
    this.dataSourcesqt.filter = '';
  }
  oncancelFrameType() {
    this.masterFrameType = "";
    this.modalframetype = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitt = true;
    this.hiddenUpdatet = false;
    this.hiddenDeletet = false;
    this.tableFrameType = false;
    this.Activeist = false;
    this.dataSourcesqt.filter = '';
  }
  onSubmitFrameType() {
    if (this.masterFrameType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameType',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameTypefocus.nativeElement.focus()
      }, 50)
      return;
    } else if (this.masterFrameType == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameType',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameTypefocus.nativeElement.focus()
      }, 50)
      return;
    }

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterFrameType;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('LensMaster/InsertFrameType', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {

          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.hiddenUpdatet = false;
          this.hiddenSubmitt = true;
          this.masterFrameType = "";
          setTimeout(() => {
            this.FrameTypefocus.nativeElement.focus()
          }, 50)
          this.commonService.getListOfData('Common/GetFrameType/').subscribe((data: any) => {
            this.getFrameType = data;
          });
        }

        else {

        }
      });
  }
  IDT;
  selecttypet(item) {
    debugger;
    this.masterFrameType = item.Description;
    this.IsActivet = item.Active.toString();
    this.IDT = item.ID;
    this.Activeist = true;
    this.tableFrameType = false;
    this.hiddenSubmitt = false;
    this.hiddenUpdatet = true;
    this.hiddenDeletet = true;
  }
  onupdateFrameType() {
    debugger;

    if (this.masterFrameType == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameType',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameTypefocus.nativeElement.focus()
      }, 50)
      return;
    }
    else if (this.masterFrameType == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameType',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameTypefocus.nativeElement.focus()
      }, 50)
      return;
    }
    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterFrameType;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData("LensMaster/updateFrameType/" + this.IDT, this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.masterFrameType = "";
          setTimeout(() => {
            this.FrameTypefocus.nativeElement.focus()
          }, 50)
          this.commonService.getListOfData('Common/GetFrameType/').subscribe((data: any) => {
            this.getFrameType = data;
          });
        }
        else {

        }

      });

  }
  onDeleteFrameType() {
    debugger;


    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        debugger;
        this.commonService.postData("LensMaster/DeleteFrameType/" + this.IDT, this.commonService.data).subscribe(result => {

          this.oncancelFrameType();
          this.commonService.getListOfData('Common/GetFrameType/').subscribe((data: any) => {
            this.getFrameType = data;

          })

        });
        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'FrameType not deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    })


  }
  ClickFrameType() {
    debugger;
    this.commonService.getListOfData('LensMaster/lensmasterFrameType').subscribe(data => {
      debugger;


      if (data.FrameTypehis.length > 0) {
        this.dataSourcesqt.data = data.FrameTypehis;
        this.tableFrameType = true;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data not found',
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


  IsActives;
  modalframestyle;
  masterFrameStyle;
  tableFrameStyle = false;
  Activeiss = false;
  hiddenSubmits = true;
  hiddenUpdates = false;
  hiddenDeletes = false;
  @ViewChild('FrameStylefocus') FrameStylefocus;
  AddFrameStyle() {
    debugger;
    setTimeout(() => {
      this.FrameStylefocus.nativeElement.focus()
    }, 50)
    this.modalframestyle = 'block';
    this.backdrop = 'block';
  }
  modalSuccessframestyle() {
    this.modalframestyle = 'none';
    this.backdrop = 'none';
    this.hiddenSubmits = true;
    this.hiddenUpdates = false;
    this.hiddenDeletes = false;
    this.tableFrameStyle = false;
    this.Activeiss = false;
    this.masterFrameStyle = "";
    this.dataSourcesqs.filter = '';
  }
  oncancelFrameStyle() {
    this.masterFrameStyle = "";
    this.modalframestyle = 'none';
    this.backdrop = 'none';
    this.hiddenSubmits = true;
    this.hiddenUpdates = false;
    this.hiddenDeletes = false;
    this.tableFrameStyle = false;
    this.Activeiss = false;
    this.dataSourcesqs.filter = '';
  }
  onSubmitFrameStyle() {
    debugger;
    if (this.masterFrameStyle == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameStyle',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameStylefocus.nativeElement.focus()
      }, 50)
      return;
    }
    else if (this.masterFrameStyle == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameStyle',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameStylefocus.nativeElement.focus()
      }, 50)
      return;
    }
    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterFrameStyle;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('LensMaster/InsertFrameStyle', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });

          this.hiddenUpdates = false;
          this.hiddenSubmits = true;
          this.masterFrameStyle = "";
          setTimeout(() => {
            this.FrameStylefocus.nativeElement.focus()
          }, 50)
          this.commonService.getListOfData('Common/GetFrameStyle/').subscribe((data: any) => {
            this.getFrameStyle = data;
          });
        }

        else {

        }
      });
  }
  IDS;
  selecttypes(item) {
    debugger;
    this.masterFrameStyle = item.Description;
    this.IsActives = item.Active.toString();
    this.IDS = item.ID;
    this.Activeiss = true;
    this.tableFrameStyle = false;
    this.hiddenSubmits = false;
    this.hiddenUpdates = true;
    this.hiddenDeletes = true;
  }
  onupdateFrameStyle() {
    debugger;

    if (this.masterFrameStyle == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameStyle',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameStylefocus.nativeElement.focus()
      }, 50)
      return;
    }
    else if (this.masterFrameStyle == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameStyle',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameStylefocus.nativeElement.focus()
      }, 50)
      return;
    }
    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterFrameStyle;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData("LensMaster/updateFrameStyle/" + this.IDS, this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.masterFrameStyle = "";
          setTimeout(() => {
            this.FrameStylefocus.nativeElement.focus()
          }, 50)
          this.commonService.getListOfData('Common/GetFrameStyle/').subscribe((data: any) => {
            this.getFrameStyle = data;
          });
        }
        else {

        }

      });

  }
  onDeleteFrameStyle() {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        debugger;
        this.commonService.postData("LensMaster/DeleteFrameStyle/" + this.IDS, this.commonService.data).subscribe(result => {
          this.oncancelFrameStyle();
          this.commonService.getListOfData('Common/GetFrameStyle/').subscribe((data: any) => {
            this.getFrameStyle = data;
          });
        })

        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'FrameStyle not deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    })

  }
  ClickFrameStyle() {
    debugger;
    this.commonService.getListOfData('LensMaster/lensmasterFrameStyle').subscribe(data => {
      debugger;


      if (data.FrameStylehis.length > 0) {
        this.dataSourcesqs.data = data.FrameStylehis;
        this.tableFrameStyle = true;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data not found',
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


  IsActivew;
  modalframewidth;
  masterFrameWidth;
  tableFrameWidth = false;
  Activeisw = false;
  hiddenSubmitw = true;
  hiddenUpdatew = false;
  hiddenDeletew = false;
  @ViewChild('FrameWidthfocus') FrameWidthfocus;
  AddFrameWidth() {
    debugger;
    setTimeout(() => {
      this.FrameWidthfocus.nativeElement.focus()
    }, 50)
    this.modalframewidth = 'block';
    this.backdrop = 'block';
  }
  modalSuccessframewidth() {
    this.modalframewidth = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitw = true;
    this.hiddenUpdatew = false;
    this.hiddenDeletew = false;
    this.tableFrameWidth = false;
    this.Activeisw = false;
    this.masterFrameWidth = "";
    this.dataSourcesqw.filter = '';
  }
  oncancelFrameWidth() {
    this.masterFrameWidth = "";
    this.modalframewidth = 'none';
    this.backdrop = 'none';
    this.hiddenSubmitw = true;
    this.hiddenUpdatew = false;
    this.hiddenDeletew = false;
    this.tableFrameWidth = false;
    this.Activeisw = false;
    this.dataSourcesqw.filter = '';
  }
  onSubmitFrameWidth() {
    if (this.masterFrameWidth == undefined) {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameWidth',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameWidthfocus.nativeElement.focus()
      }, 50)
      return;
    } else if (this.masterFrameWidth == "") {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameWidth',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameWidthfocus.nativeElement.focus()
      }, 50)
      return;
    }

    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterFrameWidth;
    this.commonService.data.OneLineMaster.CreatedBy = this.docotorid;
    this.commonService.postData('LensMaster/InsertFrameWidth', this.commonService.data)
      .subscribe(data => {
        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.hiddenUpdatew = false;
          this.hiddenSubmitw = true;
          this.masterFrameWidth = "";
          setTimeout(() => {
            this.FrameWidthfocus.nativeElement.focus()
          }, 50)
          this.commonService.getListOfData('Common/GetFrameWidth/').subscribe((data: any) => {
            this.getFrameWidth = data;
          });
        }

        else {

        }
      });
  }
  IDW;
  selecttypew(item) {
    debugger;
    this.masterFrameWidth = item.Description;
    this.IsActivew = item.Active.toString();
    this.IDW = item.ID;
    this.Activeisw = true;
    this.tableFrameWidth = false;
    this.hiddenSubmitw = false;
    this.hiddenUpdatew = true;
    this.hiddenDeletew = true;
  }
  onupdateFrameWidth() {
    debugger;

    if (this.masterFrameWidth == undefined) {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameWidth',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameWidthfocus.nativeElement.focus()
      }, 50)
      return;
    }
    else if (this.masterFrameWidth == "") {

      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'Enter FrameWidth',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'alert-warp',
          container: 'alert-container',
        },
      });
      setTimeout(() => {
        this.FrameWidthfocus.nativeElement.focus()
      }, 50)
      return;
    }
    this.commonService.data.OneLineMaster = new OneLine_Master();
    this.commonService.data.OneLineMaster.ParentDescription = this.masterFrameWidth;
    this.commonService.data.OneLineMaster.UpdatedBy = this.docotorid;
    this.commonService.data.OneLineMaster.IsActive = this.IsActive;

    this.commonService.postData("LensMaster/updateFrameWidth/" + this.IDW, this.commonService.data)
      .subscribe(data => {

        if (data.Success == true) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Data Saved successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.masterFrameWidth = "";
          setTimeout(() => {
            this.FrameWidthfocus.nativeElement.focus()
          }, 50)
          this.commonService.getListOfData('Common/GetFrameWidth/').subscribe((data: any) => {
            this.getFrameWidth = data;
          });
        }
        else {

        }

      });

  }
  onDeleteFrameWidth() {
    debugger;

    Swal.fire({
      title: 'Are you sure?',
      text: "Want to Delete",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        debugger;
        this.commonService.postData("LensMaster/DeleteFrameWidth/" + this.IDW, this.commonService.data).subscribe(result => {
          this.oncancelFrameWidth();
          this.commonService.getListOfData('Common/GetFrameWidth/').subscribe((data: any) => {
            this.getFrameWidth = data;
          });

        })

        Swal.fire({
          type: 'success',
          title: 'success',
          text: 'Deleted Successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });

      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'FrameWidth not deleted',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'alert-warp',
            container: 'alert-container',
          },
        });
      }
    })


  }
  ClickFrameWidth() {
    debugger;
    this.commonService.getListOfData('LensMaster/lensmasterFrameWidth').subscribe(data => {
      debugger;
      if (data.FrameWidthhis.length > 0) {
        this.dataSourcesqw.data = data.FrameWidthhis;
        this.tableFrameWidth = true;
      }
      else {
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'Data not found',
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

  accesspopup;
  modalcloseAccessOk() {
    this.backdrop = 'none';
    this.accesspopup = 'none';
  }

  Getformaccess() {
    debugger;
    var Pathname = "Opticalslazy/LensMaster";
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


  Deletelensframe() {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "Want To delete ?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
        debugger;
        this.commonService.postData("LensMaster/Deleteframelens/" + this.lensTID + '/' + this.cmpid + '/' + this.M_SelectedType, this.commonService.data).subscribe(result => {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Deleted Successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
          this.lensTID = undefined;
          this.commonService.data.LensTranModel = [];
          this.selectedarray = [];
          this.dataSourcesq.data = [];
          this.dataSourcesqq.data = [];
          this.M_Description = undefined;
          this.M_SelectedType = undefined;
          this.M_GSTPER = undefined;
          this.M_CESSPER = undefined;
          this.M_ADDCESSPER = undefined;
          this.M_BGST = undefined;
          this.M_Index = undefined;
          this.M_Color = undefined;
          this.M_Size = undefined;
          this.M_Price = undefined;
          this.M_LensType = undefined;
          this.M_FrameModel = undefined;
          this.M_Model = undefined;
          this.M_Brand = undefined;
          this.M_UOM = undefined;
          this.M_HSNNo = undefined;
          this.M_BGST = undefined;
          this.M_CESSPER = undefined;
          this.M_ADDCESSPER = undefined;
          this.M_GSTPER = undefined;
          this.M_Description = undefined;
          this.Addltax = undefined;
          this.hiddenSubmit = true;
          this.hiddenUpdate = false;
          this.hiddenDeleted = false;
          this.selectdisable = false;
          this.orginaltable = true;
          this.orginaltablefilter = true;
          this.bindingtable = false;
          this.bindingtablefilter = false;
          this.Framechoose = false;
          this.M_Branddisable = true;
          this.M_Indexdisable = true;
        })

      }

      else {
        if (this.M_SelectedType == "Lens") {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Lens not deleted',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container',
            },
          });
        }
        else {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Frame not deleted',
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
    })

  }











  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
