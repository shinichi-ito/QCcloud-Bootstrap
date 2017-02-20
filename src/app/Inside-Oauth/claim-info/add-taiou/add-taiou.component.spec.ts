/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddTaiouComponent } from './add-taiou.component';

describe('AddTaiouComponent', () => {
  let component: AddTaiouComponent;
  let fixture: ComponentFixture<AddTaiouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaiouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaiouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
