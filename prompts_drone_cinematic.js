/**
 * PromptForge: Aerial Drone & Landmark Generator CLI
 * Specializing in cinematic aerial landscapes, famous landmarks,
 * castles, coastlines, mountains, cities and architectural wonders.
 *
 * Usage: node prompts_drone_landscapes_hashtags.js [count]
 */

const fs = require('fs');

// ---------------------------------------------------------
// LANDSCAPE & LANDMARK GROUPS
// ---------------------------------------------------------
const ECOLOGICAL_GROUPS = [
  {
    label: 'Famous Global Landmarks',
    species: [
      'Eiffel Tower rising above Paris, France',
      'Colosseum surrounded by historic Rome, Italy',
      'Taj Mahal beside the Yamuna River, India',
      'Great Wall of China winding across mountain ridges',
      'Pyramids of Giza rising from the Egyptian desert',
      'Statue of Liberty overlooking New York Harbor',
      'Machu Picchu among mist-covered Peruvian mountains',
      'Christ the Redeemer overlooking Rio de Janeiro',
      'Sydney Opera House beside the sparkling harbor',
      'Petra Treasury carved into rose-red sandstone cliffs',
      'Angkor Wat surrounded by tropical Cambodian jungle',
      'Mount Fuji towering above the Japanese countryside',
      'Acropolis of Athens above the ancient city',
      'Burj Khalifa rising above the Dubai skyline',
      'Neuschwanstein Castle among the Bavarian Alps',
      'Sagrada Familia surrounded by Barcelona',
      'Golden Gate Bridge spanning San Francisco Bay',
      'Santorini whitewashed buildings above the Aegean Sea',
      'Tower Bridge crossing the River Thames in London',
      'Chichen Itza rising above the Yucatan jungle'
    ],
    behaviors: [
      'slowly revealing the landmark from behind a foreground ridge',
      'circling the architecture in a smooth cinematic orbit',
      'ascending gradually to reveal the full surrounding landscape',
      'flying toward the landmark from a distant establishing position',
      'gliding laterally to reveal the structure against the horizon',
      'pulling backward to reveal the vast landscape surrounding the landmark'
    ],
    habitats: [
      'authentic surrounding geography and natural terrain',
      'expansive panoramic landscape with distant atmospheric haze',
      'historic surroundings with realistic architectural details',
      'natural terrain stretching toward the distant horizon',
      'environment with realistic scale and geographical features'
    ]
  },

  {
    label: 'Castles, Palaces & Historic Architecture',
    species: [
      'medieval castle perched on a dramatic rocky outcrop',
      'fairytale stone castle overlooking a forested valley',
      'ancient fortress surrounded by towering defensive walls',
      'Gothic cathedral rising above a historic European town',
      'ornate royal palace surrounded by formal gardens',
      'hilltop citadel overlooking a sprawling medieval settlement',
      'Romanesque monastery surrounded by rolling countryside',
      'fortified coastal castle above crashing ocean waves',
      'ancient temple complex hidden in dense tropical jungle',
      'medieval walled city with towers and narrow stone streets',
      'dramatic mountaintop monastery surrounded by clouds',
      'Renaissance palace beside a winding river'
    ],
    behaviors: [
      'performing a slow ascending reveal above the castle walls',
      'orbiting the entire structure while maintaining a consistent altitude',
      'approaching through a broad valley toward the main entrance',
      'tracking sideways along the outer walls and defensive towers',
      'rising from the forest canopy to reveal the entire complex',
      'pulling away from the main tower to expose the surrounding terrain'
    ],
    habitats: [
      'rolling green hills and patchwork countryside',
      'dense ancient woodland and misty valleys',
      'dramatic mountain peaks and rocky cliffs',
      'winding rivers and historic agricultural landscapes',
      'rugged coastal cliffs and open sea',
      'expansive gardens and mature woodland'
    ]
  },

  {
    label: 'Mountains, Valleys & Highlands',
    species: [
      'towering snow-covered Alpine mountain range',
      'dramatic Dolomites limestone peaks above green valleys',
      'rugged Scottish Highlands with isolated mountain lochs',
      'Himalayan peaks rising above immense cloud formations',
      'Grand Canyon carved into layered red rock',
      'Yosemite Valley surrounded by immense granite cliffs',
      'Patagonian mountains reflected in glacial lakes',
      'Icelandic volcanic mountains and black sand plains',
      'Swiss mountain villages surrounded by steep alpine slopes',
      'vast Andean mountain ridges disappearing into the distance',
      'rocky desert mountains with winding canyon formations',
      'emerald valleys surrounded by ancient mountain forests'
    ],
    behaviors: [
      'flying forward through a broad mountain valley',
      'ascending above a ridge to reveal successive mountain ranges',
      'gliding parallel to a dramatic cliff face',
      'pulling back from a foreground peak to reveal immense scale',
      'tracking above a winding river between mountain slopes',
      'flying smoothly over the ridge line and descending into the valley',
      'revealing a hidden alpine lake from behind a rocky outcrop'
    ],
    habitats: [
      'vast wilderness with realistic geological formations',
      'layered mountain ranges fading into atmospheric haze',
      'glacial lakes, rocky slopes and snow-covered summits',
      'dense evergreen forests below towering peaks',
      'remote highlands with dramatic elevation changes'
    ]
  },

  {
    label: 'Coastlines, Islands & Oceans',
    species: [
      'dramatic Algarve sea cliffs above turquoise Atlantic water',
      'Amalfi Coast villages clinging to steep coastal mountains',
      'tropical island surrounded by vivid turquoise lagoons',
      'Norwegian fjord cutting between immense rocky mountains',
      'Greek island cliffs overlooking the deep blue Aegean Sea',
      'tropical coral atoll surrounded by brilliant ocean gradients',
      'rugged Irish coastline with green headlands',
      'white limestone cliffs above a wild blue ocean',
      'remote volcanic island surrounded by crashing waves',
      'Caribbean harbor filled with colorful coastal architecture',
      'towering sea stacks rising from a misty coastline',
      'vast sandy beach bordered by tropical palm forests',
      'dramatic Cape coastline with waves breaking against rocks',
      'remote Pacific island with lush mountains and hidden coves'
    ],
    behaviors: [
      'tracking parallel to the coastline above the water',
      'flying low over the ocean before climbing toward the cliffs',
      'orbiting a prominent sea stack with the horizon in view',
      'pulling backward from a coastal village to reveal the bay',
      'following the curve of a beach in a smooth sweeping movement',
      'ascending from the shoreline to reveal a hidden lagoon',
      'gliding forward above waves toward a distant island'
    ],
    habitats: [
      'clear ocean water with visible underwater color gradients',
      'rugged coastal terrain with natural erosion patterns',
      'lush coastal vegetation and steep green hills',
      'sunlit cliffs with deep blue water below',
      'remote islands surrounded by open ocean',
      'dramatic headlands with sea mist and breaking surf'
    ]
  },

  {
    label: 'Forests, Jungles & Wilderness',
    species: [
      'vast Amazon rainforest stretching to the horizon',
      'dense tropical rainforest surrounding a winding river',
      'mist-covered Borneo jungle with layered green canopy',
      'ancient redwood forest with towering trees',
      'Canadian wilderness with lakes and evergreen forests',
      'vast African rainforest with rolling forested hills',
      'remote temperate rainforest beneath low clouds',
      'autumn woodland with colorful tree canopies',
      'dense Scandinavian forest surrounding a pristine lake',
      'tropical jungle mountains with cascading waterfalls',
      'isolated wilderness valley filled with morning fog',
      'vast green forest canopy broken by a winding river'
    ],
    behaviors: [
      'flying above the canopy in a slow forward tracking shot',
      'rising vertically to reveal the immense forest expanse',
      'following a river as it winds through dense vegetation',
      'gliding above the treetops toward distant mountains',
      'pulling upward from a forest clearing to reveal the surrounding wilderness',
      'moving forward through a broad opening between forested ridges'
    ],
    habitats: [
      'dense layers of vegetation and realistic canopy textures',
      'misty valleys with natural rivers and clearings',
      'remote wilderness with no visible modern infrastructure',
      'towering trees and lush undisturbed terrain',
      'mountain forests fading into the distant atmosphere'
    ]
  },

  {
    label: 'Deserts, Canyons & Arid Landscapes',
    species: [
      'towering sandstone formations in Monument Valley',
      'vast Sahara dunes stretching across the horizon',
      'Wadi Rum desert with monumental red rock mountains',
      'Antelope Canyon with sculpted sandstone walls',
      'Atacama Desert with salt flats and distant volcanoes',
      'Namib Desert dunes meeting the Atlantic coast',
      'dramatic red sandstone canyons in the American Southwest',
      'ancient desert oasis surrounded by barren mountains',
      'vast rocky Arabian desert with winding natural valleys',
      'white salt flats reflecting the sky',
      'remote desert plateau with towering rock formations',
      'golden dunes surrounding a secluded desert valley'
    ],
    behaviors: [
      'flying low over dune ridges before ascending to a wide panorama',
      'tracking above sandstone formations in a smooth forward movement',
      'ascending above a canyon rim to reveal the vast desert beyond',
      'gliding parallel to the sculpted rock formations',
      'pulling backward to reveal a distant mountain range',
      'following the natural contours of a winding desert valley'
    ],
    habitats: [
      'vast arid terrain with realistic erosion patterns',
      'golden dunes and distant sandstone mountains',
      'dramatic canyon walls with natural layered geology',
      'remote desert wilderness with subtle atmospheric haze',
      'rugged plateaus and immense open landscapes'
    ]
  }
];

