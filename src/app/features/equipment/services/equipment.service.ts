import { environmentDevelopment } from '../../../../environments/environment.development';
import {BaseService} from "../../../shared/services/base.service";
import {Injectable} from "@angular/core";
import {Equipment} from "../equipment-list/equipment.component";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class EquipmentService extends BaseService<Equipment>{

    constructor(http: HttpClient) {
        super(http);
        this.resourceEndpoint = '/api/v1/equipments';
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
