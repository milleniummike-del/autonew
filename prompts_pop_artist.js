
/**
 * PROMPTFORGE - GENERIC MUSIC VIDEO SHOT GENERATOR
 *
 * Creates cinematic music-video prompts featuring one artist
 * whose appearance is determined entirely by a supplied reference image.
 *
 * The reference image is supplied separately to your image/video
 * generation system. Every generated prompt instructs the system
 * to preserve the identity shown in that image.
 *
 * OUTPUT:
 *   matrix.json
 *
 * USAGE:
 *
 * node prompts_pop_artist.js
 *
 * node prompts_pop_artist.js --shots=30
 *
 * node prompts_pop_artist.js --shots=40 --random
 *
 * node prompts_pop_artist.js --genre=pop --theme=summer
 *
 * node prompts_pop_artist.js --genre=electronic --theme=neon
 *
 * node prompts_pop_artist.js --genre=rock --theme=concert
 *
 * node prompts_pop_artist.js --genre=rnb --theme=cinematic
 *
 * node prompts_pop_artist.js --mood="dreamy and emotional"
 *
 * node prompts_pop_artist.js --locations="beach,rooftop,studio"
 *
 * node prompts_pop_artist.js --performance="singing and dancing"
 *
 * node prompts_pop_artist.js --duration=5 --shots=30
 *
 * node prompts_pop_artist.js --wardrobe-changes
 *
 * OPTIONS:
 *
 * --shots=30
 * --duration=5
 * --genre=pop
 * --theme=summer
 * --mood="energetic and uplifting"
 * --locations="beach,city,studio"
 * --performance="singing and dancing"
 * --random
 * --wardrobe-changes
 * --output=matrix.json
 *
 */

const fs = require('fs');
const path = require('path');

// =========================================================
// PROJECT CONFIGURATION
// =========================================================

const PROJECT = {

    title: 'AI Music Video',

    // Music genre
    genre: 'pop',

    // Overall visual theme
    theme: 'cinematic',

    // Emotional direction
    mood: 'energetic, uplifting, stylish and emotionally engaging',

    // Locations used throughout the video
    locations: [
        'a modern architectural building',
        'a beautiful coastal landscape',
        'a luxury rooftop overlooking a city',
        'a contemporary music studio',
        'a dramatic outdoor location',
        'a stylish interior with cinematic lighting',
        'a spectacular open landscape',
        'a modern performance space'
    ],

    // Artist performance direction
    performance: 'singing, expressive performance and natural movement',

    // Wardrobe changes
    wardrobeChanges: false,

    // Default shot duration
    shotDuration: 5,

    // Default number of shots
    shotCount: 30,

    // Video format
    aspectRatio: '16:9',

    // Visual production style
    visualStyle: 'photorealistic cinematic live-action music video',

    // Camera quality
    cinematography: 'professional music video cinematography',

    // Output filename
    output: 'matrix.json'

};

// =========================================================
// MUSIC GENRES
// =========================================================

