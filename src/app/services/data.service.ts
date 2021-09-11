import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { setData, roundSaved, getData } from '../../assets/data';
import { Participantes } from '../types/types';
import { Observable, Subject } from 'rxjs';
const _DATA$ = import('../../assets/data').then(m => m.getData());

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

    private data: Subject<Participantes> = new Subject<Participantes>();
	public data$: Observable<Participantes> = new Observable<Participantes>();
	
	constructor(private _http: HttpClient) {
		_DATA$.then(
			m => {
				this.data$ = this.data.asObservable();
				this.data.next(m);
				this.data.complete();
			}
		);
	}

	ngOnDestroy(): void {
		this.data.complete();
		this.data.unsubscribe();
	}

    public readData(): Participantes {
		return getData();
	}
	public getRoundSaved(): string {
		return roundSaved();
	}
	public writeData(newData: Participantes, round?: string): void {
		setData(newData, round);
		this.data.next(newData);
		this.data.complete();
	}
}
