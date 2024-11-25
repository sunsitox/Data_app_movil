import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

interface Horario{
  clase:string
  dia:string
  hora:string
}

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  userId: string = " "; //test

  isListVisible = false;
  items: Horario[] = [
    {
      clase: 'Arquitectura',
      dia: 'Lunes',
      hora: '8:00 AM - 9:00 AM'
    },
    {
      clase: 'Arquitectura',
      dia: 'Martes',
      hora: '10:00 AM - 11:00 AM'
    },
    {
      clase: 'Arquitectura',
      dia: 'Miércoles',
      hora: '12:00 PM - 1:00 PM'
    },
    {
      clase: 'Arquitectura',
      dia: 'Jueves',
      hora: '2:00 PM - 3:00 PM'
    },
    {
      clase: 'Arquitectura',
      dia: 'Viernes',
      hora: '4:00 PM - 5:00 PM'
    }
  ];

  toggleList() {
    this.isListVisible = !this.isListVisible;
  }

  constructor(private menuController: MenuController,
    private authservice: AuthService, 
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    // Captura el parámetro 'id' de la URL
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('User ID:', this.userId);
  }

  mostrarMenu(){
    this.menuController.open('first');
  }
}
