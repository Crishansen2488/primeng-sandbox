import { Customer } from './../modelo/customer';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  //   carros: any = [
//       {nome: 'Siena', ano: 2003, cor: 'Preto'},
//       {nome: 'Monza', ano: 1998, cor: 'Vermelho'},
//       {nome: 'Gol', ano: 2010, cor: 'Branco'},
//       {nome: 'Opala', ano: 1974, cor: 'Cinza'}
//   ];

//   cols: any = [
//     { field: 'nome', header: 'Nome' },
//     { field: 'ano', header: 'Ano' },
//     { field: 'cor', header: 'Cor' },
// ];

// sales: any = [
//   { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
//   { brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
//   { brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
//   { brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,' },
//   { brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' },
//   { brand: 'LG', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005' },
//   { brand: 'Sharp', lastYearSale: '82%', thisYearSale: '12%', lastYearProfit: '$131,211', thisYearProfit: '$100,214' },
//   { brand: 'Panasonic', lastYearSale: '44%', thisYearSale: '45%', lastYearProfit: '$66,442', thisYearProfit: '$53,322' },
//   { brand: 'HTC', lastYearSale: '90%', thisYearSale: '56%', lastYearProfit: '$765,442', thisYearProfit: '$296,232' },
//   { brand: 'Toshiba', lastYearSale: '75%', thisYearSale: '54%', lastYearProfit: '$21,212', thisYearProfit: '$12,533' }
// ];

customers: Customer[]=[];

selectedCustomers: Customer[]=[];

loading: boolean = true;

totalRecords: number=0;

selectAll: boolean = false;

  constructor(private customerService: CustomerService,
    private primeNGConfig: PrimeNGConfig ) { }

  ngOnInit() {
    this.customerService.getCustomersLarge().then(customers => {
        this.customers = customers;
        this.loading = false;
    });

}

onChange(){}

onPageChange(event:any){
  console.log("teste")
}

algumaCoisa(event: any) {

}

loadCustomers(event: LazyLoadEvent) {
  this.loading = true;

  //in a real application, make a remote request to load data using state metadata from event
  //event.first = First row offset
  //event.rows = Number of rows per page
  //event.sortField = Field name to sort with
  //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
  //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

  //imitate db connection over a network
  setTimeout(() => {
    this.customerService.getCustomers({lazyEvent: JSON.stringify(event)}).subscribe(res => {
        this.customers = res.customers;
        this.totalRecords = res.totalRecords;
        this.loading = false;
    })
}, 1000);
}

onSelectionChange(value = []) {
this.selectAll = value.length === this.totalRecords;
this.selectedCustomers = value;
}

onSelectAllChange(event:any) {
const checked = event.checked;

if (checked) {
    this.customerService.getCustomers().subscribe(res => {
        this.selectedCustomers = res.customers;
        this.selectAll = true;
    });
}
else {
    this.selectedCustomers = [];
    this.selectAll = false;
}
}

}
