import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, RotateCcw } from 'lucide-react';
import ModuleResponsesSummary from '../components/ModuleResponsesSummary';
import { getStoredUserName } from '../lib/learnerContext';

const STORAGE_CERT_ID = 'cwail:completion_id';
const STORAGE_CERT_ISSUED_AT = 'cwail:completion_issued_at';

function readLocalString(key: string): string | null {
  try {
    const v = localStorage.getItem(key);
    return v;
  } catch {
    return null;
  }
}

function readUserName(): string {
  const n = getStoredUserName();
  if (n) return n;
  return 'Learner';
}

function readCourseId(): string {
  const raw = readLocalString('progress_data');
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { course_id?: string };
      if (typeof parsed?.course_id === 'string' && parsed.course_id.trim()) {
        return parsed.course_id.trim();
      }
    } catch {
      /* ignore */
    }
  }
  return 'cwail-ai-literacy';
}

function CwailBookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M0 0 C1.27186661 0.10836433 1.27186661 0.10836433 2.56942749 0.21891785 C5.33865875 0.4589342 8.10689258 0.70830055 10.875 0.9609375 C11.83674133 1.0483017 12.79848267 1.13566589 13.78936768 1.22567749 C81.40126688 7.44915454 155.59282292 17.58903899 215.875 50.3359375 C216.473125 50.65771973 217.07125 50.97950195 217.6875 51.31103516 C229.48519745 57.70251403 240.38949259 65.05213824 250.625 73.7109375 C251.23408203 74.22301758 251.84316406 74.73509766 252.47070312 75.26269531 C256.75176459 78.96623126 256.75176459 78.96623126 257.875 82.3359375 C258.535 82.3359375 259.195 82.3359375 259.875 82.3359375 C261.69795683 84.37958396 263.3897893 86.42379675 265.0625 88.5859375 C265.55210205 89.2140332 266.0417041 89.84212891 266.54614258 90.48925781 C277.875 105.2914539 277.875 105.2914539 277.875 110.3359375 C278.535 110.3359375 279.195 110.3359375 279.875 110.3359375 C280.12121094 109.48386719 280.36742187 108.63179688 280.62109375 107.75390625 C281.97789217 104.05546819 283.78731206 100.91988345 285.9375 97.6484375 C286.52543335 96.74520752 286.52543335 96.74520752 287.12524414 95.82373047 C290.95736214 90.03931504 295.04884104 84.33555249 299.875 79.3359375 C300.535 79.3359375 301.195 79.3359375 301.875 79.3359375 C301.875 78.6759375 301.875 78.0159375 301.875 77.3359375 C315.96359758 62.3535014 335.45803499 51.91905982 353.875 43.3359375 C354.55385254 43.01802246 355.23270508 42.70010742 355.93212891 42.37255859 C399.90205893 22.10010665 449.49479309 13.37856033 497.0625 6.3359375 C497.77428406 6.22980133 498.48606812 6.12366516 499.21942139 6.01431274 C505.83053325 5.03847326 512.18048927 4.22573107 518.875 4.3359375 C519.205 3.6759375 519.535 3.0159375 519.875 2.3359375 C521.02355469 2.366875 522.17210937 2.3978125 523.35546875 2.4296875 C531.38388293 2.4296875 539.38433363 1.41762051 547.36499023 0.61767578 C577.87050278 -2.41739044 577.87050278 -2.41739044 587.25 4.5234375 C594.42432312 12.21021228 594.46127405 19.52573541 594.42089844 29.58129883 C594.42965572 31.03360872 594.44014496 32.48590903 594.45220757 33.93819523 C594.48021391 37.92165321 594.48344197 41.90480121 594.48247957 45.88834333 C594.48571213 50.20249315 594.51173605 54.51651564 594.53475952 58.83059692 C594.57629664 67.30737459 594.59624878 75.78407498 594.60895979 84.2609396 C594.61987146 91.17083447 594.63962023 98.08065437 594.66546631 104.99050903 C594.66914864 105.97599025 594.67283098 106.96147147 594.67662489 107.97681576 C594.68414736 109.98127203 594.69168387 111.98572826 594.69923425 113.99018443 C594.78594414 137.41382988 594.82834647 160.83748925 594.86067855 184.26126403 C594.87162698 192.16656968 594.88428784 200.07187123 594.89782715 207.97717285 C594.947543 237.24022637 594.98191404 266.50326095 594.99659729 295.76635361 C594.99878058 300.11181549 595.0013901 304.45727679 595.00437927 308.80273819 C595.01273612 321.22525814 595.01549115 333.64775653 595.00957108 346.07027817 C595.00792175 349.8481166 595.00848796 353.62594405 595.01108932 357.40378189 C595.01396759 361.76919218 595.0120378 366.13457398 595.00635386 370.49998128 C595.0050747 372.0758635 595.00544126 373.65174815 595.0076766 375.2276293 C595.04372571 403.30117531 595.04372571 403.30117531 588.40625 411.05078125 C581.24811673 417.95567868 571.38520443 418.77742138 561.89453125 419.546875 C560.86035065 419.63989395 559.82617004 419.7329129 558.76065063 419.82875061 C556.54984865 420.02739644 554.33867093 420.22189772 552.12716675 420.41256714 C546.26714175 420.92088899 540.41095315 421.46981303 534.5546875 422.01953125 C533.38294479 422.12924759 532.21120209 422.23896393 531.00395203 422.352005 C423.32677991 432.01497636 423.32677991 432.01497636 329.875 480.3359375 C328.85599609 481.18671875 328.85599609 481.18671875 327.81640625 482.0546875 C318.28566831 490.68297681 312.09242033 503.05440274 307.18212891 514.72558594 C304.24283026 521.43705581 300.11077702 527.05266737 293.3125 530.2109375 C282.72066694 533.50936133 269.52215814 533.65951657 259.5 528.6484375 C253.21824072 523.1145067 249.55292676 517.20361051 246.0625 509.6484375 C242.09487125 501.41248817 237.88532956 494.28365791 231.875 487.3359375 C230.96041016 486.27246094 230.96041016 486.27246094 230.02734375 485.1875 C178.27781127 429.59246086 67.69064742 426.36192909 -2.19824219 419.93310547 C-3.20250748 419.83913986 -4.20677277 419.74517426 -5.24147034 419.64836121 C-7.09705306 419.47566585 -8.9530984 419.307831 -10.80967712 419.14619446 C-20.25196928 418.26763634 -28.21035472 417.24954578 -35.125 410.3359375 C-40.89513439 402.40162821 -40.8300384 394.03743776 -40.74645996 384.64033508 C-40.75079414 383.05688762 -40.75731482 381.4734449 -40.76582003 379.89001435 C-40.78275464 375.5591154 -40.76867038 371.22879768 -40.74930525 366.89792955 C-40.73384226 362.21965057 -40.74728928 357.54144114 -40.75704956 352.86315918 C-40.77155939 343.70728713 -40.7593596 334.55163719 -40.73793632 325.3957862 C-40.71390266 314.73230381 -40.71564209 304.06887205 -40.71824223 293.40536859 C-40.72193054 274.38046982 -40.70112141 255.3556756 -40.66699219 236.33081055 C-40.63388804 217.87049722 -40.61973648 199.41029358 -40.62597656 180.94995117 C-40.63274001 160.8424417 -40.6302827 140.73497814 -40.61061716 120.62747544 C-40.60957768 119.56434877 -40.60853819 118.5012221 -40.6074672 117.40587946 C-40.60537632 115.27068039 -40.60326535 113.13548133 -40.60113403 111.00028229 C-40.59423844 103.56699556 -40.5935691 96.13372299 -40.59501648 88.70043373 C-40.59645589 79.64434449 -40.58677041 70.58834469 -40.56307012 61.53228513 C-40.55120782 56.91167873 -40.54408659 52.29119701 -40.54990768 47.6705761 C-40.55507868 43.44105601 -40.54639427 39.21179939 -40.52663308 34.98232438 C-40.52189274 33.4522335 -40.52219406 31.92211697 -40.52804345 30.39202992 C-40.53522937 28.31130473 -40.52394343 26.23145151 -40.50811005 24.15079212 C-40.50653884 22.9954078 -40.50496764 21.84002348 -40.50334883 20.64962751 C-39.70745034 13.67891509 -36.30837218 7.99976421 -31.125 3.3359375 C-21.75410473 -2.33210953 -10.43617743 -0.91842958 0 0 Z" transform="translate(234.125,333.6640625)" />
      <path d="M0 0 C9.26668911 6.73941026 9.4525979 21.21774203 11.22412109 31.76635742 C14.03093638 48.34300922 18.16159366 64.37337744 31.79296875 75.4765625 C45.59803204 85.00572123 64.24000637 86.99255065 80.41772461 89.92724609 C82.70934126 90.34555139 84.9971988 90.78093321 87.28515625 91.21875 C87.972715 91.3386731 88.66027374 91.45859619 89.3686676 91.58215332 C94.89684889 92.65862309 98.84440537 94.91625852 102.875 98.8125 C104.54782163 102.06520872 104.44242044 104.39743358 104 108 C101.35894953 112.64824884 97.87220932 114.27715005 93 116 C90.38419202 116.62718401 87.82851622 117.17647668 85.1875 117.6484375 C83.68357798 117.93481304 82.17967227 118.22127423 80.67578125 118.5078125 C78.35132438 118.94069943 76.02628442 119.37017738 73.70068359 119.796875 C45.7687997 124.95439356 45.7687997 124.95439356 24.30859375 142.35546875 C19.09728958 150.77975745 15.63730776 159.28552362 13.5 168.9375 C13.29060791 169.84121338 13.08121582 170.74492676 12.86547852 171.67602539 C11.83365521 176.15875491 10.85759563 180.650111 9.93359375 185.15625 C9.76472656 185.96328369 9.59585938 186.77031738 9.421875 187.60180664 C9.10879242 189.11151481 8.80719237 190.62367015 8.51953125 192.13842773 C7.26576846 198.19709394 5.2078882 202.52807453 0 206 C-4.71185778 206.68681317 -8.73650993 206.69895195 -12.9375 204.375 C-17.01004134 199.68540694 -18.465658 194.74275331 -19.61328125 188.72265625 C-19.89488452 187.30658138 -20.17679605 185.89056778 -20.45898438 184.47460938 C-20.88507998 182.28440513 -21.30663568 180.09349515 -21.72143555 177.90112305 C-24.27081542 164.54310223 -27.38154193 151.21440256 -36.58203125 140.734375 C-38 139 -38 139 -39 136 C-40.83082015 134.93044555 -40.83082015 134.93044555 -43 134 C-44.43924271 133.06517759 -45.87658082 132.12741947 -47.3125 131.1875 C-59.37590029 124.0291892 -72.96910084 121.79391594 -86.56958008 119.14257812 C-107.66911368 115.00735844 -107.66911368 115.00735844 -112 109 C-113.28544691 105.2239997 -113.20930782 103.56182624 -111.8125 99.8125 C-108.59780055 94.82417326 -105.24123934 93.54965106 -99.5625 92.1875 C-98.8929126 92.02427246 -98.2233252 91.86104492 -97.53344727 91.69287109 C-92.71925275 90.55020032 -87.87905595 89.57093576 -83.0234375 88.62109375 C-53.95432312 83.52143263 -53.95432312 83.52143263 -32.1875 64.875 C-24.85439313 52.20091834 -22.65293841 38.83612092 -20.2109375 24.5859375 C-16.78404617 5.23222891 -16.78404617 5.23222891 -11 1 C-10.38125 0.54625 -9.7625 0.0925 -9.125 -0.375 C-5.75019879 -1.36758859 -3.37754007 -0.88882633 0 0 Z" transform="translate(665,130)" />
    </svg>
  );
}

