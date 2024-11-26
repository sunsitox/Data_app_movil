import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {

  materias: any[] = [];
  
  constructor(private menuController: MenuController,
    private apiCrud: ApicrudService,
    private router: Router
  ) { }

  ngOnInit() {
    this.apiCrud.getMaterias().subscribe(
      (data) => {
        this.materias = data;
        console.log(data);
      });
  }

  VerQr(Observable: any){
    this.router.navigate(['qrcode',this.materias], {
      queryParams: { materia: JSON.stringify(Observable) }
    });
  }

  mostrarMenu() {
    this.menuController.open('first');
  }
}
