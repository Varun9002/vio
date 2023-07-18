import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, throwError } from 'rxjs';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { User } from 'src/app/models/API_Video.model';
import * as fromApp from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
	@Input() user: User | undefined;
	@Output() closeBD = new EventEmitter<number>();
	imagePath: string | null | undefined;
	img: File | undefined;
	API_URL = environment.API_URL;
	editForm!: FormGroup;
	errorMsg: string | null = null;
	constructor(
		private http: HttpClient,
		private store: Store<fromApp.AppState>
	) {}

	ngOnInit(): void {
		this.imagePath = this.API_URL + '/' + this.user?.imageUrl;
		this.editForm = new FormGroup({
			name: new FormControl<string | undefined>(this.user?.name, [
				Validators.minLength(3),
			]),
			email: new FormControl<string | undefined>(this.user?.email, [
				Validators.email,
			]),
			currentPassword: new FormControl<string | null>(null),
			password: new FormControl<string | null>(null),
			confirmPassword: new FormControl<string | null>(null),
		});
	}
	onSubmit() {
		const formData = new FormData();
		formData.append('name', this.editForm.value.name);
		formData.append('email', this.editForm.value.email);
		if (this.img) formData.append('userImg', this.img);
		if (this.editForm.value.currentPassword) {
			formData.append(
				'currentPassword',
				this.editForm.value.currentPassword
			);
			formData.append('password', this.editForm.value.password);
			formData.append(
				'confirmPassword',
				this.editForm.value.confirmPassword
			);
		}
		this.closeBD.emit(1);
		this.http
			.post<{ message: string; data: User }>(
				environment.API_URL + '/user/myProfile',
				formData
			)
			.pipe(
				catchError((err: HttpErrorResponse) => {
					this.errorMsg = err.message;
					return throwError(() => err);
				})
			)
			.subscribe(({ data }) => {
				this.store.dispatch(
					AuthActions.UpdateUser({
						name: data.name,
						imageUrl: environment.API_URL + '/' + data.imageUrl!,
					})
				);
				this.user!.name = data.name;
				this.user!.email = data.email;
				this.user!.imageUrl = data.imageUrl!;
				this.closeBD.emit(0);
				this.close();
			});
	}
	onImgChange(event: Event) {
		const inp = event.target as HTMLInputElement;
		if (!inp.files || inp.files.length == 0) {
			this.img = undefined;
			this.imagePath = this.API_URL + '/' + this.user?.imageUrl;
			return;
		}
		this.img = inp.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePath = reader.result as string;
		};
		reader.readAsDataURL(this.img);
	}
	close() {
		this.closeBD.emit(2);
	}
}
