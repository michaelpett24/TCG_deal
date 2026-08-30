// Result tiers and the personalized closing roast.

export interface Tier {
  min: number;
  max: number;
  rank: string;
  title: string;
  /** Overrides `title` when the respondent gave a gender. */
  titleByGender?: Record<string, string>;
  stamp: string;
  percentile: string;
  verdict: string;
  body: string[];
  findings: string[];
  prescription: string;
}

export const TIERS: Tier[] = [
  {
    min: 0,
    max: 10,
    rank: "CLASS VI",
    title: "Deep State Operative",
    stamp: "FLAGGED",
    percentile: "Bottom 4% of patriots",
    verdict: "You did not pass. You did not come close. You are, in the technical sense, the problem.",
    body: [
      "Your answers have been reviewed and the review was short. You believe things like “courts” and “results” and “that seems fine.” You have, at some point in your life, said the words “I'll look it up.” This is the language of a man with no side and therefore no friends.",
      "Somewhere right now, in a garage with good lighting and a flag on the wall, a man in an eagle t-shirt is being told about you. He is not angry. He is disappointed, which is worse, and he is already halfway through typing.",
      "The good news is you sleep fine. The bad news is that nobody will ever make a hat about you.",
    ],
    findings: [
      "Blood pressure: normal. Suspiciously normal.",
      "Has never once yelled at a television that could not hear him.",
      "Owns zero laminated documents.",
      "Family group chat contains no unresolved arcs.",
    ],
    prescription: "Continue as you are. It's working, which is the single most infuriating thing about you.",
  },
  {
    min: 11,
    max: 20,
    rank: "CLASS V",
    title: "The RINO",
    stamp: "UNDER REVIEW",
    percentile: "23rd percentile",
    verdict: "Republican in name, in donation history, and in absolutely nothing else.",
    body: [
      "You're the one at the party who says “well — I don't love the TWEETS.” You want the tax policy without the man, which is like wanting the ocean without the water. You have spent nine years clearing your throat.",
      "You think of yourself as the reasonable one. Everyone in the room has independently decided you are the one who will fold first, and they are correct, and they have already stopped inviting you.",
      "You will be purged in the primary. Not by the left. By a 31-year-old named Braxton who has a podcast and no chin.",
    ],
    findings: [
      "Uses the phrase “both sides” as a personality.",
      "Owns one (1) hat, worn ironically, which fools nobody.",
      "Has said “I just think we should lower the temperature” to a man holding a flag as a weapon.",
      "Loyalty: conditional. Fatal.",
    ],
    prescription: "Pick a lane. You have until the next primary, and the primary is always next.",
  },
  {
    min: 21,
    max: 30,
    rank: "CLASS IV",
    title: "Weekend Patriot",
    stamp: "PROVISIONAL",
    percentile: "48th percentile — dead average",
    verdict: "You love this country the way you love your gym membership: sincerely, and from a distance.",
    body: [
      "You've got the flag on the porch and the opinions at the barbecue, and then Monday comes and you go to work and think about nothing at all. This is called being a normal person, and around here it is a scandal.",
      "You will share a meme. You will not attend a thing. When the bus leaves for the rally you will be in the driveway, waving, with a genuinely great excuse.",
      "Half-measures. This country was not founded by people who had to check with their spouse about Saturday.",
    ],
    findings: [
      "Flag: present, weather-damaged, not replaced.",
      "Rally attendance: zero, but has watched clips at 1.5x speed.",
      "Radicalization plateaued in approximately 2021.",
      "Still capable of enjoying a movie without checking the actor's donations.",
    ],
    prescription: "Nothing. You're fine. That's the diagnosis and it should embarrass you slightly.",
  },
  {
    min: 31,
    max: 40,
    rank: "CLASS III",
    title: "Verified Loyalist",
    stamp: "CERTIFIED",
    percentile: "77th percentile",
    verdict: "Congratulations. You've made it. Your reward is the work.",
    body: [
      "You are the backbone: reliable, vocal, and increasingly difficult to seat at a wedding. You do the reading, you fight the fights, you have personally lost two friendships and one contractor over this.",
      "Understand what you've earned. A lifetime of defending a man who cannot remember your name and who, if pressed, would describe you as “a great guy — some people are saying — tremendous.” That's it. That's the whole pension.",
      "You'd run through a wall for him. He'd run through you to get to a camera. This is a functioning relationship and both parties are getting exactly what they signed up for, though only one of you knows it.",
    ],
    findings: [
      "Hat count: 3–6, uniform in color, non-ironic.",
      "Has ended a relationship over a shared article.",
      "Refers to a billionaire from Queens as “a regular guy.”",
      "Whiteboard: acquired. Purpose: Thanksgiving.",
    ],
    prescription: "Keep going. There's no other option available to you now and you know it.",
  },
  {
    min: 41,
    max: 50,
    rank: "CLASS II",
    title: "His Emotional Support Spouse",
    titleByGender: {
      man: "His Emotional Support Husband",
      woman: "His Number One Girl",
    },
    stamp: "DEVOTED",
    percentile: "94th percentile",
    verdict: "You love this man in a way you have never once said out loud to your actual spouse.",
    body: [
      "Let's be adults about it. Nobody gets choked up over a tax bracket. Nobody's voice goes soft describing a tariff. What you're feeling has a name and the name is not “policy alignment.” It's the noise a golden retriever makes when a truck pulls into the driveway.",
      "And before anyone starts: this isn't a sexuality thing. Gay men have standards. This is something rarer and much sadder — a grown adult who has outsourced an entire emotional life to a stranger who has never held a door for anyone.",
      "You would take a bullet for him. He would not take your call. You have ruined two family group chats defending a man who would step over you in a parking lot to reach a better camera angle, and honestly? That is the most romantic thing anyone has done this decade.",
    ],
    findings: [
      "Physiological response to his voice: measurable. Documented. Denied.",
      "Spouse has noticed. Spouse has decided not to raise it.",
      "Has described a press conference as “beautiful.”",
      "Ranks him above at least one biological child.",
    ],
    prescription: "Tell your spouse you love them. Use the voice you use for him. They will faint.",
  },
  {
    min: 51,
    max: 60,
    rank: "CLASS I",
    title: "Human Red Hat",
    stamp: "FULLY MERGED",
    percentile: "Top 0.3% — we had to extend the chart",
    verdict: "You didn't take a quiz. You testified.",
    body: [
      "There is no daylight between you and him. Not politically — physically. At some point in the last nine years your personality went out for cigarettes and a real estate developer from Queens moved into the house, put his feet on the furniture, and started answering your phone.",
      "You hold opinions about a New York man's trade policy with the trembling conviction of a father describing his daughter's wedding. You have never met him. You never will. If you did, you would have ninety seconds and you would spend them apologizing.",
      "You are not a supporter — supporters can leave. You're a structure. The bumper sticker isn't a bumper sticker anymore, it's load-bearing, and everybody in your life is very quietly working out what happens to the building when it comes off.",
    ],
    findings: [
      "Independent thought: no longer detected. No distress noted.",
      "Owns merchandise for a human being in quantities normally reserved for a country.",
      "Has used the words “we” and “us” about a man who has a private plane and your address on a mailing list.",
      "Bloodstream: 40% grievance, 40% seed oils, 20% flag.",
    ],
    prescription: "None available. In cases this advanced we simply monitor, and we take notes, and we say nothing at the table.",
  },
];

