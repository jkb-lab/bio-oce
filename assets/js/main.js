// SYLLABUS_START
const weeks = [
  {w:1,title:"Intros & Origin of Earth",ch:"(Ch. 1; App. III)",topics:["Course intro; what is oceanography (1.1)","History of exploration; scientific inquiry (1.2-1.3)","Origin of Earth, oceans and life; latitude and longitude (1.4-1.7; App. III)"]},
  {w:2,title:"Plate Tectonics",ch:"(Ch. 2)",topics:["Evidence for continental drift and plate tectonics (2.1-2.2)","Plate boundary features (2.3)","Hotspots, seamounts, coral reefs; past and future Earth (2.4-2.6)"]},
  {w:3,title:"Marine Provinces & Marine Sediments and Geochemistry",ch:"(Ch. 3 & Ch. 4)",topics:["Mapping the seafloor; hypsographic curve; continental margins (3.1-3.3)","Deep-ocean basins and mid-ocean ridges (3.4-3.5)","Marine sediments: types, distribution, resources (4.1-4.8)"]},
  {w:4,title:"Physical and Chemical Properties of Water",ch:"(Ch. 5)",topics:["Unusual properties of water (5.1-5.2)","Salinity and seawater pH (5.3-5.5)","Temperature, salinity and density structure; desalination (5.6-5.8)"]},
  {w:5,title:"Exam 1",ch:"(Ch. 1-5)",topics:["Review: Ch. 1-2","Review: Ch. 3-4","Review: Ch. 5"]},
  {w:6,title:"Air Sea Interactions & Ocean Circulation",ch:"(Ch. 6 & Ch. 7)",topics:["Seasons, solar heating, Coriolis, global winds (6.1-6.5)","Ocean-driven weather and climate incl. ENSO; sea ice (6.6-6.7)","Surface currents, upwelling, deep circulation (7.1-7.5)"]},
  {w:7,title:"Waves",ch:"(Ch. 8)",topics:["Wave causes, motion, characteristics (8.1-8.3)","Wind waves, surf zone, rogue waves (8.4-8.5)","Tsunami; wave power (8.6-8.7)"]},
  {w:8,title:"Tides",ch:"(Ch. 9)",topics:["Tide-generating forces; monthly cycle (9.1-9.2)","Tides in the ocean; tidal patterns (9.3-9.4)","Coastal tidal phenomena; tidal power (9.5-9.6)"]},
  {w:9,title:"Coastal Geomorphodynamics",ch:"(Ch. 10)",topics:["Coastal regions; sand movement (10.1-10.2)","Erosional and depositional features; sea level change (10.3-10.4)","U.S. coasts; hard stabilization and alternatives (10.5-10.7)"]},
  {w:10,title:"Exam 2",ch:"(Ch. 6-10)",topics:["Review: Ch. 6-7","Review: Ch. 8-9","Review: Ch. 10"]},
  {w:11,title:"Biological Oceanography I",ch:"(Ch. 12)",topics:["Classification of life; marine species diversity (12.1-12.3)","Adaptations to the physical environment (12.4)","Divisions of the marine environment (12.5)"]},
  {w:12,title:"Biological Oceanography II",ch:"(Ch. 13)",topics:["Primary productivity; photosynthetic organisms (13.1-13.2)","Regional productivity; nutrients (13.3)","Energy transfer, feeding relationships, fisheries (13.4-13.6)"]},
  {w:13,title:"Marine Biology I & II",ch:"(Ch. 14; Ch. 15 survey)",topics:["Pelagic adaptations: buoyancy, locomotion, predator avoidance (14.1-14.3)","Marine mammals; gray whale migration (14.4-14.5)","Benthic communities: rocky shore, sediment, deep sea (15.1-15.5)"]},
  {w:14,title:"Marine Pollution & The Oceans and Climate Change",ch:"(Ch. 11 & Ch. 16)",topics:["Ocean ownership, coastal waters, wetlands (11.1-11.4)","Marine pollution (11.5-11.6)","Climate system, greenhouse effect, ocean changes, solutions (16.1-16.5)"]},
  {w:15,title:"Exam 3",ch:"(Ch. 11-16)",topics:["Review: Ch. 11-12","Review: Ch. 13-14","Review: Ch. 15-16"]},
  {w:16,title:"Comprehensive Final Exam",ch:"(ALL)",topics:["Cumulative: equal content from Exams 1-3"]}
];
// SYLLABUS_END

