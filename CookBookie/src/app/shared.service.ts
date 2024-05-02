import { Injectable, Input, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  @Output() addForm: EventEmitter<boolean> = new EventEmitter();

  showAdd() {
    console.log('Showing New Recipe form');
    this.addForm.emit(true);
  }

  hideAdd() {
    this.addForm.emit(false);
  }
}
