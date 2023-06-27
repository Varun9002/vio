import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
	// loginForm: FormGroup;
	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		// this.loginForm = new FormGroup({
		// 	email: new FormControl(null),
		// });
	}
	switchMode() {
		this.authService.isLogin.next();
	}
}
