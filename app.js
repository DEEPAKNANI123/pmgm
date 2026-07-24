// ================= GLOBAL STATE & MOCK DATABASE =================

let workforce = [];
let auditLogs = [];

const DEFAULT_WORKFORCE = [
  {
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    vendor: "ABC Services",
    department: "Warehouse",
    supervisorEmail: "manager1@demo.com",
    attendancePercentage: 98.0,
    tasksCompleted: 18,
    qualityScore: 95.0,
    performanceRating: 4.8,
    rejectionCount: 1,
    reworkExpense: 500,
    safetyIncidents: 0
  },
  {
    employeeId: "EMP002",
    employeeName: "Priya Reddy",
    vendor: "XYZ Staffing",
    department: "Packing",
    supervisorEmail: "manager2@demo.com",
    attendancePercentage: 82.0,
    tasksCompleted: 12,
    qualityScore: 78.0,
    performanceRating: 4.1,
    rejectionCount: 3,
    reworkExpense: 1500,
    safetyIncidents: 0
  },
  {
    employeeId: "EMP003",
    employeeName: "Arjun Kumar",
    vendor: "ABC Services",
    department: "Logistics",
    supervisorEmail: "manager3@demo.com",
    attendancePercentage: 65.0,
    tasksCompleted: 8,
    qualityScore: 65.0,
    performanceRating: 2.9,
    rejectionCount: 12,
    reworkExpense: 8000,
    safetyIncidents: 3
  },
  {
    employeeId: "EMP004",
    employeeName: "Neha Singh",
    vendor: "XYZ Staffing",
    department: "Operations",
    supervisorEmail: "manager4@demo.com",
    attendancePercentage: 91.0,
    tasksCompleted: 16,
    qualityScore: 91.0,
    performanceRating: 4.6,
    rejectionCount: 2,
    reworkExpense: 700,
    safetyIncidents: 0
  },
  {
    employeeId: "EMP005",
    employeeName: "Amit Patel",
    vendor: "ABC Services",
    department: "Warehouse",
    supervisorEmail: "manager1@demo.com",
    attendancePercentage: 95.0,
    tasksCompleted: 20,
    qualityScore: 96.0,
    performanceRating: 4.9,
    rejectionCount: 0,
    reworkExpense: 0,
    safetyIncidents: 0
  },
  {
    employeeId: "EMP006",
    employeeName: "Sara Khan",
    vendor: "XYZ Staffing",
    department: "Packing",
    supervisorEmail: "manager2@demo.com",
    attendancePercentage: 88.0,
    tasksCompleted: 9,
    qualityScore: 74.0,
    performanceRating: 3.2,
    rejectionCount: 5,
    reworkExpense: 2200,
    safetyIncidents: 1
  },
  {
    employeeId: "EMP007",
    employeeName: "Kiran Reddy",
    vendor: "ABC Services",
    department: "Logistics",
    supervisorEmail: "manager3@demo.com",
    attendancePercentage: 90.0,
    tasksCompleted: 15,
    qualityScore: 88.0,
    performanceRating: 4.2,
    rejectionCount: 2,
    reworkExpense: 1100,
    safetyIncidents: 0
  }
];

// Flow Run Status Store
let dailyMonitorResults = null;
let riskScoringResults = null;
let profitAnalyticsResults = null;
let fteEvaluationResults = null;

// ================= DOM ELEMENT REFERENCES =================

// Views
const panels = {
  dashboard: document.getElementById('panel-dashboard'),
  database: document.getElementById('panel-database'),
  'flow-daily': document.getElementById('panel-flow-daily'),
  'flow-risk': document.getElementById('panel-flow-risk'),
  'flow-profit': document.getElementById('panel-flow-profit'),
  'flow-fte': document.getElementById('panel-flow-fte'),
  'flow-voice': document.getElementById('panel-flow-voice'),
  'audit-log': document.getElementById('panel-audit-log')
};

// Title
const headerTitle = document.getElementById('headerTitle');

// Nav Links
const navLinks = document.querySelectorAll('.nav-link');

// Modal Elements
const employeeModal = document.getElementById('employeeModal');
const employeeForm = document.getElementById('employeeForm');
const modalTitle = document.getElementById('modalTitle');

// CSV Modal Elements
const importModal = document.getElementById('importModal');
const csvTextarea = document.getElementById('csvTextarea');
const csvDropzone = document.getElementById('csvDropzone');

// ================= CORE INITIALIZATION =================

// ---- Toast notification system ----
function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    danger:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon ${type}">${icons[type] || icons.info}</span>
    <span class="toast-msg">${escapeHTML(message)}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// Global notifications array
let appNotifications = [];

function addNotification(title, desc, type, targetView) {
  const notif = { title, desc, type, targetView, time: new Date() };
  appNotifications.unshift(notif);
  renderNotifications();
  showToast(desc, type);
}

function renderNotifications() {
  const badge = document.getElementById('notificationBadge');
  const list = document.getElementById('notificationList');
  if (!badge || !list) return;

  if (appNotifications.length > 0) {
    badge.style.display = 'flex';
    badge.textContent = appNotifications.length;
    
    list.innerHTML = '';
    appNotifications.forEach((n, i) => {
      const item = document.createElement('div');
      item.className = 'notification-item';
      item.onclick = () => {
        document.getElementById('notificationDropdown').classList.remove('active');
        switchView(n.targetView);
      };
      
      const titleColor = n.type === 'danger' ? 'var(--danger)' : (n.type === 'warning' ? 'var(--warning)' : 'var(--success)');
      
      item.innerHTML = `
        <div class="notification-title" style="color: ${titleColor}">${escapeHTML(n.title)}</div>
        <div class="notification-desc">${escapeHTML(n.desc)}</div>
        <div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 4px;">${n.time.toLocaleTimeString()}</div>
      `;
      list.appendChild(item);
    });
  } else {
    badge.style.display = 'none';
    list.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No new notifications</div>`;
  }
}

window.switchView = function(viewId, filterText = '', pushToHistory = true) {
  // Find the corresponding nav link
  const link = document.querySelector(`.nav-link[data-view="${viewId}"]`);
  if (link) {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    headerTitle.textContent = link.textContent.trim();
  }
  
  Object.keys(panels).forEach(key => {
    if (key === viewId) {
      panels[key].classList.add('active');
    } else {
      panels[key].classList.remove('active');
    }
  });

  if (viewId === 'database' && filterText) {
    const dbSearch = document.getElementById('dbSearch');
    if (dbSearch) {
      dbSearch.value = filterText;
      renderEmployeeDatabase(filterText);
    }
  } else if (viewId === 'database') {
     const dbSearch = document.getElementById('dbSearch');
     if (dbSearch && !filterText && dbSearch.value !== '') {
         dbSearch.value = '';
         renderEmployeeDatabase();
     }
  }

  if (pushToHistory) {
    const hash = filterText ? `#${viewId}?filter=${encodeURIComponent(filterText)}` : `#${viewId}`;
    history.pushState({ viewId, filterText }, '', hash);
  }
};

// ---- Live clock ----
function startClock() {
  const clockEl = document.getElementById('headerClock');
  if (!clockEl) return;
  function tick() {
    const now = new Date();
    const opts = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    clockEl.textContent = now.toLocaleString('en-IN', opts);
  }
  tick();
  setInterval(tick, 1000);
}

function init() {
  // Load data from LocalStorage or fallback to defaults
  const savedData = localStorage.getItem('pmgm_workforce');
  if (savedData) {
    workforce = JSON.parse(savedData);
  } else {
    workforce = JSON.parse(JSON.stringify(DEFAULT_WORKFORCE));
    saveToLocalStorage();
  }

  // Load audit logs
  const savedLogs = localStorage.getItem('pmgm_audits');
  if (savedLogs) {
    auditLogs = JSON.parse(savedLogs);
  } else {
    logSystemEvent("System initialized.", "info");
  }

  setupEventListeners();
  startClock();
  updateHeaderOverviewStats();
  renderDashboardData();
  renderEmployeeDatabase();
  renderAuditLogs();

  // Restore state based on URL hash
  const rawHash = window.location.hash.substring(1);
  const hashParts = rawHash.split('?');
  const viewId = hashParts[0];
  let filterText = '';
  
  if (hashParts[1] && hashParts[1].startsWith('filter=')) {
    filterText = decodeURIComponent(hashParts[1].split('=')[1]);
  }

  if (viewId && panels[viewId]) {
    switchView(viewId, filterText, true);
  } else {
    history.replaceState({ viewId: 'dashboard', filterText: '' }, '', '#dashboard');
  }
}

function saveToLocalStorage() {
  localStorage.setItem('pmgm_workforce', JSON.stringify(workforce));
  updateHeaderOverviewStats();
}

function logSystemEvent(message, type = "info") {
  const timestamp = new Date().toLocaleTimeString();
  const fullLog = `[${timestamp}] ${message}`;
  auditLogs.unshift({ time: timestamp, msg: message, type: type });
  if (auditLogs.length > 150) auditLogs.pop();
  localStorage.setItem('pmgm_audits', JSON.stringify(auditLogs));
  renderAuditLogs();
}

// ================= STATS & UTILS =================

function updateHeaderOverviewStats() {
  document.getElementById('statActiveWorkers').textContent = workforce.length;
  
  // Calculate declines
  const declining = workforce.filter(e => 
    e.attendancePercentage < 85 || e.tasksCompleted < 10 || e.qualityScore < 80
  ).length;
  document.getElementById('statDecliningCount').textContent = declining;

  // Calculate high risk
  const highRisk = workforce.filter(e => {
    const taskScore = Math.min((e.tasksCompleted / 20) * 100, 100);
    const score = Math.round(e.attendancePercentage * 0.4 + taskScore * 0.3 + e.qualityScore * 0.3);
    return score < 70;
  }).length;
  document.getElementById('statHighRiskCount').textContent = highRisk;

  // Calculate Profit Impact
  let totalProfit = 0;
  workforce.forEach(e => {
    const productivityScore = (e.tasksCompleted * 20) + e.qualityScore;
    const impact = (e.performanceRating * 1000) + (productivityScore * 10) - (e.rejectionCount * 300) - e.reworkExpense;
    totalProfit += impact;
  });
  
  const sign = totalProfit >= 0 ? "₹" : "-₹";
  document.getElementById('statProfitImpact').textContent = `${sign}${Math.abs(Math.round(totalProfit)).toLocaleString()}`;
}

// ================= RENDER METHODS =================

