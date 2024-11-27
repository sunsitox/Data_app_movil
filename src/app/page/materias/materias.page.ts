import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

interface Asistencia{
  fecha:string
  asistencia:string
}

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  isListVisible = false;
  items: Asistencia[] = [
    {
      fecha:'Elemento 1', 
      asistencia:'Si'
    },
    {
      fecha:'Elemento 2', 
      asistencia:'No'
    }
  ];

  toggleList() {
    this.isListVisible = !this.isListVisible;
  }

  constructor(private menuController: MenuController) { }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }
}
