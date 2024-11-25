import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MateriasService } from '../../services/materias.service';
import { AuthService } from 'src/app/services/auth.service';
import { register } from 'swiper/element/bundle';
import { ActivatedRoute } from '@angular/router';


register();

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {

  materias: any[] = [];

  img:any[] = [
    "assets/img/fisica.jpg","assets/img/quimica.jpg","assets/img/quimica.jpg"
  ]
  user_data: any;

  // Opciones de configuración del Swiper
  swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  
  userId: string = " "; //test

  constructor(private menuController: MenuController,
    private materiasService: MateriasService,
    private auth: AuthService,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    // Captura el parámetro 'id' de la URL
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('User ID:', this.userId);

    this.auth.GetUserByUsername(sessionStorage.getItem('username')).subscribe(
      (data:any)=>{
        console.log(data[0].clases);
        this.user_data = data[0].clases
        console.log(this.user_data);
      })
  }

  mostrarMenu(){
    this.menuController.open('first');
  }
}
