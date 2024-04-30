import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  private recipesub:Subscription;
  constructor(public recipeservice: RecipeService){}

  ngOnInit(){
    this.recipesub = this.recipeservice.getPostUpdateListener().subscribe((recipes)=>{
      this.recipes = recipes
    }) 
  }

}
