const renderTimeLine=(times)=>{
    
    const timeline = document.getElementById("timeline");
    const timelineColor = 'lightblue';
    const textColor = 'lightblue';
    timeline.innerHTML = "";
    
    const line = document.createElementNS('http://www.w3.org/2000/svg','line')
    const svgWidth = 500 
    const radius = 4;
    const margin = radius +20;
    const lineWidth = svgWidth-margin*2;
    const firstRC = (()=>{
        return times.reduce((minimum, time) => time < minimum ? time : minimum, times[0]);
    })()
    const timespan = times[times.length-1]-firstRC;
    line.setAttributeNS(null, 'x1',   margin);
    line.setAttributeNS(null, 'x2', lineWidth+margin);
    line.setAttributeNS(null, 'y1',   50);
    line.setAttributeNS(null, 'y2',   50);
    line.setAttributeNS(null, 'stroke', timelineColor);
    line.setAttributeNS(null, 'stroke-width', 1.5);
    document.getElementById("timeline").appendChild(line);
    for (i=0; i<times.length;i++){  
        const percentage = (times[i]-firstRC)/timespan || 0;
        const text = document.createElementNS('http://www.w3.org/2000/svg','text');      
        text.setAttributeNS(null, 'x', (percentage * lineWidth + margin));
        text.setAttributeNS(null, 'y', 50-radius-4);
        text.setAttributeNS(null, 'id', 't'+i);
        text.setAttribute('fill', textColor);
        text.textContent = epochToTime(times[i]);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle.setAttributeNS(null, 'cx', (percentage * lineWidth + margin));
        circle.setAttributeNS(null, 'cy', 50)
        circle.setAttributeNS(null, 'r', radius)
        circle.setAttributeNS(null, 'id', "c"+i)
        circle.setAttributeNS(null, 'fill', timelineColor);
        
        timeline.appendChild(circle);
        timeline.appendChild(text);
        text.setAttribute('transform',`translate(-${text.getBBox().width/2},0)`);
        text.setAttributeNS(null, 'display', 'none');
    }
    // tooltip
    timeline.addEventListener('mouseenter', (e)=>{
        if(e.target.tagName=="circle"){ 
            e.target.setAttribute('stroke', timelineColor)
            e.target.setAttribute('stroke-width', `${radius*.6}`)
            id = e.target.id.substring(1); 
            elem = document.getElementById('t'+id); 
            elem.setAttribute('display','block'); 
        }
    }
    , true)
    timeline.addEventListener('mouseleave', (e)=>{
        if(e.target.tagName=="circle"){
            e.target.setAttribute('stroke-width', `none`)
            id = e.target.id.substring(1); 
            elem = document.getElementById('t'+id);
            elem.setAttribute('display','none'); 
        }
    }
    , true)
    console.log("timeline updated");
}
    