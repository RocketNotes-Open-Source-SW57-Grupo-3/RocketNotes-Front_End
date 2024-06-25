import { environmentDevelopment } from '../../../../environments/environment.development';
import {BaseService} from "../../../shared/services/base.service";
import {Injectable} from "@angular/core";
import {Student} from "../student-list/student-list.component";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentsService  extends BaseService<Student>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = `/api/v1/students`;
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