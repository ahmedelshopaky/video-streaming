import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseApiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  download(): Observable<any> {
    return this.http.get(this.baseApiUrl + 'download-video', {
      responseType: 'blob',
      headers: {
        range: '500000',
      },
    });
  }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('sampleFile', file, file.name);
    return this.http.post(this.baseApiUrl + 'upload-video', formData);
  }
}
