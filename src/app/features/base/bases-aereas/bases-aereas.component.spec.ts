import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasesAereasComponent } from './bases-aereas.component';

describe('BasesAereasComponent', () => {
  let component: BasesAereasComponent;
  let fixture: ComponentFixture<BasesAereasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasesAereasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasesAereasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
