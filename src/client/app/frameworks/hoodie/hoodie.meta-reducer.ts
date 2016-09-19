import { ActionReducer, Action } from '@ngrx/store';
import * as _ from 'lodash';
import { HoodieStoreConfig } from './hoodie.storeconfig';

export const HOODIE_ACTION_PREFIX = '[Hoodie]';

export function hoodie(reducer: ActionReducer<any>, storeConfig: HoodieStoreConfig) {

    function findItem(state: any[], id: string) {
        return state.map(item => {
            if (item.id === id) {
                return item;
            }
        })[0];
    }

    // intercept actions
    return function (state: any[] = [], action: Action) {
        if (!_.startsWith(action.type, HOODIE_ACTION_PREFIX)) {
            return reducer(state, action);
        }
        let subsequentActionType = action.type.replace(HOODIE_ACTION_PREFIX, '');
        let item: any = findItem(state, action.payload.id);
        if (subsequentActionType === storeConfig.addaction) {
            if (!item) {
                return reducer(state, { type: subsequentActionType, payload: action.payload });
            } else if (!_.isEqual(item, action.payload)) {
                return reducer(state, { type: storeConfig.updaction, payload: action.payload });
            }
        } else if (subsequentActionType === storeConfig.updaction && !_.isEqual(item, action.payload)) {
            return reducer(state, {type: storeConfig.updaction, payload: action.payload});
        }
        return state;
    };
}
