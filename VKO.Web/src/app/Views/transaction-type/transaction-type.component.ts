import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { TransactionTypeViewM } from '../../Models/ViewModels/TransactionTypeViewM';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-transaction-type',
  templateUrl: './transaction-type.component.html',
  styleUrls: ['./transaction-type.component.less']
})
export class TransactionTypeComponent implements OnInit {

  TT_ID;
  TT_Description;
  TT_ContraTran;
  TT_Rec_Issue_Type;

  hidesubmit: boolean = true;
  hideupdate: boolean = false;


  displayedColumns: string[] = ['Description'];
  dataSource = new MatTableDataSource();

  @ViewChild('sortCol2') sortCol2: MatSort;
  @ViewChild('TranTypeForm') Form: NgForm
  constructor(public commonService: CommonService<TransactionTypeViewM>, public dialog: MatDialog) { }


  DoctorID;
  ngOnInit() {

    this.DoctorID = localStorage.getItem('userroleID');
  }


  backdrop;
  cancelblock;
  Cancel() {
    if (this.TT_Description != null || this.TT_ContraTran != null || this.TT_Rec_Issue_Type != null
    ) {
      this.backdrop = 'block';
      this.cancelblock = 'block';
    }
    else {
      this.Form.onReset();
      this.PTT_ID = null;

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
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';

    this.TT_Description = '';
    this.TT_ContraTran = '';
    this.M_RecPaycontra = '';
    this.TT_Rec_Issue_Type = '';

    this.PTT_ID = null;
    this.RecPaycontra_ID = null;
    this.hideupdate = false;
    this.hidesubmit = true;
  }

  ContraTranPopUp;
  con5tradetails;

  selectedSearchPopup;

  ContraTranSearch(selectedSearch:string) {
    debugger;

    this.selectedSearchPopup = selectedSearch;

    this.commonService.getListOfData('TransactionType/getContraTranDet/').subscribe(data => {
      debugger;
      if (data.getContraDet.length > 0) {
        debugger;
        this.backdrop = "block";
        this.ContraTranPopUp = "block";
 
        //this.commonService.data.getContraDet = data.getContraDet;
       //this.dataSource.data = data.getContraDet;
        this.con5tradetails = data.getContraDet;

        this.dataSource.sort = this.sortCol2;
      }
    });

  }

  modalClose1() {
    this.ContraTranPopUp = "none";
    this.backdrop = "none";
  }
  PTT_ID;
  M_RecPaycontra;
  RecPaycontra_ID;

  BindContraTran(element) {
    debugger

    if (this.selectedSearchPopup == "ContraTC") {

      this.TT_ContraTran = element.Description;
      this.PTT_ID = element.TransactionID;
    } else {
      this.M_RecPaycontra = element.Description;
      this.RecPaycontra_ID = element.TransactionID;

    }
    this.ContraTranPopUp = "none";
    this.backdrop = "none";
  }

  onSubmit(form: NgForm) {
    debugger;
    if (form.valid) {

      this.commonService.data = new TransactionTypeViewM();
      this.commonService.data.TransactionType.Description = this.TT_Description;

      if (this.PTT_ID != null) {
        this.commonService.data.TransactionType.ContraTransactionid = this.PTT_ID;
      }
      else {
        this.commonService.data.TransactionType.ContraTransactionid = 0;
      }

      if (this.RecPaycontra_ID != null) {
        this.commonService.data.TransactionType.RecPayContra = this.RecPaycontra_ID;
      }
      else {
        this.commonService.data.TransactionType.RecPayContra = null;
      }

      this.commonService.data.TransactionType.Rec_Issue_type = this.TT_Rec_Issue_Type;
      this.commonService.data.TransactionType.CreatedBy = parseInt(this.DoctorID);

      this.commonService.postData('TransactionType/insertdata/', this.commonService.data).subscribe(data => {
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
            title: 'Some Data Missing',
            showConfirmButton: false,
            timer: 2000
          });
        }
        this.PTT_ID = 0;
        this.RecPaycontra_ID = 0;
        this.Form.onReset();

      });
    }

  }

  onSearch() {

    debugger;
    localStorage.setItem('helpname', 'TransactionType');
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '80%',
      width: '95%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result.success) {
        debugger;
        let item = result.data;
        this.TT_Description = item.Description;
        this.TT_ContraTran = item.ContraTransaction;
        this.TT_Rec_Issue_Type = item.Rec_Issue_type;
        this.TT_ID = item.TransactionID;
        this.PTT_ID = item.ContraTransactionid;
        this.RecPaycontra_ID = item.RecPayTransactionid;
        this.M_RecPaycontra = item.RecPayTransaction;

        this.hideupdate = true;
        this.hidesubmit = false;

      }

    });

  }


  onUpdate(form: NgForm, ID) {
    debugger;
    if (form.valid) {
      debugger;
      if (ID == this.PTT_ID) {

        Swal.fire({
          position: 'center',
          type: 'warning',
          title: 'child and Parent were same!',
          showConfirmButton: false,
          timer: 2000


        });

      } else {
        this.commonService.data = new TransactionTypeViewM();

        this.commonService.data.TransactionType.Description = this.TT_Description;
        if (this.PTT_ID != null) {
          this.commonService.data.TransactionType.ContraTransactionid = this.PTT_ID;
        }
        else {
          this.commonService.data.TransactionType.ContraTransactionid = 0;
        }
        if (this.RecPaycontra_ID != null) {
          this.commonService.data.TransactionType.RecPayContra = this.RecPaycontra_ID;
        }
        else {
          this.commonService.data.TransactionType.RecPayContra = null;
        }
        this.commonService.data.TransactionType.Rec_Issue_type = this.TT_Rec_Issue_Type;
        this.commonService.data.TransactionType.UpdatedBy = parseInt(this.DoctorID);


        debugger;
        this.commonService.postData("TransactionType/updatedata/" + ID, this.commonService.data).subscribe(data => {
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

          this.Form.onReset();

          this.hideupdate = false;
          this.hidesubmit = true;
        });
      }
    }




  }


}
