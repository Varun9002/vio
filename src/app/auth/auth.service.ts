import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
	// private tknExpTimer: any;
	// constructor(private store: Store<fromApp.AppState>) {}
	// setLogiutTimer(expDuration: number) {
	// 	this.tknExpTimer = setTimeout(() => {
	// 		this.store.dispatch(AuthActions.Logout());
	// 	}, expDuration);
	// }
	// clearLogoutTimer() {
	// 	if (this.tknExpTimer) {
	// 		clearTimeout(this.tknExpTimer);
	// 		this.tknExpTimer = null;
	// 	}
	// }
	isLogin = new Subject<void>();
	constructor() {}
}
