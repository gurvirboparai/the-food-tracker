import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Foods } from '../foods';
import { FoodStateServiceService } from '../food-state-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-list-page',
  templateUrl: './food-list-page.component.html',
  styleUrls: ['./food-list-page.component.css']
})
export class FoodListPageComponent implements OnInit {


  constructor(private foodService: FoodService, private foodState: FoodStateServiceService) { }

  foods: Foods[] = [];

  ngOnInit(): void {
    this.getFoods();
  }

  // Import foods to component
  getFoods(): void {
    this.foodService.getFoods().subscribe(foods => this.foods = foods);
  }

  // Subscribe to deleted IDS
  addSelectedID$: number[] = [];
  addSelectedIDSub: Subscription = this.foodState.$addSelectedID.subscribe((id: number[]) => {
    this.addSelectedID$=id;
  });


  // Check selected UD
  setAddSelectedId(id: number, checked: EventTarget | null){
    if ((checked as any).checked) {
      this.foodState.setAddSelectedID(id);
    } else {
      this.foodState.unselectAddedSelectedID(id);
    }
  }

// Create delete
  addFood() {
  this.foodState.addFood(this.addSelectedID$)
}


}
