
const state={
  interventions:[], neighborhoods:null, selectedFeature:null, selectedLayer:null,
  signals:[], placedInterventions:[], pendingLatLng:null, activeIntervention:null,
  analysis:{}
};

const THEME_COLORS={
  Algemeen:"#7f8b9a",Buurt:"#e8b13c",Route:"#6ca45a",
  Woonblok:"#4f8fb8",Drempelzone:"#dc7d58",Woning:"#bf6874"
};

const map=L.map("map",{zoomControl:true}).setView([52.37,4.90],13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
  maxZoom:19,attribution:"© OpenStreetMap contributors"
}).addTo(map);

const neighborhoodsLayer=L.geoJSON(null,{
  style:f=>({color:"#286f7f",weight:1.2,fillColor:"#5aa2af",fillOpacity:.10}),
  onEachFeature:(f,l)=>{
    l.on("click",()=>selectNeighborhood(f,l));
    l.bindTooltip(neighborhoodName(f),{sticky:true});
  }
}).addTo(map);

const signalLayer=L.layerGroup().addTo(map);
const interventionLayer=L.layerGroup().addTo(map);

function neighborhoodName(feature){
  const p=feature.properties||{};
  return p.buurtnaam||p.naam||p.statnaam||p.bu_naam||p.BU_NAAM||"Onbekende buurt";
}

function deterministicScore(text,offset=0){
  let h=2166136261;
  for(const c of text){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}
  return 35+Math.abs((h+offset*7919)%61);
}

function propertyValue(props,candidates){
  const entries=Object.entries(props||{});
  for(const candidate of candidates){
    const hit=entries.find(([k])=>k.toLowerCase().includes(candidate));
    if(hit&&hit[1]!==null&&hit[1]!=="")return hit[1];
  }
  return null;
}

function deriveAnalysis(feature){
  const name=neighborhoodName(feature);
  const props=feature.properties||{};
  const residents=propertyValue(props,["aantal_inwoners","inwoners","bevolking"]);
  const density=propertyValue(props,["bevolkingsdichtheid","dichtheid"]);
  return {
    residents: residents||"–",
    density: density||"–",
    traffic:deterministicScore(name,1),
    safety:deterministicScore(name,2),
    cohesion:deterministicScore(name,3),
    livability:deterministicScore(name,4),
    green:deterministicScore(name,5),
    meeting:deterministicScore(name,6)
  };
}

function selectNeighborhood(feature,layer){
  if(state.selectedLayer)state.selectedLayer.setStyle({weight:1.2,fillOpacity:.10});
  state.selectedFeature=feature;state.selectedLayer=layer;
  layer.setStyle({weight:3,fillOpacity:.22});
  map.fitBounds(layer.getBounds(),{padding:[25,25],maxZoom:15});
  state.analysis=deriveAnalysis(feature);
  document.getElementById("selectedArea").classList.remove("empty");
  document.getElementById("selectedArea").innerHTML=
    `<strong>${escapeHtml(neighborhoodName(feature))}</strong><br>
     <span class="meta">${escapeHtml(feature.properties?.gemeentenaam||feature.properties?.gemeente||"CBS buurt 2025")}</span>`;
  renderAnalysis();renderToolbox();
}

async function loadNeighborhoods(){
  const b=map.getBounds();
  const bbox=[b.getWest(),b.getSouth(),b.getEast(),b.getNorth()].join(",");
  const status=document.getElementById("mapStatus");
  status.textContent="CBS-buurten laden…";
  try{
    const url=`https://api.pdok.nl/cbs/wijken-en-buurten-2025/ogc/v1/collections/buurten/items?bbox=${bbox}&limit=500&f=json`;
    const res=await fetch(url);
    if(!res.ok)throw new Error("PDOK response "+res.status);
    const geo=await res.json();
    neighborhoodsLayer.clearLayers().addData(geo);
    status.textContent=`${geo.features?.length||0} buurten geladen via PDOK`;
  }catch(err){
    console.warn(err);
    status.textContent="PDOK-buurtlaag kon niet laden. Controleer internet of probeer opnieuw.";
  }
}
let loadTimer;
map.on("moveend",()=>{clearTimeout(loadTimer);loadTimer=setTimeout(loadNeighborhoods,400)});
setTimeout(loadNeighborhoods,500);

