import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodState } from '../food-state-service.service';
import { FoodStateServiceService } from '../food-state-service.service';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.css'],
})
export class ChartPageComponent implements OnInit {
  constructor(
    private foodState: FoodStateServiceService
  ) {}

  // Subscribe to totals
  total$: FoodState['total'] = { carbohydrates: 0, protein: 0, fat: 0 };
  totalSub: Subscription = this.foodState.$total.subscribe(
    (total: FoodState['total']) => {
      this.total$ = total;
    }
  );

  ngOnInit(): void {}


  // Setup variables to hold numbers
  carbs = this.total$.carbohydrates;
  protein = this.total$.protein;
  fat = this.total$.fat;

  // this.carbs, this.protein, this.fat
  // Create chart label and data
  foodChartLabels: string[] = ['Carbohydrates', 'Protein', 'Fat'];

  foodChartData = [
    {
      data: [this.carbs || 165, this.protein || 35, this.fat || 36],
    },
  ];


}
