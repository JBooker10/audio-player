import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, AsyncSubject, from, pipe } from 'rxjs';
import { share, map, pluck, retry } from 'rxjs/operators';


@Injectable()
export class DataService {

    ctx = new AudioContext();
    buffer: AudioBuffer;
    source: AudioBufferSourceNode;
    analyser: AnalyserNode;
    oscillator: OscillatorNode;
    gainNode: GainNode;
    loaded: boolean = false;
    playing: boolean = false;
    position: number;
    startTime: number;

    constructor(private http: HttpClient) {
     }


    getAudio = (url: string) => {
        return this.http.get(`http://localhost:3400/tracks/stream/${url}`, {
          responseType: 'arraybuffer'})
        .pipe(map(data => this.getBinaryData(data)));
    }


    getBinaryData = (buffer) => {
        this.ctx.decodeAudioData(buffer, (audio) => {
          this.buffer = audio;
          this.loaded = true;
          this.playAudio();
        });
      }

    
  connection = () => {
    if (this.playing) {
      this.pauseAudio();
    }
    this.source = this.ctx.createBufferSource();
    this.analyser = this.ctx.createAnalyser();
    this.gainNode = this.ctx.createGain();
    this.oscillator = this.ctx.createOscillator();
    this.source.buffer = this.buffer;
    this.source.connect(this.ctx.destination);
  }

  playAudio = (position?: number) => {
    this.connection();
    this.position = typeof position === 'number' ?
    position : this.position || 0;
    this.startTime = this.ctx.currentTime - this.position || 0;
    this.source.start(this.ctx.currentTime, this.position);
    this.playing = true;
  }

  toggle(playing) {
    if (!playing) {
      this.playAudio();
      
    } else {
      this.pauseAudio();
    }
   
  }


  pauseAudio() {
    if (this.source) {
      this.source.stop(0);
      this.source = null;
      this.position = this.ctx.currentTime - this.startTime;
      this.playing = false;
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

    getDuration(): Observable<number> {
     return Observable.create((observer) => {
      const obs = setInterval(() => {
        if (typeof this.buffer.duration !== 'undefined') {
            clearInterval(obs);
            observer.next(this.buffer.duration);
            }     
        }, 500);
     });
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

}


