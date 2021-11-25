import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Association } from '../_models/Association';
import { environment } from 'src/environments/environment';
import { UserUpdate } from '../_models/Identity/UserUpdate';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../_models/Pagination';

@Injectable({
    providedIn: 'root'
})
export class AssociationService {
    baseUrl = environment.apiURL + 'api/associations'
    baseUrlUser = environment.apiURL + 'api/user/'

    constructor(private http: HttpClient) { }

    getAllAssociation(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Association[]>> {
        const paginatedResult: PaginatedResult<Association[]> = new PaginatedResult<Association[]>();
        let params = new HttpParams;
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page.toString());
            params = params.append('pageSize', itemsPerPage.toString());
        }
        if (term != null && term != '')
            params = params.append('term', term)

        return this.http
            .get<Association[]>(this.baseUrl, { observe: 'response', params })
            .pipe(
                take(1),
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.has('Pagination')) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return paginatedResult;
                }));
    }

    getAllAssociations(): Observable<Association[]> {
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