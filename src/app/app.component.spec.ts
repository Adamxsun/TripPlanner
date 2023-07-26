// app.component.spec.ts
//by adamsun
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have default selected city as "Rome"', () => {
    expect(component.selectedCity).toBe('Rome');
  });

  it('should update selected city when a new city is selected', () => {
    const selectElement = fixture.nativeElement.querySelector('#cityDropdown');
    selectElement.value = 'Athens';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.selectedCity).toBe('Athens');
  });


  it('should fetch weather data when a new city is selected', () => {
    spyOn(component, 'getWeatherData').and.callThrough();
    const selectElement = fixture.nativeElement.querySelector('#cityDropdown');
    selectElement.value = 'Edmonton';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(component.getWeatherData).toHaveBeenCalledWith('Edmonton', 'today');
    expect(component.weatherData.weather).toBe('Sunny'); 
    expect(component.weatherData.temperature).toBe('21.00'); 
  });
});