async function searchPlace(){
  const q=document.getElementById("placeSearch").value.trim();if(!q)return;
  try{
    const url=`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${encodeURIComponent(q)}&rows=5`;
    const res=await fetch(url);const data=await res.json();
    const doc=data.response?.docs?.[0];
    if(!doc)throw new Error("Geen resultaat");
    const wkt=doc.centroide_ll||doc.centroide_rd;
    const m=wkt&&wkt.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
    if(!m)throw new Error("Geen coördinaat");
    map.setView([Number(m[2]),Number(m[1])],15);
  }catch(e){alert("Locatie niet gevonden of PDOK is niet bereikbaar.")}
}
document.getElementById("placeSearchBtn").onclick=searchPlace;
document.getElementById("placeSearch").addEventListener("keydown",e=>{if(e.key==="Enter")searchPlace()});

function renderAnalysis(){
  const container=document.getElementById("analysisCards");
  if(!state.selectedFeature){container.innerHTML='<div class="empty-state">Selecteer een buurt om het profiel te bekijken.</div>';return}
  const a=state.analysis;
  const items=[
    ["Verkeer",a.traffic,"Druk en oversteekbaarheid"],
    ["Veiligheid",a.safety,"Objectief + ervaren"],
    ["Sociale cohesie",a.cohesion,"Binding en wederkerigheid"],
    ["Leefbaarheid",a.livability,"Ervaren leefkwaliteit"],
    ["Groen",a.green,"Toegang, schaduw en verblijf"],
    ["Ontmoeting",a.meeting,"Potentie voor contact"]
  ];
  container.innerHTML=items.map(([label,value,sub])=>`
    <div class="metric-card">
      <div class="label">${label}</div><div class="value">${value}</div>
      <div class="bar"><span style="width:${value}%"></span></div>
      <div class="meta">${sub}</div>
    </div>`).join("");
  document.getElementById("analysisNotes").innerHTML=`
    <div class="analysis-note"><strong>Prototypeanalyse</strong><br>
    De scores zijn momenteel deterministische demodata. CBS-attributen worden waar beschikbaar gelezen;
    echte lagen voor Leefbaarometer, verkeer, veiligheid en groen worden in een volgende fase gekoppeld.</div>`;
}

function escapeHtml(value){
  return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
}

map.on("click",e=>{
  state.pendingLatLng=e.latlng;
  L.circleMarker(e.latlng,{radius:7,color:"#ca653b",fillColor:"#fff",fillOpacity:1,dashArray:"3 3"})
   .addTo(signalLayer).bindTooltip("Gekozen invoerlocatie").openTooltip();
});

function inferKeywords(text){
  const t=text.toLowerCase();
  const themes=[];
  const dictionary={
    veiligheid:["onveilig","donker","overlast","veilig"],
    verkeer:["auto","verkeer","oversteken","fiets","parkeren","druk"],
    groen:["groen","boom","schaduw","hitte","tuin","park"],
    ontmoeting:["ontmoet","bankje","plein","samen","contact","buurtkamer"],
    cohesie:["eenzaam","cohesie","buren","gemeenschap","verbinding"],
    toegankelijkheid:["rolstoel","toegankelijk","ouderen","lopen","drempel"]
  };
  for(const [k,words] of Object.entries(dictionary))if(words.some(w=>t.includes(w)))themes.push(k);
  return themes;
}

