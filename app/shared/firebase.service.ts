import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase/app';
import { firestore } from 'nativescript-plugin-firebase/app/firestore';

import { Group, UserModel } from './models';

@Injectable()
export class FirebaseService {

  public firestore: Promise<firestore.Firestore>;

  constructor(
  ) {
    this.firestore = this.init();
  }

  async init() {
    await firebase.initializeApp({
      persist: true,
      onAuthStateChanged: (data) => {
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
      }
    });

    await firebase.auth().signInAnonymously();

    return firebase.firestore();
  }

  async getOwnProfile(): Promise<UserModel> {
    const firestore = (await this.firestore);
    const user = firebase.auth().currentUser;

    const me = await firestore.collection('users').doc(user.uid).get();

    if (me.exists) {
      return me.data() as UserModel;
    }

    const profile: UserModel = { groupIds: [], oweIds: [], currentGroup: null };

    await firestore.collection('users').doc(user.uid).set(profile);

    return profile;
  }

  async addGroupToProfile(groupId: string) {
    const firestore = (await this.firestore);
    const user = firebase.auth().currentUser;

    const profile = await this.getOwnProfile();
    profile.groupIds.push(groupId);
    profile.currentGroup = groupId;
    await firestore.collection('users').doc(user.uid).set(profile);
  }

  async createGroup() {
    const firestore = (await this.firestore);
    const user = firebase.auth().currentUser;

    const group: Group = { userIds: [user.uid], shares: [], };

    const ref = await firestore.collection('groups').add(group);

    await this.addGroupToProfile(ref.id);

    return { id: ref.id, group };
  }

  async selectGroup(groupId: string) {
    const profile = await this.getOwnProfile();

    if (!profile.groupIds.some(id => id === groupId))
      return;

    profile.currentGroup = groupId;

    const firestore = (await this.firestore);
    const user = firebase.auth().currentUser;
    await firestore.collection('users').doc(user.uid).set(profile);
  }

  async getCurrentGroup() {
    let profile = await this.getOwnProfile();
    if (!profile.currentGroup)
      return null;

    return (await this.firestore).collection('groups').doc(profile.currentGroup).get();
  }

  async joinGroup(groupId: string) {
    const firestore = (await this.firestore);
    const user = firebase.auth().currentUser;

    const groupRef = await firestore.collection('groups').doc(groupId).get();

    if (!groupRef.exists)
      return null;

    const group = groupRef.data();
    group.userIds.push(user.uid);
    await firestore.collection('groups').doc(groupId).set(group);

    await this.addGroupToProfile(groupRef.id);
    return group;
  }

}