const apiKEY = process.env.NEXT_PUBLIC_WEATHER_API
const baseURL = "https://api.weatherapi.com/v1"
const AQI_API = process.env.NEXT_PUBLIC_AQI_API

export const getWeather = async(latitude,longitude) => {
    const url = `${baseURL}/current.json?key=${apiKEY}&q=${latitude},${longitude}&aqi=yes`;
    const response = (await fetch(url));
    const data = await response.json();    
    return data;
}

export const getAQI = async()=>{
    const url = `https://api.waqi.info/feed/here/?token=${AQI_API}`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getAQIColor = (aqi) => {
    if(aqi<10){
        return 'yellowgreen'
    }
    else if(aqi<50){
        return 'lightgreen'
    }
    else if(aqi<80){
        return 'yellow'
    }
    else if(aqi<100){
        return 'orange'
    }
    else if(aqi<200){
        return 'red'
    }
    else{
        return 'darkred'
    }
}