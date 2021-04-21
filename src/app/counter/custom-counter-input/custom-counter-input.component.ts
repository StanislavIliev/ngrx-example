import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changesChannelName, customIncrement } from 'src/app/state/counter.actions';
import { CounterState } from 'src/app/state/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {

  value: number;
  channelName: string

  constructor(
    private store: Store<{counter: CounterState}>
  ) { }

  ngOnInit(): void {
    this.store.select('counter').subscribe((data)=>{
      console.log("Channel Name Observable called");
      this.channelName = data.channelName;
    })
  }

  onAdd(){
    this.store.dispatch(customIncrement({count: +this.value}));
  }

  onChangesChannel(){
    this.store.dispatch(changesChannelName());
  }

}
