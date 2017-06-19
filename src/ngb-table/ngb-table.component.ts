import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'ngb-table',
  templateUrl: 'ngb-table.component.html',
  styleUrls: ['ngb-table.component.css']
})
export class NgbTableComponent implements OnInit,OnChanges {
  @Input() tableColumns:Array<any>;
  @Input() tableData:Array<any>;
  @Input() totalItem;
  @Input() limit;
  @Input() loading:boolean;
  @Output() updateFilter:EventEmitter<any> = new EventEmitter();
  @Output() onSort:EventEmitter<any> = new EventEmitter();
  @Output() rowClick:EventEmitter<any> = new EventEmitter();
  @Input() paginationClass;
  private _totalPage;
  private sortOrder=1;
  private sortField;
  constructor() {


  }

  ngOnChanges(){
    this.calculatePageNo();
  }

  refreshFilter($event){
    this.updateFilter.emit($event);
  }


  _onSort($event){
    if (this.sortField=$event) {
      this.sortOrder=this.sortOrder * -1;
    } else {
      this.sortOrder=1;
    }
    this.sortField=$event;
    this.onSort.emit({field:this.sortField,order:this.sortOrder});
  }


  onRowClick($event){
    this.rowClick.emit($event);
  }

  ngOnInit() {
    if (!this.limit) this.limit=20;
    if (!this.loading) this.loading=false;
    if (!this.paginationClass) this.paginationClass={mainClass:'pagination'};
    this.calculatePageNo();
  }

  calculatePageNo(){
    var fixingNum=this.totalItem%this.limit;
    if (fixingNum > 0) fixingNum = 1;
    this._totalPage=Math.floor(this.totalItem/this.limit)+fixingNum;

  }

  handleClick(cellEvent) {
    console.log(cellEvent);
  }

  getColVal(col,key){

    return key.split('.').reduce(function(o,i){
      return (o[i] || o[i] === 0) ? o[i] : ''
    }, col)


  }

}
