import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GravityforceComponent } from './gravityforce/gravityforce.component';
import { VectorforceComponent } from './vectorforce/vectorforce.component';

const routes: Routes = [
  {path: "gravity",component: GravityforceComponent},
  {path: "force",component: VectorforceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
