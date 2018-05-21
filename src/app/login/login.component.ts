import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from '../Services/country.service';
import { AppError } from '../custom/app-error';
import { BadInput } from '../custom/bad-input';
import { ViewModeService } from '../Services/view-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private viewService: ViewModeService) { }

  ngOnInit() { }

  get isReset() {
    return this.viewService.isResetValue;
  }

}
