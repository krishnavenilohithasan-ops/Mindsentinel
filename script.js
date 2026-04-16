const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5000/api' 
    : 'https://mindsentinel-backend.onrender.com/api';

let burnoutChart;

document.addEventListener("DOMContentLoaded", () => {
    initGaugeChart(30);
    refreshDashboard();
});

/* SIDEBAR LOGIC */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const brandName = document.querySelector('.brand-name');
    sidebar.classList.toggle('collapsed');
}

function switchView(viewId, element) {
    // 1. Handle Active State on Nav Items
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    // 2. Handle Views
    document.querySelectorAll('.page-view').forEach(view => {
        view.classList.remove('active');
        setTimeout(() => { view.classList.add('hide'); }, 300); // Wait for fade out
    });

    const targetView = document.getElementById(`view-${viewId}`);
    if(targetView) {
        targetView.classList.remove('hide');
        setTimeout(() => targetView.classList.add('active'), 10);
    }
    
    // 3. Update Title
    const titleText = element.querySelector('span').innerText;
    document.getElementById('page-title').innerText = titleText;
    
    // Auto-close sidebar on mobile if clicked
    if(window.innerWidth <= 900) {
        document.getElementById('sidebar').classList.remove('mobile-open');
    }
}

/* DASHBOARD LOGIC (Chart & Burnout calculation) */
function initGaugeChart(initialScore) {
    const ctx = document.getElementById('burnoutGauge');
    if(!ctx) return;
    
    const context = ctx.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 300, 0);
    gradient.addColorStop(0, '#4ade80'); // Green
    gradient.addColorStop(0.5, '#facc15'); // Yellow
    gradient.addColorStop(1, '#f87171'); // Red

    burnoutChart = new Chart(context, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [initialScore, 100 - initialScore],
                backgroundColor: [gradient, 'rgba(255, 255, 255, 0.05)'],
                borderWidth: 0,
                cutout: '80%',
                circumference: 180,
                rotation: -90,
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { tooltip: { enabled: false } },
            animation: { animateRotate: true, duration: 1500 }
        }
    });

    updateGaugeUI(initialScore);
}

function checkBurnout() {
    const btn = document.getElementById('analyze-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing...';
    
    const sleep = parseFloat(document.getElementById('phys-sleep').value);
    const sleepq = parseFloat(document.getElementById('phys-sleepq').value);
    const energy = parseFloat(document.getElementById('phys-energy').value);
    const mood = parseFloat(document.getElementById('ment-mood').value);
    const stress = parseFloat(document.getElementById('ment-stress').value);
    const focus = parseFloat(document.getElementById('ment-focus').value);
    const workHours = parseFloat(document.getElementById('work-hours').value);
    const workload = parseFloat(document.getElementById('work-intensity').value);
    const screenTime = parseFloat(document.getElementById('life-screen').value);
    const social = parseFloat(document.getElementById('life-social').value);
    
    const physScore = ( ((12 - sleep) * 2) + (10 - energy) + (10 - sleepq) ) / 4;
    const mentalScore = ( stress + (10 - focus) + (10 - mood) ) / 3 * 1.2;
    const workScore = ( (workHours / 12 * 10) + workload ) / 2;
    const lifeScore = ( (10 - social) + (screenTime / 1.2) ) / 2;

    const totalScoreRaw = (physScore * 3) + (mentalScore * 3) + (workScore * 2.5) + (lifeScore * 1.5);
    const finalScore = Math.min(100, Math.round(totalScoreRaw * 1.3));

    let riskLevel = "LOW";
    if (finalScore > 70) riskLevel = "HIGH";
    else if (finalScore > 40) riskLevel = "MEDIUM";

    setTimeout(() => {
        submitData({
            sleep: sleep,
            work: workHours,
            stress: stress,
            score: finalScore,
            riskLevel: riskLevel
        });

        btn.innerHTML = originalText;
        updateChartData(finalScore);
        updateDashboardSuggestions(finalScore, sleep, workHours);
    }, 800);
}

async function submitData(data) {
    try {
        await fetch(`${BASE_URL}/burnout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch(err) {
        console.error('Error saving data:', err);
    }
}

async function refreshDashboard() {
    try {
        const response = await fetch(`${BASE_URL}/records`);
        if (response.ok) {
            const data = await response.json();
            if (data.records && data.records.length > 0) {
                const latest = data.records[0];
                updateChartData(latest.score);
                updateDashboardSuggestions(latest.score, latest.sleep, latest.work);
            }
        }
    } catch(err) {
        console.error('Error fetching dashboard data', err);
    }
}

function updateChartData(score) {
    if(!burnoutChart) return;
    burnoutChart.data.datasets[0].data = [score, 100 - score];
    burnoutChart.update();
    updateGaugeUI(score);
}

function updateGaugeUI(score) {
    document.getElementById('gauge-val').innerText = score + '%';
    const statusBtn = document.getElementById('status-btn');
    let color = '#4ade80';

    if(score > 70) {
        statusBtn.className = 'status-btn high';
        statusBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> HIGH BURNOUT';
        color = '#f87171';
    } else if(score > 40) {
        statusBtn.className = 'status-btn moderate';
        statusBtn.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> MODERATE RISK';
        color = '#facc15';
    } else {
        statusBtn.className = 'status-btn low';
        statusBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i> LOW BURNOUT';
        color = '#4ade80';
    }
    
    const gaugeSection = document.querySelector('.gauge-section');
    if(gaugeSection) gaugeSection.style.filter = `drop-shadow(0 0 40px ${color}20)`;
}

function updateDashboardSuggestions(score, sleep, workHours) {
    const aiText = document.getElementById('ai-assistant-text');
    const recs = document.getElementById('ai-recs');
    const focusFill = document.getElementById('focus-fill');
    const focusScore = document.getElementById('focus-score');

    let focusValue = Math.max(0, 100 - Math.floor(score * 0.8));
    focusScore.innerText = focusValue + '%';
    focusFill.style.width = focusValue + '%';

    if (score > 70) {
        aiText.innerText = "CRITICAL: Rest immediately. Reduce screen time and workload.";
        recs.innerHTML = `<div class="rec-card"><div class="icn text-red bg-red-dim" style="color:#f87171"><i class="fa-solid fa-bed"></i></div><span class="text-sm">Stop working immediately</span></div>`;
    } else if (score > 40) {
        aiText.innerText = "You are pushing limits. Take frequent breaks.";
        recs.innerHTML = `<div class="rec-card"><div class="icn text-yellow bg-yellow-dim" style="color:#facc15"><i class="fa-solid fa-mug-hot"></i></div><span class="text-sm">Take a 15-min break</span></div>`;
    } else {
        aiText.innerText = "Great energy today! Keep it steady.";
    }

    document.getElementById('rec-sleep').innerText = score > 40 ? '8+ hours' : '7-8 hours';
    document.getElementById('rec-work').innerText = workHours > 8 && score > 40 ? 'Drop to 8 hrs' : '6-8 hours';
}