const GENRES = {

    pop: {
        name: 'Contemporary Pop',
        performance: [
            'singing directly to camera',
            'stylish pop choreography',
            'expressive vocal performance',
            'natural rhythmic body movement',
            'confident artist performance'
        ],
        energy: 'polished, catchy, expressive and visually engaging',
        editing: 'rhythmic cuts, dynamic performance coverage and memorable visual moments'
    },

    dance: {
        name: 'Dance Pop',
        performance: [
            'energetic dance performance',
            'singing with rhythmic choreography',
            'stylish movement and expressive gestures',
            'confident full-body performance',
            'synchronised movement to the rhythm'
        ],
        energy: 'energetic, vibrant, rhythmic and uplifting',
        editing: 'fast rhythmic edits, dynamic camera movements and energetic transitions'
    },

    electronic: {
        name: 'Electronic Music',
        performance: [
            'expressive performance in a futuristic environment',
            'singing with atmospheric movement',
            'subtle rhythmic choreography',
            'dramatic performance surrounded by visual effects',
            'immersive performance with powerful visual presence'
        ],
        energy: 'immersive, atmospheric, futuristic and hypnotic',
        editing: 'precise rhythmic editing, dramatic visual transitions and atmospheric sequences'
    },

    edm: {
        name: 'EDM',
        performance: [
            'powerful energetic performance',
            'dancing with expressive choreography',
            'singing toward the camera',
            'celebratory movement and confident gestures',
            'dramatic performance under concert lighting'
        ],
        energy: 'euphoric, explosive, energetic and celebratory',
        editing: 'fast rhythmic cutting, dramatic build-ups and powerful chorus sequences'
    },

    rnb: {
        name: 'R&B',
        performance: [
            'intimate expressive singing',
            'smooth natural body movement',
            'subtle choreography',
            'emotional direct-to-camera performance',
            'relaxed confident performance'
        ],
        energy: 'sensual, intimate, sophisticated and expressive',
        editing: 'smooth transitions, longer close-ups and elegant camera movement'
    },

    rock: {
        name: 'Rock',
        performance: [
            'powerful expressive singing',
            'energetic stage performance',
            'confident full-body movement',
            'dramatic direct-to-camera performance',
            'intense emotional performance'
        ],
        energy: 'powerful, rebellious, dramatic and expressive',
        editing: 'energetic cuts, dramatic angles and powerful performance close-ups'
    },

    indie: {
        name: 'Indie Pop',
        performance: [
            'natural relaxed singing',
            'intimate performance',
            'casual movement through the environment',
            'expressive but understated gestures',
            'reflective performance toward camera'
        ],
        energy: 'authentic, artistic, emotional and atmospheric',
        editing: 'natural transitions, observational camera movement and cinematic compositions'
    },

    country: {
        name: 'Country Pop',
        performance: [
            'expressive singing in an open landscape',
            'natural walking performance',
            'confident relaxed movement',
            'intimate direct-to-camera singing',
            'warm emotional performance'
        ],
        energy: 'warm, uplifting, heartfelt and authentic',
        editing: 'cinematic landscapes, natural camera movement and emotional close-ups'
    },

    ambient: {
        name: 'Ambient Music',
        performance: [
            'subtle expressive movement',
            'reflective performance',
            'slow natural movement through the environment',
            'minimalist performance',
            'quiet emotional expression'
        ],
        energy: 'dreamlike, peaceful, atmospheric and contemplative',
        editing: 'slow cinematic transitions, extended shots and gentle camera movement'
    },

    afrohouse: {
        name: 'Afro House',
        performance: [
            'rhythmic expressive dancing',
            'natural flowing body movement',
            'singing with confident gestures',
            'energetic rhythmic choreography',
            'stylish performance with graceful movement'
        ],
        energy: 'rhythmic, uplifting, organic and hypnotic',
        editing: 'fluid camera movement, rhythmic cuts and expressive dance coverage'
    }

};

// =========================================================
// VISUAL THEMES
// =========================================================

