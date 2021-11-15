import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CollectionData } from '../_models/CollectionData';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CollectionDataService {
    baseUrl = environment.apiURL + 'api/collectiondatas'

    constructor(private http: HttpClient) { }

    getAllCollectionData(): Observable<CollectionData[]> {
        return this.http.get<CollectionData[]>(this.baseUrl);
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