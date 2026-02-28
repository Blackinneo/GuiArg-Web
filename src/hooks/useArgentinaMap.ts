'use client';

import { useEffect, RefObject } from 'react';

// SVG dimensions from argentina.svg
const SVG_W = 361.546;
const SVG_H = 792.579;

/**
 * Province centroids in SVG coordinate space (approximately the center of each province's bounding area).
 * These are calculated from the province path data in argentina.svg.
 */
const PROVINCES: { id: string; name: string; cx: number; cy: number; isHub?: boolean }[] = [
    { id: 'AR-Y', name: 'Jujuy', cx: 140, cy: 32, isHub: false },
    { id: 'AR-A', name: 'Salta', cx: 175, cy: 52, isHub: false },
    { id: 'AR-T', name: 'Tucumán', cx: 152, cy: 107, isHub: false },
    { id: 'AR-P', name: 'Formosa', cx: 248, cy: 55, isHub: false },
    { id: 'AR-H', name: 'Chaco', cx: 243, cy: 102, isHub: false },
    { id: 'AR-N', name: 'Misiones', cx: 336, cy: 103, isHub: false },
    { id: 'AR-K', name: 'Catamarca', cx: 122, cy: 110, isHub: false },
    { id: 'AR-G', name: 'Santiago del Estero', cx: 192, cy: 126, isHub: false },
    { id: 'AR-W', name: 'Corrientes', cx: 288, cy: 148, isHub: false },
    { id: 'AR-F', name: 'La Rioja', cx: 115, cy: 175, isHub: false },
    { id: 'AR-X', name: 'Córdoba', cx: 184, cy: 215, isHub: true },
    { id: 'AR-E', name: 'Entre Ríos', cx: 257, cy: 210, isHub: false },
    { id: 'AR-S', name: 'Santa Fe', cx: 232, cy: 190, isHub: true },
    { id: 'AR-J', name: 'San Juan', cx: 86, cy: 185, isHub: false },
    { id: 'AR-D', name: 'San Luis', cx: 132, cy: 250, isHub: false },
    { id: 'AR-C', name: 'Buenos Aires (CABA)', cx: 278, cy: 263, isHub: true },
    { id: 'AR-B', name: 'Buenos Aires', cx: 230, cy: 326, isHub: true },
    { id: 'AR-M', name: 'Mendoza', cx: 85, cy: 270, isHub: false },
    { id: 'AR-L', name: 'La Pampa', cx: 148, cy: 330, isHub: false },
    { id: 'AR-Q', name: 'Neuquén', cx: 58, cy: 365, isHub: false },
    { id: 'AR-R', name: 'Río Negro', cx: 112, cy: 405, isHub: false },
    { id: 'AR-U', name: 'Chubut', cx: 106, cy: 490, isHub: false },
    { id: 'AR-Z', name: 'Santa Cruz', cx: 80, cy: 615, isHub: false },
    { id: 'AR-V', name: 'Tierra del Fuego', cx: 98, cy: 750, isHub: false },
];

// Order in which the animated line travels across provinces (geographic order N→S→spread)
const TRAVEL_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]; // index into PROVINCES

interface Particle { x: number; y: number; vx: number; vy: number; alpha: number; alphaD: number; r: number }

