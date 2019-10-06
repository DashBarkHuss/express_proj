const getGeolocation = ()=>{
    return new Promise ((resolve, reject)=>{
        if ("geolocation" in navigator){
            const success = geolocation=>{
                resolve(geolocation)
            }
            const error = (geolocation)=>{
                resolve(null)
            };
            navigator.geolocation.getCurrentPosition(success, error);
        } else (resolve(null))
    })
}

const getCoords = (geolocation)=>{
    if (geolocation){
        [longitude, latitude, accuracy] = [geolocation.coords.longitude, geolocation.coords.latitude, geolocation.coords.accuracy]
    } else {
        [longitude, latitude, accuracy] = [null, null, null]
    }
    return {latitude, longitude, accuracy};
}

const postRC= (info)=>{
    return fetch('http://127.0.0.1:3306/rc', 
            {
                method: 'POST', 
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json"
                }
            })
}

const backgroundSyncRC =  (info)=>{
    if ('SyncManager' in window) {
    navigator.serviceWorker.getRegistration() 
        .then(registration => {
            registration.sync.register(`rc-${JSON.stringify(info)}`);
        }); 
    } else {
        console.log("no sync manager")
        postRC(info).then(r => r.text())
        .then(x=>JSON.parse(x))
        .then(x=>console.log("Added to database: ", x.time.substring(16, 24), x.coords))
        .catch(err=>console.log("reality check not posted: ", err));
    }
}

const addRc = (userId)=>{
    let info = {timestamp: Date.now(), userId};
    console.log("Time of RC: ",Date(info.timestamp).substring(16, 24));
    getGeolocation()
    .then(location=>{
        return getCoords(location);
    })
    .then(coords=>{
        info.coords = coords
        return info
    })
    .then(info=>{
        const newLocalStorageRC = [...localRcJSON(userId), {time: info.timestamp} ];
        renderTimeLine(newLocalStorageRC.map(x=>x.time), `timeline${userId}`);
        jsonToLocalStorageRC(newLocalStorageRC, userId);
        backgroundSyncRC(info);
    })
}