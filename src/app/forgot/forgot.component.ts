import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewModeService } from '../Services/view-service';
import { CountryService } from '../Services/country.service';
import { CustomValidations } from '../custom/custom-validation';
import { AppError } from '../custom/app-error';
import { BadInput } from '../custom/bad-input';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  form: FormGroup;
  constructor(private viewService: ViewModeService, private service: CountryService, fb: FormBuilder) {
    this.form = fb.group({
      /* emailAddr: ['', Validators.required] */
      emailAddr: ['',
        [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')],
        CustomValidations.emailRegistered(this.service)
      ]
    });
  }

  ngOnInit() { }


  forgotPwd(f) {
    const submitData = { 'command': 'ForgotPassword', 'data': f.value, 'service': 'UserService' };
    this.service.forgotPwd(submitData)
      .subscribe(
        userCreatred => {
          // console.log(`userCreatred : , ${userCreatred.result}`);
          if (userCreatred.result > 0) {
            console.log('Sent Emai');
            // this.form.setErrors({ registerFail: true });
          } else { }
        },
        (error: AppError) => {
          if (error instanceof BadInput) {
            console.log('The requested URL or Data ae not in Valid format.');
          }
          throw error;
        });
  }

  showLogin() {
    this.viewService.isResetValue = true;
  }

  get emailAddr() { return this.form.get('emailAddr'); }

}
