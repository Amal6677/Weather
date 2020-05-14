import React from "react";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather_data: {}, // will contain dresses data array from server
      main_data: {},
      isLoaded: true, // will be true after data have been received from server
      error: null
    };
  }

  searchWeather = cityName => {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?APPID=dfcbfa91a57ec56afbf2e296953fa5e6&q=" +
        cityName
    ).then(
      response => {
        if (response.ok) {
          // handle 2xx code success only
          // get only JSON data returned from server with .json()
          response.json().then(json_response => {
            console.log(json_response);
            this.setState({
              weather_data: json_response.weather[0], // data received from server
              main_data: json_response.main,
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
              weather_data: {}, // no data received from server
              main_data: {}
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
          weather_data: {}, // no data received from server
          main_data: {}
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
          <input type="text" id="cityName" />
          <button
            type="button"
            onClick={() =>
              this.searchWeather(document.getElementById("cityName").value)
            }
          >
            Search
          </button>
          <div>Please enter a valid city</div>
        </form>
      );
    } else {
      return (
        <form className="panel350">
          <h3>{this.props.title}</h3>
          <input type="text" id="cityName" />
          <button
            type="button"
            onClick={() =>
              this.searchWeather(document.getElementById("cityName").value)
            }
          >
            Search
          </button>
          <table>
            <tbody>
              <tr>
                <th>Temp:</th>
                <td>{this.state.main_data.temp}</td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{this.state.weather_data.description}</td>
              </tr>
              <tr>
                <th>Pressure:</th>
                <td>{this.state.main_data.pressure}</td>
              </tr>
              <tr>
                <th>Humidity:</th>
                <td>{this.state.main_data.pressure}</td>
              </tr>
              <tr>
                <th>Icon</th>
                <td>
                  <img
                    src={
                      "http://openweathermap.org/img/w/" +
                      this.state.weather_data.icon +
                      ".png"
                    }
                  ></img>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      );
    }
  }
}

export default Weather;
