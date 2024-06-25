import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";
import {BaseService} from "../../../shared/services/base.service";
import {EquipmentService} from "../services/equipment.service";
import {DialogStudentComponent} from "../../student/dialog-student/dialog-student.component";
import {EquipmentDialogComponent} from "../equipment-dialog/equipment-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EquipmentEditDialogComponent} from "../equipment-edit-dialog/equipment-edit-dialog.component";
import {EquipmentDeleteDialogComponent} from "../equipment-delete-dialog/equipment-delete-dialog.component";

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
  displayedColumns: string[] = ['id','name','quantity','budget','creation','period','status','editDelete']

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

  onEditItem(element: Equipment) {
    const dialogRef = this.dialog.open(EquipmentEditDialogComponent, {
      width: '600px',
      data: {
        id: element.id,
        name: element.name,
        quantity: element.quantity,
        budget: element.budget,
        creation: element.creation,
        period: element.period,
        status: element.status
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let updatedEquipment = {
          id: result.id,
          name: result.name,
          quantity: result.quantity,
          budget: result.budget,
          creation: result.creation,
          period: result.period,
          status: result.status,
        }

        this.apiService.update(result.id, updatedEquipment).subscribe({
          next: (response: any) => {
            // Update the item in the dataSource array
            let index = this.dataSource.findIndex(item => item.id === updatedEquipment.id);
            if (index !== -1) {
              this.dataSource[index] = updatedEquipment;
            }
          },
          error: (error: any) => {
            // Handle error here
            console.error('There was an error updating the item', error);
          }
        });
      }
    });
  }

  onDeleteItem(element: Equipment) {
    const dialogRef = this.dialog.open(EquipmentDeleteDialogComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // El usuario confirmó la eliminación
        this.apiService.delete(element.id).subscribe({
          next: (response: any) => {
            // Remove the item from the dataSource array
            this.dataSource = this.dataSource.filter(item => item.id !== element.id);
          },
          error: (error: any) => {
            // Handle error here
            console.error('There was an error deleting the item', error);
          }
        });
      }
    });
  }


}
