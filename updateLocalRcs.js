let rcs;
function syncLocalStorage(promise){ //promise is a fetch to get rc's for a user
    return promise
    .then(x=>
        x.text()
        )
    .then(x=> 
        JSON.parse(x))
    .then(x=>{
        localStorage.rc = JSON.stringify(x.results);
        console.log(x.results)
        return x.results;
        }
    )
    .catch(err=>console.log(err))

}
window.onload = ()=>{
    localStorage.userId=1;
    syncLocalStorage(fetch(`/rc/${localStorage.userId}/today`))
};