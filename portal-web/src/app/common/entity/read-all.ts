import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { OnInit } from '@angular/core';
import { CrudService } from './crud.service';
import { MatSnackBar, PageEvent, MatPaginator, MatSort } from '@angular/material';
import { ApiErrorMessage } from '../../common/model/api-error-message';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../common/model/api-error';
import { Page } from 'src/app/common/model/page';
import { ViewChild } from '@angular/core';

export abstract class ReadAll<T> implements OnInit {

    validationErrors: ApiErrorMessage[];

    crudService: CrudService<T>;

    dataSource: DataSource<T>;

    // MatPaginator 
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    page: Page<T> = new Page();
    pageNumber: number = 0;
    pageEvent: PageEvent;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];


    displayedColumns = this.getDisplayedColumns();

    constructor(crudService: CrudService<T>, private snackBar: MatSnackBar) {
        this.crudService = crudService;
    }
    //TODO on view init?
    ngOnInit() {
        this.getData();

    }

    abstract getDisplayedColumns();

    getData() {
        this.crudService.readAll(this.pageNumber , this.pageSize).subscribe(data => {
            this.page = data;
            this.dataSource = new EntityDataSource(of(this.page.content));
        });
    }

    public onPaginateChange(event: PageEvent) {
        this.pageNumber = event.pageIndex;
        this.getData();
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