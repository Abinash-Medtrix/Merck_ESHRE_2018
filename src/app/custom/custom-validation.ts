import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CountryService } from '../Services/country.service';
import { AppError } from './app-error';
import { BadInput } from './bad-input';

export class CustomValidations {

    constructor(private _service: CountryService) { }
    static passwordsShouldMatch(control: AbstractControl) {
        const newPassword = control.get('newPassword');
        const confirmPassword = control.get('confirmPassword');

        if (newPassword.value !== confirmPassword.value) {
            return { passwordsShouldMatch: true };
        }
        return { passwordsShouldMatch: true };
    }

    static accessCodeShouldMatch(control: AbstractControl) {
        return new Promise((resolve) => {
            if (control.value.toLowerCase() !== 'merck2018') {
                resolve({ accessCodeShouldMatch: true });
            } else {
                resolve(null);
            }
        });
    }

    static emailExists(service: CountryService) {
        return (control: AbstractControl) => {
            const suData = { 'command': 'CheckEmailEntry', 'data': { 'email': control.value }, 'service': 'UserService' };
            return new Promise((resolve, reject) => {
                service.checkEmailExist(suData)
                    .subscribe(
                        isExist => {
                            if (isExist.result) {
                                resolve({ emailAlreadyExists: true });
                            }
                            resolve(null);
                        },
                        (error: AppError) => {
                            if (error instanceof BadInput) {
                                console.log('The requested URL or Data ae not in Valid format.');
                            }
                            throw error;
                        });
            });
        };
    }

    static emailRegistered(service: CountryService) {
        return (control: AbstractControl) => {
            const suData = { 'command': 'CheckEmailEntry', 'data': { 'email': control.value }, 'service': 'UserService' };
            return new Promise((resolve, reject) => {
                service.checkEmailExist(suData)
                    .subscribe(
                        isExist => {
                            if (!isExist.result) {
                                resolve({ emailNotRegistered: true });
                            }
                            resolve(null);
                        },
                        (error: AppError) => {
                            if (error instanceof BadInput) {
                                console.log('The requested URL or Data ae not in Valid format.');
                            }
                            throw error;
                        });
            });
        };
    }
}
