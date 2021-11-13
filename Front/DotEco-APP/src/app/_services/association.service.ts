import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Association } from '../_models/Association';

@Injectable({
    providedIn: 'root'
})
export class AssociationService {
    baseURL = 'https://dotecoapi.azurewebsites.net/api/associations';

    constructor(private http: HttpClient) { }

    getAllAssociation(): Observable<Association[]> {
        return this.http.get<Association[]>(this.baseURL);
    }

    getAssociationById(id: number): Observable<Association> {
        return this.http.get<Association>(`${this.baseURL}/${id}`);
    }

    postAssociation(association: Association) {
        return this.http.post(this.baseURL, association);
    }

    putAssociation(association: Association) {
        return this.http.put(`${this.baseURL}/${association.id}`, association);
    }

    deleteAssociation(id: number) {
        return this.http.delete(`${this.baseURL}/${id}`);
    }

}