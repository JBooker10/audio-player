import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AudioControlsComponent } from './components/audio-controls/audio-controls.component';
import { TrackControllerComponent } from './components/track-controller/track-controller.component';
import { TrackDescriptionComponent } from './components/track-description/track-description.component';
import { TrackUtilsComponent } from './components/track-utils/track-utils.component';
import { TrackComponent } from './components/track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioControlsComponent,
    TrackControllerComponent,
    TrackDescriptionComponent,
    TrackUtilsComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
