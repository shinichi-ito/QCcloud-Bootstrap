/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TokuteiComponent } from './tokutei.component';

describe('TokuteiComponent', () => {
  let component: TokuteiComponent;
  let fixture: ComponentFixture<TokuteiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokuteiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokuteiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
