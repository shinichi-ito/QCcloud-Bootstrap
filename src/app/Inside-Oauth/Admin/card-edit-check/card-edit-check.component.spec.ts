/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardEditCheckComponent } from './card-edit-check.component';

describe('CardEditCheckComponent', () => {
  let component: CardEditCheckComponent;
  let fixture: ComponentFixture<CardEditCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEditCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEditCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
