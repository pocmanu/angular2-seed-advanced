import { ActionReducer, Action } from '@ngrx/store';

// app
import {t} from '../test/index';

import { hoodie } from './hoodie.meta-reducer';

let addcount:number = 0;
let updatecount:number = 0;

const mockReducer: ActionReducer<any[]> = (state: any[] = [], action: Action) => {
    switch (action.type) {
        case 'ADD_TODO':
            addcount++;
            return action.payload;
        case 'UPDATE_TODO':
            updatecount++;
            return action.payload;
    };
    return state;
};

export function main() {
  t.describe('Hoodie: HoodieMetaReducer', () => {
      var red: any;

      t.be(() => {
          red = hoodie(mockReducer, {storename: 'todo', initaction: 'INIT_TODO', addaction: 'ADD_TODO', 
            updaction: 'UPDATE_TODO', delaction: 'REMOVE_TODO'});
          addcount = 0;
          updatecount = 0;
      });

      t.it('should call reducer\'s add', () => {
          red([], {type: '[Hoodie]ADD_TODO', payload: {id: '1'}});
          t.e(addcount).toBe(1);
      });

      t.it('should not call reducer\'s add', () => {
          red([{id: '1'}], {type: '[Hoodie]ADD_TODO', payload: {id: '1'}});
          t.e(addcount).toBe(0);
      });

      t.it('should call reducer\'s update', () => {
          red([{id: '1'}], {type: '[Hoodie]ADD_TODO', payload: {id: '1', saved: true}});
          t.e(updatecount).toBe(1);
      });

      t.it('should not call reducer\'s update', () => {
          red([{id: '1', saved: true}], {type: '[Hoodie]ADD_TODO', payload: {id: '1', saved: true}});
          t.e(updatecount).toBe(0);
      });
  });
}
