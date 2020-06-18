import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';
import { CustomersComponent } from './components/customers/customers.component';
import { BillsComponent } from './components/bills/bills.component';

/* Configure Amplify resources */
Amplify.configure(awsmobile);

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    BillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Angular
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    // Amplify
    AmplifyUIAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
