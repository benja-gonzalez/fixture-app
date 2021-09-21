import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CUARTOS, FINAL, Finalista, Participante, Participantes, SEMIFINAL } from '../../types/types';
import { LoginService } from '../login/login.service';
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
	/**
	 * login stuff
	 */
	isLogged$: boolean = false;
	user: string = '';
	password: string = '';
	hide: boolean = true;

	constructor(private _ds: DataService, private _ls: LoginService) {
		_DATA$.then(m => this.items = m);
	}
	/**
	 * Angular default ngOnInit() hook
	 */
	ngOnInit(): void {
		this.isLogged$ = this._ls._getUserLogged();
	}
	/**
	 * Angular default ngAfterViewInit() hook
	 */
	ngAfterViewInit(): void {
		this._ds.getData().subscribe(
			data => {
				this.items = data;
				console.log({data})
			}
		);
		this._ls.getLogin().subscribe(
			logged => {
				this.isLogged$ = logged;
				console.log({ logged });
			}
		)
	}
    /**
	 * Angular default ngOnDestroy() hook
	 */
	ngOnDestroy(): void {
		this.save();
	}
	/**
	 * Creates a new player
	 * @param value player name to be created
	 */
	onSubmit(value: string): void {
		if (value && !this.items.find(v => v.name === value)) {
			this.items?.push(this._createParticipante(value));
			this.save();
		}
		this.participante = '';
	}
	/**
	 * Save data, just in case
	 */
	save(): void {
		this._ds.writeData(this.items,this.next);
	}
	//not yet  /* EditGanadores(nombre:string): void { } */

	/**
	 * Remove a item passed in param
	 * @param item items to be removed
	 */
	remove(item: string): void {
		const result = this.items.filter(v => v.name !== item);
		this.items = result;
		this.save();
	}
	/**
	 * A simple call a private method
	 * @param next next round name
	 */
	nextRound(next: string): void {
		this.items = this._onNextRound(next);
		this.save();
	}
	/**
	 * Loggin th user
	 */
	 login(): void {
		this._ls.logIn(this.user, this.password).subscribe(change => this.isLogged$ = change);
	}
	/**
	 * Private method to pass a next round
	 * @param nextRound next round name
	 * @returns players winners && rest's to
	 */
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
					//this._saveWinners();
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
		return { name, isWinner: false, id: this.items.length };
	}
	/**
	 * Reset players from an array 'from'
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
	private _saveWinners(arr:any): any {
		let result = [];
	}

}
