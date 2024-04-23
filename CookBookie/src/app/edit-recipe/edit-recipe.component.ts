import { Component, EventEmitter, Output } from '@angular/core';
import {NgForm} from "@angular/forms"
import {Recipe} from '../recipe'
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css',
})
export class EditRecipeComponent {
  @Output() postedited = new EventEmitter<Recipe>()
  constructor(public editService: RecipeService){}
  onEditRecipe(form:NgForm){
   if (form.invalid) {
      return;
   }
   this.editService.getRecipe()
  }
  
}
