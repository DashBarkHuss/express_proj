let rcs;
function syncLocalStorage(promise){ //promise is a fetch to get rc's for a a user
    promise
    .then(x=>
        x.text()
        )
    .then(x=> 
        JSON.parse(x))
    .then(x=>{
        localStorage.rc = JSON.stringify(x.results);
        console.log(JSON.parse(localStorage.rc))
        }
    )
    .catch(err=>console.log(err))

}
window.onload = ()=>{
    localStorage.userId=1;
    syncLocalStorage(fetch(`/rc/${localStorage.userId}/today`))
};