const THEMES = {

    summer: {
        name: 'Summer',
        locations: [
            'a luxurious Mediterranean villa',
            'a beautiful infinity swimming pool',
            'a sunlit tropical beach',
            'a modern coastal resort',
            'a rooftop overlooking the ocean',
            'a beautiful yacht surrounded by blue water',
            'a palm-lined promenade',
            'a secluded coastal cove',
            'a modern outdoor lounge',
            'a sunlit terrace overlooking the sea'
        ],
        lighting: [
            'warm golden-hour sunlight',
            'bright natural summer sunlight',
            'soft sunrise illumination',
            'warm sunset backlighting',
            'beautiful reflected sunlight',
            'soft natural daylight'
        ],
        colours: 'warm gold, turquoise, natural whites, ocean blue and vibrant summer colours'
    },

    neon: {
        name: 'Neon Night',
        locations: [
            'a futuristic rooftop above a city',
            'a neon-lit nightclub',
            'a dark mirrored performance studio',
            'a futuristic illuminated tunnel',
            'a rain-soaked city street',
            'a luxurious penthouse at night',
            'a dramatic black stage',
            'a modern building illuminated by colourful lights'
        ],
        lighting: [
            'electric blue and magenta neon lighting',
            'dramatic violet illumination',
            'moving coloured stage lights',
            'soft cyan lighting',
            'contrasting red and blue illumination',
            'dramatic backlighting through atmospheric haze'
        ],
        colours: 'electric blue, magenta, violet, black and metallic highlights'
    },

    cinematic: {
        name: 'Cinematic',
        locations: [
            'a dramatic modern architectural space',
            'an atmospheric countryside landscape',
            'a beautiful rocky coastline',
            'a minimalist glass building',
            'a dramatic open landscape',
            'an elegant modern interior',
            'a quiet forest clearing',
            'a vast architectural corridor'
        ],
        lighting: [
            'soft cinematic daylight',
            'dramatic directional sunlight',
            'warm late-afternoon illumination',
            'cool atmospheric twilight',
            'soft natural window light',
            'cinematic backlighting'
        ],
        colours: 'natural earth tones, muted gold, deep blue and sophisticated neutrals'
    },

    concert: {
        name: 'Live Concert',
        locations: [
            'a dramatic concert stage',
            'a large indoor music venue',
            'a spectacular outdoor festival stage',
            'a dark performance arena',
            'a minimalist black stage',
            'a large stage surrounded by lighting installations'
        ],
        lighting: [
            'powerful concert spotlights',
            'moving beams of coloured stage light',
            'dramatic white backlighting',
            'deep red and blue stage illumination',
            'atmospheric stage haze and spotlights',
            'sweeping theatrical lighting'
        ],
        colours: 'deep blacks, saturated stage colours, dramatic highlights and atmospheric shadows'
    },

    nature: {
        name: 'Natural Landscapes',
        locations: [
            'a spectacular mountain landscape',
            'a secluded tropical beach',
            'a dramatic forest clearing',
            'a beautiful waterfall',
            'an open field surrounded by mountains',
            'a peaceful lakeside landscape',
            'a dramatic rocky coastline',
            'a lush tropical garden'
        ],
        lighting: [
            'soft natural morning sunlight',
            'golden-hour illumination',
            'soft overcast daylight',
            'dramatic sunset lighting',
            'natural light filtering through trees',
            'warm backlighting'
        ],
        colours: 'natural greens, earthy tones, warm gold and atmospheric blues'
    },

    urban: {
        name: 'Urban',
        locations: [
            'a modern city rooftop',
            'a stylish city street',
            'a contemporary urban plaza',
            'a dramatic underground passage',
            'a modern glass building',
            'a rooftop overlooking skyscrapers',
            'an atmospheric city alley',
            'a contemporary industrial interior'
        ],
        lighting: [
            'natural city daylight',
            'warm evening street lighting',
            'dramatic urban night lighting',
            'soft reflected window light',
            'cinematic city twilight',
            'contrasting architectural illumination'
        ],
        colours: 'concrete grey, urban blue, warm amber and contemporary neutral tones'
    },

    retro: {
        name: 'Retro',
        locations: [
            'a vintage recording studio',
            'a retro motel swimming pool',
            'a classic open-air theatre',
            'a stylish vintage lounge',
            'a retro city street',
            'a colourful modernist interior',
            'a vintage dance hall',
            'a nostalgic coastal resort'
        ],
        lighting: [
            'warm vintage film lighting',
            'soft golden illumination',
            'coloured retro practical lights',
            'warm tungsten lighting',
            'sunlit vintage film atmosphere',
            'soft nostalgic backlighting'
        ],
        colours: 'warm amber, faded red, cream, teal and nostalgic film tones'
    }

};

// =========================================================
// SHOT DATABASE
// =========================================================

