import { Component, Inject, inject } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';

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
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { tap } from 'rxjs';

interface TypesPayments_ {
  name: string;
}

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
    ToastModule,
    DropdownModule,
    InputNumberModule,
    MatButtonModule
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
  private messageService = inject(MessageService);

  dialog = inject(MatDialog);


  userPhotos: {
    filepath: string;
    webviewPath?: string;
    data: any;
  }[] = [];
  imagenCapturada: SafeUrl | undefined;
  base64: any;

  typesPayments:TypesPayments_[] = [
    { name: 'Tarjeta' },
    { name: 'Efectivo' },
  ];
  placePurchase = [
    { name: 'Super' },
    { name: 'Farmacia' },
    { name: 'Retiro' },
    { name: 'Restaurante' },
  ];

  get concept() {
    return this.purchasesForm.get('concept') as FormControl;
  }
  get date() {
    return this.purchasesForm.get('date') as FormControl;
  }
  get amount() {
    return this.purchasesForm.get('amount') as FormControl;
  }
  get typePayment() {
    return this.purchasesForm.get('typePayment') as FormControl;
  }
  get placePurcase() {
    return this.purchasesForm.get('placePurcase') as FormControl;
  }



  public purchasesForm = this.formBuilder.group({
    concept: ['', [Validators.required]],
    date: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    typePayment: ['', [Validators.required,Validators.nullValidator]],
    placePurcase: ['', [Validators.required]],
  });

  public errorMessages: any = {
    concept: [{ type: 'required', message: 'Por favor de llenar el campo' }],
    amount: [{ type: 'required', message: 'Por favor de llenar el campo' }],
    date: [{ type: 'required', message: 'Por favor de llenar el campo' }],
    typePayment: [
      { type: 'required', message: 'Por favor de llenar el campo' },
    ],
    placePurcase: [
      { type: 'required', message: 'Por favor de llenar el campo' },
    ],
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
    this.base64;

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

  registerPurchase():void {
    const typePayment:any = this.purchasesForm.value.typePayment;
    const placePurchase:any = this.purchasesForm.value.placePurcase;
    const date:any = this.purchasesForm.value.date;
    let structure = {
      uuid:'',
      concept:this.purchasesForm.value.concept,
      amount:this.purchasesForm.value.amount,
      date:new Date(date).toISOString().split('T')[0],
      typePayment:typePayment.name,
      placePurchase:placePurchase.name,
      img:this.base64 ? this.base64 : '',
    }
    //console.log()
    if (!this.base64) {
      this.openDialog('0ms', '0ms', structure);
    }else{
      this.uploadData(structure);
    }
  }

  uploadData(data:any):void {
    try {
      console.log(data);
         this.pruchaseService.register(data).subscribe({
           next: (data) => {
            console.log(data)
             if (data.success) {
               this.show();
               //return this.router.navigate(['/shopping-list']);
             }
             return '';
           },
        });
      } catch (e) {
        console.log(e);
      }
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Se ingreso correctamnete',
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, data:any): void {
  this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().pipe(tap((result:boolean)=> {
      if(result){
        this.uploadData(data);
      } 
    })).subscribe();
  }
}


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>
    ,@Inject(MAT_DIALOG_DATA) public data:any
  ) {}
  protected clickDialog = (result:boolean) => this.dialogRef.close(result)
}
