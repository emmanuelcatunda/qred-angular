import {AfterViewInit,Component,ElementRef,EventEmitter,Input,OnInit,OnChanges,Output,ViewChild} from '@angular/core';
import jsQR from 'jsqr';

@Component({
  selector: 'qred-ng',
  templateUrl: './qred-ng.component.html',
  styleUrls: ['./qred-ng.component.css']
})
export class QredNg implements OnInit,AfterViewInit,OnChanges {



  cssClass:String = "target-color-default"

  @ViewChild('canvasDisplay', {read: ElementRef})
  canvasDisplayElementRef:ElementRef;

  @ViewChild('videoPlayer', {read: ElementRef})
  videoplayerElementRef: ElementRef;

  videoplayer: HTMLVideoElement;

  @Input()
  QRcodeHighlightColor = "green"

  @Input()
  width:String

  @Input()
  height:String

  @Output() qrCodeScanned = new EventEmitter<String>();

  qrCodeData:String;

  constructor() {}
  ngOnInit() {}
  ngOnChanges(){}

private captureImageData(canvas){
    const canvasContext = canvas.getContext("2d",{ alpha: false })
    return canvasContext.getImageData( 0, 0, canvas.width, canvas.height)
  }

private decodeQrCodeImage(imageData){
      return jsQR(imageData.data, imageData.width, imageData.height);
  }

private detectQrCode(QRcodeHighlightColor,qrCode,canvasContext){
    if (qrCode) {
        canvasContext.beginPath();
        canvasContext.moveTo(qrCode.location.topLeftCorner.x,qrCode.location.topLeftCorner.y);
        canvasContext.lineTo(qrCode.location.bottomLeftCorner.x, qrCode.location.bottomLeftCorner.y);
        canvasContext.lineTo(qrCode.location.bottomRightCorner.x, qrCode.location.bottomRightCorner.y);
        canvasContext.lineTo(qrCode.location.topRightCorner.x, qrCode.location.topRightCorner.y);
        canvasContext.lineTo(qrCode.location.topLeftCorner.x,qrCode.location.topLeftCorner.y);
        canvasContext.closePath();
        canvasContext.lineWidth = 4;
        canvasContext.strokeStyle = QRcodeHighlightColor;
        canvasContext.stroke();
    }
  }

private scanQrcode(canvas,video){
    const canvasContext = canvas.getContext("2d",{ alpha: false })
    canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height)
    let imageData = this.captureImageData(canvas)
    let qrCode = this.decodeQrCodeImage(imageData)
    this.detectQrCode(this.QRcodeHighlightColor,qrCode,canvasContext)
    if(qrCode)
    this.qrCodeScanned.emit(qrCode.data)
    //requestAnimationFrame(this.scanQrcode as any)
    //this.qrCodeData = qrCode.data;
  }

  initCanvasDisplayAndStartCapture(video:HTMLVideoElement,canvasElementRef:ElementRef){
    let canvas = canvasElementRef.nativeElement;
    let canvasContext = canvas.getContext("2d",{ alpha: false })
    //this.scanQrcode(canvas,video)
      setInterval(() => {
       this.scanQrcode(canvas,video)
     },100);

  }

  initVideoPlayer(stream:MediaStream,videoplayerElementRef:ElementRef):HTMLVideoElement{
    let videoplayer:HTMLVideoElement = this.videoplayerElementRef.nativeElement;

    if ('srcObject' in videoplayer) {
        videoplayer.defaultMuted=true;
        videoplayer.msHorizontalMirror=false;
        videoplayer.setAttribute("playsinline", "true");
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
              this.initCanvasDisplayAndStartCapture(videoPlayer,this.canvasDisplayElementRef);
          });
    }
  }
}
