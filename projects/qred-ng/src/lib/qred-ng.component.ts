import { Component, OnInit,AfterViewInit ,OnChanges} from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'qred-ng',
  templateUrl: './qred-ng.component.html',
  styleUrls: ['./qred-ng.component.css']
})
export class QredNg implements OnInit,AfterViewInit,OnChanges {

  cssClass:String = "target-color-red"

  @ViewChild('canvasDisplay', {read: ElementRef})
  canvasDisplayElementRef:ElementRef;

  @ViewChild('videoPlayer', {read: ElementRef})
  videoplayerElementRef: ElementRef;

  videoplayer: HTMLVideoElement;

  @Input()
  width:String

  @Input()
  height:String

 constructor() {}

  ngOnInit() {
    console.log("init")
  }
  ngOnChanges(){
  }

  initCanvasDisplayAndCapture(video:HTMLVideoElement,canvasElementRef:ElementRef){
    const canvas = canvasElementRef.nativeElement;
    const canvasContext = canvas.getContext("2d")
    setInterval(() => canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height), 500);
  }

  initVideoPlayer(stream:MediaStream,videoplayerElementRef:ElementRef):HTMLVideoElement{
    let videoplayer:HTMLVideoElement = this.videoplayerElementRef.nativeElement;

    if ('srcObject' in videoplayer) {
        videoplayer.defaultMuted=true;
        videoplayer.msHorizontalMirror=false;
        videoplayer.srcObject = stream;
        videoplayer.src = (window.URL || (window as any ).webkitURL).createObjectURL(stream);
    }
    else if((navigator as any ).mozGetUserMedia){
        (videoplayer as any ).mozSrcObject = stream;
      }
       videoplayer.play();
       this.videoplayer = videoplayer;
       return videoplayer;
  }

  ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            return this.initVideoPlayer(stream,this.videoplayerElementRef);
        }).then(videoPlayer=>{
              this.initCanvasDisplayAndCapture(videoPlayer,this.canvasDisplayElementRef);
          });
    }
  }
}
