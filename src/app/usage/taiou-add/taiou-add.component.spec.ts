/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaiouAddComponent } from './taiou-add.component';

describe('TaiouAddComponent', () => {
  let component: TaiouAddComponent;
  let fixture: ComponentFixture<TaiouAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiouAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiouAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
