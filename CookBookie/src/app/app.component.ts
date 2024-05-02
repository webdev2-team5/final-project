import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CookBookie';
  createRecipeComponentEnabled = false;

  constructor(ss: SharedService) {
    ss.addForm.subscribe((value) => {
      this.createRecipeComponentEnabled = value;
    });
  }
}
