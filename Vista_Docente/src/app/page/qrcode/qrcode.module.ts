import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRcodePageRoutingModule } from './qrcode-routing.module';

import { QRcodePage } from './qrcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRcodePageRoutingModule
  ],
  declarations: [QRcodePage]
})
export class QRcodePageModule {}
