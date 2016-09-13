import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';

import { INITIAL_STATUS, CONNECTED, DISCONNECTED } from './hoodie.actions';

var Hoodie = require('@hoodie/client');

@Injectable()
export class HoodieService {

	private hoodie = new Hoodie({url: 'http://localhost:6001'});

	constructor(private store: Store<any>, private zone: NgZone) {

		setTimeout(() => this.store.dispatch({type: INITIAL_STATUS, payload: this.hoodie.connectionStatus.ok}), 0);

		this.hoodie.connectionStatus.startChecking({interval: 10000});

		this.hoodie.connectionStatus.on('disconnect', () => {
			zone.run(() => this.store.dispatch({type: DISCONNECTED}));
		});
		this.hoodie.connectionStatus.on('reconnect',  () => {
			zone.run(() => this.store.dispatch({type: CONNECTED}));
		});

		// setTimeout(() => this.hoodie.account.signIn({username: 'manu', password: 'waf'}), 2000);
		// setTimeout(() => this.hoodie.account.signOut().then(() => console.log('signed out')), 5000);
	}

	getHoodie = () => {
		return this.hoodie;
	};

	signOut = () => {
		return this.hoodie.account.signOut();
	};

	signIn = (username: string, password: string) => {
		return this.hoodie.account.signIn(username, password);
	};

	signUp = (username: string, password: string) => {
		return this.hoodie.account.signUp(username, password);
	};
}
