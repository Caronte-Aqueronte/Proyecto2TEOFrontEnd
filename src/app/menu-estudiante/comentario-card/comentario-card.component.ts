import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comentario-card',
  templateUrl: './comentario-card.component.html',
  styleUrls: ['./comentario-card.component.css'],
})
export class ComentarioCardComponent {
  @Input() comentario: any;
}
