import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingGuard } from './routing.guard';
import { ExpireTokenService } from './expire-token.service';

import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

//External//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

// import the Module or Library
import { MultiSelectAllModule  } from '@syncfusion/ej2-angular-dropdowns';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerModule } from "ngx-spinner";

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//External//
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { FooterbarComponent } from './footerbar/footerbar.component';
import { FriendsComponent } from './friends/friends.component';
import { BookmarkfolderComponent } from './bookmarkfolder/bookmarkfolder.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddroleComponent } from './addrole/addrole.component';
import { AddfolderComponent } from './addfolder/addfolder.component';
import { EditroleComponent } from './editrole/editrole.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserListComponent } from './user-list/user-list.component';
import { FolderlistComponent } from './folderlist/folderlist.component';
import { SearchPipe } from './folderlist/pipesearch';
import { UserSearchPipe } from './user-list/userPipeSearch';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('298434765938-ee8q1ntugfcmd6kqk3s07noecdogdme6.apps.googleusercontent.com') //for localhost
    //provider: new GoogleLoginProvider('232895248144-68dqr65svrbqhflp7ie8rabis0feh9k3.apps.googleusercontent.com') //for developermode/live
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('561602290896109')
  // },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
  // }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    DashboardComponent,
    AdminheaderComponent,
    FooterbarComponent,
    FriendsComponent,
    BookmarkfolderComponent,
    AdduserComponent,
    AddroleComponent,
    AddfolderComponent,
    EditroleComponent,
    UserhomeComponent,
    ResetPasswordComponent,
    UserListComponent,
    FolderlistComponent,
    SearchPipe,
    UserSearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    SocialLoginModule,
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    MultiSelectAllModule,
    SelectDropDownModule,
    TooltipModule.forRoot()
  ],
  
  providers: [{provide: AuthServiceConfig,useFactory: provideConfig},RoutingGuard,ExpireTokenService,AdduserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }