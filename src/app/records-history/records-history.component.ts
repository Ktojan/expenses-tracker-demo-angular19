import { Component, inject, Input, NO_ERRORS_SCHEMA, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Record } from '../shared/constants';
import { IRecord, IRecordsStorage } from '../shared/interfaces';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-records-history',
  imports: [MatCardModule, MatFormFieldModule, NgIf, ReactiveFormsModule, MatIconModule, MatButtonModule,
    FormlyMaterialModule, MatTableModule, MatInputModule, MatSortModule, DatePipe, UpperCasePipe
  ],
  templateUrl: './records-history.component.html',
  styleUrls: ['./records-history.component.scss'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LogExpenseComponent implements OnDestroy, OnInit {
  @Input('type') type!: Record;
  @ViewChild(MatTable) table!: MatTable<HTMLElement>;
  @ViewChild(MatSort) sort!: MatSort;

  recordsService = inject(RecordsService);
  recordsSub: BehaviorSubject<IRecordsStorage> = this.recordsService.getRecords();
  tableData!: MatTableDataSource<any> | IRecord[];
  downloadedTableData!: MatTableDataSource<any> | IRecord[];
  displayedColumns: string[] = ['name', 'category', 'date', 'amount'];
  showTable = false;

  ngOnInit() {
    this.recordsSub.subscribe((data:IRecordsStorage)  => {
      this.showTable = true;
      this.downloadedTableData = data[this.type];
      this.tableData = [...this.downloadedTableData];
      // if (this.tableData) this.tableData.sort = this.sort;  //todo sorting
      if (this.table) this.table.renderRows();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.tableData = filterValue ?
     (this.downloadedTableData as IRecord[]).filter(record => JSON.stringify(record).toLowerCase().includes(filterValue))
     : this.downloadedTableData
  }

  ngOnDestroy(): void {
    this.recordsSub.unsubscribe();
  }
}
