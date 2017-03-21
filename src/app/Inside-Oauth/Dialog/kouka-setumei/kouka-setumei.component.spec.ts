/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KoukaSetumeiComponent } from './kouka-setumei.component';

describe('KoukaSetumeiComponent', () => {
  let component: KoukaSetumeiComponent;
  let fixture: ComponentFixture<KoukaSetumeiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoukaSetumeiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoukaSetumeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
