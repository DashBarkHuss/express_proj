const epochToTime = epoch=>{
    const date = new Date(epoch); 
    const h = date.getHours(); 
    const m = date.getMinutes().toString().length == 2? date.getMinutes(): '0' + date.getMinutes();
    return h+':'+ m
}