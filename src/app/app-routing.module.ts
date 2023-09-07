import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CallbackHandlerComponent} from "./callback-handler/callback-handler.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'callback', component: CallbackHandlerComponent},
  {path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
