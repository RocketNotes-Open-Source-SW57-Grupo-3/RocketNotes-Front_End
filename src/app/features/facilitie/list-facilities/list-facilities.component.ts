import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";
import {FacilitieService} from "../service/facilitie.service";


export interface Facilitie {
  name: string;
  description: string;
  budget: string;
  creation: string;
  period: string;
  state: string;
}

@Component({
  selector: 'app-list-facilities',
  templateUrl: './list-facilities.component.html',
  styleUrls: ['./list-facilities.component.css']
})
export class ListFacilitiesComponent implements OnInit {
  displayedColumns: string[] = ['name','description','budget','creation','period','state']

  dataSource: Facilitie[] = [];
  constructor(private buttonStateService: ButtonStateService, private apiService: FacilitieService) { }


  ngOnInit(): void {
    this.buttonStateService.setActiveButton('boton1');
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
