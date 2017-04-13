/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Time2LineComponent } from './time2-line.component';

describe('Time2LineComponent', () => {
  let component: Time2LineComponent;
  let fixture: ComponentFixture<Time2LineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Time2LineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Time2LineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
