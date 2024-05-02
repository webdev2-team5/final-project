import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { Recipe } from './recipe/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CookBookie';
  createRecipeComponentEnabled = false;
  editRecipeComponentEnabled = false;
  editRecipe;

  constructor(ss: SharedService) {
    ss.addForm.subscribe((value) => {
      this.createRecipeComponentEnabled = value;
    });
    ss.editForm.subscribe((value) => {
      this.editRecipeComponentEnabled = value;
    });
  }

  changeEditRecipe(recipe) {
    this.editRecipe = recipe;
  }
}
