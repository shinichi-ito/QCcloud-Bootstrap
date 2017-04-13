/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Privacy2PolicyComponent } from './privacy2-policy.component';

describe('Privacy2PolicyComponent', () => {
  let component: Privacy2PolicyComponent;
  let fixture: ComponentFixture<Privacy2PolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Privacy2PolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Privacy2PolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