const SHOTS = [

    {
        type: 'Opening Establishing Shot',
        section: 'INTRO',
        framing: 'extreme wide shot',
        action: 'Establish the location with the artist visible within the environment. The artist stands naturally, creating anticipation before the music begins.',
        camera: 'Slow cinematic forward movement toward the artist.',
        purpose: 'Introduce the artist and visual world.'
    },

    {
        type: 'Artist Introduction',
        section: 'INTRO',
        framing: 'medium shot',
        action: 'The artist turns naturally toward the camera, establishing eye contact and introducing their presence.',
        camera: 'Slow controlled push-in toward the artist.',
        purpose: 'Introduce the main performer.'
    },

    {
        type: 'Direct-to-Camera Singing',
        section: 'VERSE',
        framing: 'medium close-up',
        action: 'The artist sings directly toward the camera with expressive facial movements, natural mouth movement and confident eye contact.',
        camera: 'Smooth slow dolly-in.',
        purpose: 'Establish the vocal performance.'
    },

    {
        type: 'Full-Body Performance',
        section: 'VERSE',
        framing: 'full-body wide shot',
        action: 'The artist performs naturally in the environment, using expressive gestures and movement that follow the rhythm of the music.',
        camera: 'Slow lateral tracking movement.',
        purpose: 'Show the artist and environment.'
    },

    {
        type: 'Walking Performance',
        section: 'VERSE',
        framing: 'medium full-body shot',
        action: 'The artist walks toward the camera while performing, moving naturally through the environment.',
        camera: 'Smooth backward tracking shot.',
        purpose: 'Create a sense of movement.'
    },

    {
        type: 'Close-Up Vocal Performance',
        section: 'VERSE',
        framing: 'close-up portrait',
        action: 'The artist performs directly to the camera, with subtle emotional changes and expressive eye contact.',
        camera: 'Very slow push-in with shallow depth of field.',
        purpose: 'Connect the viewer emotionally with the artist.'
    },

    {
        type: 'Side Profile',
        section: 'VERSE',
        framing: 'close-up profile',
        action: 'The artist looks toward the surrounding environment before slowly turning toward the camera.',
        camera: 'Gentle sideways slider movement.',
        purpose: 'Provide visual variation.'
    },

    {
        type: 'Performance Orbit',
        section: 'VERSE',
        framing: 'medium shot',
        action: 'The artist performs while remaining the central subject as the camera slowly circles around them.',
        camera: 'Smooth 180-degree camera orbit.',
        purpose: 'Create dynamic performance coverage.'
    },

    {
        type: 'Chorus Performance',
        section: 'CHORUS',
        framing: 'medium close-up',
        action: 'The artist delivers the chorus with increased energy, powerful facial expression and confident performance.',
        camera: 'Dramatic forward camera movement.',
        purpose: 'Create a visual highlight.'
    },

    {
        type: 'Choreographed Movement',
        section: 'CHORUS',
        framing: 'full-body shot',
        action: 'The artist performs a stylish sequence of natural dance movements and gestures in time with the music.',
        camera: 'Smooth gimbal orbit with controlled lateral movement.',
        purpose: 'Add rhythm and physical energy.'
    },

    {
        type: 'Slow Motion Performance',
        section: 'CHORUS',
        framing: 'medium close-up',
        action: 'The artist moves gracefully in slow motion while continuing the performance. Hair and clothing respond naturally to movement.',
        camera: 'Slow cinematic tracking movement.',
        purpose: 'Create a memorable visual moment.'
    },

    {
        type: 'Expressive Facial Close-Up',
        section: 'VERSE',
        framing: 'extreme close-up',
        action: 'The artist looks directly into the lens while performing, revealing subtle changes in expression.',
        camera: 'Almost imperceptible forward camera movement.',
        purpose: 'Emphasise identity and emotion.'
    },

    {
        type: 'Environmental Performance',
        section: 'VERSE',
        framing: 'wide cinematic shot',
        action: 'The artist performs within the larger environment, using natural movement while remaining clearly visible.',
        camera: 'Slow crane or elevated camera movement.',
        purpose: 'Show the relationship between artist and location.'
    },

    {
        type: 'Back-to-Camera Reveal',
        section: 'VERSE',
        framing: 'medium rear three-quarter shot',
        action: 'The artist initially faces away from the camera before slowly turning around and beginning the performance.',
        camera: 'Slow camera approach followed by a gentle arc.',
        purpose: 'Create a cinematic reveal.'
    },

    {
        type: 'Low Angle Hero Shot',
        section: 'CHORUS',
        framing: 'low-angle medium shot',
        action: 'The artist performs confidently, looking toward the camera with a powerful and expressive presence.',
        camera: 'Controlled low-angle push-in.',
        purpose: 'Create a strong hero image.'
    },

    {
        type: 'High Angle Performance',
        section: 'CHORUS',
        framing: 'high-angle wide shot',
        action: 'The artist moves through the environment while looking upward toward the camera.',
        camera: 'Smooth overhead crane movement.',
        purpose: 'Introduce a different visual perspective.'
    },

    {
        type: 'Reflective Performance',
        section: 'BRIDGE',
        framing: 'medium shot',
        action: 'The artist performs near a reflective surface, with natural reflections contributing to the composition.',
        camera: 'Low camera angle with slow forward movement.',
        purpose: 'Create visual depth and atmosphere.'
    },

    {
        type: 'Silhouette Performance',
        section: 'BRIDGE',
        framing: 'medium silhouette shot',
        action: 'The artist performs against a bright or illuminated background, creating a dramatic silhouette.',
        camera: 'Slow controlled push toward the subject.',
        purpose: 'Create a dramatic visual transition.'
    },

    {
        type: 'Natural Candid Moment',
        section: 'VERSE',
        framing: 'medium portrait',
        action: 'The artist briefly smiles, looks away from the camera and moves naturally through the environment.',
        camera: 'Subtle handheld-style gimbal tracking.',
        purpose: 'Add authentic personality.'
    },

    {
        type: 'Hair and Movement Detail',
        section: 'CHORUS',
        framing: 'medium close-up',
        action: 'Capture the natural movement of the artist hair and clothing as they turn and perform.',
        camera: 'Slow-motion lateral tracking.',
        purpose: 'Create visual texture and movement.'
    },

    {
        type: 'Hands and Gesture Detail',
        section: 'VERSE',
        framing: 'close-up detail shot',
        action: 'The artist makes expressive hand gestures while performing, with the composition gradually revealing the face.',
        camera: 'Smooth tilt upward from hands to face.',
        purpose: 'Add detail to the performance.'
    },

    {
        type: 'Location Transition',
        section: 'INTERLUDE',
        framing: 'wide environmental shot',
        action: 'Show the artist moving through the environment, with the surroundings providing a natural transition to the next scene.',
        camera: 'Smooth lateral tracking or crane movement.',
        purpose: 'Connect different visual locations.'
    },

    {
        type: 'Emotional Bridge Performance',
        section: 'BRIDGE',
        framing: 'close-up',
        action: 'The artist delivers a more intimate and emotionally expressive performance, with subtle movement and sustained eye contact.',
        camera: 'Slow intimate push-in.',
        purpose: 'Create emotional contrast.'
    },

    {
        type: 'Final Chorus Hero Shot',
        section: 'FINAL CHORUS',
        framing: 'medium full-body shot',
        action: 'The artist performs with maximum energy and confidence, using expressive movement and strong stage presence.',
        camera: 'Dynamic controlled orbit followed by a forward push.',
        purpose: 'Deliver the visual climax.'
    },

    {
        type: 'Final Chorus Close-Up',
        section: 'FINAL CHORUS',
        framing: 'tight close-up',
        action: 'The artist sings directly toward the camera with intense emotion and expressive facial performance.',
        camera: 'Slow dramatic push-in.',
        purpose: 'Emphasise the final vocal climax.'
    },

    {
        type: 'Celebratory Performance',
        section: 'FINAL CHORUS',
        framing: 'full-body wide shot',
        action: 'The artist moves freely and confidently in the environment, expressing the energy of the music.',
        camera: 'Smooth wide gimbal movement.',
        purpose: 'Create an uplifting visual moment.'
    },

    {
        type: 'Artist Walking Away',
        section: 'OUTRO',
        framing: 'wide rear shot',
        action: 'The artist walks away from the camera through the environment as the music begins to conclude.',
        camera: 'Slow pullback while maintaining the artist within the composition.',
        purpose: 'Create a visual ending.'
    },

    {
        type: 'Final Portrait',
        section: 'OUTRO',
        framing: 'close-up portrait',
        action: 'The artist pauses, looks directly into the camera and holds a natural expressive gaze.',
        camera: 'Steady close-up with minimal movement.',
        purpose: 'Finish with a memorable artist portrait.'
    },

    {
        type: 'Final Environmental Reveal',
        section: 'OUTRO',
        framing: 'extreme wide shot',
        action: 'The camera slowly reveals the entire environment, with the artist remaining visible as the central figure.',
        camera: 'Slow crane or aerial-style pullback without showing filming equipment.',
        purpose: 'Provide a cinematic final image.'
    }

];

