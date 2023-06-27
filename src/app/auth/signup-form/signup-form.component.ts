import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-signup-form',
	templateUrl: './signup-form.component.html',
	styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit(): void {}
	switchMode() {
		this.authService.isLogin.next();
	}
}
