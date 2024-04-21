import { Component, EventEmitter, Output } from '@angular/core';
import {NgForm} from "@angular/forms"
import { Recipe } from '../recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {
  @Output() postedited = new EventEmitter<Recipe>()
  onEditRecipe(form:NgForm){

  }
}
