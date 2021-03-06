/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListBranchComponent } from './list-branch.component';

describe('ListBranchComponent', () => {
  let component: ListBranchComponent;
  let fixture: ComponentFixture<ListBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
