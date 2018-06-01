import { Crud } from "./crud";
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CrudService } from './crud.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

export abstract class Update<T> extends Crud<T> implements OnInit {
    crudService: CrudService<T>;
    router: Router;
    route: ActivatedRoute

    constructor(crudService: CrudService<T>, router: Router, route: ActivatedRoute,private location: Location, private snackBar: MatSnackBar) {
        super();
        this.crudService = crudService;
        this.router = router;
        this.route = route;
        this.entity = <T>{};
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.entityId = +params[this.getEntityIdParamName()];
            this.loadEntity(this.entityId);
        });
    }

    loadEntity(entityId: number) {
        this.crudService.read(entityId).subscribe(
            data => {
                console.log(data);
                this.entity = data;
            },
            error => {
                this.handleValidationErrors(error);
            }
        );
    }

    save() {
        this.crudService.save(this.entity).subscribe(
            data => {
                this.showEntityUpdatedMessage();
                this.afterUpdateNavigateTo();
            },
            error => {
                this.handleValidationErrors(error);
            }
        );
    }

    getEntityIdParamName(): string {
        return "id";
    }


    showEntityUpdatedMessage() {
        this.snackBar.open("Updated.", "", { duration: 3000 });
    }

    afterUpdateNavigateTo() {
        this.location.back();
    }

}
