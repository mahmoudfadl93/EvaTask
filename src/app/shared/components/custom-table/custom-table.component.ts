import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {
  @Input() items!: any[];

  @Input() cols!: any[];

  @Input() isHaveDetails: boolean = false;

  @Input() isHavePaginator: boolean = false;


  @Input("ActionContainer")
  public ActionContainerRef!: TemplateRef<any>;


  @Output() onEditRow: EventEmitter<any> = new EventEmitter();

  @Output() onDeleteRow: EventEmitter<any> = new EventEmitter();

  @Output() onClickRow: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  editRow( row: any) {
    this.onEditRow.emit(row )
  }

  deleteRow( row: any){
    this.onDeleteRow.emit( row )
  }

  details( row: any){
    this.onClickRow.emit( row )
  }
}
