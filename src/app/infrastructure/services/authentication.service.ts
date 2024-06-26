import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environmentDevelopment} from "../../../environments/environment.development";
import * as moment from "moment/moment";
import {tap} from "rxjs/operators";

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
        return this.http.post<any>(`${this.baseUrl}/sign-up`, signUpData).pipe(
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
        );
    }

    resetPassword(email: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/reset-password`, { email });
    }

    getCurrentUser(): any {
        const user = localStorage.getItem('currentUser');
        if (user) {
            return JSON.parse(user);
        } else {
            return { email: '' };
        }
    }
}