/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Riyou2KiyakuComponent } from './riyou2-kiyaku.component';

describe('Riyou2KiyakuComponent', () => {
  let component: Riyou2KiyakuComponent;
  let fixture: ComponentFixture<Riyou2KiyakuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Riyou2KiyakuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Riyou2KiyakuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
