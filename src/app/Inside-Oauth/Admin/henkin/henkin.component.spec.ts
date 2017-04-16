/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HenkinComponent } from './henkin.component';

describe('HenkinComponent', () => {
  let component: HenkinComponent;
  let fixture: ComponentFixture<HenkinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HenkinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HenkinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
