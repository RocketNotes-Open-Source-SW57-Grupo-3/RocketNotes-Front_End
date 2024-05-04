import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFacilitiesComponent } from './list-facilities/list-facilities.component';
import {SharedModule} from "../../shared/shared.module";
import {FacilitieRoutingModule} from "./facilitie-routing.module";
import {FacilitiesModule} from "../maintenance/facilities.module";



@NgModule({
  declarations: [
    ListFacilitiesComponent
  ],
  imports: [
    CommonModule,
    FacilitieRoutingModule,
    SharedModule,
    FacilitiesModule
  ]
})
export class FacilitieModule { }
