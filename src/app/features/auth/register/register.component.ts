import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from "../../../infrastructure/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  hidePassword = true;
  hidePasswordConfirm = true;

  constructor(private formBuilder: FormBuilder, private router: Router,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userRole: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;


    const { firstName, lastName, email, password, userRole } = this.registerForm.value;

    this.authenticationService.signUp({ firstName, lastName, email, password, userRole }).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.loading = false;
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.loading = false;
      }
    });

  }

  cancel() {
    // Aquí iría la lógica para cancelar el registro y volver a la página de login
    this.router.navigate(['/auth/login']);
  }
}
