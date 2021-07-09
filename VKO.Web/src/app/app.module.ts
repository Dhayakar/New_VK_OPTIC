import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './shared/auth.guard';
import { DatePipe, CommonModule, CurrencyPipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxBarcodeModule } from 'ngx-barcode';
import {

  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,

} from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';
import { MatRadioModule } from '@angular/material/radio';
import { WebcamModule } from 'ngx-webcam';
import { EncrDecrServiceService } from '../app/shared/encr-decr-service.service';
import { AppComponent } from './app.component';
import { CommonService } from './shared/common.service';
import { AppRoutingModule } from './app-routing.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DxSchedulerModule } from 'devextreme-angular';
import { MomentModule } from 'angular2-moment';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MouseEnterLeaveDebounceDirective } from './mouse-enter-leave-debounce.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgShortcutModule, NgShortcutConfig } from 'ng-shortcut';
import { LoginComponent } from './Views/login/login.component';
import { DashboardnewregisteredvaluesComponent } from './Views/dashboardnewregisteredvalues/dashboardnewregisteredvalues.component';
import { AccessprivilegesComponent } from './Views/accessprivileges/accessprivileges.component';
import { MaterialreturntovendorComponent } from './Views/materialreturntovendor/materialreturntovendor.component';
import { SearchComponent } from './Views/search/search.component';
import { WhatsapptemplateComponent } from './Views/whatsapptemplate/whatsapptemplate.component';


const shortcutConfig: NgShortcutConfig[] = [
  {
    id: '@addmaster',
    key: 'A',
    preventDefault: true
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    AccessprivilegesComponent,
    DashboardnewregisteredvaluesComponent,
    MouseEnterLeaveDebounceDirective,
 WhatsapptemplateComponent,

  ],
  imports: [
    NgShortcutModule.forRoot(shortcutConfig),
    NgxPaginationModule,
    SelectAutocompleteModule,
    DragDropModule,
    DxSchedulerModule,
    NgxDocViewerModule,
    PdfViewerModule,
    ReactiveFormsModule,
    WebcamModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    //NgMultiSelectDropDownModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MomentModule,
    HttpClientModule,
    MatPasswordStrengthModule,
    NgxBarcodeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DropdownModule,
    CheckboxModule,
    AutoCompleteModule,
    TableModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    A11yModule,
    AppRoutingModule
  ],
  exports: [MatFormFieldModule, MatInputModule, DragDropModule],
  entryComponents: [SearchComponent],
  providers: [CommonService, AuthGuard, DatePipe, EncrDecrServiceService, CurrencyPipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

}
