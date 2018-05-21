import {Injectable} from '@angular/core';

@Injectable()
export class ViewModeService {
    private _viewMode;
    private _isVisible = false;
    private _isReset = true;
    private _isNavbar = false;

    set viewModeValue(value: string) {
        this._viewMode = value;
    }

    get viewModeValue(): string {
        return this._viewMode;
    }

    set isVisibleValue(value: boolean) {
        this._isVisible = value;
    }

    get isVisibleValue(): boolean {
        return this._isVisible;
    }

    set isResetValue(value: boolean) {
        this._isReset = value;
    }

    get isResetValue(): boolean {
        return this._isReset;
    }

    set isNavbarValue(value: boolean) {
        this._isNavbar = value;
    }

    get isNavbarValue(): boolean {
        return this._isNavbar;
    }
}
