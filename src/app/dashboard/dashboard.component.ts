import { Component } from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {SsoService} from "../service/sso.service";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
    console.log('window.location.origin: ', window.location.origin);
  }

  login() {
    this.oidcSecurityService.authorize(); // perform login process
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe(resp => {
      console.log('Log out resp: ', resp);
    });
  }

  checkAuth() {
    // get info r
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken, configId }) => {
      console.log('isAuthenticated: ', isAuthenticated);
      console.log('userData: ', userData);
      console.log('accessToken: ', accessToken);
      console.log('idToken: ', idToken);
      console.log('configId: ', configId);
    });
  }

  isAuthen() {
    // console.log(this.oidcSecurityService.isAuthenticated());
    this.oidcSecurityService.isAuthenticated().subscribe(resp => {
      console.log('is authen : ', resp);
    })
  }

  getIdToken() {
    this.oidcSecurityService.getIdToken().subscribe(resp => {
      console.log('get id token: ', resp);
    })
  }

  getAccessToken() {
    this.oidcSecurityService.getAccessToken().subscribe(resp => {
      console.log('get access token resp: ', resp);
    })
  }

  getUserData() {
    this.oidcSecurityService.getUserData().subscribe(resp => {
      console.log('User data resp: ', resp);
    })
  }

}
