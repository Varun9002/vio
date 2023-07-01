import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
	uploadForm!: FormGroup;

	video: File | undefined;
	img: File | undefined;

	imgPath = 'https://via.placeholder.com/1280x720';
	videoPath = '';
	errorMsg = '';
	constructor(private http: HttpClient, private router: Router) {}

	ngOnInit(): void {
		this.uploadForm = new FormGroup({
			title: new FormControl<string | null>(null, Validators.required),
			description: new FormControl<string | null>(
				null,
				Validators.required
			),
			video: new FormControl<string | null>(null, Validators.required),
			thumbnail: new FormControl<string | null>(
				null,
				Validators.required
			),
		});
	}
	onSubmit() {
		if (this.video && this.img) {
			const formData = new FormData();
			formData.append('title', this.uploadForm.value.title);
			formData.append('description', this.uploadForm.value.description);
			formData.append('thumbnail', this.img);
			formData.append('video', this.video);
			this.http
				.post(environment.API_URL + '/video', formData)
				.pipe(
					catchError((err: HttpErrorResponse) => {
						this.errorMsg = err.message;
						return throwError(() => err);
					})
				)
				.subscribe(() => {
					console.log('Upload Successfull');
					this.img = undefined;
					this.video = undefined;
					this.imgPath = 'https://via.placeholder.com/1280x720';
					this.videoPath = '';
					this.uploadForm.reset();
					this.router.navigate(['/myProfile']);
				});
		} else {
			this.errorMsg = 'Video or Thumbnail not provided';
		}
	}
	onImgChange(event: Event) {
		const inp = event.target as HTMLInputElement;
		if (!inp.files || inp.files.length == 0) {
			this.img = undefined;
			this.imgPath = 'https://via.placeholder.com/1280x720';
			return;
		}
		this.img = inp.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			this.imgPath = reader.result as string;
		};
		reader.readAsDataURL(this.img);
	}
	onVideoChange(event: Event) {
		const inp = event.target as HTMLInputElement;
		if (!inp.files || inp.files.length == 0) {
			this.video = undefined;
			this.videoPath = '';
			return;
		}
		this.video = inp.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			this.videoPath = reader.result as string;
		};
		reader.readAsDataURL(this.video);
	}
}
