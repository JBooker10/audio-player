import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AudioDataService {
  ctx;
  buffer;
  source;
  analyser;
  duration: number;
  position: number;
  startTime: number;
  playing: boolean;
  loaded: boolean;


  constructor(private http: HttpClient) { 
    this.ctx = new AudioContext;
  }

  getAudio = (url: string ) => {
    this.http.get(`http://localhost:3400/tracks/stream/${url}`, {
      responseType: 'arraybuffer'})
      .subscribe(data => this.getBinaryData(data));
  }

  getBinaryData = (buffer) => {
      this.ctx.decodeAudioData(buffer, (audio) => {
      this.buffer = audio;
      this.connection();
      this.loaded = true;
    });
  }

  connection = () => {
    if (this.playing) {
      this.pauseAudio();
    }
    this.source = this.ctx.createBufferSource();
    this.analyser = this.ctx.createAnalyser();
    this.source.buffer = this.buffer;
    this.source.connect(this.ctx.destination);
  }

  playAudio = (start?: any, position?: number) => {
    this.position = typeof position === 'number' ?
    position : this.position || 0;
    this.startTime = this.ctx.currentTime - this.position || 0;
    start();
    this.playing = true;
  }

  pauseAudio() {
    if (this.source) {
      this.source.stop(0);
      this.source = null;
      this.position = this.ctx.currentTime - this.startTime;
      this.playing = false;
    }
  }

  toggle(playing) {
    if (!playing) {
      this.playAudio();
    } else {
      this.pauseAudio();
    }
 
  }

  getCurrentPosition(): number {
    this.position = this.playing ?
    this.ctx.currentTime - this.startTime : this.position;
    if ( this.position >= this.buffer.duration ) {
      this.position = this.buffer.duration;
      this.pauseAudio();
    }
    return this.position;
  }
  

  replayAudio = () => {
    if (this.source) {
        this.position = 0;
    }
}

  hasEnded = (isPlaying) => {
    const streamTime = this.ctx.currentTime - this.startTime;
    const duration = this.buffer.duration;
    if (streamTime === duration) {
      isPlaying = false;
      this.replayAudio();
    }
  }

  getAudioDuration = (start, stop) => {
    const streamTime = this.ctx.currentTime - this.startTime;
    const minutes = Math.floor(this.buffer.duration / 60);
    const seconds = Math.floor(this.buffer.duration - minutes * 60);
    const currentMin = Math.floor(streamTime / 60);
    const currentSec = Math.floor(streamTime - currentMin * 60);
    if (this.playing) {
    currentSec < 10 ? start.nativeElement.innerHTML = 
    currentMin + ':' + '0' + currentSec :
    start.nativeElement.innerHTML = currentMin + ':' + currentSec; 
    stop.nativeElement.innerHTML = minutes + ':' + seconds;
    }
  }

    getDuration(): number {
      return this.buffer.duration;
    }

  
   



  }
