import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private router: Router) { }

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

    // Aquí agregarías la lógica para enviar los datos al backend
    console.log(this.registerForm.value);

    // Para propósitos de ejemplo, estableceremos el loading a false después de 2 segundos
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  cancel() {
    // Aquí iría la lógica para cancelar el registro y volver a la página de login
    this.router.navigate(['/auth/login']);
  }
}
