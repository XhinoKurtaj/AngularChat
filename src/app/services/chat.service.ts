import { Injectable, OnInit } from '@angular/core';
// import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private db: AngularFireDatabase
  constructor(  private firestore: AngularFirestore  ) { }


  getChatList(){
     return this.firestore.collection('chat').snapshotChanges();
  }

//   getMessages(user) {
//     return this.firestore
//     .list('Chat/' + user + '/messages', ref => {
//     return ref.orderByChild('timeStamp');
//     })
//     .valueChanges();
// }

  createChat(data){
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('chat')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  updateChat(data){
      return this.firestore
        .collection("chat")
        .doc(data.payload.doc.id)
        .set({ completed: true }, { merge: true });
    }

  deleteChatr(data){
      return this.firestore
        .collection("chat")
        .doc(data.payload.doc.id)
        .delete();
    }

}
