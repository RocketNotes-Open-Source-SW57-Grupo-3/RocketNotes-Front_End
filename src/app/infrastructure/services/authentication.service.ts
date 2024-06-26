import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environmentDevelopment} from "../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private baseUrl = `${environmentDevelopment.serverBasePath}/api/v1/authentication`;

    constructor(private http: HttpClient) { }

    signIn(signInData:any ): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/sign-in`, signInData);
    }

    signUp(signUpData: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/sign-up`, signUpData);
    }

    resetPassword(email: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/reset-password`, { email });
    }
}