import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabelaService {
  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get('assets/customers-large.json').pipe(
      map((dados: any) => dados.data),
      take(1)
    );
  }
}
