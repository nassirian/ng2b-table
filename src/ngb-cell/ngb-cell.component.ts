import {Compiler, Component, ElementRef ,OnInit, NgModule, Input, ViewContainerRef, ViewChild, Renderer} from '@angular/core';
@Component({
  template:'<div #container></div>',
  selector: 'ngb-cell',
  styleUrls: ['ngb-cell.component.css']
})
export class NgbCellComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @Input() cellTemplate:string;
  @Input() cell:any;
  @Input() row:any;
  constructor(private compiler: Compiler, private elemRef: ElementRef,private renderer:Renderer) { }


    ngOnInit() {

      this.addComponent(this.cellTemplate);
      var _this=this;
      if (this.cell.onClick) {
        this.renderer.listen(this.elemRef.nativeElement,'click',function(evt){
          _this.cell.onClick(_this.row,_this.cell,_this.getColVal(_this.row,_this.cell.field));
        })
      }
    }

  private addComponent(template: string) {
    var _this=this;
    var _class="";
    if (_this.cell.onClick) {
      _class+=' pointer-cursor'
    }
      if (!template) template = `<div class="${_class}">{{value}}</div>`;
      @Component({template: template})
      class TemplateComponent{


        private cell=_this.cell;
        private row=_this.row;
        private clickable=(_this.cell.onClick) ? true : false;
        private getColVal=_this.getColVal;
        private value=_this.getColVal(this.row,this.cell.field);
      }

      @NgModule({declarations: [TemplateComponent]})
      class TemplateModule {

      }

      const mod = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
      const factory = mod.componentFactories.find((comp) =>
          comp.componentType === TemplateComponent
      );
      const component = this.container.createComponent(factory);
    }


  getColVal(col,key){

    return key.split('.').reduce(function(o,i){
      return o[i] ? o[i] : ''
    }, col)


  }


}
