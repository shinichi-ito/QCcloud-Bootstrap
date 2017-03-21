/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FileListAllComponent } from './file-list-all.component';

describe('FileListAllComponent', () => {
  let component: FileListAllComponent;
  let fixture: ComponentFixture<FileListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
