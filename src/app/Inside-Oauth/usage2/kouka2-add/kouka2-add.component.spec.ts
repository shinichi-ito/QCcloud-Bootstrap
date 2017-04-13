/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Kouka2AddComponent } from './kouka2-add.component';

describe('Kouka2AddComponent', () => {
  let component: Kouka2AddComponent;
  let fixture: ComponentFixture<Kouka2AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Kouka2AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Kouka2AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
