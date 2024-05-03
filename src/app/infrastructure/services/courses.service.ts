import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Course} from "../model/course.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseService<Course>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/courses'
  }
}
