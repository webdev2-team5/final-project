import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FooterComponent } from './footer/footer.component';
import {MatCard} from "@angular/material/card"
import { NgForm,FormsModule } from '@angular/forms';
import {MatInput} from '@angular/material/input'
import {MatFormField,MatFormFieldControl,MatFormFieldModule} from "@angular/material/form-field";
import { CreateRecipeComponent } from './recipe/create-recipe/create-recipe.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    HeaderComponent,
    FooterComponent,
    CreateRecipeComponent,
 ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCard,
    MatExpansionModule,
    MatFormField,
    MatCard,
    MatInput,
    FormsModule,
    MatButtonModule

  ],
  providers: [

  
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
