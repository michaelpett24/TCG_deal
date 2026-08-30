// Result tiers and the personalized closing roast.
//
// House style: every result is written as a COMMENDATION, never as an attack.
// The loyal reader should finish feeling decorated enough to post it; the
// achievements themselves are confessions. The joke isn't in the insult, it's
// in what they're proud of.

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
  findingsLabel: string;
  findings: string[];
  prescription: string;
  /** The nudge above the share button — the part that closes the trap. */
  shareNudge: string;
}

export const TIERS: Tier[] = [
  {
    min: 0,
    max: 10,
    rank: "CLASS VI",
    title: "Deep State Operative",
    stamp: "FLAGGED",
    percentile: "Bottom 4% — your file has been forwarded",
    verdict: "You will not be told to whom.",
    body: [
      "You answered fifteen questions like somebody with nothing to prove, which is exactly what they train you to do. You used the word “courts.” You used the word “evidence.” At one point you offered “I'd have to look that up” — a phrase no patriot has spoken aloud since 2015.",
      "You have never yelled at a television that could not hear you. You have never sat in a parked car for forty minutes because a podcast wasn't finished. Your blood pressure is unremarkable, your friendships are intact, and you sleep roughly eight hours a night. Frankly, it's the sleeping that gives you away.",
      "Somewhere a man in an eagle t-shirt is being told about you. He isn't angry. He's disappointed, which is worse, and he has already begun typing, and it is going to arrive as one paragraph with no line breaks and three different fonts.",
    ],
    findingsLabel: "Noted In Your File",
    findings: [
      "Owns zero laminated documents.",
      "Has changed his mind in public, on purpose, like some kind of European.",
      "Has never been described by anyone, at any point, as “a warrior.”",
      "Capable of hearing a fact and simply keeping it.",
    ],
    prescription:
      "No action required. You will be fine, which is the single most infuriating thing about you.",
    shareNudge: "Screenshot this before they take it down.",
  },
  {
    min: 11,
    max: 20,
    rank: "CLASS V",
    title: "The RINO",
    stamp: "UNDER REVIEW",
    percentile: "23rd percentile",
    verdict:
      "Republican in name, in donation history, and in absolutely nothing else.",
    body: [
      "You're the one at the party who says “well — I don't love the TWEETS.” You want the tax cuts without the man, which is ordering the steak and asking them to hold the cow. Nine years now you've been clearing your throat.",
      "You believe you are the reasonable one. Every other person in that room has independently concluded you'll be the first to fold, and they are correct, and that is why the group text you're on is not the real one.",
      "You will be primaried. Not by the left. By a 31-year-old named Braxton who has a podcast, a pending charge, and no chin.",
    ],
    findingsLabel: "Areas Of Concern",
    findings: [
      "Deploys “both sides” as an entire personality.",
      "Owns one hat. Wears it ironically. Fools nobody, including the hat.",
      "Has said “let's lower the temperature” to a man holding a flag by the wrong end.",
      "Loyalty: conditional. Fatal.",
    ],
    prescription: "Pick a lane. The primary is always next.",
    shareNudge: "Post it. Show them you're still one of the good ones.",
  },
  {
    min: 21,
    max: 30,
    rank: "CLASS IV",
    title: "Weekend Patriot",
    stamp: "PROVISIONAL",
    percentile: "48th percentile — dead average",
    verdict:
      "You love this country the way you love your gym membership: sincerely, and from a distance.",
    body: [
      "Flag on the porch, opinions at the barbecue, and then Monday arrives and you go to work and think about none of it. This is called being a normal person and around here it is a scandal.",
      "You will share a post. You will not attend a thing. When the bus leaves for the rally you'll be in the driveway waving, holding a genuinely excellent excuse, and everyone will believe it, because you have never once given them a reason not to.",
      "Half-measures. This country was not founded by people who had to check with their spouse about Saturday.",
    ],
    findingsLabel: "Assessment",
    findings: [
      "Flag: present, sun-bleached, not replaced.",
      "Rally attendance: zero. Has watched the clips at 1.5x.",
      "Radicalization plateaued in 2021 and has not been revisited since.",
      "Can still enjoy a film without first checking the cast's donation history.",
    ],
    prescription:
      "Nothing. You're fine. That should embarrass you slightly, and it will, around 2am.",
    shareNudge: "Share it and let them think you scored higher.",
  },
  {
    min: 31,
    max: 40,
    rank: "CLASS III",
    title: "Verified Loyalist",
    stamp: "CERTIFIED",
    percentile: "77th percentile",
    verdict:
      "Certified. You are the backbone of this movement and increasingly difficult to seat at a wedding.",
    body: [
      "You do the reading. You fight the fights. You have personally surrendered two friendships and one contractor for a man who has never had occasion to learn your name and never will.",
      "Understand precisely what you've earned. A lifetime of defending someone who, asked about you directly, would say “great guy, tremendous, some people are saying.” That's the pension. That's the entire package. There is no dental.",
      "You would run through a wall for him. He would run through you to reach a camera. Both parties are getting exactly what they signed up for and only one of you has read the terms.",
    ],
    findingsLabel: "Commendations Earned",
    findings: [
      "Hat count: three to six. Uniform in color. Non-ironic.",
      "Has ended a relationship over a link.",
      "Refers to a Manhattan billionaire as “a regular guy.”",
      "Acquired a whiteboard. For Thanksgiving. In advance.",
    ],
    prescription:
      "Continue. There is no other option available to you now and you have known that for some time.",
    shareNudge: "Post this. The ones who need to see it will see it.",
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
    verdict:
      "Devotion of a kind we are rarely asked to certify. You love this man more than you have ever said out loud to your actual spouse.",
    body: [
      "Let's be adults about it. Nobody gets choked up over a tax bracket. Nobody's voice goes soft describing a tariff. What you are feeling has a name and the name is not “policy alignment.” It is the sound a golden retriever makes when a truck pulls into the driveway.",
      "And before anybody starts — this isn't a sexuality thing. Gay men have standards. This is rarer and considerably sadder: a grown adult who has handed an entire emotional life to a stranger who has never held a door open for anyone in his life.",
      "You would take a bullet for him. He would not take your call. You have burned two family group chats defending a man who would step over you in a parking lot to reach better lighting, and honestly, that is the most romantic thing anybody has done this decade.",
    ],
    findingsLabel: "Commendations Earned",
    findings: [
      "Physiological response to his voice: measurable. Documented. Denied.",
      "Spouse has noticed. Spouse has elected not to raise it.",
      "Has described a press conference as “beautiful.”",
      "Ranks him above at least one biological child.",
    ],
    prescription:
      "Tell your spouse you love them. Use the voice you use for him. They will faint.",
    shareNudge: "Send this to him. He reads everything, they say.",
  },
  {
    min: 51,
    max: 60,
    rank: "CLASS I",
    title: "Human Red Hat",
    stamp: "TOTAL ALIGNMENT",
    percentile: "Top 0.3% — we had to extend the chart",
    verdict:
      "Total alignment. In nine years you have not disagreed with this man one time, on any subject, including the subjects he has changed his position on twice.",
    body: [
      "When he said it was the largest crowd in history, you saw the largest crowd in history. When he said afterward that the crowd was small and the media made it look large, you saw that as well, the same afternoon, without blinking. This is not a contradiction. This is faith, and we are obliged to certify it.",
      "There is no daylight between the two of you — not politically. Physically. At some point your personality went out for cigarettes and a real estate developer from Queens moved into the house, put his feet on the furniture, and began answering your phone.",
      "If you ever met him you would have ninety seconds and you would spend them apologizing. You are not a supporter — supporters are able to leave. You are load-bearing, and everybody in your life is very quietly working out what happens to the building when you come off.",
    ],
    findingsLabel: "Commendations Earned",
    findings: [
      "Original political thought: last recorded 2015. No distress noted.",
      "Owns merchandise for one human being in volumes normally reserved for a country.",
      "Says “we” about a man with a private plane and your address on a mailing list.",
      "Would take his word over a doctor's. Has.",
    ],
    prescription:
      "None available. At this stage we simply monitor, and take notes, and say nothing at the table.",
    shareNudge: "Post this everywhere. Make them look at it.",
  },
];

