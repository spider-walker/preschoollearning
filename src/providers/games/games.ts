import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Games } from '../../models/DbUser';

@Injectable()
export class GamesProvider {
	gamesCollection: AngularFirestoreCollection<Games>;
	games: Observable<Games[]>;
	gameDoc: AngularFirestoreDocument<Games>;

	constructor(public afs: AngularFirestore) {
		this.gamesCollection = afs.collection<Games>('games');
		this.games = this.gamesCollection.valueChanges();
	}

	getDbGames() {
		this.gamesCollection = this.afs.collection<Games>('games');
		this.games = this.gamesCollection.valueChanges();
		return this.games;
	}
	getGames(parent_id: number) {
		this.gamesCollection = this.afs.collection<Games>('games', (ref) =>
			ref.where('parent_id', '==', parent_id)
		);
		this.games = this.gamesCollection.valueChanges();
		return this.games;
	}
	getGamesByUserName(username: string) {
		this.gamesCollection = this.afs.collection<Games>('games', (ref) =>
			ref.where('username', '==', username)
		);
		this.games = this.gamesCollection.valueChanges();
		return this.games;
	}
	get_children(parent_id: number) {
		this.gamesCollection = this.afs.collection<Games>('dbchildren', (ref) =>
			ref.where('parent_id', '==', parent_id)
		);
		this.games = this.gamesCollection.valueChanges();
		return this.games;
	}

	addGames(game: Games) {
		this.gamesCollection.add(game);
	}

	deleteGames(game: Games) {
		this.gameDoc = this.afs.doc(`games/${game.game_id}`);
		this.gameDoc.delete();
	}

	updateGames(game: Games) {
		this.gameDoc = this.afs.doc(`games/${game.game_id}`);
		this.gameDoc.update(game);
	}
}