// =========================================================
// COMMAND LINE ARGUMENTS
// =========================================================

function parseArgs() {

    const args = process.argv.slice(2);

    const options = {};

    for (const arg of args) {

        if (!arg.startsWith('--')) continue;

        const value = arg.substring(2);

        const separator = value.indexOf('=');

        if (separator === -1) {

            options[value] = true;

        } else {

            const key = value.substring(0, separator);

            const val = value.substring(separator + 1);

            options[key] = val.replace(/^["']|["']$/g, '');

        }

    }

    return options;

}

// =========================================================
// RANDOM HELPERS
// =========================================================

function randomItem(array) {

    return array[Math.floor(Math.random() * array.length)];

}

function shuffle(array) {

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];

    }

    return result;

}

// =========================================================
// MUSIC SECTION SEQUENCING
// =========================================================

function getMusicSection(index, total) {

    const position = index / total;

    if (position < 0.10) return 'INTRO';

    if (position < 0.32) return 'VERSE';

    if (position < 0.52) return 'CHORUS';

    if (position < 0.68) return 'VERSE';

    if (position < 0.80) return 'BRIDGE';

    if (position < 0.95) return 'FINAL CHORUS';

    return 'OUTRO';

}

// =========================================================
// GET PROJECT SETTINGS
// =========================================================

