import { animate } from '@angular/animations';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Painter } from '../painter';

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

  private painter!: Painter;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.painter=new Painter(this.ctx);
    this.drawCanvas()
    //this.animate()
  }



  drawCanvas() {
      this.ctx.clearRect(0,0,this.width,this.height)
      this.ctx.save()
      const radA=this.angle/180*Math.PI
      const x = this.cx + this.len*Math.cos(radA) 
      const y = this.cy - this.len*Math.sin(radA)
      const p = this.painter;
      p.drawVectors=this.drawVectors
      p.drawLine(this.cx,this.cy,x,y,`rgb(0,0,0)`,Math.PI/2-radA)
      p.drawLine(this.cx,this.cy,x,this.cy,`rgb(255,0,0)`,Math.cos(radA)>0 ? Math.PI/2 : 3*Math.PI/2)
      if(p.drawVectors) 
        p.drawLine(this.cx,this.cy,this.cx,y,`rgb(0,0,255)`,Math.sin(radA)>0 ? 0 : Math.PI)
      else 
        p.drawLine(x,this.cy,x,y,`rgb(0,0,255)`,0)
      
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
