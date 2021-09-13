import { AfterViewInit, Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements AfterViewInit {

 	private user: Subject<any> = new Subject<any>();
	public _login$: Observable<any> = this.user.asObservable();;
	passwordDef: string = 'Ro$h';

    constructor() { }
	
	ngAfterViewInit(): void {
		this.user.next(this._getUserLogged());
	}

	logIn(user: string, password: string): Observable<any> {
		this.user.next(this._verifCredentials(user, password));
		return this.getLogin();
	}
	getLogin(): Observable<any> {
		return this._login$;
	}
	private _verifCredentials(user: string, password: string): boolean {
		if (user && password) {
			
			if (!this._isLogged(user) && (password === this.passwordDef)) {
				this.user.next(true);
				localStorage.setItem('user', user);
				return true;
			} else {
				return this._isLogged(user);
			}
		}
		this.user.next(false);
		return false;
	}
	private _isLogged(user: string): boolean {
		const user$ = localStorage.getItem('user');
		return user$ && (user$ === user) ? true : false;
	}
	_getUserLogged(): boolean {
		return localStorage.getItem('user') ? true : false;
	}
}
