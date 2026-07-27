const modules=[
{name:'Groen & klimaat',icon:'🌳'},{name:'Sociale veiligheid',icon:'👀'},{name:'Ontmoeting',icon:'◉'},
{name:'Mobiliteit',icon:'↔'},{name:'Voorzieningen',icon:'⌂'},{name:'Demografie',icon:'◎'},
{name:'Openbare ruimte',icon:'▦'},{name:'Participatie',icon:'◌'}];

const scores=[
{name:'Groen',value:46},{name:'Veiligheid',value:58},{name:'Ontmoeting',value:37},{name:'Mobiliteit',value:71},
{name:'Leefbaarheid',value:63},{name:'Klimaat',value:42},{name:'Voorzieningen',value:68},{name:'Sociale cohesie',value:49}
];

const issues=[
{title:'Gebrek aan informele ontmoetingsplekken',urgency:'Hoog',text:'Veel dagelijkse passage, maar weinig plekken om kort of langer te verblijven.'},
{title:'Onvoldoende schaduw en verkoeling',urgency:'Hoog',text:'Laag boomkroondek en veel verharding langs belangrijke looproutes.'},
{title:'Zwakke ogen op straat',urgency:'Middel',text:'Lange gesloten plinten en weinig entrees aan de openbare ruimte.'},
{title:'Onveilige oversteekbaarheid',urgency:'Middel',text:'Brede rijbaan vormt een barrière tussen woningen en voorzieningen.'},
{title:'Versnipperde groene ruimte',urgency:'Middel',text:'Groen is aanwezig, maar mist samenhang, verblijfskwaliteit en biodiversiteit.'}
];

