import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },

  {
    path: '',
    component: ContentLayoutComponent,

    loadChildren: () =>
      import('./modules/posts/posts.module').then(m => m.PostsModule)
  },
  {
    path: '404', component: PageNotFoundComponent
  },
  // redirect  when no prior routes is matched
  { path: '**', redirectTo: '404', pathMatch: 'full', }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
