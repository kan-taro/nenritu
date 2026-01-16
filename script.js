document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calcForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultDiv.innerHTML = '';

    // 入力値を万円から円へ変換（×10,000）
    const currentAsset = parseFloat(document.getElementById('currentAsset').value) * 10000;
    const monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value) * 10000;
    const annualRatePercent = parseFloat(document.getElementById('annualRate').value);
    const targetAsset = parseFloat(document.getElementById('targetAsset').value) * 10000;

    if ([currentAsset, monthlyDeposit, annualRatePercent, targetAsset].some(v => isNaN(v))) {
      resultDiv.innerHTML = '<p class="text-red-600">すべての入力値を正しく入力してください。</p>';
      return;
    }

    const monthlyRate = (annualRatePercent / 100) / 12;
    const maxMonths = 30 * 12; // 最大30年まで計算

    let asset = currentAsset;
    const assetsPerMonth = [asset];
    let month = 0;

    while (month < maxMonths && asset < targetAsset) {
      month++;
      asset = asset * (1 + monthlyRate) + monthlyDeposit; // 複利＋月々の投資
      assetsPerMonth.push(asset);
    }

    const reachedTarget = asset >= targetAsset;
    const totalYearsSimulated = month / 12;

    // CAGR 計算（最終値を使う）
    let cagrPercent = null;
    if (totalYearsSimulated > 0) {
      cagrPercent = (Math.pow(asset / currentAsset, 1 / totalYearsSimulated) - 1) * 100;
    }

    // テキスト結果（期間とCAGR）
    let textResult = '';
    if (reachedTarget) {
      const yearsFull = Math.floor(month / 12);
      const monthsRem = month % 12;
      textResult += `<p class="text-lg font-semibold">目標資産額に到達するまでの期間: ${yearsFull} 年 ${monthsRem} ヶ月</p>`;
    } else {
      textResult += `<p class="text-lg font-semibold">30年間で目標資産額には到達しません。</p>`;
    }

    if (cagrPercent !== null) {
      const formattedCAGR = cagrPercent.toFixed(2);
      textResult += `<p class="text-lg font-semibold">CAGR（年平均成長率）: ${formattedCAGR}%</p>`;
    }

    // グラフ描画準備
    const labels = assetsPerMonth.map((_, idx) => `${Math.floor(idx / 12)}年${idx % 12}月`);
    const canvas = document.createElement('canvas');
    canvas.style.backgroundColor = '#ffffff'; // 白背景に設定
    resultDiv.appendChild(canvas);

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '資産額（円）',
          data: assetsPerMonth.map(v => Math.round(v)),
          borderColor: '#2bcbba',
          backgroundColor: 'rgba(255, 255, 255, 0)', // 背景を透明に
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `¥${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: (value) => '¥' + value.toLocaleString() }
          }
        }
      }
    });

    // 文字結果をグラフの下に追加
    const textDiv = document.createElement('div');
    textDiv.innerHTML = textResult;
    resultDiv.appendChild(textDiv);
  });
});