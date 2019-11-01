let rcs;
function saveToLocalRcs(responseJson){ //promise
    if(!responseJson) return[];
    localStorage['rc'+responseJson.userId] = JSON.stringify(responseJson.results);
    console.log("localstorage updated:", localStorage);
}
window.onload = ()=>{
    fetch(`/rc/1/today`)
    .then(response=>response.json())
    .then(responseJson=>{
        console.log("response: ", responseJson);
        saveToLocalRcs(responseJson)
        return responseJson.results;
    })
    .then(results=>{
            renderTimeLine(results? results.map(x=>x.time): [], `timeline1`)
    })
    // fetch(`/rc/2/today`).then(response=>saveToLocalRcs(response.json())).then(results=>{
    //     renderTimeLine(results? results.map(x=>x.time): [], `timeline2`)
// })
};