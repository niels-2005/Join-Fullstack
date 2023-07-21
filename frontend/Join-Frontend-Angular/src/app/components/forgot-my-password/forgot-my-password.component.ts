import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-forgot-my-password',
  templateUrl: './forgot-my-password.component.html',
  styleUrls: ['./forgot-my-password.component.scss']
})
export class ForgotMyPasswordComponent {

  email: string = "";

  @ViewChild('fmpErrorMessage', { static: false }) fmpErrorMessage!: ElementRef;

  isButtonDisabled = false;

  emailSended = false;

  switchToLoginContainer() {
    document.getElementById('sign-in-button-container')!.classList.remove('d-none');
    document.getElementById('login-container')!.classList.remove('d-none');
    document.getElementById('fmp-container')!.classList.add('d-none');
  }

  async sendResetMail(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": this.email
    });

    const requestOptions : RequestInit= {
      method: 'POST',
      headers: myHeaders,
      body: raw,
};

const resp = await fetch("https://scholzniels.pythonanywhere.com/api/reset/password/", requestOptions);

this.isButtonDisabled = true;

if (resp.ok) {
  this.emailSended = true;
} else {
  const errorData = await resp.json();
  this.fmpErrorMessage.nativeElement.textContent = errorData.detail;
  this.isButtonDisabled = false;
}
}
}
