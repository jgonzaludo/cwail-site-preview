export interface PromptExample {
  title: string;
  prompt: string;
  note?: string;
}

export interface PromptSection {
  title: string;
  summary: string;
  examples: PromptExample[];
}

export interface CitationExample {
  label?: string;
  text: string;
}

export interface CitationBlock {
  title: string;
  items: string[];
  examples?: CitationExample[];
  note?: string;
}

export interface CitationStyleGuide {
  id: string;
  label: string;
  title: string;
  summary: string;
  blocks: CitationBlock[];
  guidance: string[];
}

export const promptSections: PromptSection[] = [
  {
    title: 'Brainstorming & Invention',
    summary: 'Use AI to suggest initial ideas or to view existing ideas from another angle.',
    examples: [
      {
        title: 'Exploring a topic area',
        prompt:
          'I am writing a paper for a [course name] class. My topic is [topic]. What are some specific angles, debates, or open questions within this subject that might make for a focused essay?',
      },
      {
        title: 'Generating an argument from notes',
        prompt:
          'Here are some rough ideas I have been thinking about: [paste your notes]. Can you suggest two or three possible arguments based on these ideas?',
      },
      {
        title: 'Identifying counterarguments',
        prompt:
          'I am planning to argue that [your position]. What are the strongest objections someone might raise against this view? I want to address them in my paper.',
      },
      {
        title: 'Overcoming writer block',
        prompt:
          'I am trying to write about [topic] but I am stuck. Can you ask me three or four questions that might help me figure out what I actually want to say?',
      },
    ],
  },
  {
    title: 'Research Assistance',
    summary:
      'Use AI to locate information and understand a topic area. Verify sources independently, especially when AI suggests citations.',
    examples: [
      {
        title: 'Finding sources',
        prompt:
          'I am writing a paper on [topic] for a [subject] course. Can you suggest some peer-reviewed articles or books I should look into? Please include authors, titles, and publication dates.',
        note:
          'LLMs can expedite source discovery, but they can also hallucinate sources. Confirm that every source exists before using it.',
      },
      {
        title: 'Understanding an unfamiliar concept',
        prompt:
          'I am reading a paper on [topic] and I keep encountering the term [term]. Can you explain what it means in plain language, and give me an example of how it is used?',
      },
      {
        title: 'Mapping a scholarly conversation',
        prompt:
          'I am researching [topic]. Can you give me a brief overview of the main schools of thought or ongoing debates in this area?',
      },
      {
        title: 'Checking your understanding of a source',
        prompt:
          'Here is my understanding of [author]\'s argument: [your summary]. Does this seem like an accurate reading, or am I missing anything important?',
      },
    ],
  },
  {
    title: 'Drafting Help',
    summary: 'Use AI to assess work while you are producing it, without asking it to replace your drafting.',
    examples: [
      {
        title: 'Structuring your argument',
        prompt:
          'Here is my thesis: [your thesis]. Here are the main points I want to make: [your points]. Does this structure make logical sense? Are there any gaps or sequencing problems I should fix?',
      },
      {
        title: 'Getting a fresh perspective',
        prompt:
          'I am trying to write a paragraph that makes the following point: [your point]. I have written this much so far: [your draft]. Is anything missing, or is my point clear?',
      },
      {
        title: 'Double-checking evidence and inferences',
        prompt:
          'My claim is: [your claim]. The evidence I am using to support it is: [your evidence in the form of sources, summary, or both]. Does the evidence actually support the claim, or is there a logical gap?',
      },
    ],
  },
  {
    title: 'Revision & Feedback',
    summary: 'Use AI for the kind of broad feedback a careful editor or proofreader might provide.',
    examples: [
      {
        title: 'General feedback',
        prompt:
          'Here is a draft of my paper: [paste draft]. Tell me: Is my argument clear? Are there sections that feel weak or underdeveloped? Does the structure work?',
      },
      {
        title: 'Audience and tone input',
        prompt:
          'My paper is written for [describe audience, e.g., a professor of sociology, a general reader]. Does my tone and level of explanation seem appropriate for that audience? Where might I need to adjust?',
      },
      {
        title: 'Identifying logical weaknesses',
        prompt:
          'Please read my argument and tell me: are there any claims I am making that I have not adequately supported? Are there any logical leaps I should address?',
      },
      {
        title: 'Transition check',
        prompt:
          'Do the transitions between my paragraphs make the connections between my ideas clear? Flag any places where the connection feels abrupt or unclear.',
      },
    ],
  },
  {
    title: 'Editing & Proofreading',
    summary: 'Use AI as a detail-oriented copyeditor, then review the edits yourself.',
    examples: [
      {
        title: 'Grammar and mechanics check',
        prompt:
          'Please check my paper for grammatical errors, typos, and punctuation problems. List the three most common errors you find and explain what is wrong with each one.',
      },
      {
        title: 'Reviewing for clarity',
        prompt:
          'Are there any sentences in my paper that are unnecessarily long, awkward, or hard to follow? Please flag them and explain why.',
      },
      {
        title: 'Catching inconsistencies',
        prompt:
          'Please check my paper for inconsistencies in formatting, terminology, or citation style. I am using [citation style, e.g., APA, MLA, Chicago].',
      },
    ],
  },
  {
    title: 'Citation & Source Management',
    summary: 'Use AI for citation assistance, but verify formatted entries and source details.',
    examples: [
      {
        title: 'Formatting a citation',
        prompt:
          'Can you format the following source as a [APA/MLA/Chicago] citation? [Source details: author, title, URL, etc.]',
        note:
          'Review the finished citation. Hallucinated or mismatched source information can create attribution errors.',
      },
      {
        title: 'Paraphrase check',
        prompt:
          'Here is the original passage: [paste passage]. Here is my paraphrase: [paste your paraphrase]. Am I too close to the original wording? Could this be construed as plagiarism?',
      },
    ],
  },
  {
    title: 'Menial Task Automation',
    summary: 'Use AI for time-consuming clerical tasks that do not replace the intellectual work of writing.',
    examples: [
      {
        title: 'Ordering a reference list',
        prompt:
          'Here is a list of reference entries in no particular order: [paste list]. Please sort them alphabetically by author last name and double-check that I have formatted them correctly.',
      },
      {
        title: 'Generating a bibliography from a draft or source',
        prompt:
          'Here is a source I am using in my paper: [paste link or text]. Please extract every source cited in the article and list them in [citation style] format.',
        note: 'Check every generated citation before using it.',
      },
      {
        title: 'Producing review documents from notes',
        prompt:
          'Here are my notes on five sources I have read: [paste notes]. Can you organize these into a simple table with columns for Author, Main Argument, and Relevance to My Topic?',
      },
    ],
  },
];

