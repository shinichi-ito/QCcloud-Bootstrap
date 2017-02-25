/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputTaiouComponent } from './input-taiou.component';

describe('InputTaiouComponent', () => {
  let component: InputTaiouComponent;
  let fixture: ComponentFixture<InputTaiouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTaiouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTaiouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
