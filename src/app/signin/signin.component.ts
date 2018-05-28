import { Component, OnInit, } from '@angular/core';
import { FormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CountryService } from '../Services/country.service';
import { AppError } from '../custom/app-error';
import { BadInput } from '../custom/bad-input';
import { ViewModeService } from '../Services/view-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  isSuccess = false;
  pwdEyeOpen: boolean;

  constructor(
    private service: CountryService,
    private viewService: ViewModeService,
    private router: Router,
    fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.pwdEyeOpen = false;
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  signIn(f) {
    // console.log(f.value);
    const submitData = { 'command': 'AuthenticateUser', 'data': f.value, 'service': 'UserService' };
    this.service.authenticateUser(submitData)
      .subscribe(
        result => {
          if (result) {
            // this.isSuccess = true;
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            this.router.navigate([returnUrl || '/landing']);
          } else {
            this.form.setErrors({ signInFail: true });
          }
        },
        (error: AppError) => {
          if (error instanceof BadInput) {
            console.log('The requested URL or Data ae not in Valid format.');
          }
          throw error;
        });
  }

  showForgot() {
    this.viewService.isResetValue = false;
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

}
