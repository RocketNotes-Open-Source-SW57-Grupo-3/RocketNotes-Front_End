import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as moment from 'moment';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';


export interface Equipment {
  name: string
  quantity: string
  budget: string
  creation: string
  period: string
  state: string
}

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.css']
})
export class EquipmentDialogComponent implements OnInit {
  assignedDate = new FormControl(moment().add(1, 'days').toDate(), [Validators.required, this.dateValidator()]); // Fecha asignada para calcular el período

  constructor(
      public dialogRef: MatDialogRef<EquipmentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data:Equipment
  ) { }

  onNoClick():void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.data.creation = moment().format('MMMM D, YYYY');
    this.calculatePeriod();
  }

  calculatePeriod() {
    const creationMoment = moment(this.data.creation, 'MMMM D, YYYY');
    const assignedMoment = moment(this.assignedDate.value);
    const duration = moment.duration(assignedMoment.diff(creationMoment));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    if (years > 0) {
      this.data.period = `${years} years`;
    } else if (months > 0) {
      this.data.period = `${months} months`;
    } else {
      this.data.period = `${days} days`;
    }
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = moment(control.value).isSameOrBefore(moment(this.data.creation, 'MMMM D, YYYY'));
      return forbidden ? {forbiddenDate: {value: control.value}} : null;
    };
  }
}
