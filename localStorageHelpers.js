const localRcJSON= (userId)=>{
    return JSON.parse(localStorage["rc"+userId]);
}

const jsonToLocalStorageRC = (json, userId)=>{
    localStorage["rc"+userId]= JSON.stringify(json);
}

const test = ()=>{console.log("test")}