/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class AuthProvider {
	constructor(
		public http: any,
		public afAuth: any
	) {
		console.log('Hello AuthProvider Provider');
	}
	loginUser(newEmail: string, newPassword: string): Promise<any> {
		return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
	}
	resetPassword(email: string): Promise<void> {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}
	logoutUser(): Promise<void> {
		return this.afAuth.auth.signOut();
	}
	signupUser(newEmail: string, newPassword: string): Promise<any> {
		return this.afAuth.auth.createUserWithEmailAndPassword(
			newEmail,
			newPassword
		);
	}
}
