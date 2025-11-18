import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasesEditComponent } from './bases-edit.component';

describe('BasesEditComponent', () => {
  let component: BasesEditComponent;
  let fixture: ComponentFixture<BasesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
