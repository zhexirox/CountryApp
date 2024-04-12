import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = "";

  @Output()
  public onValue = new EventEmitter<string>();

  constructor() {}

  emitValue( value: string ):void {
    console.log("Desde SearchBox");
    console.log({value});

    this.onValue.emit(value);
  }
}
