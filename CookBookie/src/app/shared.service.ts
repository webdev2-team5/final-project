import { Injectable, Input, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  @Output() addForm: EventEmitter<boolean> = new EventEmitter();
  @Output() editForm: EventEmitter<boolean> = new EventEmitter();

  showAdd() {
    console.log('Showing New Recipe form');
    this.addForm.emit(true);
  }

  hideAdd() {
    this.addForm.emit(false);
  }

  showEdit() {
    this.editForm.emit(true);
  }

  hideEdit() {
    this.editForm.emit(false);
  }
}
