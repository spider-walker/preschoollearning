import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {DbUser} from '../../models/DbUser';

@Injectable()
export class UsersProvider {

    dbusersCollection: AngularFirestoreCollection<DbUser>;
    dbusers: Observable<DbUser[]>;
    dbuserDoc: AngularFirestoreDocument<DbUser>;

    constructor(public afs: AngularFirestore) {
        this.dbusersCollection = afs.collection<DbUser>('dbusers');
        this.dbusers = this.dbusersCollection.valueChanges();
    }

    getDbUsers() {
        this.dbusersCollection = this.afs.collection<DbUser>('dbusers');
        this.dbusers = this.dbusersCollection.valueChanges();
        return this.dbusers;
    }
    getDbUser(parent_id: number) {
        this.dbusersCollection = this.afs.collection<DbUser>('dbusers', ref => ref.where('parent_id', '==', parent_id));
        this.dbusers = this.dbusersCollection.valueChanges();
        return this.dbusers;
    }
    get_children(parent_id: number) {
        this.dbusersCollection = this.afs.collection<DbUser>('dbchildren', ref => ref.where('parent_id', '==', parent_id));
        this.dbusers = this.dbusersCollection.valueChanges();
        return this.dbusers;
    }

    addDbUser(dbuser: DbUser) {
        this.dbusersCollection.add(dbuser);
    }

    deleteDbUser(dbuser: DbUser) {
        this.dbuserDoc = this.afs.doc(`dbusers/${dbuser.parent_id}`);
        this.dbuserDoc.delete();
    }

    updateDbUser(dbuser: DbUser) {
        this.dbuserDoc = this.afs.doc(`dbusers/${dbuser.parent_id}`);
        this.dbuserDoc.update(dbuser);
    }

}
