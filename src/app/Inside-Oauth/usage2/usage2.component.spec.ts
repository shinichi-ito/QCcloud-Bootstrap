/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Usage2Component } from './usage2.component';

describe('Usage2Component', () => {
  let component: Usage2Component;
  let fixture: ComponentFixture<Usage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Usage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Usage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