function getSettings() {

    const args = parseArgs();

    const genreKey = String(args.genre || PROJECT.genre).toLowerCase();

    const themeKey = String(args.theme || PROJECT.theme).toLowerCase();

    const genre = GENRES[genreKey] || GENRES.pop;

    const theme = THEMES[themeKey] || THEMES.cinematic;

    const count = Math.max(
        1,
        Math.min(200, parseInt(args.shots || PROJECT.shotCount, 10) || PROJECT.shotCount)
    );

    const duration = Math.max(
        1,
        Math.min(30, parseInt(args.duration || PROJECT.shotDuration, 10) || PROJECT.shotDuration)
    );

    let locations = args.locations
        ? args.locations.split(',').map(x => x.trim()).filter(Boolean)
        : PROJECT.locations;

    if (!args.locations) {

        locations = theme.locations;

    }

    const performance = args.performance || PROJECT.performance;

    const mood = args.mood || PROJECT.mood;

    const wardrobeChanges = args['wardrobe-changes'] !== undefined
        ? true
        : PROJECT.wardrobeChanges;

    const random = args.random !== undefined;

    const output = args.output || PROJECT.output;

    return {
        genreKey,
        themeKey,
        genre,
        theme,
        count,
        duration,
        locations,
        performance,
        mood,
        wardrobeChanges,
        random,
        output
    };

}

// =========================================================
// BUILD ARTIST REFERENCE INSTRUCTIONS
// =========================================================

function buildArtistReference() {

    return [

        'ARTIST REFERENCE IMAGE - PRIMARY IDENTITY SOURCE',

        'Use the artist reference image supplied separately to this generation system as the definitive visual reference for the lead performer.',

        'The reference image determines the artist identity. Do not invent or assume any physical characteristics that are not supported by the reference.',

        'IDENTITY PRESERVATION:',

        'Preserve the same recognisable individual shown in the supplied reference image.',

        'Maintain consistent facial structure, face shape, eyes, nose, mouth, skin tone, hairstyle, hair colour, apparent age and physical characteristics.',

        'Do not change the artist into a different person.',

        'Do not reinterpret, beautify, stylise or redesign the artist.',

        'Do not arbitrarily change gender presentation, ethnicity, age appearance, hairstyle or other recognisable features.',

        'Keep the artist visually consistent throughout every shot in the music video.',

        'SINGLE ARTIST RULE:',

        'There must be exactly one featured artist in the shot.',

        'Do not introduce additional singers, performers, backup dancers, band members, crowds or unrelated background people.',

        'Do not create duplicate versions of the artist.',

        'Reflections must not resemble additional people.'

    ].join('\n');

}

