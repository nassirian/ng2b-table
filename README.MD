# ng2b-table

## Installation

To install this library, run:

```bash
$ npm install ng2b-table --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng2b-table
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgbTableModule } from 'ng2b-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

private tableColumns=[
    {name:'name', label:'Name', sortable:true, field:'name',onClick:'method on class',scope:this},
]
}
```

You have access to what you pass on table columns row on the template on cell object
 on columns definition field key is required if you want to create a custom cell without any field send empty string as value for field
(ex:cell.scope is point to parent class)

Once your library is imported, you can use its components, directives and pipes in your Angular application:

#Custom Cell Template
pass cellTemplate key to table columns object 

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<ngb-table
                    [tableColumns]="tabelColumns"
                    [tableData]="data"
                    [totalItem]="count"
                    [limit]="20"
                    (onSort)="sortBy($event)"
                    (updateFilter)="check($event)"
></ngb-table>
```

##OnClick event
 on binding onClick you have access to 3 different variable (row,cell,value)  
 
 row = complete row object
 cell = cell object on column definition
 value = value of the cell
 
You can pass OnClick event on your column definition  , and if you don't pass the the cell your cell will be 
envoke the function you pass
 access dataset : you have access to row data on row object (if on your dataset you have id=1,you can get that value with row.id)
 access cellObject : on custom template you can access to cell object through cell object 
  ex :
  
  /**
  dataSet=[{id:1,name:'john',lastname:'doe'}]
  **/
 export class AppModule { 
 
 private tableColumns=[
     {name:'name', label:'Name', sortable:true, field:'name',onClick:this.doSomeThings,scope:this},
     {name:'lastname', label:'Last Name', sortable:true, field:'lastname',cellTemplate:this._cellTemplate()},
 ]
     
    doSomethings(row,cell,value){
        console.log(row.id) //  1
        
        }
        
    doSomethingElse(name){
            console.log(name)//  john
    }
        
    _cellTemplate(){
         return '<div (click)='cell.scope.doSomethingElse(row.name)'></div>'
        }
 }
## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```






## License

MIT © [Iman Nassirian](mailto:e_nassiria@yahoo.com)
# ng2b-table
