'use client';
import { RenderingEngine, Types, Enums } from '@cornerstonejs/core';
import { useEffect, useRef } from 'react';
import initDemo from './utils/initDemo';
import imageIds from './utils/imageIds';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const run = async () => {
    if (!containerRef.current) return;
    await initDemo();
    const renderingEngineId = 'myRenderingEngine';
    const viewportId = 'CT_AXIAL_STACK';
    const renderingEngine = new RenderingEngine(renderingEngineId);
    const viewportInput = {
      viewportId,
      element: containerRef.current,
      type: Enums.ViewportType.STACK,
    };
    renderingEngine.enableElement(viewportInput);

    const viewport = renderingEngine.getViewport(viewportInput.viewportId);
    viewport.setStack(imageIds, 60);

    viewport.render();
  };

  useEffect(() => {
    run();
  }, []);
  return <div ref={containerRef} className="w-[500px] h-[500px]"></div>;
}
