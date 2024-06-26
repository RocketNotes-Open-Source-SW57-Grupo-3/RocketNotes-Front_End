import { Component } from '@angular/core';
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

        const UserData={
            username:this.loginForm.value.email,
            password: this.loginForm.value.password
        }

        console.log(UserData);
        this.authService.signIn(UserData).subscribe({
            next: (response) => {
                // Manejar respuesta exitosa
                console.log('Login successful', response);
                localStorage.setItem("token",response.token);
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

