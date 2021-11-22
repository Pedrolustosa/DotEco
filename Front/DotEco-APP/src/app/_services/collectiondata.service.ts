import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionData } from '../_models/CollectionData';
import { environment } from 'src/environments/environment';
import { UserUpdate } from '../_models/Identity/UserUpdate';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CollectionDataService {
    baseUrl = environment.apiURL + 'api/collectiondatas'
    baseUrlUser = environment.apiURL + 'api/user/'

    constructor(private http: HttpClient) { }

    getAllCollectionData(): Observable<CollectionData[]> {
        return this.http.get<CollectionData[]>(this.baseUrl);
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