/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaikaiComponent } from './taikai.component';

describe('TaikaiComponent', () => {
  let component: TaikaiComponent;
  let fixture: ComponentFixture<TaikaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaikaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaikaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