export const citationStyles: CitationStyleGuide[] = [
  {
    id: 'apa',
    label: 'APA',
    title: 'APA (7th Edition)',
    summary:
      'APA distinguishes between citations for specific recoverable chats and general attribution when a chat history is not available or should not be shared.',
    blocks: [
      {
        title: 'In-text citations',
        items: [
          'Specific chat or query: (AI Company name, Year, month day).',
          'General attribution: (AI Company name, Year).',
          'Place the parenthetical at the end of the sentence before the period.',
          'Narrative citations are permitted. Retain the parenthetical, but do not repeat information already provided in the sentence.',
        ],
        examples: [
          {
            text:
              'Marie Curie\'s discoveries quickly led to lifesaving medical advances, such as the deployment of mobile X-ray units to the battlefields of World War I (OpenAI, 2026, January 21).',
          },
          {
            text:
              'According to OpenAI, Michael Faraday\'s early work as an apprentice bookbinder stoked an interest that culminated in discoveries in electromagnetism and electrochemistry (2025).',
          },
        ],
      },
      {
        title: 'Reference list entry',
        items: [
          'List AI-tool references alphabetically with other references.',
          'Specific chat: AI Company name. (Year, month day). Title of chat [Description of output]. Tool Name/Model. Chat/query URL.',
          'General attribution: AI Company Name. (Year). Tool Name/Model [Description]. Tool URL.',
        ],
        examples: [
          {
            label: 'Specific chat',
            text:
              'OpenAI. (2026, January 21). Marie Curie Biography [Generative AI chat]. ChatGPT. https://chatgpt.com/share/69713b98-e2b4-8007-9c23-1f266b7e1c11',
          },
          {
            label: 'General attribution',
            text: 'OpenAI. (2025). ChatGPT [Generative AI chat]. https://chat.openai.com/',
          },
        ],
      },
    ],
    guidance: [
      'Consult the APA Style Blog for current APA guidance.',
      'Relevant APA entries include the three-part "Citing generative AI in APA Style" series.',
    ],
  },
  {
    id: 'mla',
    label: 'MLA',
    title: 'MLA',
    summary:
      'MLA attributes AI output by identifying the prompt. The in-text prompt may be shortened, but the Works Cited entry should provide the full prompt unless a descriptive phrase is more appropriate.',
    blocks: [
      {
        title: 'In-text citations',
        items: [
          'Use the prompt in quotation marks: ("Text of prompt used to generate AI output").',
          'A shortened prompt is acceptable in the in-text citation if the Works Cited entry provides the full prompt.',
          'Place the parenthetical at the end of the sentence before the period.',
        ],
        examples: [
          {
            text: '("Provide a condensed history of the development of atomic theory")',
          },
          {
            text: '("Provide a condensed history")',
          },
        ],
      },
      {
        title: 'Works Cited entry',
        items: [
          '"Text of prompt in sentence case" prompt. Name of AI tool, model or version, AI Company Name, day Abbr. month year, URL.',
          'Use the general tool URL when a shareable chat URL is unavailable or inadvisable.',
          'Use a descriptive prompt phrase when the interaction was conversational or involved multiple prompts.',
        ],
        examples: [
          {
            text:
              '"Provide a condensed history of the development of atomic theory" prompt. ChatGPT, model GPT-5.2, OpenAI, 22 Jan. 2026, https://chatgpt.com/share/6973da10-cf44-8007-a9bd-cfedb3e5b8ba',
          },
          {
            text:
              '"Who was Leucippus?" prompt. Claude, model Sonnet 4.5, Anthropic, 22 Jan. 2026, https://claude.ai',
          },
          {
            label: 'Descriptive phrase',
            text:
              'Model information inquiry prompt. ChatGPT, model GPT-5.2, OpenAI, 22 Jan. 2026, https://chatgpt.com/share/6973e05b-6268-8007-9746-4cd9d58e7123',
          },
        ],
      },
    ],
    guidance: [
      'Consult the MLA Style Center for current MLA guidance.',
      'Relevant pages include "How do I cite generative AI in MLA style?" and "Beyond Citation: Describing AI Use in Your Work."',
    ],
  },
  {
    id: 'chicago',
    label: 'Chicago/Turabian',
    title: 'Chicago/Turabian',
    summary:
      'The Chicago Manual of Style permits notes and bibliography or author-date citation. It also recognizes simple acknowledgments for informal professional contexts.',
    blocks: [
      {
        title: 'Notes and bibliography',
        items: [
          'Add a numbered footnote or endnote after the sentence that relies on AI-generated information.',
          'Basic note: Text generated by AI Program Name, AI Company, month day, year, URL.',
          'If the prompt is not named in the text, include it in the note after "response to."',
        ],
        examples: [
          {
            text:
              '1. Text generated by Gemini, Google, February 6, 2026, https://gemini.google.com/app.',
          },
          {
            text:
              '1. Gemini, response to "What are the most-spoken languages in the world?," Google, February 6, 2026, https://gemini.google.com/app.',
          },
        ],
      },
      {
        title: 'Author-date',
        items: [
          'Use a standard parenthetical for any AI application or query information not provided in the sentence.',
          'General format: (AI Tool Name, Month day, year).',
          'Chicago recommends omitting a bibliography or reference entry unless a public URL lets readers access the cited output.',
        ],
        examples: [
          {
            text: '(Claude, September 28, 2025)',
          },
        ],
      },
      {
        title: 'Casual cases',
        items: [
          'For informal contexts, a direct acknowledgment can be more useful than a full formal citation.',
        ],
        examples: [
          {
            text:
              'According to Gemini, the most-spoken languages in the world are English, Mandarin, Hindi, Spanish, and Arabic, in that order.',
          },
          {
            text: 'This list of graphics card components and prices was generated by ChatGPT.',
          },
        ],
      },
    ],
    guidance: [
      'Consult The Chicago Manual of Style Online for current guidance.',
      'The Committee on Publication Ethics statement "Authorship and AI tools" is also relevant for disclosure and authorship questions.',
    ],
  },
  {
    id: 'ieee',
    label: 'IEEE',
    title: 'IEEE',
    summary:
      'IEEE uses numbered references rather than author-date or author-prompt parentheticals. Reference entries appear in first-citation order.',
    blocks: [
      {
        title: 'In-text citations',
        items: [
          'Use bracketed numbers that correspond to entries in the reference list.',
          'Number citations in the order they first appear.',
          'Reuse the same number when citing the same source again.',
          'Place the bracketed number before the period or immediately after the supported phrase.',
        ],
        examples: [
          {
            text:
              'Marie Curie\'s discoveries quickly led to lifesaving medical advances, such as the deployment of mobile X-ray units to the battlefields of World War I [1].',
          },
          {
            text:
              'Today, physicist Max Planck lends his name to several extremely small units of measurement, such as Planck length and Planck time [2].',
          },
        ],
      },
      {
        title: 'Reference list entry',
        items: [
          'List references numerically at the end of the document in first-citation order.',
          'General format: [Reference number] AI Company Name, "Response to \'Text of prompt,\'" Tool Name/Model, Month day, year. [Online]. Available: URL.',
          'When a shareable chat URL is unavailable, substitute the general tool URL.',
        ],
        examples: [
          {
            text:
              '[1] OpenAI, "Response to \'Describe Marie Curie\'s contributions to science,\'" ChatGPT (GPT-5.2), Jan. 21, 2026. [Online]. Available: https://chatgpt.com/share/69713b98-e2b4-8007-9c23-1f266b7e1c11',
          },
          {
            text:
              '[2] Anthropic, "Response to \'What units of measurement are named after Max Planck?\'" Claude (Sonnet 4.5), Jan. 22, 2026. [Online]. Available: https://claude.ai',
          },
        ],
      },
    ],
    guidance: ['Consult the IEEE Reference Guide for current IEEE citation practice.'],
  },
];

