// State Management
let currentCountry = 'all'; // 'all', 'us', 'canada'
let currentUnit = 'hectares'; // 'acres', 'hectares', 'sq_km', 'sq_mi'
let currentRegion = 'all'; // 'all' or specific region ID
let currentOutlierYear = 2023; // Default outlier spotlight

// Chart instances
let areaChartInstance = null;
let trendChartInstance = null;
let regionalChartInstance = null;

// Conversion rates (Base unit is Hectares)
const HECTARE_TO_ACRE = 2.47105;
const HECTARE_TO_SQKM = 0.01;
const HECTARE_TO_SQMI = 0.00386102;

const ACRE_TO_HECTARE = 0.404686;

// Helper: Format large numbers with commas
function formatNumber(num, decimals = 0) {
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

// Convert area from standard (Hectares) to current selected unit
function displayArea(hectares) {
  switch (currentUnit) {
    case 'acres':
      return hectares * HECTARE_TO_ACRE;
    case 'sq_km':
      return hectares * HECTARE_TO_SQKM;
    case 'sq_mi':
      return hectares * HECTARE_TO_SQMI;
    case 'hectares':
    default:
      return hectares;
  }
}

// Get unit label for display
function getUnitLabel() {
  switch (currentUnit) {
    case 'acres': return 'Acres';
    case 'sq_km': return 'km²';
    case 'sq_mi': return 'sq mi';
    case 'hectares':
    default: return 'Hectares';
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  populateRegionSelector();
  updateDashboard();
  selectOutlier(currentOutlierYear);
});

// Setup Event Listeners
function setupEventListeners() {
  // Country toggles
  document.querySelectorAll('[data-country]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-country]').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentCountry = e.currentTarget.getAttribute('data-country');
      
      // Reset region filter when changing country
      currentRegion = 'all';
      populateRegionSelector();
      
      updateDashboard();
    });
  });

  // Unit toggles
  document.querySelectorAll('[data-unit]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-unit]').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      currentUnit = e.currentTarget.getAttribute('data-unit');
      updateDashboard();
      
      // Also update active outlier stat display if visible
      selectOutlier(currentOutlierYear);
    });
  });

  // Region dropdown
  document.getElementById('region-select').addEventListener('change', (e) => {
    currentRegion = e.target.value;
    updateDashboard();
  });
}

// Dynamically populate region dropdown depending on selected country
function populateRegionSelector() {
  const select = document.getElementById('region-select');
  select.innerHTML = '<option value="all">Entire Region (National)</option>';

  if (currentCountry === 'all' || currentCountry === 'us') {
    const usGroup = document.createElement('optgroup');
    usGroup.label = 'United States Regions';
    wildfireData.regions.us.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = `${r.name} (US)`;
      usGroup.appendChild(opt);
    });
    select.appendChild(usGroup);
  }

  if (currentCountry === 'all' || currentCountry === 'canada') {
    const caGroup = document.createElement('optgroup');
    caGroup.label = 'Canada Regions';
    wildfireData.regions.canada.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = `${r.name} (Canada)`;
      caGroup.appendChild(opt);
    });
    select.appendChild(caGroup);
  }

  select.value = currentRegion;
}

