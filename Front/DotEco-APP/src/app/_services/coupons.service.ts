import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Coupons } from '../_models/Coupons';
import { environment } from 'src/environments/environment';
import { UserUpdate } from '../_models/Identity/UserUpdate';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../_models/Pagination';

@Injectable({
    providedIn: 'root'
})
export class CouponsService {
    baseUrl = environment.apiURL + 'api/coupons';
    baseUrlUser = environment.apiURL + 'api/user/';

    constructor(private http: HttpClient) { }

    getAllCoupons(): Observable<Coupons[]> {
        return this.http.get<Coupons[]>(`${this.baseUrl}/available`);
    }

    getCouponByUserId(userId: number): Observable<Coupons[]> {
        return this.http.get<Coupons[]>(`${this.baseUrl}/user/${userId}`);
    }

    GetCouponsUsedAsync(userId: number): Observable<Coupons[]> {
        return this.http.get<Coupons[]>(`${this.baseUrl}/used/${userId}`);
    }

    getCouponByCompanyId(companyId: number): Observable<Coupons[]> {
        return this.http.get<Coupons[]>(`${this.baseUrl}/company/${companyId}`);
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