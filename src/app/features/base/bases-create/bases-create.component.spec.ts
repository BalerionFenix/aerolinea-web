import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasesCreateComponent } from './bases-create.component';

describe('BasesCreateComponent', () => {
  let component: BasesCreateComponent;
  let fixture: ComponentFixture<BasesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
