import { promptSections } from '../data/resourceGuides';
import { ExampleBox, GuidanceCard, LinkCallout, ResourceArticle } from '../components/ResourceArticle';
import { RevealOnScroll } from '../components/RevealOnScroll';

const ResponsibleAIPage = () => {
  return (
    <ResourceArticle
      eyebrow="Writing support"
      title="Responsible AI Templates"
      summary="Prompt patterns for using LLMs to support writing assignments without outsourcing the writing process."
    >
      <div className="space-y-8">
        <RevealOnScroll>
          <GuidanceCard title="Operating Principle">
            <p className="mb-4">
              Use AI to support, not supplant, the writing process. The strongest academic uses ask
              for editorial advice, clerical assistance, high-level summaries, or feedback that keeps
              the writer responsible for the argument.
            </p>
            <p>
              For more context, review the{' '}
              <LinkCallout to="/course/using-ai-wisely">Using AI Wisely course module</LinkCallout>.
            </p>
          </GuidanceCard>
        </RevealOnScroll>

        {promptSections.map((section) => (
          <RevealOnScroll key={section.title}>
            <section className="cwail-surface rounded-xl p-5 md:p-6 shadow-cwail dark:shadow-cwail-dark">
              <div className="mb-5">
                <h2 className="text-2xl font-display font-semibold text-cwail-ink mb-2">
                  {section.title}
                </h2>
                <p className="text-cwail-muted leading-relaxed">{section.summary}</p>
              </div>

              <div className="grid gap-4">
                {section.examples.map((example) => (
                  <ExampleBox key={example.title} title={example.title} note={example.note}>
                    <p>{example.prompt}</p>
                  </ExampleBox>
                ))}
              </div>
            </section>
          </RevealOnScroll>
        ))}
      </div>
    </ResourceArticle>
  );
};

export default ResponsibleAIPage;
