import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';
import { CustomersComponent } from './components/customers/customers.component';
import { BillsComponent } from './components/bills/bills.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BillComponent } from './components/bill/bill.component';
import { CustomerSelectComponent } from './controls/customer-select/customer-select.component';

/* Configure Amplify resources */
Amplify.configure(awsmobile);

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    BillsComponent,
    CustomerComponent,
    BillComponent,
    CustomerSelectComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // Material
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    // Amplify
    AmplifyUIAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
