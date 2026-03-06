import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, TableModule, PaginatorModule, DropdownModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})

export class DataTableComponent implements OnInit {

  first: number = 0;
  rows: number = 10;
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];
  @Input() actionsTemplate!: TemplateRef<any>;
  @Input() totalPageCount!: number;
  @Output() rowsCountChanged = new EventEmitter();
  @Output() iconClicked = new EventEmitter<any>();
  @Input() actionsLabel: string = 'Actions';
  @Input() prevLabel: string = 'Previous';
  @Input() nextLabel: string = 'Next';

    options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 50, value: 50 },
  ];

  ngOnInit(): void { }

  onPageChange(event: any) {
    event;

    this.first = event.first;
    this.rows = event.rows;
    this.rowsCountChanged.emit(event);
  }

  onPrevPage() {
    if (this.first > 0) {
      this.first = this.first - this.rows;
      this.rowsCountChanged.emit({ first: this.first, rows: this.rows });
    }
  }

  onNextPage() {
    if (this.first + this.rows < this.totalPageCount) {
      this.first = this.first + this.rows;
      this.rowsCountChanged.emit({ first: this.first, rows: this.rows });
    }
  }
}
