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
import { EditRecipeComponent } from './recipe/edit-recipe/edit-recipe.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from './recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    HeaderComponent,
    FooterComponent,
    EditRecipeComponent,
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
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
