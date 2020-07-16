import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private firestore: AngularFirestore) { }

  getMessageList() {
    // return this.db.object('Chat').valueChanges();
    return this.firestore.collection('messages').snapshotChanges();
  }


  createMessage(data){
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('messages')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  deleteMessage(data){
   return this.firestore
     .collection("messages")
     .doc(data.payload.doc.id)
     .delete();
 }

}
