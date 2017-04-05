/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KoukaAddComponent } from './kouka-add.component';

describe('KoukaAddComponent', () => {
  let component: KoukaAddComponent;
  let fixture: ComponentFixture<KoukaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoukaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoukaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
