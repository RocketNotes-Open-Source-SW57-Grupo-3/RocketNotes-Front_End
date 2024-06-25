import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { EquipmentComponent } from './equipment-list/equipment.component';
import {SharedModule} from "../../shared/shared.module";
import {EquipmentRoutingModule} from "./equipment-routing.module";
import {FacilitiesModule} from "../maintenance/facilities.module";
import { EquipmentDialogComponent } from './equipment-dialog/equipment-dialog.component';
import { EquipmentEditDialogComponent } from './equipment-edit-dialog/equipment-edit-dialog.component';
import { EquipmentDeleteDialogComponent } from './equipment-delete-dialog/equipment-delete-dialog.component';



@NgModule({
  declarations: [
    EquipmentComponent,
    EquipmentDialogComponent,
    EquipmentEditDialogComponent,
    EquipmentDeleteDialogComponent,
  ],
  exports:[
    EquipmentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EquipmentRoutingModule,
    FacilitiesModule,
    HttpClientModule,
  ]
})
export class EquipmentModule { }
