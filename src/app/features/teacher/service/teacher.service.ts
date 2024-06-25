import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Teacher} from "../teachers/teachers.component";
import {HttpClient} from "@angular/common/http";
import {Student} from "../../student/student-list/student-list.component";
import {environmentDevelopment} from "../../../../environments/environment.development";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService<Teacher>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/api/v1/teachers';
  }

  delete(id: string) {
    return this.http.delete(`${environmentDevelopment.serverBasePath}${this.resourceEndpoint}/${id}`).pipe(
      tap(response => console.log('Delete response:', response))
    );
  }

  update(id: string, student: Student) {
    return this.http.put(`${environmentDevelopment.serverBasePath}${this.resourceEndpoint}/${id}`, student);
  }
}
