export const ENERGY_TYPES = {
  creator: "Creator",
  healer: "Healer",
  warrior: "Warrior",
  lover: "Lover",
  artist: "Artist",
  explorer: "Explorer",
  master: "Master",
};

export const RESULTS = {
  creator: {
    title: "The Creator",
    emoji: "🔥",
    tagline: "You breathe life into ideas and build the world around you.",
    description:
      "At its core, your Creator energy is the essence in you that manifests as the desire to do, make, build, grow or invent. The Creator wants to take an idea or concept and breathe life into it. Creator energy gives physical form to the human spirit and passion. It is the connection between the soul and the world — the intangible and tangible. It fulfills us by moving energy from the dimension of potential to the realm of matter. Creators generate ideas and beliefs, but also value getting things done.",
    traits: [
      "Grounded and practical",
      "Active and inventive",
      "Direct and energetic",
      "A natural problem-solver",
      "Hard-working and entrepreneurial",
      "Innovative and visionary",
    ],
    cta: "Your Creator energy is calling you to build something meaningful. Meditation School can help you align your inner life with your outer work.",
  },
  healer: {
    title: "The Healer",
    emoji: "💚",
    tagline: "You sense what is broken and carry the gift of making things whole.",
    description:
      "The Healer yearns to take things that are separate or broken and make them whole and complete. This energy fulfills its purpose by helping people reduce pain, find resolution to conflict, mend broken parts, or heal trauma. Most people who are naturally aligned with their Healer energy really dislike seeing disharmony, pain, or suffering. They are often dissatisfied with the way the world is and how human beings treat each other.",
    traits: [
      "Deeply sensitive and empathic",
      "Compassionate and understanding",
      "A gifted listener",
      "Committed to ethical living",
      "Emotionally intelligent",
      "Drawn to nature and wholeness",
    ],
    cta: "Your Healer energy is one of the world's most needed gifts. Meditation School can help you deepen your capacity to hold space for yourself and others.",
  },
  warrior: {
    title: "The Warrior",
    emoji: "⚔️",
    tagline: "You rise to the challenge with discipline, courage, and unwavering focus.",
    description:
      "Warrior energy embodies discipline, focus, and commitment. When at its peak potential, Warrior energy becomes the part of you that is willing to exert consistent healthy effort, overcome fear, go directly at the truth, and cut through the jungle of illusion. Warriors are loyal to their mission, courageous in the face of challenges, and able to see through the seduction of distractions. Alert, humble, and honest, Warriors train and perfect their efforts with integrity.",
    traits: [
      "Decisive and direct",
      "Structured and disciplined",
      "Truthful and confident",
      "Humble and alert",
      "Consistent and honorable",
      "Loyal, protective, and courageous",
    ],
    cta: "Your Warrior energy gives you the power to face life head-on. Meditation School can help you channel that strength with clarity and calm.",
  },
  lover: {
    title: "The Lover",
    emoji: "❤️",
    tagline: "Your heart is wide open — love and connection are your deepest calling.",
    description:
      "One of the deepest forms of spiritual growth is the realization that the fabric of reality is woven with the energy of love. People who embody their Lover energy tend to have big sensitive hearts, and to create space in their lives for others from all walks of life. They are motivated by the energy of acceptance and connection, of caring and compassion, and by consideration for others.",
    traits: [
      "Authentic and compassionate",
      "Caring and open-hearted",
      "Accepting and sensitive",
      "Honest and purpose-driven",
      "Nurturing and loyal",
      "Kind and relationship-oriented",
    ],
    cta: "Your Lover energy is a profound spiritual force. Meditation School can help you cultivate that love into a deep and sustainable practice.",
  },
  artist: {
    title: "The Artist",
    emoji: "🎨",
    tagline: "You channel the invisible into form — beauty and expression are your medicine.",
    description:
      "Artist energy pulls inspiration down from the heavens and up from the earth, makes the unseen seen, and gives emotional presence form in the material world through the vehicle of creative expression. Artist energy transports us out of the realm of our regrets and anxieties. It illuminates the present moment by evoking an intuitive, visceral, emotional response. The Artist is inherently a master of both process and presence.",
    traits: [
      "Creative and imaginative",
      "Open-minded and original",
      "Appreciative of beauty",
      "Expressive and authentic",
      "Sensitive and self-validating",
      "Drawn to hobbies, play, and presence",
    ],
    cta: "Your Artist energy is a portal to the sacred. Meditation School can help you deepen your creative presence and inner stillness.",
  },
  explorer: {
    title: "The Explorer",
    emoji: "🧭",
    tagline: "You are driven by curiosity, wonder, and an unquenchable thirst for discovery.",
    description:
      "We are a deeply curious species. We all have an innate desire to experience the mysterious. This is Explorer energy. It is the feeling, the need, the subtle intuition in each of us to go to the edge and beyond. To open, unfold, and see. Explorers want to experience the unknown and are much less interested in the destination than in the journey.",
    traits: [
      "Curious and enthusiastic",
      "A dreamer and trail-blazer",
      "Thirsty for knowledge",
      "Energetic and open-minded",
      "Deeply appreciative of life's mysteries",
      "Perceptive and adventurous",
    ],
    cta: "Your Explorer energy is lit from within. Meditation School can help you turn that outer curiosity inward — into the greatest adventure of all.",
  },
  master: {
    title: "The Master",
    emoji: "🌟",
    tagline: "You seek truth, walk inward, and carry wisdom others are still searching for.",
    description:
      "The Master is the seeker of truth. It is the part of you that searches for self-realization through introspection, understanding, and wisdom. Master energy drives your desire to share that light with the world. This is the part of you that knows that the journey is not ultimately about arriving someplace else — it is about arriving here, in this moment, into your own being.",
    traits: [
      "Open-minded and introspective",
      "Honest with yourself",
      "Non-ideological and caring",
      "A natural teacher, guide, or mentor",
      "A seeker of truth and wisdom",
      "A calming and grounding presence",
    ],
    cta: "Your Master energy is rare and luminous. Meditation School can help you deepen your realization and share your light with confidence.",
  },
};

