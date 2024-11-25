import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { QrService } from 'src/app/services/qr.service'; // Asegúrate de que el servicio esté importado
import { Qr } from 'src/interfaces/IQr'; // Asegúrate de importar la interfaz Qr



@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QRcodePage implements OnInit, OnDestroy {
  scannedResult: string | null = null;
  isScanning: boolean = false;

  constructor(
    private alertController: AlertController,
    private platform: Platform,
    private qrService: QrService // Inyecta el servicio QrService
  ) {}

  ngOnInit() {
    this.platform.pause.subscribe(() => {
      if (this.isScanning) {
        this.stopScan();
      }
    });
  }

  ngOnDestroy() {
    this.stopScan();
  }

  async checkPermissions() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      const alert = await this.alertController.create({
        header: 'Permiso de Cámara',
        message: 'Necesitamos acceso a la cámara para escanear códigos QR',
        buttons: ['OK']
      });
      await alert.present();
      return false;
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      return false;
    }
  }

  async startScan() {
    if (!await this.checkPermissions()) return;
    
    try {
      this.isScanning = true;
      
      // Configurar la vista previa de la cámara
      const cameraPreviewOpts: CameraPreviewOptions = {
        position: 'rear',
        parent: 'camera-preview',
        className: 'camera-preview',
        toBack: false,
        width: window.innerWidth,
        height: window.innerHeight,
        enableHighResolution: true
      };
      
      await CameraPreview.start(cameraPreviewOpts);
      
      // Iniciar el escaneo
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        await this.showScannedData(result.content);
        await this.updateQrData(result.content); // Llamada para actualizar los datos del QR
        this.stopScan();
      }
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);
      this.stopScan();
    }
  }

  async stopScan() {
    try {
      await CameraPreview.stop();
      await BarcodeScanner.stopScan();
      this.isScanning = false;
    } catch (error) {
      console.error('Error al detener el escaneo:', error);
    }
  }

  async showScannedData(content: string) {
    const alert = await this.alertController.create({
      header: 'Código QR Escaneado',
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para actualizar los datos del QR escaneado
  async updateQrData(scannedContent: string) {
    // Aquí asumimos que el contenido escaneado es un objeto JSON que contiene los datos del QR.
    try {
      const qrData = JSON.parse(scannedContent); // Convertir el contenido escaneado a un objeto JSON
      if (!qrData) {
        throw new Error('El contenido del QR no es válido.');
      }

      const qrToUpdate: Qr = {
        id: qrData.id, // Usamos el id del QR escaneado
        clase: qrData.clase, // Clase obtenida del QR
        seccion: qrData.seccion, // Sección obtenida del QR
        profesor: `${sessionStorage.getItem('username')}`, // Se asigna el profesor desde la sesión
        alumno: qrData.alumno, // Alumno obtenido del QR
        fecha_generacion: new Date().toISOString(), // Fecha de generación (actual)
        hora_generacion: qrData.hora_generacion, // Hora de generación (opcional)
        hora_validacion: new Date().toLocaleTimeString(), // Hora de validación (actual)
        estado: true // Estado actualizado
      };

      // Llamada al servicio para actualizar el QR en la base de datos
      await this.qrService.PutQr(qrToUpdate).toPromise();
      console.log('QR actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el QR:', error);
    }
  }
}
