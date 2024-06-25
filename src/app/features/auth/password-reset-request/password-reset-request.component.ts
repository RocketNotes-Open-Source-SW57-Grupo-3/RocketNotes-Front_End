import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private router: Router) { }

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

    // Aquí agregarías la lógica para enviar los datos al backend
    console.log(this.form.value);

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
