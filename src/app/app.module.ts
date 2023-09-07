import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AsyncPipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { CallbackHandlerComponent } from './callback-handler/callback-handler.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackHandlerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
