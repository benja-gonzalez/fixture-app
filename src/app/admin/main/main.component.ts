import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CUARTOS, FINAL, Finalista, Participante, Participantes, SEMIFINAL } from '../../types/types';
const _DATA$ = import('../../../assets/data').then(m => m.getData());

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

    path: string = 'assets/header/image.jpg';
	participante: string = '';
		
	items: Participantes = [];
	cuartos: Participantes = [];
	semifinal: Participantes = [];
	final: Finalista = [null, null];
	next: string = CUARTOS;
	isLogged$: boolean = false;
	
	constructor(private _ds: DataService) {
		_DATA$.then(m => this.items = m); //this.players =
	}

	ngOnInit(): void { }

	ngAfterViewInit(): void {
		this._ds.data$.subscribe(
			data => {
				console.log('main.component: ', {data});
				this.items = data;
			}
		);
	}
    

	ngOnDestroy(): void {
		this.save();
	}

	onSubmit(value: string): void {
		if (value && !this.items.find(v => v.name === value)) {
			this.items?.push(this._createParticipante(value));
			this.save();
		}
		this.participante = '';
	}

	save(): void {
		this._ds.writeData(this.items,this.next);
	}
	editGanadores(nombre:string): void {
		
	}
	remove(item: string): void {
		const result = this.items.filter(v => v.name !== item);
		this.items = result;
		this.save();
	}
	nextRound(next: string): void {
		this.items = this._onNextRound(next);
		this.save();
	}
	private _onNextRound(nextRound: string): Participantes {
		switch (nextRound) {
			case SEMIFINAL:
				{
					const response = this.items.filter(v => v.isWinner === true);
					this.save();
					return this._resetPlayers(response);
				}
			case FINAL:
				{
					const response = this.items.filter(v => v.isWinner === true);
					this.save();
					return this._resetPlayers(response);
				}
			default:
				const response = this.next === CUARTOS ? SEMIFINAL : FINAL;
				this.next = response;
				const resets = this.items.filter(v => v.isWinner === true);
				//this.items = resets;
				this.save();
				return this._resetPlayers(resets);
		}
	}
	/**
	 * create a new player
	 * @param nombre player name to be created
	 * @returns a new player
	 */
	private _createParticipante(name: string): Participante {
		return { name, isWinner: false };
	}
	/**
	 * reset players from an array 'from'
	 * @param from players to be reset
	 * @returns same array
	 */
	private _resetPlayers(from: Participantes): Participantes {
		//const response = 
		from?.forEach(
			(value) => {
				value.isWinner = false;
			});
		return from;
	}

}
