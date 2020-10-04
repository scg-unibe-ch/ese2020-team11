import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignupFormComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SignupFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'ng-bootstrap-password-validation-example'`, async(() => {
    const fixture = TestBed.createComponent(SignupFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-bootstrap-password-validation-example');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(SignupFormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ng-bootstrap-password-validation-example!');
  }));
});