import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TabelaComponent } from './tabela/tabela.component';
import { PaginadorPersonalizadoComponent } from './paginador-personalizado/paginador-personalizado.component';
import { PaginatorCustomComponent } from './paginator-custom/paginator-custom.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, TabelaComponent, PaginadorPersonalizadoComponent, PaginatorCustomComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    PaginatorModule,
    MenuModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  exports: [PaginadorPersonalizadoComponent]
})
export class AppModule {}
