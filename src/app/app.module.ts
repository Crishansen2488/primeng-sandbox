import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerService } from './customer.service';
import { TableComponent } from './table/table.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { TabelaComponent } from './tabela/tabela.component';

@NgModule({
  declarations: [	
    AppComponent,
    TableComponent,
    MenuComponent,
      TabelaComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    PaginatorModule,
    MenuModule,
    BrowserAnimationsModule
  ],
  providers: [
    CustomerService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
