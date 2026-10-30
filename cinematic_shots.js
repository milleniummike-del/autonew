const CINEMATIC_SHOTS = [
    {
        name: "Extreme Wide Establishing Shot",
        description: "An extreme wide-angle establishing shot reveals the vast environment, with the subject appearing small against the surrounding landscape, emphasizing scale and isolation."
    },
    {
        name: "Wide Tracking Shot",
        description: "A wide cinematic tracking shot follows the subject through the environment, maintaining spatial context while preserving natural movement and background detail."
    },
    {
        name: "Medium Shot",
        description: "A medium shot frames the subject from the waist up, balancing body language, facial expression, and environmental context."
    },
    {
        name: "Medium Close-Up",
        description: "A medium close-up frames the subject from the chest upward, emphasizing subtle expressions and gestures while retaining a softly detailed background."
    },
    {
        name: "Extreme Close-Up",
        description: "An extreme close-up isolates a small but significant detail, revealing intricate textures, tiny movements, and shallow-depth-of-field separation."
    },
    {
        name: "Low-Angle Hero Shot",
        description: "The camera looks upward from below the subject, creating an imposing, powerful composition with strong foreground presence and dramatic perspective."
    },
    {
        name: "High-Angle Shot",
        description: "The camera looks down from an elevated position, revealing the subject's relationship to the surroundings and creating a sense of vulnerability or scale."
    },
    {
        name: "Bird's-Eye View",
        description: "A directly overhead camera looks vertically down on the scene, creating graphic compositions, geometric patterns, and clearly defined spatial relationships."
    },
    {
        name: "Worm's-Eye View",
        description: "The camera sits almost at ground level and points upward, exaggerating foreground scale and making nearby objects feel monumental."
    },
    {
        name: "Dutch Angle",
        description: "The camera rolls off the horizontal axis to create a deliberate diagonal horizon, introducing visual tension, instability, and psychological unease."
    },
    {
        name: "Over-the-Shoulder Shot",
        description: "The camera frames the scene from behind one foreground shoulder, using layered depth and partial foreground obstruction to establish spatial relationships."
    },
    {
        name: "Point-of-View Shot",
        description: "The camera adopts the subject's apparent viewpoint, directing attention toward the immediate environment with natural perspective and immersive framing."
    },
    {
        name: "Profile Shot",
        description: "A clean side-profile composition captures the subject in silhouette or three-quarter detail, emphasizing contours, movement, and separation from the background."
    },
    {
        name: "Three-Quarter Angle",
        description: "The camera views the subject from a three-quarter angle, revealing multiple planes and creating natural dimensionality, depth, and visual interest."
    },
    {
        name: "Silhouette Shot",
        description: "The subject is rendered as a recognizable dark silhouette against a brighter background, using controlled exposure and strong negative space."
    },
    {
        name: "Slow Dolly In",
        description: "The camera moves smoothly forward toward the subject on a dolly, gradually increasing visual intimacy and drawing attention toward the focal point."
    },
    {
        name: "Slow Dolly Out",
        description: "The camera steadily retreats from the subject, revealing more of the surroundings and creating emotional distance or a gradual environmental reveal."
    },
    {
        name: "Lateral Tracking Shot",
        description: "The camera travels sideways parallel to the moving subject, maintaining consistent screen position while the background creates parallax."
    },
    {
        name: "Follow Shot",
        description: "The camera follows behind the subject at a consistent distance, preserving forward momentum and revealing the environment as the subject advances."
    },
    {
        name: "Lead Shot",
        description: "The camera moves backward in front of the approaching subject, keeping the subject framed while the environment unfolds behind them."
    },
    {
        name: "Orbit Shot",
        description: "The camera performs a smooth circular orbit around the subject, revealing changing perspectives, spatial depth, and dimensional background parallax."
    },
    {
        name: "180-Degree Arc Shot",
        description: "The camera sweeps through a controlled half-circle around the subject, transitioning from one side to the other while maintaining visual continuity."
    },
    {
        name: "Crane Up",
        description: "The camera rises smoothly on a crane or jib, gradually revealing more of the landscape and expanding the scale of the composition."
    },
    {
        name: "Crane Down",
        description: "The camera descends from an elevated viewpoint toward the subject, transitioning from a broad environmental view into a more intimate composition."
    },
    {
        name: "Pedestal Movement",
        description: "The camera moves vertically upward or downward without tilting, changing its height while maintaining a consistent viewing direction."
    },
    {
        name: "Whip Pan",
        description: "The camera rapidly pans horizontally, producing controlled directional motion blur and transitioning energetically toward a new point of interest."
    },
    {
        name: "Tilt Reveal",
        description: "The camera tilts vertically from a low or high starting point to reveal the subject progressively, creating anticipation and emphasizing scale."
    },
    {
        name: "Handheld Documentary",
        description: "Subtle handheld camera movement introduces organic micro-shake, responsive reframing, and an observational documentary aesthetic without obscuring the subject."
    },
    {
        name: "Steadicam Walkthrough",
        description: "A stabilized moving camera glides through the environment at human height, combining fluid movement with natural perspective and continuous spatial awareness."
    },
    {
        name: "Gimbal Pursuit Shot",
        description: "A stabilized gimbal camera pursues the subject with fluid acceleration and controlled directional changes, maintaining clear subject tracking."
    },
    {
        name: "FPV Drone Dive",
        description: "A fast first-person-view drone descends through a spacious, unobstructed environment, combining dynamic forward motion, controlled banking, and strong depth cues."
    },
    {
        name: "Aerial Reveal",
        description: "An aerial camera rises and moves forward from behind a foreground obstruction, revealing an expansive landscape in a continuous cinematic movement."
    },
    {
        name: "Parallax Push",
        description: "The camera pushes forward past foreground objects while the background shifts at a different apparent speed, creating pronounced layered depth."
    },
    {
        name: "Rack Focus",
        description: "Focus transitions smoothly from a foreground subject to a background subject, or vice versa, redirecting attention while maintaining a fixed camera position."
    },
    {
        name: "Shallow Depth of Field",
        description: "A wide-aperture lens isolates the subject with a narrow plane of sharp focus and naturally defocused foreground and background elements."
    },
    {
        name: "Deep Focus",
        description: "A carefully composed deep-focus image maintains useful sharpness from foreground to background, allowing multiple layers of action to remain legible."
    },
    {
        name: "Telephoto Compression",
        description: "A long focal-length lens compresses apparent distances between foreground and background, producing a layered composition with a flatter perspective."
    },
    {
        name: "Wide-Angle Perspective",
        description: "A wide-angle lens exaggerates near-to-far distances, expands the visible environment, and gives foreground subjects strong spatial presence."
    },
    {
        name: "Macro Lens Detail",
        description: "A macro lens captures intricate surface details, fine textures, droplets, dust particles, and tiny movements with precise close-focus rendering."
    },
    {
        name: "Anamorphic Cinematic Look",
        description: "An anamorphic-inspired lens rendering creates a wide cinematic composition, oval out-of-focus highlights, subtle horizontal flares, and controlled edge distortion."
    },
    {
        name: "Slow Motion",
        description: "The action is captured at a high frame rate and played back slowly, revealing fine movement, suspended particles, flowing fabric, splashes, and subtle physical reactions."
    },
    {
        name: "Speed Ramp",
        description: "Playback speed transitions smoothly from normal speed into slow motion and back again, emphasizing a key action while preserving a coherent sense of momentum."
    },
    {
        name: "Dolly Zoom",
        description: "The camera dollies forward or backward while zooming in the opposite direction, changing background perspective dramatically while keeping the subject approximately the same size."
    },
    {
        name: "Crash Zoom",
        description: "A rapid lens zoom drives attention toward a specific detail, creating an abrupt visual emphasis with energetic framing and controlled motion blur."
    },
    {
        name: "Long Take",
        description: "A continuous, uninterrupted camera movement follows the action through multiple spatial layers, preserving real-time continuity and immersive environmental detail."
    },
    {
        name: "Foreground Wipe",
        description: "The camera moves behind a nearby object that briefly fills the frame, creating a natural visual wipe before revealing the next part of the scene."
    },
    {
        name: "Backlit Atmospheric Shot",
        description: "Strong backlighting illuminates mist, airborne dust, fine spray, or smoke, creating volumetric light rays and a pronounced separation between subject and background."
    },
    {
        name: "Lens Flare Composition",
        description: "A bright light source grazes the lens, producing restrained optical flare, subtle veiling glare, and realistic highlights without obscuring important details."
    },
    {
        name: "Reflection Shot",
        description: "The camera composes the subject through a reflective surface such as still water, glass, or polished stone, using layered reflections and controlled focus."
    },
    {
        name: "Static Symmetrical Composition",
        description: "A locked-off camera frames the subject with balanced symmetry, deliberate negative space, precise geometry, and minimal visual distraction."
    }
];

// ---------------------------------------------------------
// RANDOM CINEMATIC SHOT FUNCTION
// ---------------------------------------------------------

function getRandomCinematicShot() {
    const shot = CINEMATIC_SHOTS[
        Math.floor(Math.random() * CINEMATIC_SHOTS.length)
    ];

    return `${shot.name}: ${shot.description}`;
}

// ---------------------------------------------------------
// OPTIONAL: RETURN THE NAME AND DESCRIPTION SEPARATELY
// ---------------------------------------------------------

function getRandomCinematicShotObject() {
    const shot = CINEMATIC_SHOTS[
        Math.floor(Math.random() * CINEMATIC_SHOTS.length)
    ];

    return { ...shot };
}

// ---------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------

module.exports = {
    getRandomCinematicShot,
    getRandomCinematicShotObject,
    CINEMATIC_SHOTS
};
