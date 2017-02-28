/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaiouListAllComponent } from './taiou-list-all.component';

describe('TaiouListAllComponent', () => {
  let component: TaiouListAllComponent;
  let fixture: ComponentFixture<TaiouListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiouListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiouListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
