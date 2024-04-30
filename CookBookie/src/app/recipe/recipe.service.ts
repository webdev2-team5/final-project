import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { map } from 'rxjs/operators';
import { ObjectId } from 'mongoose';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private backendUrl = 'http://localhost:3000/api/recipes';

  private recipes: Recipe[] = [];
  private recipeUpDate = new Subject<Recipe[]>();

  constructor(private http: HttpClient) {}
  //function to get recipes by id
  getRecipeById(id: string) {
    this.http
      .get('http://localhost:3000/api/recipes/:id', {})
      .subscribe((recipe) => {
        console.log(recipe);
        return recipe;
      });
  }
  //function to fetch recipes
  getRecipe() {
    this.http
      .get<{ recipes: any }>('http://localhost:3000/api/recipes')
      .pipe(
        map((recipeData) => {
          return recipeData.recipes.map((recipe) => {
            return {
              id: recipe._id,
              name: recipe.name,
              ingredients: recipe.ingredients,
              instructions: recipe.instructions,
              favorited: recipe.favorited,
              createdAt: recipe.createdAt,
            };
          });
        })
      )
      .subscribe((transformedPost) => {
        this.recipes = transformedPost;
        this.recipeUpDate.next([...this.recipes]);
      });
  }
  //function to edit the recipe
  editRecipe(
    recipeid: string,
    title: string,
    ingredients: string,
    recipe: string
  ) {
    var recipechange = this.getRecipeById(recipeid);
    //this is not a working method yet and as part of this process a get request will need to be sent as well
    const data = { recipe: recipechange };
    this.http
      .patch('http://localhost:3000/api/recipes/:id', {})
      .subscribe((resp) => {
        console.log(resp);
        return resp;
      });
  }
  //fucntion to create recipe

  createRecipe(name:string,ingredients:string,instructions:string){
    const recipe: Recipe = {id: null, name: name, instructions: instructions, ingredients:ingredients, favorited:false, createdAt: Date.now()}
        console.log(recipe)
        this.http.post<{}>("http://localhost:3000/api/recipes", recipe)
        .subscribe(() => { 
            this.recipes.push(recipe);
            this.recipeUpDate.next([...this.recipes]);
        });
  }
  // function to delete recipe
  deleteRecipe(id: ObjectId) {
    this.http
      .delete('http://localhost:3000/api/recipes/' + id)
      .subscribe(() => {
        const updatedRecipe = this.recipes.filter((recipe) => recipe.id != id);
        this.recipes = updatedRecipe;
        this.recipeUpDate.next([...this.recipes]);
      });
  }

  getRecipeUpdateListener() {
    return this.recipeUpDate.asObservable();
  }
}
