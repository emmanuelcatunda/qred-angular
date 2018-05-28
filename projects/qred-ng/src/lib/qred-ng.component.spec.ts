import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QredNg } from './qred-ng.component';

describe('QredNgComponent', () => {
  let component: QredNg;
  let fixture: ComponentFixture<QredNg>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QredNg ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QredNg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
