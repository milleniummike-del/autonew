/**
 * PromptForge: Epic Aerial & Drone Cinematography Generator
 *
 * Specializing in cinematic aerial views of:
 * Landscapes, architecture, cities, nature, coastlines,
 * mountains, forests, deserts, rivers, islands and ruins.
 *
 * IMPORTANT:
 * The camera is airborne, but no drone, aircraft, helicopter,
 * or filming equipment may appear in the generated footage.
 *
 * Usage:
 *   node prompts_aerial.js
 *   node prompts_aerial.js 100
 *
 * Output: matrix.json
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------
// AERIAL SHOT TECHNIQUES - 50 CINEMATIC IDEAS
// ---------------------------------------------------------

const AERIAL_SHOTS = [
  {
    name: 'Epic Aerial Reveal',
    description: 'Begin close behind a foreground ridge or treetop, then rise smoothly above the obstruction to reveal an immense cinematic landscape stretching toward the distant horizon.'
  },
  {
    name: 'High-Altitude Establishing Shot',
    description: 'A sweeping elevated aerial perspective reveals the entire landscape, emphasizing geographical scale, natural patterns, distant mountain ranges and atmospheric depth.'
  },
  {
    name: 'Vertical Bird’s-Eye View',
    description: 'The camera looks straight down from high above, revealing intricate geometric patterns, winding roads, rivers, rooftops, coastlines or forest formations.'
  },
  {
    name: 'Low Aerial Flyover',
    description: 'The camera flies smoothly above the terrain at low altitude, passing over treetops, rocky formations or coastal vegetation while preserving a strong sense of forward motion.'
  },
  {
    name: 'Cinematic Mountain Pass',
    description: 'The airborne camera travels through a vast mountain valley between towering peaks, revealing layered ridgelines, dramatic elevation changes and distant atmospheric haze.'
  },
  {
    name: 'Coastal Cliff Tracking',
    description: 'The camera tracks parallel to towering sea cliffs, revealing crashing waves, rugged rock formations, white foam and deep-blue ocean water below.'
  },
  {
    name: 'Island Orbit',
    description: 'The camera performs a smooth cinematic orbit around a remote island, gradually revealing beaches, turquoise shallows, dense vegetation and the surrounding open ocean.'
  },
  {
    name: 'Volcanic Crater Flyover',
    description: 'The camera advances above a vast volcanic crater, revealing dramatic caldera walls, mineral-colored terrain, atmospheric vapor and immense geological scale.'
  },
  {
    name: 'Waterfall Descent',
    description: 'The camera descends smoothly beside a monumental waterfall, following the falling water toward the mist-filled basin while revealing the surrounding cliffs and vegetation.'
  },
  {
    name: 'River Valley Follow',
    description: 'The camera follows the natural curves of a winding river through forests, cliffs and open plains, maintaining a fluid forward trajectory above the waterway.'
  },
  {
    name: 'Forest Canopy Glide',
    description: 'The camera glides just above an immense forest canopy, passing over textured treetops as sunlight and atmospheric mist create layers of cinematic depth.'
  },
  {
    name: 'Rainforest Emergence',
    description: 'The camera rises slowly from within dense tropical canopy, revealing an endless rainforest stretching toward distant hills beneath humid morning mist.'
  },
  {
    name: 'Desert Dune Sweep',
    description: 'The camera sweeps low above enormous sculpted sand dunes, following their flowing ridgelines as long shadows reveal intricate patterns across the desert.'
  },
  {
    name: 'Desert Canyon Traverse',
    description: 'The camera travels through a monumental desert canyon, passing layered sandstone walls and revealing winding rock formations illuminated by warm directional sunlight.'
  },
  {
    name: 'Glacier Expedition Flyover',
    description: 'The camera advances above a vast glacier, revealing deep blue crevasses, fractured ice formations, snow-covered peaks and immense frozen terrain.'
  },
  {
    name: 'Alpine Lake Reveal',
    description: 'The camera rises above a forested shoreline to reveal a crystal-clear alpine lake surrounded by towering mountains, mirrored reflections and atmospheric mist.'
  },
  {
    name: 'Ocean Reef Top-Down',
    description: 'A directly overhead aerial perspective reveals intricate coral formations, turquoise lagoons, sandbars and contrasting patterns beneath exceptionally clear shallow water.'
  },
  {
    name: 'Tropical Beach Approach',
    description: 'The camera advances from open ocean toward an untouched tropical beach, revealing translucent waves, pale sand, palm-lined shores and lush inland vegetation.'
  },
  {
    name: 'Wavefront Coastal Flyover',
    description: 'The camera moves parallel to the coastline just above the surf, following waves as they break against the shore and leave intricate patterns of white foam.'
  },
  {
    name: 'Archipelago Panorama',
    description: 'The camera glides high above a scattered archipelago, revealing dozens of islands, submerged reefs, turquoise channels and distant blue ocean horizons.'
  },
  {
    name: 'Ancient Castle Approach',
    description: 'The camera advances toward a monumental medieval castle from above the surrounding landscape, gradually revealing its towers, defensive walls, courtyards and dramatic position on elevated terrain.'
  },
  {
    name: 'Castle Spiral Orbit',
    description: 'The camera circles a magnificent historic castle in a smooth ascending spiral, revealing layered towers, stone battlements, courtyards and the countryside beyond.'
  },
  {
    name: 'Cathedral Roof Reveal',
    description: 'The camera rises above surrounding rooftops to reveal an immense Gothic cathedral, emphasizing pointed spires, flying buttresses, ornate rooflines and the historic city below.'
  },
  {
    name: 'Ancient Temple Flyover',
    description: 'The camera glides above an ancient monumental temple complex, revealing symmetrical courtyards, monumental staircases, stone columns and intricate architectural geometry.'
  },
  {
    name: 'Historic City Center Orbit',
    description: 'The camera performs a wide, smooth orbit around a historic city center, revealing dense rooftops, landmark buildings, narrow streets and the broader urban landscape.'
  },
  {
    name: 'Skyscraper Canyon Pass',
    description: 'The camera moves through a wide, unobstructed corridor between monumental skyscrapers, emphasizing vertical scale, reflective glass facades and deep urban perspective.'
  },
  {
    name: 'Modern Skyline Ascent',
    description: 'The camera rises steadily above a modern city skyline, revealing illuminated towers, layered architecture and a vast urban horizon beneath atmospheric evening light.'
  },
  {
    name: 'City Grid Top-Down',
    description: 'A vertical aerial view reveals an intricate city grid, intersecting avenues, rooftops, plazas and geometric urban patterns extending toward the horizon.'
  },
  {
    name: 'Golden-Hour City Flyover',
    description: 'The camera glides above a sprawling city during golden hour, capturing warm reflections across windows, long architectural shadows and atmospheric sunlight.'
  },
  {
    name: 'Nighttime Urban Panorama',
    description: 'The camera sweeps above a vast city after dark, revealing illuminated skyscrapers, intricate street networks, glowing bridges and atmospheric pools of light.'
  },
  {
    name: 'Bridge Crossing Reveal',
    description: 'The camera approaches and passes above a monumental bridge, revealing its structural geometry, sweeping cables, support towers and the river or coastline beneath.'
  },
  {
    name: 'Harbor and Marina Panorama',
    description: 'The camera moves above a large natural harbor, revealing piers, waterfront architecture, breakwaters and intricate patterns across the surrounding water.'
  },
  {
    name: 'Ancient Ruins Discovery',
    description: 'The camera emerges above dense vegetation to reveal a vast ancient ruin complex, emphasizing weathered stone structures, overgrown courtyards and the relationship between architecture and wilderness.'
  },
  {
    name: 'Cliffside Monastery Reveal',
    description: 'The camera approaches a remote monastery built against a dramatic cliff face, revealing its stone buildings, terraces and immense surrounding mountain scenery.'
  },
  {
    name: 'Palace Garden Symmetry',
    description: 'A directly overhead camera glides above an elaborate palace garden, revealing symmetrical pathways, geometric hedges, ornamental pools and carefully arranged landscape patterns.'
  },
  {
    name: 'Architectural Axis Flyover',
    description: 'The camera travels along the central axis of a monumental architectural complex, revealing aligned buildings, grand courtyards and strong symmetrical perspective.'
  },
  {
    name: 'Snow-Covered Forest Flyover',
    description: 'The camera glides above a vast snow-covered forest, revealing dark evergreen treetops, white clearings, frozen streams and distant winter mountains.'
  },
  {
    name: 'Autumn Forest Canopy',
    description: 'The camera sweeps above an expansive autumn forest, revealing intricate patterns of gold, amber, orange and crimson foliage beneath soft directional sunlight.'
  },
  {
    name: 'Flowering Valley Panorama',
    description: 'The camera rises above a vast wildflower-covered valley, revealing colorful natural patterns, rolling hills and distant mountain ranges beneath clear atmospheric light.'
  },
  {
    name: 'Rolling Hills Tracking',
    description: 'The camera follows the contours of rolling green hills, creating flowing foreground movement and revealing layered ridges that fade into the distant horizon.'
  },
  {
    name: 'Farmland Geometry',
    description: 'A high aerial camera reveals vast agricultural landscapes, geometric fields, winding country roads and contrasting crop patterns stretching toward distant hills.'
  },
  {
    name: 'Waterway Through Wetlands',
    description: 'The camera follows a winding wetland channel from above, revealing intricate waterways, marsh vegetation, reflective pools and expansive natural floodplains.'
  },
  {
    name: 'Savannah Wildlife Panorama',
    description: 'The camera glides high above an immense African savannah, revealing scattered acacia trees, winding dry riverbeds, golden grasslands and distant wildlife herds.'
  },
  {
    name: 'Coastal Fjord Traverse',
    description: 'The camera travels through a monumental fjord between steep mountain walls, revealing deep reflective water, waterfalls, rugged cliffs and distant peaks.'
  },
  {
    name: 'Lava Field Flyover',
    description: 'The camera moves above a dramatic volcanic landscape, revealing textured black lava formations, mineral-colored earth and immense geological patterns.'
  },
  {
    name: 'Cloud Sea Mountain Reveal',
    description: 'The camera rises above a mountain ridge to reveal a vast sea of clouds flowing between peaks, with distant summits emerging through soft golden light.'
  },
  {
    name: 'Mist-Shrouded Valley Descent',
    description: 'The camera descends slowly into a deep green valley filled with drifting mist, revealing forested slopes, winding rivers and layered mountains.'
  },
  {
    name: 'Storm Front Landscape Sweep',
    description: 'The camera sweeps above a dramatic wilderness landscape beneath towering storm clouds, revealing moving cloud shadows, distant rain curtains and powerful atmospheric depth.'
  },
  {
    name: 'Sunset Horizon Pullback',
    description: 'The camera steadily pulls backward and upward from a striking landscape feature, revealing an immense panorama silhouetted against a glowing sunset horizon.'
  },
  {
    name: 'Continuous Grand Aerial Journey',
    description: 'A seamless cinematic aerial journey advances over foreground terrain, rises above a ridge, crosses a broad valley and reveals a monumental distant landscape without cuts or abrupt transitions.'
  }
];

// ---------------------------------------------------------
// ENVIRONMENTS
// ---------------------------------------------------------

const ENVIRONMENTS = [
  'dramatic mountain ranges and deep valleys',
  'ancient forests and immense woodland canopies',
  'remote tropical islands and turquoise lagoons',
  'rugged coastlines and towering sea cliffs',
  'vast deserts with sculpted sand dunes',
  'medieval castles and historic stone architecture',
  'Gothic cathedrals and historic European cities',
  'ancient temples and monumental ruins',
  'modern skyscrapers and sprawling metropolitan skylines',
  'alpine lakes and snow-covered mountain peaks',
  'glaciers and frozen polar landscapes',
  'winding rivers and expansive wetlands',
  'volcanic craters and black lava fields',
  'vast African savannah and natural wildlife habitats',
  'dramatic canyons and layered sandstone formations',
  'remote villages surrounded by mountains',
  'monumental bridges and waterfront architecture',
  'geometric gardens and grand palace grounds',
  'rolling countryside and patchwork agricultural fields',
  'misty valleys and cloud-covered mountain ridges',
  'coral reefs and shallow tropical seas',
  'dense rainforest and remote jungle rivers',
  'snow-covered evergreen forests',
  'dramatic fjords and rocky northern coastlines'
];

// ---------------------------------------------------------
// LIGHTING AND ATMOSPHERE
// ---------------------------------------------------------

const LIGHTING = [
  'warm golden-hour sunlight with long dramatic shadows',
  'soft sunrise light breaking across the horizon',
  'deep orange sunset illuminating distant mountain peaks',
  'cool blue twilight with subtle atmospheric haze',
  'dramatic storm clouds with shafts of sunlight',
  'misty dawn with layered atmospheric perspective',
  'clear midday sunlight with crisp natural details',
  'soft overcast light revealing intricate surface textures',
  'volumetric sunbeams passing through clouds',
  'warm light illuminating ancient stone architecture',
  'moonlit landscape with subtle silver highlights',
  'city lights glowing beneath a deep blue evening sky',
  'fog drifting through valleys and around mountain ridges',
  'sunlight reflecting across rivers and coastal water',
  'distant rain curtains beneath a dramatic sky',
  'alpenglow illuminating snow-covered mountain peaks',
  'thin atmospheric haze separating distant landscape layers',
  'soft post-rain light with reflective surfaces',
  'dramatic backlighting through coastal mist',
  'rich natural colors beneath a clear atmospheric sky'
];

// ---------------------------------------------------------
// AERIAL CAMERA TECHNICAL DETAILS
// ---------------------------------------------------------

const TECHNICAL_DETAILS = [
  'smooth stabilized aerial movement with physically plausible acceleration',
  'wide-angle aerial perspective with natural spatial depth',
  'long-lens compression emphasizing distant mountain layers',
  'controlled banking movement with a stable horizon',
  'gradual altitude changes with continuous forward momentum',
  'realistic parallax between foreground terrain and distant scenery',
  'deep focus preserving landscape and architectural detail',
  'natural motion blur consistent with camera speed',
  'subtle cinematic lens flare from genuine light sources',
  'realistic atmospheric perspective with progressively softer distant details',
  'precise framing with balanced foreground, middle ground and background',
  'smooth gimbal-like stabilization without artificial jitter',
  'natural exposure transitions across bright sky and shadowed terrain',
  'realistic reflections across water, windows and polished stone',
  'subtle volumetric haze without obscuring the primary subject',
  'continuous horizon control during turns and elevation changes',
  'high-detail textures with realistic perspective and scale',
  'cinematic wide composition with strong leading lines',
  'gradual reveal of architectural details through changing perspective',
  'consistent environmental geometry without warping or morphing'
];

// ---------------------------------------------------------
// CINEMATIC ENHANCERS
// ---------------------------------------------------------

const ENHANCERS = [
  'epic cinematic scale',
  'photorealistic aerial cinematography',
  'feature-film visual quality',
  'natural and physically accurate lighting',
  'realistic landscape geometry',
  'immersive environmental depth',
  'rich but natural cinematic color grading',
  'highly detailed terrain and architecture',
  'realistic water and cloud formations',
  'majestic visual composition',
  'natural atmospheric perspective',
  'monumental sense of scale',
  'authentic architectural proportions',
  'realistic vegetation patterns',
  'dramatic yet believable environmental contrast',
  'cinematic visual storytelling',
  'natural shadows and physically plausible reflections',
  'coherent continuous camera movement',
  'realistic terrain and surface textures',
  'grand establishing-shot composition'
];

// ---------------------------------------------------------
// NEGATIVE PROMPT
// ---------------------------------------------------------

const NEGATIVE_PROMPT = [
  'visible drone',
  'drone body',
  'drone propellers',
  'drone shadow',
  'drone reflection',
  'aircraft',
  'airplane',
  'helicopter',
  'glider',
  'hot-air balloon',
  'visible camera rig',
  'filming equipment',
  'pilot',
  'cockpit',
  'wings',
  'propellers',
  'selfie drone footage',
  'fisheye distortion',
  'warped buildings',
  'bent skyscrapers',
  'distorted architecture',
  'morphing terrain',
  'unnatural perspective',
  'excessive motion blur',
  'unstable horizon',
  'jittery camera movement',
  'cartoon',
  'illustration',
  'oversaturated colors',
  'text',
  'watermarks',
  'logos'
];

// ---------------------------------------------------------
// HELPERS
// ---------------------------------------------------------

const getRandom = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const pickN = (arr, n) => {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, Math.min(n, copy.length));
};

// ---------------------------------------------------------
// GENERATOR
// ---------------------------------------------------------

const generateAerialBatch = (count = 20) => {
  const shots = [];

  for (let i = 0; i < count; i++) {
    const shot = getRandom(AERIAL_SHOTS);
    const environment = getRandom(ENVIRONMENTS);
    const lighting = getRandom(LIGHTING);
    const technical = pickN(TECHNICAL_DETAILS, 3);
    const enhancers = pickN(ENHANCERS, 4);

    const prompt = [
      'EPIC CINEMATIC AERIAL VIDEO',
      `SHOT TECHNIQUE: ${shot.name}`,
      `CAMERA MOVEMENT AND COMPOSITION: ${shot.description}`,
      `ENVIRONMENT: ${environment}`,
      `LIGHTING AND ATMOSPHERE: ${lighting}`,
      `CAMERA TECHNICAL DETAILS: ${technical.join(', ')}`,
      `VISUAL STYLE: ${enhancers.join(', ')}`,
      'CAMERA PERSPECTIVE: airborne camera viewpoint, as if captured by a professional cinematic aerial camera',
      'CAMERA STABILITY: smooth, controlled, continuous motion with realistic inertia, natural acceleration and physically plausible turns',
      'VISUAL REALISM: photorealistic terrain, accurate architecture, realistic vegetation, natural atmospheric depth and physically correct light',
      'CONTINUITY: maintain consistent terrain, buildings, coastlines and landscape geometry throughout the shot; no morphing, sudden scene changes or impossible camera movement',
      'AIRBORNE CAMERA RULE: the camera itself must remain completely invisible; show only the landscape, architecture, nature and environment being filmed',
      'EXCLUSION RULE: absolutely no visible drones, aircraft, airplanes, helicopters, propellers, filming rigs, camera equipment, shadows or reflections of filming equipment',
      'AUDIO: natural environmental ambience appropriate to the location, including wind, distant birds, flowing water, ocean surf or subtle city ambience; no narration or music',
      `NEGATIVE PROMPT: ${NEGATIVE_PROMPT.join(', ')}`
    ].join(' - ');

    shots.push({
      in_frame_still_prompt: prompt
    });
  }

  return JSON.stringify({ shots }, null, 2);
};

// ---------------------------------------------------------
// EXECUTION
// ---------------------------------------------------------

const args = process.argv.slice(2);
const parsedCount = Number.parseInt(args[0], 10);

const count =
  Number.isInteger(parsedCount) && parsedCount > 0
    ? parsedCount
    : 20;

const outputPath = path.join(process.cwd(), 'matrix.json');
const output = generateAerialBatch(count);

// Validate JSON before writing.
JSON.parse(output);

fs.writeFileSync(outputPath, output, { encoding: 'utf8' });

console.log(`🎬 Generated ${count} epic aerial prompts successfully.`);
console.log(`📷 Available cinematic techniques: ${AERIAL_SHOTS.length}`);
console.log(`🌍 Available environments: ${ENVIRONMENTS.length}`);
console.log(`📁 Output: ${outputPath}`);
