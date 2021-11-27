import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CollectionData } from '../_models/CollectionData';
import { environment } from 'src/environments/environment';
import { UserUpdate } from '../_models/Identity/UserUpdate';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../_models/Pagination';

@Injectable({
    providedIn: 'root'
})
export class CollectionDataService {
    userUpdate = {} as UserUpdate;
    baseUrl = environment.apiURL + 'api/collectiondatas'
    baseUrlUser = environment.apiURL + 'api/user/'

    constructor(private http: HttpClient) { }

    getAllCollectionData(): Observable<CollectionData[]> {
        return this.http.get<CollectionData[]>(this.baseUrl);
    }

    getAllCollectionDatas(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<CollectionData[]>> {
        const paginatedResult: PaginatedResult<CollectionData[]> = new PaginatedResult<CollectionData[]>();
        let params = new HttpParams;
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page.toString());
            params = params.append('pageSize', itemsPerPage.toString());
        }
        if (term != null && term != '')
            params = params.append('term', term)

        return this.http
            .get<CollectionData[]>(this.baseUrl, { observe: 'response', params })
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

    getCollectionDataById(id: number): Observable<CollectionData> {
        return this.http.get<CollectionData>(`${this.baseUrl}/${id}`);
    }

    getUser(): Observable<UserUpdate> {
        return this.http.get<UserUpdate>(this.baseUrlUser + 'getUser').pipe(take(1));
    }

    postCollectionData(collectiondata: CollectionData) {
        return this.http.post(this.baseUrl, collectiondata);
    }

    putCollectionData(collectiondata: CollectionData) {
        return this.http.put(`${this.baseUrl}/${collectiondata.id}`, collectiondata);
    }

    deleteCollectionData(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}