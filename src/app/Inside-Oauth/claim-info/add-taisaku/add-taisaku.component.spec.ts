/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddTaisakuComponent } from './add-taisaku.component';

describe('AddTaisakuComponent', () => {
  let component: AddTaisakuComponent;
  let fixture: ComponentFixture<AddTaisakuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaisakuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaisakuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
