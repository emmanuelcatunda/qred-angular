import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QredNg } from './qred-ng.component';

describe('QredNg', () => {
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

  it('should create qr-red', () => {
    expect(component).toBeTruthy();
  });
});
