import { ApiErrorMessage } from '../../common/model/api-error-message';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../common/model/api-error';
import { Observable } from 'rxjs';

export abstract class Crud<T> {
    entityId: number;
    entity: T;
    validationErrors: ApiErrorMessage[];


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
        if (apiError.status === 'BAD_REQUEST') {
            this.validationErrors = apiError.errors;
        } else {
            return Observable.throw(error.error());
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
                if (errMsg.key === key) {
                    return errMsg.message;
                }
            }
        }
    }
    /**
     * 
     * @param key 
     */
    getMessageClass(key: string) {
        if (this.validationErrors && this.validationErrors.length > 0) {
            for (let errMsg of this.validationErrors) {
                if (errMsg.key === key) {
                    return "mat-error";
                }
            }
        }
        return "mat-hint";
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
    
}
