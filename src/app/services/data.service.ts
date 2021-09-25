import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { setData, roundSaved, getData } from '../../assets/data';
import { Participantes } from '../types/types';
import { Observable, Subject } from 'rxjs';
/* const _DATA$ = import('../../assets/data').then(m => m.getData()); */

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

    private data: Subject<Participantes> = new Subject<Participantes>();
	public data$: Observable<Participantes> = new Observable<Participantes>();
	private DATA: Participantes = getData();
	
	constructor(private _http: HttpClient) {
		/* _DATA$.then(
			m => {
				this.data$ = this.data.asObservable();
				this.data.next(m);
				//this.data.complete();
			}
		); */
		this.data.next(this.DATA);
		this.data$ = this.data.asObservable();
	}
	/**
	 * Default Angular ngOnDestroy() hook
	 */
	ngOnDestroy(): void {
		this.data.complete();
		this.data.unsubscribe();
	}
	/**
	 * Return array<Participantes>
	 * @returns return data
	 */
    public readData(): Participantes {
		return getData();
	}
	/**
	 * Returna nex round saved
	 * @returns return next round
	 */
	public getRoundSaved(): string {
		return roundSaved();
	}
	/**
	 * Save data in localstorage
	 */
	public writeData(newData: Participantes, round?: string): void {
		setData(newData, round);
		this.data.next(newData);
	}
	/**
	 * Return a datas obsebalbe
	 * @returns a obserbable the data$
	 */
	public getData(): Observable<Participantes> {
		return this.data$;
	}

	public getParticipantes(): Participantes {
		return this.DATA;
	}
}
