import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";
import {BaseService} from "../../../shared/services/base.service";
import {Equipment} from "../../equipment/equipment-list/equipment.component";

@Component({
  selector: 'app-list-facilities',
  templateUrl: './list-facilities.component.html',
  styleUrls: ['./list-facilities.component.css']
})
export class ListFacilitiesComponent implements OnInit {
  displayedColumns: string[] = ['equipmentId','name','quantity','budget','creation','period','state']

  dataSource: Equipment[] = [];
  constructor(private buttonStateService: ButtonStateService, private apiService: BaseService) { }


  ngOnInit(): void {
    this.buttonStateService.setActiveButton('boton1');
    this.apiService.get("/facilities").subscribe({
      next:(response: any)=>{
        this.dataSource = response
        console.log(this.dataSource)
      },
      error:(error)=>{
        console.error("Hubo un error al obtener datos:", error);
      }
    })
  }
  onEditItem(object: any){

  }

}
