export class ActiveUser {
	constructor(
		public id: string,
		public name: string,
		public image: string | null,
		private _token: string,
		private _tokenExpirationDate: Date
	) {}
	get tokenExpDate() {
		return this._tokenExpirationDate;
	}
	get token() {
		if (
			!this._tokenExpirationDate ||
			new Date() > this._tokenExpirationDate
		) {
			return null;
		}
		return this._token;
	}
}
