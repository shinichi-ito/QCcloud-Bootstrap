/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditClaimMainComponent } from './edit-claim-main.component';

describe('EditClaimMainComponent', () => {
  let component: EditClaimMainComponent;
  let fixture: ComponentFixture<EditClaimMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClaimMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClaimMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
