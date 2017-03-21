/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClaimListAllSyousaiComponent } from './claim-list-all-syousai.component';

describe('ClaimListAllSyousaiComponent', () => {
  let component: ClaimListAllSyousaiComponent;
  let fixture: ComponentFixture<ClaimListAllSyousaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimListAllSyousaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimListAllSyousaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
