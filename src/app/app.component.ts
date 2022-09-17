import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { CustomerService } from './customer.service';
import { Customer } from './modelo/customer';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor() { }

  ngOnInit(){}

}
