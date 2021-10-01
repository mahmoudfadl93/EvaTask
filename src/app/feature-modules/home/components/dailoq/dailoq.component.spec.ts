import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailoqComponent } from './dailoq.component';

describe('DailoqComponent', () => {
  let component: DailoqComponent;
  let fixture: ComponentFixture<DailoqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailoqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
