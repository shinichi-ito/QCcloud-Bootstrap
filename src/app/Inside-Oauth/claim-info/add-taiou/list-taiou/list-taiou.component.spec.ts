/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListTaiouComponent } from './list-taiou.component';

describe('ListTaiouComponent', () => {
  let component: ListTaiouComponent;
  let fixture: ComponentFixture<ListTaiouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTaiouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaiouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
