import {Component} from '@angular/core';
import {Store, provideStore} from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

@Component({
    selector: 'counter',
    template: `
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>
    <div></div>
    waf : {{counter | async}}    
`
})
export class CounterComponent {
    counter: any;
    constructor(private store:Store<any>){
        this.counter = store.select('counter');
    }
    
    increment(){
      this.store.dispatch({type: INCREMENT})
    }
    
    decrement(){
      this.store.dispatch({type: DECREMENT})
    }
}


export const counter = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
            
        case DECREMENT:
            return state - 1;
            
        default:
            return state;
    }
};