const opportunities=[
{
id:1,title:'Koele ontmoetingsplek',theme:'groen',confidence:91,lat:52.3667,lng:4.8351,
indicators:{'Boomdekking':'9%','Verharding':'81%','Voorzieningen binnen 200 m':'4','Kwetsbare groepen':'hoog'},
diagnosis:'De locatie heeft weinig schaduw, veel verharding en ligt op een dagelijkse looproute.',
challenge:'Creëer een koele verblijfsplek waar dagelijkse bewegingen kunnen uitgroeien tot ontmoeting.',
evidence:['Boomdekking ligt onder de drempelwaarde van 15%','Verharding ligt boven 70%','Vier dagelijkse voorzieningen liggen binnen 200 meter'],
interventions:['Klimaatbank','Regentuin','Drinkwaterpunt','Speelaanleiding']
},
{
id:2,title:'Ogen op straat versterken',theme:'veiligheid',confidence:88,lat:52.3653,lng:4.8316,
indicators:{'Actieve entrees':'laag','Blinde gevel':'47 m','Avondfuncties':'weinig','Participatiesignalen':'3'},
diagnosis:'Een lange gesloten gevel en lage avondactiviteit beperken sociale controle.',
challenge:'Maak de relatie tussen gebouw en straat actiever, transparanter en beter leesbaar.',
evidence:['Gevelzone langer dan 40 meter zonder entree','Weinig functies na 18:00','Meerdere signalen over een donkere route'],
interventions:['Nieuwe entrees','Transparante plint','Gevelzitplek','Warme verlichting']
},
{
id:3,title:'Buurtkamer aan plein',theme:'ontmoeting',confidence:86,lat:52.3681,lng:4.8328,
indicators:{'Dagelijkse bestemmingen':'3','Passanten':'hoog','Verblijfsplekken':'laag','OV-afstand':'65 m'},
diagnosis:'Veel dagelijkse routes kruisen elkaar, maar er ontbreekt een laagdrempelige verblijfsplek.',
challenge:'Koppel een collectieve binnen-buitenruimte aan bestaande voorzieningen en loopstromen.',
evidence:['Drie dagelijkse bestemmingen binnen 100 meter','Hoge voetgangersintensiteit','Geen openbaar toegankelijke binnenruimte'],
interventions:['Buurtkamer','Open plint','Buurtkast','Flexibel terras']
},
{
id:4,title:'Veilige oversteek',theme:'mobiliteit',confidence:84,lat:52.3675,lng:4.8387,
indicators:{'Oversteeklengte':'14 m','Schoolroute':'ja','Zichtafstand':'beperkt','Verkeersdruk':'middel'},
diagnosis:'Een brede rijbaan en beperkt zicht maken de route naar voorzieningen minder veilig.',
challenge:'Verkort de oversteek en maak de schoolroute herkenbaar, langzaam en overzichtelijk.',
evidence:['Oversteeklengte is groter dan wenselijk','Veel informele oversteekbewegingen','Parkeren beperkt zicht op aankomend verkeer'],
interventions:['Middeneiland','Stoepuitstulping','Verhoogd plateau','Routeverlichting']
},
{
id:5,title:'Pocket park in restzone',theme:'groen',confidence:80,lat:52.3639,lng:4.8369,
indicators:{'Verharding':'76%','Gebruik':'laag','Wateropvang':'laag','Biodiversiteit':'laag'},
diagnosis:'Een verharde restzone heeft weinig gebruikswaarde en draagt niet bij aan klimaatadaptatie.',
challenge:'Transformeer de restzone tot een compacte groene plek voor verblijf, infiltratie en biodiversiteit.',
evidence:['Hoge verhardingsgraad','Geen speel- of verblijfsfunctie','Regenwater kan lokaal worden benut'],
interventions:['Pocket park','Wadi','Inheemse beplanting','Picknicktafel']
},
{
id:6,title:'Collectieve voortuin',theme:'ontmoeting',confidence:78,lat:52.3648,lng:4.8402,
indicators:{'Gevelafstand':'11 m','Toe-eigening':'laag','Woningen':'68','Entrees':'weinig'},
diagnosis:'De brede overgangszone tussen woning en straat is anoniem en nauwelijks geprogrammeerd.',
challenge:'Maak van de setback een collectieve overgangsruimte die contact en toe-eigening ondersteunt.',
evidence:['Grote afstand tussen gevel en looproute','Weinig persoonlijke toe-eigening','Veel woningen kijken uit op dezelfde zone'],
interventions:['Geveltuinen','Deelbank','Bloembakken','Entreecluster']
},
{
id:7,title:'Avondroute verbeteren',theme:'veiligheid',confidence:75,lat:52.3690,lng:4.8370,
indicators:{'Verlichting':'ongelijk','Zichtlijnen':'beperkt','Avondfuncties':'laag','OV-route':'ja'},
diagnosis:'Een belangrijke avondroute heeft beperkte zichtlijnen en weinig sociale activiteit.',
challenge:'Vergroot de leesbaarheid en sociale veiligheid tussen OV en woningen.',
evidence:['Route verbindt OV en woningen','Beplanting beperkt zicht','Weinig actieve functies in de avond'],
interventions:['Gelijkmatige verlichting','Snoeien zichtlijnen','Oriëntatiepunten','Nachtactieve plint']
},
{
id:8,title:'Schoolstraat als verblijfsplek',theme:'mobiliteit',confidence:73,lat:52.3660,lng:4.8289,
indicators:{'Piekverkeer':'hoog','School':'direct','Wachtruimte':'laag','Autodominantie':'hoog'},
diagnosis:'Haal- en brengmomenten veroorzaken een korte maar intensieve verkeerspiek.',
challenge:'Combineer verkeersveiligheid met ruimte voor wachten, spelen en ontmoeten.',
evidence:['Korte maar intensieve verkeerspiek','Veel ouders wachten op de stoep','Openbare ruimte wordt vooral door auto’s bepaald'],
interventions:['Tijdelijke afsluiting','Speelmarkering','Wachtbank','Fietsparkeren']
}];

const library=[
['Groen','Klimaatbank','Zitplek, schaduw en sociale ontmoeting in één ingreep.'],
['Groen','Pocket park','Kleine groene verblijfsplek in een onderbenutte restzone.'],
['Veiligheid','Ogen op straat','Meer entrees, transparantie en actieve functies aan de straat.'],
['Veiligheid','Gelijkmatige verlichting','Verlicht gezichten, routes en kruispunten zonder verblinding.'],
['Ontmoeting','Buurtkamer','Laagdrempelige collectieve binnen-buitenplek voor dagelijks gebruik.'],
['Ontmoeting','Gevelbank','Kleine zitplek op de overgang tussen privé en openbaar.'],
['Mobiliteit','Veilige oversteek','Kortere oversteek, lagere snelheid en betere zichtbaarheid.'],
['Mobiliteit','Schoolstraat','Tijdelijk autoluwe ruimte voor veilig halen, brengen en ontmoeten.'],
['Klimaat','Regentuin','Lokale infiltratie gecombineerd met beplanting en verblijfskwaliteit.']
];

