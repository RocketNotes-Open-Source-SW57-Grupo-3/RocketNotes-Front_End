import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Equipment} from "../equipment-list/equipment.component";
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends BaseService<Equipment>{

  private httpClient: HttpClient;
  private equipments: Equipment[] = [];

  constructor(http: HttpClient) {
    super(http);
    this.httpClient = http;
    this.resourceEndpoint ='/api/v1/equipments'
  }



  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.resourceEndpoint}/${id}`)
        .pipe(tap(() => {
          this.equipments = this.equipments.filter(equipment => equipment.id !== id);
        }));
  }

  update(id: string, item: any): Observable<Equipment> {
    return this.httpClient.put<Equipment>(`${this.resourceEndpoint}/${id}`, item)
        .pipe(tap(updatedEquipment => {
          const index = this.equipments.findIndex(equipment => equipment.id === id);
          if (index !== -1) {
            this.equipments[index] = updatedEquipment;
          }
        }));
  }
}
