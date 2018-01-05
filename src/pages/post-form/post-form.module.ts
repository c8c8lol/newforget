import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostFormPage } from './post-form';

@NgModule({
  declarations: [
    PostFormPage,
  ],
  imports: [
    IonicPageModule.forChild(PostFormPage),
  ],
})
export class PostFormPageModule {}
