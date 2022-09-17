import { Paginator } from '../paginador/paginator';
export interface Country {
  name?: string;
  code?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  paginator?: Paginator;
}
