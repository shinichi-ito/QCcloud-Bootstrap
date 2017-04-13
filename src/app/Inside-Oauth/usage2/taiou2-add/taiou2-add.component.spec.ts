/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Taiou2AddComponent } from './taiou2-add.component';

describe('Taiou2AddComponent', () => {
  let component: Taiou2AddComponent;
  let fixture: ComponentFixture<Taiou2AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Taiou2AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Taiou2AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
