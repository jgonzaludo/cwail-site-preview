import type { Question } from '../lib/quizScoring';

const finalQuiz: Question[] = [
  {
    id: "q1_tokenization",
    type: "mcq-single",
    prompt: "Which of the following best describes the process of tokenization?",
    choices: [
      "The process by which an LLM gains a rich, human-like understanding of language.",
      "The process by which an LLM divides training text into discrete linguistic elements and assigns each a vector value.",
      "The process by which an LLM makes educated guesses about which linguistic tokens appear in sequence.",
      "The process by which an LLM continues to learn following initial ingestion of training data."
    ],
    correct: { correctIndex: 1 }
  },
  {
    id: "q2_known_flaw",
    type: "mcq-single",
    prompt: "Which of the following is a known flaw of LLMs?",
    choices: [
      "An inability to produce human-like writing",
      "Prohibitively long processing times",
      "Difficulty in processing informal language or language with small grammatical errors",
      "A tendency to occasionally \"hallucinate\" nonexistent evidence for claims"
    ],
    correct: { correctIndex: 3 }
  },
  {
    id: "q3_academic_observation",
    type: "mcq-single",
    prompt: "Which of the following observations about LLM usage in academic contexts is most accurate?",
    choices: [
      "Any usage of an LLM in an academic context is unacceptable and unethical.",
      "University policies regarding AI usage tend to be standardized across classrooms and institutions.",
      "Uncritical LLM usage can expose student writers to accusations of plagiarism via hallucinations and inaccurate attributions.",
      "Frequent reliance on AI tools like LLMs in an academic context is conducive to student learning."
    ],
    correct: { correctIndex: 2 }
  },
  {
    id: "q4_inaccurate_observation",
    type: "mcq-single",
    prompt: "Which of the following observations about how LLMs work is inaccurate?",
    choices: [
      "LLMs can assess the truthfulness of their own output, allowing them to catch mistakes.",
      "LLMs generate realistic responses by making statistical inferences about which sequences of linguistic tokens are most likely to satisfy the user.",
      "LLMs' responses tend to be constrained by the boundaries of their training data; they cannot independently \"learn\" about knowledge domains outside this data.",
      "LLMs can rapidly produce realistic, human-like responses to queries about a huge range of topics."
    ],
    correct: { correctIndex: 0 }
  },
  {
    id: "q5_check_all_evidence",
    type: "check-all",
    prompt: "Check all of the following statements about AI and/or the professional applications of writing skills that are supported by evidence.",
    choices: [
      "Students who rely heavily on LLMs for help on coursework do just as well as students who do not on tests of course material.",
      "Most university-level students know about LLMs, and—at least in certain fields—have already integrated them into their routine study habits.",
      "The precise nature of a student's LLM usage makes no difference in terms of neural connectivity; all usages engage the brain equally.",
      "Strategic uses of LLM can avoid many of the risks to cognitive development/learning reported in early research.",
      "Researchers have made the \"preliminary observation\" that LLM users' responses to essay prompts tend to encompass a narrower range of ideas than non-LLM users.",
      "Some students report misgivings about their potential dependence on AI tools for schoolwork.",
      "Due to the rise of LLMs, most modern employers do not report writing and communication skills as particularly valuable qualities in job candidates."
    ],
    correct: { correctSet: [1, 3, 4, 5] }
  },
  {
    id: "q6_order_writing_process",
    type: "ordering",
    prompt: "Arrange the stages of the writing process (as defined in this module) in order.",
    choices: [
      "Proofing",
      "Invention",
      "Synthesis",
      "Editing/Publishing",
      "Source Finding",
      "Drafting",
      "Second Drafting",
      "Concept Mapping",
      "Revision"
    ],
    correct: { correctOrder: [1, 5, 8, 3] }
  },
  {
    id: "q7_fill_blank_rule",
    type: "mcq-single",
    prompt: "Fill in the blank to complete this module's 'rule of thumb' for uses of AI that preserve the writing process.\n\nUses of AI that preserve the writing process tend to be those that __________.",
    choices: [
      "Replace you",
      "Replace your computer",
      "Replace other people or tools",
      "Replace your search engine"
    ],
    correct: { correctIndex: 2 }
  },
  {
    id: "q8_ethical_use",
    type: "mcq-single",
    prompt: "Which of the following would be an acceptable, ethical use of an LLM in most academic contexts?",
    choices: [
      "Using an LLM to suggest potential topics for a paper.",
      "Using an LLM to write a paper for you.",
      "Using an LLM to perform style revisions on an old paper such that it appears new.",
      "Using an LLM to quickly add sources to a key paragraph so that you don't have to read them yourself."
    ],
    correct: { correctIndex: 0 }
  },
  {
    id: "q9_unethical_use",
    type: "mcq-single",
    prompt: "Which of the following would be an unacceptable, unethical use of an LLM in most academic contexts?",
    choices: [
      "Using an LLM to gather sources",
      "Using an LLM to help format citations correctly",
      "Using an LLM to summarize sources for your review",
      "Using an LLM to generate answers to an instructor's reading response prompts."
    ],
    correct: { correctIndex: 3 }
  },
  {
    id: "q10_productivity_checks",
    type: "check-all",
    prompt: "Which of the following uses of an LLM could enhance your productivity without interfering with learning or exposing you to ethical risks? Check all that apply.",
    choices: [
      "Using an LLM to automatically generate minutes for a meeting.",
      "Using an LLM to generate feedback on your writing for your review.",
      "Using an LLM to automate small, tedious changes to a series of documents.",
      "Using an LLM to rapidly generate a list of category-specific examples."
    ],
    correct: { correctSet: [0, 1, 2, 3] }
  }
];

export default finalQuiz;
