import { useEffect, useMemo, useRef, useState } from 'react';

const APS_VIEWER_SCRIPT_ID = 'aps-viewer-script';
const APS_VIEWER_CSS_ID = 'aps-viewer-style';
const DEFAULT_VIEWER_SCRIPT_URL = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js';
const DEFAULT_VIEWER_STYLE_URL = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css';
const DEFAULT_TOKEN_ENDPOINT = '/api/aps/token';
const DEMO_ACCESS_TOKEN = process.env.REACT_APP_APS_ACCESS_TOKEN || '';

let viewerAssetsPromise = null;

function loadViewerAssets(scriptUrl, styleUrl) {
  if (typeof window === 'undefined') return Promise.reject(new Error('Viewer requires browser runtime.'));
  if (window.Autodesk?.Viewing) return Promise.resolve();
  if (viewerAssetsPromise) return viewerAssetsPromise;

  viewerAssetsPromise = new Promise((resolve, reject) => {
    if (!document.getElementById(APS_VIEWER_CSS_ID)) {
      const link = document.createElement('link');
      link.id = APS_VIEWER_CSS_ID;
      link.rel = 'stylesheet';
      link.href = styleUrl;
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById(APS_VIEWER_SCRIPT_ID);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Autodesk Viewer script.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = APS_VIEWER_SCRIPT_ID;
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Autodesk Viewer script.'));
    document.body.appendChild(script);
  });

  return viewerAssetsPromise;
}

async function fetchApsToken(tokenEndpoint) {
  if (DEMO_ACCESS_TOKEN) {
    return { token: DEMO_ACCESS_TOKEN, expiresIn: 3599 };
  }
  const response = await fetch(tokenEndpoint);
  if (!response.ok) {
    throw new Error(`Token request failed with status ${response.status}`);
  }
  const payload = await response.json();
  const token = payload.access_token || payload.accessToken || payload.token;
  const expiresIn = Number(payload.expires_in || payload.expiresIn || 3599);
  if (!token) {
    throw new Error('Token response is missing access_token.');
  }
  return { token, expiresIn };
}

function AutodeskDwgViewer({
  urn,
  title = 'CAD Viewer',
  tokenEndpoint = DEFAULT_TOKEN_ENDPOINT,
  viewerScriptUrl = DEFAULT_VIEWER_SCRIPT_URL,
  viewerStyleUrl = DEFAULT_VIEWER_STYLE_URL,
}) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [state, setState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const normalizedUrn = useMemo(() => String(urn || '').trim(), [urn]);
  const isDemoTokenMode = Boolean(DEMO_ACCESS_TOKEN);

  useEffect(() => {
    let cancelled = false;

    if (!normalizedUrn) {
      setState('idle');
      setErrorMessage('');
      return () => {};
    }

    async function initViewer() {
      try {
        setState('loading');
        setErrorMessage('');
        await loadViewerAssets(viewerScriptUrl, viewerStyleUrl);

        if (cancelled || !containerRef.current || !window.Autodesk?.Viewing) return;

        await new Promise((resolve, reject) => {
          window.Autodesk.Viewing.Initializer(
            {
              env: 'AutodeskProduction',
              getAccessToken(onTokenReady) {
                fetchApsToken(tokenEndpoint)
                  .then(({ token, expiresIn }) => onTokenReady(token, expiresIn))
                  .catch((error) => reject(error));
              },
            },
            () => resolve(),
            (code, message) => reject(new Error(`Viewer init failed (${code}): ${message}`))
          );
        });

        if (cancelled || !containerRef.current) return;

        const viewer = new window.Autodesk.Viewing.GuiViewer3D(containerRef.current);
        viewerRef.current = viewer;
        const startCode = viewer.start();
        if (startCode > 0) {
          throw new Error(`Viewer start failed (${startCode}).`);
        }

        await new Promise((resolve, reject) => {
          window.Autodesk.Viewing.Document.load(
            `urn:${normalizedUrn}`,
            (document) => {
              const defaultNode = document.getRoot().getDefaultGeometry();
              if (!defaultNode) {
                reject(new Error('No viewable geometry found for this model.'));
                return;
              }
              viewer.loadDocumentNode(document, defaultNode).then(resolve).catch(reject);
            },
            (code, message) => reject(new Error(`Model load failed (${code}): ${message}`))
          );
        });

        if (!cancelled) {
          setState('ready');
        }
      } catch (error) {
        if (!cancelled) {
          setState('error');
          setErrorMessage(error instanceof Error ? error.message : 'Unknown viewer error.');
        }
      }
    }

    initViewer();

    return () => {
      cancelled = true;
      if (viewerRef.current) {
        viewerRef.current.finish();
        viewerRef.current.tearDown();
        viewerRef.current = null;
      }
    };
  }, [normalizedUrn, tokenEndpoint, viewerScriptUrl, viewerStyleUrl]);

  if (!normalizedUrn) {
    return (
      <section className="cad-viewer-shell">
        <div className="cad-viewer-header">
          <h4>{title}</h4>
        </div>
        <div className="cad-viewer-empty">
          No CAD model URN found for this ticket. Add `cadUrn` after APS translation.
        </div>
      </section>
    );
  }

  return (
    <section className="cad-viewer-shell">
      <div className="cad-viewer-header">
        <h4>{title}</h4>
      </div>
      {isDemoTokenMode ? (
        <div className="cad-viewer-banner">Demo mode: using hardcoded APS token from `REACT_APP_APS_ACCESS_TOKEN`.</div>
      ) : null}
      {state === 'loading' ? <div className="cad-viewer-banner">Loading CAD model...</div> : null}
      {state === 'error' ? <div className="cad-viewer-banner cad-viewer-error">{errorMessage}</div> : null}
      <div ref={containerRef} className="cad-viewer-canvas" />
    </section>
  );
}

export default AutodeskDwgViewer;
