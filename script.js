// Default Theme Configuration for Chart.js
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";

document.addEventListener('DOMContentLoaded', () => {
    // --- Data Configuration (Replace these with your research) ---
    
    // Blue Origin Valuation Data
    const valuationData = {
        companyName: "Blue Origin",
        marketCap: "$42.0B",
        recommendedEntry: "$42.00",
        stopPrice: "$28.00",
        recommendation: "BUY", // "BUY", "HOLD", or "PASS"
        convictionLevel: "High", // "High", "Medium", or "Low"
        recommendationText: "Based on our three-scenario analysis, the Base Case values Blue Origin at $42B ($42/share assuming 1B shares). At this entry, the risk/reward is highly favorable, supported by a 13x forward multiple and a $4B HLS premium. We recommend an aggressive BUY up to $42.00, with a hard stop at $28.00 (our Bear Case floor).",
        
        // Revenue Breakdown Data
        revenueLabels: ['Blue Moon (NASA)', 'New Glenn (Launch)', 'Project Kuiper (Amazon)', 'New Shepard (Tourism)'],
        revenueValues: [44, 31, 21, 4], // Q1 2026 Percentages
        
        // Growth Projections Data (Years)
        growthLabels: ['2026E', '2027E', '2028E', '2029E', '2030E'],
        growthValues: [1.0, 1.8, 3.0, 4.8, 7.0] // Updated Revenue in Billions (Base Case)
    };

    // --- DOM Update Logic ---
    if (document.getElementById('market-cap')) {
        document.getElementById('market-cap').textContent = valuationData.marketCap;
    }

    const badge = document.querySelector('.decision-badge');
    badge.textContent = valuationData.recommendation;
    badge.className = `decision-badge ${valuationData.recommendation.toLowerCase()}`;
    
    const convictionSpan = document.getElementById('conviction-level');
    convictionSpan.textContent = valuationData.convictionLevel;
    convictionSpan.className = valuationData.convictionLevel.toLowerCase();




    // --- Charts Initialization ---
    
    // 1. Revenue Breakdown Chart (Doughnut)
    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctxRevenue, {
        type: 'doughnut',
        data: {
            labels: valuationData.revenueLabels,
            datasets: [{
                data: valuationData.revenueValues,
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',   // Blue
                    'rgba(139, 92, 246, 0.8)',  // Purple
                    'rgba(16, 185, 129, 0.8)',  // Emerald
                    'rgba(245, 158, 11, 0.8)'   // Amber
                ],
                borderColor: 'rgba(22, 30, 46, 1)',
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { padding: 20, usePointStyle: true, pointStyle: 'circle' }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });

    // 2. Growth Projections Chart (Line)
    const ctxGrowth = document.getElementById('growthChart').getContext('2d');
    
    // Create gradient for the line chart area
    const gradient = ctxGrowth.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    new Chart(ctxGrowth, {
        type: 'line',
        data: {
            labels: valuationData.growthLabels,
            datasets: [{
                label: 'Projected Revenue ($B)',
                data: valuationData.growthValues,
                borderColor: '#3b82f6',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#0f172a',
                pointBorderColor: '#3b82f6',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.4 // Smooth curves
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return ` Revenue: $${context.raw}B`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    }
                },
                x: {
                    grid: { display: false, drawBorder: false }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });
});
