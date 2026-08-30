// Content for the Patriot Purity Test — a satirical quiz.
// Questions read straight; the joke is the escalation ladder and the results.

export interface Choice {
  text: string;
  points: number;
}

export interface Question {
  id: string;
  prompt: string;
  choices: Choice[];
}

export interface Demo {
  value: string;
  label: string;
  note: string;
}

export const GENDERS: Demo[] = [
  { value: "man",     label: "Man",                          note: "the default setting" },
  { value: "woman",   label: "Woman",                        note: "the engine room" },
  { value: "creator", label: "That's between me and God",    note: "interesting" },
  { value: "decline", label: "I decline to answer",          note: "noted, and logged" },
];

export const AGES: Demo[] = [
  { value: "18-29", label: "18 – 29", note: "still forming" },
  { value: "30-44", label: "30 – 44", note: "mortgage-radicalized" },
  { value: "45-59", label: "45 – 59", note: "peak Facebook" },
  { value: "60-74", label: "60 – 74", note: "prime demographic" },
  { value: "75+",   label: "75 and up", note: "thank you for your service" },
];

export const QUESTIONS: Question[] = [
  {
    id: "election",
    prompt: "The 2020 election was:",
    choices: [
      { text: "Free, fair, and certified by sixty-odd courts.", points: 0 },
      { text: "Probably fine. I had some questions.", points: 1 },
      { text: "Rigged. Everybody knows it.", points: 3 },
      { text: "Rigged, and I keep a laminated binder about it in my truck.", points: 4 },
    ],
  },
  {
    id: "factcheck",
    prompt: "A friend sends you a fact-check disputing something the President said. Your first thought:",
    choices: [
      { text: "Huh. Good to know.", points: 0 },
      { text: "I should look into that myself.", points: 1 },
      { text: "And who exactly funds the fact-checkers?", points: 3 },
      { text: "That person is no longer my friend. That person is now a situation.", points: 4 },
    ],
  },
  {
    id: "christmas",
    prompt: "Your relationship with the phrase “Merry Christmas”:",
    choices: [
      { text: "It's a pleasant thing to say in December.", points: 0 },
      { text: "I say it. Other people can say whatever they want.", points: 1 },
      { text: "I say it LOUDLY, and then I watch their face.", points: 3 },
      { text: "I have said it to a mailman. In July. As a warning.", points: 4 },
    ],
  },
  {
    id: "sunday",
    prompt: "Describe your ideal Sunday:",
    choices: [
      { text: "Brunch. Maybe the farmers market.", points: 0 },
      { text: "Church, then family.", points: 1 },
      { text: "Church, then six hours of a man in a suit yelling on a livestream.", points: 3 },
      { text: "I have converted the garage into a studio. I am the man yelling.", points: 4 },
    ],
  },
  {
    id: "fakenews",
    prompt: "How often do you use the phrase “fake news”?",
    choices: [
      { text: "Never. It's not really in my vocabulary.", points: 0 },
      { text: "Rarely. Mostly about tabloids.", points: 1 },
      { text: "Daily. Out loud. At a television that cannot hear me.", points: 3 },
      { text: "I have said it to a doctor. About my own bloodwork.", points: 4 },
    ],
  },
  {
    id: "vehicle",
    prompt: "Which vehicle is closest to yours?",
    choices: [
      { text: "A hybrid. Gas is expensive and I am not made of money.", points: 0 },
      { text: "A sedan. It gets me there.", points: 1 },
      { text: "A truck. I have never once used the bed.", points: 3 },
      { text: "A truck flying six flags, two of which are for a man rather than a country.", points: 4 },
    ],
  },
  {
    id: "jansix",
    prompt: "The people who entered the Capitol on January 6th were:",
    choices: [
      { text: "Rioters.", points: 0 },
      { text: "A crowd that got badly out of hand.", points: 1 },
      { text: "Patriots who maybe went a little far.", points: 3 },
      { text: "Tourists. Ordinary tourists. Extremely enthusiastic, load-bearing tourists.", points: 4 },
    ],
  },
  {
    id: "hats",
    prompt: "How many hats do you own with words on them?",
    choices: [
      { text: "Zero. I own hats that are just a hat.", points: 0 },
      { text: "One, from a fishing trip in 2011.", points: 1 },
      { text: "Between three and six. All the same color.", points: 3 },
      { text: "There is a dedicated shelf. My family has stopped commenting on the shelf.", points: 4 },
    ],
  },
  {
    id: "thanksgiving",
    prompt: "Someone brings up politics at Thanksgiving. You:",
    choices: [
      { text: "Change the subject. It's a holiday.", points: 0 },
      { text: "Say my piece, then eat.", points: 1 },
      { text: "Stand up. There is a whiteboard now. Where did the whiteboard come from.", points: 3 },
      { text: "I brought it up. I have brought it up for nine consecutive years.", points: 4 },
    ],
  },
  {
    id: "feeling",
    prompt: "What do you feel when you watch the President speak?",
    choices: [
      { text: "Nothing much. It's a politician talking.", points: 0 },
      { text: "Broad agreement.", points: 1 },
      { text: "A warmth I do not get from my own family.", points: 3 },
      { text: "I get choked up. My wife has noticed. We don't discuss it.", points: 4 },
    ],
  },
  {
    id: "ranking",
    prompt: "Where does the President rank among the men in your life?",
    choices: [
      { text: "Below my dentist.", points: 0 },
      { text: "He's a politician I voted for. That's the whole relationship.", points: 1 },
      { text: "Somewhere between my father and my pastor.", points: 3 },
      { text: "God, then him, then a considerable gap, then my children.", points: 4 },
    ],
  },
  {
    id: "coming",
    prompt: "Finish the sentence: “They're not really after me…”",
    choices: [
      { text: "That isn't a sentence I've ever needed to finish.", points: 0 },
      { text: "…I don't think anybody is after anybody.", points: 1 },
      { text: "…they're after him.", points: 3 },
      { text: "…they're after HIM, and I am simply standing in the way.", points: 4 },
    ],
  },
  {
    id: "windmills",
    prompt: "Your position on wind turbines:",
    choices: [
      { text: "Clean energy. Seems like a good idea.", points: 0 },
      { text: "Fine in theory, expensive in practice.", points: 1 },
      { text: "They kill the birds. Nobody talks about the birds.", points: 3 },
      { text: "They cause cancer, and I heard that from a man who would know.", points: 4 },
    ],
  },
  {
    id: "confiscation",
    prompt: "The government is currently trying to take away your:",
    choices: [
      { text: "Nothing, as far as I can tell.", points: 0 },
      { text: "Money, through taxes, the way governments always have.", points: 1 },
      { text: "Gas stove.", points: 3 },
      { text: "Gas stove, straws, light bulbs, shower pressure, and — God help us — my bacon.", points: 4 },
    ],
  },
  {
    id: "mind",
    prompt: "When did you last change your mind about something political?",
    choices: [
      { text: "Within the past year, and it was healthy for me.", points: 0 },
      { text: "It's been a while, honestly.", points: 1 },
      { text: "I don't change. I refine.", points: 3 },
      { text: "Changing your mind is exactly what they're hoping you'll do.", points: 4 },
    ],
  },
];

export const MAX_SCORE = QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.choices.map(c => c.points)),
  0,
);
