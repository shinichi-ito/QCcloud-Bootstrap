/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaisakuListAllComponent } from './taisaku-list-all.component';

describe('TaisakuListAllComponent', () => {
  let component: TaisakuListAllComponent;
  let fixture: ComponentFixture<TaisakuListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaisakuListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisakuListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
