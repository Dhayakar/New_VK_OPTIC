
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTable, MatDialog } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl, FormArray, NgForm } from '@angular/forms';
import { CommonService } from 'src/app/shared/common.service';
import { AppComponent } from 'src/app/app.component';
import { DatePipe } from '@angular/common';
import { Vmmeterial, Meterials4, PushArray, Meterials5 } from 'src/app/Models/ViewModels/vmmeterial';
import { Dmmeterial } from 'src/app/Models/dmmeterial';
import Swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
import { StockmasterModel } from 'src/app/Models/StockmasterModel';
import { StockTranModel } from 'src/app/Models/StockTranModel';
import { ItemBatchModel } from 'src/app/Models/ItemBatchModel';
import { ItemBatchTranModel } from 'src/app/Models/ItemBatchTranModel';
import { element } from 'protractor';
import { pushAll } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Local } from 'protractor/built/driverProviders';
import { SearchComponent } from '../search/search.component';


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
declare var jQuery: any;

declare var $: any;

@Component({
  selector: 'app-whatsapptemplate',
  templateUrl: './whatsapptemplate.component.html',
  styleUrls: ['./whatsapptemplate.component.less']
})
export class WhatsapptemplateComponent implements OnInit {
  constructor(public commonService: CommonService<Vmmeterial>, public datepipe: DatePipe, public dialog: MatDialog,
    public appComponent: AppComponent, public el: ElementRef, private changeDatectorrefs: ChangeDetectorRef) { }

  ngOnInit() {

    function validateContact() {
      var valid = true;
      $(".demoInputBox").css('background-color', '');
      $(".info").html('');

      if (!$("#mobile").val()) {
        $("#userName-info").html("(required)");
        $("#mobile").css('background-color', '#FFFFDF');
        valid = false;
      }
      if (!$("#userEmail").val()) {
        $("#userEmail-info").html("(required)");
        $("#userEmail").css('background-color', '#FFFFDF');
        valid = false;
      }
      if (!$("#userEmail").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
        $("#userEmail-info").html("(invalid)");
        $("#userEmail").css('background-color', '#FFFFDF');
        valid = false;
      }
      if (!$("#subject").val()) {
        $("#subject-info").html("(required)");
        $("#subject").css('background-color', '#FFFFDF');
        valid = false;
      }
      if (!$("#content").val()) {
        $("#content-info").html("(required)");
        $("#content").css('background-color', '#FFFFDF');
        valid = false;
      }

      return valid;
    }
  }

  sendContact() {
    debugger;
    var valid;
    valid = true; 
    if (valid) {
      jQuery.ajax({
        url: "https://www.dexbean.com/wapp/demo/dex070721-cmps/sendMessage.php",
        data: 'mobile=' + $("#mobile").val() + '&content=' + $("#content").val() + '&key="wephnn72p1d7s02a"',
        type: "POST",
        success: function (data) {
          Swal.fire({
            type: 'success',
            title: 'success',
            text: 'Message sent successfully',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });
          this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
            this.router.navigate(['Whatsapp']);
          });
        },
        error: function (data) {
          Swal.fire({
            type: 'warning',
            title: 'warning',
            text: 'Whatsapp Instance Not Running',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'alert-warp',
              container: 'alert-container'
            },
          });
        }
      });
    }
  }

}
