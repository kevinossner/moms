import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MamasComponent } from './pages/mamas/mamas.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { HomeComponent } from './pages/home/home.component';
import { MamaAddComponent } from './pages/mama-add/mama-add.component';
import { MamaEditComponent } from './pages/mama-edit/mama-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mamas', component: MamasComponent },
  { path: 'mamas/add', component: MamaAddComponent },
  { path: 'mamas/edit/:id', component: MamaEditComponent },
  { path: 'courses', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
