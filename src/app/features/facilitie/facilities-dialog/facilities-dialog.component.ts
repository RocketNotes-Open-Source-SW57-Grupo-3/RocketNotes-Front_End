import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as moment from 'moment';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {Equipment} from "../../equipment/equipment-dialog/equipment-dialog.component";

export interface Facility {
  name: string
  budget: string
  creation: string
  period: string
  state: string
}

@Component({
  selector: 'app-facilities-dialog',
  templateUrl: './facilities-dialog.component.html',
  styleUrls: ['./facilities-dialog.component.css']
})
export class FacilitiesDialogComponent implements OnInit {
  assignedDate = new FormControl(moment().add(1, 'days').toDate(), [Validators.required, this.dateValidator1()]);

  constructor(
      public dialogRef: MatDialogRef<FacilitiesDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:Facility
  ) { }

  ngOnInit(): void {
    this.data.creation = moment().format('MMMM D, YYYY');
    console.log('Valor inicial de creation: ', this.data.creation);
    this.calculatePeriod1();
    console.log('Valor inicial de period después de calcular: ', this.data.period);
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  calculatePeriod1() {
      const creationMoment1 = moment(this.data.creation, 'MMMM D, YYYY');
      const assignedMoment1 = moment(this.assignedDate.value);
      const duration1 = moment.duration(assignedMoment1.diff(creationMoment1));
      const years1 = duration1.years();
      const months1 = duration1.months();
      const days1 = duration1.days();

      if (years1 > 0) {
        this.data.period = `${years1} years`;
      } else if (months1 > 0) {
        this.data.period = `${months1} months`;
      } else {
        this.data.period = `${days1} days`;
      }

      console.log('La función calculatePeriod1 se está ejecutando');
      console.log('El valor de period es: ', this.data.period);
    }


  dateValidator1(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = moment(control.value).isSameOrBefore(moment(this.data.creation, 'MMMM D, YYYY'));
      return forbidden ? {forbiddenDate: {value: control.value}} : null;
    };
  }
}
