/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopInsideComponent } from './top-inside.component';

describe('TopInsideComponent', () => {
  let component: TopInsideComponent;
  let fixture: ComponentFixture<TopInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopInsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
