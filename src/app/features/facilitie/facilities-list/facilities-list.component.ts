import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";
import {FacilitieService} from "../service/facilitie.service";
import {MatDialog} from "@angular/material/dialog";
import {FacilitiesDialogComponent} from "../facilities-dialog/facilities-dialog.component";


export interface Facility {
  id: string;
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
  displayedColumns: string[] = ['id','name','budget','creation','period','status']

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

  openDialog(){
    const dialogRef= this.dialog.open(FacilitiesDialogComponent,{
      width: '600px',
      data:{
        name:this.facility.name,
        budget: this.facility.budget,
        creation: this.facility.creation,
        period: this.facility.period,
        status : this.facility.status
      }
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result.name!=null){
        let facility1 ={
          name:result.name,
          budget:result.budget,
          creation:result.creation,
          period:result.period,
          status: result.status,
        }
        this.apiService.create(facility1).pipe(
            //finalize(() => location.reload())
        ).subscribe({
          next:(response:any)=>{
            console.log(response);
          },
          error: (error: any) => {
            console.error('There was an error creating the item', error);
          }
        })
      }
    })
  }


}
