const localRcJSON= (userId)=>{
    const locallyStoredRcsForUser = localStorage["rc"+userId];
    if(locallyStoredRcsForUser){
        return JSON.parse(locallyStoredRcsForUser);
    } else {
        return null;
    }

}

const jsonToLocalStorageRC = (json, userId)=>{
    localStorage["rc"+userId]= JSON.stringify(json);
}

const test = ()=>{console.log("test")}