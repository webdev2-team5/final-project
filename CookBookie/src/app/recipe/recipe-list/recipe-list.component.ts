import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model' ;

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeSub: Subscription;
  constructor(public recipeService:RecipeService) {}
  recipes: Recipe[]=[];
  ngOnInit() {
    this.recipeSub = this.recipeService.getPostUpdateListener().subscribe((recipes: Recipe[])=>{
      this.recipes = recipes;
    });
    this.recipeService.getRecipes();
  }
  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }
}
