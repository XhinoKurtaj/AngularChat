import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  // public _chat;
  // public messagesList;
  // public usersList;

  constructor(private chatService: ChatService ) {
        // this._chat = chatService;
   }

  ngOnInit(): void {
    // this.getMessagesList()
  }

  // getMessagesList = () =>{
  //   this._chat.getMessageList().subscribe(messagesList => {
  //     this.messagesList = messagesList;
  //     this.usersList = Object.keys(this.messagesList).map( val => { return val; });
  //   })
  // }


}
