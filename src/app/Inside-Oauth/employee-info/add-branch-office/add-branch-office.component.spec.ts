/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddBranchOfficeComponent } from './add-branch-office.component';

describe('AddBranchOfficeComponent', () => {
  let component: AddBranchOfficeComponent;
  let fixture: ComponentFixture<AddBranchOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBranchOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBranchOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
