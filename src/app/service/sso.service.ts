import {Injectable} from "@angular/core";
import {SsoData} from "../model/sso-data";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import jwtDecode, { JwtPayload } from "jwt-decode";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {environment} from "../../environment/environment";

@Injectable({providedIn: "root"})
export class SsoService {

  oidcUrl = environment.openIdProviderUrl;
  authorizeEndpoint = environment.authorizeEndpoint;
  tokenEndpoint = environment.tokenEndpoint;
  client_id = environment.client_id
  redirect_url = window.location.protocol + '//' + window.location.host + environment.callbackPath;

  response_type = 'code';
  scope = 'openid';
  grant_type = 'authorization_code';

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService,
              private router: Router
  ) {
  }

  async loginWithSso() {
    const codeChallengeMethod = 'S256';
    const codeVerifier = this.random(50);
    const codeChallenge = await this.generateChallenge(codeVerifier);
    const state = this.random(6);
    const ssoData: SsoData = {
      state: state,
      codeChallenge: codeChallenge,
      codeVerifier: codeVerifier,
      codeChallengeMethod: codeChallengeMethod
    };
    // save to session storage
    sessionStorage.setItem('sso', JSON.stringify(ssoData));
    const url = `${this.authorizeEndpoint}`
      + `?response_type=${this.response_type}`
      + `&client_id=${this.client_id}`
      + `&redirect_uri=${encodeURIComponent(this.redirect_url)}`
      + `&scope=${this.scope}`
      + `&state=${state}`
      + `&code_challenge=${codeChallenge}`
      + `&code_challenge_method=${codeChallengeMethod}`;
    console.log('-- url: ', url);

    // redirect to sso provider
    window.location.href = url;
  }

  async handleCallback(authorizationCode: string, state: string) {
    const ssoDataStr = sessionStorage.getItem('sso');
    if (!!ssoDataStr) {
      const ssoData: SsoData = JSON.parse(ssoDataStr);
      if (state !== ssoData.state) {
        console.error('INVALID STATE');
      } else {
        // call token endpoint
        const url = `${this.tokenEndpoint}?`
          + `grant_type=${this.grant_type}`
          + `&client_id=${this.client_id}`
          + `&redirect_uri=${encodeURIComponent(this.redirect_url)}`
          + `&code=${authorizationCode}`
          + `&code_verifier=${ssoData.codeVerifier}`;
        const tokenResp: any = await this.httpClient.post(url, null).toPromise();
        console.log('-- tokenresp: ' , tokenResp);

        // set user to local storage
        const decodedIdToken: any = jwtDecode<any>(tokenResp.id_token);
        const user: User = {
          email: decodedIdToken.sub,
          id_token: decodedIdToken
        };
        localStorage.setItem('user', JSON.stringify(user));

        // clean session storage:
        sessionStorage.removeItem('sso');

        // update app status and back to dashboard
        this.authenticationService.updateLoggedStatus();
        this.router.navigate(['/']);
      }
    }
  }

  async generateChallenge(codeVerifier: string) {
    const buffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(codeVerifier)
    );
    // Generate base64url string
    // btoa is deprecated in Node.js but is used here for web browser compatibility
    // (which has no good replacement yet, see also https://github.com/whatwg/html/issues/6811)
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\//g, '_')
      .replace(/\+/g, '-')
      .replace(/=/g, '');
  }

  random(size: number) {
    const mask =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
    let result = "";
    const randomUints = this.getRandomValues(size);
    for (let i = 0; i < size; i++) {
      // cap the value of the randomIndex to mask.length - 1
      const randomIndex = randomUints[i] % mask.length;
      result += mask[randomIndex];
    }
    return result;
  }

  getRandomValues(size: number) {
    return crypto.getRandomValues(new Uint8Array(size));
  }

}
