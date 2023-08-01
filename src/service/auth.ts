import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { GoogleAuth } from 'google-auth-library';
export async function login(): Promise<any> {
	// console.log('login');
	// const auth = new GoogleAuth({
	// 	scopes: 'https://www.googleapis.com/auth/cloud-platform',
	// 	projectId: 'pre-school-learning-psl',
	//   });
	//   const client = await auth.getClient();
	//   const projectId = await auth.getProjectId();
	//   // List all buckets in a project.
	//   const url = `https://storage.googleapis.com/storage/v1/b?project=${projectId}`;
	//   const res = await client.request({ url });
	//   console.log(res.data);
}
