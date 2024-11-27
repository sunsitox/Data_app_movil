import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QRcodePage } from './qrcode.page';

const routes: Routes = [
  {
    path: '',
    component: QRcodePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRcodePageRoutingModule {}
