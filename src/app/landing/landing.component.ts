import { Component, OnInit } from '@angular/core';
import { ViewModeService } from '../Services/view-service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor(private viewServise: ViewModeService) { }

  ngOnInit() {
  }

  openPopup(e) {
    if (e.currentTarget.value === '0') {
      this.viewServise.viewModeValue = 'signin';
    } else {
      this.viewServise.viewModeValue = 'register';
    }
    this.viewServise.isVisibleValue = true;
  }

  closePopup() {
    this.viewServise.isVisibleValue = false;
  }
  setViewMode(mode) {
    this.viewServise.viewModeValue = mode;
    this.viewServise.isResetValue = true;
  }
  get viewMode() {
    return this.viewServise.viewModeValue;
  }

  get isVisible() {
    return this.viewServise.isVisibleValue;
  }

}
