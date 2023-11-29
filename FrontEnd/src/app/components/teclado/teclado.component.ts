import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.css']
})
export class TecladoComponent implements OnInit {

  @Input() type: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
