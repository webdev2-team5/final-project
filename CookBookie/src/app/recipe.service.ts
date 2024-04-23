import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from "@angular/common/http"
import { Recipe } from './recipe';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];
  constructor(private http: HttpClient) { }
  //fetch the selected recipe
  getRecipe(){
    this.http.get<{message:string,recipe:Recipe[]}>('http://loaclhost:3000/api/recipes').subscribe((recipeData)=>{
      
    })
  }
  //function to edit the recipe
  editRecipe(){
    
  }
}

