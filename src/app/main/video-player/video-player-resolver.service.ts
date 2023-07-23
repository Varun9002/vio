import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { Video } from 'src/app/models/API_Video.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class VideoPlayerResolver implements Resolve<any> {
	constructor(private http: HttpClient, private router: Router) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const id = route.params['vid_id'];
		if (id)
			return this.http
				.get<{
					message: string;
					data: Video;
				}>(environment.API_URL + '/video/' + id)
				.pipe(
					map((resData) => {
						const data = { ...resData.data };
						data.createdAt = new Date(resData.data.createdAt);
						data.comments = data.comments?.map((cmt) => ({
							...cmt,
							cmntDate: new Date(cmt.cmntDate),
						}));
						return data;
					}),
					catchError((errorRes: HttpErrorResponse) => {
						this.router.navigate(['error']);
						return throwError(() => errorRes);
					})
				);
		return undefined;
	}
}
