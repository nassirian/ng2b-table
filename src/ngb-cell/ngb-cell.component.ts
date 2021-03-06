import {Compiler, Component, ElementRef ,OnInit, NgModule, Input, ViewContainerRef, ViewChild, Renderer} from '@angular/core';
import {CurrencyPipe,DatePipe,DecimalPipe,JsonPipe} from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
    class TemplateComponent implements OnInit{


      private cell=_this.cell;
      private row=_this.row;
      private clickable=(_this.cell.onClick) ? true : false;
      private getColVal=_this.getColVal;
      private value=_this.getColVal(this.row,this.cell.field);
      private pipe=_this.cell.pipe || null;

      ngOnInit() {
        if (this.pipe) {
          this.value=this.handlePipe(this.pipe,this.value);
        }
      }

      handlePipe(pipeString,value){
        if (value === null || (!value && value !=0)) value='';
        var acceptablePipes=['currency','date','json','decimal','percentage'];
        var pipeArgs=pipeString.split(':');
        var pipeSplit=pipeArgs.splice(0,2);
        var pipeName=pipeSplit[0];
        var pipestr=pipeSplit[1];
        if (acceptablePipes.indexOf(pipeName) >= 0) {
          if (value == '' && pipeName !='date') value = 0;

          pipeArgs.unshift(value);
          var pipeObj;
          switch (pipeName) {
            case 'currency':
              pipeObj=new CurrencyPipe(pipestr);
              break;
            case 'date':
              pipeObj=new DatePipe(pipestr);
              break;
            case 'json':
              pipeObj=new JsonPipe();
              break;
            case 'decimal':
              pipeObj=new DecimalPipe(pipestr);
              break;
            case 'percentage':
              var _value=parseFloat(value);
              if (isNaN(_value)) _value=0;
              if (typeof _value != 'number' || !_value) {
                if (value == 'NaN') value= '0%';
                return value;
              }
              return _value.toFixed(pipestr || 2)+'%';
          }
          if ((value == 'NaN' || isNaN(value)) && pipeName !='date') value = 0;
          return pipeObj.transform.apply(this,pipeArgs)
        } else {
          return value;
        }
      }
    }

    @NgModule({declarations: [TemplateComponent], imports: [
      CommonModule,FormsModule
    ],})
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
