import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent},
{ path: 'chat', canActivate: [AuthGuard],
  children: [
    { path: '', component: ChatComponent },
    { path:':chatroomId', component: ChatComponent }
  ]
},
{ path: 'profile/:userId', component: ProfileComponent, canActivate:[AuthGuard] },
{ path: 'profile/:userId/edit', component: EditProfileComponent, canActivate:[AuthGuard] },
{ path: '**', redirectTo:'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
