/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SetImageFileComponent } from './set-image-file.component';

describe('SetImageFileComponent', () => {
  let component: SetImageFileComponent;
  let fixture: ComponentFixture<SetImageFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetImageFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetImageFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
