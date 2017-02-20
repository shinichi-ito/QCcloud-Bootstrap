/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddClaimComponent } from './add-claim.component';

describe('AddClaimComponent', () => {
  let component: AddClaimComponent;
  let fixture: ComponentFixture<AddClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
