/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListKoukaComponent } from './list-kouka.component';

describe('ListKoukaComponent', () => {
  let component: ListKoukaComponent;
  let fixture: ComponentFixture<ListKoukaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKoukaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKoukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
