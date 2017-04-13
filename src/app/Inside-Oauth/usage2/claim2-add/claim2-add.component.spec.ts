/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Claim2AddComponent } from './claim2-add.component';

describe('Claim2AddComponent', () => {
  let component: Claim2AddComponent;
  let fixture: ComponentFixture<Claim2AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Claim2AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Claim2AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
