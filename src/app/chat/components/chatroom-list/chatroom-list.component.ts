import { Component, OnInit } from '@angular/core';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.css']
})
export class ChatroomListComponent implements OnInit {

  public chatName: string = "";
  constructor(
    public chatroomService: ChatroomService
  ) { }

  ngOnInit(): void {
  }

  public submit(message: string): void{
    this.chatroomService.createChat(message);
    //Reset input
    this.chatName = '';
  }
}
