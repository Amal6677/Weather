import React from "react";

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast_data: [], // will contain dresses data array from server
      isLoaded: true, // will be true after data have been received from server
      error: null
    };
  }

  forecastWeather = cityName => {
    fetch(
      "http://api.openweathermap.org/data/2.5/forecast?APPID=dfcbfa91a57ec56afbf2e296953fa5e6&q=" +
        cityName
    ).then(
      response => {
        if (response.ok) {
          // handle 2xx code success only
          // get only JSON data returned from server with .json()
          response.json().then(json_response => {
            console.log(json_response);
            this.setState({
              forecast_data: json_response.list, // data received from server
              isLoaded: true, // we got data
              error: null // no errors
            });
          });
        } else {
          // handle errors, for example 404
          response.json().then(json_response => {
            this.setState({
              isLoaded: false,
              // result returned is case of error is like  {message: "dress not found"}
              // save the error in state for display below
              error: json_response, // something in format  {message: "dress not found", db_data:{}}
              forecast_data: [] // no data received from server
            });
          });
        }
      },

      error => {
        // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
        // or some unlikely networking error occurs, such a DNS lookup failure.
        this.setState({
          isLoaded: false,
          error: {
            message: "AJAX error, URL wrong or unreachable, see console"
          }, // save the AJAX error in state for display below
          forecast_data: [] // no data received from server
        });
      }
    );
  };

  render() {
    console.log("inside render");
    if (!this.state.isLoaded) {
      return (
        <form className="panel350">
          <h3>{this.props.title}</h3>
          <input type="text" id="cityNameForecast" />
          <button
            type="button"
            onClick={() =>
              this.forecastWeather(
                document.getElementById("cityNameForecast").value
              )
            }
          >
            Search
          </button>
          <div>Please enter a valid city</div>
        </form>
      );
    } else {
      console.log(this.state.forecast_data);
      return (
        <form className="panel350">
          <h3>{this.props.title}</h3>
          <input type="text" id="cityNameForecast" />
          <button
            type="button"
            onClick={() =>
              this.forecastWeather(
                document.getElementById("cityNameForecast").value
              )
            }
          >
            Search
          </button>
          <table>
            <tbody>
              <tr>
                <th>Time</th>
                <th>Temperature</th>
                <th>Pressure</th>
                <th>Humidity</th>
                <th>Description</th>
                <th></th>
              </tr>
              {this.state.forecast_data.map(function(forecast, i) {
                return (
                  <tr key={i}>
                    <td>{forecast.dt}</td>
                    <td>{Math.trunc(forecast.main.temp - 273.15) + "° C"}</td>
                    <td>{forecast.main.pressure}</td>
                    <td>{forecast.main.humidity}</td>
                    <td>{forecast.weather[0].description}</td>
                    <td>
                      <img
                        src={
                          "http://openweathermap.org/img/w/" +
                          forecast.weather[0].icon +
                          ".png"
                        }
                      ></img>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      );
    }
  }
}

export default Forecast;
