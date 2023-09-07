import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SsoService} from "../service/sso.service";

@Component({
  selector: 'app-callback-handler',
  templateUrl: './callback-handler.component.html',
  styleUrls: ['./callback-handler.component.scss']
})
export class CallbackHandlerComponent implements OnInit{

  constructor(
    private activatedRoute: ActivatedRoute,
    private ssoService: SsoService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      const authorizationCode = data['code'];
      const state = data['state'];
      this.ssoService.handleCallback(authorizationCode, state);
    });
  }



}
