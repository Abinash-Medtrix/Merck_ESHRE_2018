import { Component, OnInit } from '@angular/core';
import { CountryService } from '../Services/country.service';
import { AppError } from '../custom/app-error';
import { BadInput } from '../custom/bad-input';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { CustomValidations } from '../custom/custom-validation';
import { ViewModeService } from '../Services/view-service';

function passwordConfirming(c: AbstractControl): any {
  if (!c.parent || !c) { return; }
  const pwd = c.parent.get('newPassword');
  const cpwd = c.parent.get('confirmPassword');

  if (!pwd || !cpwd) { return; }
  if (pwd.value !== cpwd.value) {
    return { passwordsShouldMatch: true };
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  cParam = { 'command': 'GetCountryList', 'data': {}, 'service': 'UserService' };
  countries: any[];
  formSuccess = false;
  form: FormGroup;
  pwdEyeOpen: boolean;
  cPwdEyeOpen: boolean;

  constructor(private service: CountryService, private viewService: ViewModeService, fb: FormBuilder) {
    this.pwdEyeOpen = false;
    this.cPwdEyeOpen = false;
    // form Validation...
    this.form = fb.group({
      fname: ['', [Validators.required, Validators.pattern('^[a-zA-Z .]{1,15}$')]],
      lname: ['', [Validators.required, Validators.pattern('^[a-zA-Z .]{1,15}$')]],
      email: ['', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.-_-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
        ],
        CustomValidations.emailExists(this.service)
      ],
      country: ['', Validators.required],
      newsLetter: ['', [Validators.required, Validators.requiredTrue]],
      terms: ['', [Validators.required, Validators.requiredTrue]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, passwordConfirming]],
      accesscode: ['', Validators.required, CustomValidations.accessCodeShouldMatch]
    });
  }

  ngOnInit() {
    // Getting Country List
    this.service.getCountry(this.cParam)
      .subscribe(
        countries => {
          this.countries = countries.result;
        },
        (error: AppError) => {
          if (error instanceof BadInput) {
            console.log('The requested URL or Data ae not in Valid format.');
          } else { throw error; }
        });
  }
  // submiting the form for registering the user to app.
  register() {
    const formValue = {
      'userid': 0,
      'firstname': '' + this.form.value.fname,
      'lastname': '' + this.form.value.lname,
      'email': '' + this.form.value.email,
      'password': '' + this.form.value.newPassword,
      'accesscode': '' + this.form.value.accesscode,
      'country': '' + this.form.value.country,
      'active': true,
      'token': ''
    };
    const submitData = { 'command': 'CreateUser', 'data': formValue, 'service': 'UserService' };

    this.service.create(submitData)
      .subscribe(
        userCreatred => {
          console.log('userCreatred : ', userCreatred.result);
          if (userCreatred.result.iserror) {
            this.form.setErrors({ registerFail: true });
          } else {
            this.formSuccess = true;
            setTimeout(() => {
              this.viewService.isVisibleValue = false;
            }, 1500);
            // this.viewService.viewModeValue = 'signin';
          }
        },
        (error: AppError) => {
          if (error instanceof BadInput) {
            console.log('The requested URL or Data ae not in Valid format.');
          }
          throw error;
        });
  }

  get fname() { return this.form.get('fname'); }
  get lname() { return this.form.get('lname'); }
  get email() { return this.form.get('email'); }
  get newPassword() { return this.form.get('newPassword'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get accesscode() { return this.form.get('accesscode'); }
  get country() { return this.form.get('country'); }
  get terms() { return this.form.get('terms'); }
  get newsLetter() { return this.form.get('newsLetter'); }
}
