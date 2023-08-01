// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCo5qHiw8VSlfgYYDzuKJyU1fOiN0bYkxI",
	authDomain: "preschoollearning-da2da.firebaseapp.com",
	projectId: "preschoollearning-da2da",
	storageBucket: "preschoollearning-da2da.appspot.com",
	messagingSenderId: "346637397316",
	appId: "1:346637397316:web:150134f13a1edd7a39bb11",
	measurementId: "G-XWLMX4FNQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
