import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HideOrShowPasswortInInputServiceService } from 'src/app/services/hide-or-show-passwort-in-input-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private hideOrShowPasswordService: HideOrShowPasswortInInputServiceService, private router: Router) { }

  username: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';

  signUp() {
    const requestOptions = this.createRequestOptions();

    fetch("https://scholzniels.pythonanywhere.com/api/registration/", requestOptions)
      .then(this.handleResponse)
      .then(({ ok, body }) => {
        if (ok) {
          this.storeToken(body.key);
          this.switchToLoginContainer();
          this.hideOrShowPasswordService.setSignUpSuccess(true);
          this.disableSignUpField();
          console.log('User Sign Up successful');
        } else {
          this.showSignUpErrorMessages(body);
        }
      })
      .catch(error => console.log('error', error));
  }

  disableSignUpField(){
    setTimeout(() => {
      this.hideOrShowPasswordService.setSignUpSuccess(false);
    }, 1500);
  }

  createRequestOptions(): RequestInit {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": this.username,
      "email": this.email,
      "password1": this.password1,
      "password2": this.password2
    });

    return {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
  }

  handleResponse(response: Response) {
    return response.json().then(result => ({
      ok: response.ok,
      body: result
    }));
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  showSignUpErrorMessages(result: any) {
    console.log(result);
    this.showError('username-error', result.username);
    this.showError('email-error', result.email);
    this.showError('password1-error', result.password1);
    this.showError('password2-error', result.password2);
    this.showError('password2-error', result.non_field_errors);
  }

  showError(elementId: string, error: string[] | undefined) {
    if(error) {
      document.getElementById(elementId)!.innerHTML = error[0];
    }
  }

  showOrHidePassword(id1: string, id2: string, id3: string): void {
    this.hideOrShowPasswordService.showOrHidePassword(id1, id2, id3);
  }

  switchToLoginContainer() {
    document.getElementById('sign-in-button-container')!.classList.remove('d-none');
    document.getElementById('login-container')!.classList.remove('d-none');
    document.getElementById('register-container')!.classList.add('d-none');
  }

}
