import { environmentDevelopment } from '../../../../environments/environment.development';
import {BaseService} from "../../../shared/services/base.service";
import {Injectable} from "@angular/core";
import {Facility} from "../facilities-list/facilities-list.component";
import {HttpClient} from "@angular/common/http";
import {tap, retry, catchError} from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { FacilityWithoutId } from '../facilities-list/facilities-list.component';

@Injectable({
  providedIn: 'root'
})
export class FacilitieService extends BaseService<Facility> {
  public override httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/api/v1/factilites';
  }

  createFacility(facility: FacilityWithoutId) {
    return this.http.post<Facility>(`${environmentDevelopment.serverBasePath}${this.resourceEndpoint}`,
        JSON.stringify(facility), this.httpOptions)
        .pipe(
            retry(2),
            tap(response => console.log('Create response:', response)),
            catchError(this.handleError)
        );
  }

  override handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  delete(id: string) {
    return this.http.delete(`${environmentDevelopment.serverBasePath}${this.resourceEndpoint}/${id}`).pipe(
        tap(response => console.log('Delete response:', response))
    );
  }

  updateStatus(id: string, status: string) {
    return this.http.put(`${environmentDevelopment.serverBasePath}${this.resourceEndpoint}/${id}`, { status: status });
  }

}
