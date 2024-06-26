import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../infrastructure/services/authentication.service";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  fullName: string = "";
  email: string = "";
  alias: string = "";

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.email = currentUser.username; // O currentUser.email si tu API retorna 'email'
    }
  }

}
