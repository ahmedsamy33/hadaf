import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListsComponent } from './page/posts-lists/posts-lists.component';
import { PostDetialsComponent, DialogContentDelete } from './page/post-detials/post-detials.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PostsListsComponent, PostDetialsComponent, DialogContentDelete],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ]
})
export class PostsModule { }
