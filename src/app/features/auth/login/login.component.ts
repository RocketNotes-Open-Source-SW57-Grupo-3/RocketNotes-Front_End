import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService} from "../../../infrastructure/services/authentication.service";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent  {
    loginForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthenticationService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            userRole: ['', Validators.required],
            rememberMe: [false]
        });
    }


    login(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        const { email, password } = this.loginForm.value;

        this.authService.signIn({ email, password }).subscribe({
            next: (response) => {
                // Manejar respuesta exitosa
                console.log('Login successful', response);
                this.loading = false;
                this.router.navigate(['/']);
            },
            error: (error) => {
                // Manejar errores
                console.error('Login failed', error);
                this.loading = false;
            }
        });
    }

    resetPassword(): void {
        this.router.navigate(['/auth/password-reset-request']);
    }

    registerAccount(): void {
        this.router.navigate(['/auth/register']);

    }
}

