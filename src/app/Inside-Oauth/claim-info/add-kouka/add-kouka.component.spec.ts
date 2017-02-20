/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddKoukaComponent } from './add-kouka.component';

describe('AddKoukaComponent', () => {
  let component: AddKoukaComponent;
  let fixture: ComponentFixture<AddKoukaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKoukaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKoukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
