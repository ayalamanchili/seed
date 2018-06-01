import { ApiErrorMessage } from '../../common/model/api-error-message';

export class ApiError {
    status: string;
    message: string;
    errors: ApiErrorMessage[];
}
