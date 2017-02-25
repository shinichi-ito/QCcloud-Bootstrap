/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListTaisakuComponent } from './list-taisaku.component';

describe('ListTaisakuComponent', () => {
  let component: ListTaisakuComponent;
  let fixture: ComponentFixture<ListTaisakuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTaisakuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaisakuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
