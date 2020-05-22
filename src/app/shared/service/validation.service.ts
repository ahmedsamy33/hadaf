import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  public static getValidationErrorMessage(validatorName: string, validatorValue?: any): any {
    const config = {
      required: `Field is required.`,
      invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      maxlength: `The field can't contain more than ${validatorValue.requiredLength} characters.`,
      minlength: `The field must contain atleast ${validatorValue.requiredLength} characters.`
    };

    return config[validatorName];
  }


}