// =========================================================
// BUILD WARDROBE INSTRUCTIONS
// =========================================================

function buildWardrobeInstruction(settings, index) {

    if (settings.wardrobeChanges) {

        return [

            'WARDROBE:',

            'The artist may wear a different outfit in this shot.',

            'Choose clothing that suits the music genre, location, mood and visual direction.',

            'Clothing must remain realistic, stylish and appropriate for the scene.',

            'Changing clothing must never alter the artist identity or physical appearance.',

            'Avoid logos, readable text and distracting accessories.'

        ].join('\n');

    }

    return [

        'WARDROBE CONTINUITY:',

        'Maintain consistent clothing and accessories throughout the music video.',

        'Use the clothing visible in the artist reference image as the initial wardrobe reference.',

        'Do not invent unnecessary clothing changes between shots.',

        'Preserve the artist identity and overall styling.'

    ].join('\n');

}

// =========================================================
// BUILD SHOT PROMPT
// =========================================================


function generateShot(index, shot, settings) {

    const location = randomItem(settings.locations);
    const lighting = randomItem(settings.theme.lighting);
    const genrePerformance = randomItem(settings.genre.performance);
    const musicSection = getMusicSection(index, settings.count);

    const prompt = [
        `Create a ${settings.duration}-second ${PROJECT.visualStyle} for the ${settings.genre.name} music video "${PROJECT.title}".`,
        
        `The scene takes place at ${location}, featuring the artist shown in the supplied reference image as the sole featured performer. Preserve the artist's exact recognisable identity, facial structure, skin tone, hairstyle, hair colour, apparent age and physical characteristics. Do not reinterpret or redesign the person.`,
        
        `Scene direction: ${shot.action} The artist should perform with ${settings.mood.toLowerCase()} energy, combining ${settings.performance} with ${genrePerformance}. The performance should feel natural, expressive and appropriate to the music.`,
        
        `Composition: ${shot.framing}. ${shot.purpose} Camera movement: ${shot.camera} Maintain clear visual focus on the artist with realistic camera optics, natural depth of field and professional composition.`,
        
        `Lighting: ${lighting}. Colour palette: ${settings.theme.colours}. Use realistic lighting, natural shadows, accurate skin tones and sophisticated cinematic colour grading.`,
        
        `Visual direction: ${settings.genre.energy}. Editing style: ${settings.genre.editing}. The shot should feel like part of one professionally directed music video, creating visual variety while maintaining continuity with the other scenes.`,
        
        `Performance and motion: Use believable facial expressions, natural blinking, realistic body movement and physically plausible gestures. If singing, show natural mouth movement corresponding to a vocal performance. If dancing, use fluid and believable choreography. Hair and clothing should respond naturally to movement and environmental conditions.`,
        
        buildWardrobeInstruction(settings, index),
        
        `Identity and continuity: Use exactly one artist, based on the supplied reference image. Maintain the same face, hairstyle, physical characteristics and overall identity throughout the entire video. Do not introduce additional singers, performers, dancers, crowds or duplicate versions of the artist.`,
        
        `Production quality: Photorealistic live-action appearance, ${PROJECT.aspectRatio} aspect ratio, professional music video cinematography, realistic human anatomy, detailed textures, natural reflections and cinematic lighting. No cartoon appearance, illustration or artificial beauty filters.`,
        
        `Audio: The supplied music track will be used as the soundtrack. Do not add dialogue, narration or unrelated vocals. The artist's visual performance should correspond naturally to the music.`,
        
        `Avoid: different person, changing face, inconsistent identity, altered facial features, changing hairstyle, changing skin tone, duplicate artist, multiple performers, additional people, backup dancers, crowds, deformed face, distorted eyes, unnatural mouth, incorrect lip movement, extra limbs, malformed hands, fused fingers, unnatural anatomy, plastic skin, cartoon, anime, illustration, unstable camera, jitter, flickering, warped architecture, excessive motion blur, text, subtitles, watermarks and logos.`
    ];

    return {
        shot_number: index + 1,
        shot_type: shot.type,
        music_section: musicSection,
        duration_seconds: settings.duration,
        location,
        camera_framing: shot.framing,
        camera_movement: shot.camera,
        artist_performance: settings.performance,
        in_frame_still_prompt: prompt.join(' ').replace(/\s+/g, ' ').trim()
    };
}


