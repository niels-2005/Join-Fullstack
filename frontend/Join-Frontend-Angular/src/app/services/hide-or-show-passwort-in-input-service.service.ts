import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideOrShowPasswortInInputServiceService {

  constructor() { }

  showOrHidePassword(id1: string, id2: string, id3:string): void {
    const passwordInput = document.getElementById(id1) as HTMLInputElement;
    const showPasswordImage = document.getElementById(id2) as HTMLImageElement;
    const hidePasswordImage = document.getElementById(id3) as HTMLImageElement;

    if (this.passwordTypeIsPassword(passwordInput)) {
      this.changePasswordTypeToText(hidePasswordImage, showPasswordImage, passwordInput);
    } else if (this.passwordTypeIsText(passwordInput)) {
      this.changePasswordTypeToPassword(hidePasswordImage, showPasswordImage, passwordInput);
    }
  }

  passwordTypeIsPassword(passwordInput: any){
    return passwordInput && passwordInput.type === 'password'
  }

  changePasswordTypeToText(hidePasswordImage: HTMLImageElement, showPasswordImage: HTMLImageElement, passwordInput: any){
      hidePasswordImage.classList.add('d-none');
      showPasswordImage.classList.remove('d-none');
      passwordInput.type = 'text';
  }

  passwordTypeIsText(passwordInput: any){
    return passwordInput
  }

  changePasswordTypeToPassword(hidePasswordImage: HTMLImageElement, showPasswordImage: HTMLImageElement, passwordInput: any){
      showPasswordImage.classList.add('d-none');
      hidePasswordImage.classList.remove('d-none');
      passwordInput.type = 'password';
}

  private _signUpSuccess = new BehaviorSubject<boolean>(false);
  signUpSuccess$ = this._signUpSuccess.asObservable();

  setSignUpSuccess(value: boolean) {
    this._signUpSuccess.next(value);
  }
}
