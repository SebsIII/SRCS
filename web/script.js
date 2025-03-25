async function x () {
    const response = await fetch("https://api.n2yo.com/rest/v1/satellite/tle/25544&apiKey=589P8Q-SDRYX8-L842ZD-5Z9");
    const data = await response.text();
    console.log(data);
}

x()