export function tierFor(score: number): Tier {
  return TIERS.find(t => score >= t.min && score <= t.max) ?? TIERS[0];
}

export const GENDER_ROAST: Record<string, string> = {
  man:
    "As a man, you have won every argument you have ever had — alone, in the truck, twenty minutes after it ended, out loud, at a volume that concerned a woman in the next parking space.",
  woman:
    "As a woman, you maintain a Facebook presence your adult children have muted but cannot bring themselves to block. Your profile picture is a flag. Your cover photo is a different flag. Your comments are where nuance goes to be shot.",
  creator:
    "You answered a demographic question about your gender with “that's between me and God,” on a website, for free, in the year 2026. He would be proud of you. He would also never learn your name.",
  decline:
    "You declined to state your gender on a patriotism quiz. Sir or ma'am, and I want you to really sit with this: that is exactly what THEY do.",
};

export const AGE_ROAST: Record<string, string> = {
  "18-29":
    "At your age this is still a phase, which is the good news. The bad news is you're posting through it, and the screenshots are already saved. You've got maybe six years before a woman named Ashley makes you delete all of it in one sitting.",
  "30-44":
    "You radicalized somewhere between a mortgage application and a second child. Statistically this occurred in a driveway, in a parked car, engine off, forty-five minutes into a podcast, while someone inside the house kept dinner warm.",
  "45-59":
    "You are the sole reason Facebook still exists. You are also the sole reason your sister-in-law now only uses Instagram, where she posts photos of a lake and does not tag you.",
  "60-74":
    "You are the target demographic, and I mean that the way a hunter means it. Every ad you have seen in nine years was built by a 26-year-old in Northern Virginia who has a spreadsheet with your name on row 41,206.",
  "75+":
    "Genuine respect — you have earned the right to believe whatever you want. But your grandchildren have a group chat, it is titled “the situation,” and you are the situation.",
};
