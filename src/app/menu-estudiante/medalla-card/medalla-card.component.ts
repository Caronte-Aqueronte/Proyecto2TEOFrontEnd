import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medalla-card',
  templateUrl: './medalla-card.component.html',
  styleUrls: ['./medalla-card.component.css'],
})
export class MedallaCardComponent {
  @Input() informacion: any;

  
}
