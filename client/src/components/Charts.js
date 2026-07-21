import React, { useEffect, useRef } from 'react';

function BarChart({ data = [], xKey = 'label', yKey = 'value', title = '', color = '#1a237e', height = 300 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = height;
    const padding = { top: 40, right: 20, bottom: 60, left: 60 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    const maxVal = Math.max(...data.map((d) => d[yKey]), 1);
    const barWidth = Math.min(chartW / data.length * 0.7, 50);
    const gap = chartW / data.length;

    ctx.fillStyle = '#f5f7fa';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = '#9e9e9e';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal * (1 - i / 4)), padding.left - 8, y + 4);
    }

    data.forEach((d, i) => {
      const x = padding.left + gap * i + (gap - barWidth) / 2;
      const barH = (d[yKey] / maxVal) * chartH;
      const y = padding.top + chartH - barH;

      const gradient = ctx.createLinearGradient(x, y, x, padding.top + chartH);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '66');
      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
      ctx.fill();

      ctx.fillStyle = '#212121';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d[yKey], x + barWidth / 2, y - 6);

      ctx.fillStyle = '#616161';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      const label = d[xKey].length > 12 ? d[xKey].slice(0, 12) + '...' : d[xKey];
      ctx.fillText(label, x + barWidth / 2, padding.top + chartH + 16);
    });

    if (title) {
      ctx.fillStyle = '#212121';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, w / 2, 20);
    }
  }, [data, xKey, yKey, title, color, height]);

  return <canvas ref={canvasRef} style={{ width: '100%', height }} className="chart-canvas" />;
}

function PieChart({ data = [], labelKey = 'label', valueKey = 'value', title = '', height = 300 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 60;

    ctx.clearRect(0, 0, w, h);

    const total = data.reduce((sum, d) => sum + d[valueKey], 0);
    const colors = ['#1b5e20', '#2e7d32', '#4caf50', '#8bc34a', '#ff9800', '#f44336', '#d32f2f', '#b71c1c', '#7b1fa2', '#283593'];
    let startAngle = -Math.PI / 2;

    data.forEach((d, i) => {
      const sliceAngle = (d[valueKey] / total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      const midAngle = startAngle + sliceAngle / 2;
      const labelR = radius * 0.65;
      const lx = cx + labelR * Math.cos(midAngle);
      const ly = cy + labelR * Math.sin(midAngle);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${d[labelKey]}`, lx, ly - 6);
      ctx.fillText(`${Math.round((d[valueKey] / total) * 100)}%`, lx, ly + 10);

      startAngle = endAngle;
    });

    if (title) {
      ctx.fillStyle = '#212121';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, w / 2, 20);
    }
  }, [data, labelKey, valueKey, title, height]);

  return <canvas ref={canvasRef} style={{ width: '100%', height }} className="chart-canvas" />;
}

function LineChart({ data = [], xKey = 'label', yKey = 'value', title = '', color = '#00bcd4', height = 300 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = height;
    const padding = { top: 40, right: 20, bottom: 60, left: 60 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#f5f7fa';
    ctx.fillRect(0, 0, w, h);

    const maxVal = Math.max(...data.map((d) => d[yKey]), 1);
    const minVal = Math.min(...data.map((d) => d[yKey]), 0);
    const range = maxVal - minVal || 1;

    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      ctx.fillStyle = '#9e9e9e';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal - (range * i) / 4), padding.left - 8, y + 4);
    }

    const points = data.map((d, i) => ({
      x: padding.left + (i / (data.length - 1 || 1)) * chartW,
      y: padding.top + chartH - ((d[yKey] - minVal) / range) * chartH,
      label: d[xKey],
      value: d[yKey],
    }));

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    points.forEach((p) => {
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    });
    ctx.fillStyle = color;
    ctx.fill();

    points.forEach((p) => {
      ctx.fillStyle = '#212121';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.value, p.x, p.y - 10);
    });

    points.forEach((p, i) => {
      ctx.fillStyle = '#616161';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      const label = p.label.length > 10 ? p.label.slice(0, 10) + '...' : p.label;
      ctx.fillText(label, p.x, padding.top + chartH + 16);
    });

    if (title) {
      ctx.fillStyle = '#212121';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, w / 2, 20);
    }
  }, [data, xKey, yKey, title, color, height]);

  return <canvas ref={canvasRef} style={{ width: '100%', height }} className="chart-canvas" />;
}

export { BarChart, PieChart, LineChart };
