import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClassroomsService {
    private baseUrl = 'https://rocketnotes.up.railway.app/api/v1/classrooms';

    constructor(private http: HttpClient) { }

    getClassrooms(): Observable<any> {
        return this.http.get(this.baseUrl);
    }
}