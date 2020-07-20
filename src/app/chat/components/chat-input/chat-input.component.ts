import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  public newMessageText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  public submit(message: string): void{
    //TODO save text to firebase
    console.log("New message: ", message)

    //Reset input
    this.newMessageText = '';
  }

}
