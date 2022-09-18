import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';

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

  teste?: number

  @ViewChild('paginator') paginator!: Paginator;
  @ViewChild('table') table!: Table;

  constructor(private tabelaService: TabelaService) {}

  ngOnInit() {
    this.tabelaService.getCustomers().subscribe((dados) => {
      this.customers = dados;
      //this.customers = this.customers.slice(0, 2);
      //ordenaçao Z - A (nome)
      // this.customers = this.customers.sort((obj1, obj2) => {
      //    return obj1.name > obj2.name ? -1 : obj1.name < obj2.name ? 1 : 0;
      // });
      // this.customers = this.customers.sort(this.onSortDescByName);
      //ordenação A - Z (nome)
      // this.customers = this.customers.sort((obj1, obj2) => {
      //   return obj1.name < obj2.name ? -1 : obj1.name > obj2.name ? 1 : 0;
      // });
      this.customers = this.customers.sort(this.onSortAscByName);
      this.totalRecords = this.customers.length;
      // this.datasource = this.customers
      this.datasource = this.customers.slice(
        this.first,
        this.first + this.rows
      );
    });

  }

  onSortAscByName(obj1: any, obj2: any) {
    return obj1.name < obj2.name ? -1 : obj1.name > obj2.name ? 1 : 0;
  }

  onSortDescByName(obj1: any, obj2: any) {
    return obj1.name > obj2.name ? -1 : obj1.name < obj2.name ? 1 : 0;
  }

  sort(){console.log('sort')}
  page(){console.log('page')}

  onSort(event: any) {
    // if (!this.paginator.isFirstPage()) {
    //   console.log('caiu')
    //   return
    // }
    console.log(event);

    switch (event.field) {
      case 'name':
        event.order == 1
          ? this.ordenarDatasourcePorNomeAsc()
          : this.ordenarDatasourcePorNomeDesc();
        break;
      case 'country.name':
        event.order == 1
          ? this.ordenarDatasourcePorPaisAsc()
          : this.ordenarDatasourcePorPaisDesc();
        break;
      case 'company':
        event.order == 1
          ? this.ordenarDatasourcePorCompanyAsc()
          : this.ordenarDatasourcePorCompanyDesc();
        break;
      case 'representative.name':
        event.order == 1
          ? this.ordenarDatasourcePorRepresentativeAsc()
          : this.ordenarDatasourcePorRepresentativeDesc();
        break;
      default:
        console.log('nada');
        break;
    }

    this.datasource = this.datasource.slice(
      this.first,
      this.first + this.paginator.paginatorState.rows
    );
  }

  resetPaginator() {
    this.paginator.changePage(0);
  }

  ordenarDatasourcePorNomeAsc() {
    this.datasource = this.customers.sort(this.onSortAscByName);
  }

  ordenarDatasourcePorNomeDesc() {
    this.datasource = this.customers.sort(this.onSortDescByName);
  }

  ordenarDatasourcePorPaisAsc() {
    this.datasource = this.customers.sort((obj1, obj2) => {
      return obj1.country.name < obj2.country.name
        ? -1
        : obj1.country.name > obj2.country.name
        ? 1
        : 0;
    });
  }

  ordenarDatasourcePorPaisDesc() {
    this.datasource = this.customers.sort((obj1, obj2) => {
      return obj1.country.name > obj2.country.name
        ? -1
        : obj1.country.name < obj2.country.name
        ? 1
        : 0;
    });
  }

  ordenarDatasourcePorCompanyAsc() {
    this.datasource = this.customers.sort((obj1, obj2) => {
      return obj1.company < obj2.company
        ? -1
        : obj1.company > obj2.company
        ? 1
        : 0;
    });
  }

  ordenarDatasourcePorCompanyDesc() {
    this.datasource = this.customers.sort((obj1, obj2) => {
      return obj1.company > obj2.company
        ? -1
        : obj1.company < obj2.company
        ? 1
        : 0;
    });
  }

  ordenarDatasourcePorRepresentativeAsc() {
    this.datasource = this.customers.sort((obj1, obj2) => {
      return obj1.representative.name < obj2.representative.name
        ? -1
        : obj1.representative.name > obj2.representative.name
        ? 1
        : 0;
    });
  }

  ordenarDatasourcePorRepresentativeDesc() {
    this.datasource = this.customers.sort((obj1, obj2) => {
      return obj1.representative.name > obj2.representative.name
        ? -1
        : obj1.representative.name < obj2.representative.name
        ? 1
        : 0;
    });
  }

  setMyPagination(event: any) {
    console.log(event)
   
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

    if (this.paginator.paginatorState.rows != event.rows) {
      this.datasource = this.customers.slice(
        this.first,
        this.first + event.rows
      );
      setTimeout(() => {
        this.resetPaginator()
      }, 100);
    }
  }

  reset(){
    this.table.loading = true
    setTimeout(() => {
      this.datasource = this.customers.sort(this.onSortAscByName);
      this.table.reset();
      this.resetPaginator();
      this.table.loading = false
    }, 1000);

  }

}
