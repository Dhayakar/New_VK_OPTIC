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
  displayedColumns = ['Action', 'Description', 'Type', 'tax', 'sph', 'cyl', 'axis', 'add', 'barcodeid'];
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
  selectvalues(data, event, index) {
    debugger;
    if (event.checked == true) {
      this.bararray.push({
        "ID": data.ID,
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

      let printContents: any = "", popupWin: any;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
      popupWin.document.open();
      var Subdata: any;
      for (var i = 0; i < lengtharray.length; i++) {
        printContents += `<div class="col-sm-12" style="transform: rotate(90deg);margin-top:10px;page-break-after:always">
      <ngx-barcode bc-width="15" bc-font-size="250"
                   bc-value="${lengtharray[i].Barcode}" bc-display-value="true" bc-height="400">
      </ngx-barcode>
</div>`
        popupWin.document.write(`
             <html>
             <head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js" integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi" crossorigin="anonymous"></script>

<title></title>
            <style>

   </style>
          </head>
      <body onload="window.print();window.close()">${printContents}</body>
        </html>`);
        printContents = "";
      }
      popupWin.document.close();
      //this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      //  this.router.navigate(["Opticalslazy/BarcodePrinting"]);
      //});

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
