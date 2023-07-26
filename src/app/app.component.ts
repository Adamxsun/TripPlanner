//app.components.ts
//by adamsun
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedCity: string = 'Rome';// Default to Rome
  selectedDate: string = 'today'; // Default to today
  weatherData: { weather: string, temperature: string } = { weather: 'Sunny', temperature: '21.00' };
  cityDescription: string = '';
  
  // Add the city image filename mappings
  cityImages: { [key: string]: string } = {
    Rome: 'rome.png',
    Athens: 'athens.png',
    Tokyo: 'tokyo.png',
    Edmonton: 'edmonton.png',
    Calgary: 'calgary.png'
  };

  constructor(private http: HttpClient) {}
  ngOnInit() {
    // Call the getCityDescription method during component initialization
    this.getCityDescription(this.selectedCity);
  }
  //when user select a city
  onCitySelection(event: Event) {
    const selectedOption = event.target as HTMLSelectElement;
    this.selectedCity = selectedOption.value;

    // Call the getWeatherData method to fetch weather data
    this.getWeatherData(this.selectedCity, this.selectedDate);

    // Call the getCityDescription method to fetch city description
    this.getCityDescription(this.selectedCity);
  }
  //when user select a date
  onDateSelection(event: Event) {
    const selectedOption = event.target as HTMLSelectElement;
    this.selectedDate = selectedOption.value;
    this.getWeatherData(this.selectedCity, this.selectedDate);
  }
  //function: get api call from backend server to get city info
  getCityDescription(city: string) {
    // Make an HTTP GET request to Node.js backend API
    let url;
    url = `http://3.137.158.223:3000/cities/${city}`;
    this.http.get<any>(url).subscribe(
      (data) => {
        this.cityDescription = data.description;
      },
      (error) => {
        console.log('Error fetching city description:', error);
      }
    );
  }
  //function: get api call from openweather to get weather info
  getWeatherData(city: string, date: string) {
    const apiKey = '19e781df97abf3d068eadda2e13ef451';
    let url;

    // If the selected date is today, fetch weather using the regular weather API
    if (date === 'today') {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    } else {
      // Otherwise, fetch weather forecast for the next 5 days using the "forecast" endpoint
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    }

    this.http.get<any>(url).subscribe(
      (data) => {
        // Handle the weather data here
        // Assuming the API response structure and data handling
        if (date === 'today') {
          this.weatherData.weather = data.weather[0].main;
          this.weatherData.temperature = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius and round to 2 decimal places
        } else {
          // For future dates, find the specific forecast for the selected date
          const selectedDateForecast = data.list.find((forecast: any) => forecast.dt_txt.includes(date));
          if (selectedDateForecast) {
            this.weatherData.weather = selectedDateForecast.weather[0].main;
            this.weatherData.temperature = (selectedDateForecast.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius and round to 2 decimal places
          } else {
            console.log('Weather forecast not available for the selected date.');
          }
        }
      },
      (error) => {
        console.log('Error fetching weather data:', error);
      }
    );
  }
}
