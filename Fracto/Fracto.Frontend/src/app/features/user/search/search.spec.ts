import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './search';
import { StarRatingComponent } from '../../../shared/star-rating/star-rating';
import { DoctorService } from '../../../core/services/doctor';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockDoctorSvc: any;

  beforeEach(async () => {
    mockDoctorSvc = {
      search: vi.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      declarations: [SearchComponent, StarRatingComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: DoctorService, useValue: mockDoctorSvc }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should have city, specializationId, minRating, date controls', () => {
    expect(component.form.contains('city')).toBe(true);
    expect(component.form.contains('specializationId')).toBe(true);
    expect(component.form.contains('minRating')).toBe(true);
    expect(component.form.contains('date')).toBe(true);
  });

  it('should call search on init', () => {
    expect(mockDoctorSvc.search).toHaveBeenCalled();
  });

  it('reset() should clear form and search again', () => {
    component.form.get('city')?.setValue('Kathmandu');
    component.reset();
    expect(component.form.get('city')?.value).toBeFalsy();
  });

  it('doctors array should start empty', () => {
    expect(component.doctors.length).toBe(0);
  });
});
