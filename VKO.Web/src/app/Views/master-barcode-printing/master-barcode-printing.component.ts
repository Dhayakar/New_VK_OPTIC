import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { SetupMaster } from 'src/app/Models/ViewModels/Setupmaster.viewmodel';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-master-barcode-printing',
  templateUrl: './master-barcode-printing.component.html',
  styleUrls: ['./master-barcode-printing.component.less']
})
export class MasterBarcodePrintingComponent implements OnInit {

  constructor(public commonService: CommonService<SetupMaster>,
    private router: Router,
  ) { }
  Itemdata;
  isdisable: boolean = true;
  Hidecopies: boolean = false;
  Formattypes;
  M_Brand;
  ngOnInit() {
    this.commonService.data = new SetupMaster();
  }
  Cancel() {
    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(["Opticalslazy/BarcodePrinting"]);
    });
  }
  FIlterdataDistanceOD(value: string) {
    debugger;
    const Objdata = JSON.parse(localStorage.getItem('Itemcollectiondata'));
    const filterValue = value.toLowerCase();
    this.Itemdata = Objdata.filter(option => option.Text.toLowerCase().includes(filterValue));
  }

  selectbrandsdata() {
    this.commonService.getListOfData('Common/GetitemsbasedonCMPID/' + localStorage.getItem("CompanyID") + '/' + this.Formattypes).subscribe(data => {
      if (data != null) {
        debugger;
        this.isdisable = false;
        this.Itemdata = data;
        localStorage.setItem("Itemcollectiondata", JSON.stringify(this.Itemdata));
      } else {
        this.isdisable = true;
      }
     
    });
  }
  bardata;
  Copy_M;
  displayedColumns = ['Action', 'Description', 'Type', 'tax','sph','cyl','axis','add','barcodeid'];
  dataSource = new MatTableDataSource();
  Brandchoose() {
    debugger;
    this.commonService.getListOfData('LensMaster/Getitemsbasedonbrandid/' + localStorage.getItem("CompanyID") + '/' + this.M_Brand).subscribe(data => {
      if (data.Barcodedata.length != 0) {
        this.Hidecopies = true;
        this.dataSource.data = data.Barcodedata;
        this.bardata = data.Barcodedata;
      } else {
        this.Hidecopies = false;
        Swal.fire({
          type: 'warning',
          title: 'warning',
          text: 'No Data',
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
  bararray = [];
  selectvalues(data,event, index) {
    debugger;
    if (event.checked == true) {
      this.bararray.push({
        "ID":data.ID,
        "Barcode": data.barcodeid,
      });  
    } else {
      this.bararray.map((todo, i) => {
        if (todo.ID == data.ID) {
          this.bararray.splice(index, 1);
        }
      });
    }
  }
  printbarcodes() {
    debugger;
    if (this.Copy_M != undefined && this.bararray.length != 0) {
      var copy = this.Copy_M;
      var lengtharray = this.bararray;

    } else {
      Swal.fire({
        type: 'warning',
        title: 'warning',
        text: 'select item / count of copies to print',
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


}