export const citationFaqs = [
  {
    question: 'When do I need to cite AI?',
    answer:
      'Cite AI when it generates, researches, drafts, or meaningfully shapes content that appears in your work.',
    checklist: [
      'Direct quotation of AI output.',
      'Paraphrase or summary of AI output.',
      'AI-assisted drafting or substantial revision, even if you edited the output.',
    ],
  },
  {
    question: 'When should I not cite AI?',
    answer:
      'Citation is usually unnecessary when AI did not materially affect the content of the work.',
    checklist: [
      'Checking grammar, spelling, or punctuation in text you wrote.',
      'Performing clerical tasks such as bibliography formatting or unit conversion.',
      'Brainstorming ideas that you developed through your own research and writing.',
    ],
  },
  {
    question: 'What if I cannot find a citation element?',
    answer:
      'Most styles allow unavailable elements to be omitted or replaced. For example, use a general tool URL when a shareable chat URL is unavailable.',
    checklist: [
      'Use official style guidance when a required element is missing.',
      'For MLA, consider a descriptive prompt phrase for multi-prompt interactions.',
      'Do not invent source details to complete a citation.',
    ],
  },
  {
    question: 'What else matters in academic work?',
    answer: 'Institutional policy and independent verification take precedence over generic citation examples.',
    checklist: [
      'Check institutional, course, journal, or publisher AI-use policies first.',
      'Do not list AI as an author; authorship requires human accountability.',
      'Verify AI-generated factual claims and citations against reliable sources.',
    ],
  },
  {
    question: 'What else matters in professional work?',
    answer:
      'Professional contexts may favor clear disclosure over formal style-guide citation, but accuracy and confidentiality still matter.',
    checklist: [
      'Use a plain acknowledgment when a formal citation is unnecessary.',
      'Do not enter sensitive, proprietary, client, or patient information into an AI tool without authorization.',
      'Responsibility for accuracy remains with the professional of record.',
    ],
  },
];
