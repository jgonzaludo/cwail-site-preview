import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

type VerifyState =
  | { status: 'loading' }
  | { status: 'ok'; user_name: string; created_at: string; course_id: string }
  | { status: 'not_found' }
  | { status: 'error' };

const VerifyCertificatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<VerifyState>({ status: 'loading' });

  useEffect(() => {
    const raw = (id ?? '').toLowerCase();
    if (!/^[a-f0-9]{10}$/.test(raw)) {
      setState({ status: 'not_found' });
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/verify/${raw}`);
        if (res.status === 404) {
          if (!cancelled) setState({ status: 'not_found' });
          return;
        }
        if (!res.ok) {
          if (!cancelled) setState({ status: 'error' });
          return;
        }
        const data = (await res.json()) as {
          user_name: string;
          created_at: string;
          course_id: string;
        };
        if (!cancelled) {
          setState({
            status: 'ok',
            user_name: data.user_name,
            created_at: data.created_at,
            course_id: data.course_id,
          });
        }
      } catch {
        if (!cancelled) setState({ status: 'error' });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (state.status === 'loading') {
    return (
      <div className="verify-page min-h-[70vh] flex items-center justify-center px-4">
        <p className="text-cwail-muted verify-muted">Verifying…</p>
      </div>
    );
  }

  if (state.status === 'not_found' || state.status === 'error') {
    return (
      <div className="verify-page min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="verify-hero-title font-display text-2xl font-bold text-academy-forest [@media(prefers-color-scheme:dark)]:text-academy-cream">
          Certificate Not Found
        </h1>
        <p className="verify-muted mt-3 max-w-md">
          We could not locate a completion record for this identifier. It may be invalid or the link
          may be incorrect.
        </p>
      </div>
    );
  }

  const formattedDate =
    state.created_at ?
      new Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeStyle: 'short' }).format(
        new Date(state.created_at)
      )
    : '—';

  return (
    <div className="verify-page min-h-[70vh] px-4 py-14">
      <div className="verify-card mx-auto max-w-lg overflow-hidden rounded-2xl border shadow-lg">
        <div className="verify-card-head px-6 py-8 text-center text-white">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <CheckCircle2 className="h-9 w-9 text-academy-orange" strokeWidth={2} aria-hidden />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">Verified Document</h1>
          <p className="mt-1 text-sm text-white/85">CWAIL Academy — completion on file</p>
        </div>
        <div className="verify-card-body space-y-4 px-6 py-8">
          <div>
            <p className="verify-label text-xs font-semibold uppercase tracking-wider">Recipient</p>
            <p className="verify-value mt-1 text-lg font-semibold">{state.user_name}</p>
          </div>
          <div>
            <p className="verify-label text-xs font-semibold uppercase tracking-wider">Course</p>
            <p className="verify-value mt-1">{state.course_id}</p>
          </div>
          <div>
            <p className="verify-label text-xs font-semibold uppercase tracking-wider">Recorded</p>
            <p className="verify-value mt-1 font-mono text-sm">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificatePage;
