import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Participantes } from 'src/app/types/types';
const _DATA$ = import('../../../assets/data').then(m => m.getData());

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  players: Participantes = [];
  winner: string = '';

	constructor(private _ds: DataService) {
    _DATA$.then(
      res => {
        this.players = res
      console.log({res})}
    )
    
	}

	ngOnInit(): void {
		this._ds.getData().subscribe(
			changes => { console.log({changes});this.players = changes}
		);
	 }
	/**
	 * Default angular ngAfterViewInit() hook
	 */
	ngAfterViewInit(): void {
		this._ds.getData().subscribe(
			changes => { console.log({changes});this.players = changes}
		);
	}
	click() {
		window.location.reload()
	}

}
