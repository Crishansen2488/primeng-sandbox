import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';

import { PaginadorPersonalizadoComponent } from '../paginador-personalizado/paginador-personalizado.component';
import { PaginatorCustomComponent } from '../paginator-custom/paginator-custom.component';
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
  @ViewChild('paginatorCustom')
  paginatorCustom!: PaginatorCustomComponent;
  @ViewChild('table') table!: Table;

  constructor(private tabelaService: TabelaService) {}

  ngOnInit() {
    this.tabelaService.getCustomers().subscribe((dados) => {
      this.customers = dados;
      // this.customers = this.customers.slice(0,3)
      this.totalRecords = this.customers.length;
      this.customers.sort(this.sortDefault);
      this.paginatorCustom.setTotalElements(this.totalRecords);
      this.datasource = this.customers.slice(
        this.first,
        this.first + this.rows
      );
    });
  }

  sortDefault(x: any, y: any) {
    let a: any = x.id,
      b: any = y.id;
    return a == b ? 0 : a > b ? 1 : -1;
  }

  setOrder(field: string) {
    this.resetPaginator();
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
      this.first + this.paginatorCustom.getSize()
    );
  }

  onSort(event: SortEvent) {
    this.field = event.field;
    this.order = event.order;
  }

  resetPaginator() {
    this.paginatorCustom.paginatorCustom.changePage(0);
  }

  setMyPagination() {
    this.datasource = this.customers.slice(
      this.paginatorCustom.firstItem,
      this.paginatorCustom.firstItem + this.paginatorCustom.getSize()
    );
  }

  reset() {
    this.table.loading = true;
    this.table.reset();
    this.paginatorCustom.form.get('itensPerPage')?.setValue(this.rows);
    this.paginatorCustom.form.get('itensPerPage')?.updateValueAndValidity();
    this.customers.sort(this.sortDefault);
    this.datasource = this.customers.slice(this.first, this.first + this.rows);
    this.table.loading = false;
  }
}
