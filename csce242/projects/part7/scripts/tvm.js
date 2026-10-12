document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.calc-box');
  if (!box) return;

  const tabs = box.querySelectorAll('.calc-tab');
  const groups = box.querySelectorAll('.calc-inputs .input-group');
  const resultEl = box.querySelector('.result-display');
  const metaSpans = box.querySelectorAll('.result-meta span');
  const timeline = box.querySelector('.calc-timeline');

  if (tabs.length < 2 || groups.length < 3 || !resultEl || metaSpans.length < 3) return;

  const amountLabel = groups[0].querySelector('label');
  const amountInput = groups[0].querySelector('input');
  const rateInput = groups[1].querySelector('input');
  const yearsInput = groups[2].querySelector('input');

  let mode = 'fv'; // 'fv' = compute future value, 'pv' = compute present value

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  const plain = (maxDecimals) => new Intl.NumberFormat('en-US', {
    useGrouping: false,
    maximumFractionDigits: maxDecimals
  });
  const fmtAmount = plain(2);
  const fmtRate = plain(4);
  const fmtDecimalRate = plain(6);
  const fmtYears = plain(2);

  resultEl.setAttribute('aria-live', 'polite');

  // Accepts things like "1,000" or "$1000"; returns NaN for anything else
  function parse(input) {
    const cleaned = input.value.replace(/[$,%\s]/g, '');
    if (cleaned === '' || cleaned === '-' || cleaned === '.') return NaN;
    return Number(cleaned);
  }

  function setMeta(rateText, periodText, formulaParts) {
    metaSpans[0].textContent = rateText;
    metaSpans[1].textContent = periodText;
    const formula = metaSpans[2];
    formula.textContent = '';
    if (!formulaParts) return;
    formula.append(formulaParts.before);
    const sup = document.createElement('sup');
    sup.textContent = formulaParts.exponent;
    formula.append(sup);
  }

  function renderTimeline(years) {
    if (!timeline) return;
    timeline.textContent = '';

    let labels = [];
    if (Number.isFinite(years) && years >= 0) {
      if (Number.isInteger(years) && years <= 10) {
        for (let i = 0; i <= years; i++) labels.push(i);
      } else {
        // Too many points to show; use 6 evenly spaced ones from 0 to n
        for (let i = 0; i < 6; i++) labels.push(Math.round((years * i / 5) * 100) / 100);
      }
    }

    labels.forEach((label) => {
      const node = document.createElement('div');
      node.className = 'timeline-node';
      const yr = document.createElement('span');
      yr.className = 'node-yr';
      yr.textContent = fmtYears.format(label);
      node.appendChild(yr);
      timeline.appendChild(node);
    });
  }

  function showInvalid() {
    resultEl.textContent = '—';
    setMeta('Rate: —', 'Period: —', null);
    renderTimeline(NaN);
  }

  function calculate() {
    const amount = parse(amountInput);
    const ratePct = parse(rateInput);
    const years = parse(yearsInput);

    const valid =
      Number.isFinite(amount) &&
      Number.isFinite(ratePct) && ratePct > -100 &&
      Number.isFinite(years) && years >= 0;

    if (!valid) {
      showInvalid();
      return;
    }

    const r = ratePct / 100;
    const factor = Math.pow(1 + r, years);
    const result = mode === 'fv' ? amount * factor : amount / factor;

    if (!Number.isFinite(result)) {
      resultEl.textContent = 'Too large';
      return;
    }

    resultEl.textContent = currency.format(result);

    const op = mode === 'fv' ? '\u00D7' : '/';
    const lhs = mode === 'fv' ? 'FV' : 'PV';
    setMeta(
      'Rate: ' + fmtRate.format(ratePct) + '% per yr',
      'Period: ' + fmtYears.format(years) + (years === 1 ? ' yr' : ' yrs'),
      {
        before: lhs + ' = ' + fmtAmount.format(amount) + ' ' + op + ' (1 + ' + fmtDecimalRate.format(r) + ')',
        exponent: fmtYears.format(years)
      }
    );
    renderTimeline(years);
  }

  function setMode(newMode) {
    mode = newMode;
    tabs.forEach((tab, i) => {
      const active = (i === 0) === (mode === 'fv');
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', active);
    });
    amountLabel.textContent = mode === 'fv' ? 'Present Value ($)' : 'Future Value ($)';
    calculate();
  }

  tabs[0].addEventListener('click', () => setMode('fv'));
  tabs[1].addEventListener('click', () => setMode('pv'));
  [amountInput, rateInput, yearsInput].forEach((input) => {
    input.addEventListener('input', calculate);
  });

  setMode('fv');
});