const ensoData = {
  la:{label:'La Niña / Neutral',sst:[14.2,13.8,13.5,13.1,13.4,13.7,14.0,14.5,15.2,15.8,15.1,14.6],chl:[4.2,5.8,7.1,8.4,7.9,6.3,5.1,4.4,3.8,3.2,3.6,4.0],color:'#185FA5',desc:`<strong>La Niña / neutral:</strong> Strong trade winds push warm water west. Thermocline shoals off California — cold, nutrient-rich water upwells easily. Phytoplankton biomass elevated; diatoms dominate (<em>Pseudo-nitzschia</em>, <em>Chaetoceros</em>). High cell counts on IFCB. Fuels anchovy, sardine, krill, seabirds.`},
  el:{label:'El Niño 2015–16',sst:[16.8,17.2,17.5,17.9,18.3,18.1,17.6,17.2,16.9,16.4,16.1,16.5],chl:[1.4,1.8,2.0,1.6,1.5,1.7,1.9,1.8,1.6,1.5,1.6,1.5],color:'#E24B4A',desc:`<strong>El Niño 2015–16 (record strength):</strong> SSTs off California +2–3°C above average. Thermocline deepened to ~80–100 m. Upwelling drew from warm, nutrient-depleted layer. Diatom abundance collapsed; community shifted to small dinoflagellates. Sea lion strandings spiked; seabird breeding failures widespread.`},
  now:{label:'Spring 2026',sst:[14.8,14.3,13.9,13.6,13.9,14.2,14.6,15.1,15.7,16.2,15.5,15.0],chl:[3.6,5.0,6.4,7.8,7.2,5.8,4.7,4.0,3.5,3.0,3.3,3.7],color:'#1D9E75',desc:`<strong>Spring 2026 — near-neutral / weak La Niña:</strong> SSTs within normal range. Upwelling season underway — the IFCB at Scripps Pier is capturing the early spring diatom bloom. Compare today's community to what you'd expect during an El Niño year using the live dashboard.`}
};

let currentENSO = 'la';
let ensoChart = null;
let ifcbChart = null;

window.addEventListener('DOMContentLoaded', () => {
  buildSyllabus();
  buildWeek13Sidebar();
  initWeek13Sidebar();
  if (document.getElementById('ensoChart') && document.getElementById('ensoDesc')) {
    setENSO('la');
  }
  const loadBtn = document.getElementById('loadIfcbSample');
  if (loadBtn) {
    loadBtn.addEventListener('click', loadCalcofiIfcbSample);
    loadCalcofiIfcbSample();
  }
});

function buildWeek13Sidebar() {
  const list = document.getElementById('week13LectureList');
  if (!list) return;
  list.innerHTML = '';
  weeks.forEach(w => {
    const item = document.createElement('li');
    item.className = 'week13-lecture-item' + (w.w === 13 ? ' current' : '');
    item.textContent = `Week ${w.w} — ${w.title}`;
    if (w.w === 13) {
      const sub = document.createElement('ul');
      sub.className = 'week13-subnav';
      sub.innerHTML = `
        <li><a href="#week13-plankton-activity">Plankton ID Activity</a></li>
        <li><a href="#week13-timeseries">Santa Cruz Wharf Timeseries</a></li>
        <li><a href="#week13-video-gallery">Video Gallery</a></li>
      `;
      item.appendChild(sub);
    }
    list.appendChild(item);
  });
}

function initWeek13Sidebar() {
  const lecturePage = document.getElementById('page-lecture');
  if (lecturePage) {
    lecturePage.querySelectorAll('.week13-subnav a').forEach(link => {
      link.addEventListener('click', () => {
        closeWeek13Sidebar();
      });
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeWeek13Sidebar();
    }
  });
  updateWeek13MenuVisibility('syllabus');
}

function getWeek13Shell() {
  return document.querySelector('#page-lecture .week13-shell');
}

function openWeek13Sidebar() {
  const shell = getWeek13Shell();
  if (!shell) return;
  shell.classList.add('sidebar-open');
  document.body.classList.add('week13-sidebar-open');
}

