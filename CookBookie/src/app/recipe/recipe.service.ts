import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Recipe } from './recipe.model';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  private backendUrl = 'http://localhost:3000/api/recipes';

  private recipes: Recipe[] = [];
  private recipeUpDate = new Subject<Recipe[]>()

  constructor(private http: HttpClient) { }

  // Fetch all recipes
  getRecipes() {
    this.http.get<{recipes: Recipe[]}>(this.backendUrl)
    .subscribe((recipeData)=>{
      this.recipes = recipeData.recipes;
      this.recipeUpDate.next([...this.recipes]);
    });
  }

  // Edit recipe by id
  editRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.backendUrl}/${recipe.id}`, recipe);
  }

  // Fetch recipe by id
  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.backendUrl}/${id}`);
  }

  // function to delete recipe
  deleteRecipe(){

  }

  getPostUpdateListener() {
    return this.recipeUpDate.asObservable();
  }

}
