import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';
import { HttpClientModule } from '@angular/common/http';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { CommonService } from './shared/common.service';
import { AuthGuard } from './shared/auth.guard';
import { DatePipe } from '@angular/common';
import { EncrDecrServiceService } from '../app/shared/encr-decr-service.service';
import { MaterialModule } from './material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import{AdminstartionLazyRoutingModule} from './Administartionlazy-routing.module';
import { StripeDialogbox } from './Views/stripepayment/stripepayment.component';
@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,    
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    HttpClientModule,
    MatPasswordStrengthModule,
    NgxBarcodeModule,
    MaterialModule,
    MatFormFieldModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AdminstartionLazyRoutingModule
  ],
  entryComponents: [StripeDialogbox],
  providers: [CommonService, AuthGuard, DatePipe, EncrDecrServiceService]
})
export class AdminLazyModule { }
