// Initialize Charts
document.addEventListener('DOMContentLoaded', () => {
    // 1. Loan Accounts Chart (Donut)
    const loanAccountsCtx = document.getElementById('loanAccountsChart').getContext('2d');
    new Chart(loanAccountsCtx, {
        type: 'doughnut',
        data: {
          labels: ['Active', 'In Arrears'],
          datasets: [{
            data: [54, 46],
            backgroundColor: ['#28a745', '#dc3545'],
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          cutout: '70%'
        }
    });

    // 2. Loans in Arrears Chart (Donut)
    const loansArrearsCtx = document.getElementById('loansArrearsChart').getContext('2d');
    new Chart(loansArrearsCtx, {
        type: 'doughnut',
        data: {
          labels: ['1-30', '31-60', '61-90', '91-180', '181-365', '> 365'],
          datasets: [{
            data: [27, 3, 2, 9, 17, 39],
            backgroundColor: [
              '#ffc107', // warning
              '#007bff', // primary
              '#17a2b8', // info
              '#dc3545', // danger
              '#343a40', // dark
              '#28a745'  // success
            ],
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          cutout: '70%'
        }
    });

    // 3. Repayment Trend Chart (Line)
    const repaymentTrendCtx = document.getElementById('repaymentTrendChart').getContext('2d');
    new Chart(repaymentTrendCtx, {
        type: 'line',
        data: {
          labels: ['2026-03-23', '2026-03-24', '2026-03-25', '2026-03-26', '2026-03-27', '2026-03-28', '2026-03-29', '2026-03-30', '2026-03-31', '2026-03-01'], // Mock dates
          datasets: [
            {
              label: 'Actual',
              data: [400000, 1000000, 800000, 950000, 700000, 200000, 800000, 1100000, 900000, 1000000],
              borderColor: '#28a745',
              backgroundColor: '#28a74522',
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#28a745'
            },
            {
              label: 'Expected',
              data: [500000, 1100000, 900000, 1000000, 800000, 300000, 900000, 1200000, 1000000, 1100000],
              borderColor: '#007bff',
              backgroundColor: 'transparent',
              fill: false,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#007bff'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 10 } }
            },
            y: {
              grid: { color: '#f1f5f9' },
              ticks: { font: { size: 10 }, callback: value => '₦' + value.toLocaleString() }
            }
          }
        }
    });

    // 4. Disbursement History Chart (Bar)
    const disbursementHistoryCtx = document.getElementById('disbursementHistoryChart').getContext('2d');
    new Chart(disbursementHistoryCtx, {
        type: 'bar',
        data: {
          labels: ['2026-03-13', '2026-03-14', '2026-03-15', '2026-03-16', '2026-03-17'],
          datasets: [{
            label: 'Disbursement Amount',
            data: [450000, 0, 0, 550000, 550000],
            backgroundColor: '#0dcaf066',
            borderColor: '#0dcaf0',
            borderWidth: 1,
            borderRadius: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 10 } }
            },
            y: {
              grid: { color: '#f1f5f9' },
              ticks: { font: { size: 10 } }
            }
          }
        }
    });

    // Section Switching Logic
    const sectionToggles = document.querySelectorAll('.section-toggle');
    const sections = document.querySelectorAll('.page-section');

    sectionToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
        const targetId = toggle.getAttribute('data-target');
        if (!targetId) return;
        
        e.preventDefault();

            // Update Nav
            sectionToggles.forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');

            // Update Sections
            sections.forEach(s => {
                s.classList.add('d-none');
                s.classList.remove('active');
            });
            const targetSection = document.getElementById(`section-${targetId}`);
            if (targetSection) {
                targetSection.classList.remove('d-none');
                targetSection.classList.add('active');
                
                // If switching back to dashboard, we might need to update charts if they were hidden
                if (targetId === 'dashboard') {
                    // Small delay to ensure display: block is applied
                    setTimeout(() => {
                        window.dispatchEvent(new Event('resize'));
                    }, 50);
                }
            }
        });
    });
});
