import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public initialValue: string = "";

  @Input()
  public placeholder: string = "";

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  constructor() {}

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);

    })
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }


  emitValue( value: string ):void {
    console.log("Desde SearchBox");
    console.log({value});

    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
