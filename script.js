// Default Theme Configuration for Chart.js
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";

document.addEventListener('DOMContentLoaded', () => {
    // --- Data Configuration (Replace these with your research) ---
    
    // Blue Origin Valuation Data
    const valuationData = {
        companyName: "Blue Origin",
        marketCap: "$65.0B",
        recommendedEntry: "$65.00",
        stopPrice: "$50.00",
        recommendation: "HOLD", // "BUY", "HOLD", or "PASS"
        recommendationText: "At a $65B valuation ($65/share assuming 1B shares), we recommend a HOLD. Wait for initial New Glenn flights to validate the heavy-lift launch cadence before taking a large position. If it prices below $55.00, it becomes a speculative BUY.",
        
        // Revenue Breakdown Data
        revenueLabels: ['Launch Services (New Glenn/Kuiper)', 'Lunar/NASA (Blue Moon)', 'Hardware (BE-4 Engines)', 'Space Tourism (New Shepard)'],
        revenueValues: [35, 30, 20, 15], // Percentages or raw values
        
        // Growth Projections Data (Years)
        growthLabels: ['2026E', '2027E', '2028E', '2029E', '2030E'],
        growthValues: [1.5, 2.5, 4.0, 6.2, 9.0] // Revenue in Billions
    };

    // --- DOM Update Logic ---
    document.querySelector('.header-titles h2').textContent = `${valuationData.companyName} IPO Valuation`;
    document.getElementById('market-cap').textContent = valuationData.marketCap;
    document.querySelector('.buy-price').textContent = valuationData.recommendedEntry;
    document.querySelector('.stop-price').textContent = valuationData.stopPrice;

    const badge = document.querySelector('.decision-badge');
    badge.textContent = valuationData.recommendation;
    badge.className = `decision-badge ${valuationData.recommendation.toLowerCase()}`;
    document.querySelector('.decision-rationale').textContent = valuationData.recommendationText;


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
