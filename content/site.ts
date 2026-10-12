/**
 * Site settings that are not part of the written copy.
 * The words on the page live in content/copy.md.
 */
export const site = {
  name: "Somin Ivy Yoon",
  title: "Somin Ivy Yoon | Mechanical + Embedded Systems",
  description:
    "Somin Ivy Yoon is a mechanical engineering junior with an electrical engineering minor at the University of Illinois Urbana-Champaign.",

  /** Contact details, taken from the resume. */
  email: "ivyyoon2@illinois.edu",
  linkedin: "https://www.linkedin.com/in/ivyyoon/",

  /** Put the resume PDF at public/resume.pdf. */
  resumeHref: "/resume.pdf",

  /**
   * While the site is still being filled in, empty image slots show a labelled
   * placeholder with the filename to add, and process stages that are only a
   * "[to add: ...]" note are shown in orange. Set to false before publishing to
   * hide every empty slot and every unwritten stage.
   */
  showEmptySlots: false,

  /**
   * The engineering process used to tell each project. Stage labels come from
   * copy.md; these settings add the question each stage answers.
   */
  process: {
    /** Shown as a legend on each project page. */
    frame: ["Problem", "Thinking", "Build", "Test", "Result"],
    /** Stages that carry the reasoning. They are highlighted on the page. */
    reasoning: ["thinking", "trade-off", "takeaway"],
    /** The question each stage answers, keyed by lower-case label. */
    questions: {
      problem: "What needed to change, and why did it matter?",
      thinking: "What did I work out before committing to a design?",
      design: "What did I decide before building?",
      build: "What did I make, and what was my part?",
      "trade-off": "What did that choice cost?",
      signal: "Will the measurement survive the electronics?",
      test: "What did checking it change?",
      fix: "What did I change on the line?",
      also: "What else am I doing on the team?",
      result: "Did it meet the goal?",
      status: "Where does it stand?",
      next: "What comes after this?",
      automation: "How does it run without an operator?",
      takeaway: "What did I take from it?",
    } as Record<string, string>,
  },
} as const;
