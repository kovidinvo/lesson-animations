export class Painter {
    drawVectors=false;
    constructor(private ctx:CanvasRenderingContext2D)  {}

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
}
