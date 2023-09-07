import { Component } from '@angular/core';
import {AuthenticationService} from "./service/authentication.service";
import {Observable} from "rxjs";
import {SsoService} from "./service/sso.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {

  }

}
