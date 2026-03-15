import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', move);
    rafRef.current = requestAnimationFrame(animate);

    const onEnter = () => {
      if (dotRef.current) { dotRef.current.style.width = '6px'; dotRef.current.style.height = '6px'; }
      if (ringRef.current) { ringRef.current.style.width = '48px'; ringRef.current.style.height = '48px'; }
    };
    const onLeave = () => {
      if (dotRef.current) { dotRef.current.style.width = '10px'; dotRef.current.style.height = '10px'; }
      if (ringRef.current) { ringRef.current.style.width = '32px'; ringRef.current.style.height = '32px'; }
    };

    const interactables = document.querySelectorAll('a, button, .btn-primary, .btn-outline');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
