import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MamasComponent } from './pages/mamas/mamas.component';
import { CoursesComponent } from './pages/courses/courses.component';

const routes: Routes = [
  { path: 'mamas', component: MamasComponent },
  { path: 'courses', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
