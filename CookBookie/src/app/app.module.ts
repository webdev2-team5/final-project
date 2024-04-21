import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCard} from "@angular/material/card"
import { NgForm } from '@angular/forms';
import {MatFormField,MatFormFieldControl,MatFormFieldModule} from "@angular/material/form-field";
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component'
@NgModule({
  declarations: [
    AppComponent,
    EditRecipeComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormField,
    MatCard

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
