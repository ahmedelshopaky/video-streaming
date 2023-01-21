import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadingComponent } from './../components/file-uploading/file-uploading.component';
import { SafePipe } from './../pipes/safe.pipe';

// videogular
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
// import {SingleMediaPlayer} from './single-media-player';

@NgModule({
  declarations: [AppComponent, FileUploadingComponent, SafePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // videogular
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