function closeWeek13Sidebar() {
  const shell = getWeek13Shell();
  if (!shell) return;
  shell.classList.remove('sidebar-open');
  document.body.classList.remove('week13-sidebar-open');
}

function toggleWeek13Sidebar(event) {
  if (event) event.preventDefault();
  if (document.body.classList.contains('week13-sidebar-open')) {
    closeWeek13Sidebar();
  } else {
    openWeek13Sidebar();
  }
}

function updateWeek13MenuVisibility(activePageId) {
  const menuButton = document.getElementById('week13MenuBtn');
  if (!menuButton) return;
  const shouldShow = activePageId === 'lecture';
  document.body.classList.toggle('week13-view-active', shouldShow);
  menuButton.classList.toggle('visible', shouldShow);
  if (shouldShow) {
    openWeek13Sidebar();
  } else {
    closeWeek13Sidebar();
  }
}

function toggleLectureSections(event) {
  if (event) event.preventDefault();
  const navBlock = document.getElementById('week13NavBlock');
  const toggle = document.getElementById('week13LectureToggle');
  if (!navBlock || !toggle) return;
  const nowCollapsed = navBlock.classList.toggle('lecture-collapsed');
  toggle.setAttribute('aria-expanded', String(!nowCollapsed));
  toggle.textContent = nowCollapsed ? 'Show All' : 'Focus Week 13';
}

function buildSyllabus() {
  const list = document.getElementById('weekList');
  weeks.forEach(w => {
    const card = document.createElement('div');
    card.className = 'week-card' + (w.current ? ' highlight' : '');
    card.innerHTML = `
      <div class="week-header" onclick="toggleWeek(this)">
        <span class="week-badge${w.current ? ' current' : ''}">Wk ${w.w}</span>
        <span class="week-title">${w.title}</span>
        <span class="week-chapter">${w.ch}</span>
        <svg class="week-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="week-detail">
        <ul>${w.topics.map(t => `<li>${t}</li>`).join('')}</ul>
        ${w.hasLecture ? `<button class="lecture-link" onclick="showPage(event,'lecture')">→ Open Week 13 data lecture</button>` : ''}
      </div>`;
    list.appendChild(card);
  });
}

function toggleWeek(header) {
  header.parentElement.classList.toggle('open');
}

function showPage(event, id) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(button => button.classList.toggle('active', button.dataset.page === id));
  document.getElementById('page-' + id).classList.add('active');
  updateWeek13MenuVisibility(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'lecture') {
    document.getElementById('nav-lecture').classList.add('active');
  }
}

function showSection(event, id) {
  document.querySelectorAll('.lecture-section').forEach(section => section.classList.remove('active'));
  document.querySelectorAll('.stab').forEach(tab => tab.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  event.currentTarget.classList.add('active');
}

function playYT(card, id) {
  card.classList.add('playing');
  const iframe = card.querySelector('iframe');
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
}

function setENSO(state) {
  currentENSO = state;
  document.querySelectorAll('.etbtn').forEach(button => {
    button.classList.remove('active-la', 'active-el', 'active-now');
  });
  const activeButton = document.getElementById('btn-' + state);
  if (activeButton) activeButton.classList.add('active-' + state);
  renderENSO();
}

function renderENSO() {
  const d = ensoData[currentENSO];
  const ensoCanvas = document.getElementById('ensoChart');
  const ensoDesc = document.getElementById('ensoDesc');
  if (!ensoCanvas || !ensoDesc || typeof Chart === 'undefined') return;
  const ctx = ensoCanvas.getContext('2d');
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  if (ensoChart) {
    ensoChart.destroy();
  }
  ensoChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          type: 'line',
          label: 'SST (°C)',
          data: d.sst,
          borderColor: d.color,
          backgroundColor: d.color + '33',
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 4,
          yAxisID: 'y1'
        },
        {
          label: 'Chlorophyll (relative)',
          data: d.chl,
          backgroundColor: '#1D9E7555',
          borderColor: '#1D9E75',
          borderWidth: 1,
          yAxisID: 'y2'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { labels: { font: { size: 11 }, boxWidth: 12 } } },
      scales: {
        y1: { type: 'linear', position: 'left', title: { display: true, text: 'SST (°C)', font: { size: 11 } }, min: 12, max: 20 },
        y2: { type: 'linear', position: 'right', title: { display: true, text: 'Chlorophyll (relative)', font: { size: 11 } }, grid: { drawOnChartArea: false }, min: 0, max: 10 }
      }
    }
  });
  ensoDesc.innerHTML = d.desc;
}

