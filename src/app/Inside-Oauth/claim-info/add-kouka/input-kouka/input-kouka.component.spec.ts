/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputKoukaComponent } from './input-kouka.component';

describe('InputKoukaComponent', () => {
  let component: InputKoukaComponent;
  let fixture: ComponentFixture<InputKoukaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputKoukaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputKoukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
