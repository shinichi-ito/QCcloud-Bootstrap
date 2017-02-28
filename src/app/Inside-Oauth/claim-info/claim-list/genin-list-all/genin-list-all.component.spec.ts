/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GeninListAllComponent } from './genin-list-all.component';

describe('GeninListAllComponent', () => {
  let component: GeninListAllComponent;
  let fixture: ComponentFixture<GeninListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeninListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeninListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
