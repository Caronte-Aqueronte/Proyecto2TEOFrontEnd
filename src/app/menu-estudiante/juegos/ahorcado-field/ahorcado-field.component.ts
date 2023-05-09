import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado-field',
  templateUrl: './ahorcado-field.component.html',
  styleUrls: ['./ahorcado-field.component.css'],
})
export class AhorcadoFieldComponent implements OnInit {
  @Input() palabra: any;
  constructor() {
   
  }
  ngOnInit(): void {

  }
}
