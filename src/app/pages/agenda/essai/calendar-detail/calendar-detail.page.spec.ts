import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarDetailPage } from './calendar-detail.page';


describe('CalendarDetailPage', () => {
  let component: CalendarDetailPage;
  let fixture: ComponentFixture<CalendarDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
