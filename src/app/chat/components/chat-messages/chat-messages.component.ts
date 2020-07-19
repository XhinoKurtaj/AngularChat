import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../classes/message' ;

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {

  @Input() message: Message

  constructor() { }

  ngOnInit(): void {
  }

}
