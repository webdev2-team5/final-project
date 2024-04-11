import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PostEditComponent } from './post-edit/post-edit.component';
import { NgForm } from '@angular/forms';
import {MatFormField,MatFormFieldControl,MatFormFieldModule} from "@angular/material/form-field"
@NgModule({
  declarations: [
    AppComponent,
    PostEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormField,
    MatFormFieldControl
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
