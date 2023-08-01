import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Immunization } from '../../models/DbUser';
@Injectable()
export class ImmunizationProvider {
	dbimmunizationCollection: AngularFirestoreCollection<Immunization>;
	dbimmunization: Observable<Immunization[]>;
	dbuserDoc: AngularFirestoreDocument<Immunization>;

	constructor(public afs: AngularFirestore) {
		this.dbimmunizationCollection =
			afs.collection<Immunization>('dbimmunization');
		this.dbimmunization = this.dbimmunizationCollection.valueChanges();
	}

	getImmunizations() {
		this.dbimmunizationCollection =
			this.afs.collection<Immunization>('dbimmunization');
		this.dbimmunization = this.dbimmunizationCollection.valueChanges();
		return this.dbimmunization;
	}
	getParentImmunizations(child_id: number) {
		this.dbimmunizationCollection = this.afs.collection<Immunization>(
			'dbimmunization',
			(ref) => ref.where('child_id', '==', child_id)
		);
		this.dbimmunization = this.dbimmunizationCollection.valueChanges();
		return this.dbimmunization;
	}
	get_immunization(child_id: number) {
		this.dbimmunizationCollection = this.afs.collection<Immunization>(
			'dbimmunization',
			(ref) => ref.where('child_id', '==', child_id)
		);
		this.dbimmunization = this.dbimmunizationCollection.valueChanges();
		return this.dbimmunization;
	}

	addImmunization(dbuser: Immunization) {
		this.dbimmunizationCollection.add(dbuser);
	}

	deleteImmunization(dbuser: Immunization) {
		this.dbuserDoc = this.afs.doc(`dbimmunization/${dbuser.immunization_id}`);
		this.dbuserDoc.delete();
	}

	updateImmunization(dbuser: Immunization) {
		this.dbuserDoc = this.afs.doc(`dbimmunization/${dbuser.immunization_id}`);
		this.dbuserDoc.update(dbuser);
	}
}
