import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';


@Component({
  selector: 'ngb-pagination',
  templateUrl: 'ngb-pagination.component.html',
  styleUrls: ['ngb-pagination.component.css']
})
export class NgbPaginationComponent implements OnInit , OnChanges {
  @Input() totalPage;
  @Input() maxPage;
  @Input() limit;
  @Output() updateFilter:EventEmitter<any> = new EventEmitter();
  @Input() page;
  private paginationRange;
  private startRange=1;
  constructor() {


  }
  ngOnChanges(){
    this.page=1;
    if (!this.maxPage || typeof this.maxPage == 'undefined') this.maxPage=5;
    this.calculatePaginationChunk();
  }
  ngOnInit() {
    if (!this.limit) this.limit=20;
    if (!this.page) this.page=1;
    if (!this.maxPage || typeof this.maxPage == 'undefined') this.maxPage=5;
    if (!this.totalPage) this.totalPage=1;
    this.calculatePaginationChunk();
  }

  calculatePaginationChunk(){
    if (this.totalPage <= this.maxPage) {
      this.paginationRange=this.totalPage;
    } else {
      var dv=this.page % this.maxPage;
      var fixingNum=0;
      if (dv == 0) fixingNum=1;
      var currentChunk=Math.floor(this.page/this.maxPage) - fixingNum;

      this.startRange=(currentChunk*this.maxPage);
      if (this.startRange == 0) {
         this.startRange=this.startRange + 1;
        this.paginationRange=this.startRange + this.maxPage;
      } else {
        this.paginationRange = this.startRange + this.maxPage + 1 ;
      }
      if (this.paginationRange > this.totalPage) this.paginationRange=this.totalPage;

    }
  }
  callParent(){
    var _this=this;
    this.updateFilter.emit({page:_this.page,limit:_this.limit});
  }
  createRange(start,number){
    var items: number[] = [];
    for(var i = start; i <= number; i++){
      items.push(i);
    }
    return items;
  }

  changePage(page){
    this.page=page;
    this.calculatePaginationChunk();

    this.callParent();
  }

  nextPage(){
    var tmpPage=this.page+ 1;
    if (tmpPage > this.totalPage) {
      tmpPage=1;
    }
    this.changePage(tmpPage);
  }

  prevPage(){
    var tmpPage=this.page - 1;
    if (tmpPage < 1) {
      tmpPage=this.totalPage;
    }
    this.changePage(tmpPage);
  }
}
