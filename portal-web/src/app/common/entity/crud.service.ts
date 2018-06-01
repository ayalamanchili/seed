import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export abstract class CrudService<T> {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  readAll(): Observable<T[]> {
    return this.http.get<T[]>(this.getReadAllURI());
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

  getReadURI(id: number): string {
    return this.getURI() + "/" + id;
  }

  getReadAllURI(): string {
    return this.getURI();
  }

  getSaveURI(): string {
    return this.getURI();
  }

  getDeleteURI(id: number): string {
    return this.getURI() + "/" + id;
  }

  abstract getURI(): string;
}
