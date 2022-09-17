import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[]=[];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.botoes();
  }

  private botoes() {
    this.items = [
      {
        label: 'ANEXAR', command: () => {
          this.update();
        }
      },
      {
        label: 'DOWNLOAD', command: () => {
          this.delete();
        }
      }
    ];
  }

  update() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
}

delete() {
    this.messageService.add({severity:'warn', summary:'Delete', detail:'Data Deleted'});
}

}
