import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Paginator } from 'primeng/paginator';

import { Paginador } from '../modelo/paginador.model';

@Component({
  selector: 'app-paginator-custom',
  templateUrl: './paginator-custom.component.html',
  styleUrls: ['./paginator-custom.component.scss']
})
export class PaginatorCustomComponent implements OnInit {

  @Input() showLastUpdateUserData: boolean = true;
  @Output() change = new EventEmitter();

  @ViewChild('paginatorCustom') paginatorCustom!: Paginator;

  paginator: Paginador = new Paginador(0, 5);
  firstItem: number = 0;
  lastItem: number = 0;
  totalElements: number = 0;
  listItensPorPage: number[] = [5, 10, 20]
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      itensPerPage: new FormControl(this.paginator.size)
    });
    this.form.get('itensPerPage')?.valueChanges.subscribe(v => {
      this.changeRows(v);
    });
    this.setDataInformation(this.paginator);
  }

  changePaginator(event: any) {
    console.log(event)
    this.paginator.page = event.page;
    this.paginator.first = event.first;
    this.setDataInformation(this.paginator);
    this.change.emit();
  }

  getPage(): number {
    return this.paginator.page;
  }

  getSize(): number {
    return this.paginator.size;
  }

  setTotalElements(totalElements: number) {
    this.paginator.totalElements = totalElements;
    this.setDataInformation(this.paginator);
  }

  setDataInformation(p: Paginador) {
    this.firstItem = p.first + 1;
    this.lastItem = (p.page * p.size) + p.size;
    this.totalElements = p.totalElements;
  }

  changeRows(value: string) {
    this.paginator = new Paginador(0, Number.parseInt(value), 0, this.totalElements);
    console.log(this.paginator)
    this.setDataInformation(this.paginator);
  }
}
