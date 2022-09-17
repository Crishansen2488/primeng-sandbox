import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, take, tap } from 'rxjs';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css'],
})
export class TabelaComponent implements OnInit {
  customers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    return this.http
      .get('assets/customers-large.json')
      .pipe(
        map((dados: any) => dados.data),
        take(1)
      )
      .subscribe((dados) => {
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
        //ordenação por país 
        
        console.log(this.customers);
      });
  }

  onSortAscByName(obj1: any, obj2: any) {
    return obj1.name < obj2.name ? -1 : obj1.name > obj2.name ? 1 : 0;
  }

  onSortDescByName(obj1: any, obj2: any) {
    return obj1.name > obj2.name ? -1 : obj1.name < obj2.name ? 1 : 0;
  }
}
