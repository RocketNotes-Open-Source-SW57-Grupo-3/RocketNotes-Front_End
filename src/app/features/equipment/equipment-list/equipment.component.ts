import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";
import {BaseService} from "../../../shared/services/base.service";
import {EquipmentService} from "../services/equipment.service";
import {DialogStudentComponent} from "../../student/dialog-student/dialog-student.component";
import {EquipmentDialogComponent} from "../equipment-dialog/equipment-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export interface Equipment {
  id: string;
  name: string;
  quantity: bigint;
  budget: bigint;
  creation: string;
  period: string;
  status: string;
}

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})

export class EquipmentComponent implements OnInit {
  displayedColumns: string[] = ['id','name','quantity','budget','creation','period','status']

  dataSource: Equipment[] = [];
  equipment: any={}
  constructor(private buttonStateService: ButtonStateService, private apiService: EquipmentService,public dialog: MatDialog) { }


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
  openDialog(){
    const dialogRef= this.dialog.open(EquipmentDialogComponent,{
      width: '600px',
      data:{
        name:this.equipment.name,
        quantity: this.equipment.quantity,
        creation: this.equipment.creation,
        budget: this.equipment.budget,
        period: this.equipment.period,
        status : this.equipment.status

      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result.name!=null){
        let equipment1 ={
          name:result.name,
          quantity:result.quantity,
          budget:result.budget,
          creation:result.creation,
          period:result.period,
          status: result.status,
        }
        this.apiService.create(equipment1).subscribe({
              next:(response:any)=>{
                console.log(response);
              }
            }
        )

      }

    })
  }

}
