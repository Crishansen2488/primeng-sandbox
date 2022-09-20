import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';

import { PaginadorPersonalizadoComponent } from '../paginador-personalizado/paginador-personalizado.component';
import { TabelaService } from './tabela.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit {
  customers: any[] = [];
  totalRecords!: number;
  datasource: any[] = [];
  first: number = 0;
  rows: number = 5;

  field?: string;
  order?: number;

  @ViewChild('paginator')
  paginadorPersonalizadoComponent!: PaginadorPersonalizadoComponent;
  @ViewChild('table') table!: Table;

  constructor(private tabelaService: TabelaService) {}

  ngOnInit() {
    this.tabelaService.getCustomers().subscribe((dados) => {
      this.customers = dados;
      this.customers.sort((x, y) => {
        let a: any = x.id,
          b: any = y.id;
        return a == b ? 0 : a > b ? 1 : -1;
      });
      this.totalRecords = this.customers.length;
      this.datasource = this.customers.slice(
        this.first,
        this.first + this.rows
      );
    });
  }

  setOrder(field: string) {
    if (field.includes('.')) {
      let keys: string[];
      keys = field.split('.');
      if (this.order == 1) {
        //asc
        this.datasource = this.customers.sort((x, y) => {
          let a: any = x[keys[0]][keys[1]],
            b: any = y[keys[0]][keys[1]];
          return a == b ? 0 : a > b ? 1 : -1;
        });
      } else {
        //desc
        this.datasource = this.customers.sort((x, y) => {
          let a: any = x[keys[0]][keys[1]],
            b: any = y[keys[0]][keys[1]];
          return a == b ? 0 : a < b ? 1 : -1;
        });
      }
    } else {
      if (this.order == 1) {
        //asc
        this.datasource = this.customers.sort((x, y) => {
          let a: any = x[field],
            b: any = y[field];
          return a == b ? 0 : a > b ? 1 : -1;
        });
      } else {
        //desc
        this.datasource = this.customers.sort((x, y) => {
          let a: any = x[field],
            b: any = y[field];
          return a == b ? 0 : a < b ? 1 : -1;
        });
      }
    }

    this.datasource = this.datasource.slice(
      this.first,
      this.first +
        this.paginadorPersonalizadoComponent.paginator.paginatorState.rows
    );
    this.resetPaginator();
  }

  onSort(event: SortEvent) {
    this.field = event.field;
    this.order = event.order;
  }

  resetPaginator() {
    this.paginadorPersonalizadoComponent.paginator.changePage(0);
  }

  setMyPagination(event: any) {
    console.log(event);

    //event.first: Index of first record being displayed
    //event.rows: Number of rows to display in new page
    //event.page: Index of the new page
    //event.pageCount: Total number of pages
    if (this.customers) {
      this.datasource = this.customers.slice(
        event.first,
        event.first + event.rows
      );
    }

    if (
      this.paginadorPersonalizadoComponent.paginator.paginatorState.rows !=
      event.rows
    ) {
      this.datasource = this.customers.slice(
        this.first,
        this.first + event.rows
      );
      setTimeout(() => {
        this.resetPaginator();
      });
    }
  }

  reset() {
    this.table.loading = true;
    setTimeout(() => {
      this.datasource = this.customers.sort();
      this.table.reset();
      this.resetPaginator();
      this.table.loading = false;
    }, 1000);
  }
}
