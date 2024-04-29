import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Recipe } from './recipe.model';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  private recipes: Recipe[] = [];
  private recipeUpDate = new Subject<Recipe[]>()

  constructor(private http: HttpClient) { }

  //function to fetch recipes
  getRecipes(recipeid){
    this.http.get<{message:string,recipe:Recipe[]}>('http://loaclhost:3000/api/recipes').subscribe((recipeData)=>{
      var recipe = recipeData.recipe;
      return recipe;
    })
  }
  //function to edit the recipe
  editRecipe(recipe:Recipe){
    
    //this is not a working method yet and as part of this process a get request will need to be sent as well
    const data = {'recipe':recipe}
    this.http.post('http://localhost:3000/api/recipes',{data})
  }

  // function to delete recipe
  deleteRecipe(){

  }

  getPostUpdateListener() {
    return this.recipeUpDate.asObservable();
}


}

