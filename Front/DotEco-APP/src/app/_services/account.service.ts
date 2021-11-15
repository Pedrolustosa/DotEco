import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../_models/Identity/User';
import { UserUpdate } from '../_models/Identity/UserUpdate';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private currentUserSource = new ReplaySubject<User>(1);
    public currentUser$ = this.currentUserSource.asObservable();

    baseUrl = environment.apiURL + 'api/user/'
    constructor(private http: HttpClient) { }

    public login(model: any): Observable<void> {
        return this.http.post<User>(this.baseUrl + 'login', model).pipe(
            take(1),
            map((response: User) => {
                const user = response;
                if (user) {
                    this.setCurrentUser(user)
                }
            })
        );
    }

    getAllUser(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl);
    }

    getUser(): Observable<UserUpdate> {
        return this.http.get<UserUpdate>(this.baseUrl + 'getUser').pipe(take(1));
    }

    updateUser(model: UserUpdate): Observable<void> {
        return this.http.put<UserUpdate>(this.baseUrl + 'updateUser', model).pipe(
            take(1),
            map((user: UserUpdate) => {
                this.setCurrentUser(user);
            })
        )
    }

    public register(model: any): Observable<void> {
        return this.http.post<User>(this.baseUrl + 'register', model).pipe(
            take(1),
            map((response: User) => {
                const user = response;
                if (user) {
                    this.setCurrentUser(user)
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
        this.currentUserSource.complete();
    }

    public setCurrentUser(user: User): void {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
    }
}