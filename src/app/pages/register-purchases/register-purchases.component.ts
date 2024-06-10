import { Component,inject } from '@angular/core';
import {PurchaseService} from '../../services/purchase.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register-purchases',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StyleClassModule,
    CommonModule,
    ImageModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    ScrollPanelModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register-purchases.component.html',
  styleUrl: './register-purchases.component.scss',
})
export default class RegisterPurchasesComponent {
  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder
  ) {}
  private pruchaseService = inject(PurchaseService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  userPhotos: {
    filepath: string;
    webviewPath?: string;
    data: any;
  }[] = [];
  imagenCapturada: SafeUrl | undefined;
  base64:any;

  get Name() {
    return this.purchasesForm.get('Name') as FormControl;
  }
  get Date() {
    return this.purchasesForm.get('Date') as FormControl;
  }
  get Amount() {
    return this.purchasesForm.get('Amount') as FormControl;
  }
  // get Photo() {
  //   return this.purchasesForm.get('Photo') as FormControl;
  // }

  public purchasesForm = this.formBuilder.group({
    Name: ['', [Validators.required]],
    Date: ['', [Validators.required]],
    Amount: ['', [Validators.required]],
    //Photo: ['', [Validators.required]],
  });

  public errorMessages: any = {
    Name: [{ type: 'required', message: 'Por favor de llenar el campo' }],
    Amount: [{ type: 'required', message: 'Por favor de llenar el campo' }],
    Date: [{ type: 'required', message: 'Por favor de llenar el campo' }],
  };

  async takePhone() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 50,
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.userPhotos.unshift(savedImageFile);

    const secureUrl = this.sanitizer.bypassSecurityTrustUrl(
      this.userPhotos[0].webviewPath + ''
    );


    this.base64 = this.userPhotos[0].data;

    this.imagenCapturada = secureUrl;
  }

  private async savePicture(cameraPhoto: Photo) {
    const base64Data = await this.readAsBase64(cameraPhoto);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
    this.base64 

    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
      data: base64Data,
    };
  }

  private async readAsBase64(cameraPhoto: Photo) {
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    return (await this.convertBlobToBase64(blob)) as string;
  }

  private async convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  public getLastImageBase64(): string | undefined {
    if (this.userPhotos.length > 0) {
      return this.userPhotos[0].webviewPath;
    } else {
      return undefined;
    }
  }

  public async registerPurchase() {
    let dataNew:any = {
      concept: this.purchasesForm.value.Name,
      amount: this.purchasesForm.value.Amount,
      UUID:"",
      //...this.purchasesForm.value,
      //typeBusiness: jsonObject.t,
      img:this.base64
    };
    console.log(dataNew)
    dataNew.Date;
    try{
      return this.pruchaseService.register(dataNew).subscribe({
        next:(data)=>{
          if(data.success){
            this.show();
            return this.router.navigate(['/shopping-list']);
          }
          return  "";
        }
      })
    }catch(e){
      console.log(e)
    }
   
    return null
  }


  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ingreso correctamnete' });
  }
}