function renderDashboardData() {
  const tbody = document.querySelector('#dbSummaryTable tbody');
  tbody.innerHTML = '';
  
  if (workforce.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="dashboard-empty">No employee records in the system.</td></tr>`;
    return;
  }

  workforce.slice(0, 5).forEach(e => {
    // Risk score calculation
    const taskScore = Math.min((e.tasksCompleted / 20) * 100, 100);
    const score = Math.round(e.attendancePercentage * 0.4 + taskScore * 0.3 + e.qualityScore * 0.3);
    let riskBadge = '<span class="badge badge-success">Low</span>';
    if (score < 70) riskBadge = '<span class="badge badge-danger">High</span>';
    else if (score < 85) riskBadge = '<span class="badge badge-warning">Medium</span>';

    // Profit impact calculation
    const productivityScore = (e.tasksCompleted * 20) + e.qualityScore;
    const impact = Math.round((e.performanceRating * 1000) + (productivityScore * 10) - (e.rejectionCount * 300) - e.reworkExpense);
    const profitColor = impact >= 0 ? 'var(--success)' : 'var(--danger)';
    const profitSign = impact >= 0 ? '₹' : '-₹';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div style="font-weight:600;color:var(--text-primary);">${e.employeeName}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">${e.employeeId}</div>
      </td>
      <td>
        <div>${e.department}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">${e.vendor}</div>
      </td>
      <td>
        <div style="font-weight:500;color:${e.attendancePercentage < 85 ? 'var(--danger)' : 'var(--text-primary)'}">${e.attendancePercentage}%</div>
      </td>
      <td>
        <div style="font-weight:500;">${productivityScore}</div>
      </td>
      <td>${riskBadge}</td>
      <td style="font-weight:600;color:${profitColor};">${profitSign}${Math.abs(impact).toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });

  // Render Risk distribution chart
  let lowCount = 0, medCount = 0, highCount = 0;
  workforce.forEach(e => {
    const taskScore = Math.min((e.tasksCompleted / 20) * 100, 100);
    const score = Math.round(e.attendancePercentage * 0.4 + taskScore * 0.3 + e.qualityScore * 0.3);
    if (score >= 85) lowCount++;
    else if (score >= 70) medCount++;
    else highCount++;
  });

  const total = workforce.length || 1;
  const lowPct = Math.round((lowCount / total) * 100);
  const medPct = Math.round((medCount / total) * 100);
  const highPct = Math.round((highCount / total) * 100);

  const riskBars = document.getElementById('riskDistributionBars');
  riskBars.innerHTML = `
    <div class="bar-row">
      <div class="bar-label-container">
        <span class="bar-label">Low Risk (&ge;85)</span>
        <span class="bar-value">${lowCount} (${lowPct}%)</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill success" style="width: ${lowPct}%"></div>
      </div>
    </div>
    
    <div class="bar-row">
      <div class="bar-label-container">
        <span class="bar-label">Medium Risk (70-84)</span>
        <span class="bar-value">${medCount} (${medPct}%)</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill warning" style="width: ${medPct}%"></div>
      </div>
    </div>
    
    <div class="bar-row">
      <div class="bar-label-container">
        <span class="bar-label">High Risk (&lt;70)</span>
        <span class="bar-value">${highCount} (${highPct}%)</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill danger" style="width: ${highPct}%"></div>
      </div>
    </div>
  `;

  // Render FTE eligibility gauge circle
  let eligibleCount = 0;
  workforce.forEach(e => {
    const productivityScore = e.tasksCompleted * 5;
    const safetyScore = Math.max(0, 100 - (e.safetyIncidents * 20));
    const fteScore = e.attendancePercentage * 0.25 + productivityScore * 0.35 + e.qualityScore * 0.25 + safetyScore * 0.15;
    if (fteScore >= 80) eligibleCount++;
  });

  const ftePct = Math.round((eligibleCount / total) * 100);
  const strokeOffset = 377 - (377 * ftePct) / 100;

  const gauge = document.getElementById('fteEligibilityGauge');
  gauge.innerHTML = `
    <svg class="gauge-svg">
      <circle class="gauge-track" cx="70" cy="70" r="60"></circle>
      <circle class="gauge-fill" cx="70" cy="70" r="60" style="stroke-dashoffset: ${strokeOffset}; stroke: var(--primary);"></circle>
    </svg>
    <div class="gauge-center-text">
      <span class="gauge-number">${ftePct}%</span>
      <span class="gauge-label">FTE Ready</span>
    </div>
  `;

  // Department Breakdown
  renderDeptBreakdown();
}

function renderDeptBreakdown() {
  const container = document.getElementById('deptBreakdownBars');
  if (!container || workforce.length === 0) return;

  // Group by department
  const depts = {};
  workforce.forEach(e => {
    if (!depts[e.department]) depts[e.department] = { attendance: [], quality: [], tasks: [], count: 0 };
    depts[e.department].attendance.push(e.attendancePercentage);
    depts[e.department].quality.push(e.qualityScore);
    depts[e.department].tasks.push(e.tasksCompleted);
    depts[e.department].count++;
  });

  const avg = arr => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
  const colors = ['var(--primary)', 'var(--secondary)', 'var(--success)', 'var(--warning)', 'var(--accent)'];
  let colorIdx = 0;

  container.innerHTML = '';
  Object.entries(depts).forEach(([dept, data]) => {
    const avgAtt  = parseFloat(avg(data.attendance));
    const avgQual = parseFloat(avg(data.quality));
    const avgTask = parseFloat(avg(data.tasks));
    const color   = colors[colorIdx++ % colors.length];

    const card = document.createElement('div');
    card.className = 'dept-card';
    card.style.cursor = 'pointer';
    card.onclick = () => switchView('database', dept);
    card.innerHTML = `
      <div class="dept-name">
        ${dept}
        <span class="dept-count">${data.count} worker${data.count > 1 ? 's' : ''}</span>
      </div>
      <div class="dept-stat-row">
        <div class="dept-stat-label"><span>Avg Attendance</span><span>${avgAtt}%</span></div>
        <div class="dept-mini-bar"><div class="dept-mini-fill" style="width:${avgAtt}%; background:${color};"></div></div>
      </div>
      <div class="dept-stat-row">
        <div class="dept-stat-label"><span>Avg Quality</span><span>${avgQual}%</span></div>
        <div class="dept-mini-bar"><div class="dept-mini-fill" style="width:${avgQual}%; background:${color}; opacity:0.7;"></div></div>
      </div>
      <div class="dept-stat-row">
        <div class="dept-stat-label"><span>Avg Tasks Done</span><span>${avgTask}</span></div>
        <div class="dept-mini-bar"><div class="dept-mini-fill" style="width:${Math.min(avgTask * 5, 100)}%; background:${color}; opacity:0.5;"></div></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderEmployeeDatabase(filter = '') {
  const tbody = document.querySelector('#mainEmployeeTable tbody');
  tbody.innerHTML = '';

  const filtered = workforce.filter(e => 
    e.employeeName.toLowerCase().includes(filter.toLowerCase()) ||
    e.employeeId.toLowerCase().includes(filter.toLowerCase()) ||
    e.vendor.toLowerCase().includes(filter.toLowerCase()) ||
    e.department.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" class="dashboard-empty">No matching employees found in database.</td></tr>`;
    return;
  }

  filtered.forEach((e, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:600;color:var(--text-primary);">${e.employeeId}</td>
      <td><strong>${e.employeeName}</strong></td>
      <td>${e.vendor}</td>
      <td>${e.department}</td>
      <td><span style="color:${e.attendancePercentage < 85 ? 'var(--danger)' : 'inherit'}">${e.attendancePercentage}%</span></td>
      <td>${e.tasksCompleted}</td>
      <td><span style="color:${e.qualityScore < 80 ? 'var(--danger)' : 'inherit'}">${e.qualityScore}%</span></td>
      <td>${e.rejectionCount}</td>
      <td>₹${e.reworkExpense.toLocaleString()}</td>
      <td><span class="badge ${e.safetyIncidents > 0 ? 'badge-danger' : 'badge-success'}">${e.safetyIncidents}</span></td>
      <td>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="openEditEmployeeForm(${idx})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${idx})">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderAuditLogs() {
  const consoleLog = document.getElementById('auditConsoleLog');
  if (!consoleLog) return;
  consoleLog.innerHTML = '';
  
  if (auditLogs.length === 0) {
    consoleLog.innerHTML = `<div class="audit-entry"><span class="audit-msg">Console ready. No logs recorded yet.</span></div>`;
    return;
  }

  auditLogs.forEach(log => {
    const entry = document.createElement('div');
    entry.className = 'audit-entry';
    entry.innerHTML = `
      <span class="audit-time">${log.time}</span>
      <span class="audit-msg ${log.type}">${escapeHTML(log.msg)}</span>
    `;
    consoleLog.appendChild(entry);
  });
}

// ================= DIALOG & FORM HANDLING =================

window.openEditEmployeeForm = function(index) {
  const emp = workforce[index];
  document.getElementById('formEmployeeIndex').value = index;
  document.getElementById('formEmployeeId').value = emp.employeeId;
  document.getElementById('formEmployeeId').disabled = true; // Block ID change
  document.getElementById('formEmployeeName').value = emp.employeeName;
  document.getElementById('formVendor').value = emp.vendor;
  document.getElementById('formDepartment').value = emp.department;
  document.getElementById('formSupervisorEmail').value = emp.supervisorEmail;
  document.getElementById('formAttendance').value = emp.attendancePercentage;
  document.getElementById('formTasks').value = emp.tasksCompleted;
  document.getElementById('formQuality').value = emp.qualityScore;
  document.getElementById('formPerformanceRating').value = emp.performanceRating;
  document.getElementById('formRejections').value = emp.rejectionCount;
  document.getElementById('formRework').value = emp.reworkExpense;
  document.getElementById('formSafety').value = emp.safetyIncidents;

  modalTitle.textContent = "Edit Employee Details";
  employeeModal.classList.add('active');
};

window.deleteEmployee = function(index) {
  const empName = workforce[index].employeeName;
  const empId = workforce[index].employeeId;
  if (confirm(`Are you sure you want to delete ${empName} (${empId})?`)) {
    workforce.splice(index, 1);
    saveToLocalStorage();
    logSystemEvent(`Deleted employee record: ${empName} (${empId})`, 'warning');
    renderDashboardData();
    renderEmployeeDatabase();
  }
};

function openAddEmployeeForm() {
  document.getElementById('formEmployeeIndex').value = '';
  document.getElementById('formEmployeeId').value = 'EMP' + String(workforce.length + 1).padStart(3, '0');
  document.getElementById('formEmployeeId').disabled = false;
  document.getElementById('formEmployeeName').value = '';
  document.getElementById('formVendor').value = '';
  document.getElementById('formDepartment').value = '';
  document.getElementById('formSupervisorEmail').value = '';
  document.getElementById('formAttendance').value = 90.0;
  document.getElementById('formTasks').value = 15;
  document.getElementById('formQuality').value = 85.0;
  document.getElementById('formPerformanceRating').value = 4.0;
  document.getElementById('formRejections').value = 0;
  document.getElementById('formRework').value = 0;
  document.getElementById('formSafety').value = 0;

  modalTitle.textContent = "Register New Employee";
  employeeModal.classList.add('active');
}

// ================= FLOW SCAN EXECUTION ENGINES =================

// Simulated visual step scanner
function animateNodeChain(nodesSelector, onStep, onFinish) {
  const nodeContainer = document.querySelector(nodesSelector);
  const nodes = nodeContainer.querySelectorAll('.node');
  const connectors = nodeContainer.querySelectorAll('.node-connector');
  
  // Clear previous states
  nodes.forEach(n => n.className = 'node');
  connectors.forEach(c => c.className = 'node-connector');

  let currentStep = 0;
  const totalSteps = nodes.length;

  function runNextStep() {
    if (currentStep > 0) {
      nodes[currentStep - 1].classList.remove('active');
      nodes[currentStep - 1].classList.add('completed');
      if (currentStep - 1 < connectors.length) {
        connectors[currentStep - 1].classList.remove('active');
        connectors[currentStep - 1].classList.add('completed');
      }
    }

    if (currentStep < totalSteps) {
      nodes[currentStep].classList.add('active');
      if (currentStep < connectors.length) {
        connectors[currentStep].classList.add('active');
      }
      
      onStep(currentStep, nodes[currentStep]);
      currentStep++;
      setTimeout(runNextStep, 450); // Simulation pacing delay
    } else {
      onFinish();
    }
  }

  runNextStep();
}

// Flow 1: Daily scan implementation
function runFlowDaily() {
  const btn = document.getElementById('btnRunFlowDaily');
  btn.disabled = true;
  btn.classList.add('btn-loading');
  logSystemEvent("Starting Flow: Daily Performance Monitor...", "info");
  
  animateNodeChain('#flowDailyNodes', (step, node) => {
    const nodeName = node.querySelector('.node-name').textContent;
    logSystemEvent(`Executing node: ${nodeName}`, 'info');
  }, () => {
    // Execution completed, run the logic
    const flaggedList = [];
    workforce.forEach(e => {
      const issue = e.attendancePercentage < 85 || e.tasksCompleted < 10 || e.qualityScore < 80;
      if (issue) {
        const reasons = [];
        if (e.attendancePercentage < 85) reasons.push("Low attendance");
        if (e.tasksCompleted < 10) reasons.push("Low productivity");
        if (e.qualityScore < 80) reasons.push("Low quality score");
        
        flaggedList.push({
          employeeId: e.employeeId,
          employeeName: e.employeeName,
          supervisorEmail: e.supervisorEmail,
          attendance: e.attendancePercentage,
          tasks: e.tasksCompleted,
          quality: e.qualityScore,
          reasons: reasons
        });
      }
    });

    dailyMonitorResults = flaggedList;
    logSystemEvent(`Scan finished. ${flaggedList.length} performance issues detected.`, flaggedList.length > 0 ? 'warning' : 'success');
    renderFlowDailyResults();

    // Update summary chips
    const ok = workforce.length - flaggedList.length;
    document.getElementById('chipDailyTotal').textContent   = `${workforce.length} Employees Scanned`;
    document.getElementById('chipDailyFlagged').textContent = `${flaggedList.length} Flagged`;
    document.getElementById('chipDailyOk').textContent      = `${ok} Performing Well`;
    document.getElementById('flowDailySummary').style.display = 'flex';

    const toastType = flaggedList.length > 0 ? 'warning' : 'success';
    addNotification('Daily Monitor', `Daily scan complete — ${flaggedList.length} issue${flaggedList.length !== 1 ? 's' : ''} detected.`, toastType, 'flow-daily');

    btn.disabled = false;
    btn.classList.remove('btn-loading');
  });
}

function renderFlowDailyResults() {
  const tbody = document.querySelector('#tblFlowDailyIssues tbody');
  const draftContainer = document.getElementById('flowDailyDraftContainer');
  tbody.innerHTML = '';
  draftContainer.innerHTML = `<div class="dashboard-empty">Select an employee from the flagged list to view the drafted notification.</div>`;

  if (!dailyMonitorResults || dailyMonitorResults.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="dashboard-empty" style="color:var(--success)">No performance issues detected. All staff operating above baseline.</td></tr>`;
    return;
  }

  dailyMonitorResults.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.employeeId}</td>
      <td><strong>${item.employeeName}</strong></td>
      <td>${item.attendance}%</td>
      <td>${item.tasks} tasks</td>
      <td><span class="badge badge-danger">${item.reasons.join(', ')}</span></td>
      <td><button class="btn btn-secondary btn-sm" onclick="showDailyGmailDraft('${item.employeeId}')">View Draft</button></td>
    `;
    tbody.appendChild(tr);
  });
}

window.showDailyGmailDraft = function(empId) {
  const item = dailyMonitorResults.find(e => e.employeeId === empId);
  if (!item) return;

  const originalEmp = workforce.find(w => w.employeeId === empId);
  const pipGoal = item.reasons.includes("Low attendance") ? "Attendance & punctuality baseline correction to 90%+." : "Output and quality baseline correction.";

  const draftContainer = document.getElementById('flowDailyDraftContainer');
  draftContainer.innerHTML = `
    <div class="email-preview-container">
      <div class="email-header-field">
        <span class="email-header-label">To:</span>
        <span class="email-header-value">${item.supervisorEmail}</span>
      </div>
      <div class="email-header-field">
        <span class="email-header-label">Subject:</span>
        <span class="email-header-value">Performance Alert - ${item.employeeName} (${item.employeeId})</span>
      </div>
      <div class="email-body">Employee Performance Alert

Employee ID: ${item.employeeId}
Employee Name: ${item.employeeName}
Department: ${originalEmp.department}
Attendance: ${item.attendance}%
Tasks Completed: ${item.tasks}
Quality Score: ${item.quality}%

Flagged Reasons:
${JSON.stringify(item.reasons)}

Performance Improvement Plan (PIP) Draft Outline:
---------------------------------------------
Goals: ${pipGoal}
Review Period: 30 Days
Success Criteria: Stabilized scores back to company thresholds (attendance >= 85%, quality >= 80%).

This draft was automatically prepared by the PMGM Autonomous Performance Monitor.</div>
    </div>
    <div style="margin-top:12px; display:flex; justify-content:flex-end;">
      <button class="btn btn-secondary btn-sm" onclick="copyEmailContent()">Copy Draft Content</button>
    </div>
  `;
};

// Flow 2: Risk Scoring
function runFlowRisk() {
  const btn = document.getElementById('btnRunFlowRisk');
  if (btn) { btn.disabled = true; btn.classList.add('btn-loading'); }
  logSystemEvent("Starting Flow: Contractor Risk Scoring & Alert...", "info");
  
  animateNodeChain('#flowRiskNodes', (step, node) => {
    const nodeName = node.querySelector('.node-name').textContent;
    logSystemEvent(`Executing node: ${nodeName}`, 'info');
  }, () => {
    // Process risk scoring logic
    const results = [];
    workforce.forEach(e => {
      const taskScore = Math.min((e.tasksCompleted / 20) * 100, 100);
      const riskScore = Math.round(e.attendancePercentage * 0.4 + taskScore * 0.3 + e.qualityScore * 0.3);
      
      let level = "Low";
      if (riskScore < 70) level = "High";
      else if (riskScore < 85) level = "Medium";

      results.push({
        employeeId: e.employeeId,
        employeeName: e.employeeName,
        vendor: e.vendor,
        department: e.department,
        supervisorEmail: e.supervisorEmail,
        riskScore: riskScore,
        level: level,
        metrics: {
          attendance: e.attendancePercentage,
          tasks: e.tasksCompleted,
          quality: e.qualityScore,
          incidents: e.safetyIncidents
        }
      });
    });

    riskScoringResults = results;
    const highCount = results.filter(r => r.level === "High").length;
    const medCount  = results.filter(r => r.level === "Medium").length;
    const lowCount  = results.filter(r => r.level === "Low").length;
    logSystemEvent(`Risk engine run complete. ${highCount} high-risk contractors detected.`, highCount > 0 ? 'warning' : 'success');
    renderFlowRiskResults();

    // Update summary chips
    document.getElementById('chipRiskHigh').textContent   = `${highCount} High Risk`;
    document.getElementById('chipRiskMedium').textContent = `${medCount} Medium Risk`;
    document.getElementById('chipRiskLow').textContent    = `${lowCount} Low Risk`;
    document.getElementById('flowRiskSummary').style.display = 'flex';

    addNotification('Contractor Risk', `Risk engine done — ${highCount} high-risk worker${highCount !== 1 ? 's' : ''} flagged.`, highCount > 0 ? 'danger' : 'success', 'flow-risk');
    if (btn) { btn.disabled = false; btn.classList.remove('btn-loading'); }
  });
}

function renderFlowRiskResults() {
  const tbody = document.querySelector('#tblFlowRiskDetails tbody');
  const detailsPanel = document.getElementById('flowRiskInterventionDetails');
  tbody.innerHTML = '';
  detailsPanel.innerHTML = `<div class="dashboard-empty">Select a high-risk worker to display scheduled task details and draft communications.</div>`;

  if (!riskScoringResults || riskScoringResults.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="dashboard-empty">No risk assessments performed yet. Run risk engine.</td></tr>`;
    return;
  }

  riskScoringResults.forEach(item => {
    const badgeClass = item.level === 'High' ? 'badge-danger' : (item.level === 'Medium' ? 'badge-warning' : 'badge-success');
    const factorList = [];
    if (item.metrics.attendance < 85) factorList.push("Attendance");
    if (item.metrics.tasks < 12) factorList.push("Task Volume");
    if (item.metrics.quality < 80) factorList.push("Quality Error");
    if (item.metrics.incidents > 0) factorList.push("Safety Incidents");
    const factors = factorList.length > 0 ? factorList.join(', ') : "None (Optimal)";

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div style="font-weight:600;color:var(--text-primary);">${item.employeeName}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">${item.employeeId}</div>
      </td>
      <td>${item.vendor}</td>
      <td>${item.riskScore}/100</td>
      <td><span class="badge ${badgeClass}">${item.level}</span></td>
      <td><span style="font-size:0.8rem;">${factors}</span></td>
      <td>
        ${item.level === 'High' 
          ? `<button class="btn btn-danger btn-sm" onclick="showRiskIntervention('${item.employeeId}')">Manage Action</button>`
          : `<span class="badge badge-secondary" style="font-size:0.7rem;">No action needed</span>`
        }
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.showRiskIntervention = function(empId) {
  const item = riskScoringResults.find(e => e.employeeId === empId);
  if (!item) return;

  const summary = `Risk evaluation score is critical (${item.riskScore}/100). The contractor has exhibited poor attendance (${item.metrics.attendance}%) and high error volume, creating operational overhead.`;
  const cause = item.metrics.incidents > 0 ? "Potential training deficit, compliance gaps, and safety policy non-adherence." : "Attendance degradation impacting workflow output consistency.";
  const recommendation = item.metrics.incidents > 0 ? "Mandatory safety retraining and warning issuance." : "Immediate supervisor feedback review cycle and scheduling 1-on-1 performance review.";

  const detailsPanel = document.getElementById('flowRiskInterventionDetails');
  detailsPanel.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="background-color:var(--danger-bg); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: var(--border-radius); padding:16px;">
        <h4 style="color:var(--danger); font-family:var(--font-title); margin-bottom:6px;">Risk Summary Analysis</h4>
        <p style="font-size:0.85rem; line-height:1.4; color:var(--text-secondary);">${summary}</p>
        <div style="margin-top:10px; font-size:0.8rem;"><strong>Likely Cause:</strong> ${cause}</div>
      </div>
      
      <div class="email-preview-container">
        <div class="email-header-field">
          <span class="email-header-label">To:</span>
          <span class="email-header-value">${item.supervisorEmail}</span>
        </div>
        <div class="email-header-field">
          <span class="email-header-label">Subject:</span>
          <span class="email-header-value">🚨 High Risk Contract Worker Alert - ${item.employeeName}</span>
        </div>
        <div class="email-body">Dear Supervisor,

A high-risk contract worker has been identified on your shift.

Employee Name: ${item.employeeName}
Employee ID: ${item.employeeId}
Vendor: ${item.vendor}
Department: ${item.department}

Risk Score: ${item.riskScore}
Risk Level: ${item.level}

Risk Summary:
${summary}

Recommended Intervention:
${recommendation}

Please initiate the review task immediately.

Regards,
HR Workforce Monitoring Automation</div>
      </div>
    </div>
  `;
};

// Flow 3: Profit Impact Audit
function runFlowProfit() {
  const btn = document.getElementById('btnRunFlowProfit');
  if (btn) { btn.disabled = true; btn.classList.add('btn-loading'); }
  logSystemEvent("Starting Flow: Performance-to-Profit Monthly Audit...", "info");
  
  animateNodeChain('#flowProfitNodes', (step, node) => {
    const nodeName = node.querySelector('.node-name').textContent;
    logSystemEvent(`Executing node: ${nodeName}`, 'info');
  }, () => {
    const audited = [];
    let grandTotalImpact = 0;
    let totalRating = 0;
    let totalRejections = 0;
    let totalRework = 0;
    let totalProductivity = 0;

    workforce.forEach(e => {
      const productivityScore = (e.tasksCompleted * 20) + e.qualityScore;
      const profitImpact = Math.round((e.performanceRating * 1000) + (productivityScore * 10) - (e.rejectionCount * 300) - e.reworkExpense);
      
      audited.push({
        employeeId: e.employeeId,
        employeeName: e.employeeName,
        rating: e.performanceRating,
        rejections: e.rejectionCount,
        rework: e.reworkExpense,
        productivity: productivityScore,
        impact: profitImpact
      });

      grandTotalImpact += profitImpact;
      totalRating += e.performanceRating;
      totalRejections += e.rejectionCount;
      totalRework += e.reworkExpense;
      totalProductivity += productivityScore;
    });

    const avgRating = (totalRating / workforce.length).toFixed(2);
    const avgProductivity = (totalProductivity / workforce.length).toFixed(1);

    profitAnalyticsResults = {
      items: audited,
      summary: {
        totalEmployees: workforce.length,
        avgPerformanceRating: avgRating,
        totalRejections: totalRejections,
        totalReworkExpense: totalRework,
        estimatedProfitImpact: grandTotalImpact,
        avgProductivityScore: avgProductivity
      }
    };

    logSystemEvent(`Profit audit complete. Global net business impact is evaluated at ₹${grandTotalImpact.toLocaleString()}.`, grandTotalImpact >= 0 ? 'success' : 'danger');
    renderFlowProfitResults();

    // Update summary chips
    document.getElementById('chipProfitTotal').textContent  = `${workforce.length} Employees Audited`;
    const impactSign = grandTotalImpact >= 0 ? '+₹' : '-₹';
    document.getElementById('chipProfitImpact').textContent = `Net Impact: ${impactSign}${Math.abs(grandTotalImpact).toLocaleString()}`;
    const s2 = profitAnalyticsResults.summary;
    document.getElementById('chipProfitRework').textContent = `Rework Cost: ₹${s2.totalReworkExpense.toLocaleString()}`;
    document.getElementById('flowProfitSummary').style.display = 'flex';

    addNotification('Profit Impact', `Profit audit done — net impact ₹${grandTotalImpact.toLocaleString()}.`, grandTotalImpact >= 0 ? 'success' : 'danger', 'flow-profit');
    if (btn) { btn.disabled = false; btn.classList.remove('btn-loading'); }
  });
}

function renderFlowProfitResults() {
  const tbody = document.querySelector('#tblFlowProfitDetails tbody');
  const reportPanel = document.getElementById('flowProfitReportPanel');
  tbody.innerHTML = '';
  reportPanel.innerHTML = `<div class="dashboard-empty">Audit Profit Impact to compile the monthly executive report.</div>`;

  if (!profitAnalyticsResults) {
    tbody.innerHTML = `<tr><td colspan="6" class="dashboard-empty">No audit performed yet.</td></tr>`;
    return;
  }

  profitAnalyticsResults.items.forEach(item => {
    const color = item.impact >= 0 ? 'var(--success)' : 'var(--danger)';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.employeeId}</td>
      <td><strong>${item.employeeName}</strong></td>
      <td>${item.rating}</td>
      <td>${item.rejections} units</td>
      <td>₹${item.rework.toLocaleString()}</td>
      <td style="font-weight:600;color:${color}">${item.impact >= 0 ? '₹' : '-₹'}${Math.abs(item.impact).toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });

  // Render the HTML report in container
  const s = profitAnalyticsResults.summary;
  reportPanel.innerHTML = `
    <div class="report-frame">
      <h2>Performance-to-Profit Monthly Executive Summary</h2>
      <hr>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; font-size:0.85rem;">
        <div><strong>Total Employees Evaluated:</strong> ${s.totalEmployees}</div>
        <div><strong>Avg Performance Rating:</strong> ${s.avgPerformanceRating} / 5.0</div>
        <div><strong>Total Quality Rejections:</strong> ${s.totalRejections} items</div>
        <div><strong>Total Rework Expenses:</strong> ₹${s.totalReworkExpense.toLocaleString()}</div>
        <div><strong>Avg Productivity Score:</strong> ${s.avgProductivityScore}</div>
        <div style="font-size:1rem; grid-column: span 2; margin-top:8px;">
          <strong>Estimated Profit Impact:</strong> 
          <span style="font-weight:bold; color:${s.estimatedProfitImpact >= 0 ? 'green' : 'red'}">
            ₹${s.estimatedProfitImpact.toLocaleString()}
          </span>
        </div>
      </div>
      
      <h3>Operational Insights</h3>
      <p>Average workforce output stands at baseline metrics. Total quality issues generated a rework cost of ₹${s.totalReworkExpense.toLocaleString()}, affecting the bottom-line metrics directly. Top performers offset cost drains, yielding a net positive business contribution of ₹${s.estimatedProfitImpact.toLocaleString()}.</p>
      
      <h3>Strategic Directives</h3>
      <p>1. Target top cost centers to reduce rejections.
2. Formulate active training schedules for low-rating contract categories to increase yield.
3. Align supervisor audits on high rework segments.</p>
    </div>
  `;
}

// Flow 4: FTE Assessment
function runFlowFte() {
  const btn = document.getElementById('btnRunFlowFte');
  if (btn) { btn.disabled = true; btn.classList.add('btn-loading'); }
  logSystemEvent("Starting Flow: Quarterly FTE Conversion Evaluation...", "info");
  
  animateNodeChain('#flowFteNodes', (step, node) => {
    const nodeName = node.querySelector('.node-name').textContent;
    logSystemEvent(`Executing node: ${nodeName}`, 'info');
  }, () => {
    const results = [];
    workforce.forEach(e => {
      const productivityScore = e.tasksCompleted * 5; // Normalize out of 100
      const safetyScore = Math.max(0, 100 - (e.safetyIncidents * 20));
      const fteScore = Number((e.attendancePercentage * 0.25 + productivityScore * 0.35 + e.qualityScore * 0.25 + safetyScore * 0.15).toFixed(2));
      const eligible = fteScore >= 80;

      results.push({
        employeeId: e.employeeId,
        employeeName: e.employeeName,
        vendor: e.vendor,
        department: e.department,
        metrics: {
          attendance: e.attendancePercentage,
          productivity: productivityScore,
          quality: e.qualityScore,
          safety: safetyScore,
          incidents: e.safetyIncidents
        },
        fteScore: fteScore,
        eligible: eligible
      });
    });

    fteEvaluationResults = results;
    const eligibleCount = results.filter(r => r.eligible).length;
    const notEligible   = results.length - eligibleCount;
    const avgFteScore   = (results.reduce((a, r) => a + r.fteScore, 0) / results.length).toFixed(1);
    logSystemEvent(`FTE Evaluation complete. ${eligibleCount} employees meet the conversion threshold.`, 'success');
    renderFlowFteResults();

    // Update summary chips
    document.getElementById('chipFteEligible').textContent   = `${eligibleCount} Eligible`;
    document.getElementById('chipFteIneligible').textContent = `${notEligible} Not Eligible`;
    document.getElementById('chipFteAvgScore').textContent   = `Avg FTE Score: ${avgFteScore}`;
    document.getElementById('flowFteSummary').style.display  = 'flex';

    addNotification('FTE Evaluation', `FTE evaluation done — ${eligibleCount} of ${results.length} eligible for conversion.`, 'success', 'flow-fte');
    if (btn) { btn.disabled = false; btn.classList.remove('btn-loading'); }
  });
}

function renderFlowFteResults() {
  const tbody = document.querySelector('#tblFlowFteDetails tbody');
  const detailsPanel = document.getElementById('flowFteRecommendationPanel');
  tbody.innerHTML = '';
  detailsPanel.innerHTML = `<div class="dashboard-empty">Select a worker from the matrix to view their customized AI recommendation or development plan.</div>`;

  if (!fteEvaluationResults) {
    tbody.innerHTML = `<tr><td colspan="9" class="dashboard-empty">No FTE evaluations executed yet. Run evaluation flow.</td></tr>`;
    return;
  }

  fteEvaluationResults.forEach(item => {
    const badgeClass = item.eligible ? 'badge-success' : 'badge-danger';
    const statusText = item.eligible ? 'Eligible' : 'Not Eligible';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.employeeId}</td>
      <td><strong>${item.employeeName}</strong></td>
      <td>${item.metrics.attendance}%</td>
      <td>${item.metrics.productivity}</td>
      <td>${item.metrics.quality}%</td>
      <td>${item.metrics.safety}</td>
      <td style="font-weight:700;">${item.fteScore}</td>
      <td><span class="badge ${badgeClass}">${statusText}</span></td>
      <td><button class="btn btn-secondary btn-sm" onclick="showFtePlan('${item.employeeId}')">Strategy</button></td>
    `;
    tbody.appendChild(tr);
  });
}

window.showFtePlan = function(empId) {
  const item = fteEvaluationResults.find(e => e.employeeId === empId);
  if (!item) return;

  const panel = document.getElementById('flowFteRecommendationPanel');
  const headerTitle = document.getElementById('fteRecommendationTitle');

  if (item.eligible) {
    headerTitle.textContent = `FTE Conversion Recommendation: ${item.employeeName}`;
    panel.innerHTML = `
      <div style="background-color:var(--success-bg); border:1px solid rgba(16, 185, 129, 0.2); border-radius: var(--border-radius); padding:16px; margin-bottom:12px; font-size:0.85rem;">
        <h4 style="color:var(--success); font-family:var(--font-title); margin-bottom:6px;">AI Senior HR Business Partner Recommendation</h4>
        <p style="margin-bottom:8px; line-height:1.4;">The worker is highly eligible for conversion to full-time employment status.</p>
        <ul style="padding-left:20px; line-height:1.4; display:flex; flex-direction:column; gap:4px;">
          <li><strong>Executive Summary:</strong> Demonstrates consistent execution across quality metrics and safety requirements.</li>
          <li><strong>Conversion Recommendation:</strong> Standard FTE salary transition track.</li>
          <li><strong>Key Strengths:</strong> Solid attendance record of ${item.metrics.attendance}% with exceptional quality ratings.</li>
          <li><strong>Expected Business Impact:</strong> Stabilized operational throughput and reduced vendor management premiums.</li>
        </ul>
      </div>
    `;
  } else {
    headerTitle.textContent = `Development Strategy Plan: ${item.employeeName}`;
    panel.innerHTML = `
      <div style="background-color:var(--warning-bg); border:1px solid rgba(245, 158, 11, 0.2); border-radius: var(--border-radius); padding:16px; margin-bottom:12px; font-size:0.85rem;">
        <h4 style="color:var(--warning); font-family:var(--font-title); margin-bottom:6px;">AI HR Development Specialist Action Pathway</h4>
        <p style="margin-bottom:8px; line-height:1.4;">The employee does not currently meet the fte readiness threshold of 80 (Current Score: ${item.fteScore}). An improvement pathway is prescribed.</p>
        <ul style="padding-left:20px; line-height:1.4; display:flex; flex-direction:column; gap:4px;">
          <li><strong>Performance Summary:</strong> Lags in production volumes or quality error rates.</li>
          <li><strong>Primary Improvement Areas:</strong> Stabilize process flow compliance.</li>
          <li><strong>Action Plan:</strong> Focus on attending training sessions, quality review, and reducing safety incidents.</li>
          <li><strong>Target Review Period:</strong> 60 Days.</li>
        </ul>
      </div>
    `;
  }
}

// ================= FLOW 5: WORKFORCE COPILOT =================

let speechRecognition = null;
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];
let pendingTranscript = '';

let copilotState = {
  active: false,
  step: 'idle', // 'idle', 'awaiting_intent', 'awaiting_employee', 'awaiting_reason', 'awaiting_confirmation', 'awaiting_metric_value', 'awaiting_employee_clarification'
  intent: null, // 'positive_review', 'pip', 'risk', 'fte', 'profit', 'query'
  sentiment: null, // 'positive', 'neutral', 'negative'
  employee: null,
  reason: null, // Feedback
  field: null,
  value: null,
  tempData: null,
  candidates: null
};

function resetCopilotState() {
  copilotState = {
    active: false,
    step: 'idle',
    intent: null,
    sentiment: null,
    employee: null,
    reason: null,
    field: null,
    value: null,
    tempData: null,
    candidates: null
  };
}

function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    appendChatMessage('ai', "Speech Recognition API is not supported in this browser. You can still use text input!");
    return null;
  }
  
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-IN'; // Better support for Indian names/accents
  
  recognition.onstart = function() {
    isRecording = true;
    const btn = document.getElementById('btnVoiceRecord');
    if (btn) {
      btn.classList.add('pulse-animation');
      btn.style.backgroundColor = 'var(--danger)';
      btn.style.color = 'white';
    }
    const input = document.getElementById('copilotTextInput');
    if (input) {
      input.placeholder = "Listening... Speak now!";
      input.value = '';
    }
  };
  
  recognition.onresult = function(event) {
    let finalTranscript = '';
    const input = document.getElementById('copilotTextInput');

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }
    
    if (input && finalTranscript) {
      input.value = finalTranscript;
    }
  };
  
  recognition.onerror = function(event) {
    console.error("Speech error", event);
    isRecording = false;
    resetVoiceUI();
    appendChatMessage('ai', `Speech recognition error: ${event.error}. Please try again or type your message.`);
  };
  
  recognition.onend = function() {
    isRecording = false;
    resetVoiceUI();
    
    const input = document.getElementById('copilotTextInput');
    if (input) {
      input.placeholder = "Type your message here...";
      const text = input.value.trim();
      if (text && text !== "Listening... Speak now!") {
        input.value = '';
        showVoiceConfirmation(text);
      }
    }
  };
  
  return recognition;
}

function resetVoiceUI() {
  const btn = document.getElementById('btnVoiceRecord');
  if (btn) {
    btn.classList.remove('pulse-animation');
    btn.style.backgroundColor = '';
    btn.style.color = '';
  }
  const input = document.getElementById('copilotTextInput');
  if (input) {
    input.placeholder = "Type your message here...";
  }
}

function startMediaRecording() {
  audioChunks = [];
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => {
        audioChunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        transcribeAudioBlob(audioBlob);
      };
      
      // Delay recording start by 400ms buffer
      setTimeout(() => {
        if (mediaRecorder && mediaRecorder.state === 'inactive') {
          mediaRecorder.start();
          isRecording = true;
          const btn = document.getElementById('btnVoiceRecord');
          if (btn) {
            btn.classList.add('pulse-animation');
            btn.style.backgroundColor = 'var(--danger)';
            btn.style.color = 'white';
          }
          const input = document.getElementById('copilotTextInput');
          if (input) {
            input.placeholder = "Listening... Speak now!";
            input.value = '';
          }
        }
      }, 400);
    })
    .catch(err => {
      console.error("Microphone access error:", err);
      appendChatMessage('ai', "Could not access microphone. Check permissions and try again.");
      resetVoiceUI();
    });
}

function transcribeAudioBlob(audioBlob) {
  const engine = localStorage.getItem('pmgm_copilot_speech_engine') || 'browser';
  const apiKey = localStorage.getItem('pmgm_copilot_api_key') || '';
  
  if (!apiKey) {
    appendChatMessage('ai', "Error: API Key is missing. Falling back to local browser speech recognition.");
    localStorage.setItem('pmgm_copilot_speech_engine', 'browser');
    toggleVoiceRecord();
    return;
  }

  showTypingIndicator();

  const formData = new FormData();
  formData.append('file', audioBlob, 'speech.webm');
  formData.append('model', 'whisper-1');

  let url = '';
  if (engine === 'groq') {
    url = 'https://api.groq.com/openai/v1/audio/transcriptions';
  } else {
    url = 'https://api.openai.com/v1/audio/transcriptions';
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey
    },
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Cloud Whisper error " + res.status);
      return res.json();
    })
    .then(data => {
      removeTypingIndicator();
      const transcript = data.text || '';
      if (transcript.trim()) {
        showVoiceConfirmation(transcript.trim());
      } else {
        appendChatMessage('ai', "Whisper transcribed silence. Please try again.");
      }
    })
    .catch(err => {
      removeTypingIndicator();
      console.error(err);
      appendChatMessage('ai', "Whisper failed: " + err.message + ". Please verify API Configuration.");
    });
}

function showVoiceConfirmation(transcribedText) {
  const normalized = normalizeTranscript(transcribedText);
  pendingTranscript = normalized;

  const history = document.getElementById('copilotChatHistory');
  if (!history) return;
  
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ai-message voice-confirm-container`;
  messageDiv.innerHTML = `
    <div class="message-content" style="background-color: var(--bg-secondary); border: 1px dashed var(--primary); border-radius: 12px; padding: 16px;">
      <p style="margin-bottom: 8px;">I heard: <strong style="color: var(--primary)">"${escapeHTML(normalized)}"</strong>. Is this correct?</p>
      <div style="display: flex; gap: 8px; margin-top: 12px;">
        <button onclick="confirmVoiceInput(true)" class="btn btn-sm btn-primary" style="padding: 4px 12px; font-size: 0.85rem; cursor: pointer;">Yes, Process</button>
        <button onclick="confirmVoiceInput(false)" class="btn btn-sm btn-secondary" style="padding: 4px 12px; font-size: 0.85rem; cursor: pointer;">Edit Text</button>
        <button onclick="reRecordVoiceInput()" class="btn btn-sm btn-danger" style="padding: 4px 12px; font-size: 0.85rem; cursor: pointer;">Re-record</button>
      </div>
    </div>
    <div class="message-time">${timeStr}</div>
  `;
  
  history.appendChild(messageDiv);
  history.scrollTop = history.scrollHeight;
}

window.confirmVoiceInput = function(isCorrect) {
  const container = document.querySelector('.voice-confirm-container');
  if (container) container.remove();

  if (isCorrect) {
    const textToSend = pendingTranscript;
    pendingTranscript = '';
    appendChatMessage('user', textToSend);
    processCopilotInput(textToSend);
  } else {
    const input = document.getElementById('copilotTextInput');
    if (input) {
      input.value = pendingTranscript;
      input.focus();
    }
    pendingTranscript = '';
    appendChatMessage('ai', "Feel free to edit the text in the input bar and press Enter to send.");
  }
};

window.reRecordVoiceInput = function() {
  const container = document.querySelector('.voice-confirm-container');
  if (container) container.remove();
  pendingTranscript = '';
  toggleVoiceRecord();
};

function normalizeTranscript(text) {
  let cleaned = text.trim();
  if (!cleaned) return cleaned;

  // Trim filler words
  const fillers = [
    /\b(uh|um|like|you know|so|basically|actually|literally|ah|er|eh|anyway|anyways)\b/gi
  ];
  fillers.forEach(regex => {
    cleaned = cleaned.replace(regex, '');
  });

  // Remove duplicate spaces and clean up punctuation
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // Correct names capitalization and spelling
  workforce.forEach(emp => {
    const name = emp.employeeName; // e.g. "Priya Reddy"
    const parts = name.split(' ');
    const first = parts[0];
    const last = parts[1] || '';

    // Create regexes to find case insensitive name mentions
    const fullRegex = new RegExp('\\b' + name + '\\b', 'gi');
    cleaned = cleaned.replace(fullRegex, name);

    const firstRegex = new RegExp('\\b' + first + '\\b', 'gi');
    cleaned = cleaned.replace(firstRegex, first);

    if (last) {
      const lastRegex = new RegExp('\\b' + last + '\\b', 'gi');
      cleaned = cleaned.replace(lastRegex, last);
    }

    // Phonetic spellings replacement
    if (first === 'Rahul') cleaned = cleaned.replace(/\b(rahool|raul|rawul)\b/gi, 'Rahul');
    if (first === 'Priya') cleaned = cleaned.replace(/\b(pria|prea|riya)\b/gi, 'Priya');
    if (first === 'Arjun') cleaned = cleaned.replace(/\b(arjoon)\b/gi, 'Arjun');
    if (first === 'Neha') cleaned = cleaned.replace(/\b(naya|nayha|niha)\b/gi, 'Neha');
    if (first === 'Vikram') cleaned = cleaned.replace(/\b(vicram|bikram)\b/gi, 'Vikram');
    if (first === 'Sunita') cleaned = cleaned.replace(/\b(suneeta)\b/gi, 'Sunita');
    if (first === 'Amit') cleaned = cleaned.replace(/\b(ameet)\b/gi, 'Amit');
    if (first === 'Sara') cleaned = cleaned.replace(/\b(sarah|shara)\b/gi, 'Sara');
  });

  // Capitalize first letter of the sentence
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  // Normalize final punctuation
  if (!/[.!?]$/.test(cleaned)) {
    cleaned += '.';
  }

  return cleaned;
}

function toggleVoiceRecord() {
  const engine = localStorage.getItem('pmgm_copilot_speech_engine') || 'browser';
  
  if (isRecording) {
    if (engine === 'browser') {
      if (speechRecognition) speechRecognition.stop();
    } else {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
      isRecording = false;
      resetVoiceUI();
    }
  } else {
    // Show preparing visual
    const btn = document.getElementById('btnVoiceRecord');
    if (btn) {
      btn.style.backgroundColor = 'var(--warning)';
      btn.style.color = 'white';
    }
    const input = document.getElementById('copilotTextInput');
    if (input) {
      input.placeholder = "Preparing microphone...";
    }
    
    if (engine === 'browser') {
      if (!speechRecognition) {
        speechRecognition = initSpeechRecognition();
      }
      if (!speechRecognition) return;
      
      // 400ms buffer
      setTimeout(() => {
        try {
          speechRecognition.start();
        } catch(e) {
          console.log('Recognition already started');
        }
      }, 400);
    } else {
      // Whisper media recording
      startMediaRecording();
    }
  }
}

function formatMessageText(text) {
  let formatted = escapeHTML(text);
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/(?:^|\n)[*-]\s+(.+)/g, '<br>• $1');
  formatted = formatted.replaceAll('\n', '<br>');
  return formatted;
}

function appendChatMessage(role, text) {
  const history = document.getElementById('copilotChatHistory');
  if (!history) return;
  
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${role}-message`;
  
  messageDiv.innerHTML = `
    <div class="message-content">${formatMessageText(text)}</div>
    <div class="message-time">${timeStr}</div>
  `;
  
  history.appendChild(messageDiv);
  history.scrollTop = history.scrollHeight;
}

function showTypingIndicator() {
  const history = document.getElementById('copilotChatHistory');
  if (!history) return;
  
  const indicator = document.createElement('div');
  indicator.id = 'copilotTypingIndicator';
  indicator.className = 'chat-message ai-message';
  indicator.innerHTML = `
    <div class="typing-indicator">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  history.appendChild(indicator);
  history.scrollTop = history.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('copilotTypingIndicator');
  if (indicator) {
    indicator.remove();
  }
}

function appendAIChatMessage(text) {
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    appendChatMessage('ai', text);
  }, 900);
}

function sendUserMessage(text) {
  if (!text || !text.trim()) return;
  appendChatMessage('user', text.trim());
  processCopilotInput(text.trim());
}

function findEmployeesFuzzy(text) {
  const t = text.toLowerCase().trim();
  
  // 1. Prioritize full-name matches first
  const fullNameMatches = [];
  for (let emp of workforce) {
    const fullName = emp.employeeName.toLowerCase();
    if (t.includes(fullName)) {
      fullNameMatches.push(emp);
    }
  }
  if (fullNameMatches.length > 0) {
    const unique = [];
    const ids = new Set();
    for (let emp of fullNameMatches) {
      if (!ids.has(emp.employeeId)) {
        ids.add(emp.employeeId);
        unique.push(emp);
      }
    }
    return unique;
  }

  // 2. If no full-name matches, do fuzzy/partial matching
  const matched = [];
  const checkPhonetic = (txt, first) => {
    if (first === 'rahul' && (txt.includes('rahool') || txt.includes('raul') || txt.includes('rawul'))) return true;
    if (first === 'priya' && (txt.includes('pria') || txt.includes('prea') || txt.includes('riya'))) return true;
    if (first === 'arjun' && (txt.includes('arjoon'))) return true;
    if (first === 'neha' && (txt.includes('naya') || txt.includes('nayha') || txt.includes('niha'))) return true;
    if (first === 'vikram' && (txt.includes('vicram') || txt.includes('bikram'))) return true;
    if (first === 'sunita' && (txt.includes('suneeta'))) return true;
    if (first === 'amit' && (txt.includes('ameet'))) return true;
    if (first === 'sara' && (txt.includes('sarah') || txt.includes('shara'))) return true;
    return false;
  };

  for (let emp of workforce) {
    const fullName = emp.employeeName.toLowerCase();
    const parts = fullName.split(' ');
    const first = parts[0];
    const last = parts[1] || '';

    // Check first name or phonetic match
    if (t.includes(first) || checkPhonetic(t, first)) {
      matched.push(emp);
      continue;
    }
    // Check last name match
    if (last && (t.includes(last) || (last === 'reddy' && (t.includes('redi') || t.includes('reddy'))))) {
      matched.push(emp);
      continue;
    }
  }

  // Remove duplicate matches
  const uniqueMatched = [];
  const ids = new Set();
  matched.forEach(e => {
    if (!ids.has(e.employeeId)) {
      ids.add(e.employeeId);
      uniqueMatched.push(e);
    }
  });

  return uniqueMatched;
}

function getIntentName(intent) {
  const names = {
    'positive_review': 'Positive Performance Review',
    'pip': 'Performance Review / PIP',
    'risk': 'Contractor Risk Escalation',
    'fte': 'FTE Conversion Evaluation',
    'profit': 'Profit Impact Adjustment'
  };
  return names[intent] || intent;
}

function processCopilotInput(userInput) {
  const text = userInput.trim();
  if (!text) return;

  const textLower = text.toLowerCase();

  // Reset check
  if (textLower === 'cancel' || textLower === 'reset' || textLower === 'stop' || textLower === 'restart') {
    resetCopilotState();
    appendAIChatMessage("Conversation reset. How can I help you today?");
    return;
  }

  // Handle general query requests instantly
  if (copilotState.step === 'idle' || copilotState.step === 'awaiting_intent') {
    if (textLower.includes('abc services') || textLower.includes('abc')) {
      const list = workforce.filter(e => e.vendor.toLowerCase().includes('abc'));
      const rows = list.map(e => `*   **${e.employeeName}** (${e.employeeId}) - Dept: ${e.department}, Rating: ${e.performanceRating}`).join('\n');
      appendAIChatMessage(`Here are the employees under **ABC Services**:\n${rows}`);
      resetCopilotState();
      return;
    }
    if (textLower.includes('xyz staffing') || textLower.includes('xyz')) {
      const list = workforce.filter(e => e.vendor.toLowerCase().includes('xyz'));
      const rows = list.map(e => `*   **${e.employeeName}** (${e.employeeId}) - Dept: ${e.department}, Rating: ${e.performanceRating}`).join('\n');
      appendAIChatMessage(`Here are the employees under **XYZ Staffing**:\n${rows}`);
      resetCopilotState();
      return;
    }
    if (textLower.includes('underperforming') || textLower.includes('poor performance') || textLower.includes('performance issues')) {
      const list = workforce.filter(e => e.attendancePercentage < 85 || e.tasksCompleted < 10 || e.qualityScore < 80);
      if (list.length === 0) {
        appendAIChatMessage("Great news! There are currently no employees flagged with performance issues in the database.");
      } else {
        const rows = list.map(e => `*   **${e.employeeName}** (${e.employeeId}) - Quality: ${e.qualityScore}%, Attendance: ${e.attendancePercentage}%, Rating: ${e.performanceRating}`).join('\n');
        appendAIChatMessage(`Here are the employees flagged with performance issues:\n${rows}`);
      }
      resetCopilotState();
      return;
    }
    if (textLower.includes('eligible for fte') || textLower.includes('fte eligibility')) {
      const results = workforce.map(e => {
        const productivityScore = e.tasksCompleted * 5;
        const safetyScore = Math.max(0, 100 - (e.safetyIncidents * 20));
        const fteScore = Number((e.attendancePercentage * 0.25 + productivityScore * 0.35 + e.qualityScore * 0.25 + safetyScore * 0.15).toFixed(2));
        return { name: e.employeeName, score: fteScore, eligible: fteScore >= 80 };
      });
      const eligibleList = results.filter(r => r.eligible);
      if (eligibleList.length === 0) {
        appendAIChatMessage("No contractors currently meet the 80 FTE score threshold for conversion.");
      } else {
        const rows = eligibleList.map(r => `*   **${r.name}** (FTE Score: ${r.score})`).join('\n');
        appendAIChatMessage(`Here are the contractors eligible for FTE conversion:\n${rows}`);
      }
      resetCopilotState();
      return;
    }
  }

  // Handle employee clarification routing first
  let resolvedEmployee = null;
  if (copilotState.step === 'awaiting_employee_clarification') {
    const candidates = copilotState.candidates || [];
    resolvedEmployee = candidates.find(c => {
      const name = c.employeeName.toLowerCase();
      const first = name.split(' ')[0];
      return textLower.includes(name) || textLower.includes(first);
    });
    
    if (resolvedEmployee) {
      copilotState.employee = resolvedEmployee;
      copilotState.candidates = null;
      copilotState.step = 'idle'; // Reset state step to process the remaining logic in the same pass
    } else {
      appendAIChatMessage(`I still couldn't resolve the employee. Please choose one: ${candidates.map(c => c.employeeName).join(', ')}.`);
      return;
    }
  }

  // A. Check for Employee Mention with Fuzzy Disambiguation
  let candidates = [];
  if (!copilotState.employee) {
    candidates = findEmployeesFuzzy(text);
    if (candidates.length === 1) {
      copilotState.employee = candidates[0];
    } else if (candidates.length > 1) {
      copilotState.candidates = candidates;
      copilotState.step = 'awaiting_employee_clarification';
      
      // Classify sentiment and intent on the initial input to save slots early
      let feedbackText = text;
      candidates.forEach(c => {
        const empName = c.employeeName.toLowerCase();
        const parts = empName.split(' ');
        const firstName = parts[0];
        const lastName = parts[1] || '';
        feedbackText = feedbackText.replace(new RegExp('\\b' + empName + '\\b', 'gi'), '');
        feedbackText = feedbackText.replace(new RegExp('\\b' + firstName + '\\b', 'gi'), '');
        if (lastName) {
          feedbackText = feedbackText.replace(new RegExp('\\b' + lastName + '\\b', 'gi'), '');
        }
      });
      feedbackText = feedbackText.trim().replace(/^[\s,.:;|-]+|[\s,.:;|-]+$/g, '').trim();
      if (feedbackText.length > 2) {
        copilotState.reason = feedbackText;
        
        // Classify Sentiment
        const positiveKeywords = ['great', 'good', 'excellent', 'improved', 'outstanding', 'amazing', 'awesome', 'help', 'positive', 'best', 'perfect', 'efficient', 'happy', 'satisfied', 'love', 'work well', 'done well', 'stellar', 'genius', 'performance improved', 'exceeded expectations', 'achieved targets'];
        const negativeKeywords = ['poor', 'bad', 'decline', 'drop', 'decrease', 'worse', 'fail', 'pip', 'issue', 'missed', 'absent', 'late', 'careless', 'slow', 'mistake', 'error', 'accident', 'incident', 'unsafe', 'breach', 'rejection', 'rework', 'warning', 'low', 'performance declined', 'repeated quality issues', 'performance dropped', 'missed deadlines'];
        let posCount = 0;
        let negCount = 0;
        const cleanTextLower = feedbackText.toLowerCase();
        positiveKeywords.forEach(kw => { if (cleanTextLower.includes(kw)) posCount++; });
        negativeKeywords.forEach(kw => { if (cleanTextLower.includes(kw)) negCount++; });
        
        if (posCount > negCount) copilotState.sentiment = 'positive';
        else if (negCount > posCount) copilotState.sentiment = 'negative';
        else copilotState.sentiment = 'neutral';
        
        // Classify Intent
        let detectedIntent = null;
        if (textLower.match(/\b(fte|full time|full-time|convert|conversion|promote|promotion)\b/)) {
          detectedIntent = 'fte';
        } else if (textLower.match(/\b(risk|safety|incident|violation|accident|compliance|high risk|contract risk)\b/)) {
          detectedIntent = 'risk';
        } else if (textLower.match(/\b(profit|rework|rework expense|rejection|reject|expense|impact|cost)\b/)) {
          detectedIntent = 'profit';
        } else if (textLower.match(/\b(pip|issue pip|put on pip|performance improvement plan)\b/)) {
          detectedIntent = 'pip';
        } else if (textLower.match(/\b(performance|rating|quality score|evaluation|evaluate|review)\b/)) {
          if (copilotState.sentiment === 'positive') detectedIntent = 'positive_review';
          else if (copilotState.sentiment === 'negative') detectedIntent = 'pip';
        }
        if (!detectedIntent && copilotState.reason) {
          if (copilotState.sentiment === 'positive') detectedIntent = 'positive_review';
          else if (copilotState.sentiment === 'negative') detectedIntent = 'pip';
        }
        if (detectedIntent) {
          copilotState.intent = detectedIntent;
          copilotState.active = true;
        }
      }
      
      appendAIChatMessage(`I found multiple employees matching your request: **${candidates.map(c => c.employeeName).join(', ')}**. Which employee do you mean?`);
      return;
    }
  }

  // B. Extract feedback / reason by stripping the employee name from the input text
  let feedbackText = text;
  if (copilotState.employee) {
    const empName = copilotState.employee.employeeName.toLowerCase();
    const parts = empName.split(' ');
    const firstName = parts[0];
    const lastName = parts[1] || '';
    
    feedbackText = feedbackText.replace(new RegExp('\\b' + empName + '\\b', 'gi'), '');
    feedbackText = feedbackText.replace(new RegExp('\\b' + firstName + '\\b', 'gi'), '');
    if (lastName) {
      feedbackText = feedbackText.replace(new RegExp('\\b' + lastName + '\\b', 'gi'), '');
    }
  }
  feedbackText = feedbackText.trim().replace(/^[\s,.:;|-]+|[\s,.:;|-]+$/g, '').trim();

  // Store extracted reason/feedback if we obtained a valid feedback string
  if (feedbackText.length > 2) {
    copilotState.reason = feedbackText;
  }

  // C. Classify Sentiment
  const positiveKeywords = ['great', 'good', 'excellent', 'improved', 'outstanding', 'amazing', 'awesome', 'help', 'positive', 'best', 'perfect', 'efficient', 'happy', 'satisfied', 'love', 'work well', 'done well', 'stellar', 'genius', 'performance improved', 'exceeded expectations', 'achieved targets'];
  const negativeKeywords = ['poor', 'bad', 'decline', 'drop', 'decrease', 'worse', 'fail', 'pip', 'issue', 'missed', 'absent', 'late', 'careless', 'slow', 'mistake', 'error', 'accident', 'incident', 'unsafe', 'breach', 'rejection', 'rework', 'warning', 'low', 'performance declined', 'repeated quality issues', 'performance dropped', 'missed deadlines'];
  
  let posCount = 0;
  let negCount = 0;
  const cleanTextLower = feedbackText.toLowerCase();
  
  positiveKeywords.forEach(kw => {
    if (cleanTextLower.includes(kw)) posCount++;
  });
  negativeKeywords.forEach(kw => {
    if (cleanTextLower.includes(kw)) negCount++;
  });

  let classifiedSentiment = 'neutral';
  if (posCount > negCount) classifiedSentiment = 'positive';
  else if (negCount > posCount) classifiedSentiment = 'negative';

  if (classifiedSentiment !== 'neutral' || copilotState.sentiment === null) {
    copilotState.sentiment = classifiedSentiment;
  }

  // D. Classify Intent
  let detectedIntent = null;
  if (textLower.match(/\b(fte|full time|full-time|convert|conversion|promote|promotion)\b/)) {
    detectedIntent = 'fte';
  } else if (textLower.match(/\b(risk|safety|incident|violation|accident|compliance|high risk|contract risk)\b/)) {
    detectedIntent = 'risk';
  } else if (textLower.match(/\b(profit|rework|rework expense|rejection|reject|expense|impact|cost)\b/)) {
    detectedIntent = 'profit';
  } else if (textLower.match(/\b(pip|issue pip|put on pip|performance improvement plan)\b/)) {
    detectedIntent = 'pip';
  } else if (textLower.match(/\b(performance|rating|quality score|evaluation|evaluate|review)\b/)) {
    if (copilotState.sentiment === 'positive') {
      detectedIntent = 'positive_review';
    } else if (copilotState.sentiment === 'negative') {
      detectedIntent = 'pip';
    }
  }

  // Fallback: If no explicit workflow keywords are present, determine intent from feedback sentiment
  if (!detectedIntent && copilotState.reason) {
    if (copilotState.sentiment === 'positive') {
      detectedIntent = 'positive_review';
    } else if (copilotState.sentiment === 'negative') {
      detectedIntent = 'pip';
    }
  }

  // Store intent if found
  if (detectedIntent) {
    copilotState.intent = detectedIntent;
    copilotState.active = true;
  }

  // E. Execute State Machine Routing
  if (copilotState.step === 'idle' || copilotState.step === 'awaiting_employee' || copilotState.step === 'awaiting_intent' || copilotState.step === 'awaiting_reason') {
    evaluateNextCopilotStep();
  } else if (copilotState.step === 'awaiting_metric_value') {
    const valMatch = text.match(/\$?(\d+)/);
    if (valMatch) {
      copilotState.value = parseInt(valMatch[1]);
      evaluateNextCopilotStep();
    } else {
      appendAIChatMessage(`Please enter a valid numeric value for the metric.`);
    }
  } else if (copilotState.step === 'awaiting_confirmation') {
    if (textLower.match(/\b(yes|y|confirm|proceed|ok|sure|do it|agree)\b/)) {
      executeCopilotAction();
    } else if (textLower.match(/\b(no|n|cancel|stop|abort|dont|don't)\b/)) {
      resetCopilotState();
      appendAIChatMessage(`Action cancelled. How else can I assist you today?`);
    } else {
      appendAIChatMessage(`I didn't get a clear confirmation. Would you like me to proceed with this update? Please reply with **Yes** or **No**.`);
    }
  }
}

function evaluateNextCopilotStep() {
  if (!copilotState.employee) {
    copilotState.step = 'awaiting_employee';
    appendAIChatMessage(`Which employee is this for?`);
    return;
  }
  
  if (!copilotState.intent) {
    copilotState.step = 'awaiting_intent';
    appendAIChatMessage(`I found employee **${copilotState.employee.employeeName}**. What action would you like to perform? You can:
*   Evaluate for **FTE Conversion**
*   Flag **Performance / PIP**
*   Log **Safety Risk / Incidents**
*   Adjust **Profit Impact / Metrics**`);
    return;
  }

  if (copilotState.intent === 'profit') {
    const textLower = (copilotState.reason || '').toLowerCase() + ' ' + (copilotState.field || '').toLowerCase();
    if (copilotState.field === null) {
      if (textLower.includes('rework') || textLower.includes('expense')) {
        copilotState.field = 'reworkExpense';
      } else if (textLower.includes('rejection') || textLower.includes('reject')) {
        copilotState.field = 'rejectionCount';
      } else {
        copilotState.step = 'awaiting_metric_value';
        appendAIChatMessage(`Would you like to adjust **Rework Expense** or **Rejection Count** for ${copilotState.employee.employeeName}? Please specify the metric and new value (e.g., "Rework to 1500" or "Rejections to 3").`);
        return;
      }
    }
    
    if (copilotState.value === null) {
      const numMatch = textLower.match(/\$?(\d+)/);
      if (numMatch) {
        copilotState.value = parseInt(numMatch[1]);
      } else {
        copilotState.step = 'awaiting_metric_value';
        appendAIChatMessage(`What is the new value for ${copilotState.field === 'reworkExpense' ? 'Rework Expense ($)' : 'Rejection Count'}?`);
        return;
      }
    }
  }

  if (!copilotState.reason && copilotState.intent !== 'fte') {
    copilotState.step = 'awaiting_reason';
    appendAIChatMessage(`I've set up the **${getIntentName(copilotState.intent)}** for **${copilotState.employee.employeeName}**. Could you please provide a brief reason or context for this update?`);
    return;
  }

  // All inputs are collected! Enter confirmation phase
  copilotState.step = 'awaiting_confirmation';
  
  const emp = copilotState.employee;
  const reason = copilotState.reason || 'Requested FTE Evaluation';
  
  if (copilotState.intent === 'positive_review') {
    const currentQuality = emp.qualityScore;
    const newQuality = Math.min(100, currentQuality + 5);
    const currentRating = emp.performanceRating;
    const newRating = Math.min(5.0, (parseFloat(currentRating) + 0.3).toFixed(1));
    
    copilotState.tempData = {
      qualityScore: newQuality,
      performanceRating: newRating
    };

    appendAIChatMessage(`I identified:

Employee: **${emp.employeeName}**
Sentiment: **Positive**

Feedback:
${reason}

Suggested Action:
Record Positive Performance Review.
*   **Quality Score:** ${currentQuality}% → **${newQuality}%**
*   **Performance Rating:** ${currentRating} → **${newRating}**

Would you like me to update the workforce database? (Type/say **Yes** to confirm, **No** to cancel)`);
  }
  
  else if (copilotState.intent === 'pip') {
    const currentQuality = emp.qualityScore;
    const newQuality = Math.max(0, currentQuality - 5);
    const currentRating = emp.performanceRating;
    const newRating = Math.max(1.0, (parseFloat(currentRating) - 0.5).toFixed(1));
    
    copilotState.tempData = {
      qualityScore: newQuality,
      performanceRating: newRating
    };
    
    appendAIChatMessage(`I identified:

Employee: **${emp.employeeName}**
Sentiment: **Negative**

Feedback:
${reason}

Suggested Action:
Record performance issue and issue PIP warning.
*   **Quality Score:** ${currentQuality}% → **${newQuality}%**
*   **Performance Rating:** ${currentRating} → **${newRating}**

Would you like me to update the workforce database with these changes? (Type/say **Yes** to confirm, **No** to cancel)`);
  } 
  
  else if (copilotState.intent === 'risk') {
    const currentIncidents = emp.safetyIncidents;
    const newIncidents = currentIncidents + 1;
    const currentQuality = emp.qualityScore;
    const newQuality = Math.max(0, currentQuality - 5);
    const currentRating = emp.performanceRating;
    const newRating = Math.max(1.0, (parseFloat(currentRating) - 0.3).toFixed(1));
    
    copilotState.tempData = {
      safetyIncidents: newIncidents,
      qualityScore: newQuality,
      performanceRating: newRating
    };
    
    appendAIChatMessage(`I've prepared a Contractor Risk Update:
*   **Employee:** ${emp.employeeName} (ID: ${emp.employeeId})
*   **Action:** Log safety incident and elevate risk status
*   **Safety Incidents:** ${currentIncidents} → **${newIncidents}**
*   **Quality Score:** ${currentQuality}% → **${newQuality}%**
*   **Performance Rating:** ${currentRating} → **${newRating}**
*   **Vendor Warning:** Sent to ${emp.vendor}
*   **Reason/Context:** "${reason}"

Would you like me to proceed with escalations? (Type/say **Yes** to confirm, **No** to cancel)`);
  } 
  
  else if (copilotState.intent === 'fte') {
    const productivityScore = emp.tasksCompleted * 5; 
    const safetyScore = Math.max(0, 100 - (emp.safetyIncidents * 20));
    const fteScore = Number((emp.attendancePercentage * 0.25 + productivityScore * 0.35 + emp.qualityScore * 0.25 + safetyScore * 0.15).toFixed(2));
    const eligible = fteScore >= 80;
    
    copilotState.tempData = {
      fteScore: fteScore,
      eligible: eligible,
      vendor: 'FTE (Permanent)'
    };
    
    if (eligible) {
      appendAIChatMessage(`I've completed the FTE Conversion Evaluation for **${emp.employeeName}**:
*   **Overall FTE Score:** **${fteScore}** / 100 (Threshold: 80)
*   **Eligibility Status:** **Eligible** (Meets criteria)
*   **Proposed Action:** Transition to FTE Permanent Contract
*   **Reason/Context:** "${reason}"

Would you like to approve the FTE conversion? (Type/say **Yes** to confirm, **No** to cancel)`);
    } else {
      appendAIChatMessage(`I've completed the FTE Conversion Evaluation for **${emp.employeeName}**:
*   **Overall FTE Score:** **${fteScore}** / 100 (Threshold: 80)
*   **Eligibility Status:** **Not Eligible** (Below threshold)
*   **Proposed Action:** System Override — Force FTE Transition
*   **Reason/Context:** "${reason}"

Since the score is below the 80 threshold, this requires an administrative override. Would you like to override the system recommendation and proceed? (Type/say **Yes** to confirm, **No** to cancel)`);
    }
  } 
  
  else if (copilotState.intent === 'profit') {
    const field = copilotState.field || 'reworkExpense';
    const val = copilotState.value || 1000;
    const currentVal = emp[field];
    
    copilotState.tempData = {
      [field]: val
    };
    
    const fieldLabel = field === 'reworkExpense' ? 'Rework Expense ($)' : 'Rejection Count';
    
    appendAIChatMessage(`I've prepared a Profit-to-Performance adjustment:
*   **Employee:** ${emp.employeeName} (ID: ${emp.employeeId})
*   **Action:** Modify financial metrics and recalculate profit impact
*   **Metric:** ${fieldLabel} (${currentVal} → **${val}**)
*   **Reason/Context:** "${reason}"

Would you like to save this adjustment? (Type/say **Yes** to confirm, **No** to cancel)`);
  }
}

function executeCopilotAction() {
  const emp = copilotState.employee;
  const intent = copilotState.intent;
  const tempData = copilotState.tempData;
  const reason = copilotState.reason || 'Requested FTE Evaluation';

  const idx = workforce.findIndex(e => e.employeeId === emp.employeeId);
  if (idx === -1) {
    appendAIChatMessage("Error: Employee could not be found in the active database.");
    resetCopilotState();
    return;
  }

  // Capture previous record for comparison
  const previousRecord = { ...workforce[idx] };

  // Apply updates
  Object.keys(tempData).forEach(key => {
    if (key in workforce[idx]) {
      workforce[idx][key] = tempData[key];
    }
  });

  saveToLocalStorage();
  renderDashboardData();
  renderEmployeeDatabase();

  if (intent === 'positive_review') {
    const prevQuality = previousRecord.qualityScore;
    const prevRating = previousRecord.performanceRating;
    runFlowDailySilent();
    logSystemEvent(`Workforce Copilot recorded positive review for ${emp.employeeName} (Feedback: ${reason})`, 'success');
    addNotification('Positive Review', `Recorded positive review for ${emp.employeeName}.`, 'success', 'flow-voice');
    appendAIChatMessage(`Successfully updated records for **${emp.employeeName}**!
*   **Quality Score:** ${prevQuality}% → **${workforce[idx].qualityScore}%**
*   **Performance Rating:** ${prevRating} → **${workforce[idx].performanceRating}**
*   Supervisor notification sent to **${emp.supervisorEmail}**.
*   Action logged in Audit Sync History.`);
  } 
  
  else if (intent === 'pip') {
    const prevQuality = previousRecord.qualityScore;
    const prevRating = previousRecord.performanceRating;
    runFlowDailySilent();
    logSystemEvent(`Workforce Copilot updated performance records for ${emp.employeeName} (Reason: ${reason})`, 'warning');
    addNotification('Performance Warning', `Issued PIP warning to ${emp.employeeName}.`, 'warning', 'flow-voice');
    appendAIChatMessage(`Successfully updated records for **${emp.employeeName}**!
*   **Quality Score:** ${prevQuality}% → **${workforce[idx].qualityScore}%**
*   **Performance Rating:** ${prevRating} → **${workforce[idx].performanceRating}**
*   Supervisor notification sent to **${emp.supervisorEmail}**.
*   Action logged in Audit Sync History.`);
  } 
  
  else if (intent === 'risk') {
    const prevIncidents = previousRecord.safetyIncidents;
    const prevQuality = previousRecord.qualityScore;
    const prevRating = previousRecord.performanceRating;
    runFlowRiskSilent();
    logSystemEvent(`Workforce Copilot logged safety incident for ${emp.employeeName} (Reason: ${reason})`, 'danger');
    addNotification('Contractor Risk', `Logged safety incident for ${emp.employeeName}.`, 'danger', 'flow-voice');
    appendAIChatMessage(`Successfully logged safety incident and updated risk status for **${emp.employeeName}**!
*   **Safety Incidents:** ${prevIncidents} → **${workforce[idx].safetyIncidents}**
*   **Quality Score:** ${prevQuality}% → **${workforce[idx].qualityScore}%**
*   **Performance Rating:** ${prevRating} → **${workforce[idx].performanceRating}**
*   Contractor risk level recalculated.
*   Warning dispatch sent to vendor: **${emp.vendor}**.`);
  } 
  
  else if (intent === 'fte') {
    const prevVendor = previousRecord.vendor;
    runFlowFteSilent();
    logSystemEvent(`Workforce Copilot approved FTE conversion for ${emp.employeeName} (Reason: ${reason})`, 'success');
    addNotification('FTE Promotion', `FTE Conversion completed for ${emp.employeeName}.`, 'success', 'flow-voice');
    appendAIChatMessage(`Successfully transitioned **${emp.employeeName}** to FTE (Full-Time Employee) status!
*   **Vendor:** ${prevVendor} → **${workforce[idx].vendor}**
*   HR onboarding dossier initialized.
*   Audit history synced.`);
  } 
  
  else if (intent === 'profit') {
    runFlowProfitSilent();
    logSystemEvent(`Workforce Copilot adjusted profit metrics for ${emp.employeeName} (Reason: ${reason})`, 'info');
    addNotification('Profit Impact', `Adjusted profit metrics for ${emp.employeeName}.`, 'info', 'flow-voice');
    const fieldLabel = copilotState.field === 'reworkExpense' ? 'Rework Expense ($)' : 'Rejection Count';
    const prevVal = previousRecord[copilotState.field];
    const newVal = workforce[idx][copilotState.field];
    appendAIChatMessage(`Successfully adjusted profit metrics for **${emp.employeeName}**!
*   **${fieldLabel}:** ${prevVal} → **${newVal}**
*   Performance-to-Profit ledger re-audited.
*   Financial forecast dashboards updated.`);
  }

  resetCopilotState();
}

function runFlowDailySilent() {
  const flaggedList = [];
  workforce.forEach(e => {
    const issue = e.attendancePercentage < 85 || e.tasksCompleted < 10 || e.qualityScore < 80;
    if (issue) {
      const reasons = [];
      if (e.attendancePercentage < 85) reasons.push("Low attendance");
      if (e.tasksCompleted < 10) reasons.push("Low productivity");
      if (e.qualityScore < 80) reasons.push("Low quality score");
      
      flaggedList.push({
        employeeId: e.employeeId,
        employeeName: e.employeeName,
        supervisorEmail: e.supervisorEmail,
        attendance: e.attendancePercentage,
        tasks: e.tasksCompleted,
        quality: e.qualityScore,
        reasons: reasons
      });
    }
  });

  dailyMonitorResults = flaggedList;
  renderFlowDailyResults();
  const flaggedDailyCount = document.getElementById('flaggedDailyCount');
  if (flaggedDailyCount) flaggedDailyCount.textContent = flaggedList.length;
}

function runFlowRiskSilent() {
  const results = [];
  workforce.forEach(e => {
    const taskScore = Math.min((e.tasksCompleted / 20) * 100, 100);
    const riskScore = Math.round(e.attendancePercentage * 0.4 + taskScore * 0.3 + e.qualityScore * 0.3);
    
    let level = "Low";
    if (riskScore < 70) level = "High";
    else if (riskScore < 85) level = "Medium";

    results.push({
      employeeId: e.employeeId,
      employeeName: e.employeeName,
      vendor: e.vendor,
      department: e.department,
      supervisorEmail: e.supervisorEmail,
      riskScore: riskScore,
      level: level,
      metrics: {
        attendance: e.attendancePercentage,
        tasks: e.tasksCompleted,
        quality: e.qualityScore,
        incidents: e.safetyIncidents
      }
    });
  });

  riskScoringResults = results;
  renderFlowRiskResults();
  
  const highCount = results.filter(r => r.level === "High").length;
  const medCount  = results.filter(r => r.level === "Medium").length;
  const lowCount  = results.filter(r => r.level === "Low").length;
  
  const ch = document.getElementById('chipRiskHigh');
  if (ch) ch.textContent = `${highCount} High Risk`;
  const cm = document.getElementById('chipRiskMedium');
  if (cm) cm.textContent = `${medCount} Medium Risk`;
  const cl = document.getElementById('chipRiskLow');
  if (cl) cl.textContent = `${lowCount} Low Risk`;
}

function runFlowFteSilent() {
  const results = [];
  workforce.forEach(e => {
    const productivityScore = e.tasksCompleted * 5; 
    const safetyScore = Math.max(0, 100 - (e.safetyIncidents * 20));
    const fteScore = Number((e.attendancePercentage * 0.25 + productivityScore * 0.35 + e.qualityScore * 0.25 + safetyScore * 0.15).toFixed(2));
    const eligible = fteScore >= 80;

    results.push({
      employeeId: e.employeeId,
      employeeName: e.employeeName,
      vendor: e.vendor,
      department: e.department,
      metrics: {
        attendance: e.attendancePercentage,
        productivity: productivityScore,
        quality: e.qualityScore,
        safety: safetyScore,
        incidents: e.safetyIncidents
      },
      fteScore: fteScore,
      eligible: eligible
    });
  });

  fteEvaluationResults = results;
  renderFlowFteResults();
}

function runFlowProfitSilent() {
  const audited = [];
  let grandTotalImpact = 0;
  let totalRating = 0;
  let totalRejections = 0;
  let totalRework = 0;
  let totalProductivity = 0;

  workforce.forEach(e => {
    const productivityScore = (e.tasksCompleted * 20) + e.qualityScore;
    const profitImpact = Math.round((e.performanceRating * 1000) + (productivityScore * 10) - (e.rejectionCount * 300) - e.reworkExpense);
    
    audited.push({
      employeeId: e.employeeId,
      employeeName: e.employeeName,
      rating: e.performanceRating,
      rejections: e.rejectionCount,
      rework: e.reworkExpense,
      productivity: productivityScore,
      impact: profitImpact
    });

    grandTotalImpact += profitImpact;
    totalRating += e.performanceRating;
    totalRejections += e.rejectionCount;
    totalRework += e.reworkExpense;
    totalProductivity += productivityScore;
  });

  const avgRating = (totalRating / workforce.length).toFixed(2);
  const avgProductivity = (totalProductivity / workforce.length).toFixed(1);

  profitAnalyticsResults = {
    items: audited,
    summary: {
      totalEmployees: workforce.length,
      avgPerformanceRating: avgRating,
      totalRejections: totalRejections,
      totalReworkExpense: totalRework,
      estimatedProfitImpact: grandTotalImpact,
      avgProductivityScore: avgProductivity
    }
  };
  
  renderFlowProfitResults();
}

function clearAuditLogs() {
  if (confirm("Are you sure you want to clear system sync logs?")) {
    auditLogs = [];
    localStorage.setItem('pmgm_audits', JSON.stringify(auditLogs));
    logSystemEvent("Sync logs cleared.", "info");
  }
}

// Export workforce database to CSV
function exportCSV() {
  if (workforce.length === 0) {
    showToast('No data to export.', 'warning');
    return;
  }
  const headers = ['EmployeeID','Name','Vendor','Department','SupervisorEmail','Attendance%','TasksCompleted','QualityScore%','PerformanceRating','Rejections','ReworkExpense','SafetyIncidents'];
  const rows = workforce.map(e => [
    e.employeeId, e.employeeName, e.vendor, e.department, e.supervisorEmail,
    e.attendancePercentage, e.tasksCompleted, e.qualityScore, e.performanceRating,
    e.rejectionCount, e.reworkExpense, e.safetyIncidents
  ].join(','));
  
  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `PMGM_Workforce_Export_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  logSystemEvent(`Exported ${workforce.length} records to CSV file.`, 'success');
  showToast(`Exported ${workforce.length} records to CSV.`, 'success');
}

// Reset to Defaults
function loadDefaults() {
  if (confirm("Revert database to original spreadsheet mock datasets? All current changes will be overwritten.")) {
    workforce = JSON.parse(JSON.stringify(DEFAULT_WORKFORCE));
    saveToLocalStorage();
    logSystemEvent("Database reset to spreadsheet baseline.", "success");
    
    // Clear flow results
    dailyMonitorResults = null;
    riskScoringResults = null;
    profitAnalyticsResults = null;
    fteEvaluationResults = null;

    renderDashboardData();
    renderEmployeeDatabase();
    renderFlowDailyResults();
    renderFlowRiskResults();
    renderFlowProfitResults();
    renderFlowFteResults();
  }
}

// Sync/Run All Flows sequentially
function runAllFlows() {
  logSystemEvent("Initiating full multi-flow sync pipeline...", "info");
  runFlowDaily();
  setTimeout(runFlowRisk, 3500);
  setTimeout(runFlowProfit, 7000);
  setTimeout(runFlowFte, 10500);
}

// ================= EVENT LISTENERS SETUP =================

function setupEventListeners() {
  // Navigation Tabs switching
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      switchView(view);
    });
  });

  // Notifications dropdown
  const notifBtn = document.getElementById('notificationBtn');
  const notifDropdown = document.getElementById('notificationDropdown');
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
        notifDropdown.classList.remove('active');
      }
    });
  }

  const clearBtn = document.getElementById('clearNotificationsBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      appNotifications = [];
      renderNotifications();
    });
  }

  // Browser Back/Forward navigation
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.viewId) {
      switchView(e.state.viewId, e.state.filterText || '', false);
    } else {
      const hash = window.location.hash.substring(1).split('?')[0];
      if (panels[hash]) {
        switchView(hash, '', false);
      } else {
        switchView('dashboard', '', false);
      }
    }
  });

  // Dark/Light Theme toggling
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    logSystemEvent(`Theme toggled to ${newTheme} mode.`, 'info');
  });

  // Search filter database
  const dbSearch = document.getElementById('dbSearch');
  dbSearch.addEventListener('input', (e) => {
    renderEmployeeDatabase(e.target.value);
  });

  // Modal open buttons
  document.getElementById('btnAddNewEmployee').addEventListener('click', openAddEmployeeForm);
  document.getElementById('btnCloseModal').addEventListener('click', () => employeeModal.classList.remove('active'));
  document.getElementById('btnCancelForm').addEventListener('click', () => employeeModal.classList.remove('active'));
  
  // CSV Modal open buttons
  document.getElementById('btnImportCSV').addEventListener('click', () => {
    csvTextarea.value = '';
    importModal.classList.add('active');
  });
  document.getElementById('btnCloseImportModal').addEventListener('click', () => importModal.classList.remove('active'));
  document.getElementById('btnCancelImport').addEventListener('click', () => importModal.classList.remove('active'));
  
  // Save form submission
  employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const idxVal = document.getElementById('formEmployeeIndex').value;
    
    const emp = {
      employeeId: document.getElementById('formEmployeeId').value,
      employeeName: document.getElementById('formEmployeeName').value,
      vendor: document.getElementById('formVendor').value,
      department: document.getElementById('formDepartment').value,
      supervisorEmail: document.getElementById('formSupervisorEmail').value,
      attendancePercentage: parseFloat(document.getElementById('formAttendance').value),
      tasksCompleted: parseInt(document.getElementById('formTasks').value),
      qualityScore: parseFloat(document.getElementById('formQuality').value),
      performanceRating: parseFloat(document.getElementById('formPerformanceRating').value),
      rejectionCount: parseInt(document.getElementById('formRejections').value),
      reworkExpense: parseInt(document.getElementById('formRework').value),
      safetyIncidents: parseInt(document.getElementById('formSafety').value)
    };

    if (idxVal !== '') {
      // Edit mode
      const idx = parseInt(idxVal);
      workforce[idx] = emp;
      logSystemEvent(`Updated employee details for: ${emp.employeeName} (${emp.employeeId})`, 'success');
    } else {
      // Add mode
      // Check duplicate ID
      if (workforce.some(w => w.employeeId === emp.employeeId)) {
        alert("Employee ID already exists. Please check details.");
        return;
      }
      workforce.push(emp);
      logSystemEvent(`Added new employee: ${emp.employeeName} (${emp.employeeId})`, 'success');
    }

    saveToLocalStorage();
    renderDashboardData();
    renderEmployeeDatabase();
    employeeModal.classList.remove('active');
  });

  // CSV parsing
  document.getElementById('btnParseImport').addEventListener('click', () => {
    const text = csvTextarea.value.trim();
    if (!text) {
      alert("Please paste CSV data first.");
      return;
    }

    const rows = text.split('\n');
    let importedCount = 0;
    
    rows.forEach(row => {
      const cols = row.split(',').map(c => c.trim());
      if (cols.length >= 12 && cols[0].startsWith('EMP')) {
        const emp = {
          employeeId: cols[0],
          employeeName: cols[1],
          vendor: cols[2],
          department: cols[3],
          supervisorEmail: cols[4],
          attendancePercentage: parseFloat(cols[5]) || 0,
          tasksCompleted: parseInt(cols[6]) || 0,
          qualityScore: parseFloat(cols[7]) || 0,
          performanceRating: parseFloat(cols[8]) || 1.0,
          rejectionCount: parseInt(cols[9]) || 0,
          reworkExpense: parseInt(cols[10]) || 0,
          safetyIncidents: parseInt(cols[11]) || 0
        };

        // Add or overwrite
        const matchIdx = workforce.findIndex(w => w.employeeId === emp.employeeId);
        if (matchIdx !== -1) {
          workforce[matchIdx] = emp;
        } else {
          workforce.push(emp);
        }
        importedCount++;
      }
    });

    if (importedCount > 0) {
      saveToLocalStorage();
      renderDashboardData();
      renderEmployeeDatabase();
      logSystemEvent(`Imported ${importedCount} employees from CSV.`, 'success');
      importModal.classList.remove('active');
    } else {
      alert("No valid data rows found. Ensure the CSV conforms to the template: ID, Name, Vendor, Dept, Email, Attendance, Tasks, Quality, Rating, Rejections, Rework, Safety");
    }
  });

  // Flow Run Actions
  document.getElementById('btnRunFlowDaily').addEventListener('click', runFlowDaily);
  document.getElementById('btnRunFlowRisk').addEventListener('click', runFlowRisk);
  document.getElementById('btnRunFlowProfit').addEventListener('click', runFlowProfit);
  document.getElementById('btnRunFlowFte').addEventListener('click', runFlowFte);
  document.getElementById('btnRunAllFlows').addEventListener('click', runAllFlows);
  
  // Reset database defaults
  document.getElementById('btnQuickLoad').addEventListener('click', loadDefaults);
  
  // Clear audits list
  document.getElementById('btnClearAudits').addEventListener('click', clearAuditLogs);

  // Voice Recording Listener
  const btnVoiceRecord = document.getElementById('btnVoiceRecord');
  if (btnVoiceRecord) {
    btnVoiceRecord.addEventListener('click', toggleVoiceRecord);
  }

  // Copilot Text/Send Listeners
  const btnCopilotSend = document.getElementById('btnCopilotSend');
  const copilotTextInput = document.getElementById('copilotTextInput');
  
  if (btnCopilotSend && copilotTextInput) {
    btnCopilotSend.addEventListener('click', () => {
      const text = copilotTextInput.value.trim();
      if (text) {
        copilotTextInput.value = '';
        sendUserMessage(text);
      }
    });

    copilotTextInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = copilotTextInput.value.trim();
        if (text) {
          copilotTextInput.value = '';
          sendUserMessage(text);
        }
      }
    });
  }

  // Copilot Settings Modal Event Listeners
  const copilotSettingsModal = document.getElementById('copilotSettingsModal');
  const btnCopilotSettings = document.getElementById('btnCopilotSettings');
  const btnCloseSettingsModal = document.getElementById('btnCloseSettingsModal');
  const btnCancelSettings = document.getElementById('btnCancelSettings');
  const btnSaveSettings = document.getElementById('btnSaveSettings');
  const settingsSpeechEngine = document.getElementById('settingsSpeechEngine');
  const settingsApiKey = document.getElementById('settingsApiKey');
  const grpApiKey = document.getElementById('grpApiKey');

  if (btnCopilotSettings && copilotSettingsModal) {
    btnCopilotSettings.addEventListener('click', () => {
      const currentEngine = localStorage.getItem('pmgm_copilot_speech_engine') || 'browser';
      const currentApiKey = localStorage.getItem('pmgm_copilot_api_key') || '';
      
      if (settingsSpeechEngine) {
        settingsSpeechEngine.value = currentEngine;
        if (currentEngine === 'browser') {
          grpApiKey.style.display = 'none';
        } else {
          grpApiKey.style.display = 'block';
        }
      }
      if (settingsApiKey) {
        settingsApiKey.value = currentApiKey;
      }
      copilotSettingsModal.classList.add('active');
    });

    const closeSettings = () => {
      copilotSettingsModal.classList.remove('active');
    };

    if (btnCloseSettingsModal) btnCloseSettingsModal.addEventListener('click', closeSettings);
    if (btnCancelSettings) btnCancelSettings.addEventListener('click', closeSettings);

    if (settingsSpeechEngine) {
      settingsSpeechEngine.addEventListener('change', () => {
        if (settingsSpeechEngine.value === 'browser') {
          grpApiKey.style.display = 'none';
        } else {
          grpApiKey.style.display = 'block';
        }
      });
    }

    if (btnSaveSettings) {
      btnSaveSettings.addEventListener('click', () => {
        const engine = settingsSpeechEngine.value;
        const key = settingsApiKey.value.trim();
        localStorage.setItem('pmgm_copilot_speech_engine', engine);
        localStorage.setItem('pmgm_copilot_api_key', key);
        closeSettings();
        logSystemEvent(`Workforce Copilot speech engine configured to: ${engine}`, 'info');
        appendChatMessage('ai', `Transcription engine successfully updated to **${engine === 'browser' ? 'Browser Web Speech API' : (engine === 'groq' ? 'Groq Whisper' : 'OpenAI Whisper')}**.`);
      });
    }
  }

  // Export CSV
  document.getElementById('btnExportCSV').addEventListener('click', exportCSV);

  // Drag & Drop CSV
  csvDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    csvDropzone.style.borderColor = 'var(--primary)';
    csvDropzone.style.backgroundColor = 'var(--primary-glow)';
  });

  csvDropzone.addEventListener('dragleave', () => {
    csvDropzone.style.borderColor = 'var(--card-border)';
    csvDropzone.style.backgroundColor = 'rgba(30, 41, 59, 0.2)';
  });

  csvDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    csvDropzone.style.borderColor = 'var(--card-border)';
    csvDropzone.style.backgroundColor = 'rgba(30, 41, 59, 0.2)';

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        csvTextarea.value = event.target.result;
        logSystemEvent(`Loaded CSV file: ${file.name}`, 'info');
      };
      reader.readAsText(file);
    }
  });
}

// Copy draft helper
window.copyEmailContent = function() {
  const container = document.querySelector('.email-body');
  if (container) {
    navigator.clipboard.writeText(container.innerText)
      .then(() => alert("Email draft copied to clipboard!"))
      .catch(() => alert("Failed to copy clipboard."));
  }
};

// Escape helper for logger
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Run init on load
window.addEventListener('DOMContentLoaded', init);