// ---------------------------------------------------------
// DRONE SHOTS
// ---------------------------------------------------------
const DRONE_SHOTS = [
  'Wide cinematic aerial establishing shot',
  'Slow ascending reveal',
  'Smooth forward tracking flight',
  'High oblique panoramic aerial shot',
  'Slow cinematic orbit around the landscape',
  'Low altitude tracking shot following natural terrain',
  'Wide lateral reveal with a distant horizon',
  'Gradual pullback revealing the full landscape',
  'Smooth aerial flyover with natural parallax',
  'Slow descending aerial perspective',
  'High-altitude panoramic sweep',
  'Gentle sweeping turn above the landscape',
  'Aerial reveal from behind a foreground ridge',
  'Wide-angle overhead establishing shot',
  'Continuous cinematic aerial tracking shot',
  'Slow rising camera movement above the terrain',
  'Smooth aerial movement following a river or coastline',
  'Wide landscape reveal with strong foreground depth',
  'High-altitude reveal: begin with an expansive overhead view and gently descend toward the focal subject'
];

// ---------------------------------------------------------
// LIGHTING & WEATHER
// ---------------------------------------------------------
const LIGHTING = [
  'warm golden-hour sunlight with long natural shadows',
  'soft sunrise light with delicate atmospheric haze',
  'dramatic sunset light illuminating the landscape in amber tones',
  'blue-hour twilight with realistic city and architectural lights',
  'bright natural daylight with accurate colors and clear visibility',
  'overcast cinematic light with soft shadows and muted contrast',
  'misty dawn with atmospheric depth between distant landscape layers',
  'sunlight breaking through clouds onto the landscape',
  'dramatic storm clouds with shafts of sunlight illuminating the terrain',
  'soft morning mist drifting through valleys',
  'clear midday light revealing detailed terrain and architecture',
  'warm late-afternoon light grazing mountain ridges',
  'subtle post-rain atmosphere with reflective surfaces',
  'thin clouds casting natural moving shadows across the landscape',
  'twilight glow beneath a dramatic cloud-filled sky',
  'soft winter sunlight illuminating snow-covered terrain',
  'hazy tropical sunlight above a lush green landscape',
  'moonlit landscape with realistic low-light exposure'
];

