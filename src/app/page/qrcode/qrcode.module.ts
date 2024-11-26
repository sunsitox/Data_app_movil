import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRcodePage } from './qrcode.page';
import { QRcodePageRoutingModule } from './qrcode-routing.module'; // Asegúrate de que esta línea sea correcta
import { QRCodeModule } from 'angularx-qrcode'; // Asegúrate de que esto esté aquí

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    QRcodePageRoutingModule, // Asegúrate de que esto esté aquí
  ],
  declarations: [QRcodePage],
})
export class QRcodePageModule {}