let markers=[];
let analysisDone=false;
let selectedOpportunityId=null;

const map=L.map('map',{zoomControl:false}).setView([52.3665,4.835],15);
L.control.zoom({position:'bottomright'}).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map);
const boundary=L.polygon([[52.3712,4.8271],[52.3714,4.8409],[52.3658,4.8441],[52.3614,4.8398],[52.3619,4.8290],[52.3660,4.8259]],
{color:'#b85656',weight:2,fillColor:'#b85656',fillOpacity:.05,dashArray:'6 5'}).addTo(map);
map.fitBounds(boundary.getBounds(),{padding:[45,45]});

function themeLabel(theme){return theme.charAt(0).toUpperCase()+theme.slice(1)}
function renderModules(){
 document.getElementById('moduleList').innerHTML=modules.map((m,i)=>`
 <div class="module-item" data-module="${i}">
   <div class="module-icon">${m.icon}</div>
   <div class="module-copy"><strong>${m.name}</strong><small>Voorbeeldindicatoren</small></div>
   <span class="module-state">Gereed</span>
 </div>`).join('');
}
function renderOverview(){
 document.getElementById('scoreGrid').innerHTML=scores.map(s=>`
 <div class="score-card">
   <div class="score-card-top"><strong>${s.name}</strong><span class="score-value">${s.value}</span></div>
   <div class="mini-track"><div class="mini-fill" style="width:${s.value}%"></div></div>
 </div>`).join('');
}
function renderIssues(){
 document.getElementById('issueList').innerHTML=issues.map((item,i)=>`
 <div class="issue-card">
   <div class="issue-rank">${i+1}</div>
   <div><h3>${item.title}</h3><p>${item.text}</p></div>
   <span class="urgency">${item.urgency}</span>
 </div>`).join('');
}
function renderOpportunities(){
 document.getElementById('opportunityList').innerHTML=opportunities.map(o=>`
 <div class="opportunity-card" data-id="${o.id}">
   <div class="opportunity-top">
     <div><span class="theme-pill theme-${o.theme}">${themeLabel(o.theme)}</span><h3>${o.title}</h3></div>
     <span class="confidence">${o.confidence}%</span>
   </div>
   <p>${o.diagnosis}</p>
   <div class="chips">${Object.entries(o.indicators).slice(0,3).map(([k,v])=>`<span>${k}: ${v}</span>`).join('')}</div>
 </div>`).join('');
 document.querySelectorAll('.opportunity-card').forEach(card=>card.addEventListener('click',()=>openOpportunity(+card.dataset.id)));
}
function renderLibrary(){
 document.getElementById('libraryGrid').innerHTML=library.map(item=>`
 <div class="library-item">
   <span class="theme-pill theme-${item[0].toLowerCase()==='klimaat'?'groen':item[0].toLowerCase()}">${item[0]}</span>
   <h3>${item[1]}</h3><p>${item[2]}</p>
 </div>`).join('');
}
renderModules();renderOverview();renderIssues();renderOpportunities();renderLibrary();

function switchPanel(id){
 document.querySelectorAll('.panel-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===id));
 document.querySelectorAll('.panel-view').forEach(v=>v.classList.toggle('active',v.id===id));
}
document.querySelectorAll('.panel-tab').forEach(t=>t.addEventListener('click',()=>switchPanel(t.dataset.tab)));
document.querySelectorAll('[data-switch]').forEach(b=>b.addEventListener('click',()=>switchPanel(b.dataset.switch)));

function clearMarkers(){markers.forEach(m=>map.removeLayer(m));markers=[]}
function addMarkers(){
 clearMarkers();
 opportunities.forEach(o=>{
   const icon=L.divIcon({className:'',html:`<div class="opportunity-marker marker-${o.theme}"></div>`,iconSize:[24,24],iconAnchor:[12,12]});
   const marker=L.marker([o.lat,o.lng],{icon}).addTo(map);
   marker.theme=o.theme;marker.opportunityId=o.id;
   marker.bindTooltip(`<strong>${o.title}</strong><br>${o.confidence}% potentie`,{direction:'top'});
   marker.on('click',()=>openOpportunity(o.id));
   markers.push(marker);
 });
}
function filterMarkers(theme){
 markers.forEach(marker=>{
   const show=theme==='all'||marker.theme===theme;
   if(show&&!map.hasLayer(marker))marker.addTo(map);
   if(!show&&map.hasLayer(marker))map.removeLayer(marker);
 });
}
document.querySelectorAll('.map-action').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.map-action').forEach(b=>b.classList.remove('active'));
 btn.classList.add('active');
 if(analysisDone)filterMarkers(btn.dataset.theme);
}));

