export interface SsoData {
  state?: string;
  codeChallenge?: string;
  codeVerifier?: string;
  codeChallengeMethod?: string;
}
