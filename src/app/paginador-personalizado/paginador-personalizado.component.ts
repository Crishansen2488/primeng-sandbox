import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-paginador-personalizado',
  templateUrl: './paginador-personalizado.component.html',
  styleUrls: ['./paginador-personalizado.component.scss'],
})
export class PaginadorPersonalizadoComponent implements OnInit {
  @Output() change = new EventEmitter();
  @Input() total: number = 0;
  @Input() linhas: number = 0;

  @ViewChild('paginator') paginator!: Paginator;

  constructor() {}

  ngOnInit(): void {}

  changePaginator(event: any) {
    this.change.emit(event);
  }
}
