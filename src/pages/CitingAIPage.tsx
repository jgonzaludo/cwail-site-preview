import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { citationFaqs, citationStyles } from '../data/resourceGuides';
import { ExampleBox, GuidanceCard, ResourceArticle } from '../components/ResourceArticle';
import { RevealOnScroll } from '../components/RevealOnScroll';

const CitingAIPage = () => {
  const [activeStyleId, setActiveStyleId] = useState(citationStyles[0].id);
  const activeStyle = useMemo(
    () => citationStyles.find((style) => style.id === activeStyleId) ?? citationStyles[0],
    [activeStyleId],
  );

  return (
    <ResourceArticle
      eyebrow="Citation guidance"
      title="Citing/Attributing AI Tools"
      summary="Current guidance, as of January 2026, for citing AI output in APA, MLA, Chicago/Turabian, and IEEE style."
    >
      <div className="space-y-8">
        <RevealOnScroll>
          <GuidanceCard title="Before Choosing a Style">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cwail-accent" aria-hidden />
                <span>
                  Many styles require both an in-text attribution and an entry in a source list.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cwail-accent" aria-hidden />
                <span>
                  Shareable chat links are useful when available, but privacy and institutional policy
                  may limit what can be shared.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cwail-accent" aria-hidden />
                <span>Official style guidance should override this summary if requirements change.</span>
              </li>
            </ul>
          </GuidanceCard>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="cwail-surface rounded-xl shadow-cwail dark:shadow-cwail-dark overflow-hidden">
            <div className="border-b border-cwail-border p-3">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Citation styles">
                {citationStyles.map((style) => {
                  const selected = activeStyle.id === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveStyleId(style.id)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                        selected
                          ? 'bg-cwail-accent2 text-white shadow-sm'
                          : 'bg-cwail-bg text-cwail-muted hover:bg-cwail-bg/70 hover:text-cwail-ink'
                      }`}
                    >
                      {style.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 md:p-7" role="tabpanel">
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-cwail-ink mb-3">
                {activeStyle.title}
              </h2>
              <p className="text-cwail-muted leading-relaxed mb-6">{activeStyle.summary}</p>

              <div className="space-y-6">
                {activeStyle.blocks.map((block) => (
                  <section key={block.title} className="border-t border-cwail-border pt-5">
                    <h3 className="text-xl font-display font-semibold text-cwail-ink mb-3">
                      {block.title}
                    </h3>
                    <ul className="space-y-2 mb-4">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-2 text-cwail-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cwail-accent" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {block.note && <p className="text-sm text-cwail-muted mb-4">{block.note}</p>}
                    {block.examples && (
                      <div className="grid gap-3">
                        {block.examples.map((example) => (
                          <ExampleBox
                            key={`${block.title}-${example.text}`}
                            title={example.label}
                          >
                            <p>{example.text}</p>
                          </ExampleBox>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-cwail-border bg-cwail-bg/60 p-4">
                <h3 className="font-display font-semibold text-cwail-ink mb-2">
                  Additional Guidance
                </h3>
                <ul className="space-y-2">
                  {activeStyle.guidance.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-cwail-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cwail-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="cwail-surface rounded-xl p-5 md:p-6 shadow-cwail dark:shadow-cwail-dark">
            <h2 className="text-2xl font-display font-semibold text-cwail-ink mb-5">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {citationFaqs.map((faq) => (
                <article key={faq.question} className="border-t border-cwail-border pt-5 first:border-t-0 first:pt-0">
                  <h3 className="text-lg font-semibold text-cwail-ink mb-2">{faq.question}</h3>
                  <p className="text-cwail-muted mb-3 leading-relaxed">{faq.answer}</p>
                  <ul className="space-y-2">
                    {faq.checklist.map((item) => (
                      <li key={item} className="flex gap-2 text-cwail-muted">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-cwail-accent2" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </ResourceArticle>
  );
};

export default CitingAIPage;
