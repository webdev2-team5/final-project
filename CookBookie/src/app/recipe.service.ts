import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { Recipe } from './recipe';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl = 'http://localhost:3000/api/recipes';

  constructor(private http: HttpClient) { }

  // Fetch all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.backendUrl);
  }

  // Fetch recipe by id
  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.backendUrl}/${id}`);
  }

  // Edit recipe by id
  editRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.backendUrl}/${recipe.id}`, recipe);
  }
}