// Process the compiled data based on country, unit, and regional filters
function getFilteredDataset() {
  const years = wildfireData.us.map(d => d.year);
  const dataset = [];

  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const usRecord = wildfireData.us[i];
    const caRecord = wildfireData.canada[i];

    // Normalize raw areas to standard Hectares
    const usAreaHectares = usRecord.area * ACRE_TO_HECTARE;
    const caAreaHectares = caRecord.area; // Canada is already stored in Hectares

    // Projected values (default to YTD values if not specified)
    const usProjectedAreaHectares = (usRecord.projectedArea || usRecord.area) * ACRE_TO_HECTARE;
    const caProjectedAreaHectares = caRecord.projectedArea || caRecord.area;

    const usProjectedFires = usRecord.projectedFires || usRecord.fires;
    const caProjectedFires = caRecord.projectedFires || caRecord.fires;

    let fires = 0;
    let areaHectares = 0;
    let projectedFires = 0;
    let projectedAreaHectares = 0;

    // Apply country filters and region shares
    if (currentCountry === 'all') {
      if (currentRegion === 'all') {
        fires = usRecord.fires + caRecord.fires;
        areaHectares = usAreaHectares + caAreaHectares;
        projectedFires = usProjectedFires + caProjectedFires;
        projectedAreaHectares = usProjectedAreaHectares + caProjectedAreaHectares;
      } else {
        // If a specific region is selected under "All Countries"
        const usReg = wildfireData.regions.us.find(r => r.id === currentRegion);
        const caReg = wildfireData.regions.canada.find(r => r.id === currentRegion);
        
        if (usReg) {
          fires = usRecord.fires * usReg.fireShare;
          areaHectares = usAreaHectares * usReg.areaShare;
          projectedFires = usProjectedFires * usReg.fireShare;
          projectedAreaHectares = usProjectedAreaHectares * usReg.areaShare;
        } else if (caReg) {
          fires = caRecord.fires * caReg.fireShare;
          areaHectares = caAreaHectares * caReg.areaShare;
          projectedFires = caProjectedFires * caReg.fireShare;
          projectedAreaHectares = caProjectedAreaHectares * caReg.areaShare;
        }
      }
    } else if (currentCountry === 'us') {
      if (currentRegion === 'all') {
        fires = usRecord.fires;
        areaHectares = usAreaHectares;
        projectedFires = usProjectedFires;
        projectedAreaHectares = usProjectedAreaHectares;
      } else {
        const usReg = wildfireData.regions.us.find(r => r.id === currentRegion);
        if (usReg) {
          fires = usRecord.fires * usReg.fireShare;
          areaHectares = usAreaHectares * usReg.areaShare;
          projectedFires = usProjectedFires * usReg.fireShare;
          projectedAreaHectares = usProjectedAreaHectares * usReg.areaShare;
        }
      }
    } else if (currentCountry === 'canada') {
      if (currentRegion === 'all') {
        fires = caRecord.fires;
        areaHectares = caAreaHectares;
        projectedFires = caProjectedFires;
        projectedAreaHectares = caProjectedAreaHectares;
      } else {
        const caReg = wildfireData.regions.canada.find(r => r.id === currentRegion);
        if (caReg) {
          fires = caRecord.fires * caReg.fireShare;
          areaHectares = caAreaHectares * caReg.areaShare;
          projectedFires = caProjectedFires * caReg.fireShare;
          projectedAreaHectares = caProjectedAreaHectares * caReg.areaShare;
        }
      }
    }

    const isPreliminary = !!(usRecord.isPreliminary || caRecord.isPreliminary);
    const convertedArea = displayArea(areaHectares);
    const convertedProjectedArea = displayArea(projectedAreaHectares);
    const projectedRemaining = isPreliminary ? Math.max(0, convertedProjectedArea - convertedArea) : 0;

    dataset.push({
      year: year,
      fires: Math.round(fires),
      area: convertedArea, // Display unit (YTD)
      projectedRemaining: projectedRemaining, // Display unit remaining projected
      projectedTotal: convertedProjectedArea, // Display unit projected total
      projectedFires: Math.round(projectedFires),
      rawAreaHectares: areaHectares, // Standard reference
      isPreliminary: isPreliminary
    });
  }

  return dataset;
}

