import { animate } from '@angular/animations';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vectorforce',
  templateUrl: './vectorforce.component.html',
  styleUrls: ['./vectorforce.component.scss']
})
export class VectorforceComponent implements OnInit {
  @ViewChild("canvas",{static:true})
  canvas! : ElementRef<HTMLCanvasElement>;
  ctx! : CanvasRenderingContext2D;
  
  width=600
  height=600
  speed = 100;
  handleTimeout=0;
  angle=60
  len=200    
  drawVectors=false
  cx = this.width/2
  cy = this.height/2

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.drawCanvas()
    //this.animate()
  }

  drawLine(x0:number,y0:number,x1:number,y1:number,style:string,angle:number) {
    this.ctx.strokeStyle = style
    this.ctx.beginPath()
    this.ctx.moveTo(x0,y0)
    this.ctx.lineTo(x1,y1)
    this.ctx.stroke();
    if(this.drawVectors) {
      this.ctx.save()
      this.ctx.strokeStyle = style
      this.ctx.beginPath()
      this.ctx.translate(x1,y1)
      this.ctx.rotate(angle)
      this.ctx.moveTo(0,0)
      this.ctx.lineTo(-2,6)
      this.ctx.moveTo(0,0)
      this.ctx.lineTo(2,6)
      this.ctx.stroke()
      this.ctx.restore()
    }
  }

  drawCanvas() {
      this.ctx.clearRect(0,0,this.width,this.height)
      this.ctx.save()
      var radA=this.angle/180*Math.PI
      var x = this.cx + this.len*Math.cos(radA) 
      var y = this.cy - this.len*Math.sin(radA)
      this.drawLine(this.cx,this.cy,x,y,`rgb(0,0,0)`,Math.PI/2-radA)
      this.drawLine(this.cx,this.cy,x,this.cy,`rgb(255,0,0)`,Math.cos(radA)>0 ? Math.PI/2 : 3*Math.PI/2)
      if(this.drawVectors) 
        this.drawLine(this.cx,this.cy,this.cx,y,`rgb(0,0,255)`,Math.sin(radA)>0 ? 0 : Math.PI)
      else 
        this.drawLine(x,this.cy,x,y,`rgb(0,0,255)`,0)
      
      this.ctx.restore()

  }

  animate() {
    this.drawCanvas()
    this.angle= (this.angle + 10)%360
    this.handleTimeout=window.setTimeout(()=> {this.animate()},this.speed)
  }

  stopAnimation() {
    window.clearTimeout(this.handleTimeout);
  }

  reset() {
    
  }

}
