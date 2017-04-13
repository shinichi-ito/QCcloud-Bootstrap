/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddMember2Component } from './add-member2.component';

describe('AddMember2Component', () => {
  let component: AddMember2Component;
  let fixture: ComponentFixture<AddMember2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMember2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMember2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
