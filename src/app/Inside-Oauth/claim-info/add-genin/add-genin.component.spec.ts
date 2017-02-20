/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddGeninComponent } from './add-genin.component';

describe('AddGeninComponent', () => {
  let component: AddGeninComponent;
  let fixture: ComponentFixture<AddGeninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGeninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGeninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
