import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { IonicStorageModule } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { LeavePage } from '../pages/leave/leave';
import { PersonPage } from '../pages/person/person'
import { SchedulePage } from '../pages/schedule/schedule'
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LeaveFormPage } from '../pages/leave-form/leave-form'
import { PostDetailPage } from '../pages/post-detail/post-detail'
import { PostFormPage } from '../pages/post-form/post-form'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SearchPage,
    LeavePage,
    PersonPage,
    SchedulePage,
    PostFormPage,
    LeaveFormPage,
    ScheduleFilterPage,
    SessionDetailPage,
    PostDetailPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{},{
      links: [
        { component: LoginPage, name: 'LoginPage', segment: 'login' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SearchPage,
    LeavePage,
    PersonPage,
    LeaveFormPage,
    SchedulePage,
    PostFormPage,
    PostDetailPage,
    ScheduleFilterPage,
    SessionDetailPage,
    HomePage,
    TabsPage
  ],
  providers: [
    ConferenceData,
    UserData,
    StatusBar,
    InAppBrowser,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