// ---------------------------------------------------------
// CAMERA & MOVEMENT QUALITY
// ---------------------------------------------------------
const CAMERA_MODIFIERS = [
  'smooth stabilized drone footage',
  'slow cinematic camera movement',
  'realistic aerial perspective and natural parallax',
  'wide-angle aerial composition',
  'high oblique drone perspective',
  'vertical overhead composition',
  'wide establishing shot with a deep horizon',
  'precise gimbal stabilization and controlled turns',
  'gradual acceleration and deceleration',
  'natural motion blur consistent with camera movement',
  'realistic altitude and believable flight paths',
  'strong foreground-to-background depth',
  'layered atmospheric perspective',
  'wide sweeping cinematic composition',
  'steady horizon with fluid camera transitions',
  'continuous single-take aerial cinematography',
  'realistic geographical scale and terrain detail',
  'natural perspective without exaggerated distortion',
  'subtle parallax between foreground and distant scenery',
  'controlled camera banking during wide turns',
  'smooth horizon reveal',
  'carefully composed leading lines',
  'clear landmark silhouette against the background',
  'natural depth of field appropriate for aerial footage'
];

// ---------------------------------------------------------
// VISUAL ENHANCERS
// ---------------------------------------------------------
const ENHANCERS = [
  'photorealistic landscape textures',
  'cinematic color grading',
  'natural atmospheric perspective',
  'highly detailed terrain and architecture',
  'realistic water reflections',
  'physically plausible sunlight and shadows',
  'natural cloud formations',
  'immersive sense of scale',
  'realistic environmental detail',
  'rich but natural landscape colors',
  'documentary-quality aerial cinematography',
  'subtle atmospheric haze',
  'realistic vegetation and geological formations',
  'crisp architectural details',
  'balanced cinematic contrast',
  'lifelike cloud and mist movement',
  'realistic ocean waves and coastline detail',
  'accurate natural colors without excessive saturation',
  'cohesive cinematic composition',
  'believable geographical features',
  'natural highlight roll-off',
  'consistent perspective and architectural proportions'
];

