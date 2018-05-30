import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {QredNgModule} from 'projects/qred-ng/src/public_api'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],imports: [QredNgModule]
    }).compileComponents();
  }));
  it('should...', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('h1').textContent).toContain('Welcome to qred-ng-app!');
  }));
});
