import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
//Services
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
//Components
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ChatInputComponent } from './chat/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessagesComponent } from './chat/components/chat-messages/chat-messages.component';
import { ChatroomWindowComponent } from './chat/components/chatroom-window/chatroom-window.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatMessagesComponent,
    ChatroomWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