// ---------------------------------------------------------
// NEGATIVE PROMPT / QUALITY CONTROL
// ---------------------------------------------------------
const QUALITY_RULES = [
  'no text, subtitles, logos or watermarks',
  'no cartoon styling or artificial CGI appearance',
  'no warped buildings or distorted landmarks',
  'no duplicated architectural structures',
  'no sudden camera jumps or erratic movement',
  'no impossible camera teleportation',
  'no artificial terrain deformation',
  'no excessive sharpening or oversaturated colors',
  'no flickering, morphing or inconsistent geometry',
  'preserve realistic geographical scale and proportions',
  'keep the main landmark visually consistent throughout the shot',
  'no unwanted foreground objects obscuring the subject'
];

// ---------------------------------------------------------
// HELPERS
// ---------------------------------------------------------
const getRandom = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const pickN = (arr, n) =>
  [...arr]
    .sort(() => Math.random() - 0.5)
    .slice(0, n);


// ---------------------------------------------------------
// TITLE HASHTAG GENERATOR
// Select the 3 strongest hashtags from title + description.
// ---------------------------------------------------------
function createTitleWithHashtags(data) {
  const title = (data.title || "").trim();
  const description = (data.description || "").trim();
  const text = `${title} ${description}`.toLowerCase();

  const hashtagRules = [
    { tag: "#Drone", keywords: ["drone", "fpv", "aerial"], priority: 3 },
    { tag: "#Cinematic", keywords: ["cinematic", "cinematography"], priority: 2 },
    { tag: "#Nature", keywords: ["nature", "natural landscape"], priority: 2 },
    { tag: "#Landscape", keywords: ["landscape", "valley", "scenery"], priority: 3 },
    { tag: "#Mountains", keywords: ["mountain", "mountains", "alpine"], priority: 3 },
    { tag: "#River", keywords: ["river", "waterway", "stream"], priority: 3 },
    { tag: "#Waterfall", keywords: ["waterfall", "cascade"], priority: 4 },
    { tag: "#Forest", keywords: ["forest", "woods", "woodland"], priority: 3 },
    { tag: "#Wildlife", keywords: ["wildlife", "animal", "animals"], priority: 4 },
    { tag: "#Ocean", keywords: ["ocean", "sea", "coast"], priority: 3 },
    { tag: "#Beach", keywords: ["beach", "shore", "sand"], priority: 3 },
    { tag: "#Sunset", keywords: ["sunset", "golden hour"], priority: 3 },
    { tag: "#Sunrise", keywords: ["sunrise", "dawn"], priority: 3 },
    { tag: "#Winter", keywords: ["winter", "snow", "snow-covered", "frost"], priority: 3 },
    { tag: "#Travel", keywords: ["travel", "destination", "explore"], priority: 2 },
    { tag: "#Relaxing", keywords: ["relaxing", "peaceful", "calm", "serene"], priority: 2 },
    { tag: "#NaturePhotography", keywords: ["nature photography", "photography"], priority: 2 },
    { tag: "#AerialVideo", keywords: ["aerial video", "aerial footage"], priority: 2 },
    { tag: "#ScenicViews", keywords: ["scenic", "scenic views"], priority: 2 },
    { tag: "#Documentary", keywords: ["documentary"], priority: 2 },
    { tag: "#Fog", keywords: ["fog", "mist", "water mist"], priority: 2 },
    { tag: "#Adventure", keywords: ["adventure", "exploration"], priority: 2 },
    { tag: "#Lake", keywords: ["lake", "lakes"], priority: 3 },
    { tag: "#Photography", keywords: ["photography", "photographic"], priority: 1 },
    { tag: "#BeautifulNature", keywords: ["beautiful nature"], priority: 1 }
  ];

  const found = [];

  for (const rule of hashtagRules) {
    let matches = 0;

    for (const keyword of rule.keywords) {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "gi");
      matches += (text.match(regex) || []).length;
    }

    if (matches > 0) {
      found.push({
        tag: rule.tag,
        score: matches * rule.priority
      });
    }
  }

  found.sort((a, b) => b.score - a.score);

  const hashtags = found.slice(0, 3).map(item => item.tag);

  return `${title} ${hashtags.join(" ")}`.trim();
}


