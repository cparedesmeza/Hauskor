import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBSComponent } from './section-bs.component';

describe('SectionBSComponent', () => {
  let component: SectionBSComponent;
  let fixture: ComponentFixture<SectionBSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionBSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionBSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
