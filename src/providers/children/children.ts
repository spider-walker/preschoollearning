import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Children} from '../../models/DbUser';
@Injectable()
export class ChildrenProvider {

    dbchildrenCollection: AngularFirestoreCollection<Children>;
    dbchildren: Observable<Children[]>;
    dbuserDoc: AngularFirestoreDocument<Children>;

    constructor(public afs: AngularFirestore) {
        this.dbchildrenCollection = afs.collection<Children>('dbchildren');
        this.dbchildren = this.dbchildrenCollection.valueChanges();
    }

    getChildrens() {
        this.dbchildrenCollection = this.afs.collection<Children>('dbchildren');
        this.dbchildren = this.dbchildrenCollection.valueChanges();
        return this.dbchildren;
    }
    getParentChildrens(parent_id: number) {
        this.dbchildrenCollection = this.afs.collection<Children>('dbchildren', ref => ref.where('parent_id', '==', parent_id));
        this.dbchildren = this.dbchildrenCollection.valueChanges();
        return this.dbchildren;
    }
    get_children(parent_id: number) {
        this.dbchildrenCollection = this.afs.collection<Children>('dbchildren', ref => ref.where('parent_id', '==', parent_id));
        this.dbchildren = this.dbchildrenCollection.valueChanges();
        return this.dbchildren;
    }

    addChildren(dbuser: Children) {
        this.dbchildrenCollection.add(dbuser);
    }

    deleteChildren(dbuser: Children) {
        this.dbuserDoc = this.afs.doc(`dbchildren/${dbuser.parent_id}`);
        this.dbuserDoc.delete();
    }

    updateChildren(dbuser: Children) {
        this.dbuserDoc = this.afs.doc(`dbchildren/${dbuser.parent_id}`);
        this.dbuserDoc.update(dbuser);
    }

}
