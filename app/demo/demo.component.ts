import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../shared/firebase.service';
import { UserModel } from '../shared/models';

@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html"
})
export class DemoComponent implements OnInit {

  joinGroupId: string;
  group = '';
  ownProfile: UserModel;

  unsubscribe = () => null;

  constructor(
    private firebaseService: FirebaseService,
  ) {
  }

  async ngOnInit() {
    this.ownProfile = await this.firebaseService.getOwnProfile();
    console.dir(this.ownProfile);
    if(this.ownProfile.currentGroup) {
      this.watchGroup(this.ownProfile.currentGroup);
    }
  }

  async joinGroup() {
    if(this.joinGroupId) {
      let group = await this.firebaseService.joinGroup(this.joinGroupId);
      if(group) {
        this.watchGroup(group.id);
      } else {
        alert('this group does not exist');
      }
    } 
  }

  async createGroup() {
    let group = await this.firebaseService.createGroup();
    this.watchGroup(group.id);
  }

  async selectGroup(groupId: string) {
    this.firebaseService.selectGroup(groupId);
    this.watchGroup(groupId);
  }

  async watchGroup(groupId: string) {
    this.unsubscribe();
    console.log(groupId);
    this.unsubscribe = (await this.firebaseService.firestore).collection('groups').doc(groupId).onSnapshot(snap => {
      console.log(JSON.stringify(snap.data()));
      this.group = JSON.stringify(snap.data());
    });
  }
}
