import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupons } from '../_models/Coupons';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CouponsService {
    baseUrl = environment.apiURL + 'api/coupons';

    constructor(private http: HttpClient) { }

    getAllCoupons(): Observable<Coupons[]> {
        return this.http.get<Coupons[]>(this.baseUrl);
    }

    getCouponsById(id: number): Observable<Coupons> {
        return this.http.get<Coupons>(`${this.baseUrl}/${id}`);
    }

    postCoupons(coupon: Coupons) {
        return this.http.post(this.baseUrl, coupon);
    }

    putCoupons(coupon: Coupons) {
        return this.http.put(`${this.baseUrl}/${coupon.id}`, coupon);
    }

    deleteCoupons(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}