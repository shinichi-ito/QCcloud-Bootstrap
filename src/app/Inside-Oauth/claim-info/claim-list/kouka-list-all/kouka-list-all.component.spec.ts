/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KoukaListAllComponent } from './kouka-list-all.component';

describe('KoukaListAllComponent', () => {
  let component: KoukaListAllComponent;
  let fixture: ComponentFixture<KoukaListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoukaListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoukaListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
