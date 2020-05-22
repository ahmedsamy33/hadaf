import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListsComponent } from './page/posts-lists/posts-lists.component';
import { PostDetialsComponent } from './page/post-detials/post-detials.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',

    children: [
      {
        path: '',
        component: PostsListsComponent
      },
      {
        path: 'post-detials/:id',
        component: PostDetialsComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
