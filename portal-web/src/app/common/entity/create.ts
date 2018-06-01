import { Crud } from "./crud";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CrudService } from './crud.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

export abstract class Create<T> extends Crud<T> {
    crudService: CrudService<T>;
    router: Router;

    constructor(crudService: CrudService<T>, router: Router, private snackBar: MatSnackBar,private location: Location) {
        super();
        this.crudService = crudService;
        this.router = router;
        this.entity = <T>{};
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

    showEntityCreatedMessage() {
        this.snackBar.open("Created.", "", { duration: 3000 });
    }

    afterCreateNavigateTo() {
       this.location.back();
    }
}
