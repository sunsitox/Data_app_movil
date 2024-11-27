import { Component, OnInit } from '@angular/core';
import { IMateria, IMaterias} from 'src/interfaces/Imaterias';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregarmateria',
  templateUrl: './agregarmateria.page.html',
  styleUrls: ['./agregarmateria.page.scss'],
})
export class AgregarmateriaPage implements OnInit {

  newMateria: IMateria = {
    name: ""
  }

  constructor(private apiCrud: ApicrudService,
    private router: Router) { }

  ngOnInit() {
  }


  CrearMateria() {
    this.apiCrud.postMateria(this.newMateria).subscribe();
    this.router.navigateByUrl("tab-inicial/materias");
    this.newMateria = {
      name: ""
    }
  }
}
