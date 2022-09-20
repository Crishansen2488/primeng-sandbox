import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorCustomComponent } from './paginator-custom.component';

describe('PaginatorCustomComponent', () => {
  let component: PaginatorCustomComponent;
  let fixture: ComponentFixture<PaginatorCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
