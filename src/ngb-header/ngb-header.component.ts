import {
    Compiler, Component, ElementRef, OnInit, NgModule, Input, ViewContainerRef, ViewChild, Renderer,
    EventEmitter, Output
} from '@angular/core';
import {CurrencyPipe,DatePipe,DecimalPipe,JsonPipe} from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
    template:'<div #headerCont></div>',
    selector: 'ngb-header',
    styleUrls: ['ngb-header.component.css']
})
export class NgbHeaderComponent implements OnInit {
    @ViewChild('headerCont', { read: ViewContainerRef }) container: ViewContainerRef;
    @Input() sortable:boolean;
    @Input() headerObj;
    @Input() sortField;
    @Input() sortOrder;
    @Output() onSort:EventEmitter<any> = new EventEmitter();
    constructor(private compiler: Compiler, private elemRef: ElementRef,private renderer:Renderer) { }


    ngOnInit() {
        this.addComponent(this.headerObj.headerTemp,this.sortable);
    }

    _onSort($event){
        this.onSort.emit($event);
    }


    private addComponent(template: string,sortable:boolean) {
        var _this=this;
        var _class="";

        if (!template) {
            if (this.headerObj.sortable) {
                template = `<div (click)="_onSort(headerObj.field)">{{headerObj.label}} <span [ngClass]="{'dropup':sortField == headerObj.field && sortOrder == 1}">
                <span class="caret" [ngClass]="{'disable-caret':sortField != headerObj.field}"></span>
                </span>
                </div>`

            } else {
                template = `<div class="${_class}">{{headerObj.label}}</div>`;
            }
        }

        @Component({template: template})
        class TemplateComponent implements OnInit{


            private headerObj=_this.headerObj;
            private sortField=_this.sortField;
            private sortOrder=_this.sortOrder;
            private col=_this.headerObj.scope;
            _onSort($event){
                _this._onSort($event);
            }

            ngOnInit() {

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


}