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

	constructor(private _ds: DataService) { }

	ngOnInit(): void { }
	/**
	 * Default angular ngAfterViewInit() hook
	 */
	ngAfterViewInit(): void {
		this._ds.getData().subscribe(
			changes => this.players = changes
		);
	}
	click() {
	}
}