document.getElementById("addSignalBtn").onclick=()=>{
  const text=document.getElementById("participationText").value.trim();
  if(!text)return alert("Voeg eerst een observatie of citaat toe.");
  if(!state.pendingLatLng)return alert("Klik eerst op een locatie op de kaart.");
  const selected=document.getElementById("signalTheme").value;
  const inferred=inferKeywords(text);
  const signal={id:Date.now(),text,theme:selected,keywords:[...new Set([selected,...inferred])],
    lat:state.pendingLatLng.lat,lng:state.pendingLatLng.lng,source:"Handmatige invoer"};
  state.signals.push(signal);
  L.circleMarker([signal.lat,signal.lng],{radius:8,color:"#fff",weight:2,fillColor:"#ca653b",fillOpacity:1})
    .addTo(signalLayer).bindPopup(`<strong>${escapeHtml(signal.theme)}</strong><br>${escapeHtml(signal.text)}`);
  document.getElementById("participationText").value="";
  state.pendingLatLng=null;
  renderSignals();renderToolbox();activateTab("signals");
};

document.getElementById("docUpload").addEventListener("change",async e=>{
  const list=document.getElementById("documentList");
  const files=[...e.target.files];
  for(const file of files){
    let note=`${file.name} (${Math.round(file.size/1024)} kB)`;
    if(/\.(txt|csv|json)$/i.test(file.name)){
      const text=await file.text();
      const keywords=inferKeywords(text.slice(0,20000));
      note+=keywords.length?` — thema’s: ${keywords.join(", ")}`:"";
    }else if(/\.pdf$/i.test(file.name)){
      note+=" — PDF geregistreerd; tekstextractie volgt in backendfase";
    }
    const div=document.createElement("div");div.textContent=note;list.appendChild(div);
  }
});

function renderSignals(){
  const el=document.getElementById("signalList");
  if(!state.signals.length){el.innerHTML='<div class="empty-state">Nog geen signalen geplaatst.</div>';return}
  el.innerHTML=state.signals.map(s=>`
    <div class="signal-card"><h3>${escapeHtml(s.theme)}</h3>
      <div>${escapeHtml(s.text)}</div>
      <div class="tags">${s.keywords.map(k=>`<span class="tag">${escapeHtml(k)}</span>`).join("")}</div>
      <div class="tool-actions"><button onclick="zoomSignal(${s.id})">Bekijk op kaart</button></div>
    </div>`).join("");
}
window.zoomSignal=id=>{
  const s=state.signals.find(x=>x.id===id);if(s)map.setView([s.lat,s.lng],18);
};

function scoreIntervention(item){
  let score=0;
  const corpus=[item.title,item.description,item.theme,item.subtheme,item.type,...item.effects,...item.domains,...item.targets].join(" ").toLowerCase();
  const signalKeys=state.signals.flatMap(s=>s.keywords);
  signalKeys.forEach(k=>{if(corpus.includes(k))score+=4});
  if(state.selectedFeature){
    if(item.theme==="Buurt")score+=1;
    if(state.analysis.green<55&&/(groen|tuin|schaduw|klimaat)/i.test(corpus))score+=3;
    if(state.analysis.safety<55&&/(veilig|zicht|verlicht|route)/i.test(corpus))score+=3;
    if(state.analysis.cohesion<55&&/(cohesie|gemeenschap|buren|ontmoet)/i.test(corpus))score+=3;
    if(state.analysis.meeting<55&&/(ontmoet|verblijf|bank|plein)/i.test(corpus))score+=3;
  }
  return score;
}

function renderToolbox(){
  const q=document.getElementById("toolboxSearch").value.trim().toLowerCase();
  const theme=document.getElementById("themeFilter").value;
  const source=document.getElementById("sourceFilter").value;
  let items=state.interventions.map(i=>({...i,relevance:scoreIntervention(i)}))
    .filter(i=>!theme||i.theme===theme)
    .filter(i=>!source||i.source===source)
    .filter(i=>!q||[i.title,i.description,i.theme,i.subtheme,...i.effects,...i.targets].join(" ").toLowerCase().includes(q))
    .sort((a,b)=>b.relevance-a.relevance||a.title.localeCompare(b.title))
    .slice(0,40);
  document.getElementById("recommendationSummary").textContent=
    state.signals.length
      ?`Gerangschikt op basis van ${state.signals.length} lokaal signaal/signalen en het buurtprofiel.`
      :"Gerangschikt op basis van het geselecteerde buurtprofiel; voeg lokale signalen toe voor preciezere aanbevelingen.";
  document.getElementById("toolboxList").innerHTML=items.map(i=>`
    <div class="tool-card">
      <h3>${escapeHtml(i.title)}</h3>
      <div class="meta">${escapeHtml(i.theme)} · ${escapeHtml(i.type)} · ${escapeHtml(i.source)}</div>
      <div class="tags">${i.effects.slice(0,4).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
      <div class="tool-actions"><button onclick="openIntervention('${escapeHtml(i.id)}')">Details</button></div>
    </div>`).join("");
}

