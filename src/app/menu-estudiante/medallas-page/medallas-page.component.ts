import { Component } from '@angular/core';

@Component({
  selector: 'app-medallas-page',
  templateUrl: './medallas-page.component.html',
  styleUrls: ['./medallas-page.component.css']
})
export class MedallasPageComponent {

  displayedColumns: string[] = ['juego', 'tipo', 'name', 'tiempo', 'weight'];
  dataSource = [];
}