// =========================================================
// GENERATE COMPLETE STORYBOARD
// =========================================================

function generateStoryboard(settings) {

    let shotPool = settings.random
        ? shuffle(SHOTS)
        : [...SHOTS];

    const shots = [];

    for (let i = 0; i < settings.count; i++) {

        if (i > 0 && i % shotPool.length === 0) {

            shotPool = settings.random
                ? shuffle(SHOTS)
                : [...SHOTS];

        }

        const shot = shotPool[i % shotPool.length];

        shots.push(
            generateShot(i, shot, settings)
        );

    }

    return {

        project: PROJECT.title,

        generator: 'PromptForge Generic Music Video Generator',

        reference_image_required: true,

        reference_image_instruction:
            'Supply the artist reference image separately to the image/video generation system. Use it as the identity reference for every shot.',

        genre: settings.genre.name,

        theme: settings.theme.name,

        mood: settings.mood,

        performance_style: settings.performance,

        wardrobe_changes: settings.wardrobeChanges,

        aspect_ratio: PROJECT.aspectRatio,

        shot_duration_seconds: settings.duration,

        shot_count: shots.length,

        estimated_video_duration_seconds:
            shots.length * settings.duration,

        random_shot_order: settings.random,

        shots

    };

}

// =========================================================
// VALIDATE OUTPUT
// =========================================================

function validateOutput(data) {

    if (!data || !Array.isArray(data.shots)) {

        throw new Error('Invalid storyboard: shots array is missing.');

    }

    if (data.shots.length === 0) {

        throw new Error('No shots were generated.');

    }

    data.shots.forEach((shot, index) => {

        if (!shot.in_frame_still_prompt) {

            throw new Error(
                `Shot ${index + 1} is missing in_frame_still_prompt.`
            );

        }

    });

    return true;

}

// =========================================================
// MAIN
// =========================================================

function main() {

    console.log('');
    console.log('============================================');
    console.log('   PROMPTFORGE MUSIC VIDEO GENERATOR');
    console.log('============================================');
    console.log('');

    const settings = getSettings();

    console.log('GENRE:              ', settings.genre.name);

    console.log('THEME:              ', settings.theme.name);

    console.log('MOOD:               ', settings.mood);

    console.log('PERFORMANCE:        ', settings.performance);

    console.log('SHOTS:              ', settings.count);

    console.log('SHOT DURATION:      ', settings.duration, 'seconds');

    console.log('WARDROBE CHANGES:   ', settings.wardrobeChanges);

    console.log('RANDOM ORDER:       ', settings.random);

    console.log('OUTPUT:             ', settings.output);

    console.log('');

    const storyboard = generateStoryboard(settings);

    validateOutput(storyboard);

    const outputPath = path.resolve(process.cwd(), settings.output);

    fs.writeFileSync(
        outputPath,
        JSON.stringify(storyboard, null, 2),
        'utf8'
    );

    console.log('============================================');

    console.log('STORYBOARD GENERATED SUCCESSFULLY');

    console.log('============================================');

    console.log('Total shots:        ', storyboard.shot_count);

    console.log(
        'Estimated duration: ',
        storyboard.estimated_video_duration_seconds,
        'seconds'
    );

    console.log('Output file:        ', outputPath);

    console.log('============================================');

    console.log('');

}

// =========================================================
// RUN
// =========================================================

try {

    main();

} catch (error) {

    console.error('');

    console.error('GENERATION ERROR:');

    console.error(error.message);

    console.error('');

    process.exitCode = 1;

}
