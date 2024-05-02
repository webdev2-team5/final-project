import { Component, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent {
  @Input() recipe: Recipe;

  constructor(
    public recipeservice: RecipeService,
    public sharedService: SharedService
  ) {}

  onEditRecipe(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.recipeservice.editRecipe(
      this.recipe.id,
      form.value.name,
      form.value.ingredients,
      form.value.instructions
    );

    this.sharedService.hideEdit();
  }

  onCancel() {
    this.sharedService.hideEdit();
  }
}
