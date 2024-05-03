import { Injectable } from '@angular/core';
import {environmentDevelopment} from "../../../environments/environment.development";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  basePath: string= `${environmentDevelopment.serverBasePath}`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  private resourcePath():string{
    return `${this.basePath}`
  }


  get(url:string ){
    return this.http.get(this.resourcePath()+`${url}`)
  }

  create(item: any){
    return this.http.post(this.resourcePath(),
        JSON.stringify(item), this.httpOptions)
  }
}
