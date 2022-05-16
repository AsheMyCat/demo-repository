import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTableComponent } from './admin-table/admin-table.component';

const routes: Routes = [
  { path: 'admin', component: AdminTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

export const routingComponents = [AdminTableComponent]
