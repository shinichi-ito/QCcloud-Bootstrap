/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopClaimComponent } from './top-claim.component';

describe('TopClaimComponent', () => {
  let component: TopClaimComponent;
  let fixture: ComponentFixture<TopClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