// ---------------------------------------------------------
// GENERATOR
// ---------------------------------------------------------
const generateDroneBatch = (count = 7) => {
  const results = [];

  for (let i = 0; i < count; i++) {
    const group = getRandom(ECOLOGICAL_GROUPS);
    const spec = getRandom(group.species);
    const bhv = getRandom(group.behaviors);
    const hab = getRandom(group.habitats);
    const light = getRandom(LIGHTING);
    const shot = getRandom(DRONE_SHOTS);

    const camera = pickN(CAMERA_MODIFIERS, 3).join(', ');
    const enh = pickN(ENHANCERS, 3).join(', ');
    const quality = pickN(QUALITY_RULES, 2).join(', ');

    const prompt = [
      'CINEMATIC AERIAL DRONE VIDEO',
      `SUBJECT: ${spec}`,
      `ENVIRONMENT: ${hab}`,
      `SCENE ACTION: ${bhv}`,
      `DRONE SHOT: ${shot}`,
      `LIGHTING AND WEATHER: ${light}`,
      `CAMERA CHARACTERISTICS: ${camera}`,
      `VISUAL STYLE: ${enh}`,
      `QUALITY REQUIREMENTS: ${quality}`,
      'DURATION: 5 seconds',
      'CONTINUITY: one coherent shot, consistent geography, realistic movement and stable subject identity',
      'AUDIO: natural environmental ambience appropriate to the location, with no narration or music',
      'FORMAT: 16:9 widescreen'
    ].join(' | ');

    results.push({
      description: prompt,
      title: createTitleWithHashtags({
        title: spec,
        description: prompt
      })
    });
  }

  return results;
};


// ---------------------------------------------------------
// ZSKY FLOW EXPORT
// Creates exactly 7 prompt nodes and 7 video nodes.
// ---------------------------------------------------------
const generateZskyFlow = (prompts, nodeCount = 7) => {
  const nodes = [];
  const edges = [];

  const verticalSpacing = 200;

  for (let i = 0; i < nodeCount; i++) {
    const item = prompts[i];

    if (!item) {
      throw new Error(`Missing generated prompt for ZSky node ${i + 1}.`);
    }

    const promptId = `p${i + 1}`;
    const videoId = `v${i + 1}`;
    const y = 60 + (i * verticalSpacing);

    // PROMPT NODE
    nodes.push({
      id: promptId,
      type: 'prompt',
      x: 40,
      y,
      params: {
        text: item.description
      }
    });

    // VIDEO NODE
    nodes.push({
      id: videoId,
      type: 'video',
      x: 340,
      y,
      params: {}
    });

    // CONNECT PROMPT TO VIDEO
    edges.push({
      id: `e_${promptId}_${videoId}_prompt`,
      from: {
        node: promptId,
        port: 'out'
      },
      to: {
        node: videoId,
        port: 'prompt'
      }
    });
  }

  return {
    zskyflow: 1,
    nodes,
    edges
  };
};


// ---------------------------------------------------------
// EXECUTION
// ---------------------------------------------------------
const args = process.argv.slice(2);
const parsedCount = Number.parseInt(args[0], 10);

const count = Number.isFinite(parsedCount) && parsedCount > 0
  ? Math.min(parsedCount, 10000)
  : 25;

// Generate enough prompts for both outputs.
// ZSky always receives exactly 7 prompts.
const generatedPrompts = generateDroneBatch(
  Math.max(count, 7)
);

// YouTube output uses the requested count.
const youtubePrompts = generatedPrompts.slice(0, count);

// ZSky output always uses 7 prompts.
const zskyPrompts = generatedPrompts.slice(0, 7);

// Build JSON.
const youtubeOutput = JSON.stringify(
  youtubePrompts,
  null,
  2
);

const zskyOutput = JSON.stringify(
  generateZskyFlow(zskyPrompts, 7),
  null,
  2
);

// Validate both files before writing.
JSON.parse(youtubeOutput);
JSON.parse(zskyOutput);

// Write YouTube JSON.
fs.writeFileSync(
  'youtubeweek1.json',
  youtubeOutput,
  { encoding: 'utf8' }
);

// Write ZSky flow JSON.
fs.writeFileSync(
  'zsky.json',
  zskyOutput,
  { encoding: 'utf8' }
);

console.log(`Generated ${count} cinematic drone prompts.`);
console.log('YouTube JSON: ' + require('path').resolve('youtubeweek1.json'));
console.log('ZSky flow: ' + require('path').resolve('zsky.json'));
console.log('ZSky contains 7 prompt nodes, 7 video nodes and 7 edges.');
