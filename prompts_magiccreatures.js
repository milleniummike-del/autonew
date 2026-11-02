/**
 * PromptForge: Mythical & Fantastical Animal Generator
 *
 * Specializing in photorealistic cinematic fantasy wildlife:
 * Dragons, phoenixes, griffins, unicorns, sea monsters,
 * ancient beasts, mythical birds, magical mammals,
 * hybrid creatures and original fantasy species.
 *
 * Features:
 * - Detailed creature anatomy and appearance
 * - Cinematic animal movement and behaviour
 * - Fantasy environments and habitats
 * - Dynamic camera techniques
 * - Atmospheric lighting
 * - Realistic environmental audio
 * - Photorealistic visual style
 *
 * Usage:
 *   node prompts_mythical.js
 *   node prompts_mythical.js 100
 *   node prompts_mythical.js 500
 *
 * Output: matrix.json
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------
// MYTHICAL CREATURE DATABASE
// ---------------------------------------------------------

const CREATURES = [

    {
        name: 'Ancient Western Dragon',
        description: 'A colossal ancient dragon with enormous overlapping obsidian scales, powerful muscular limbs, two enormous leathery wings supported by elongated skeletal fingers, a long armored tail, backward-curving horns, razor-sharp teeth and glowing amber eyes.',
        behaviour: 'The dragon walks majestically through its territory, occasionally spreading its enormous wings, surveying the surrounding landscape and releasing a powerful stream of smoke from its nostrils.',
        habitat: 'volcanic mountain ranges, ancient dragon territories and enormous rocky caverns',
        sounds: 'deep resonating dragon breathing, powerful wing beats, distant thunderous roars and volcanic ambience'
    },

    {
        name: 'Frost Dragon',
        description: 'A magnificent ice dragon covered in translucent pale-blue crystalline scales, enormous frost-covered wings, sharp icy horns, luminous blue eyes and a long serpentine tail with crystalline spikes.',
        behaviour: 'The dragon moves gracefully across frozen terrain, its enormous wings creating swirling clouds of snow as frost forms across the surrounding rocks.',
        habitat: 'glacial valleys, frozen mountain peaks and immense polar ice formations',
        sounds: 'icy wind, deep dragon breathing, cracking ice and powerful wing movements'
    },

    {
        name: 'Golden Phoenix',
        description: 'A magnificent mythical bird with enormous layered feathers of brilliant gold, scarlet and orange, an elegant crested head, intense glowing eyes and long flowing tail feathers that shimmer like living flames.',
        behaviour: 'The phoenix spreads its enormous wings, launches gracefully into the air and circles above its territory while tiny glowing embers drift from its feathers.',
        habitat: 'ancient mountain sanctuaries, volcanic landscapes and sunlit forest clearings',
        sounds: 'powerful feather movements, exotic bird calls, distant wind and subtle crackling embers'
    },

    {
        name: 'Silver Phoenix',
        description: 'An extraordinary celestial bird with hundreds of intricate silver-white feathers, delicate crystalline wing tips, a magnificent flowing tail and luminous pale-blue eyes.',
        behaviour: 'The bird glides silently above the landscape before descending gracefully toward a rocky outcrop, its feathers catching the surrounding light.',
        habitat: 'mist-covered mountains, celestial lakes and ancient alpine forests',
        sounds: 'soft wind, delicate feather movements and distant melodic bird calls'
    },

    {
        name: 'Royal Griffin',
        description: 'A powerful mythical hybrid combining the muscular body and golden fur of a magnificent lion with the enormous feathered wings, hooked beak and sharp eyes of a golden eagle.',
        behaviour: 'The griffin stands proudly on an elevated rocky ledge, scans the valley below and spreads its wings before launching into a powerful flight.',
        habitat: 'towering mountain cliffs, ancient mountain fortresses and vast alpine valleys',
        sounds: 'eagle screeches, deep feline growls, wind and powerful wing beats'
    },

    {
        name: 'Black Griffin',
        description: 'A formidable hybrid creature with a muscular black lion body, enormous midnight-black eagle wings, a hooked dark beak, powerful talons and piercing golden eyes.',
        behaviour: 'The creature patrols a rugged mountain ridge, carefully observing its territory before leaping into the air.',
        habitat: 'dark mountain ranges, stormy cliffs and ancient ruined fortresses',
        sounds: 'deep growls, sharp eagle calls and powerful wing beats'
    },

    {
        name: 'Celestial Unicorn',
        description: 'An elegant mythical horse with a perfectly proportioned muscular equine body, flowing ivory-white mane, silky tail, luminous silver eyes and a long spiralling pearlescent horn emerging naturally from its forehead.',
        behaviour: 'The unicorn moves gracefully through the meadow, raises its head toward the sunlight and gallops through the tall grass with fluid natural equine movement.',
        habitat: 'enchanted wildflower meadows, ancient forests and mist-covered valleys',
        sounds: 'natural horse breathing, soft hoof movements, wind through grass and distant birdsong'
    },

    {
        name: 'Shadow Unicorn',
        description: 'A powerful black mythical stallion with a glossy midnight coat, flowing dark mane, muscular athletic anatomy, luminous violet eyes and a long curved obsidian horn.',
        behaviour: 'The creature walks slowly through a misty forest, pauses beneath ancient trees and suddenly accelerates into a powerful gallop.',
        habitat: 'dark enchanted forests, moonlit clearings and mist-covered mountain valleys',
        sounds: 'natural hoof impacts, horse breathing, nocturnal insects and forest ambience'
    },

    {
        name: 'Thunder Roc',
        description: 'A gigantic prehistoric bird with enormous dark-brown and bronze feathers, powerful hooked beak, massive talons, muscular legs and wings wide enough to cast an enormous shadow across the landscape.',
        behaviour: 'The enormous bird glides across the valley, circles a mountain summit and performs a powerful descending flight toward its nesting territory.',
        habitat: 'vast mountain ranges, remote deserts and enormous rocky nesting cliffs',
        sounds: 'deep bird calls, rushing wind and enormous wing beats'
    },

    {
        name: 'Ancient Sea Serpent',
        description: 'A colossal aquatic serpent with an elongated muscular body covered in dark emerald scales, enormous dorsal fins, powerful swimming muscles, luminous eyes and a crocodilian head filled with sharp teeth.',
        behaviour: 'The serpent rises partially from the ocean, coils through the water and disappears beneath the surface, leaving enormous turbulent waves behind.',
        habitat: 'deep ocean trenches, remote volcanic islands and stormy open seas',
        sounds: 'deep underwater rumbling, powerful splashing, crashing waves and distant ocean ambience'
    },

    {
        name: 'Leviathan',
        description: 'An immense primordial sea monster with an enormous whale-like body, armored dark-blue scales, gigantic fin-like appendages, a massive serpentine tail and multiple rows of ancient predatory teeth.',
        behaviour: 'The creature emerges slowly from the deep ocean, raises its enormous head above the waves and submerges with a monumental splash.',
        habitat: 'abyssal ocean depths, enormous underwater caverns and remote deep-sea trenches',
        sounds: 'deep underwater whale-like calls, powerful water movement and distant ocean rumbling'
    },

    {
        name: 'Crystal Sea Dragon',
        description: 'An elegant aquatic dragon with translucent turquoise scales, intricate crystalline fins, long flowing whiskers, luminous sapphire eyes and enormous wing-like underwater appendages.',
        behaviour: 'The creature swims gracefully through underwater caverns, turns around coral formations and moves its translucent fins in slow synchronized movements.',
        habitat: 'crystal-clear underwater caverns, ancient coral kingdoms and turquoise lagoons',
        sounds: 'underwater bubbles, gentle currents and distant aquatic animal calls'
    },

    {
        name: 'Ancient Hydra',
        description: 'A colossal reptilian monster with a heavily armored muscular body, powerful clawed legs, a thick serpentine tail and several enormous independently moving dragon-like heads with curved horns and rows of sharp teeth.',
        behaviour: 'The heads move independently while the enormous creature advances slowly through its territory, surveying the surroundings and releasing deep overlapping roars.',
        habitat: 'ancient swamps, volcanic valleys and abandoned prehistoric landscapes',
        sounds: 'multiple overlapping reptilian growls, heavy footsteps and swamp ambience'
    },

    {
        name: 'Forest Treant Beast',
        description: 'A gigantic ancient forest creature combining animal-like muscular anatomy with living tree bark, thick roots, enormous branching antlers, moss-covered shoulders and deep glowing green eyes.',
        behaviour: 'The creature moves slowly through the ancient forest, heavy root-like limbs disturbing the earth while small leaves fall from its enormous branching antlers.',
        habitat: 'primeval forests, ancient woodland clearings and enormous moss-covered valleys',
        sounds: 'creaking wood, breaking branches, heavy footsteps and forest wildlife'
    },

    {
        name: 'Moonlight Stag',
        description: 'A magnificent giant stag with a powerful athletic deer body, exceptionally detailed silver-white fur, enormous branching crystalline antlers and luminous pale-blue eyes.',
        behaviour: 'The stag walks through a mist-covered clearing, raises its head and slowly turns as moonlight illuminates its enormous antlers.',
        habitat: 'ancient forests, moonlit meadows and mist-covered woodland clearings',
        sounds: 'natural deer movements, soft hoof impacts, wind and distant nocturnal wildlife'
    },

    {
        name: 'Flame Lion',
        description: 'A gigantic majestic lion with an exceptionally muscular body, detailed dark-gold fur, an enormous flowing mane resembling naturally illuminated molten embers and intense amber eyes.',
        behaviour: 'The lion walks powerfully across a rocky landscape, shakes its enormous mane and releases a deep resonating roar.',
        habitat: 'volcanic plains, golden savannah and dramatic rocky mountain landscapes',
        sounds: 'deep lion roars, natural breathing, heavy paw movements and wind'
    },

    {
        name: 'Ice Mammoth',
        description: 'An enormous prehistoric mammoth with exceptionally thick ivory-white fur, massive curved crystalline tusks, powerful legs and frost-covered hair across its enormous head and shoulders.',
        behaviour: 'The mammoth walks slowly through deep snow, moves its enormous trunk and shakes loose snow from its thick fur.',
        habitat: 'frozen tundra, glacial valleys and ancient polar forests',
        sounds: 'deep mammoth calls, heavy footsteps in snow, icy wind and cracking ice'
    },

    {
        name: 'Crystal Wolf',
        description: 'A magnificent oversized wolf with realistic muscular canine anatomy, dense silver-white fur, intricate translucent crystalline structures along its spine and luminous icy-blue eyes.',
        behaviour: 'The wolf moves silently through the forest, pauses to observe its surroundings and then accelerates into a natural powerful run.',
        habitat: 'snow-covered forests, frozen mountain valleys and ancient woodland',
        sounds: 'natural wolf breathing, paws moving through snow, distant howling and forest ambience'
    },

    {
        name: 'Shadow Panther',
        description: 'An enormous supernatural black panther with perfectly detailed muscular feline anatomy, glossy obsidian fur, subtle violet reflections and intense luminous golden eyes.',
        behaviour: 'The panther stalks silently through dense vegetation, moves between tree trunks and emerges into a moonlit clearing.',
        habitat: 'dense tropical jungles, ancient rainforest and dark mountain forests',
        sounds: 'natural feline breathing, soft paw movements, insects and nocturnal forest ambience'
    },

    {
        name: 'Ancient Behemoth',
        description: 'A gigantic prehistoric quadrupedal beast with an enormous muscular body, thick armored hide, massive curved horns, powerful clawed feet and rough stone-like scales covering its shoulders.',
        behaviour: 'The enormous animal walks slowly across the plain, causing dust to rise beneath its heavy feet before turning its massive head toward the horizon.',
        habitat: 'vast prehistoric plains, rugged mountain foothills and ancient grasslands',
        sounds: 'deep animal breathing, enormous footsteps, distant roars and strong wind'
    },

    {
        name: 'Celestial Dragonfly',
        description: 'A gigantic fantastical insect with an intricately segmented emerald body, enormous transparent iridescent wings, delicate antennae and brilliant multifaceted eyes.',
        behaviour: 'The creature hovers above a forest pond, rapidly adjusts its transparent wings and glides between vegetation with precise insect-like movement.',
        habitat: 'enchanted wetlands, tropical rainforest pools and ancient jungle clearings',
        sounds: 'delicate wing vibrations, insects, water movement and tropical birds'
    },

    {
        name: 'Ancient Basilisk',
        description: 'A terrifying giant reptile with a muscular crocodilian body, rough emerald and bronze scales, an armored crown of horns, powerful clawed feet and piercing reptilian eyes.',
        behaviour: 'The basilisk crawls slowly across ancient stone ruins, raises its head and surveys the surrounding environment with predatory precision.',
        habitat: 'ancient ruins, desert canyons and overgrown jungle temples',
        sounds: 'heavy reptilian breathing, claws scraping stone and distant jungle ambience'
    },

    {
        name: 'Giant Moon Moth',
        description: 'An enormous mythical moth with delicate pale ivory fur, intricately patterned wings in silver and lavender, feathery antennae and subtle luminous markings across its wings.',
        behaviour: 'The moth flutters slowly through a moonlit forest, briefly settles on an ancient tree trunk and opens its enormous patterned wings.',
        habitat: 'moonlit forests, enchanted gardens and mist-covered woodland',
        sounds: 'delicate wing fluttering, soft wind and nocturnal insects'
    },

    {
        name: 'Storm Wyvern',
        description: 'A powerful two-legged winged reptilian predator with muscular hind limbs, enormous leathery wings, a long barbed tail, dark metallic scales and sharp backward-curving horns.',
        behaviour: 'The wyvern runs across a rocky ridge, launches into the air and flies through turbulent mountain winds.',
        habitat: 'storm-covered mountains, volcanic cliffs and dramatic rocky highlands',
        sounds: 'powerful wing beats, deep reptilian screeches, wind and distant thunder'
    },

    {
        name: 'Ancient Cerberus',
        description: 'A massive supernatural canine guardian with an extremely muscular black-furred body, three anatomically distinct powerful wolf-like heads, glowing amber eyes and heavy clawed paws.',
        behaviour: 'The enormous beast stands guard at an ancient stone gateway, its three heads scanning different directions before releasing overlapping deep growls.',
        habitat: 'ancient subterranean gateways, volcanic caverns and ruined stone temples',
        sounds: 'multiple deep canine growls, heavy breathing and echoes within stone chambers'
    },

    {
        name: 'Rainbow Serpent',
        description: 'A colossal elegant serpentine creature covered in iridescent scales reflecting emerald, sapphire, violet and gold, with delicate ornamental fins, luminous eyes and a long flowing tail.',
        behaviour: 'The serpent moves in graceful flowing curves through a crystal river, briefly emerging above the water before disappearing beneath the surface.',
        habitat: 'ancient tropical rivers, sacred waterfalls and lush rainforest waterways',
        sounds: 'flowing water, subtle reptilian movements and tropical forest ambience'
    },

    {
        name: 'Giant Arctic Owl',
        description: 'An enormous mythical snowy owl with intricately layered white feathers, subtle silver markings, powerful talons, a detailed hooked beak and piercing golden eyes.',
        behaviour: 'The owl sits on a frozen tree branch, rotates its head with realistic avian movement and launches into a silent powerful flight.',
        habitat: 'frozen forests, glacial cliffs and remote snowy mountain landscapes',
        sounds: 'soft wing movements, natural owl calls and icy wind'
    },

    {
        name: 'Golden Dragon Turtle',
        description: 'A gigantic mythical turtle with an enormous ancient golden armored shell, intricate scale patterns, powerful reptilian legs, a long muscular neck and a wise ancient face.',
        behaviour: 'The creature moves slowly through shallow water, raises its massive head and walks onto a rocky shoreline.',
        habitat: 'ancient tropical islands, sacred lakes and remote jungle rivers',
        sounds: 'heavy movement through water, reptilian breathing and gentle aquatic ambience'
    },

    {
        name: 'Ancient Dire Bear',
        description: 'An enormous prehistoric bear with exceptionally powerful muscular anatomy, dense dark reddish-brown fur, massive claws, a broad head and enormous predatory shoulders.',
        behaviour: 'The bear walks through dense woodland, sniffs the ground, rises briefly onto its hind legs and releases a powerful roar.',
        habitat: 'primeval forests, remote mountain valleys and ancient woodland',
        sounds: 'heavy bear breathing, deep growls, breaking branches and forest ambience'
    },

    {
        name: 'Celestial Flying Whale',
        description: 'An enormous elegant whale-like creature with realistic marine mammal anatomy, luminous pearlescent skin, delicate translucent fins and intricate glowing markings across its body.',
        behaviour: 'The enormous creature glides gracefully through the open sky, moving its massive fins slowly while drifting clouds pass around its body.',
        habitat: 'high-altitude cloud oceans, floating mountain ranges and enormous atmospheric cloud formations',
        sounds: 'deep whale-like calls, rushing wind and distant atmospheric ambience'
    },

    {
        name: 'Ancient Sand Wyrm',
        description: 'A colossal subterranean serpent with an elongated armored body, enormous overlapping bronze-colored scales, a powerful circular jaw filled with curved teeth and multiple sensory horns.',
        behaviour: 'The creature moves beneath desert sand, creating enormous travelling waves before partially emerging from the dunes.',
        habitat: 'vast desert dune seas, ancient sandstone canyons and barren volcanic deserts',
        sounds: 'shifting sand, deep subterranean rumbling and powerful reptilian breathing'
    },

    {
        name: 'Mythical Peacock',
        description: 'An enormous fantastical peacock with iridescent sapphire and emerald plumage, a magnificent crown of feathers and an extraordinarily long tail containing hundreds of detailed eye-patterned feathers.',
        behaviour: 'The bird walks elegantly through an ancient garden, raises its tail and opens its enormous feather display in a slow symmetrical movement.',
        habitat: 'ancient palace gardens, enchanted tropical forests and ornamental lakes',
        sounds: 'natural exotic bird calls, feather movements and garden ambience'
    },

    {
        name: 'Volcanic Salamander',
        description: 'A gigantic amphibious reptilian creature with detailed black volcanic scales, glowing orange mineral-like markings beneath its skin, powerful limbs and a thick muscular tail.',
        behaviour: 'The salamander crawls across volcanic rock, moves through shallow geothermal pools and raises its head toward drifting volcanic steam.',
        habitat: 'volcanic caves, geothermal pools and ancient lava fields',
        sounds: 'wet amphibian movements, bubbling water and distant volcanic rumbling'
    },

    {
        name: 'Enchanted Fox',
        description: 'An elegant mythical fox with realistic vulpine anatomy, exceptionally detailed silver and copper fur, nine long flowing tails and bright luminous amber eyes.',
        behaviour: 'The fox moves gracefully through the forest, turns its head and allows its nine tails to flow naturally as it walks.',
        habitat: 'ancient Japanese-inspired forests, bamboo groves and mist-covered mountain temples',
        sounds: 'natural fox movements, soft paws, wind through bamboo and forest birds'
    },

    {
        name: 'Ancient Megalodon',
        description: 'An enormous prehistoric shark with powerful hydrodynamic anatomy, rough dark-grey skin, enormous pectoral fins, a muscular tail and multiple rows of large triangular teeth.',
        behaviour: 'The gigantic predator swims through the deep ocean, circles a rocky underwater formation and accelerates into the open water.',
        habitat: 'deep ocean trenches, ancient underwater canyons and dark open seas',
        sounds: 'deep underwater currents, distant marine animal calls and powerful water movement'
    },

    {
        name: 'Crystal Cave Dragon',
        description: 'A magnificent subterranean dragon with reflective dark scales, intricate translucent crystal formations growing naturally along its back, enormous wings and glowing violet eyes.',
        behaviour: 'The dragon moves slowly through a vast crystal cavern, its scales reflecting the surrounding mineral formations as it spreads its wings.',
        habitat: 'enormous underground crystal caves, subterranean lakes and mineral caverns',
        sounds: 'deep dragon breathing, claws scraping stone and resonant cavern echoes'
    },

    {
        name: 'Ancient Giant Elk',
        description: 'A gigantic prehistoric elk with enormous muscular shoulders, dense dark brown fur, powerful legs and extraordinary branching antlers extending several metres above its head.',
        behaviour: 'The enormous elk walks through a forest clearing, moves its head and displays its impressive antlers against the surrounding trees.',
        habitat: 'ancient temperate forests, misty meadows and prehistoric woodland',
        sounds: 'heavy hoof movements, natural deer calls and wind through trees'
    },

    {
        name: 'Void Dragon',
        description: 'A mysterious colossal dragon with an elongated muscular body, deep midnight-black scales, subtle cosmic iridescence, enormous wings and glowing violet eyes.',
        behaviour: 'The creature emerges slowly from dense mountain fog, unfolds its enormous wings and glides above the dark landscape.',
        habitat: 'remote dark mountains, mysterious ancient valleys and storm-covered plateaus',
        sounds: 'deep resonating dragon calls, powerful wind and atmospheric environmental rumbling'
    },

    {
        name: 'Emerald Dragon',
        description: 'A majestic forest dragon covered in richly textured emerald-green scales, intricate golden horns, enormous feather-like wing membranes and bright green eyes.',
        behaviour: 'The dragon moves between enormous ancient trees, raises its head toward the canopy and spreads its wings.',
        habitat: 'primeval rainforest, ancient woodland and enormous jungle valleys',
        sounds: 'deep reptilian breathing, birdsong, leaves moving and powerful wing beats'
    },

    {
        name: 'Ancient Giant Scorpion',
        description: 'A gigantic prehistoric scorpion with an enormous segmented armored body, powerful pincers, multiple articulated legs and a long raised tail ending in a curved venomous stinger.',
        behaviour: 'The creature moves slowly across desert rock, raises its pincers and carefully advances through the sandy terrain.',
        habitat: 'ancient desert canyons, rocky badlands and subterranean caverns',
        sounds: 'articulated legs scraping rock, shifting sand and dry desert wind'
    },

    {
        name: 'Mythical Horned Owlbear',
        description: 'A massive hybrid creature with the thick muscular body and dense brown fur of a bear, the feathered facial features of an enormous owl and two powerful branching horns.',
        behaviour: 'The beast emerges from woodland vegetation, sniffs the air and walks heavily through the forest.',
        habitat: 'dense enchanted forests, ancient woodland and mountainous wilderness',
        sounds: 'deep animal breathing, heavy footsteps, owl calls and forest ambience'
    }

];

// ---------------------------------------------------------
// CINEMATIC CAMERA TECHNIQUES
// ---------------------------------------------------------

const CAMERA_TECHNIQUES = [

    {
        name: 'Epic Creature Reveal',
        description: 'Begin with an extreme close-up of a distinctive anatomical feature, then slowly pull backward to reveal the complete enormous creature and its surrounding environment.'
    },
    {
        name: 'Wildlife Documentary Tracking',
        description: 'Track parallel to the creature as it moves naturally through its habitat, maintaining realistic animal proportions and detailed environmental parallax.'
    },
    {
        name: 'Low-Angle Hero Shot',
        description: 'Position the camera close to the ground and gradually tilt upward, emphasizing the creature’s enormous physical scale and powerful anatomy.'
    },
    {
        name: 'Extreme Wide Establishing Shot',
        description: 'Show the creature within an immense landscape, emphasizing the relationship between its physical scale and the surrounding environment.'
    },
    {
        name: 'Slow Cinematic Push-In',
        description: 'Advance slowly toward the creature while maintaining precise focus on its eyes, face and distinctive anatomical details.'
    },
    {
        name: 'Side Profile Tracking',
        description: 'Move smoothly alongside the creature, capturing its complete anatomy and natural locomotion from head to tail.'
    },
    {
        name: 'Frontal Approach',
        description: 'The creature advances directly toward the camera while the camera gradually retreats, maintaining a powerful symmetrical composition.'
    },
    {
        name: 'Creature Orbit',
        description: 'Perform a slow controlled orbit around the creature, revealing its anatomy, textures, proportions and relationship with the surrounding landscape.'
    },
    {
        name: 'Overhead Wildlife Perspective',
        description: 'Look down from above as the creature moves through its environment, revealing natural movement patterns and the surrounding terrain.'
    },
    {
        name: 'Ground-Level Predator Shot',
        description: 'Film from extremely low near the ground, following the creature’s powerful legs, paws and movement through vegetation or terrain.'
    },
    {
        name: 'Winged Creature Takeoff',
        description: 'Capture the creature preparing for flight, spreading its wings, generating powerful downward air movement and launching naturally into the sky.'
    },
    {
        name: 'Aerial Creature Follow',
        description: 'Follow the flying creature from behind and slightly above, revealing the landscape beneath it while maintaining smooth continuous movement.'
    },
    {
        name: 'Face and Eye Close-Up',
        description: 'Gradually approach the creature’s face, capturing intricate eye reflections, skin textures, scales, feathers and subtle natural movements.'
    },
    {
        name: 'Environmental Scale Reveal',
        description: 'Begin behind a foreground environmental feature and smoothly reveal the creature standing within an enormous landscape.'
    },
    {
        name: 'Slow Motion Movement',
        description: 'Capture a powerful natural movement in elegant slow motion, emphasizing muscle movement, flowing fur, individual feathers and environmental particles.'
    },
    {
        name: 'Following Through Vegetation',
        description: 'Track behind the creature as it moves through dense vegetation, with foreground leaves creating realistic depth and natural parallax.'
    },
    {
        name: 'Waterline Creature Reveal',
        description: 'Begin close to the water surface before revealing an enormous aquatic creature emerging from beneath the waves.'
    },
    {
        name: 'Cinematic Side Portrait',
        description: 'Capture a detailed side portrait of the creature with shallow depth of field, emphasizing its unique silhouette and anatomical characteristics.'
    },
    {
        name: 'Natural Habitat Observation',
        description: 'Observe the creature from a respectful distance using a documentary-style composition, capturing authentic behaviour without interrupting its activity.'
    },
    {
        name: 'Epic Mountain Ascent',
        description: 'Follow the creature as it climbs a steep rocky slope, gradually revealing the surrounding mountain landscape.'
    },
    {
        name: 'Continuous Cinematic Journey',
        description: 'Follow the creature through one uninterrupted sequence of natural movement, revealing its habitat and distinctive physical characteristics without cuts.'
    }

];

// ---------------------------------------------------------
// FANTASY ENVIRONMENTS
// ---------------------------------------------------------

const ENVIRONMENTS = [

    'ancient enchanted forests with enormous twisted trees and dense emerald vegetation',
    'dramatic volcanic mountain ranges with glowing lava rivers and black volcanic rock',
    'vast snow-covered alpine mountains with frozen waterfalls and deep blue glaciers',
    'mysterious tropical jungles with enormous trees, hanging vines and mist-covered rivers',
    'ancient medieval castle ruins surrounded by dense vegetation',
    'crystal-filled underground caverns with enormous reflective mineral formations',
    'remote tropical islands surrounded by turquoise water and towering coastal cliffs',
    'vast prehistoric savannah with golden grasslands and scattered ancient trees',
    'deep underwater kingdoms with enormous coral formations and shafts of blue light',
    'mysterious moonlit forests with silver mist and ancient twisted branches',
    'vast desert landscapes with enormous sculpted dunes and dramatic sandstone formations',
    'ancient mountain valleys surrounded by towering snow-covered peaks',
    'mysterious swamps with dark reflective water, enormous roots and hanging moss',
    'dramatic ocean coastlines with enormous waves and rugged black cliffs',
    'enchanted wildflower meadows surrounded by rolling green hills',
    'ancient stone temples reclaimed by dense tropical vegetation',
    'floating mountain formations surrounded by enormous cloud seas',
    'vast glaciers and frozen polar landscapes beneath dramatic skies',
    'ancient woodland clearings illuminated by shafts of golden sunlight',
    'mysterious subterranean lakes surrounded by enormous stone formations',
    'dramatic mountain plateaus above the clouds',
    'ancient palace gardens with ornamental pools and symmetrical pathways',
    'remote rocky highlands with dramatic storm clouds',
    'prehistoric wetlands with shallow reflective water and dense aquatic vegetation',
    'enormous ancient forests during autumn with golden and crimson foliage',
    'mist-covered waterfalls surrounded by lush tropical vegetation',
    'dark volcanic caves illuminated by glowing mineral formations',
    'remote northern fjords surrounded by towering cliffs and deep reflective water',
    'ancient ruins in a vast abandoned desert city',
    'bioluminescent forests filled with naturally glowing plants and mysterious fungi'

];

// ---------------------------------------------------------
// LIGHTING AND ATMOSPHERE
// ---------------------------------------------------------

const LIGHTING = [

    'warm golden-hour sunlight with long dramatic shadows',
    'soft sunrise light filtering through dense forest mist',
    'dramatic orange sunset illuminating distant mountain peaks',
    'cool blue twilight with subtle atmospheric haze',
    'dramatic storm clouds with shafts of sunlight',
    'misty dawn with layered atmospheric perspective',
    'clear natural midday sunlight revealing intricate anatomical details',
    'soft overcast lighting with realistic surface textures',
    'volumetric sunbeams passing through enormous forest trees',
    'warm firelight illuminating the creature against a dark environment',
    'moonlight creating subtle silver highlights across the creature',
    'dramatic backlighting through atmospheric mist',
    'soft reflected light from turquoise water',
    'rich golden sunlight illuminating feathers and fur',
    'alpenglow illuminating snow-covered mountain peaks',
    'subtle bioluminescent environmental illumination',
    'deep blue underwater lighting with natural volumetric light rays',
    'dramatic lightning illuminating a distant storm',
    'soft light reflecting across crystal formations',
    'natural shadows beneath a clear atmospheric sky'

];

// ---------------------------------------------------------
// CREATURE MOVEMENT AND BEHAVIOUR
// ---------------------------------------------------------

const MOVEMENT = [

    'The creature walks slowly through its natural habitat, displaying realistic weight distribution, muscle movement and natural balance.',
    'The creature raises its head, observes the surrounding environment and turns naturally toward a distant sound.',
    'The creature moves through vegetation, causing leaves, branches and surrounding plants to react naturally to its body.',
    'The creature pauses, breathes deeply and releases a powerful natural vocalization.',
    'The creature moves from a resting position into a steady natural walk.',
    'The creature accelerates into a powerful run, maintaining realistic anatomical movement and consistent body proportions.',
    'The creature interacts naturally with water, creating realistic splashes, ripples and reflections.',
    'The creature shakes its body, causing fur, feathers or scales to move naturally.',
    'The creature raises its head and displays its impressive horns, antlers or distinctive anatomical features.',
    'The creature carefully investigates its environment using realistic head and eye movements.',
    'The creature turns slowly, revealing its complete anatomical silhouette.',
    'The creature moves through shallow water while creating realistic waves and water displacement.',
    'The creature spreads its wings and performs a controlled powerful takeoff.',
    'The creature glides through the air with natural wing movement and realistic flight dynamics.',
    'The creature descends toward the ground and lands with physically plausible weight and momentum.',
    'The creature moves through snow, leaving realistic footprints and displacing loose snow.',
    'The creature moves between rocks and uneven terrain with accurate foot placement.',
    'The creature displays natural territorial behaviour while surveying its surroundings.',
    'The creature rests beneath a tree, showing subtle breathing and natural head movement.',
    'The creature performs a distinctive species-specific movement while remaining physically believable.'
];

// ---------------------------------------------------------
// ANATOMICAL AND VISUAL DETAILS
// ---------------------------------------------------------

const ANATOMICAL_DETAILS = [

    'exceptionally detailed natural skin texture and realistic anatomical proportions',
    'individual feathers with intricate overlapping structures and physically realistic movement',
    'highly detailed fur with individual strands moving naturally in the wind',
    'complex overlapping scales with realistic reflections and surface imperfections',
    'powerful visible musculature beneath naturally textured skin',
    'detailed eyes with realistic reflections and natural blinking',
    'intricate claws, talons and anatomical joints',
    'natural body movement with accurate weight distribution',
    'highly detailed horns, antlers and skeletal structures',
    'realistic wing anatomy with flexible membranes and articulated joints',
    'intricate facial structures and physically accurate jaw movement',
    'natural breathing with subtle expansion and contraction of the chest',
    'realistic tail movement with consistent anatomical continuity',
    'fine surface imperfections, scars and natural markings',
    'realistic movement of skin, feathers, fur and scales during locomotion',
    'accurate anatomical shadows and natural subsurface light interaction',
    'physically plausible reflections across wet skin, scales and feathers',
    'consistent proportions throughout the entire sequence',
    'realistic foot contact with the terrain and physically accurate weight transfer',
    'natural eye tracking and subtle facial expressions'

];

// ---------------------------------------------------------
// CINEMATIC VISUAL ENHANCERS
// ---------------------------------------------------------

const ENHANCERS = [

    'photorealistic fantasy wildlife cinematography',
    'epic feature-film visual quality',
    'hyper-detailed creature anatomy',
    'natural and physically accurate lighting',
    'realistic animal locomotion and behaviour',
    'immersive environmental depth',
    'rich but natural cinematic color grading',
    'highly detailed textures and surface materials',
    'realistic atmospheric perspective',
    'majestic visual composition',
    'dramatic yet believable environmental contrast',
    'cinematic visual storytelling',
    'natural shadows and physically plausible reflections',
    'realistic environmental interaction',
    'authentic wildlife documentary camera language',
    'highly detailed naturalistic creature design',
    'cinematic depth of field',
    'realistic environmental particles and atmospheric effects',
    'coherent anatomical structure throughout the shot',
    'majestic sense of scale and visual spectacle'

];

// ---------------------------------------------------------
// NEGATIVE PROMPT
// ---------------------------------------------------------

const NEGATIVE_PROMPT = [

    'cartoon',
    'anime',
    'illustration',
    'comic book style',
    'toy-like appearance',
    'plastic skin',
    'low-detail textures',
    'unrealistic anatomy',
    'deformed anatomy',
    'extra limbs',
    'missing limbs',
    'duplicated body parts',
    'extra heads unless explicitly specified',
    'inconsistent number of wings',
    'deformed wings',
    'broken joints',
    'floating body parts',
    'disconnected anatomy',
    'inconsistent creature proportions',
    'morphing body',
    'changing species',
    'changing colors',
    'flickering textures',
    'unnatural movement',
    'sliding feet',
    'floating feet',
    'weightless movement',
    'rubber-like movement',
    'excessive motion blur',
    'unstable camera',
    'jittery camera movement',
    'distorted environment',
    'warped trees',
    'warped architecture',
    'unnatural lighting',
    'oversaturated colors',
    'visible humans',
    'human faces',
    'riders',
    'saddles',
    'bridles',
    'collars',
    'leashes',
    'text',
    'subtitles',
    'watermarks',
    'logos'

];

// ---------------------------------------------------------
// RANDOM HELPERS
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

// Shuffle creature database to improve variety.
const shuffle = (arr) => {

    const copy = [...arr];

    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }

    return copy;

};

// ---------------------------------------------------------
// GENERATOR
// ---------------------------------------------------------

const generateMythicalBatch = (count = 25) => {

    const shots = [];

    // Shuffle creatures so they are not generated in
    // the same order every time.
    const creaturePool = shuffle(CREATURES);

    for (let i = 0; i < count; i++) {

        // Cycle through the shuffled creature database.
        // Different combinations are used if count exceeds
        // the number of available creatures.

        const creature = creaturePool[i % creaturePool.length];

        const camera = getRandom(CAMERA_TECHNIQUES);

        const environment = creature.habitat;

        const lighting = getRandom(LIGHTING);

        const movement = getRandom(MOVEMENT);

        const technical = pickN(ANATOMICAL_DETAILS, 5);

        const enhancers = pickN(ENHANCERS, 5);

        const extraEnvironment = getRandom(ENVIRONMENTS);

        const prompt = [

            'EPIC CINEMATIC MYTHICAL WILDLIFE VIDEO',

            `CREATURE: ${creature.name}`,

            `CREATURE ANATOMY AND APPEARANCE: ${creature.description}`,

            `NATURAL HABITAT: ${environment}`,

            `ENVIRONMENTAL BACKGROUND: ${extraEnvironment}`,

            `CREATURE BEHAVIOUR: ${creature.behaviour}`,

            `PRIMARY ACTION: ${movement}`,

            `CAMERA TECHNIQUE: ${camera.name}`,

            `CAMERA MOVEMENT AND COMPOSITION: ${camera.description}`,

            `LIGHTING AND ATMOSPHERE: ${lighting}`,

            `ANATOMICAL DETAIL: ${technical.join(', ')}`,

            `VISUAL STYLE: ${enhancers.join(', ')}`,

            'CREATURE REALISM: The mythical animal must appear as a physically believable living organism, with coherent anatomy, realistic musculature, natural proportions and convincing biological movement.',

            'CREATURE IDENTITY: Maintain the exact same species, anatomy, colors, markings, number of limbs, heads, wings, horns and distinctive physical characteristics throughout the entire shot.',

            'MOVEMENT REALISM: All movement must follow natural biological mechanics, realistic weight, momentum, balance and environmental interaction.',

            'ENVIRONMENTAL INTERACTION: The creature must interact naturally with the environment. Vegetation, water, snow, dust, rocks and atmospheric particles must respond realistically to its movement.',

            'CAMERA STABILITY: Smooth professional cinematic camera movement with realistic inertia, natural acceleration and controlled framing.',

            'VISUAL REALISM: Photorealistic textures, physically accurate lighting, detailed surface materials, natural atmospheric depth and believable environmental scale.',

            'CONTINUITY: Maintain consistent creature anatomy, environmental geometry, lighting and perspective throughout the sequence. No morphing, sudden scene changes or impossible movement.',

            'FANTASY DESIGN RULE: The creature may possess extraordinary mythical features, but its body must remain anatomically coherent, visually convincing and integrated naturally into the real-world environment.',

            'AUDIO: Natural environmental ambience appropriate to the creature and habitat. Include realistic animal vocalizations, breathing, footsteps, wing beats, water movement, wind, insects and other environmental sounds. No narration, dialogue or background music.',

            `CREATURE SOUND CHARACTER: ${creature.sounds}`,

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

        : 25;

const outputPath = path.join(process.cwd(), 'matrix.json');

const output = generateMythicalBatch(count);

// Validate JSON before writing.
JSON.parse(output);

fs.writeFileSync(outputPath, output, {
    encoding: 'utf8'
});

console.log('========================================');
console.log('  PROMPTFORGE MYTHICAL ANIMALS');
console.log('========================================');

console.log(`Generated: ${count} cinematic prompts`);

console.log(`Available creatures: ${CREATURES.length}`);

console.log(`Camera techniques: ${CAMERA_TECHNIQUES.length}`);

console.log(`Environments: ${ENVIRONMENTS.length}`);

console.log(`Lighting variations: ${LIGHTING.length}`);

console.log(`Movement variations: ${MOVEMENT.length}`);

console.log(`Anatomical details: ${ANATOMICAL_DETAILS.length}`);

console.log(`Visual enhancements: ${ENHANCERS.length}`);

console.log(`Output: ${outputPath}`);

console.log('========================================');