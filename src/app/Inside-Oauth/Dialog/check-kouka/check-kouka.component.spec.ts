/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CheckKoukaComponent } from './check-kouka.component';

describe('CheckKoukaComponent', () => {
  let component: CheckKoukaComponent;
  let fixture: ComponentFixture<CheckKoukaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckKoukaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckKoukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
