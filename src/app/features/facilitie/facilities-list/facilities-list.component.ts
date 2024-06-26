import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";
import {FacilitieService} from "../service/facilitie.service";
import {MatDialog} from "@angular/material/dialog";
import {FacilitiesDialogComponent} from "../facilities-dialog/facilities-dialog.component";
import {EquipmentDeleteDialogComponent} from "../../equipment/equipment-delete-dialog/equipment-delete-dialog.component";
import {finalize} from "rxjs/operators";
import {Equipment} from "../../equipment/equipment-list/equipment.component";
import {FacilityEditDialogComponent} from "../facility-edit-dialog/facility-edit-dialog.component";
import {FacilityDeleteDialogComponent} from "../facility-delete-dialog/facility-delete-dialog.component";


export interface Facility {
  id: string;
  name: string;
  budget: bigint;
  creation: string;
  period: string;
  status: string;
}

export interface FacilityWithoutId {
  name: string;
  budget: bigint;
  creation: string;
  period: string;
  status: string;
}

@Component({
  selector: 'app-facilities-list',
  templateUrl: './facilities-list.component.html',
  styleUrls: ['./facilities-list.component.css']
})

export class FacilitiesListComponent implements OnInit {
  displayedColumns: string[] = ['id','name','budget','creation','period','status','editDelete']

  dataSource: Facility[] = [];
  facility: any={}
  constructor(private buttonStateService: ButtonStateService, private apiService: FacilitieService,public dialog: MatDialog) { }


  ngOnInit(): void {
    this.buttonStateService.setActiveButton('boton1');
    this.apiService.get().subscribe({
      next:(response: any)=>{
        this.dataSource = response
        console.log(this.dataSource)
      }
    })
  }

  openDialog() {
  const dialogRef = this.dialog.open(FacilitiesDialogComponent, {
    width: '600px',
    data: {
      name: this.facility.name,
      budget: this.facility.budget,
      creation: this.facility.creation,
      period: this.facility.period,
      status: this.facility.status
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Valor de period después de cerrar el diálogo: ', result.period);
      let facility1: FacilityWithoutId = {
        name: result.name,
        budget: result.budget,
        creation: result.creation,
        period: result.period,
        status: result.status,
      }
      console.log('Valor de period antes de llamar a apiService.create(): ', facility1.period);
      this.apiService.createFacility(facility1).pipe(
          //finalize(() => location.reload())
      ).subscribe({
        next: (response: any) => {
          if (response.period !== response.creation) {
            console.log('Valor de period después de llamar a apiService.create(): ', response.period);
          } else {
            console.log('El valor de period es igual al valor de creation. Verifica el servidor.');
          }
          console.log(response);
        },
        error: (error: any) => {
          console.error('There was an error creating the item', error);
        }
      })
    } else {
      console.log('Dialog was closed without selecting a value.');
    }
  });
}
    onEditItem(element: Facility) {
      const dialogRef = this.dialog.open(FacilityEditDialogComponent, {
        width: '600px',
        data: {
          id: element.id,
          name: element.name,
          budget: element.budget,
          creation: element.creation,
          period: element.period,
          status: element.status
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let updatedStatus = result.status;

          this.apiService.updateStatus(result.id, 'FINALIZED').subscribe({
            next: (response: any) => {
              // Update the item in the dataSource array
              let index = this.dataSource.findIndex(item => item.id === result.id);
              if (index !== -1) {
                this.dataSource[index].status = 'FINALIZED';
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
      const dialogRef = this.dialog.open(FacilityDeleteDialogComponent, {
        width: '400px',
        data: element
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.apiService.delete(element.id).pipe(
              finalize(() => location.reload())
          ).subscribe({
            next: (response: any) => {
              console.log('Delete response:', response);
            },
            error: (error: any) => {
              console.error('There was an error deleting the item', error);
            }
          });
        }
      });
    }

}