// Calculate and Update Dashboard KPI Cards
function updateKPIs(dataset) {
  const totalYears = dataset.length;
  if (totalYears === 0) return;

  // 1. Total Area Burned (cumulative confirmed/YTD area)
  const totalArea = dataset.reduce((sum, d) => sum + d.area, 0);
  document.getElementById('kpi-total-area').textContent = formatNumber(totalArea);
  document.getElementById('kpi-total-area-unit').textContent = getUnitLabel() + (dataset.some(d => d.isPreliminary) ? ' (YTD)' : '');

  // 2. Average Annual Area (uses projected total for preliminary years to avoid depressing the average)
  const avgArea = dataset.reduce((sum, d) => sum + (d.isPreliminary ? d.projectedTotal : d.area), 0) / totalYears;
  document.getElementById('kpi-avg-area').textContent = formatNumber(avgArea);
  document.getElementById('kpi-avg-area-unit').textContent = `${getUnitLabel()}/yr`;

  // 3. Total Fires Count (cumulative confirmed/YTD fires)
  const totalFires = dataset.reduce((sum, d) => sum + d.fires, 0);
  document.getElementById('kpi-total-fires').textContent = formatNumber(totalFires);

  // 4. Average Fire Size
  const avgFireSize = totalArea / totalFires;
  document.getElementById('kpi-avg-size').textContent = formatNumber(avgFireSize, 1);
  document.getElementById('kpi-avg-size-unit').textContent = `${getUnitLabel()}/fire`;

  // 5. Decadal Trend (Compare first 10 years [1983-1992] vs last 10 years [2017-2026] using projected total for 2026)
  const first10 = dataset.slice(0, 10);
  const last10 = dataset.slice(-10);
  const avgFirst10 = first10.reduce((sum, d) => sum + d.area, 0) / 10;
  const avgLast10 = last10.reduce((sum, d) => sum + (d.isPreliminary ? d.projectedTotal : d.area), 0) / 10;

  const percentChange = ((avgLast10 - avgFirst10) / avgFirst10) * 100;
  const trendEl = document.getElementById('kpi-trend-pct');
  const trendIconEl = document.getElementById('kpi-trend-icon');
  
  if (percentChange > 5) {
    trendEl.textContent = `+${formatNumber(percentChange, 0)}%`;
    trendEl.className = 'kpi-trend trend-up';
    trendIconEl.className = 'fas fa-arrow-trend-up kpi-icon trend-up';
    document.getElementById('kpi-trend-label').textContent = 'Increase in decadal average (80s vs 2020s)';
  } else if (percentChange < -5) {
    trendEl.textContent = `${formatNumber(percentChange, 0)}%`;
    trendEl.className = 'kpi-trend trend-down';
    trendIconEl.className = 'fas fa-arrow-trend-down kpi-icon trend-down';
    document.getElementById('kpi-trend-label').textContent = 'Decrease in decadal average (80s vs 2020s)';
  } else {
    trendEl.textContent = 'Stable';
    trendEl.className = 'kpi-trend trend-neutral';
    trendIconEl.className = 'fas fa-arrows-left-right kpi-icon trend-neutral';
    document.getElementById('kpi-trend-label').textContent = 'No significant decadal shift';
  }

  // Update dynamic sidebar summary
  updateSidebarSummary(percentChange, totalArea);
}

// Update Sidebar Snapshot Summary Box
function updateSidebarSummary(percentChange, totalArea) {
  const titleEl = document.getElementById('sidebar-summary-title');
  const textEl = document.getElementById('sidebar-summary-text');
  
  let countryName = 'US & Canada';
  if (currentCountry === 'us') countryName = 'United States';
  if (currentCountry === 'canada') countryName = 'Canada';

  let regionName = '';
  if (currentRegion !== 'all') {
    const r = [...wildfireData.regions.us, ...wildfireData.regions.canada].find(reg => reg.id === currentRegion);
    if (r) regionName = ` (${r.name})`;
  }

  titleEl.innerHTML = `<i class="fas fa-fire-flame-curved"></i> Key Analysis`;

  let trendText = '';
  if (percentChange > 15) {
    trendText = `shows a **significant upward trend** in wildfire severity, with decadal area burned expanding by **${Math.round(percentChange)}%** since 1983.`;
  } else if (percentChange < -15) {
    trendText = `shows a **decreasing trend** in wildfire activity, with a **${Math.round(Math.abs(percentChange))}%** drop in area burned.`;
  } else {
    trendText = `has remained **relatively stable** over the 43-year baseline, subject to high yearly volatility.`;
  }

  textEl.innerHTML = `Analyzing **${countryName}${regionName}** from 1983 to 2025. The data ${trendText} A total of **${formatNumber(totalArea)} ${getUnitLabel()}** has burned in this period, heavily concentrated in specific outlier seasons.`;
}

