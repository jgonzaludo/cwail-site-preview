import React, { useState } from 'react';
import { getStoredUserName, persistUserNameForModule } from '../lib/learnerContext';

const IntroductionNameCallout: React.FC = () => {
  const [name, setName] = useState(() => getStoredUserName());
  const [editing, setEditing] = useState(() => !getStoredUserName());

  const save = () => {
    const t = name.trim();
    if (!t) return;
    persistUserNameForModule(t);
    setEditing(false);
  };

  if (!editing && name.trim()) {
    return (
      <div className="mb-6 rounded-lg border border-cwail-border bg-cwail-elevated/90 px-4 py-3 text-sm text-cwail-muted dark:bg-gray-800/60">
        <span className="text-cwail-ink dark:text-gray-100">Certificate name:</span>{' '}
        <strong className="text-cwail-ink dark:text-gray-100">{name.trim()}</strong>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="ml-3 font-medium text-cwail-accent2 underline decoration-cwail-accent/40 underline-offset-2 hover:text-cwail-accent"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg border border-cwail-accent2/25 bg-cwail-accent2/5 px-4 py-4 dark:border-cwail-accent2/30 dark:bg-cwail-accent2/10">
      <label htmlFor="intro-learner-name" className="block text-sm font-medium text-cwail-ink dark:text-gray-100">
        Your name
      </label>
      <p className="mt-1 text-xs text-cwail-muted">
        Used on your certificate and celebration page. You can also set this on the home page before starting.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          id="intro-learner-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex Chen"
          className="min-w-0 flex-1 rounded-lg border border-cwail-border bg-cwail-bg px-3 py-2 text-cwail-ink focus:border-cwail-accent2 focus:outline-none focus:ring-1 focus:ring-cwail-accent2 dark:bg-gray-900 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={save}
          disabled={!name.trim()}
          className="rounded-lg bg-academy-forest px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-academy-orange dark:text-[#1c1917]"
        >
          Save name
        </button>
      </div>
    </div>
  );
};

export default IntroductionNameCallout;
