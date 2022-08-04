import { Injectable } from '@angular/core';
import { GlobalStateService } from './global-state.service';
import { FOODS, todayLIST } from './mock-food';
import { Observable } from 'rxjs';
import { Foods } from './foods';

// Create interface
export interface FoodState {
  foods: Foods[];
  deletedSelectedID: number[];
  addSelectedID: number[];
  total: { carbohydrates: number; protein: number; fat: number };
}

const initialState: FoodState = {
  foods: todayLIST,
  deletedSelectedID: [],
  addSelectedID: [],
  total: { carbohydrates: 0, protein: 0, fat: 0 },
};

@Injectable({
  providedIn: 'root',
})
export class FoodStateServiceService extends GlobalStateService<FoodState> {

  // Create variables
  $foods: Observable<Foods[]> = this.select((state) => state.foods);
  $deletedSelectedID: Observable<number[]> = this.select(
    (state) => state.deletedSelectedID
  );
  $addSelectedID: Observable<number[]> = this.select(
    (state) => state.addSelectedID
  );
  $total: Observable<FoodState['total']> = this.select((state) => state.total);

  constructor() {
    super(initialState);
  }

  // Check selected UD
  setSelectedId(id: number) {
    this.state.deletedSelectedID.push(id);
    this.setState({ deletedSelectedID: this.state.deletedSelectedID });
  }

  // Create delete
  removeFood(id: number[]) {
    id.forEach((foodID) => {
      this.setState({
        foods: (this.state.foods = this.state.foods.filter(
          (food) => food.id !== foodID
        )),
      });
      this.calcTotal();
    });
    this.setState({ deletedSelectedID: [] });
  }

  // Check for add
  setAddSelectedID(id: number) {
    this.state.addSelectedID.push(id);
    this.setState({ addSelectedID: this.state.addSelectedID });
  }

  // Create add
  addFood(id: number[]) {
    id.forEach((foodID) => {
      const food = FOODS.find((food) => food.id === foodID);
      const newFoods = this.state.foods;
      if (food) {
        const newFood = { ...food };
        newFood.id = Math.floor(Math.random() * 10000000) + 10000;
        newFoods.push(newFood);
      }
      this.setState({ foods: (this.state.foods = newFoods) });
      this.calcTotal();
    });
    this.setState({ addSelectedID: [] });
  }

  // Create total
  calcTotal() {
    let carbohydrates = 0;
    let protein = 0;
    let fat = 0;
    this.state.foods.forEach((food) => {
      carbohydrates += food.carbs;
      protein += food.protein;
      fat += food.fat;
    });
    this.setState({
      total: (this.state.total = { carbohydrates, protein, fat }),
    });
  }

  // Unselect added ID
  unselectAddedSelectedID(id: number) {
    this.setState({
      addSelectedID: (this.state.addSelectedID =
        this.state.addSelectedID.filter((foodID) => foodID !== id)),
    });
  }

  // Unselect remove ID
  unselectDeletedSelectedID(id: number) {
    this.setState({
      deletedSelectedID: (this.state.deletedSelectedID =
        this.state.deletedSelectedID.filter((foodID) => foodID !== id)),
    });
  }
}
