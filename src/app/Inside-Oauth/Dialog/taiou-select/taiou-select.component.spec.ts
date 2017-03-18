/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaiouSelectComponent } from './taiou-select.component';

describe('TaiouSelectComponent', () => {
  let component: TaiouSelectComponent;
  let fixture: ComponentFixture<TaiouSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiouSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiouSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
