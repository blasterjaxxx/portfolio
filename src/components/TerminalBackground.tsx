"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01{}[]()<>/\\|=+-*&^%$#@!?;:.,_~αβλΣΔ∀∃→⇒";
const CELL = 16;
const BASE_ALPHA = 0.05;
const LIT_RADIUS = 130;

type Cell = { char: string; lit: number };

export function TerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cols = 0;
    let rows = 0;
    let cells: Cell[] = [];
    // Falling bright "heads", one per active column: y position and speed.
    let drops: { col: number; y: number; speed: number }[] = [];

    const pointer = { x: -9999, y: -9999 };

    const randomGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);

      cells = Array.from({ length: cols * rows }, () => ({
        char: randomGlyph(),
        lit: 0,
      }));

      // Roughly one falling column per twelve, so the effect stays sparse.
      const dropCount = Math.max(3, Math.floor(cols / 12));
      drops = Array.from({ length: dropCount }, () => ({
        col: (Math.random() * cols) | 0,
        y: Math.random() * -rows,
        speed: 0.08 + Math.random() * 0.14,
      }));

      ctx!.font = `${CELL - 4}px ui-monospace, monospace`;
      ctx!.textBaseline = "top";
    }

    function frame() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      if (!reduced) {
        for (const drop of drops) {
          drop.y += drop.speed;
          if (drop.y > rows + 6) {
            drop.y = -Math.random() * 20;
            drop.col = (Math.random() * cols) | 0;
            drop.speed = 0.08 + Math.random() * 0.14;
          }
          // Light the cells in the drop's tail; the head is brightest.
          const head = Math.floor(drop.y);
          for (let t = 0; t < 8; t++) {
            const row = head - t;
            if (row < 0 || row >= rows) continue;
            const cell = cells[row * cols + drop.col];
            if (!cell) continue;
            const strength = (1 - t / 8) * 0.5;
            if (strength > cell.lit) cell.lit = strength;
          }
        }
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cell = cells[row * cols + col];
          if (!cell) continue;

          const x = col * CELL;
          const y = row * CELL;

          // Pointer proximity lights cells up with a smooth falloff.
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LIT_RADIUS) {
            const strength = (1 - dist / LIT_RADIUS) ** 2;
            if (strength > cell.lit) cell.lit = strength;
            // Occasionally scramble a lit glyph so the field feels alive.
            if (Math.random() < 0.004) cell.char = randomGlyph();
          }

          cell.lit *= 0.94;

          const alpha = BASE_ALPHA + cell.lit * 0.75;
          ctx!.fillStyle = `rgba(126, 231, 135, ${alpha})`;
          ctx!.fillText(cell.char, x, y);
        }
      }

      raf = requestAnimationFrame(frame);
    }

    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }

    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    setup();
    let raf = requestAnimationFrame(frame);

    window.addEventListener("resize", setup);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <canvas ref={canvasRef} />
      <div className="column-mask absolute inset-0" />
      <div className="scanlines absolute inset-0" />
      <div className="vignette absolute inset-0" />
    </div>
  );
}
