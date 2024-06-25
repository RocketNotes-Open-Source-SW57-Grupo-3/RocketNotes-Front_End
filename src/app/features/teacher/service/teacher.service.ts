import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Teacher} from "../teachers/teachers.component";
import {HttpClient} from "@angular/common/http";
import {Student} from "../../student/student-list/student-list.component";

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService<Teacher>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/api/v1/teachers';
  }

    delete(id: string) {
    return this.http.delete(`${this.resourceEndpoint}/${id}`);
  }
  update(id: string, student: Student) {
  return this.http.put(`${this.resourceEndpoint}/${id}`, student);
  }
}
