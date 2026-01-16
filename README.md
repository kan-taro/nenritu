# 株の年率計算サイト

> **CAGR**（年平均成長率）を自動で計算し、資産推移をグラフ化するシンプルなWebアプリです。  
> 2026/01/17 時点で Mac OS のローカル環境でそのまま動作します。

---

## 📦 目次

- [概要](#-概要)
- [デモ](#-デモ)
- [使い方](#-使い方)
- [ファイル構成](#-ファイル構成)
- [技術スタック](#-技術スタック)
- [ライセンス](#-ライセンス)

---

## 📝 概要

| 項目 | 内容 |
|------|------|
| **目的** | 現在の資産、月々の投資額、年率から、目標資産に到達するまでの期間とCAGRを算出。 |
| **入力項目** | 現在の資産（万円）<br>月々の投資額（万円）<br>年率（％）<br>目標資産額（万円） |
| **表示結果** | <ul><li>期間（年・月）</li><li>CAGR（%）</li></ul> |
| **グラフ** | Chart.js で月次資産推移を線グラフ化。 |

---

## 🚀 デモ

ブラウザで `index.html` を開くと、以下のように入力フォームが表示されます。

```html
<form id="calcForm">
  <!-- 現在の資産 -->
  <input type="number" id="currentAsset" />
  <!-- 月々の投資額 -->
  <input type="number" id="monthlyDeposit" />
  <!-- 年率 -->
  <input type="number" id="annualRate" step="0.1" />
  <!-- 目標資産 -->
  <input type="number" id="targetAsset" />
  <button>計算する</button>
</form>

<div id="result"></div>
<canvas></canvas>
```

結果は下部に期間とCAGRが表示され、上部のグラフで推移を確認できます。

---

## 💻 使い方

1. **ファイルを配置**  
   ```bash
   cp -r nenritu5 /path/to/your/webroot/
   ```
2. **ブラウザで開く**  
   `index.html` を直接ダブルクリック、またはローカルサーバー経由（例: `python3 -m http.server`）で表示。
3. **入力して計算**  
   フォームに値を入れ「計算する」を押すと自動で結果が出力されます。

---

## 📁 ファイル構成

```
nenritu5/
├─ index.html          # メインHTML
└─ script.js           # 計算ロジック & グラフ描画
```

- **index.html**  
  - Tailwind CSS CDN と Chart.js CDN を利用。  
  - スクリプトは `/Users/hisanori/test/nenritu5/script.js` にロード。

- **script.js**  
  ```js
  // 入力取得 → 月次資産推移計算 → CAGR算出 → 結果表示 & グラフ描画
  ```

---

## 🛠 技術スタック

| 項目 | バージョン | 備考 |
|------|-----------|-------|
| HTML5 | — | - |
| Tailwind CSS | CDN (v3) | シンプルなデザイン |
| Chart.js | CDN v4.3.0 | グラフ描画に使用 |
| JavaScript | ES6+ | すべてのロジックを実装 |

---

## 📄 ライセンス

MIT License  
（詳細は `LICENSE` ファイルをご確認ください）

---
