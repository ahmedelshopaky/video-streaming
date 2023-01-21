import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-uploading',
  templateUrl: './file-uploading.component.html',
  styleUrls: ['./file-uploading.component.css'],
})
export class FileUploadingComponent {
  url: string = '';
  loading: boolean = false;
  file: File | null = null;

  constructor(private fileUploadService: FileUploadService) {}

  onChange(event: any): void {
    this.file = event.target.files[0];
  }

  onDownload(): void {
    const start = 0;
    const end = 785012; // 1570024 / 2
    this.fileUploadService.download(start, end).subscribe((data: any) => {
      this.url = URL.createObjectURL(data);
      // console.log(this.url);
    });
  }

  onUpload(): void {
    if (this.file) {
      this.loading = !this.loading;
      this.fileUploadService
        .upload(this.file as File)
        .subscribe((event: any) => {
          if (typeof event === 'object') {
            this.loading = false;
          }
        });
    }
  }
}
