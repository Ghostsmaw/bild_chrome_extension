// Api request for unsplash images and info

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    let img = data.urls.full;
    let authorName = data.user.name;
    let pictureLocation = data.location.name;

    if (pictureLocation === null) {
      document.getElementById("location").innerHTML = `
            <p class="footer-text"><i class="fa-solid fa-location-crosshairs"></i>Location Not Available</p>
        `;
    } else {
      document.getElementById("location").innerHTML = `
            <p class="footer-text"><i class="fa-solid fa-location-crosshairs"></i>${pictureLocation}</p>
        `;
    }

    document.getElementById("photographer").innerHTML = `
            <p class="footer-text"><i class="fa-regular fa-circle-user"></i>${authorName}</p>
        `;
    document.body.style = `
            background-image: url(${img})
        `;
  })
  .catch((err) => {
    document.body.style = `
    background-image: url(https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjUzMTk4Mzk&ixlib=rb-1.2.1&q=80)
`;
  });

// Api request for quotes

fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1e34b23c51mshccb37e789199c2ap169a93jsn38636495cfce",
    "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
  },
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("quotes").innerHTML = `
            <p class="footer-text"><i class="fa-solid fa-pen"></i>${data.content}</p>
        `;
  });

// Api request for coins

fetch("https://coingecko.p.rapidapi.com/coins/bitcoin", {
  method: "GET",
  params: {
    localization: "true",
    tickers: "true",
    market_data: "true",
    community_data: "true",
    developer_data: "true",
    sparkline: "false",
  },
  headers: {
    "X-RapidAPI-Key": "1e34b23c51mshccb37e789199c2ap169a93jsn38636495cfce",
    "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
  },
})
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    let cryptoImg = data.image.thumb;
    let cryptoName = data.name;
    document.getElementById("crypto-title").innerHTML = `
        <img class="cryptoImg" src=${cryptoImg}/><h3 class="cryptoName">${cryptoName}</h3>
    `;
    document.getElementById("crypto-price").innerHTML = `
        <i class="fa-solid fa-snowflake"></i>:<p class="currentPrice"><span>$</span>${data.market_data.current_price.usd}</p>
    `;
    document.getElementById("high-price").innerHTML = `
        <i class="fa-solid fa-money-bill-trend-up"></i>:<p class="upPrice"><span>$</span>${data.market_data.high_24h.usd}</p>
    `;
    document.getElementById("low-price").innerHTML = `
        <i class="fa-solid fa-arrow-trend-down"></i>:<p class="downPrice"><span>$</span>${data.market_data.low_24h.usd}</p>
    `;
  })
  .catch((error) => console.log(error));

// to get and display current time

function formatAMPM() {
  const date = new Date();
  document.getElementById("time").innerHTML = date.toLocaleTimeString(
    "en-us",
    "short"
  );
}

setInterval(formatAMPM, 1000);

// Get the weather and location of user

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
  .then((res) =>{
      if(!res.ok){
          throw Error("Weather not available")
      }
    return res.json()
    })
  .then((data) => {
      console.log(data)
      document.getElementById("weather-info").innerHTML = `
        <i class="fa-solid fa-cloud-sun-rain"></i><h3 class="temp-value">${data.main.temp}</h3><i class="fa-solid fa-genderless"></i>
      `
      document.getElementById("weather-loc").innerHTML = data.name
    })
  .catch(err => console.log(err))
  console.log(position);
});
