import { Component } from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {SsoService} from "../service/sso.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private authenticationService: AuthenticationService, private ssoService: SsoService) {
  }

  get authService() {
    return this.authenticationService;
  }

  get sso() {
    return this.ssoService;
  }

}
