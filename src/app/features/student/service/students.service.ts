import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../../shared/services/base.service";
import {Student} from "../student-list/student-list.component";

@Injectable({
  providedIn: 'root'
})
export class StudentsService  extends BaseService<Student>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/api/v1/students';
  }
  delete(id: string) {
    return this.http.delete(`${this.resourceEndpoint}/${id}`);
  }
  update(id: string, student: Student) {
  return this.http.put(`${this.resourceEndpoint}/${id}`, student);
  }
}
