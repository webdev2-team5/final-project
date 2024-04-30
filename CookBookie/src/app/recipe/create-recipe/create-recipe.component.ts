import { Component, EventEmitter, Output } from '@angular/core';
import {NgForm} from "@angular/forms"
import {Recipe} from '../recipe.model'
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent {
  @Output() postedited = new EventEmitter<Recipe>()
  constructor(public recipeservice: RecipeService){}
  onCreateRecipe(form:NgForm){
   if (form.invalid) {
      return;
   }
   
  }
  
}
