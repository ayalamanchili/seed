import { ApiErrorMessage } from '../../common/model/api-error-message';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../common/model/api-error';
import { Observable } from 'rxjs';
import { Field } from 'src/app/common/model/field';
import { throwError } from 'rxjs/internal/observable/throwError';

export abstract class Crud<T> {
    entityId: number;
    entity: T;
    validationErrors: ApiErrorMessage[];

    fields: Field[] = this.getFields();

    constructor() {
        this.entity = {} as T;
    }

    /**
     * 
     * @param error 
     */
    handleValidationErrors(error: HttpErrorResponse) {
        console.log(error);
        var apiError: ApiError = error.error;
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else if (apiError.status == '400') {
            var apiError: ApiError = error.error;
            this.validationErrors = apiError.errors;
        } else {
            return throwError(error.error());
            //TODO other errors like 500,timeout etc...
        }

    }

    /**
     * will return the validation message 
     * @param key 
     */
    getMessage(key: string) {
        if (this.isValid()) {
            //TODO return hint
            return null;
        } else {
            for (let errMsg of this.validationErrors) {
                if (errMsg.field === key) {
                    return errMsg.defaultMessage;
                }
            }
        }
    }
    /**
     * 
     */
    isValid() {
        if (this.validationErrors && this.validationErrors.length > 0) {
            return false;
        } else {
            return true;
        }
    }

    abstract getFields(): Field[];

}
