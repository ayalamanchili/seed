import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { MatSnackBar, PageEvent, MatPaginator, Sort } from '@angular/material';
import { ApiErrorMessage } from '../../../common/model/api-error-message';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../../common/model/api-error';
import { Page } from 'src/app/common/model/page';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';


export abstract class ReadAllComponent<T> implements OnInit {

  validationErrors: ApiErrorMessage[];

  crudService: CrudService<T>;

  entity: T;

  dataSource: DataSource<T>;

  page: Page<T> = new Page();
  sort: Sort;
  pageNumber: number = 0;
  pageEvent: PageEvent;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  columns: string[] = this.getColumns();
  displayedColumns: string[] = this.getDisplayedColumns();

  constructor(crudService: CrudService<T>, private snackBar: MatSnackBar) {
    this.entity = {} as T;
    this.crudService = crudService;
  }

  getSearchTab(): string {
    return "app-search-employee";
  }
  //TODO on view init?
  ngOnInit() {
    this.getData();
  }

  abstract getColumns(): string[];

  getDisplayedColumns(): string[] {
    return ['action'].concat(this.getColumns());
  }

  abstract getID();

  getData() {
    this.crudService.readAll(this.pageNumber, this.pageSize, this.sort).subscribe(data => {
      this.page = data;
      this.dataSource = new EntityDataSource(of(this.page.content));
    });
  }


  search() {
    this.crudService.search(this.pageNumber, this.pageSize, this.sort, this.getSearchUrl()).subscribe(data => {
      this.page = data;
      this.dataSource = new EntityDataSource(of(this.page.content));
    });
  }

  clearSearch() {
    this.entity = {} as T;
    this.getData();
  }
  getSearchUrl(): string {
    var search = "&search=";
    for (let property of this.getColumns()) {
      if (this.entity[property] != null) {
        search = search + property + ":" + this.entity[property] + ",";
      }
    }
    console.log(search);
    return search;
  }

  public getColumnDisplayName(columnName: string): string {
    return columnName.replace(/^[a-z]|[A-Z]/g, function (v, i) {
      return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
    });
  }

  public onPaginateChange(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.getData();
  }

  public sortData(sort: Sort) {
    this.sort = sort;
    this.getData();
  }

  delete(id: number) {
    this.crudService.delete(id).subscribe(
      data => {
        this.snackBar.open(this.getDeleteSuccessfullMessage(), "", { duration: 3000 });
        this.afterDeleteAction();
      },
      error => {
        console.log(error);
      }
    );
  }

  afterDeleteAction() {
    this.getData();
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
  disconnect() { }

}