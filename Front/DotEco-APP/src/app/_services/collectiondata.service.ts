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

    getAllCollectionDatas(): Observable<CollectionData[]> {
        return this.http.get<CollectionData[]>(this.baseUrl);
    }
    getCollectionDataByUserId(userId: number): Observable<CollectionData[]> {
        return this.http.get<CollectionData[]>(`${this.baseUrl}/user/${userId}`);
    }
    getCollectionDataByAssociationId(associationId: number): Observable<CollectionData[]> {
        return this.http.get<CollectionData[]>(`${this.baseUrl}/association/${associationId}`);
    }

    getCollectionDataById(id: number): Observable<CollectionData> {
        return this.http.get<CollectionData>(`${this.baseUrl}/${id}`);
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