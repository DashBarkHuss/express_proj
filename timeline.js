const renderTimeLine=(times)=>{
    
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";
    console.log("tl");
    const timespan = times[times.length-1]-times[0];

    const line = document.createElementNS('http://www.w3.org/2000/svg','line')
    line.setAttributeNS(null, 'x1',   0);
    line.setAttributeNS(null, 'x2', 500);
    line.setAttributeNS(null, 'y1',   50);
    line.setAttributeNS(null, 'y2',   50);
    line.setAttributeNS(null, 'stroke', 'pink');
    line.setAttributeNS(null, 'stroke-width', 1.5);
    document.getElementById("timeline").appendChild(line);
    for (i=0; i<times.length;i++){  
        const radius = 5;
        const text = document.createElementNS('http://www.w3.org/2000/svg','text');      
        text.setAttributeNS(null, 'x', (times[i]-times[0])/timespan * (500-2*radius));
        text.setAttributeNS(null, 'y', 40);
        text.setAttributeNS(null, 'display', 'none');
        text.setAttributeNS(null, 'id', 't'+i);
        text.setAttribute('fill', '#000');
        text.textContent = epochToTime(times[i]);

        const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle.setAttributeNS(null, 'cx', (times[i]-times[0])/timespan * (500-2*radius)+radius)
        circle.setAttributeNS(null, 'cy', 50)
        circle.setAttributeNS(null, 'r', radius)
        circle.setAttributeNS(null, 'id', "c"+i)
        circle.setAttributeNS(null, 'fill', 'pink');
        
        timeline.appendChild(circle);
        timeline.appendChild(text);
    }
    // tooltip
    timeline.addEventListener('mouseenter', (e)=>{
        console.log(e.target);
        if(e.target.tagName=="circle"){ 
            console.log(e.target.id);
            id = e.target.id.substring(1); 
            elem = document.getElementById('t'+id); 
            elem.setAttribute('display','block'); 
            console.log(elem)}}
    , true)
    timeline.addEventListener('mouseleave', (e)=>{
        console.log(e.target);
            if(e.target.tagName=="circle"){
                console.log(e.target.id);
                id = e.target.id.substring(1); 
                elem = document.getElementById('t'+id);
                elem.setAttribute('display','none'); 
                console.log(elem);
            }
        }
    , true)
}
    