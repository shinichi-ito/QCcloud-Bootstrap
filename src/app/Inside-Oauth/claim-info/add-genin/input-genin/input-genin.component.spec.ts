/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputGeninComponent } from './input-genin.component';

describe('InputGeninComponent', () => {
  let component: InputGeninComponent;
  let fixture: ComponentFixture<InputGeninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputGeninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGeninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