function checkHypothesis() {
  const input = document.getElementById('hypoInput');
  const feedback = document.getElementById('hypoFeedback');
  if (!input || !feedback) return;
  if (!input.value.trim() || input.value.trim().length < 20) {
    feedback.innerHTML = 'Write a complete hypothesis first. Focus on mechanism: wind, stratification, nutrients, and community response.';
    feedback.style.display = 'block';
    return;
  }
  feedback.style.display = 'block';
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function loadCalcofiIfcbSample() {
  const status = document.getElementById('ifcbStatus');
  if (!status) return;
  status.textContent = 'Loading sample CalCOFI / IFCB dataset...';
  try {
    const response = await fetch('data/calcofi_ifcb_sample.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    renderCalcofiIfcbData(data);
    status.innerHTML = 'Sample dataset loaded. Replace <code>data/calcofi_ifcb_sample.json</code> with real CalCOFI / IFCB JSON to power the dashboard.';
  } catch (error) {
    status.innerHTML = 'Unable to load sample dataset. Check browser console for errors.';
    console.error('CalCOFI/IFCB sample load failed:', error);
  }
}

function renderCalcofiIfcbData(data) {
  const years = data.calcofi?.years || [];
  const chlorophyll = data.calcofi?.sbl_chlorophyll || [];
  const nitrate = data.calcofi?.nitrate || [];
  const totalCells = data.ifcb?.total_cells || [];
  const dates = data.ifcb?.dates || [];
  const diatoms = data.ifcb?.diatoms || [];
  const flagellates = data.ifcb?.flagellates || [];

  const metricChl = document.getElementById('ifcbMetricChl');
  const metricNitrate = document.getElementById('ifcbMetricNitrate');
  const metricTotal = document.getElementById('ifcbMetricTotal');
  const breakdown = document.getElementById('ifcbBreakdown');
  if (metricChl) metricChl.textContent = chlorophyll.length ? `${chlorophyll[chlorophyll.length - 1].toFixed(2)} µg/L` : 'No data';
  if (metricNitrate) metricNitrate.textContent = nitrate.length ? `${nitrate[nitrate.length - 1].toFixed(1)} µM` : 'No data';
  if (metricTotal) metricTotal.textContent = totalCells.length ? `${totalCells[totalCells.length - 1].toLocaleString()} cells/mL` : 'No data';
  if (breakdown) {
    breakdown.innerHTML = `IFCB sample dates: ${dates.length ? dates.join(', ') : 'no values'}<br><strong>Diatoms:</strong> ${diatoms.length ? diatoms.join(', ') : '–'}<br><strong>Flagellates:</strong> ${flagellates.length ? flagellates.join(', ') : '–'}`;
  }

  const ifcbCanvas = document.getElementById('ifcbChart');
  if (!ifcbCanvas || typeof Chart === 'undefined') return;
  const ctx = ifcbCanvas.getContext('2d');
  if (ifcbChart) ifcbChart.destroy();
  ifcbChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years.map(String),
      datasets: [
        {
          label: 'CalCOFI chlorophyll (µg/L)',
          data: chlorophyll,
          borderColor: '#185FA5',
          backgroundColor: '#185FA533',
          tension: 0.35,
          fill: true,
          yAxisID: 'y1'
        },
        {
          label: 'CalCOFI nitrate (µM)',
          data: nitrate,
          borderColor: '#1D9E75',
          backgroundColor: '#1D9E755',
          tension: 0.35,
          fill: false,
          yAxisID: 'y2'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'top' } },
      scales: {
        y1: { type: 'linear', position: 'left', title: { display: true, text: 'Chlorophyll (µg/L)' } },
        y2: { type: 'linear', position: 'right', title: { display: true, text: 'Nitrate (µM)' }, grid: { drawOnChartArea: false } }
      }
    }
  });
}
