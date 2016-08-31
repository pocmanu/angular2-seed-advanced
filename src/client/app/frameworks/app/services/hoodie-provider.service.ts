import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

var Hoodie = require('@hoodie/client');

@Injectable()
export class HoodieProvider {

	hoodie = new Hoodie({url: 'http://localhost:6001'});
	connectionStatus: Observable<Boolean>;

	connected = new EventEmitter();

	constructor() {

		this.connectionStatus = Observable.merge(
			Observable.fromEvent(this.hoodie.connectionStatus, 'disconnect').mapTo(false), 
			Observable.fromEvent(this.hoodie.connectionStatus, 'reconnect').mapTo(true),
			Observable.of(this.hoodie.connectionStatus.ok)
		);
		this.connectionStatus.subscribe((status) => console.log('connection status', status));
		this.hoodie.connectionStatus.startChecking({interval: 10000});

		setTimeout(() => this.hoodie.account.signIn({username: 'manu', password: 'waf'}), 2000);
		setTimeout(() => this.hoodie.account.signOut().then(() => console.log('disconnected')), 5000);
	}

	getHoodie = () => {
		return this.hoodie;
	};

	isConnected = () => {
		return this.hoodie.account.username && this.hoodie.account.hasValidSession();
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

	observer = (obs: any) => {
		this.connected.subscribe(obs);
	};
}
