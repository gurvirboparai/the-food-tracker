import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Foods } from './foods';
import { FOODS } from './mock-food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  // Method to return foods
  getFoods(): Observable <Foods[]> {
    const foods = of(FOODS);
    return foods;
  }

}
