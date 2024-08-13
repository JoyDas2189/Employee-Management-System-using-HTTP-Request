import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestComponent } from './http-request/http-request.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';

@NgModule({
  declarations: [
    AppComponent,
    HttpRequestComponent,
    ErrorComponent,
    EmployeeInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
