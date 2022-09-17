import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './modelo/customer';
import { first, tap, delay } from 'rxjs';

@Injectable()
export class CustomerService {

    constructor(private http: HttpClient) { }

    getCustomersLarge() {
        return this.http.get<any>('assets/customers-large.json')
          .pipe(
          delay(1000),
          tap(cursos => console.log(cursos)))
            .toPromise()
            .then(res => <Customer[]>res.data)
            .then(data => { return data; })
            ;
    }

    getCustomers(params?: any) {
      return this.http.get<any>('https://www.primefaces.org/data/customers', {params: params})
        .pipe(
          tap(console.log)
        );
  }
}

