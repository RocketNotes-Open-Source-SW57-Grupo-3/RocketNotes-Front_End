import { Component, OnInit } from '@angular/core';
import {ButtonStateService} from "../../maintenance/ButtonStateService";

@Component({
  selector: 'app-list-facilities',
  templateUrl: './list-facilities.component.html',
  styleUrls: ['./list-facilities.component.css']
})
export class ListFacilitiesComponent implements OnInit {

  constructor(private buttonStateService: ButtonStateService) { }

  ngOnInit(): void {
    this.buttonStateService.setActiveButton('boton1');  }

}
