/**
 * PromptForge: Worldwide Wild Animal Generator CLI
 * Specializing in wildlife from every continent and major habitat.
 *
 * Usage:
 *   node prompts_animals_world.js
 *   node prompts_animals_world.js 100
 *
 * Output: matrix.json
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------
// WORLDWIDE ECOLOGICAL GROUPS
// ---------------------------------------------------------
const ECOLOGICAL_GROUPS = [
  {
    label: 'African Savannah Wildlife',
    species: [
      'African Lion (Panthera leo)',
      'African Elephant (Loxodonta africana)',
      'Leopard (Panthera pardus)',
      'Cheetah (Acinonyx jubatus)',
      'Spotted Hyena (Crocuta crocuta)',
      'African Wild Dog (Lycaon pictus)',
      'Giraffe (Giraffa camelopardalis)',
      'Plains Zebra (Equus quagga)',
      'White Rhinoceros (Ceratotherium simum)',
      'Hippopotamus (Hippopotamus amphibius)',
      'Warthog (Phacochoerus africanus)',
      'Meerkat (Suricata suricatta)',
      'Cape Buffalo (Syncerus caffer)',
      'Secretary Bird (Sagittarius serpentarius)',
      'Ostrich (Struthio camelus)'
    ],
    behaviors: [
      'stalking prey through tall golden grass',
      'walking slowly across the open savannah',
      'hunting with focused attention',
      'drinking at a natural watering hole',
      'running powerfully across the plains',
      'grazing peacefully in a large herd',
      'interacting naturally with its young',
      'watching the surrounding landscape alertly',
      'dust bathing beneath the afternoon sun',
      'moving through dry grass as dust rises around its feet'
    ],
    habitats: [
      'vast African savannah with scattered acacia trees',
      'golden grasslands of the Serengeti',
      'African riverbank surrounded by wild vegetation',
      'dry plains beneath distant mountains',
      'sunlit African woodland',
      'natural watering hole in the African wilderness'
    ]
  },

  {
    label: 'Asian Wildlife',
    species: [
      'Bengal Tiger (Panthera tigris tigris)',
      'Snow Leopard (Panthera uncia)',
      'Asian Elephant (Elephas maximus)',
      'Giant Panda (Ailuropoda melanoleuca)',
      'Red Panda (Ailurus fulgens)',
      'Orangutan (Pongo)',
      'Gibbon (Hylobatidae)',
      'Macaque Monkey (Macaca)',
      'Indian Rhinoceros (Rhinoceros unicornis)',
      'Sloth Bear (Melursus ursinus)',
      'Golden Snub-nosed Monkey (Rhinopithecus roxellana)',
      'Komodo Dragon (Varanus komodoensis)',
      'King Cobra (Ophiophagus hannah)',
      'Malayan Tapir (Tapirus indicus)',
      'Clouded Leopard (Neofelis nebulosa)'
    ],
    behaviors: [
      'moving stealthily through dense vegetation',
      'climbing a tree in search of food',
      'foraging naturally among fallen leaves',
      'walking along a remote mountain trail',
      'resting beneath the shade of tropical trees',
      'crossing a shallow forest stream',
      'searching the forest floor for insects',
      'interacting naturally with members of its group',
      'emerging slowly from the forest shadows',
      'looking alertly toward a distant sound'
    ],
    habitats: [
      'tropical forests of Southeast Asia',
      'bamboo forests of southwestern China',
      'Indian jungle beside a winding river',
      'Himalayan mountain wilderness',
      'mist-covered forests of Borneo',
      'remote Indonesian island woodland',
      'dense Himalayan foothill vegetation'
    ]
  },

  {
    label: 'North American Wildlife',
    species: [
      'American Black Bear (Ursus americanus)',
      'Grizzly Bear (Ursus arctos horribilis)',
      'Gray Wolf (Canis lupus)',
      'North American Cougar (Puma concolor)',
      'American Bison (Bison bison)',
      'Moose (Alces alces)',
      'White-tailed Deer (Odocoileus virginianus)',
      'American Alligator (Alligator mississippiensis)',
      'Bald Eagle (Haliaeetus leucocephalus)',
      'Raccoon (Procyon lotor)',
      'North American Beaver (Castor canadensis)',
      'Coyote (Canis latrans)',
      'Pronghorn (Antilocapra americana)',
      'Canada Lynx (Lynx canadensis)',
      'Snowshoe Hare (Lepus americanus)'
    ],
    behaviors: [
      'foraging among fallen leaves',
      'walking through a misty forest',
      'running across an open meadow',
      'hunting along a forest edge',
      'swimming through a cold mountain river',
      'climbing over fallen tree trunks',
      'searching for food beneath the snow',
      'standing alertly in tall grass',
      'flying above a remote wilderness lake',
      'moving cautiously through thick woodland'
    ],
    habitats: [
      'dense forests of the Pacific Northwest',
      'Rocky Mountain wilderness',
      'vast North American grasslands',
      'Canadian boreal forest',
      'Florida wetlands and cypress swamps',
      'Alaskan tundra',
      'snow-covered northern woodland',
      'remote wilderness beside a glacial lake'
    ]
  },

  {
    label: 'South American Wildlife',
    species: [
      'Jaguar (Panthera onca)',
      'Giant Anteater (Myrmecophaga tridactyla)',
      'Capybara (Hydrochoerus hydrochaeris)',
      'Giant Otter (Pteronura brasiliensis)',
      'Three-toed Sloth (Bradypus)',
      'Howler Monkey (Alouatta)',
      'Spider Monkey (Ateles)',
      'Tapir (Tapirus terrestris)',
      'Harpy Eagle (Harpia harpyja)',
      'Scarlet Macaw (Ara macao)',
      'Toucan (Ramphastos)',
      'Green Anaconda (Eunectes murinus)',
      'Pink River Dolphin (Inia geoffrensis)',
      'Black Caiman (Melanosuchus niger)',
      'Maned Wolf (Chrysocyon brachyurus)'
    ],
    behaviors: [
      'moving through dense rainforest undergrowth',
      'swinging between branches high in the canopy',
      'swimming through a winding tropical river',
      'foraging for fruit among rainforest trees',
      'resting on a branch above the forest floor',
      'hunting quietly along a riverbank',
      'grazing in a flooded grassland',
      'climbing a moss-covered tree trunk',
      'diving beneath the surface of dark water',
      'emerging from the mist along a jungle trail'
    ],
    habitats: [
      'Amazon rainforest floor',
      'lush Amazonian riverbanks',
      'Pantanal tropical wetlands',
      'Brazilian Cerrado grasslands',
      'Andean cloud forest',
      'flooded rainforest beneath towering trees',
      'remote South American jungle',
      'misty tropical forest canopy'
    ]
  },

  {
    label: 'European Wildlife',
    species: [
      'Red Deer (Cervus elaphus)',
      'European Brown Bear (Ursus arctos)',
      'Eurasian Lynx (Lynx lynx)',
      'Red Fox (Vulpes vulpes)',
      'Gray Wolf (Canis lupus)',
      'European Badger (Meles meles)',
      'European Bison (Bison bonasus)',
      'Wild Boar (Sus scrofa)',
      'Alpine Ibex (Capra ibex)',
      'Chamois (Rupicapra rupicapra)',
      'European Otter (Lutra lutra)',
      'Golden Eagle (Aquila chrysaetos)',
      'European Hedgehog (Erinaceus europaeus)',
      'Eurasian Beaver (Castor fiber)',
      'Barn Owl (Tyto alba)'
    ],
    behaviors: [
      'walking through a quiet woodland',
      'searching for food among autumn leaves',
      'running through a wildflower meadow',
      'climbing a rocky mountain slope',
      'hunting at the edge of a forest',
      'crossing a shallow woodland stream',
      'grazing peacefully in an alpine meadow',
      'emerging from dense undergrowth',
      'flying silently over open countryside',
      'standing alertly in the early morning mist'
    ],
    habitats: [
      'ancient European deciduous forest',
      'remote Alpine mountain wilderness',
      'Scottish Highland moorland',
      'Carpathian mountain woodland',
      'European wetlands and riverbanks',
      'snow-covered Scandinavian forest',
      'sunlit Mediterranean scrubland',
      'misty countryside meadow'
    ]
  },

  {
    label: 'Australian and Oceanian Wildlife',
    species: [
      'Red Kangaroo (Osphranter rufus)',
      'Koala (Phascolarctos cinereus)',
      'Common Wombat (Vombatus ursinus)',
      'Platypus (Ornithorhynchus anatinus)',
      'Dingo (Canis familiaris dingo)',
      'Emu (Dromaius novaehollandiae)',
      'Southern Cassowary (Casuarius casuarius)',
      'Tasmanian Devil (Sarcophilus harrisii)',
      'Quokka (Setonix brachyurus)',
      'Saltwater Crocodile (Crocodylus porosus)',
      'Frilled-neck Lizard (Chlamydosaurus kingii)',
      'Laughing Kookaburra (Dacelo novaeguineae)',
      'Sugar Glider (Petaurus breviceps)',
      'Kiwi (Apteryx)',
      'New Zealand Fur Seal (Arctocephalus forsteri)'
    ],
    behaviors: [
      'hopping across dry open ground',
      'climbing a eucalyptus tree',
      'foraging among native plants',
      'walking through red desert dust',
      'swimming in a clear freshwater stream',
      'hunting beside a tropical river',
      'moving through dense coastal vegetation',
      'resting on a sun-warmed tree branch',
      'searching the ground for insects',
      'emerging from a hollow log'
    ],
    habitats: [
      'vast Australian red desert',
      'eucalyptus woodland',
      'Australian tropical rainforest',
      'remote Outback grassland',
      'Tasmanian temperate forest',
      'New Zealand native woodland',
      'rocky Australian coastline',
      'tropical wetlands of northern Australia'
    ]
  },

  {
    label: 'Arctic and Polar Wildlife',
    species: [
      'Polar Bear (Ursus maritimus)',
      'Arctic Fox (Vulpes lagopus)',
      'Arctic Wolf (Canis lupus arctos)',
      'Reindeer (Rangifer tarandus)',
      'Musk Ox (Ovibos moschatus)',
      'Walrus (Odobenus rosmarus)',
      'Ringed Seal (Pusa hispida)',
      'Bearded Seal (Erignathus barbatus)',
      'Arctic Hare (Lepus arcticus)',
      'Snowy Owl (Bubo scandiacus)',
      'Emperor Penguin (Aptenodytes forsteri)',
      'Adelie Penguin (Pygoscelis adeliae)',
      'Weddell Seal (Leptonychotes weddellii)',
      'Leopard Seal (Hydrurga leptonyx)',
      'Antarctic Fur Seal (Arctocephalus gazella)'
    ],
    behaviors: [
      'walking across windswept snow',
      'hunting along the edge of sea ice',
      'running over a frozen tundra',
      'resting on a floating ice floe',
      'diving beneath icy ocean water',
      'moving together across the snowy landscape',
      'searching for food beside a frozen shoreline',
      'sliding across smooth ice',
      'standing against blowing snow',
      'emerging from a snow-covered den'
    ],
    habitats: [
      'Arctic tundra beneath a pale sky',
      'frozen Arctic coastline',
      'vast Greenland ice fields',
      'Antarctic sea ice',
      'snow-covered polar wilderness',
      'remote Svalbard glaciers',
      'wind-swept Antarctic shoreline',
      'icy northern ocean'
    ]
  },

  {
    label: 'Desert and Dryland Wildlife',
    species: [
      'Dromedary Camel (Camelus dromedarius)',
      'Bactrian Camel (Camelus bactrianus)',
      'Fennec Fox (Vulpes zerda)',
      'Sand Cat (Felis margarita)',
      'Addax Antelope (Addax nasomaculatus)',
      'Arabian Oryx (Oryx leucoryx)',
      'Meerkat (Suricata suricatta)',
      'Gila Monster (Heloderma suspectum)',
      'Desert Tortoise (Gopherus agassizii)',
      'Sidewinder Rattlesnake (Crotalus cerastes)',
      'Jerboa (Dipodidae)',
      'Dromedary Gazelle (Gazella dorcas)',
      'Greater Roadrunner (Geococcyx californianus)',
      'Secretary Bird (Sagittarius serpentarius)',
      'Black-backed Jackal (Lupulella mesomelas)'
    ],
    behaviors: [
      'walking across wind-sculpted dunes',
      'searching for food among desert shrubs',
      'running over sun-baked sand',
      'hiding in the shade of a rocky outcrop',
      'moving cautiously across dry terrain',
      'digging a burrow in loose sand',
      'drinking at a rare desert water source',
      'stalking prey across a rocky plain',
      'crossing the desert at dawn',
      'emerging from shelter after sunset'
    ],
    habitats: [
      'Sahara Desert dunes',
      'Arabian Peninsula rocky desert',
      'Namib Desert sand plains',
      'Kalahari dry grassland',
      'Mojave Desert scrubland',
      'Australian desert wilderness',
      'Sonoran Desert cactus landscape',
      'remote semi-arid African plains'
    ]
  },

  {
    label: 'Marine and Coastal Wildlife',
    species: [
      'Blue Whale (Balaenoptera musculus)',
      'Humpback Whale (Megaptera novaeangliae)',
      'Orca (Orcinus orca)',
      'Bottlenose Dolphin (Tursiops truncatus)',
      'Great White Shark (Carcharodon carcharias)',
      'Whale Shark (Rhincodon typus)',
      'Green Sea Turtle (Chelonia mydas)',
      'Loggerhead Sea Turtle (Caretta caretta)',
      'Sea Otter (Enhydra lutris)',
      'Harbor Seal (Phoca vitulina)',
      'African Penguin (Spheniscus demersus)',
      'Atlantic Puffin (Fratercula arctica)',
      'Manta Ray (Mobula birostris)',
      'Giant Pacific Octopus (Enteroctopus dofleini)',
      'Saltwater Crocodile (Crocodylus porosus)'
    ],
    behaviors: [
      'surfacing to breathe in open water',
      'leaping through ocean spray',
      'swimming gracefully beneath the waves',
      'hunting naturally in coastal waters',
      'diving beneath a breaking ocean swell',
      'gliding above a coral reef',
      'moving through a kelp forest',
      'resting on a remote rocky shoreline',
      'searching for food along the seabed',
      'riding the current through clear blue water'
    ],
    habitats: [
      'open Pacific Ocean',
      'Atlantic coastal waters',
      'tropical coral reef',
      'kelp forests off the Pacific coast',
      'remote rocky ocean shoreline',
      'shallow tropical lagoon',
      'cold North Atlantic waters',
      'deep blue ocean beneath the surface'
    ]
  },

  {
    label: 'Birds of the World',
    species: [
      'Bald Eagle (Haliaeetus leucocephalus)',
      'Golden Eagle (Aquila chrysaetos)',
      'Harpy Eagle (Harpia harpyja)',
      'Peregrine Falcon (Falco peregrinus)',
      'Snowy Owl (Bubo scandiacus)',
      'Scarlet Macaw (Ara macao)',
      'Toucan (Ramphastos)',
      'Shoebill (Balaeniceps rex)',
      'Secretary Bird (Sagittarius serpentarius)',
      'Flamingo (Phoenicopterus)',
      'Great Hornbill (Buceros bicornis)',
      'Blue-footed Booby (Sula nebouxii)',
      'Kingfisher (Alcedinidae)',
      'Andean Condor (Vultur gryphus)',
      'Superb Bird of Paradise (Lophorina superba)'
    ],
    behaviors: [
      'soaring on thermal currents above the landscape',
      'diving toward water to catch a fish',
      'perching on a branch and scanning the surroundings',
      'displaying elaborate courtship feathers',
      'gliding above rugged mountain cliffs',
      'taking flight from a wetland',
      'hunting quietly from an exposed perch',
      'flapping through the forest canopy',
      'walking slowly through shallow water',
      'landing on a windswept rocky ledge'
    ],
    habitats: [
      'remote mountain cliffs',
      'tropical rainforest canopy',
      'African freshwater wetlands',
      'North American wilderness lake',
      'South American cloud forest',
      'coastal seabird colony',
      'open grassland beneath a vast sky',
      'misty forest at sunrise'
    ]
  }
];

// ---------------------------------------------------------
// LIGHTING
// ---------------------------------------------------------
const LIGHTING = [
  'soft golden sunrise illuminating the landscape',
  'warm sunset light casting long natural shadows',
  'sunlight filtering through trees',
  'soft diffused light on an overcast day',
  'dramatic storm clouds with natural cinematic contrast',
  'cool blue light before sunrise',
  'misty dawn with atmospheric depth',
  'bright midday sunlight with realistic shadows',
  'gentle backlighting outlining fur and feathers',
  'moonlight illuminating the nocturnal wilderness',
  'rain falling under soft natural light',
  'golden-hour light reflecting across water'
];

// ---------------------------------------------------------
// CAMERA AND CINEMATIC MODIFIERS
// ---------------------------------------------------------
const MODIFIERS = [
  'professional wildlife documentary cinematography',
  'low-angle ground-level wildlife shot',
  'slow-motion capture of natural movement',
  'long-lens telephoto wildlife photography',
  'smooth cinematic tracking shot',
  'macro close-up revealing natural fur and skin textures',
  'wide establishing shot of the animal in its habitat',
  'shallow depth of field with a naturally sharp subject',
  'camera positioned at the animal eye level',
  'steady observational documentary camera',
  'close-up portrait with detailed natural eye reflections',
  'slow camera push-in toward the animal',
  'silhouette shot against the natural landscape',
  'water-level tracking shot',
  'distant aerial landscape shot with animals visible below'
];

// ---------------------------------------------------------
// VISUAL ENHANCERS
// ---------------------------------------------------------
const ENHANCERS = [
  'photorealistic wildlife documentary',
  'highly detailed natural fur, feathers, scales and skin',
  'realistic animal anatomy and proportions',
  'natural animal movement and authentic behavior',
  'cinematic color grading with true-to-life colors',
  'realistic environmental textures',
  'immersive natural atmosphere',
  'subtle atmospheric haze and depth',
  'physically realistic lighting and shadows',
  'lifelike eyes and natural reflections',
  'authentic wilderness documentary aesthetic',
  'detailed natural habitat and vegetation',
  'realistic water, dust, snow or foliage movement',
  'no artificial-looking textures',
  'naturalistic cinematic composition'
];

// ---------------------------------------------------------
// NEGATIVE PROMPT
// ---------------------------------------------------------
const NEGATIVE_PROMPT = [
  'cartoon',
  'animation',
  'illustration',
  'fantasy creatures',
  'unnatural anatomy',
  'extra limbs',
  'duplicated animals',
  'deformed faces',
  'unnatural movement',
  'plastic-looking fur',
  'oversaturated colors',
  'text',
  'watermarks',
  'logos',
  'cages',
  'zoos',
  'human interference',
  'unnatural interaction between species'
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
const generateWorldwideBatch = (count = 25) => {
  const shots = [];

  for (let i = 0; i < count; i++) {
    const group = getRandom(ECOLOGICAL_GROUPS);
    const species = getRandom(group.species);
    const behavior = getRandom(group.behaviors);
    const habitat = getRandom(group.habitats);
    const lighting = getRandom(LIGHTING);
    const camera = pickN(MODIFIERS, 3);
    const enhancers = pickN(ENHANCERS, 4);

    const prompt = [
      'WILDLIFE CINEMATIC VIDEO',
      `SPECIES: ${species}`,
      `ECOLOGICAL GROUP: ${group.label}`,
      `BEHAVIOR: ${behavior}`,
      `HABITAT: ${habitat}`,
      `LIGHTING: ${lighting}`,
      `CAMERA: ${camera.join(', ')}`,
      `VISUAL STYLE: ${enhancers.join(', ')}`,
      'REALISM: anatomically accurate animal, natural movement, believable environmental interaction, authentic wildlife documentary footage',
      'CONTINUITY: one consistent animal subject, stable anatomy, coherent movement, realistic environmental physics',
      'ENVIRONMENT: wild natural habitat, no captivity, no human-made objects unless naturally present in the environment',
      'AUDIO: authentic environmental ambience, natural wind, water, vegetation and appropriate animal calls; no narration or music',
      `NEGATIVE: ${NEGATIVE_PROMPT.join(', ')}`
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
const count = Number.isInteger(parsedCount) && parsedCount > 0
  ? parsedCount
  : 25;

const outputPath = path.join(process.cwd(), 'matrix.json');
const output = generateWorldwideBatch(count);

// Validate generated JSON before writing.
JSON.parse(output);

fs.writeFileSync(outputPath, output, { encoding: 'utf8' });

console.log(`🌍 Generated ${count} worldwide wildlife prompts successfully.`);
console.log(`📁 Output: ${outputPath}`);