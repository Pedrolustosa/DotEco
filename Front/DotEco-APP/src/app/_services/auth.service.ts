import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseURL = 'https://dotecoapi.azurewebsites.net/api/user/';
    jwtHelper = new JwtHelperService();
    decodedToken: any;

    constructor(private http: HttpClient) { }

    getAllUser(): Observable<User[]> {
        return this.http.get<User[]>(this.baseURL);
    }

    login(model: any) {
        return this.http
            .post(`${this.baseURL}login`, model).pipe(
                map((response: any) => {
                    const user = response;
                    if (user) {
                        localStorage.setItem('token', user.token);
                        this.decodedToken = this.jwtHelper.decodeToken(user.token);
                        sessionStorage.setItem('username', this.decodedToken.unique_name);
                    }
                })
            );
    }

    register(model: any) {
        return this.http.post(`${this.baseURL}register`, model);
    }

    profile(model: any) {
        return this.http.put(`${this.baseURL}updateuser`, model);
    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

}