import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  registerControl = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required]),
    checkPass: new FormControl('', [this.checkMatchingPasswords.bind(this)]),
  });

  nameControl: AbstractControl;
  usernameControl: AbstractControl;
  emailControl: AbstractControl;
  passControl: AbstractControl;
  checkPassControl: AbstractControl;

  constructor(private authService: AuthService) {
    this.nameControl = this.registerControl.get('name');
    this.usernameControl = this.registerControl.get('username');
    this.emailControl = this.registerControl.get('email');
    this.passControl = this.registerControl.get('pass');
    this.checkPassControl = this.registerControl.get('checkPass');
  }

  checkMatchingPasswords(control: AbstractControl): ValidationErrors {
    if (this.passControl && this.passControl.value !== control.value) {
      return {error: {value: control.value}};
    }
  }

  submit() {
    this.authService.register({
      name: this.nameControl.value,
      username: this.usernameControl.value,
      email: this.emailControl.value,
      pass: this.passControl.value
    }).subscribe(() => {
      alert('Usuário cadastrado com sucesso!');
    }, err => console.error(err));
  }
}