function runAnalysis(){
 if(analysisDone){switchPanel('overview');return}
 const overlay=document.getElementById('analysisOverlay');
 const bar=document.getElementById('progressBar');
 const steps=document.getElementById('analysisSteps');
 const status=document.getElementById('analysisStatus');
 const button=document.getElementById('runAnalysis');
 overlay.classList.remove('hidden');button.disabled=true;
 steps.innerHTML=modules.map((m,i)=>`<div class="analysis-step" data-step="${i}">○ ${m.name}</div>`).join('');
 let i=0;
 const timer=setInterval(()=>{
   bar.style.width=Math.round(((i+1)/modules.length)*100)+'%';
   status.textContent=`${modules[i].name} analyseren…`;
   const step=document.querySelector(`[data-step="${i}"]`);
   step.classList.add('done');step.textContent=`✓ ${modules[i].name}`;
   const module=document.querySelector(`[data-module="${i}"]`);
   module.classList.add('done');module.querySelector('.module-state').textContent='Geanalyseerd';
   i++;
   if(i===modules.length){
     clearInterval(timer);
     setTimeout(()=>{
       overlay.classList.add('hidden');button.disabled=false;analysisDone=true;
       document.getElementById('emptyState').classList.add('hidden');
       document.getElementById('overviewResults').classList.remove('hidden');
       document.getElementById('summaryScore').textContent='58';
       document.getElementById('summaryIssues').textContent=issues.length;
       document.getElementById('summaryOpportunities').textContent=opportunities.length;
       addMarkers();switchPanel('overview');
     },500);
   }
 },300);
}
document.getElementById('runAnalysis').addEventListener('click',runAnalysis);

function openOpportunity(id){
 selectedOpportunityId=id;
 const o=opportunities.find(x=>x.id===id);
 document.getElementById('drawerContent').innerHTML=`
 <span class="theme-pill theme-${o.theme}">${themeLabel(o.theme)}</span>
 <h2>${o.title}</h2>
 <p>${o.challenge}</p>
 <div class="data-grid">${Object.entries(o.indicators).map(([k,v])=>`
   <div class="data-card"><strong>${v}</strong><small>${k}</small></div>`).join('')}</div>
 <div class="reasoning-flow">
   <div class="reason-step"><span>1 · DATA</span><strong>${o.evidence.join(' · ')}</strong></div>
   <div class="reason-step"><span>2 · DIAGNOSE</span><strong>${o.diagnosis}</strong></div>
   <div class="reason-step"><span>3 · ONTWERPOPGAVE</span><strong>${o.challenge}</strong></div>
 </div>
 <h3>Aanbevolen interventies</h3>
 <div class="intervention-grid">${o.interventions.map((x,i)=>`
   <div class="intervention-card"><strong>${x}</strong><small>Toolbox-match ${Math.max(70,o.confidence-i*4)}%</small></div>`).join('')}</div>
 `;
 document.getElementById('detailDrawer').classList.remove('hidden');
 map.setView([o.lat,o.lng],17);
}
document.getElementById('closeDrawer').addEventListener('click',()=>document.getElementById('detailDrawer').classList.add('hidden'));

document.getElementById('openLibrary').addEventListener('click',()=>document.getElementById('libraryModal').classList.remove('hidden'));
document.getElementById('closeLibrary').addEventListener('click',()=>document.getElementById('libraryModal').classList.add('hidden'));
document.getElementById('libraryModal').addEventListener('click',e=>{if(e.target.id==='libraryModal')e.currentTarget.classList.add('hidden')});

