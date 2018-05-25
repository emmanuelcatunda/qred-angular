import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QredNgComponent } from './qred-ng.component';

describe('QredNgComponent', () => {
  let component: QredNgComponent;
  let fixture: ComponentFixture<QredNgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QredNgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QredNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
