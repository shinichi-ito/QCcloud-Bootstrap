/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RiyouKiyakuComponent } from './riyou-kiyaku.component';

describe('RiyouKiyakuComponent', () => {
  let component: RiyouKiyakuComponent;
  let fixture: ComponentFixture<RiyouKiyakuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiyouKiyakuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiyouKiyakuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
