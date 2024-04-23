import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { RecipeCreateComponent } from './recipe/recipe-create/recipe-create.component';
import { FooterComponent } from './footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCard} from "@angular/material/card"
import { NgForm } from '@angular/forms';
import {MatFormField,MatFormFieldControl,MatFormFieldModule} from "@angular/material/form-field";
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeCreateComponent,
    FooterComponent,
    EditRecipeComponent,
  
 ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    MatFormField,
    MatCard,
    
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
