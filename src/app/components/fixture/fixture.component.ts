import { AfterViewInit, Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Participantes } from 'src/app/types/types';
const _DATA$ = import('../../../assets/data').then(m => m.getData());

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit, AfterViewInit {
   
	players: Participantes = [];
	constructor(private _ds: DataService) {
		_DATA$.then(m => this.players = m);
		this._ds.data$.subscribe(
			data => {
				console.log('main.component: ', {data});
				this.players = data;
			}
		);
	}

    ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		
	}
	click() {
		Promise.all([_DATA$]).then(
			values => {
				this.players = values[0];
				console.log(this.players)
			}
		).catch(e => throwError(e));
	}
}
