import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { CrudService } from './crud.service';
import { MatSnackBar } from '@angular/material';
import { ApiErrorMessage } from '../../common/model/api-error-message';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../common/model/api-error';

export abstract class ReadAll<T> implements OnInit {

    validationErrors: ApiErrorMessage[];

    crudService: CrudService<T>;

    dataSource: DataSource<T>;

    displayedColumns = this.getDisplayedColumns();

    constructor(crudService: CrudService<T>, private snackBar: MatSnackBar) {
        this.crudService = crudService;
    }

    ngOnInit() {
        this.dataSource = new EntityDataSource(this.getEntities());
    }

    abstract getDisplayedColumns();

    getEntities(): Observable<T[]> {
        return this.crudService.readAll();
    }

    delete(id: number) {
        this.crudService.delete(id).subscribe(
            data => {
                this.snackBar.open(this.getDeleteSuccessfullMessage(), "", { duration: 3000 });
                this.afterDeleteAction();
            },
            error => {

            }
        );
    }

    afterDeleteAction() {
        this.ngOnInit();
    }

    getDeleteSuccessfullMessage(): string {
        return "Successfully deleted";
    }

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
}


export class EntityDataSource<T> extends DataSource<T>  {

    constructor(private entities: Observable<T[]>) {
        super();
    }

    connect(): Observable<T[]> {
        return this.entities;
    }
    disconnect() {

    }

}