import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-modificar-imagen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modificar-imagen.component.html',
  styleUrl: './modificar-imagen.component.css'
})
export class ModificarImagenComponent {
  @ViewChild('imageElement', { static: false }) imageElement: ElementRef<HTMLImageElement> | undefined;
  imageSrc: string | ArrayBuffer | null = null;
  cropper: Cropper | undefined;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit() {
    // Inicialización adicional si es necesario
  }

  ngAfterViewInit() {
    if (this.imageElement && this.imageElement.nativeElement) {
      this.cropper = new Cropper(this.imageElement.nativeElement, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
      });
    }
  }

  cropImage() {
    if (this.cropper) {
      const canvas = this.cropper.getCroppedCanvas();
      this.imageSrc = canvas.toDataURL('image/png');
    }
  }
}
