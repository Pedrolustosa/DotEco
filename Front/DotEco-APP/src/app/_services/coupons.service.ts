import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupons } from '../_models/Coupons';

@Injectable({
    providedIn: 'root'
})
export class CouponsService {
    baseURL = 'https://dotecoapi.azurewebsites.net/api/coupons';

    constructor(private http: HttpClient) { }

    getAllCoupons(): Observable<Coupons[]> {
        return this.http.get<Coupons[]>(this.baseURL);
    }

    getCouponsById(id: number): Observable<Coupons> {
        return this.http.get<Coupons>(`${this.baseURL}/${id}`);
    }

    postCoupons(coupon: Coupons) {
        return this.http.post(this.baseURL, coupon);
    }

    putCoupons(coupon: Coupons) {
        return this.http.put(`${this.baseURL}/${coupon.id}`, coupon);
    }

    deleteCoupons(id: number) {
        return this.http.delete(`${this.baseURL}/${id}`);
    }

}