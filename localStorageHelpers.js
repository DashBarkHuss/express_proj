const localRcJSON= ()=>{
    return JSON.parse(localStorage.rc);
}

const jsonToLocalStorageRC = (json)=>{
    localStorage.rc = JSON.stringify(json);
}