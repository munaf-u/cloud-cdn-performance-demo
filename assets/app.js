const runButton=document.getElementById('measure');
const clearButton=document.getElementById('clear');
const results=document.getElementById('results');
const statusLine=document.getElementById('status');
runButton.addEventListener('click', async()=>{
  runButton.disabled=true;
  statusLine.textContent='Measuring requests…';
  results.innerHTML='';
  const rows=[];
  for(let i=1;i<=5;i++){
    try{
      const url='/assets/test.svg?measurement='+Date.now()+'-'+i;
      const start=performance.now();
      const response=await fetch(url,{cache:'no-store'});
      await response.blob();
      const duration=(performance.now()-start).toFixed(2);
      const entry=performance.getEntriesByName(new URL(url,location.href).href).slice(-1)[0];
      rows.push({i,duration,size:entry?entry.transferSize:'Not available'});
    }catch(e){rows.push({i,duration:'Request failed',size:'—'});}
  }
  results.innerHTML=rows.map(r=>`<tr><td>${r.i}</td><td>${r.duration}</td><td>${r.size}</td></tr>`).join('');
  statusLine.textContent='Finished. Inspect Network → test.svg response headers for CDN evidence.';
  runButton.disabled=false;
});
clearButton.addEventListener('click',()=>{
  results.innerHTML='<tr><td colspan="3">No measurements yet.</td></tr>';
  statusLine.textContent='Ready to measure.';
});
