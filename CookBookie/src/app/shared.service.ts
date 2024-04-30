import { Injectable, Input,Output,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  constructor() { }

  change() {
    console.log('change started');
     this.fire.emit(true);
   }
   changeBack() {
    this.fire.emit(false);
   }
}
