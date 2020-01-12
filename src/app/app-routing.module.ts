import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingGuard } from './routing.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterbarComponent } from './footerbar/footerbar.component';
import { FriendsComponent } from './friends/friends.component';
import { BookmarkfolderComponent } from './bookmarkfolder/bookmarkfolder.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddroleComponent } from './addrole/addrole.component';
import { AddfolderComponent } from './addfolder/addfolder.component';
import { EditroleComponent } from './editrole/editrole.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { UserListComponent } from './user-list/user-list.component';
import { FolderlistComponent } from './folderlist/folderlist.component';


const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'forgetpassword', component: ForgetpasswordComponent },
	{ path: 'dashboard', component: DashboardComponent,canActivate:[RoutingGuard]},
	{ path: 'footerbar', component: FooterbarComponent },
	{ path: 'friends', component: FriendsComponent },
	{ path: 'bookmarkfolder', component: BookmarkfolderComponent },
	{ path: 'adduser', component: AdduserComponent },
	{ path: 'addrole', component: AddroleComponent },
	{ path: 'addfolder', component: AddfolderComponent },
	{ path: 'folderList', component: FolderlistComponent },
	{ path: 'editrole', component: EditroleComponent },
	{ path: 'userhome', component: UserhomeComponent },
	{ path: 'userlist', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

