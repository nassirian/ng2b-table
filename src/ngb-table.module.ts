import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTableComponent } from './ngb-table/ngb-table.component';
import { NgbCellComponent } from './ngb-cell/ngb-cell.component';
import { NgbHeaderComponent } from './ngb-header/ngb-header.component';
import { NgbPaginationComponent } from './ngb-pagination/ngb-pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[NgbTableComponent],
  declarations: [NgbTableComponent, NgbCellComponent,NgbPaginationComponent,NgbHeaderComponent]
})
export class NgbTableModule { }
