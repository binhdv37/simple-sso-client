import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AsyncPipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { CallbackHandlerComponent } from './callback-handler/callback-handler.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthModule, LogLevel} from "angular-auth-oidc-client";

@NgModule({
  declarations: [
    AppComponent,
    CallbackHandlerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:9000',
        redirectUrl: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200',
        clientId: 'public-client',
        scope: 'openid',
        responseType: 'code',
        silentRenew: false,
        useRefreshToken: false,
        logLevel: LogLevel.Debug,
      }
    })
  ],
  providers: [AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
