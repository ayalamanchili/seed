import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'src/app/common/model/page';
import { Sort } from '@angular/material';

@Injectable()
export abstract class CrudService<T> {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  readAll(start: number, limit: number, sort: Sort): Observable<Page<T>> {
    return this.http.get<Page<T>>(this.getReadAllURI(start, limit, sort, null));
  }

  read(id: number): Observable<T> {
    return this.http.get<T>(this.getReadURI(id));
  }

  save(entity: T): Observable<T> {
    return this.http.post<T>(this.getSaveURI(), entity);
  }

  delete(id: number) {
    return this.http.delete<T>(this.getDeleteURI(id));
  }

  search(start: number, limit: number, sort: Sort, search: string): Observable<Page<T>> {
    return this.http.get<Page<T>>(this.getSearchURI(start, limit, sort, search));
  }

  getReadURI(id: number): string {
    return this.getURI() + "/" + id;
  }

  getReadAllURI(start: number, limit: number, sort: Sort, search: string): string {
    var url = this.getURI() + "?page=" + start + "&size=" + limit;
    if (sort != null) {
      url = url + "&sort=" + sort.active + "," + sort.direction;
    }
    if (search != null) {
      url = url + search;
    }
    return url;
  }

  getSaveURI(): string {
    return this.getURI();
  }

  getDeleteURI(id: number): string {
    return this.getURI() + "/" + id;
  }

  getSearchURI(start: number, limit: number, sort: Sort, search: string): string {
    console.log(this.getReadAllURI(start, limit, sort, search));
    return this.getReadAllURI(start, limit, sort, search);
  }

  abstract getURI(): string;
}
