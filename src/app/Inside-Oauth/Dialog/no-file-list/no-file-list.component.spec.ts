/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoFileListComponent } from './no-file-list.component';

describe('NoFileListComponent', () => {
  let component: NoFileListComponent;
  let fixture: ComponentFixture<NoFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
