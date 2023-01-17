import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadingComponent } from './../components/file-uploading/file-uploading.component';
import { SafePipe } from './../pipes/safe.pipe';

@NgModule({
  declarations: [AppComponent, FileUploadingComponent, SafePipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
