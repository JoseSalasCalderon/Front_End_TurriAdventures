import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesServiceService {

  private url: string = ""

  constructor(private http:HttpClient) 
  {
    this.url = "https://api.cloudinary.com/v1_1/dqpootcvr/image/upload";
  }

  subirImagen(imagen: any):Observable<any> {
    const data = new FormData();
    data.append('file', imagen);
    data.append('upload_preset', 'ml_default');
    
    return this.http.post(this.url, data);
  }
}
