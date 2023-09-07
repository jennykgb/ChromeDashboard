let picUrl = ""
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=animal")
    .then(response => response.json())
    .then(data=> {
        
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("author").innerHTML += `<h1>Author: ${data.user.name}</h1>`
    })
    .catch(err => {
        document.body.style.background = "linear-gradient(to right, #085078, #85d8ce)"
    })


fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(response =>response.json())
    .then(data => {
       
        document.getElementById("crypto").innerHTML = `
                <div class="crypto-header">
                    <img src="${data.image.small}">
                    <h2 class="coin">${data.name}</h2>
                </div>
                <div class="crypto-price"> 
                    <p>➡️ $${data.market_data.current_price.usd}</p>
                    <p>⬆️ $${data.market_data.high_24h.usd}</p>
                    <p>⬇️ $${data.market_data.low_24h.usd}</p>
                </div>
            `
    })
    .catch(err=>console.error(err))


function timeUpdate() {
    let time = new Date()
    document.getElementById("time").innerText = time.toLocaleTimeString("en-us",{timeStyle: "short"})
}

setInterval(timeUpdate, 1000)



navigator.geolocation.getCurrentPosition(position => {
    let longCoords = position.coords.longitude
    let latCoords = position.coords.latitude
    console.log(longCoords, latCoords)

    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latCoords}&lon=${longCoords}&units=imperial`)
        .then(response => {
            if(!response.ok){
                throw Error("Weather data not available")
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            let iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <div class="temp">
                    <img src="${iconUrl}">
                    <p>${Math.round(data.main.temp)}°F </p>   
                </div>
                <p>${data.name}</p>
            `
        })
        .catch(err => console.error(err))
})


