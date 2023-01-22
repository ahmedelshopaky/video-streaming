import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseApiUrl = 'http://localhost:8000/srv';

  constructor(private http: HttpClient) {}

  download(start: number, end: number, name: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/download-video?name=${name}`, {
      responseType: 'blob',
      headers: {
        range: `bytes=${start}-${end}`,
      },
    });
  }

  upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('sampleFile', file, file.name);
    return this.http.post(`${this.baseApiUrl}/upload-video`, formData);
  }
}
