/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SameImageComponent } from './same-image.component';

describe('SameImageComponent', () => {
  let component: SameImageComponent;
  let fixture: ComponentFixture<SameImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SameImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SameImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
