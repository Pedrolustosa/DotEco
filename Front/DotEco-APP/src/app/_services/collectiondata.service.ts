import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionData } from '../_models/CollectionData';

@Injectable({
    providedIn: 'root'
})
export class CollectionDataService {
    baseURL = 'http://localhost:5000/api/collectiondatas';

    constructor(private http: HttpClient) { }

    getAllCollectionData(): Observable<CollectionData[]> {
        return this.http.get<CollectionData[]>(this.baseURL);
    }

    getCollectionDataById(id: number): Observable<CollectionData> {
        return this.http.get<CollectionData>(`${this.baseURL}/${id}`);
    }

    postCollectionData(collectiondata: CollectionData) {
        return this.http.post(this.baseURL, collectiondata);
    }

    putCollectionData(collectiondata: CollectionData) {
        return this.http.put(`${this.baseURL}/${collectiondata.id}`, collectiondata);
    }

    deleteCollectionData(id: number) {
        return this.http.delete(`${this.baseURL}/${id}`);
    }

}