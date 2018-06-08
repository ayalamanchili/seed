import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/common/entity/crud';
import { CrudService } from 'src/app/common/entity/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';


export abstract class CreateComponent<T> extends Crud<T> implements OnInit {

  crudService: CrudService<T>;
  router: Router;
  route: ActivatedRoute;

  constructor(crudService: CrudService<T>, router: Router, private snackBar: MatSnackBar, private location: Location) {
    super();
    this.crudService = crudService;
    this.router = router;
    this.entity = <T>{};
  }

  ngOnInit() {

  }
  save() {
    this.crudService.save(this.entity).subscribe(
      data => {
        this.showEntityCreatedMessage();
        this.afterCreateNavigateTo();
      },
      error => {
        this.handleValidationErrors(error);
      }
    );
  }

  getEntityIdParamName(): string {
    return "id";
  }


  showEntityCreatedMessage() {
    this.snackBar.open("Created.", "", { duration: 3000 });
  }

  afterCreateNavigateTo() {
    this.location.back();
  }

}