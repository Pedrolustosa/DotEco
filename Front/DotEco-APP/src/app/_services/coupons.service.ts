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

    getAllCoupons(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Coupons[]>> {
        const paginatedResult: PaginatedResult<Coupons[]> = new PaginatedResult<Coupons[]>();
        let params = new HttpParams;
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page.toString());
            params = params.append('pageSize', itemsPerPage.toString());
        }
        if (term != null && term != '')
            params = params.append('term', term)

        return this.http
            .get<Coupons[]>(this.baseUrl, { observe: 'response', params })
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