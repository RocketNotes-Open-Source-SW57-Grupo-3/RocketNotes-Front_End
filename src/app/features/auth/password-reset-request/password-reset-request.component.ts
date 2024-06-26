import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../infrastructure/services/authentication.service";

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  hidePassword = true;
  hidePasswordConfirm = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls['newPassword'].value;
    let confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  resetPassword() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;


    const email = this.form.value.email;

    this.authenticationService.resetPassword(email).subscribe({
      next: () => {
        console.log('Password reset request successful');
        // Aquí puedes redirigir a una página de confirmación o mostrar un mensaje
        this.loading = false;
      },
      error: (error) => {
        console.error('Password reset request failed', error);
        // Aquí puedes mostrar un mensaje de error al usuario
        this.loading = false;
      }
    });



    // Para propósitos de ejemplo, estableceremos el loading a false después de 2 segundos
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  cancel() {
    // Aquí iría la lógica para cancelar la operación y volver a la página de login
    this.router.navigate(['auth/login'])
  }
}
