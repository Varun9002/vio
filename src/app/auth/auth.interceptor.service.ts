import {
	HttpEvent,
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, map, take } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
	constructor(
		private authService: AuthService,
		private store: Store<fromApp.AppState>
	) {}
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return this.store.select('auth').pipe(
			take(1),
			map((authData) => {
				return authData.user;
			}),
			exhaustMap((user) => {
				if (!user || !user.token) {
					return next.handle(req);
				}

				const modifiedReq = req.clone({
					headers: new HttpHeaders({
						Authorization: 'Bearer ' + user.token,
					}),
				});
				return next.handle(modifiedReq);
			})
		);
	}
}