document.getElementById('mapSearch').addEventListener('input',e=>{
 const q=e.target.value.toLowerCase().trim();
 document.querySelectorAll('.opportunity-card').forEach(card=>{
   const o=opportunities.find(x=>x.id===+card.dataset.id);
   card.style.display=(!q||o.title.toLowerCase().includes(q)||o.theme.includes(q)||o.interventions.join(' ').toLowerCase().includes(q))?'block':'none';
 });
});

const chatPanel=document.getElementById('chatPanel');
const chatMessages=document.getElementById('chatMessages');
const chatInput=document.getElementById('chatInput');
document.getElementById('chatToggle').addEventListener('click',()=>{chatPanel.classList.remove('hidden');chatInput.focus()});
document.getElementById('closeChat').addEventListener('click',()=>chatPanel.classList.add('hidden'));

function normalize(text){return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function addChat(role,text){
 const el=document.createElement('div');el.className=`chat-message ${role}`;
 el.innerHTML=role==='assistant'?`<span class="chat-bubble-icon">✦</span><div></div>`:`<div></div>`;
 el.querySelector('div').textContent=text;chatMessages.appendChild(el);chatMessages.scrollTop=chatMessages.scrollHeight;
}
function best(theme){return [...opportunities].filter(o=>!theme||o.theme===theme).sort((a,b)=>b.confidence-a.confidence)[0]}
function explain(o){
 return `${o.title} heeft een potentiescore van ${o.confidence}%.\n\nDiagnose:\n${o.diagnosis}\n\nOnderbouwing:\n${o.evidence.map(x=>'• '+x).join('\n')}\n\nOntwerpinterventies:\n${o.interventions.map(x=>'• '+x).join('\n')}`;
}
function answerQuestion(question){
 const q=normalize(question);
 if(q.includes('belangrijkste opgave')||q.includes('wat zijn de opgaven'))return{txt:`De belangrijkste opgaven zijn:\n\n${issues.map((x,i)=>`${i+1}. ${x.title}`).join('\n')}\n\nDeze rangschikking is gebaseerd op transparante voorbeeldregels.`};
 if(q.includes('toon')&&(q.includes('groen')||q.includes('groene')))return{txt:'Ik toon alleen de groene kansen op de kaart.',action:()=>filterMarkers('groen')};
 if(q.includes('toon')&&q.includes('veiligheid'))return{txt:'Ik toon alleen de veiligheidskansen.',action:()=>filterMarkers('veiligheid')};
 if(q.includes('toon')&&q.includes('ontmoeting'))return{txt:'Ik toon alleen de kansen voor ontmoeting.',action:()=>filterMarkers('ontmoeting')};
 if(q.includes('toon alles')||q.includes('alle kansen'))return{txt:'Ik toon alle kansrijke locaties.',action:()=>filterMarkers('all')};
 if(q.includes('beste plek voor ontmoeting')||q.includes('beste ontmoetingsplek')){const o=best('ontmoeting');return{txt:explain(o),action:()=>openOpportunity(o.id)}}
 if(q.includes('hittestress')||q.includes('beste groene')){const o=best('groen');return{txt:explain(o),action:()=>openOpportunity(o.id)}}
 if(q.includes('waarom')&&selectedOpportunityId){const o=opportunities.find(x=>x.id===selectedOpportunityId);return{txt:explain(o)}}
 if(q.includes('data ontbreekt')||q.includes('welke data'))return{txt:'Voor een echte analyse ontbreken nog actuele BGT-oppervlakken, BAG-gebouwkenmerken, CBS-demografie, bomen- en schaduwdata en gevalideerde participatiesignalen.'};
 return{txt:'Ik kan vragen beantwoorden over opgaven, groen, veiligheid, ontmoeting, mobiliteit, geselecteerde pins en ontbrekende data.'};
}
document.getElementById('chatForm').addEventListener('submit',e=>{
 e.preventDefault();const q=chatInput.value.trim();if(!q)return;addChat('user',q);chatInput.value='';
 const result=answerQuestion(q);setTimeout(()=>{addChat('assistant',result.txt);if(result.action)result.action()},250);
});
document.querySelectorAll('#chatSuggestions button').forEach(b=>b.addEventListener('click',()=>{chatInput.value=b.textContent;document.getElementById('chatForm').requestSubmit()}));