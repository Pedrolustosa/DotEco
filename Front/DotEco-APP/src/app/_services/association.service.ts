import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Association } from '../_models/Association';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AssociationService {
    baseUrl = environment.apiURL + 'api/associations'
    baseUrlUser = environment.apiURL + 'api/user/'

    constructor(private http: HttpClient) { }

    getAllAssociation(): Observable<Association[]> {
        return this.http.get<Association[]>(this.baseUrl);
    }

    getAssociationById(id: number): Observable<Association> {
        return this.http.get<Association>(`${this.baseUrl}/${id}`);
    }

    postAssociation(association: Association) {
        return this.http.post(this.baseUrl, association);
    }

    putAssociation(association: Association) {
        return this.http.put(`${this.baseUrl}/${association.id}`, association);
    }

    deleteAssociation(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}