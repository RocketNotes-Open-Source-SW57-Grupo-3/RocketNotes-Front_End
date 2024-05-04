import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";
import {BaseService} from "../../../shared/services/base.service";
import {EquipmentService} from "../services/equipment.service";

export interface Equipment {
  equipmentId: string;
  name: string;
  quantity: string;
  budget: string;
  creation: string;
  period: string;
  state: string;
}

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})

export class EquipmentComponent implements OnInit {
  displayedColumns: string[] = ['equipmentId','name','quantity','budget','creation','period','state']

  dataSource: Equipment[] = [];
  constructor(private buttonStateService: ButtonStateService, private apiService: EquipmentService) { }


  ngOnInit(): void {
    this.buttonStateService.setActiveButton('boton2');
    this.apiService.get().subscribe({
      next:(response: any)=>{
       this.dataSource = response
        console.log(this.dataSource)
      }
    })
  }
  onEditItem(object: any){

  }

}
