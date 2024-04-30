import { Component, EventEmitter, Output } from '@angular/core';
import {NgForm} from "@angular/forms"
import {Recipe} from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent {
  @Output() postedited = new EventEmitter<Recipe>()
  constructor(public recipeservice: RecipeService, private service: SharedService){}
  onCreateRecipe(form:NgForm){
    if (form.invalid) {
      return;
   }
   this.service.changeBack();

      this.recipeservice.createRecipe(form.value.name, form.value.instructions, form.value.ingredients)

  }

}
