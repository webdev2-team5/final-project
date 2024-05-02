import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { SharedService } from 'src/app/shared.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private recipesub: Subscription;
  constructor(
    public recipeservice: RecipeService,
    private service: SharedService
  ) {}

  toggleRecipeAddComponent() {
    this.service.showAdd();
  }

  ngOnInit() {
    this.recipesub = this.recipeservice
      .getRecipeUpdateListener()
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
    this.recipeservice.getRecipe();
  }
  ngOnDestroy() {
    this.recipesub.unsubscribe();
  }

  onDelete(recipeId: ObjectId) {
    this.recipeservice.deleteRecipe(recipeId);
  }

  showEdit(id) {
    console.log('IMPLEMENT EDIT ME: ', id);
  }
}
