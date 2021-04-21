import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from 'src/app/state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {

  counter: number;

  constructor(private store: Store<{ counter: CounterState }>) { }

  ngOnInit(): void {
    this.store.select('counter').subscribe(data => {
      this.counter = data.counter;  
    });
  }
}
