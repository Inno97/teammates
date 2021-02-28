import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from '../../page.component';
import { MotdPageComponent } from './motd-page.component';

describe('MotdPageComponent', () => {
  let component: MotdPageComponent;
  let fixture: ComponentFixture<MotdPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageComponent,
        MotdPageComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
