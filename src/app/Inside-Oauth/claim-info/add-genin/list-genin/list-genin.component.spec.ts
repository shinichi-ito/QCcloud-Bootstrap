/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListGeninComponent } from './list-genin.component';

describe('ListGeninComponent', () => {
  let component: ListGeninComponent;
  let fixture: ComponentFixture<ListGeninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGeninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGeninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
