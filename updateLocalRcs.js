window.onload = ()=>{
    function addToStorage(promise){
        promise
        .then(x=>x.text())
        .then(x=> JSON.parse(x))
        .then(x=>{
            if (!x.results.length) throw "Local Storage RC's Up To Date";
            if (localStorage.rc){
                const resultsString = JSON.stringify(x.results);
                const addedResultsString = localStorage.rc.substring(0,localStorage.rc.length-1)+','+resultsString.substring(1,resultsString.length);
                localStorage.rc = addedResultsString;
            } else {
                const resultsString = JSON.stringify(x.results)
                localStorage.rc = resultsString; 
            }
            console.log(JSON.parse(localStorage.rc))})
        .catch(err=>console.log(err))

    }
    if(!localStorage.rc || localStorage.rc =='[]'){
        addToStorage(fetch('/rc/1'))
    } else if (localStorage.rc){
        const rcArray = JSON.parse(localStorage.rc);
        const lastRc = rcArray[rcArray.length-1];
        
        addToStorage(fetch(`/rc/1?lastrc=${lastRc.time}`))

    }
};