window.openIntervention=id=>{
  const item=state.interventions.find(i=>i.id===id);if(!item)return;
  state.activeIntervention=item;
  document.getElementById("dialogContent").innerHTML=`
    <h2>${escapeHtml(item.title)}</h2>
    <div class="meta">${escapeHtml(item.theme)} · ${escapeHtml(item.type)} · ${escapeHtml(item.source)} · p. ${escapeHtml(item.page)}</div>
    <p>${escapeHtml(item.description)}</p>
    <strong>Sociale effecten</strong>
    <div class="tags">${item.effects.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
    <strong>Doelgroepen</strong>
    <div class="tags">${item.targets.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
    <strong>Toepassingsdomein</strong>
    <div class="tags">${item.domains.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>`;
  document.getElementById("interventionDialog").showModal();
};

document.getElementById("pinInterventionBtn").onclick=()=>{
  if(!state.activeIntervention)return;
  if(!state.pendingLatLng)return alert("Klik eerst op een locatie op de kaart.");
  const p={...state.activeIntervention,lat:state.pendingLatLng.lat,lng:state.pendingLatLng.lng,placedAt:new Date().toISOString()};
  state.placedInterventions.push(p);
  L.circleMarker([p.lat,p.lng],{radius:9,color:"#fff",weight:2,fillColor:"#7655a8",fillOpacity:1})
    .addTo(interventionLayer).bindPopup(`<strong>${escapeHtml(p.title)}</strong><br>${escapeHtml(p.description)}`);
  state.pendingLatLng=null;
  document.getElementById("interventionDialog").close();
};

function activateTab(name){
  document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));
  document.querySelectorAll(".tab-content").forEach(c=>c.classList.remove("active"));
  document.getElementById(name+"Tab").classList.add("active");
}
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>activateTab(b.dataset.tab));

document.getElementById("toolboxSearch").oninput=renderToolbox;
document.getElementById("themeFilter").onchange=renderToolbox;
document.getElementById("sourceFilter").onchange=renderToolbox;

document.getElementById("exportBtn").onclick=()=>{
  const project={
    exportedAt:new Date().toISOString(),
    neighborhood:state.selectedFeature?.properties||null,
    analysis:state.analysis,signals:state.signals,
    interventions:state.placedInterventions
  };
  const blob=new Blob([JSON.stringify(project,null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);
  a.download="buurt-toolbox-project.json";a.click();URL.revokeObjectURL(a.href);
};

document.getElementById("resetBtn").onclick=()=>{
  if(!confirm("Projectgegevens in deze sessie wissen?"))return;
  state.signals=[];state.placedInterventions=[];state.pendingLatLng=null;
  signalLayer.clearLayers();interventionLayer.clearLayers();
  renderSignals();renderToolbox();
};

async function init(){
  state.interventions=await fetch("data/interventions.json").then(r=>r.json());
  const themes=[...new Set(state.interventions.map(i=>i.theme))].sort();
  const sources=[...new Set(state.interventions.map(i=>i.source))].sort();
  document.getElementById("themeFilter").innerHTML='<option value="">Alle thema’s</option>'+
    themes.map(x=>`<option>${escapeHtml(x)}</option>`).join("");
  document.getElementById("sourceFilter").innerHTML='<option value="">Alle bronnen</option>'+
    sources.map(x=>`<option>${escapeHtml(x)}</option>`).join("");
  renderToolbox();
}
init();
