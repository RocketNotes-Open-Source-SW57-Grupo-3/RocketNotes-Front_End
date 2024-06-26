import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FacilitiesListComponent} from "./facilities-list/facilities-list.component";
import {SharedModule} from "../../shared/shared.module";
import {FacilitieRoutingModule} from "./facilitie-routing.module";
import {FacilitiesModule} from "../maintenance/facilities.module";
import { FacilitiesDialogComponent } from './facilities-dialog/facilities-dialog.component';
import { FacilityEditDialogComponent } from './facility-edit-dialog/facility-edit-dialog.component';
import { FacilityDeleteDialogComponent } from './facility-delete-dialog/facility-delete-dialog.component';




@NgModule({
  declarations: [
    FacilitiesListComponent,
    FacilitiesDialogComponent,
    FacilityEditDialogComponent,
    FacilityDeleteDialogComponent,

  ],
  imports: [
    CommonModule,
    FacilitieRoutingModule,
    SharedModule,
    FacilitiesModule
  ]
})


export class FacilitieModule { }
