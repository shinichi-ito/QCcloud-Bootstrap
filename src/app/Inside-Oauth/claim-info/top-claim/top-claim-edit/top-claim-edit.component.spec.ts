/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopClaimEditComponent } from './top-claim-edit.component';

describe('TopClaimEditComponent', () => {
  let component: TopClaimEditComponent;
  let fixture: ComponentFixture<TopClaimEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopClaimEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopClaimEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