// Update and Render Visualizations
function updateDashboard() {
  const dataset = getFilteredDataset();
  updateKPIs(dataset);
  
  renderAreaChart(dataset);
  renderTrendChart(dataset);
  renderRegionalChart();
  
  // Highlight active outlier year in outlier button list
  document.querySelectorAll('.outlier-select-btn').forEach(btn => {
    const year = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
    if (year === currentOutlierYear) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Chart 1: Yearly Area Burned
function renderAreaChart(dataset) {
  const ctx = document.getElementById('areaChart').getContext('2d');
  
  const labels = dataset.map(d => d.year);
  const yearsWithOutliers = Object.keys(wildfireData.outliers).map(Number);
  
  // Build chart dataset background colors dynamically (highlight outlier years)
  const bgColors = dataset.map(d => {
    if (d.year === 2026) {
      return 'rgba(245, 158, 11, 0.7)'; // Glowing amber for active YTD
    }
    if (yearsWithOutliers.includes(d.year)) {
      return 'rgba(239, 68, 68, 0.85)'; // Glowing fire red
    }
    return 'rgba(249, 115, 22, 0.4)';  // Standard warm orange
  });
  
  const borderColors = dataset.map(d => {
    if (d.year === 2026) {
      return '#f59e0b';
    }
    if (yearsWithOutliers.includes(d.year)) {
      return '#ef4444';
    }
    return 'rgba(249, 115, 22, 0.8)';
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Confirmed Area Burned (${getUnitLabel()})`,
        data: dataset.map(d => d.area),
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 1.5,
        borderRadius: 4,
        hoverBackgroundColor: '#f59e0b',
        hoverBorderColor: '#f59e0b',
        stack: 'combined'
      },
      {
        label: `Projected Remaining Area (${getUnitLabel()})`,
        data: dataset.map(d => d.projectedRemaining),
        backgroundColor: 'rgba(249, 115, 22, 0.12)',
        borderColor: '#f97316',
        borderWidth: 1.5,
        borderDash: [4, 4],
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(249, 115, 22, 0.25)',
        hoverBorderColor: '#f97316',
        stack: 'combined'
      }
    ]
  };

  if (areaChartInstance) {
    areaChartInstance.destroy();
  }

  areaChartInstance = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (event, activeElements) => {
        if (activeElements.length > 0) {
          const index = activeElements[0].index;
          const selectedYear = labels[index];
          // Check if it's an outlier year and show context
          if (Object.keys(wildfireData.outliers).includes(String(selectedYear))) {
            selectOutlier(selectedYear);
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#94a3b8',
            font: { family: 'Inter', size: 10, weight: '500' },
            boxWidth: 12,
            padding: 8
          }
        },
        tooltip: {
          backgroundColor: '#0f1424',
          titleFont: { family: 'Outfit', size: 14, weight: 'bold' },
          bodyFont: { family: 'Inter', size: 12 },
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label = label.includes('Confirmed') ? 'Confirmed (YTD)' : 'Projected Remaining';
                label += ': ';
              }
              label += formatNumber(context.raw);
              
              const year = context.label;
              if (Object.keys(wildfireData.outliers).includes(String(year)) && context.datasetIndex === 0) {
                label += ' (⚠️ OUTLIER YEAR - Click for details)';
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            color: '#64748b',
            font: { family: 'Inter', size: 10 }
          }
        },
        y: {
          stacked: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.04)'
          },
          ticks: {
            color: '#64748b',
            font: { family: 'Inter', size: 10 },
            callback: function(value) {
              if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
              if (value >= 1e3) return (value / 1e3).toFixed(0) + 'k';
              return value;
            }
          }
        }
      }
    }
  });
}

// Chart 2: Fire Frequency vs. Severity (Divergence Chart)
function renderTrendChart(dataset) {
  const ctx = document.getElementById('trendChart').getContext('2d');
  
  const labels = dataset.map(d => d.year);
  
  // Calculate average size per fire (in selected units)
  const avgSizes = dataset.map(d => {
    if (d.isPreliminary) {
      return d.projectedFires > 0 ? (d.projectedTotal / d.projectedFires) : 0;
    }
    return d.fires > 0 ? (d.area / d.fires) : 0;
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Number of Fires',
        data: dataset.map(d => d.isPreliminary ? d.projectedFires : d.fires),
        borderColor: '#3b82f6', // Light Blue
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        fill: true,
        yAxisID: 'yFires',
        borderWidth: 2,
        pointRadius: 1,
        tension: 0.3,
        segment: {
          borderDash: ctx => ctx.p1DataIndex === 43 ? [5, 5] : undefined
        }
      },
      {
        label: 'Avg Size per Fire',
        data: avgSizes,
        borderColor: '#f97316', // Glowing Orange
        backgroundColor: 'transparent',
        yAxisID: 'ySize',
        borderWidth: 3,
        pointRadius: 2,
        pointHoverBackgroundColor: '#ef4444',
        tension: 0.3,
        segment: {
          borderDash: ctx => ctx.p1DataIndex === 43 ? [5, 5] : undefined
        }
      }
    ]
  };

  if (trendChartInstance) {
    trendChartInstance.destroy();
  }

  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        tooltip: {
          backgroundColor: '#0f1424',
          titleFont: { family: 'Outfit', size: 13, weight: 'bold' },
          bodyFont: { family: 'Inter', size: 12 },
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          callbacks: {
            title: function(context) {
              const year = context[0].label;
              return year === '2026' ? '2026 (Projected Year-End)' : year;
            },
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              const isProj = context.label === '2026';
              if (context.datasetIndex === 0) {
                label += formatNumber(context.raw) + (isProj ? ' (Projected Total)' : '');
              } else {
                label += formatNumber(context.raw, 1) + ' ' + getUnitLabel() + (isProj ? ' (Projected Avg)' : '');
              }
              return label;
            }
          }
        },
        legend: {
          labels: {
            color: '#94a3b8',
            font: { family: 'Inter', size: 11, weight: '500' }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#64748b',
            font: { family: 'Inter', size: 10 }
          }
        },
        yFires: {
          type: 'linear',
          position: 'left',
          grid: {
            color: 'rgba(255, 255, 255, 0.04)'
          },
          ticks: {
            color: '#64748b',
            font: { size: 10 }
          },
          title: {
            display: true,
            text: 'Number of Fires',
            color: '#3b82f6',
            font: { family: 'Outfit', size: 11, weight: 'bold' }
          }
        },
        ySize: {
          type: 'linear',
          position: 'right',
          grid: {
            drawOnChartArea: false // prevent grid line overlap
          },
          ticks: {
            color: '#64748b',
            font: { size: 10 }
          },
          title: {
            display: true,
            text: `Avg Fire Size (${getUnitLabel()})`,
            color: '#f97316',
            font: { family: 'Outfit', size: 11, weight: 'bold' }
          }
        }
      }
    }
  });
}

// Chart 3: Regional Distribution
function renderRegionalChart() {
  const ctx = document.getElementById('regionalChart').getContext('2d');
  
  let regions = [];
  let colors = [];
  
  if (currentCountry === 'all') {
    regions = [...wildfireData.regions.us, ...wildfireData.regions.canada];
    // Warm gradient for all regions
    colors = ['#3b82f6', '#1d4ed8', '#1e3a8a', '#ef4444', '#b91c1c', '#7f1d1d'];
  } else if (currentCountry === 'us') {
    regions = wildfireData.regions.us;
    colors = ['#3b82f6', '#1d4ed8', '#1e40af']; // Blue hues
  } else if (currentCountry === 'canada') {
    regions = wildfireData.regions.canada;
    colors = ['#ef4444', '#b91c1c', '#991b1b']; // Red/Orange hues
  }

  const chartData = {
    labels: regions.map(r => r.name),
    datasets: [{
      data: regions.map(r => r.areaShare * 100),
      backgroundColor: colors,
      borderColor: 'rgba(15, 20, 36, 0.8)',
      borderWidth: 2,
      hoverOffset: 6
    }]
  };

  if (regionalChartInstance) {
    regionalChartInstance.destroy();
  }

  regionalChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#94a3b8',
            font: { family: 'Inter', size: 10 },
            padding: 12
          }
        },
        tooltip: {
          backgroundColor: '#0f1424',
          titleFont: { family: 'Outfit', size: 12, weight: 'bold' },
          bodyFont: { family: 'Inter', size: 11 },
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              const label = context.label;
              const val = context.raw;
              const regionId = regions[context.dataIndex].id;
              const desc = regions[context.dataIndex].desc;
              
              // We return a simple label; description can be shown in the DOM
              return ` ${label}: ${val}% of total area burned`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });

  // Render regional descriptions under the doughnut
  updateRegionalDescriptions(regions, colors);
}

// Display textual description of selected/visible regions below the doughnut
function updateRegionalDescriptions(regions, colors) {
  const container = document.getElementById('regional-desc-list');
  container.innerHTML = '';
  
  regions.forEach((r, idx) => {
    const div = document.createElement('div');
    div.className = 'region-desc-item';
    div.style.borderLeft = `3px solid ${colors[idx]}`;
    div.style.paddingLeft = '0.75rem';
    div.style.marginBottom = '0.75rem';
    
    div.innerHTML = `
      <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); display: flex; justify-content: space-between;">
        <span>${r.name}</span>
        <span style="color: ${colors[idx]}; font-size: 0.8rem;">~${Math.round(r.areaShare * 100)}% acreage</span>
      </div>
      <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; margin-top: 0.15rem;">${r.desc}</p>
    `;
    container.appendChild(div);
  });
}

// Select an Outlier Year for the spotlight card
function selectOutlier(year) {
  currentOutlierYear = year;
  const outlier = wildfireData.outliers[year];
  
  if (!outlier) return;
  
  // Set spotlight tag
  const tag = document.getElementById('spotlight-tag');
  tag.textContent = outlier.country === 'us' ? 'United States Spotlight' : 'Canada Spotlight';
  tag.className = `spotlight-tag ${outlier.country}`;
  
  // Title & subtitle
  document.getElementById('spotlight-title').textContent = `${year}: ${outlier.title}`;
  document.getElementById('spotlight-subtitle').textContent = outlier.subtitle;
  
  // Convert standard statistics displayed in the data.js based on units
  let displayedStatText = '';
  if (year === 1989) {
    displayedStatText = formatNumber(displayArea(7559600)) + ' ' + getUnitLabel() + ' Burned';
  } else if (year === 2004) {
    // 6.6M acres was in Alaska, 8.1M in US total. Let's compute display unit of total.
    const usTotalHectares = 8097880 * ACRE_TO_HECTARE;
    displayedStatText = formatNumber(displayArea(usTotalHectares)) + ' ' + getUnitLabel() + ' Burned (Total)';
  } else if (year === 2015) {
    const totalHectares = 10125149 * ACRE_TO_HECTARE;
    displayedStatText = formatNumber(displayArea(totalHectares)) + ' ' + getUnitLabel() + ' Burned';
  } else if (year === 2020) {
    const totalHectares = 10122336 * ACRE_TO_HECTARE;
    displayedStatText = formatNumber(displayArea(totalHectares)) + ' ' + getUnitLabel() + ' Burned';
  } else if (year === 2023) {
    displayedStatText = formatNumber(displayArea(17606547)) + ' ' + getUnitLabel() + ' Burned';
  } else if (year === 2025) {
    displayedStatText = formatNumber(displayArea(8426718)) + ' ' + getUnitLabel() + ' Burned';
  }
  
  document.getElementById('spotlight-stat-value').textContent = displayedStatText;
  document.getElementById('spotlight-desc').textContent = outlier.desc;
  
  // Toggle active class on outlier selection buttons
  document.querySelectorAll('.outlier-select-btn').forEach(btn => {
    const btnYear = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
    if (btnYear === year) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}
window.selectOutlier = selectOutlier;
