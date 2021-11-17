import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupons } from '../_models/Coupons';
import { environment } from 'src/environments/environment';
import { UserUpdate } from '../_models/Identity/UserUpdate';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CouponsService {
    baseUrl = environment.apiURL + 'api/coupons';
    baseUrlUser = environment.apiURL + 'api/user/'

    constructor(private http: HttpClient) { }

    getAllCoupons(): Observable<Coupons[]> {
        return this.http.get<Coupons[]>(this.baseUrl);
    }

    getCouponsById(id: number): Observable<Coupons> {
        return this.http.get<Coupons>(`${this.baseUrl}/${id}`);
    }

    getUser(): Observable<UserUpdate> {
        return this.http.get<UserUpdate>(this.baseUrlUser + 'getUser').pipe(take(1));
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