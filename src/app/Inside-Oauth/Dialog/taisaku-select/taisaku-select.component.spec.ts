/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaisakuSelectComponent } from './taisaku-select.component';

describe('TaisakuSelectComponent', () => {
  let component: TaisakuSelectComponent;
  let fixture: ComponentFixture<TaisakuSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaisakuSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisakuSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
