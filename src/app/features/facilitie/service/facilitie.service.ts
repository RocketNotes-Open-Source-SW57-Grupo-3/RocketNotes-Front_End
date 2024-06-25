import { environmentDevelopment } from '../../../../environments/environment.development';
import {BaseService} from "../../../shared/services/base.service";
import {Injectable} from "@angular/core";
import {Facility} from "../facilities-list/facilities-list.component";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FacilitieService  extends BaseService<Facility>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint= '/api/v1/factilites';

  }

  delete(id: string) {
    return this.http.delete(`${environmentDevelopment.serverBasePath}${this.resourceEndpoint}/${id}`).pipe(
        tap(response => console.log('Delete response:', response))
    );
  }

  update(id: string, facility: Facility) {
    return this.http.put(`${environmentDevelopment.serverBasePath}${this.resourceEndpoint}/${id}`, facility);
  }
}
