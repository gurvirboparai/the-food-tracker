import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodListPageComponent } from './food-list-page/food-list-page.component';
import { TodayPageComponent } from './today-page/today-page.component';
import { ChartPageComponent } from './chart-page/chart-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/today', pathMatch: 'full'},
  {path: 'today', component: TodayPageComponent},
  {path: 'foodlist', component: FoodListPageComponent},
  {path: 'macrochart', component: ChartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