// Scoring weights: each answer maps to { energyType: points }
// Multi-select questions spread points across chosen answers
export const QUESTIONS = [
  {
    id: 1,
    text: "If you only had time to focus on two choices, which would you prefer?",
    type: "multi",
    maxSelect: 2,
    minSelect: 2,
    options: [
      {
        text: "Travel, learning about new topics and exploring the undiscovered",
        scores: { explorer: 3 },
      },
      {
        text: "Guiding, mentoring or teaching on topics I'm interested in",
        scores: { master: 3 },
      },
      {
        text: "Sports, physical exercise, or taking care of the body",
        scores: { warrior: 3 },
      },
      {
        text: "Working on myself or helping others heal whether medically, emotionally, mentally or spiritually",
        scores: { healer: 3 },
      },
    ],
  },
  {
    id: 2,
    text: "Are you empathic to other people's energy and feelings?",
    type: "single",
    options: [
      { text: "Very empathic", scores: { healer: 3, lover: 2, artist: 1 } },
      { text: "Sometimes yes, but not usually", scores: { healer: 1, lover: 1 } },
      { text: "No, not really", scores: { warrior: 2, creator: 1 } },
    ],
  },
  {
    id: 3,
    text: "Do you tend to get lost in fantasy, day dream or enjoy artistic expression?",
    type: "single",
    options: [
      { text: "Often", scores: { artist: 3, explorer: 2 } },
      { text: "Occasionally", scores: { artist: 1, explorer: 1 } },
      { text: "Not really, I'm pretty grounded in the material world", scores: { creator: 2, warrior: 1 } },
    ],
  },
  {
    id: 4,
    text: "When you have a free weekend, how do you tend to spend your time? (choose two)",
    type: "multi",
    maxSelect: 2,
    minSelect: 2,
    options: [
      { text: "Diving into an artistic or creative project.", scores: { artist: 3 } },
      {
        text: "Catching up on work or an entrepreneurial or personal project.",
        scores: { creator: 3 },
      },
      {
        text: "Enjoying quality time with your partner, family or friends",
        scores: { lover: 3 },
      },
      {
        text: "Focusing on finding the deeper truths of life, or working on my spiritual practice",
        scores: { master: 3 },
      },
    ],
  },
  {
    id: 5,
    text: "Would people describe your energy as being disciplined, grounded or confident?",
    type: "single",
    options: [
      { text: "Often", scores: { warrior: 3, creator: 1 } },
      { text: "Sometimes, but not always", scores: { warrior: 1 } },
      { text: "No", scores: { artist: 1, explorer: 1 } },
    ],
  },
  {
    id: 6,
    text: "Do you tend to make decisions from your heart or your head?",
    type: "single",
    options: [
      { text: "Usually, from my heart", scores: { lover: 3, healer: 2 } },
      { text: "I am more logical when it comes to decisions", scores: { warrior: 2, creator: 2 } },
      { text: "Both, equally", scores: { master: 2, explorer: 1 } },
    ],
  },
  {
    id: 7,
    text: "How would you spend your time if you could only choose one option?",
    type: "single",
    options: [
      {
        text: "Work on healing myself and/or helping others heal",
        scores: { healer: 3, lover: 1 },
      },
      {
        text: "Focusing on bringing a project I'm enthusiastic about to fruition",
        scores: { creator: 3, warrior: 1 },
      },
      {
        text: "Traveling, reading, watching documentaries, or other forms of learning and exploration",
        scores: { explorer: 3, master: 1 },
      },
    ],
  },
  {
    id: 8,
    text: "Do you consider yourself to be someone that others often share their feelings with?",
    type: "single",
    options: [
      { text: "Yes, often", scores: { healer: 3, lover: 2 } },
      { text: "Occasionally", scores: { healer: 1, lover: 1 } },
      { text: "No, not so much", scores: { warrior: 1, creator: 1 } },
    ],
  },
  {
    id: 9,
    text: "Choose the two options you are currently most passionate about.",
    type: "multi",
    maxSelect: 2,
    minSelect: 2,
    options: [
      { text: "Helping others, listening, and holding space", scores: { healer: 3, lover: 1 } },
      { text: "Creative projects", scores: { artist: 3, creator: 1 } },
      { text: "Love and relationships", scores: { lover: 3 } },
      { text: "Business and finances", scores: { creator: 3, warrior: 1 } },
      { text: "Being a guide and mentor", scores: { master: 3 } },
    ],
  },
  {
    id: 10,
    text: "Do you easily feel compassion for other human beings?",
    type: "single",
    options: [
      { text: "Yes, often", scores: { healer: 3, lover: 3 } },
      { text: "Sometimes", scores: { healer: 1, lover: 1 } },
      { text: "No", scores: { warrior: 2 } },
    ],
  },
  {
    id: 11,
    text: "What three areas of your life do you most value?",
    type: "multi",
    maxSelect: 3,
    minSelect: 3,
    options: [
      { text: "Career or finances", scores: { creator: 3 } },
      { text: "Creative expression", scores: { artist: 3 } },
      { text: "Relationships, friendships, family or love", scores: { lover: 3 } },
      { text: "Being a guide to others", scores: { master: 3 } },
      { text: "Helping others to heal and feel better", scores: { healer: 3 } },
      { text: "Academia, science, personal adventures or travelling", scores: { explorer: 3 } },
      {
        text: "Being of service by protecting the environment, animals, human rights or other causes you care about deeply",
        scores: { warrior: 3, healer: 1 },
      },
    ],
  },
  {
    id: 12,
    text: "Do you consider yourself a sensitive feeler of emotions?",
    type: "single",
    options: [
      { text: "Yes", scores: { healer: 3, lover: 2, artist: 2 } },
      { text: "Somewhat", scores: { healer: 1, lover: 1, artist: 1 } },
      { text: "Not always", scores: { warrior: 2, creator: 1 } },
    ],
  },
  {
    id: 13,
    text: "Do you tend to be a leader, teacher or guide for others?",
    type: "single",
    options: [
      { text: "Yes, it's my calling", scores: { master: 3, warrior: 1 } },
      { text: "Sometimes", scores: { master: 1, creator: 1 } },
      { text: "Not often", scores: { artist: 1, explorer: 1 } },
    ],
  },
  {
    id: 14,
    text: "Do you tend to feel motivated to work, create, build and make things happen?",
    type: "single",
    options: [
      { text: "Yes", scores: { creator: 3, warrior: 1 } },
      { text: "Sometimes", scores: { creator: 1 } },
      { text: "Not often", scores: { artist: 1, explorer: 1 } },
    ],
  },
  {
    id: 15,
    text: "Do people look to you as someone who gets things done and finishes projects?",
    type: "single",
    options: [
      { text: "Yes", scores: { creator: 3, warrior: 2 } },
      { text: "Occasionally", scores: { creator: 1, warrior: 1 } },
      { text: "No", scores: { artist: 1 } },
    ],
  },
  {
    id: 16,
    text: "Do people see you as someone who steps up to protect others when there's danger?",
    type: "single",
    options: [
      { text: "Yes, often", scores: { warrior: 3, lover: 1 } },
      { text: "Sometimes", scores: { warrior: 2 } },
      { text: "No, not that often", scores: { explorer: 1, artist: 1 } },
    ],
  },
  {
    id: 17,
    text: "Do you spend an above average amount of time researching and learning about new topics?",
    type: "single",
    options: [
      { text: "Yes", scores: { explorer: 3, master: 1 } },
      { text: "Somewhat", scores: { explorer: 1 } },
      { text: "No", scores: { creator: 1, warrior: 1 } },
    ],
  },
  {
    id: 18,
    text: "When you have an idea do you usually act and bring it to fruition?",
    type: "single",
    options: [
      { text: "Yes", scores: { creator: 3 } },
      { text: "Sometimes, but not always", scores: { creator: 1, explorer: 1 } },
      { text: "No, I'm a dreamer", scores: { artist: 2, explorer: 2 } },
    ],
  },
  {
    id: 19,
    text: "Are physical exercise, sports and competition major values in your life?",
    type: "single",
    options: [
      { text: "Yes", scores: { warrior: 3 } },
      { text: "Sometimes", scores: { warrior: 1, creator: 1 } },
      { text: "Not really", scores: { artist: 1, healer: 1 } },
    ],
  },
  {
    id: 20,
    text: "Do you spend a lot of time thinking about the nature of reality and the purpose of life?",
    type: "single",
    options: [
      { text: "Yes, I think about them often", scores: { master: 3, explorer: 1 } },
      { text: "Sometimes", scores: { master: 1 } },
      { text: "Not so much", scores: { creator: 1, warrior: 1 } },
    ],
  },
  {
    id: 21,
    text: "Which two options brought you the most joy in the last 3 months?",
    type: "multi",
    maxSelect: 2,
    minSelect: 2,
    options: [
      { text: "Spending time with my partner, friends or family", scores: { lover: 3 } },
      { text: "Travel, getaways, workshops and reading", scores: { explorer: 3 } },
      { text: "Art, music, writing, dancing or other creative projects", scores: { artist: 3 } },
      { text: "A work, entrepreneurial or creative success", scores: { creator: 3 } },
    ],
  },
  {
    id: 22,
    text: "Do you feel a strong connection to your inner voice and wisdom?",
    type: "single",
    options: [
      { text: "Yes, I feel a strong connection", scores: { master: 3, healer: 1 } },
      { text: "Sometimes, but not always", scores: { master: 1 } },
      { text: "Not so much", scores: { creator: 1, warrior: 1 } },
    ],
  },
  {
    id: 23,
    text: "Do you often express yourself through artistic or creative endeavors?",
    type: "single",
    options: [
      { text: "Yes", scores: { artist: 3 } },
      { text: "Sometimes", scores: { artist: 1, explorer: 1 } },
      { text: "No", scores: { warrior: 1, creator: 1 } },
    ],
  },
  {
    id: 24,
    text: "Do you have an open or guarded heart when it comes to human connections?",
    type: "single",
    options: [
      { text: "My heart is usually open", scores: { lover: 3, healer: 1 } },
      { text: "It Depends", scores: { lover: 1, warrior: 1 } },
      { text: "Guarded", scores: { warrior: 2, creator: 1 } },
    ],
  },
  {
    id: 25,
    text: "Are you always looking over the horizon for something new to explore?",
    type: "single",
    options: [
      { text: "Yes", scores: { explorer: 3 } },
      { text: "Sometimes", scores: { explorer: 1, master: 1 } },
      { text: "No", scores: { creator: 1, warrior: 1 } },
    ],
  },
  {
    id: 26,
    text: "Are you passionate about understanding how the world works through travel, science and exploration?",
    type: "single",
    options: [
      { text: "Yes, I'm very passionate", scores: { explorer: 3 } },
      { text: "Somewhat", scores: { explorer: 1, master: 1 } },
      { text: "Not really", scores: { creator: 1, warrior: 1 } },
    ],
  },
  {
    id: 27,
    text: "Do you often engage your imaginative and creative qualities?",
    type: "single",
    options: [
      { text: "Yes, absolutely", scores: { artist: 3 } },
      { text: "Somewhat", scores: { artist: 1, explorer: 1 } },
      { text: "I enjoy them, but they are not a priority", scores: { creator: 1, warrior: 1 } },
    ],
  },
  {
    id: 28,
    text: "If someone is experiencing injustice do you stand up for them, even if there's some risk to you?",
    type: "single",
    options: [
      { text: "Yes, nearly always", scores: { warrior: 3, healer: 1 } },
      { text: "Sometimes", scores: { warrior: 1, lover: 1 } },
      { text: "I mostly keep to myself", scores: { master: 1, explorer: 1 } },
    ],
  },
];

export function calculateScores(answers) {
  const scores = {
    creator: 0,
    healer: 0,
    warrior: 0,
    lover: 0,
    artist: 0,
    explorer: 0,
    master: 0,
  };

  answers.forEach((answer) => {
    const question = QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) return;

    const selectedOptions = Array.isArray(answer.selected)
      ? answer.selected
      : [answer.selected];

    selectedOptions.forEach((optionText) => {
      const option = question.options.find((o) => o.text === optionText);
      if (!option) return;
      Object.entries(option.scores).forEach(([type, pts]) => {
        scores[type] += pts;
      });
    });
  });

  return scores;
}

export function getTopResults(scores, count = 2) {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([type, score]) => ({ type, score, result: RESULTS[type] }));
}