export function tierFor(score: number): Tier {
  return TIERS.find(t => score >= t.min && score <= t.max) ?? TIERS[0];
}

export const GENDER_ROAST: Record<string, string> = {
  man:
    "As a man, you have won every argument you have ever had — alone, in the truck, twenty minutes after it ended, out loud, at a volume that concerned a woman two spaces over.",
  woman:
    "As a woman, you maintain a Facebook presence your adult children have muted but cannot bring themselves to block. Profile picture: a flag. Cover photo: a different flag. Your comment section is where nuance goes to be shot.",
  creator:
    "You answered a demographic question with “that's between me and God” — on a website, for free, in the year 2026. He would be proud of you. He would also never learn your name.",
  decline:
    "You declined to state your gender on a patriotism quiz. And I need you to really sit with this one: that is precisely what THEY do.",
};

export const AGE_ROAST: Record<string, string> = {
  "18-29":
    "At your age this is still a phase, which is the good news. The bad news is that you are posting through it and the screenshots are already saved. You have perhaps six years before a woman named Ashley makes you delete every one of them in a single sitting.",
  "30-44":
    "You radicalized somewhere between a mortgage application and a second child. Statistically this occurred in a driveway, engine off, forty-five minutes into a podcast, while somebody inside the house kept dinner warm.",
  "45-59":
    "You are the sole reason Facebook still exists. You are also the sole reason your sister-in-law only uses Instagram now, where she posts photographs of a lake and does not tag you.",
  "60-74":
    "You are the target demographic, and I mean that the way a hunter means it. Every advertisement you have seen in nine years was built by a 26-year-old in Northern Virginia who has a spreadsheet with your name on row 41,206.",
  "75+":
    "Genuine respect — you have earned the right to believe whatever you like. But your grandchildren have a group chat, it is titled “the situation,” and you are the situation.",
};
