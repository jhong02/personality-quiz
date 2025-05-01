const bugs = [
  {
    mbti: "INTJ",
    name: "Scorpion",
    title: "The Strategist",
    description: "Strategic, focused, always planning ten steps ahead. Prefers alone time to scheme out big moves.",
    besties: ["Spider", "Moth", "Ant", "Leaf Bug"],
    enemies: ["Fly", "Grasshopper", "Worm"],
    strengths: ["Master planner", "Emotionally detached in crises", "Independent and focused"],
    weaknesses: ["Overthinks everything", "Can come off cold", "Keeps others at arm's length"],
    taglines: ["Silently judging, actively plotting.", "I foresaw this.", "Plans within plans within plans.", "Trust issues, but make it tactical.", "I work best in the shadows."]
  },
  {
    mbti: "INTP",
    name: "Spider",
    title: "The Thinker",
    description: "Curious and cerebral. Always weaving ideas and theories. Lives for quiet reflection and exploration.",
    besties: ["Stick Bug", "Scorpion", "Shrimp", "Moth", "Beetle"],
    enemies: ["Mosquito", "Fly", "Worm"],
    image: "spider.png",
    strengths: ["Analytical and curious", "Creative with ideas", "Thinks deeply before acting"],
    weaknesses: ["Forgets real-world tasks", "Avoids emotional stuff", "Easily distracted by new theories"],
    taglines: ["Let me explain—wait, where was I?", "Webs aren't just for bugs.", "Big thoughts, no bedtime.", "Social battery? What's that?", "Built different, in a thinking way."]
  },
  {
    mbti: "ENTJ",
    name: "Ant",
    title: "The Commander",
    description: "Leads the colony with confidence and drive. Loves structure and gets things done—efficiently.",
    besties: ["Scorpion", "Mosquito", "Stick Bug", "Spider"],
    enemies: ["Butterfly", "Leaf Bug", "Fly"],
    image: "ant.webp",
    strengths: ["Strong leadership skills", "Always on schedule", "Logical problem solver"],
    weaknesses: ["Can be bossy", "Too results-focused", "Struggles with emotional messes"],
    taglines: ["Let's get to work.", "Plans before pals.", "Efficiency is love.", "If you're not 10 minutes early, you're late.", "Stop lollygagging."]
  },
  {
    mbti: "ENTP",
    name: "Stick Bug",
    title: "The Inventor",
    description: "Loves to think out loud. Bends the rules and sees the world from odd angles.",
    besties: ["Spider", "Shrimp", "Moth", "Ant", "Beetle"],
    enemies: ["Roly-Poly", "Ladybug", "Worm"],
    strengths: ["Wild imagination", "Naturally witty", "Fearless brainstormer"],
    weaknesses: ["Never finishes projects", "Constantly pokes holes in ideas", "Gets bored easily"],
    taglines: ["Why not... upside down?", "Chaos, but with charm.", "I made this. Also that. Also forgot both.", "Unhinged genius energy.", "Debate is my cardio."]
  },
  {
    mbti: "INFJ",
    name: "Moth",
    title: "The Mystic",
    description: "Quiet and dreamy. Glows with inner wisdom and emotional depth.",
    besties: ["Scorpion", "Shrimp", "Leaf Bug", "Spider"],
    enemies: ["Grasshopper", "Mosquito", "Fly", "Beetle"],
    image: "moth.png",
    strengths: ["Empathetic", "Reflective", "Mysteriously wise"],
    weaknesses: ["Emotionally overloaded", "Too withdrawn", "Overly idealistic"],
    taglines: ["Drawn to the light... but also the shadows.", "Whispers, not roars.", "Feels deeply, hides gently.", "Dreaming with wings.", "Introvert with moonlight vibes."]
  },
  {
    mbti: "INFP",
    name: "Leaf Bug",
    title: "The Idealist",
    description: "Shy but strong in their values. Blends in, but holds deep feelings and dreams.",
    besties: ["Moth", "Worm", "Shrimp", "Ladybug"],
    enemies: ["Mosquito", "Ant", "Worm", "Beetle"],
    strengths: ["Gentle-hearted", "Imaginative", "Values-driven"],
    weaknesses: ["Conflict avoidant", "Too sensitive", "Easily discouraged"],
    taglines: ["Soft but unshakable.", "I'm fine. (Not fine.)", "Quiet rebel energy.", "Leaf me alone.", "The dream is alive."]
  },
  {
    mbti: "ENFJ",
    name: "Bee",
    title: "The Nurturer",
    description: "Builds the hive and keeps everyone connected. Leads with kindness and energy.",
    besties: ["Leaf Bug", "Fly", "Moth", "Ladybug"],
    enemies: ["Scorpion", "Spider", "Roly-Poly"],
    image: "bee.webp",
    strengths: ["Brings the group together", "Emotionally intelligent", "Motivates others with kindness"],
    weaknesses: ["Overcommits to helping", "Avoids conflict", "Can be too idealistic"],
    taglines: ["Let's all work together!", "You need a hug and a plan.", "Crisis? I brought snacks and support.", "Queen bee energy (minus the ego).", "Kindness is my buzzword."]
  },
  {
    mbti: "ENFP",
    name: "Shrimp",
    title: "The Wanderer",
    description: "Weird, vibrant, and ever-curious. A sea-bug that bounces between ideas and people.",
    besties: ["Leaf Bug", "Moth", "Stick Bug", "Worm"],
    enemies: ["Mosquito", "Roly-Poly", "Ant"],
    image: "shrimp.png",
    strengths: ["Enthusiastic", "Creative explorer", "Warm and playful"],
    weaknesses: ["Scattered focus", "Avoids structure", "Can feel misunderstood"],
    taglines: ["Wait a minute... Is this a bug??", "Are you telling me....", "Catch me if you can.", "Random? Always.", "Sea bug, land soul."]
  },
  {
    mbti: "ISTJ",
    name: "Roly-Poly",
    title: "The Grounder",
    description: "Keeps things steady, rolls with the rules. Handles pressure with grace.",
    besties: ["Ladybug", "Mosquito", "Scorpion", "Worm"],
    enemies: ["Stick Bug", "Fly", "Worm", "Beetle"],
    image: "roly-poly.png",
    strengths: ["Responsible", "Consistent", "Protective"],
    weaknesses: ["Rigid under change", "Too reserved", "Avoids risk"],
    taglines: ["Roll with it. Literally.", "Steady shell, soft inside.", "Routine is my rhythm.", "Not flashy, just solid.", "Built for pressure."]
  },
  {
    mbti: "ISFJ",
    name: "Ladybug",
    title: "The Guardian",
    description: "Soft, dependable, and quietly fierce. Loves cozy spaces and loyal friends.",
    besties: ["Bee", "Worm", "Roly-Poly", "Leaf Bug"],
    enemies: ["Stick Bug", "Grasshopper", "Ant", "Beetle"],
    image: "ladybug.webp",
    strengths: ["Loyal", "Supportive", "Calming presence"],
    weaknesses: ["Avoids confrontation", "Easily overlooked", "Too self-sacrificing"],
    taglines: ["Soft shell, strong soul.", "The cozy crusader.", "Not loud, but lasting.", "Cares deeply, hides it neatly.", "Comfort is my combat."]
  },
  {
    mbti: "ESTJ",
    name: "Mosquito",
    title: "The Enforcer",
    description: "Direct, efficient, and not afraid to sting. Demands results.",
    besties: ["Ant", "Worm", "Roly-Poly", "Stick Bug"],
    enemies: ["Worm", "Leaf Bug", "Fly"],
    strengths: ["Straightforward", "Decisive", "Gets things done"],
    weaknesses: ["Too blunt", "Overbearing", "Dismisses emotions"],
    taglines: ["Results first, feelings later.", "I came. I bit. I conquered.", "Order over chaos.", "No-nonsense buzz.", "I mean business (and buzzing)."]
  },
  {
    mbti: "ESFJ",
    name: "Worm",
    title: "The Helper",
    description: "Digs deep in relationships. Supports others and likes building structure from the ground up.",
    besties: ["Bee", "Ladybug", "Fly", "Mosquito"],
    enemies: ["Scorpion", "Spider", "Moth", "Beetle"],
    strengths: ["Caring", "Patient", "Hard-working"],
    weaknesses: ["Overextends for others", "Fears conflict", "Avoids attention"],
    taglines: ["I dig you. Literally.", "Underground and underappreciated.", "Here to help, not to shine.", "Quiet strength runs deep.", "Structure, from the soil up."]
  },
  {
    mbti: "ISTP",
    name: "Centipede",
    title: "The Tactician",
    description: "Moves swiftly and carefully. Quiet observer with sharp reflexes and instincts.",
    besties: ["Worm", "Grasshopper", "Scorpion", "Spider", "Beetle"],
    enemies: ["Bee", "Fly", "Worm"],
    strengths: ["Quick thinker", "Cool under pressure", "Independent"],
    weaknesses: ["Aloof", "Emotionally distant", "Avoids commitment"],
    taglines: ["Many legs, zero hesitation.", "Silent but strategic.", "Think fast. Move faster.", "No drama, just action.", "Loner with a mission."]
  },
  {
    mbti: "ISFP",
    name: "Grasshopper",
    title: "The Artist",
    description: "Loves nature, freedom, and simplicity. Expresses through movement and sound.",
    besties: ["Leaf Bug", "Shrimp", "Ladybug", "Centipede", "Beetle"],
    enemies: ["Ant", "Mosquito", "Worm"],
    strengths: ["Creative", "Free-spirited", "Appreciates beauty"],
    weaknesses: ["Avoids routine", "Gets lost in feelings", "Too passive"],
    taglines: ["Jumping into vibes only.", "Tunes, not timelines.", "Feel first, leap later.", "Nature's lo-fi artist.", "Graceful chaos."]
  },
  {
    mbti: "ESTP",
    name: "Beetle",
    title: "The Trailblazer",
    description: "Charges through life with confidence and spark! Loves challenges, new adventures, and showing off their shiny armor. Always the first to explore and the last to back down.",
    besties: ["Fly", "Grasshopper", "Centipede", "Scorpion"],
    enemies: ["Worm", "Leaf Bug", "Moth"],
    image: "beetle.png",
    strengths: ["Bold", "Energetic", "Adventurous"],
    weaknesses: ["Impulsive", "Competitive", "Easily bored"],
    taglines: ["Armor on. Let's go.", "Leap first, plan later.", "Catch me if you can.", "Adventure is my default setting.", "Shiny shell, shinier confidence."]
  },
  {
    mbti: "ESFP",
    name: "Dragon Fly",
    title: "The Performer",
    description: "Buzzes with energy and charm. Center of attention and full of jokes.",
    besties: ["Bee", "Grasshopper", "Centipede", "Worm", "Beetle"],
    enemies: ["Scorpion", "Moth", "Roly-Poly"],
    image: "dragonfly.png",
    strengths: ["Fun-loving", "Spontaneous", "Captivates a crowd"],
    weaknesses: ["Easily distracted", "Avoids seriousness", "Needs attention"],
    taglines: ["Life's a stage, and I'm buzzing.", "Too fly to be shy.", "Loud, proud, and funny.", "Oops, did I cause chaos again?", "You hear me before you see me."]
  }
];

export default bugs;
