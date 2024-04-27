import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from "@angular/common/http"
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
  getRecipes(){
    this.http.get<{message:string,recipe:Recipe[]}>('http://loaclhost:3000/api/recipes').subscribe((recipeData)=>{
      
    })
  }
  //function to edit the recipe
  editRecipe(){
    
  }

  // function to delete recipe
  deleteRecipe(){

  }

  getPostUpdateListener() {
    return this.recipeUpDate.asObservable();
}


}

