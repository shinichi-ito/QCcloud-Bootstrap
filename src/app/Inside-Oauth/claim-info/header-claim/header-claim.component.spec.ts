/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeaderClaimComponent } from './header-claim.component';

describe('HeaderClaimComponent', () => {
  let component: HeaderClaimComponent;
  let fixture: ComponentFixture<HeaderClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