export function useArgentinaMap(canvasRef: RefObject<HTMLCanvasElement>) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = window.devicePixelRatio || 1;
        let animId: number;

        // ── Resize ──────────────────────────────────────────────
        function resize() {
            const w = canvas!.offsetWidth;
            const h = canvas!.offsetHeight;
            canvas!.width = w * dpr;
            canvas!.height = h * dpr;
            ctx!.scale(dpr, dpr);
        }
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        resize();

        // ── Map → Canvas coordinate mapping ──────────────────────
        // The map is placed right-aligned, centered vertically with padding
        function mapToCanvas(svgX: number, svgY: number): [number, number] {
            const cw = canvas!.offsetWidth;
            const ch = canvas!.offsetHeight;
            const isMobile = cw < 768;

            // Scale factor so the map fits in a sub-region
            const mapH = isMobile ? ch * 0.60 : ch * 0.90;
            const scale = mapH / SVG_H;
            const mapW = SVG_W * scale;

            // Position: right side on desktop, centered on mobile
            const offsetX = isMobile ? (cw - mapW) / 2 : cw - mapW - cw * 0.12;
            const offsetY = isMobile ? ch * 0.20 : ch * 0.05;

            return [offsetX + svgX * scale, offsetY + svgY * scale];
        }

        // ── Load SVG image for background drawing ─────────────────
        const svgImage = new Image();
        svgImage.src = '/argentina.svg';

        // Star particles
        const particles: Particle[] = Array.from({ length: 55 }, () => ({
            x: Math.random(),
            y: Math.random(),
            vx: (Math.random() - 0.5) * 0.00012,
            vy: (Math.random() - 0.5) * 0.00012,
            alpha: 0.05 + Math.random() * 0.2,
            alphaD: Math.random() > 0.5 ? 1 : -1,
            r: 0.5 + Math.random() * 1.2,
        }));

        // ── Animation state ───────────────────────────────────────
        // Animated "train" that travels from province to province
        // progress goes 0→N (total provinces) over ~16 seconds
        const TRAVEL_DURATION = 16000; // ms for a full loop
        let startTime: number | null = null;

        function drawParticles() {
            if (!ctx || !canvas) return;
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            for (const p of particles) {
                if (!prefersReduced) {
                    p.x += p.vx; p.y += p.vy;
                    p.alpha += p.alphaD * 0.002;
                    if (p.alpha > 0.25 || p.alpha < 0.02) p.alphaD *= -1;
                    if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
                    if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
                }
                ctx.beginPath();
                ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(120,180,255,${p.alpha})`;
                ctx.fill();
            }
        }

        function drawMapBackground() {
            if (!ctx || !canvas || !svgImage.complete) return;
            const cw = canvas.offsetWidth;
            const ch = canvas.offsetHeight;
            const isMobile = cw < 768;

            const mapH = isMobile ? ch * 0.60 : ch * 0.90;
            const scale = mapH / SVG_H;
            const mapW = SVG_W * scale;
            const offsetX = isMobile ? (cw - mapW) / 2 : cw - mapW - cw * 0.12;
            const offsetY = isMobile ? ch * 0.20 : ch * 0.05;

            // Tint the SVG: draw it with a blue glow
            ctx.save();
            ctx.globalAlpha = 0.18;
            ctx.filter = 'saturate(0) brightness(2)';
            ctx.drawImage(svgImage, offsetX, offsetY, mapW, mapH);
            ctx.filter = 'none';
            ctx.globalAlpha = 1;
            ctx.restore();

            // Overlay a blue border glow version
            ctx.save();
            ctx.globalAlpha = 0.55;
            ctx.globalCompositeOperation = 'screen';
            // Draw tinted blue
            const tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = canvas.width;
            tmpCanvas.height = canvas.height;
            const tmpCtx = tmpCanvas.getContext('2d');
            if (tmpCtx) {
                tmpCtx.scale(dpr, dpr);
                tmpCtx.drawImage(svgImage, offsetX, offsetY, mapW, mapH);
                tmpCtx.globalCompositeOperation = 'source-in';
                tmpCtx.fillStyle = '#1a6fd4';
                tmpCtx.fillRect(0, 0, cw, ch);
                ctx.shadowColor = 'rgba(80,160,255,0.8)';
                ctx.shadowBlur = 18;
                ctx.drawImage(tmpCanvas, 0, 0, cw, ch);
                ctx.shadowBlur = 0;
            }
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
            ctx.restore();
        }

        function drawTravelLine(progress: number) {
            if (!ctx) return;
            const n = TRAVEL_ORDER.length;
            // progress is 0..n, fractional
            const segIdx = Math.floor(progress) % n;
            const segT = progress - Math.floor(progress);

            // Draw all completed segments
            for (let i = 0; i < segIdx; i++) {
                const pIdx = TRAVEL_ORDER[i] ?? 0;
                const qIdx = TRAVEL_ORDER[(i + 1) % n] ?? 0;
                const [x1, y1] = mapToCanvas(PROVINCES[pIdx].cx, PROVINCES[pIdx].cy);
                const [x2, y2] = mapToCanvas(PROVINCES[qIdx].cx, PROVINCES[qIdx].cy);

                ctx.beginPath();
                ctx.strokeStyle = 'rgba(80,180,255,0.18)';
                ctx.lineWidth = 1;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            // Draw current animating segment
            if (segIdx < n) {
                const pIdx = TRAVEL_ORDER[segIdx] ?? 0;
                const qIdx = TRAVEL_ORDER[(segIdx + 1) % n] ?? 0;
                const [x1, y1] = mapToCanvas(PROVINCES[pIdx].cx, PROVINCES[pIdx].cy);
                const [x2, y2] = mapToCanvas(PROVINCES[qIdx].cx, PROVINCES[qIdx].cy);
                const xCur = x1 + (x2 - x1) * segT;
                const yCur = y1 + (y2 - y1) * segT;

                // Active segment: bright gradient
                const grad = ctx.createLinearGradient(x1, y1, xCur, yCur);
                grad.addColorStop(0, 'rgba(46,134,222,0.4)');
                grad.addColorStop(1, 'rgba(100,220,255,0.9)');
                ctx.beginPath();
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.8;
                ctx.shadowColor = 'rgba(100,220,255,0.7)';
                ctx.shadowBlur = 8;
                ctx.moveTo(x1, y1);
                ctx.lineTo(xCur, yCur);
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Traveling head dot
                ctx.beginPath();
                ctx.arc(xCur, yCur, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = 'rgba(160,230,255,1)';
                ctx.shadowBlur = 14;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function drawNodes(t: number) {
            if (!ctx) return;
            PROVINCES.forEach((prov, i) => {
                const [cx, cy] = mapToCanvas(prov.cx, prov.cy);
                const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + i * 0.8);

                if (prov.isHub) {
                    // Outer pulse ring
                    const outerR = 7 + pulse * 5;
                    ctx.beginPath();
                    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(230,168,23,${0.18 + pulse * 0.22})`;
                    ctx.lineWidth = 1;
                    ctx.shadowColor = 'rgba(230,168,23,0.5)';
                    ctx.shadowBlur = 8;
                    ctx.stroke();
                    ctx.shadowBlur = 0;

                    // Core
                    ctx.beginPath();
                    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(250,200,36,${0.75 + pulse * 0.25})`;
                    ctx.shadowColor = 'rgba(250,200,36,0.9)';
                    ctx.shadowBlur = 12;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                } else {
                    // Outer ring
                    const outerR = 4 + pulse * 3;
                    ctx.beginPath();
                    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(84,160,255,${0.12 + pulse * 0.18})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();

                    // Core dot
                    ctx.beginPath();
                    ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(84,180,255,${0.6 + pulse * 0.4})`;
                    ctx.shadowColor = 'rgba(84,180,255,0.7)';
                    ctx.shadowBlur = 8;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });
        }

        function render(timestamp: number) {
            if (!ctx || !canvas) return;
            if (startTime === null) startTime = timestamp;

            const elapsed = timestamp - startTime;
            const t = elapsed / 1000; // seconds

            // Progress: 0..PROVINCES.length, loops every TRAVEL_DURATION ms
            const rawProgress = (elapsed % TRAVEL_DURATION) / TRAVEL_DURATION;
            const progress = rawProgress * TRAVEL_ORDER.length;

            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            drawParticles();
            drawMapBackground();
            drawTravelLine(progress);
            drawNodes(t);

            if (!prefersReduced) {
                animId = requestAnimationFrame(render);
            }
        }

        // Wait for SVG image to load before starting
        if (svgImage.complete) {
            animId = requestAnimationFrame(render);
        } else {
            svgImage.onload = () => { animId = requestAnimationFrame(render); };
        }

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
        };
    }, [canvasRef]);
}
