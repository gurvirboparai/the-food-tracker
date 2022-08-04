import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Foods } from '../foods';
import { FoodStateServiceService } from '../food-state-service.service';
import { Subscription } from 'rxjs';
import { FoodState } from '../food-state-service.service';

@Component({
  selector: 'app-today-page',
  templateUrl: './today-page.component.html',
  styleUrls: ['./today-page.component.css'],
})
export class TodayPageComponent implements OnInit {
  constructor(
    private foodService: FoodService,
    private foodState: FoodStateServiceService
  ) {}

  // Subscribe to food
  foods$: Foods[] = [];
  foodsSub: Subscription = this.foodState.$foods.subscribe((foods: Foods[]) => {
    this.foods$ = foods;
  });

  // Subscribe to deleted IDS
  deletedSelectedID$: number[] = [];
  deletedSelectedIDSub: Subscription =
    this.foodState.$deletedSelectedID.subscribe((id: number[]) => {
      this.deletedSelectedID$ = id;
    });

  // Subscribe to totals
  total$: FoodState['total'] = { carbohydrates: 0, protein: 0, fat: 0 };
  totalSub: Subscription = this.foodState.$total.subscribe(
    (total: FoodState['total']) => {
      this.total$ = total;
    }
  );

  ngOnInit(): void {
    this.foodState.calcTotal();
  }

  // Check selected UD
  setSelectedId(id: number, checked: EventTarget | null) {
    if ((checked as any).checked) {
      this.foodState.setSelectedId(id);
    } else {
      this.foodState.unselectDeletedSelectedID(id);
    }
  }

  // Create delete
  removeFood() {
    this.foodState.removeFood(this.deletedSelectedID$);
  }
}
