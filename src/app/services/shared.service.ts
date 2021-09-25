import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

	private emitChangeSource = new Subject<any>();

	changeEmitted$ = this.emitChangeSource.asObservable();

	emitChange(change: any) {
		this.emitChangeSource.next(change);
	}

}
