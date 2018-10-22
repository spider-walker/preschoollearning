import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Children} from '../../models/DbUser';
import {ChildrenProvider} from '../../providers/children/children';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

/**
 * Generated class for the ChildAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-child-add',
    templateUrl: 'child-add.html',
})
export class ChildAddPage {
    loginForm: FormGroup;
    parent_id: any;

    constructor(
        public childrenProvider: ChildrenProvider,
        public navCtrl: NavController,
         public formBuilder: FormBuilder,
        public navParams: NavParams) {
        this.parent_id = this.navParams.get("parent_id");
    }
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.minLength(10), Validators.required]),],
            dob: ['', Validators.compose([Validators.required])],
        });
    }
    addItem() {
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            let child: Children = {
                parent_id:this.parent_id ,
                name: this.loginForm.value.name,
                dob: this.loginForm.value.dob,
                child_id: new Date().getTime(),
                no_of_children: 1
            };
            console.log(child);
            try {
                this.childrenProvider.addChildren(child);
                this.navCtrl.setRoot('UsersViewPage', {parent_id: child.parent_id})
            } catch (e) {
                console.log(e);
            }
        }
    }

}
