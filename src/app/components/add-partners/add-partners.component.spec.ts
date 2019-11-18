import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnertsComponent } from './add-partners.component';

describe('AddPartnertsComponent', () => {
  let component: AddPartnertsComponent;
  let fixture: ComponentFixture<AddPartnertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartnertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartnertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
