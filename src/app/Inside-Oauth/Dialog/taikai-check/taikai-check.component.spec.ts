/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaikaiCheckComponent } from './taikai-check.component';

describe('TaikaiCheckComponent', () => {
  let component: TaikaiCheckComponent;
  let fixture: ComponentFixture<TaikaiCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaikaiCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaikaiCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
