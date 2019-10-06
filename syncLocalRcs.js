let rcs;
function syncLocalRcs(promise){ //promise is a fetch to get rc's for a user
    return promise
    .then(x=>
        x.text()
        )
    .then(x=> 
        JSON.parse(x))
    .then(x=>{
        localStorage['rc'+x.results[0].user_id] = JSON.stringify(x.results);
        console.log(x.results)
        return x.results;
        }
    )
    .catch(err=>console.log(err))

}
window.onload = ()=>{
    syncLocalRcs(fetch(`/rc/1/today`)).then(results=>{
            renderTimeLine(results? results.map(x=>x.time): [], `timeline1`)
    })
    syncLocalRcs(fetch(`/rc/2/today`)).then(results=>{
            renderTimeLine(results? results.map(x=>x.time): [], `timeline2`)
    })
};