/** Smooth scalloped circle path (professional seal edge). */
function scallopedSealPath(cx: number, cy: number, bumps: number, rOuter: number, rInner: number): string {
  const segments: string[] = [];
  const step = (2 * Math.PI) / bumps;
  for (let i = 0; i < bumps; i++) {
    const a0 = i * step - Math.PI / 2;
    const a1 = (i + 0.5) * step - Math.PI / 2;
    const a2 = (i + 1) * step - Math.PI / 2;
    const x0 = cx + rOuter * Math.cos(a0);
    const y0 = cy + rOuter * Math.sin(a0);
    const x1 = cx + rInner * Math.cos(a1);
    const y1 = cy + rInner * Math.sin(a1);
    const x2 = cx + rOuter * Math.cos(a2);
    const y2 = cy + rOuter * Math.sin(a2);
    if (i === 0) segments.push(`M ${x0.toFixed(3)} ${y0.toFixed(3)}`);
    segments.push(`Q ${x1.toFixed(3)} ${y1.toFixed(3)} ${x2.toFixed(3)} ${y2.toFixed(3)}`);
  }
  segments.push('Z');
  return segments.join(' ');
}

const SEAL_PATH = scallopedSealPath(100, 100, 28, 88, 72);

function QrPlaceholder({ muted = false }: { muted?: boolean }) {
  const cells = [
    0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 28, 31, 33, 35, 36, 38, 40, 42,
    43, 44, 46, 48,
  ];

  return (
    <div
      className={`grid h-[120px] w-[120px] grid-cols-7 gap-1 rounded-sm border bg-white p-2 ${
        muted ? 'border-[#c8c4b8] opacity-55 grayscale' : 'border-[#0F2922]/30'
      }`}
      aria-label="QR code placeholder"
      role="img"
    >
      {Array.from({ length: 49 }, (_, index) => (
        <span
          key={index}
          className={`rounded-[1px] ${
            cells.includes(index) ? (muted ? 'bg-[#8e8a80]' : 'bg-[#0F2922]') : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
}

async function parseIssueErrorResponse(res: Response): Promise<{ message: string; raw: unknown }> {
  const text = await res.text();
  if (!text.trim()) {
    return { message: `Issue failed (${res.status})`, raw: null };
  }
  try {
    const json = JSON.parse(text) as { error?: string; details?: string };
    const detail = typeof json.details === 'string' && json.details.trim() ? ` — ${json.details.trim()}` : '';
    const base =
      typeof json.error === 'string' && json.error.trim() ? json.error.trim() : `Issue failed (${res.status})`;
    return { message: `${base}${detail}`, raw: json };
  } catch {
    return { message: text.slice(0, 200) || `Issue failed (${res.status})`, raw: text };
  }
}

const CertificatePage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [hexId, setHexId] = useState<string | null>(null);
  const [issuedAt, setIssuedAt] = useState<string | null>(null);
  const [issueError, setIssueError] = useState<string | null>(null);
  const [qrImageFailed, setQrImageFailed] = useState(false);
  const [busy, setBusy] = useState(true);

  const verifyBaseUrl =
    (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : '');

  const issueCertificate = useCallback(async () => {
    const name = readUserName();
    const cid = readCourseId();
    setUserName(name);

    const existing = localStorage.getItem(STORAGE_CERT_ID);
    if (existing && /^[a-f0-9]{10}$/i.test(existing)) {
      setHexId(existing.toLowerCase());
      const storedDate = readLocalString(STORAGE_CERT_ISSUED_AT);
      setIssuedAt(storedDate?.trim() || null);
      setBusy(false);
      return;
    }

    setBusy(true);
    setIssueError(null);
    try {
      const res = await fetch('/api/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: name, course_id: cid }),
      });
      if (!res.ok) {
        const { message, raw } = await parseIssueErrorResponse(res);
        console.error('[CertificatePage] POST /api/issue failed', res.status, raw);
        throw new Error(message);
      }
      let data: { id: string; issued_at?: string };
      try {
        data = (await res.json()) as { id: string; issued_at?: string };
      } catch (parseErr) {
        console.error('[CertificatePage] Invalid JSON from /api/issue', parseErr);
        throw new Error('Invalid response from certificate server');
      }
      const id = String(data.id).toLowerCase();
      const at =
        typeof data.issued_at === 'string' && data.issued_at.trim() ? data.issued_at.trim() : null;
      localStorage.setItem(STORAGE_CERT_ID, id);
      if (at) localStorage.setItem(STORAGE_CERT_ISSUED_AT, at);
      setHexId(id);
      setIssuedAt(at);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not issue certificate';
      console.error('[CertificatePage] issueCertificate', msg, e);
      setIssueError(msg);
      setHexId(null);
      setIssuedAt(null);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void issueCertificate();
  }, [issueCertificate]);

  const qrUrl = useMemo(() => {
    if (!hexId || !verifyBaseUrl) return '';
    return `https://quickchart.io/qr?text=${encodeURIComponent(`${verifyBaseUrl}/v/${hexId}`)}&size=250`;
  }, [hexId, verifyBaseUrl]);

  useEffect(() => {
    setQrImageFailed(false);
  }, [qrUrl]);

  const displayId = hexId ? `CS-CWAIL-${hexId}` : '';

  const issuanceLabel = issuedAt
    ? (() => {
        try {
          const d = new Date(issuedAt);
          if (!Number.isNaN(d.getTime())) {
            return d.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          }
        } catch {
          /* ignore */
        }
        return issuedAt;
      })()
    : null;

  const navigate = useNavigate();
  const handleNewSession = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="cert-page-root min-h-screen py-10 px-4 bg-transparent text-cwail-ink dark:bg-neutral-950 dark:text-cwail-ink">
      <div className="no-print mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-academy-forest/30 bg-cwail-elevated px-4 py-2 text-sm font-medium text-academy-forest shadow-sm hover:bg-cwail-bg dark:border-academy-forest/50 dark:bg-cwail-elevated dark:text-academy-cream dark:hover:bg-neutral-800"
        >
          <Printer className="h-4 w-4" aria-hidden />
          Download / Print
        </button>
        <button
          type="button"
          onClick={handleNewSession}
          className="inline-flex items-center gap-2 rounded-lg bg-academy-orange px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          New Session
        </button>
      </div>

      {issueError && (
        <p className="no-print mx-auto mb-4 max-w-3xl text-center text-sm text-red-600 dark:text-red-400">
          {issueError}
        </p>
      )}

      <ModuleResponsesSummary variant="certificate" />

      <div className="cert-print-target cert-surface mx-auto w-full max-w-[900px] shadow-2xl print:shadow-none">
        <div
          className="cert-inner cert-document flex aspect-[900/636] w-full flex-col justify-between border-[16px] border-[#0F2922] p-6 text-[#0F2922] shadow-[inset_0_0_0_2px_#F2F0E9] sm:p-8 md:p-10"
          style={{
            colorScheme: 'light',
            background: 'radial-gradient(circle at center, #F2F0E9 0%, #F2F0E9 42%, #EBE9E1 100%)',
          }}
        >
          <div className="text-center">
            <h1 className="font-cert-serif text-2xl font-semibold leading-snug tracking-wide text-[#0F2922] sm:text-3xl md:text-[2rem]">
              Certificate of Completion
            </h1>
            <div className="mx-auto mt-4 h-1 w-48 max-w-[85%] rounded-full bg-academy-orange" style={{ height: '4px' }} />
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center pt-10 text-center">
            <p className="mt-8 font-cert-sans text-base font-normal text-[#4a5754] sm:text-lg">
              This certifies that
            </p>
            <p className="font-cert-serif mt-4 text-4xl font-bold text-[#0F2922] sm:text-5xl md:text-6xl">
              {userName || '—'}
            </p>
            <p className="mt-9 font-cert-sans text-base font-normal text-[#0F2922]/70 sm:text-lg">
              successfully finished the
            </p>
            <p className="font-cert-serif mt-3 text-3xl font-bold text-[#F89B4E] sm:text-4xl">
              AI Literacy Program
            </p>
          </div>

          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-end gap-4 pt-6">
            <div className="flex justify-start">
              <div className="relative h-[140px] w-[140px] shrink-0">
                <svg viewBox="0 0 200 200" className="h-full w-full text-[#0F2922]" aria-hidden>
                  <path d={SEAL_PATH} fill="currentColor" />
                  <circle cx="100" cy="100" r="52" fill="#F2F0E9" />
                </svg>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <CwailBookIcon className="h-[68px] w-[68px] text-[#0F2922]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-end px-2 pb-1 text-center">
              {issuanceLabel ? (
                <p className="font-cert-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#4a5754]">
                  Date of issuance
                </p>
              ) : null}
              {issuanceLabel ? (
                <p className="font-cert-sans mt-0.5 text-xs text-[#0F2922]">{issuanceLabel}</p>
              ) : null}
            </div>

            <div className="flex justify-end">
              <div className="flex w-[140px] flex-col items-center">
                {busy && !hexId ? (
                  <QrPlaceholder muted />
                ) : qrUrl && !qrImageFailed ? (
                  <img
                    src={qrUrl}
                    alt="Verification QR code"
                    width={250}
                    height={250}
                    className="h-[120px] w-[120px]"
                    onError={() => setQrImageFailed(true)}
                  />
                ) : (
                  <QrPlaceholder muted={!hexId} />
                )}
                <p className="font-cert-sans mt-2 text-[8px] font-medium uppercase tracking-[0.14em] text-[#4a5754]">
                  Unique ID
                </p>
                <p className="font-mono mt-0.5 text-[9px] leading-tight text-[#0F2922]">
                  {hexId ? displayId : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
