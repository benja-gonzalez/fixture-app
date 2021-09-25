import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';
import { Participante, Participantes } from 'src/app/types/types';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

	players  : Participantes;
	cuartos  : Participantes = [];
	semifinal: Participantes = [];
	finalista: Participantes = [];
	winner: Participantes;

	constructor(private _ds: DataService, private _shs:SharedService) {
		this.players = _ds.getParticipantes();
		this.cuartos = JSON.parse(localStorage.getItem('cuartos')??'[]');

		this.semifinal = JSON.parse(localStorage.getItem('semifinal')??'[]');

		this.finalista = JSON.parse(localStorage.getItem('final')??'[]');
	
		this.winner = JSON.parse(localStorage.getItem('ganador') || '[]');
	}

	ngOnInit(): void {
		/* this._ds.getData().subscribe(
			changes => {
				console.log({ changes });
				this.players = changes;
			}
		); */		
	 }
	/**
	 * Default angular ngAfterViewInit() hook
	 */
	ngAfterViewInit(): void {
		this._ds.getData().subscribe(
			changes => {
				console.log({ changes });
				this.players = changes;
			}
		);
		this._shs.changeEmitted$.subscribe(
			res => {
				console.log({res})
				if (res === true) {
					this.players = this._ds.getParticipantes();
				}
				if (res === typeof 'string') {
					/* if (res === 'GANADOR') {
						this.winner = res.name;
					} */
					switch (res) {
						case 'CUARTOS':
							this.cuartos = JSON.parse(localStorage.getItem('cuartos')??'[]');
							break;
						case 'SEMIFINAL':
							this.semifinal = JSON.parse(localStorage.getItem('semifinal')??'[]');;
							break;
						case 'FINAL':
							this.finalista = JSON.parse(localStorage.getItem('final')??'[]');;
							break;
						default:
							this.winner = JSON.parse(localStorage.getItem('ganador')??'');;
							break;
					}
				}
			}
		);
	}
	/* click() {
		window.location.reload()
	} */

}
