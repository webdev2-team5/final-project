import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent {
private recipe;
constructor(public recipeservice:RecipeService){}
onEditRecipe(form:NgForm){
  if (form.invalid) {
    return;
  }
  //probably 
  //temporary variable as placeholder
  var recipeid = '66303f2759f914cdb111bcc6';
  this.recipe = this.recipeservice.getRecipeById(recipeid)
  //this.recipeservice.editRecipe(recipeid,form.value.title,form.value.ingredients,form.value.instructions);
}
}
