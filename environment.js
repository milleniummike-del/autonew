const filepath = "X:\\inputprojects\\project5";
const downloadDir = "X:\\inputprojects\\project5";
const path = require('path');
function waitForKeypress() {
    return new Promise(resolve => {
        console.log('\nPress any key to continue');

        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }

        process.stdin.resume();

        process.stdin.once('data', () => {
            if (process.stdin.isTTY) {
                process.stdin.setRawMode(false);
            }

            process.stdin.pause();
            resolve();
        });
    });
}
const projectFile = "project6.json";
async function waitTime(time = 1000) {
    console.log ("Waiting "+time);
    await new Promise(r => setTimeout(r, time));
}

async function waitTimeRandom(time = 8000, upto = 16000) {
     const timewait = Math.floor(Math.random() * (upto - time + 1)) + time;
    console.log ("Waiting "+timewait);
    await new Promise(r => setTimeout(r, timewait));
}

const readline = require('readline');

let previousValue = '';

function getInput(message = 'Enter prompt: ') {
    return new Promise(resolve => {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.emitKeypressEvents(process.stdin);

        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }

        rl.setPrompt(message);
        rl.prompt();

        const onKeypress = (str, key) => {
            if (key && key.name === 'tab') {
                // Clear current input
                rl.write(null, { ctrl: true, name: 'u' });

                // Insert previous prompt
                if (previousValue) {
                    rl.write(previousValue);
                }
            }
        };

        process.stdin.on('keypress', onKeypress);

        rl.once('line', answer => {
            process.stdin.removeListener('keypress', onKeypress);

            if (process.stdin.isTTY) {
                process.stdin.setRawMode(false);
            }

            const value = answer.trim() || previousValue;

            if (value) {
                previousValue = value;
            }

            rl.close();
            resolve(value);
        });

        rl.once('close', () => {
            process.stdin.removeListener('keypress', onKeypress);

            if (process.stdin.isTTY && process.stdin.isRaw) {
                process.stdin.setRawMode(false);
            }
        });
    });
}

const blocks = [
{
        Costume1: `Royal medieval king's attire, luxurious deep crimson velvet tunic, intricate gold embroidery, ornate high collar, wide leather belt, elaborate gold crown, decorative rings and polished leather boots.`
    },
    {
        Costume2: `Medieval queen's ceremonial gown, flowing emerald velvet dress, fitted bodice, intricate gold thread embroidery, long dramatic sleeves, jewelled waist belt, delicate crown and elegant trailing train.`
    },
    {
        Costume3: `Medieval knight's battle costume, polished steel plate armour, engraved breastplate, chainmail sleeves, leather gauntlets, heavy leather belt, dark wool cloak and sturdy metal-plated boots.`
    },
    {
        Costume4: `Medieval peasant clothing, rough natural linen shirt, worn brown wool tunic, simple leather belt, patched trousers, practical leather boots and rustic woven shoulder bag.`
    },
    {
        Costume5: `Renaissance nobleman's outfit, richly decorated brocade doublet, puffed sleeves, embroidered waistcoat, fitted breeches, silk stockings, decorative ruff collar and polished leather shoes.`
    },
    {
        Costume6: `Renaissance noblewoman's gown, structured bodice, luxurious burgundy silk, intricate floral embroidery, elaborate puff sleeves, layered skirts, pearl necklace and decorative hair ornaments.`
    },
    {
        Costume7: `Eighteenth-century French aristocratic attire, ornate embroidered silk coat, elaborate waistcoat, lace cuffs, knee-length breeches, white stockings, buckled shoes and powdered wig.`
    },
    {
        Costume8: `Eighteenth-century aristocratic woman's dress, elaborate pastel silk gown, fitted corseted bodice, wide pannier skirt, delicate lace sleeves, embroidered floral details and elegant jewellery.`
    },
    {
        Costume9: `Victorian gentleman's attire, tailored black frock coat, high-collar white shirt, dark waistcoat, patterned cravat, formal trousers, polished leather shoes and pocket watch chain.`
    },
    {
        Costume10: `Victorian lady's fashion, elegant high-necked dress, fitted corset bodice, voluminous layered skirt, intricate lace detailing, decorative buttons, fitted gloves and elaborate pinned hairstyle.`
    },
    {
        Costume11: `Victorian detective outfit, dark tweed three-piece suit, long wool overcoat, patterned waistcoat, white shirt, dark necktie, leather gloves, pocket watch and classic deerstalker cap.`
    },
    {
        Costume12: `1920s gentleman's gangster outfit, charcoal pinstripe three-piece suit, crisp white shirt, silk tie, pocket square, polished Oxford shoes, gold cufflinks and traditional flat cap.`
    },
    {
        Costume13: `1920s flapper fashion, shimmering beaded fringe dress, dropped waistline, sleeveless silhouette, long pearl necklace, decorative feather headband, satin gloves and elegant heels.`
    },
    {
        Costume14: `1940s military officer uniform, fitted olive-drab service jacket, structured shoulders, brass buttons, rank insignia, matching trousers, leather belt and polished military boots.`
    },
    {
        Costume15: `1950s rockabilly musician outfit, black leather motorcycle jacket, fitted white T-shirt, slim dark jeans, leather boots, rolled sleeves and vintage sunglasses.`
    },
    {
        Costume16: `1950s glamorous Hollywood evening gown, elegant fitted silhouette, flowing satin skirt, sweetheart neckline, delicate waist detail, long evening gloves and sparkling jewellery.`
    },
    {
        Costume17: `1960s mod fashion, tailored geometric-pattern mini dress, contrasting white collar, colourful tights, knee-high boots, oversized sunglasses and contemporary retro accessories.`
    },
    {
        Costume18: `1970s disco fashion, shimmering metallic jumpsuit, dramatically flared trousers, plunging neckline, wide belt, platform shoes and bold gold jewellery.`
    },
    {
        Costume19: `1970s hippie clothing, flowing floral shirt, flared denim trousers, fringed suede vest, layered necklaces, leather sandals and colourful woven accessories.`
    },
    {
        Costume20: `1980s rock star outfit, distressed leather jacket, fitted black vest, tight leather trousers, studded belt, fingerless gloves, heavy boots and layered silver jewellery.`
    },
    {
        Costume21: `1980s pop superstar costume, oversized metallic jacket, brightly coloured fitted top, high-waisted trousers, dramatic shoulder details, statement jewellery and bold stage boots.`
    },
    {
        Costume22: `1990s grunge fashion, oversized checked flannel shirt, faded band T-shirt, distressed ripped jeans, worn combat boots, leather wristbands and layered casual clothing.`
    },
    {
        Costume23: `Modern luxury business executive attire, perfectly tailored charcoal suit, crisp white shirt, subtle silk tie, premium leather belt, elegant wristwatch and polished dress shoes.`
    },
    {
        Costume24: `Female corporate executive outfit, sophisticated tailored trouser suit, fitted blazer, silk blouse, elegant heels, refined jewellery, structured leather handbag and minimalist accessories.`
    },
    {
        Costume25: `Professional surgeon's attire, clean blue surgical scrubs, fitted scrub trousers, disposable surgical cap, protective face mask, medical gloves and practical hospital footwear.`
    },
    {
        Costume26: `Doctor's professional clothing, clean white medical coat, pale blue shirt, tailored trousers, stethoscope around the neck, identification badge and comfortable professional shoes.`
    },
    {
        Costume27: `Firefighter protective uniform, heavy black and yellow flame-resistant jacket, reinforced trousers, reflective safety strips, thick protective gloves, heavy boots and fire-resistant helmet.`
    },
    {
        Costume28: `Police officer uniform, dark navy tactical shirt, matching cargo trousers, shoulder insignia, utility belt, radio, body armour, polished boots and official peaked cap.`
    },
    {
        Costume29: `Detective in contemporary civilian clothing, dark tailored overcoat, charcoal shirt, fitted trousers, leather shoes, subtle wristwatch and discreet shoulder holster.`
    },
    {
        Costume30: `Professional construction worker outfit, high-visibility orange safety vest, hard hat, durable work shirt, reinforced cargo trousers, protective gloves and steel-toe boots.`
    },
    {
        Costume31: `Professional chef's uniform, clean white double-breasted jacket, black buttons, checked trousers, traditional tall chef's hat, white apron and practical non-slip shoes.`
    },
    {
        Costume32: `Restaurant waiter attire, fitted black waistcoat, crisp white shirt, black bow tie, tailored black trousers, white service gloves and polished formal shoes.`
    },
    {
        Costume33: `Commercial airline pilot uniform, dark navy tailored jacket, gold sleeve stripes, white shirt, black tie, pilot wings, matching trousers and peaked captain's hat.`
    },
    {
        Costume34: `Professional flight attendant uniform, elegant fitted navy dress, coordinated tailored jacket, silk neck scarf, smart heels, discreet name badge and polished professional appearance.`
    },
    {
        Costume35: `Professional racing driver suit, colourful sponsor-style patches, fire-resistant padded overalls, racing gloves, protective boots and a full-face motorsport helmet tucked under one arm.`
    },
    {
        Costume36: `Professional astronaut spacesuit, bulky white pressurised suit, reinforced joints, metallic connectors, mission patches, life-support backpack, technical gloves and transparent helmet visor.`
    },
    {
        Costume37: `Modern military special forces operator, camouflage combat uniform, tactical plate carrier, utility pouches, reinforced knee pads, combat boots, protective gloves and military helmet.`
    },
    {
        Costume38: `Naval admiral's formal uniform, dark navy double-breasted jacket, ornate gold buttons, embroidered gold sleeve stripes, ceremonial medals, white peaked cap and polished shoes.`
    },
    {
        Costume39: `Archaeologist's expedition clothing, weathered khaki field shirt, rolled sleeves, rugged cargo trousers, leather utility belt, hiking boots, canvas satchel and wide-brimmed sun hat.`
    },
    {
        Costume40: `Wildlife photographer's safari outfit, lightweight olive field shirt, practical cargo trousers, multi-pocket utility vest, binoculars, rugged boots and broad-brimmed safari hat.`
    },
    {
        Costume41: `Pirate captain's costume, weathered dark leather longcoat, loose white linen shirt, broad waist sash, ornate belt, tall leather boots, layered necklaces and wide-brimmed tricorn hat.`
    },
    {
        Costume42: `Eighteenth-century pirate sailor clothing, loose striped linen shirt, worn waistcoat, dark cropped trousers, leather boots, colourful headscarf, rope belt and weathered accessories.`
    },
    {
        Costume43: `Viking warrior attire, heavy wool tunic, layered leather armour, fur-trimmed cloak, broad leather belt, engraved metal brooch, leather bracers and rugged boots.`
    },
    {
        Costume44: `Viking shieldmaiden costume, fitted leather armour, layered wool tunic, fur shoulder mantle, decorated belt, engraved metal jewellery, protective bracers and sturdy boots.`
    },
    {
        Costume45: `Ancient Greek warrior costume, bronze muscle cuirass, leather pteruges skirt, decorated greaves, red wool cloak, leather sandals, bronze helmet and round shield.`
    },
    {
        Costume46: `Ancient Greek noblewoman's clothing, flowing ivory chiton, draped himation, gold waist clasp, delicate sandals, decorative bracelets, gold earrings and braided hairstyle.`
    },
    {
        Costume47: `Ancient Roman centurion uniform, segmented metal armour, red military cloak, decorated leather skirt, bronze helmet with transverse crest, greaves and military sandals.`
    },
    {
        Costume48: `Ancient Egyptian pharaoh costume, elaborate white linen royal kilt, broad gold collar, ornate ceremonial belt, striped nemes headdress, gold arm cuffs and jewelled sandals.`
    },
    {
        Costume49: `Ancient Egyptian noblewoman's attire, elegant fitted white linen dress, elaborate gold collar necklace, decorative gold belt, broad bracelets, jewelled headpiece and ornate sandals.`
    },
    {
        Costume50: `Traditional Japanese samurai armour, layered lacquered iron plates, decorative shoulder guards, dark silk undergarments, ornate waist sash, protective helmet and twin swords.`
    },
    {
        Costume51: `Traditional Japanese kimono, beautifully layered silk fabric, intricate floral motifs, wide decorative obi sash, elegant long sleeves, traditional sandals and ornamental hair accessories.`
    },
    {
        Costume52: `Traditional Chinese imperial emperor's robe, luxurious golden silk, intricate embroidered dragon motifs, wide sleeves, elaborate ceremonial belt, ornate imperial crown and embroidered shoes.`
    },
    {
        Costume53: `Traditional Chinese warrior costume, dark embroidered tunic, layered leather shoulder armour, wide cloth belt, loose trousers, cloth boots and decorative arm guards.`
    },
    {
        Costume54: `Traditional Scottish Highland clothing, tartan kilt, tailored wool jacket, white shirt, leather sporran, knee-high socks, polished brogues and traditional plaid sash.`
    },
    {
        Costume55: `Wild West cowboy outfit, worn brown leather jacket, checked cotton shirt, denim trousers, large leather belt with engraved buckle, cowboy boots, neckerchief and broad-brimmed hat.`
    },
    {
        Costume56: `Wild West cowgirl attire, fitted suede jacket with decorative fringe, embroidered blouse, denim trousers, leather gun belt, riding boots, neckerchief and wide-brimmed cowboy hat.`
    },
    {
        Costume57: `American frontier sheriff uniform, dusty long coat, light western shirt, leather waistcoat, engraved sheriff badge, gun belt, worn cowboy boots and broad-brimmed hat.`
    },
    {
        Costume58: `Wild West saloon entertainer dress, elaborate burgundy corset bodice, layered satin skirt, lace detailing, decorative feather accessories, long gloves and ornate jewellery.`
    },
    {
        Costume59: `Medieval fantasy wizard robes, layered midnight-blue velvet garments, elaborate silver celestial embroidery, flowing hooded cloak, decorative leather belt and mystical pendant.`
    },
    {
        Costume60: `Fantasy elven archer outfit, fitted forest-green leather tunic, layered leaf-inspired shoulder armour, elegant bracers, fitted trousers, tall boots and delicate woodland accessories.`
    },
    {
        Costume61: `Fantasy barbarian warrior attire, rugged leather harness, fur-lined shoulder mantle, weathered battle skirt, heavy bracers, thick belt, muscular arm guards and oversized boots.`
    },
    {
        Costume62: `Fantasy royal sorceress gown, flowing midnight-purple silk dress, intricate silver embroidery, structured shoulders, translucent sleeves, jewelled waist detail and ornate mystical crown.`
    },
    {
        Costume63: `Dark fantasy vampire aristocrat costume, tailored black velvet coat, high collar, deep burgundy waistcoat, ornate silver buttons, lace cuffs, dark trousers and polished boots.`
    },
    {
        Costume64: `Steampunk inventor outfit, brown leather waistcoat, cream high-collar shirt, brass mechanical accessories, utility belt, fingerless gloves, pocket watch chains and protective goggles.`
    },
    {
        Costume65: `Steampunk adventurer costume, weathered leather longcoat, fitted corset or waistcoat, layered utility straps, brass buckles, reinforced boots, mechanical gadgets and vintage aviator goggles.`
    },
    {
        Costume66: `Cyberpunk streetwear, oversized black technical jacket, luminous neon piping, asymmetrical layered fabrics, futuristic utility trousers, heavy platform boots and metallic accessories.`
    },
    {
        Costume67: `Futuristic science-fiction officer uniform, sleek fitted charcoal jumpsuit, subtle illuminated insignia, structured shoulders, metallic detailing, integrated utility belt and futuristic boots.`
    },
    {
        Costume68: `Futuristic android costume, seamless silver-white synthetic bodysuit, precision geometric panels, subtle glowing blue details, articulated metallic joints and minimalist futuristic footwear.`
    },
    {
        Costume69: `Post-apocalyptic survivor outfit, distressed layered clothing, weathered leather jacket, patched cargo trousers, improvised armour plates, utility straps, worn boots and protective goggles.`
    },
    {
        Costume70: `Post-apocalyptic wasteland scavenger costume, faded hooded coat, rough fabric wraps, salvaged metal shoulder guards, weathered gloves, utility belt, protective mask and rugged boots.`
    },
    {
        Costume71: `Space bounty hunter armour, dark metallic segmented chest plate, reinforced shoulder guards, tactical bodysuit, utility belt, forearm protection, heavy boots and futuristic helmet.`
    },
    {
        Costume72: `Galactic empress costume, sculptural metallic silver gown, elegant futuristic shoulder structure, flowing translucent cape, intricate luminous details and elaborate geometric headpiece.`
    },
    {
        Costume73: `Professional female pop singer stage outfit, sparkling silver fitted bodysuit, dramatic crystal embellishments, high-cut silhouette, metallic thigh-high boots and statement jewellery.`
    },
    {
        Costume74: `Male pop superstar stage costume, tailored black leather trousers, fitted embellished jacket, open-neck satin shirt, metallic detailing, layered necklaces and striking stage boots.`
    },
    {
        Costume75: `Female DJ festival outfit, futuristic metallic crop top, high-waisted reflective trousers, sculptural belt, chunky platform boots, statement earrings and bold stage accessories.`
    },
    {
        Costume76: `Male electronic music DJ outfit, oversized black technical jacket, fitted dark T-shirt, tailored cargo trousers, premium sneakers, layered silver chains and contemporary streetwear styling.`
    },
    {
        Costume77: `Glamorous music video dancer costume, shimmering gold two-piece ensemble, flowing metallic fabric panels, fitted silhouette, decorative waist chains and high-fashion dance boots.`
    },
    {
        Costume78: `Professional ballet dancer costume, elegant fitted black leotard, soft pink tights, delicate ballet slippers, light wrap skirt and understated performance styling.`
    },
    {
        Costume79: `Contemporary hip-hop dancer outfit, oversized graphic sweatshirt, loose cargo trousers, high-top sneakers, fitted cap, layered jewellery and bold urban streetwear.`
    },
    {
        Costume80: `Glamorous red-carpet fashion gown, sculpted floor-length black satin dress, dramatic open back, elegant fitted silhouette, luxurious fabric draping and refined diamond jewellery.`
    },
    {
        Costume81: `Luxury fashion model streetwear, oversized designer-inspired trench coat, fitted neutral top, wide-leg tailored trousers, minimalist leather boots, structured handbag and dark sunglasses.`
    },
    {
        Costume82: `Professional fashion photographer clothing, black utility jacket, comfortable dark trousers, camera harness, multiple camera accessories, leather boots and practical creative-professional styling.`
    },
    {
        Costume83: `Mountain climber expedition clothing, insulated technical jacket, waterproof shell trousers, thermal base layers, climbing harness, protective gloves, mountaineering boots and knitted beanie.`
    },
    {
        Costume84: `Professional deep-sea diver outfit, dark reinforced diving suit, buoyancy control vest, air hoses, heavy diving boots, thick gloves, regulator and full-face diving mask.`
    },
    {
        Costume85: `Traditional Japanese martial arts uniform, crisp white karate gi, dark fabric belt, reinforced cotton jacket, loose trousers and simple training footwear.`
    },
    {
        Costume86: `Professional boxer outfit, satin boxing shorts, sleeveless athletic vest, hand wraps, padded boxing gloves, high-top boxing shoes and lightweight training robe.`
    },
    {
        Costume87: `Professional football player uniform, fitted team jersey, matching athletic shorts, long sports socks, shin guards, football boots and captain's armband.`
    },
    {
        Costume88: `Professional tennis player outfit, crisp performance polo shirt, lightweight athletic shorts or pleated skirt, sports visor, wristbands, white tennis shoes and modern sportswear styling.`
    },
    {
        Costume89: `Traditional African ceremonial clothing, richly patterned woven fabric, layered colourful garments, intricate beadwork, decorative headwrap, statement necklaces and handcrafted accessories.`
    },
    {
        Costume90: `Traditional Maasai-inspired ceremonial attire, vivid red shuka fabric, layered colourful bead necklaces, decorative bracelets, beaded earrings and traditional sandals.`
    },
    {
        Costume91: `Traditional Mongolian nomadic clothing, long silk deel robe, decorative fabric sash, embroidered trim, tall leather boots and traditional fur-trimmed hat.`
    },
    {
        Costume92: `Traditional Nordic folk clothing, embroidered wool tunic, decorative woven belt, layered linen garments, patterned apron, leather shoes and handcrafted silver brooches.`
    },
    {
        Costume93: `Professional veterinarian outfit, clean teal medical scrubs, practical white coat, stethoscope, protective gloves, comfortable work shoes and discreet veterinary identification badge.`
    },
    {
        Costume94: `Professional scientist laboratory attire, white laboratory coat, pale blue shirt, safety glasses, protective nitrile gloves, dark trousers and practical closed-toe shoes.`
    },
    {
        Costume95: `Professional journalist outfit, smart casual blazer, neutral shirt, tailored trousers, practical leather shoes, press identification badge and notebook carried in a shoulder bag.`
    },
    {
        Costume96: `Traditional circus ringmaster costume, richly decorated red tailcoat, gold braided trim, fitted black trousers, white shirt, ornate waistcoat, tall black boots and elegant top hat.`
    },
    {
        Costume97: `Classic magician's stage outfit, tailored black tuxedo, satin lapels, crisp white shirt, black bow tie, fitted waistcoat, polished shoes and elegant black top hat.`
    },
    {
        Costume98: `Professional opera singer's costume, luxurious embroidered evening jacket, elaborate brocade waistcoat, flowing silk sash, tailored trousers and polished formal shoes.`
    },
    {
        Costume99: `Gothic rock musician costume, distressed black leather coat, layered dark shirts, fitted trousers, heavy buckled boots, silver rings, chains and dramatic dark accessories.`
    },
    {
        Costume100: `Contemporary luxury fashion costume, sculptural architectural jacket, tailored wide-leg trousers, premium textured fabrics, asymmetrical design details, statement accessories and avant-garde runway styling.`
    },
    {
        Medium1: `Soft pastel artwork, delicate powdery pigment textures, gentle blended colour transitions, subtle visible pastel strokes, dreamy atmospheric quality and refined traditional fine-art finish.`
    },
    {
        Medium2: `Traditional wax crayon illustration, expressive hand-drawn strokes, rich layered crayon pigments, visible wax texture, playful colour combinations and charming illustrated finish.`
    },
    {
        Medium3: `Classical oil painting, rich layered brushwork, luminous pigments, subtle canvas texture, sophisticated colour blending, dramatic painterly lighting and timeless fine-art quality.`
    },
    {
        Medium4: `Renaissance oil painting, meticulous brushwork, realistic anatomical detail, rich earthy pigments, delicate chiaroscuro lighting, subtle aged canvas texture and classical museum-quality finish.`
    },
    {
        Medium5: `Watercolour painting, translucent washes of pigment, delicate colour bleeding, soft flowing edges, subtle paper grain, organic brush marks and elegant atmospheric composition.`
    },
    {
        Medium6: `Ink and pen illustration, intricate hand-drawn outlines, fine cross-hatching, delicate stippling, controlled black ink details and sophisticated monochromatic artwork.`
    },
    {
        Medium7: `Traditional copperplate etching, exceptionally fine engraved lines, intricate cross-hatching, detailed tonal shading, antique print texture and classical nineteenth-century illustration aesthetic.`
    },
    {
        Medium8: `Woodcut printmaking, bold carved contours, expressive areas of solid colour, visible woodgrain textures, simplified dramatic shapes and handcrafted traditional print aesthetic.`
    },
    {
        Medium9: `Vintage lithographic illustration, beautifully layered printed colours, subtle registration imperfections, delicate paper grain, refined engraved details and antique poster aesthetic.`
    },
    {
        Medium10: `Modern comic book illustration, bold expressive outlines, dynamic ink shading, dramatic colour blocking, halftone dot textures, exaggerated lighting and graphic storytelling aesthetic.`
    },
    {
        Medium11: `Vintage American comic book artwork, hand-inked contours, Ben-Day dot printing, saturated primary colours, expressive shadows and authentic retro comic print texture.`
    },
    {
        Medium12: `Japanese manga illustration, precise expressive linework, detailed character features, delicate screentone shading, dramatic highlights and sophisticated black-and-white graphic storytelling.`
    },
    {
        Medium13: `Japanese traditional ukiyo-e woodblock print, elegant flowing outlines, flattened perspective, decorative patterns, restrained colours and delicate handmade washi paper texture.`
    },
    {
        Medium14: `Art Nouveau illustration, flowing organic contours, intricate botanical ornamentation, decorative framing, elegant stylised forms and harmonious muted colours.`
    },
    {
        Medium15: `Art Deco illustration, geometric symmetry, elegant angular shapes, luxurious metallic gold accents, sophisticated colour palettes and polished vintage poster artwork.`
    },
    {
        Medium16: `Impressionist oil painting, loose expressive brushstrokes, broken colour, vibrant natural light, soft atmospheric forms and shimmering painterly textures.`
    },
    {
        Medium17: `Post-impressionist painting, expressive directional brushwork, bold contrasting colours, rhythmic painted textures, dramatic forms and emotionally rich fine-art composition.`
    },
    {
        Medium18: `Expressionist painting, energetic distorted brushwork, emotionally charged colours, exaggerated shapes, dramatic contrasts and powerful subjective artistic atmosphere.`
    },
    {
        Medium19: `Pointillist painting, thousands of tiny individual colour dots, carefully layered optical colour mixtures, intricate stippled surfaces and luminous impressionistic detail.`
    },
    {
        Medium20: `Gouache illustration, opaque matte pigments, beautifully layered colour fields, clean painted edges, subtle brush textures and refined editorial illustration aesthetic.`
    },
    {
        Medium21: `Acrylic painting, vibrant opaque colours, confident layered brushstrokes, rich textural surfaces, expressive painted details and contemporary gallery artwork finish.`
    },
    {
        Medium22: `Charcoal drawing, expressive dark tonal marks, soft smudged shading, visible paper texture, dramatic highlights and deeply atmospheric fine-art portraiture.`
    },
    {
        Medium23: `Graphite pencil illustration, precise delicate linework, subtle tonal gradients, intricate cross-hatching, realistic proportions and beautifully detailed sketchbook texture.`
    },
    {
        Medium24: `Coloured pencil artwork, finely layered pencil strokes, delicate pigment blending, intricate surface detail, rich natural colours and refined handmade illustration finish.`
    },
    {
        Medium25: `Chalk pastel drawing on textured paper, broad expressive marks, softly blended pigments, dusty surface details, atmospheric colour transitions and artistic handmade character.`
    },
    {
        Medium26: `Collage artwork, overlapping cut-paper shapes, layered printed materials, torn paper edges, mixed textures, unexpected colour combinations and sophisticated contemporary graphic composition.`
    },
    {
        Medium27: `Mixed-media fine art, combining expressive paint, ink drawing, textured paper, subtle collage elements and layered pigments into a richly detailed artistic composition.`
    },
    {
        Medium28: `Surrealist dream painting, hyper-detailed painted textures, impossible visual combinations, symbolic imagery, unusual proportions and mysterious atmospheric fine-art styling.`
    },
    {
        Medium29: `Contemporary digital matte painting, sophisticated digital brushwork, intricate environmental detail, cinematic colour transitions, atmospheric depth and polished concept-art finish.`
    },
    {
        Medium30: `Vintage hand-painted animation cel, clean illustrated outlines, beautifully simplified painted shapes, subtle cel shading, nostalgic colour palette and classic theatrical animation artwork.`
    },
    {
        FX1: `Spectacular fireworks exploding across the distant night sky, enormous golden and electric-blue bursts illuminating the background, cascading sparks and glowing embers, vibrant celebratory atmosphere.`
    },
    {
        FX2: `Huge billowing clouds of atmospheric smoke rolling across the background, illuminated by dramatic coloured lights, soft swirling formations, creating depth and cinematic mystery.`
    },
    {
        FX3: `Thousands of tiny stars glittering across a deep midnight sky, subtle cosmic particles drifting through the atmosphere, beautiful celestial depth and magical ambience.`
    },
    {
        FX4: `Voluminous coloured smoke clouds erupting behind the subject in vivid pink, purple and electric blue, swirling together in dramatic plumes, energetic pop music video atmosphere.`
    },
    {
        FX5: `Golden sparks cascading from above like a spectacular indoor fireworks display, glowing particles scattering through the air, dramatic backlighting and luxurious concert atmosphere.`
    },
    {
        FX6: `Powerful shafts of volumetric light cutting through atmospheric haze, vibrant beams of red, blue and violet illuminating the background, creating a spectacular concert stage effect.`
    },
    {
        FX7: `A spectacular shower of glowing meteorites streaking across the distant sky, long fiery trails and sparkling fragments, dramatic celestial spectacle.`
    },
    {
        FX8: `Thousands of delicate floating luminous particles suspended in the air, shimmering like magical dust, subtle golden highlights and dreamy atmospheric depth.`
    },
    {
        FX9: `A dramatic lightning storm illuminating enormous dark clouds in the background, branching electric-white lightning bolts, flashes of blue light and powerful cinematic atmosphere.`
    },
    {
        FX10: `A spectacular aurora borealis flowing across the sky in vivid emerald green, turquoise and violet ribbons, softly illuminating the surrounding environment.`
    },
    {
        FX11: `Glowing neon light trails sweeping through the background in dynamic curved patterns, vibrant pink, cyan and purple illumination, futuristic pop video aesthetic.`
    },
    {
        FX12: `A dramatic explosion of coloured powder bursting into the air behind the subject, clouds of vibrant magenta, cyan, yellow and orange pigment suspended in motion.`
    },
    {
        FX13: `Thousands of tiny glowing fireflies floating throughout the background, warm golden points of light drifting through atmospheric darkness, enchanting cinematic ambience.`
    },
    {
        FX14: `A magnificent waterfall of golden glitter cascading down through the background, sparkling fragments catching the light, luxurious fantasy music video atmosphere.`
    },
    {
        FX15: `Dense rolling ground fog flowing across the lower background, illuminated by dramatic coloured backlighting, creating mysterious depth and cinematic atmosphere.`
    },
    {
        FX16: `Giant illuminated moon emerging through layers of atmospheric clouds, silver-blue moonlight spreading across the background, dreamlike cinematic night atmosphere.`
    },
    {
        FX17: `A spectacular shower of falling rose petals drifting through the air, rich red and soft pink petals catching the light, romantic high-fashion music video aesthetic.`
    },
    {
        FX18: `Glowing embers and fiery sparks swirling through the air, subtle flames flickering in the distant background, dramatic orange illumination and powerful cinematic energy.`
    },
    {
        FX19: `A beautiful field of shimmering bokeh lights stretching into the distance, soft golden, pink and violet circles of light, dreamy luxury pop video atmosphere.`
    },
    {
        FX20: `A spectacular field of laser beams sweeping through atmospheric haze, vivid red, green, blue and violet light patterns, energetic futuristic concert environment.`
    },
    {
        FX21: `Giant translucent soap bubbles floating through the background, reflecting rainbow colours and studio lighting, whimsical reflections and glossy pop music video styling.`
    },
    {
        FX22: `A dramatic wall of cascading water droplets suspended in slow motion, sparkling highlights and reflections, cool blue lighting and high-speed cinematic photography.`
    },
    {
        FX23: `Enormous clouds of pink and purple illuminated mist rolling through the background, soft glowing edges and atmospheric light, surreal dreamy pop video aesthetic.`
    },
    {
        FX24: `A spectacular cosmic nebula spreading across the background, swirling clouds of violet, magenta and electric blue gas, countless stars and luminous celestial energy.`
    },
    {
        FX25: `Thousands of shimmering metallic confetti pieces raining down from above, reflecting vibrant stage lighting, celebratory atmosphere and spectacular concert energy.`
    },
    {
        FX26: `A dramatic halo of radiant golden light expanding behind the subject, glowing rays extending outward through atmospheric haze, majestic and otherworldly visual effect.`
    },
    {
        FX27: `A swirling vortex of autumn leaves sweeping through the background, rich amber, crimson and golden foliage suspended in motion, dramatic seasonal cinematic atmosphere.`
    },
    {
        FX28: `A spectacular curtain of sparkling electric energy flowing across the background, branching blue-white electrical arcs and glowing particles, futuristic science-fiction aesthetic.`
    },
    {
        FX29: `A field of enormous floating illuminated lanterns rising into the night sky, warm golden lights drifting through atmospheric mist, magical and romantic cinematic spectacle.`
    },
    {
        FX30: `A breathtaking combination of coloured fireworks, sparkling stars, drifting smoke and luminous falling particles filling the distant background, spectacular blockbuster music video finale.`
    },
    { Cam1: `EXTREME LONG SHOT (ELS): An enormous panoramic composition showing the subject as a small element within a vast environment. The landscape, architecture or surrounding world dominates the frame, establishing scale, isolation and atmosphere. Cinematic widescreen composition with layered foreground, middle distance and background.` },

    { Cam2: `LONG SHOT (LS): Show the entire subject from head to toe, including their immediate surroundings. Maintain clear environmental context and allow the subject's physical movements to be fully visible. Balanced cinematic composition with natural perspective and strong spatial depth.` },

    { Cam3: `MEDIUM LONG SHOT (MLS): Frame the subject from approximately the knees upward. Capture body language, gestures and interaction with nearby objects while retaining enough environmental detail to establish the location. Natural cinematic composition.` },

    { Cam4: `MEDIUM SHOT (MS): Frame the subject from the waist upward. Emphasise facial expression, hand movements and dialogue while maintaining environmental context. Ideal for character interaction and narrative storytelling.` },

    { Cam5: `MEDIUM CLOSE-UP (MCU): Frame the subject from the chest upward. Focus on facial expressions, subtle emotional reactions and spoken dialogue. Use shallow depth of field to separate the subject from the background.` },

    { Cam6: `CLOSE-UP (CU): Fill most of the frame with the subject's face or an important object. Capture fine details, emotional intensity, eye movement and subtle expressions. Use cinematic shallow focus and controlled dramatic lighting.` },

    { Cam7: `EXTREME CLOSE-UP (ECU): Capture an intensely magnified detail such as an eye, hand, mouth, weapon mechanism or mysterious symbol. Reveal intricate textures, minute movements and atmospheric details. Dramatic macro cinematography.` },

    { Cam8: `OVER-THE-SHOULDER SHOT (OTS): Position the camera behind one character, using their shoulder and head as foreground framing while focusing on another character. Create natural conversational depth, spatial continuity and visual connection between characters.` },

    { Cam9: `POINT-OF-VIEW SHOT (POV): Present the scene from the direct visual perspective of a character. The camera represents their eyes as they examine, approach or interact with something. Natural head movement, immersive framing and realistic visual perspective.` },

    { Cam10: `LOW-ANGLE SHOT: Position the camera below the subject, looking upward. Emphasise dominance, authority, intimidation or monumental scale. Use strong vertical composition and dramatic environmental perspective.` },

    { Cam11: `HIGH-ANGLE SHOT: Position the camera above the subject, looking downward. Reveal surrounding geography, spatial relationships and vulnerability. Create a sense of observation, isolation or impending danger.` },

    { Cam12: `BIRD'S-EYE VIEW: Position the camera directly overhead, looking vertically down on the scene. Reveal geometric arrangements, character positioning, environmental patterns and large-scale visual composition.` },

    { Cam13: `DUTCH ANGLE: Tilt the camera diagonally to create an unsettling horizon and psychological instability. Use carefully composed foreground and background elements to communicate confusion, danger or supernatural tension.` },

    { Cam14: `SIDE PROFILE SHOT: Film the subject from a clean lateral angle, showing their silhouette and profile against the environment. Emphasise posture, movement, facial outline and atmospheric background depth.` },

    { Cam15: `TRACKING SHOT: Move the camera smoothly alongside or behind the subject as they travel through the environment. Maintain consistent framing and realistic movement, revealing new environmental details as the action progresses.` },

    { Cam16: `DOLLY-IN SHOT: Slowly move the camera physically toward the subject. Gradually increase visual intensity and draw attention to an important revelation, emotional reaction or mysterious object. Smooth cinematic movement.` },

    { Cam17: `DOLLY-OUT SHOT: Slowly move the camera away from the subject, progressively revealing the surrounding environment. Establish isolation, scale or an unexpected visual revelation. Maintain smooth perspective and cinematic continuity.` },

    { Cam18: `CRANE SHOT: Begin at a low or medium camera position and smoothly rise above the scene, revealing the wider environment. Create an expansive cinematic reveal with controlled vertical movement and layered spatial composition.` },

    { Cam19: `HANDHELD CAMERA: Use controlled organic camera movement with subtle natural instability. Create an immediate documentary-like feeling of presence, urgency and realism. Appropriate for confrontations, chaotic action and tense discoveries.` },

    { Cam20: `SLOW ORBITING SHOT: Move the camera in a smooth circular path around the subject while maintaining visual focus. Reveal multiple angles, changing backgrounds and environmental depth. Create a dramatic cinematic moment with immersive movement.` },


    // ==========================================
    // MOVIE GENRE THEMES - THEME1 TO THEME20
    // ==========================================

    {
        Theme1: `**PIRATE THEME — HISTORICAL PERIOD LOCK**

Set the scene during the Golden Age of Piracy (1680–1730), in the Caribbean or Atlantic world. Ensure every person, object, building, ship and background detail is historically authentic. Pirates wear linen shirts, waistcoats, breeches, worn boots, leather belts, bandanas and tricorn hats. Use weathered wooden sailing ships, canvas sails, hemp ropes, wooden barrels, cutlasses, flintlock pistols, black-powder muskets, antique compasses and parchment maps. Depict rustic taverns, stone forts, wooden docks, tropical islands, candlelight and oil lanterns. Emphasise aged timber, tarnished metal, coarse fabrics, salt stains, natural weathering and photorealistic cinematic lighting.

**ABSOLUTE EXCLUSIONS:** No modern objects, technology, clothing, materials or architecture. No phones, screens, cameras, electric lights, plastic, zippers, wristwatches, sunglasses, cars, aircraft, engines, modern ships, modern firearms, buildings, power lines, logos or contemporary signage. No Victorian, Wild West, steampunk, medieval fantasy or futuristic elements. Avoid cosplay and theme-park aesthetics. Every visible detail must fit 1680–1730. When uncertain, choose a historically plausible alternative. Strict historical accuracy is mandatory throughout the entire image.` },

    {
        Theme2: `**CYBERPUNK — FUTURISTIC DYSTOPIA**

Set the scene in a technologically advanced dystopian metropolis of the distant future. Towering skyscrapers, enormous holographic advertisements, neon signage, elevated transport systems, rain-soaked streets and dense urban architecture dominate the environment. Characters wear futuristic technical clothing, illuminated accessories, synthetic fabrics and advanced cybernetic enhancements. Incorporate artificial intelligence, robotic systems, digital interfaces, industrial machinery and atmospheric pollution. Use intense neon cyan, electric magenta, violet and amber lighting against deep shadows. Reflective wet surfaces, volumetric fog, dramatic urban scale and photorealistic science-fiction cinematography.

**ABSOLUTE EXCLUSIONS:** No medieval architecture, historical costumes, primitive machinery, fantasy magic or rural period settings. Maintain a coherent futuristic technological world throughout.` },

    {
        Theme3: `**GOTHIC NOIR — DARK MYSTERY**

Create a brooding Gothic mystery filled with psychological tension, secrets and atmospheric darkness. Use imposing Victorian architecture, narrow cobblestone streets, abandoned mansions, wrought-iron gates, candlelit interiors and mist-covered graveyards. Characters wear historically inspired dark formal clothing, tailored coats, high collars and elegant dresses. Incorporate aged portraits, antique furniture, mysterious letters, dusty books and ornate architectural details. Use deep blacks, desaturated blues, muted browns and restrained warm candlelight. Strong chiaroscuro, atmospheric fog, deep shadows and photorealistic cinematic composition.

**ABSOLUTE EXCLUSIONS:** No modern urban technology, bright contemporary fashion, cartoon aesthetics or futuristic architecture.` },

    {
        Theme4: `**HARD SCIENCE FICTION — REALISTIC SPACE EXPLORATION**

Set the scene within a scientifically grounded future involving deep-space exploration, advanced spacecraft and extraterrestrial environments. Use realistic spacecraft construction, functional control systems, industrial metal surfaces, pressure doors, technical equipment and practical astronaut suits. Depict believable planetary landscapes, orbital stations, spacecraft interiors and distant celestial bodies. Every technological object should appear engineered for a practical purpose. Use cold white illumination, muted metallic tones, subtle blue lighting and realistic atmospheric effects. Highly detailed photorealistic science-fiction cinematography.

**ABSOLUTE EXCLUSIONS:** No magical technology, fantasy creatures, medieval weapons, cartoon spaceships or unexplained decorative machinery. Prioritise physical plausibility and scientific realism.` },

    {
        Theme5: `**MEDIEVAL FANTASY — EPIC KINGDOMS**

Set the scene in an ancient fantasy kingdom of fortified castles, sprawling villages, enchanted forests and monumental stone architecture. Characters wear historically inspired medieval garments, chainmail, plate armour, leather armour, cloaks and handcrafted accessories. Include swords, shields, bows, banners, wooden wagons, stone bridges and ancient libraries. Magical elements may appear as subtle glowing runes, enchanted artefacts and mysterious atmospheric phenomena. Use rich earthy colours, emerald forests, dramatic skies and warm torchlight. Epic cinematic scale, detailed textures and photorealistic fantasy cinematography.

**ABSOLUTE EXCLUSIONS:** No modern clothing, industrial technology, firearms, cars, plastic or contemporary architecture.` },

    {
        Theme6: `**WESTERN — WILD FRONTIER**

Set the scene in the American frontier during the late nineteenth century. Depict dusty frontier towns, wooden saloons, cattle ranches, desert landscapes, mountain trails and isolated homesteads. Characters wear historically appropriate cowboy hats, denim or canvas work trousers, waistcoats, leather boots, suspenders, neckerchiefs and weathered coats. Include saddles, horses, wooden wagons, lanterns, leather holsters, period firearms and authentic ranch equipment. Use warm dusty sunlight, dramatic sunsets, long shadows and muted earth tones. Photorealistic Western cinematography.

**ABSOLUTE EXCLUSIONS:** No modern vehicles, electric lighting, contemporary clothing, modern weapons or futuristic objects.` },

    {
        Theme7: `**POST-APOCALYPTIC — COLLAPSED CIVILISATION**

Create a world devastated by a global catastrophe where abandoned cities and reclaimed wilderness reveal the remains of human civilisation. Show crumbling buildings, rusted vehicles, collapsed bridges, improvised shelters, broken infrastructure and vegetation growing through concrete. Characters wear layered scavenged clothing, distressed fabrics, patched jackets, practical boots and handmade protective equipment. Incorporate weathered tools, salvaged machinery, abandoned settlements and environmental decay. Use desaturated earth tones, dusty sunlight, heavy skies and harsh atmospheric lighting. Photorealistic survival cinematography.

**ABSOLUTE EXCLUSIONS:** No pristine modern cities, polished luxury interiors, futuristic utopian technology or clean contemporary fashion.` },

    {
        Theme8: `**COSMIC HORROR — ELDRITCH UNKNOWN**

Create an unsettling world in which ancient incomprehensible entities exist beyond human understanding. Depict impossible architecture, immense shadowy structures, strange geometric formations, ancient monoliths, abandoned coastal settlements and environments that seem to defy physical laws. Characters wear realistic contemporary or historically appropriate clothing suited to their setting. Introduce subtle supernatural disturbances, impossible shadows, mysterious symbols and distant unidentifiable silhouettes. Use deep blacks, desaturated blue-grey tones, dim atmospheric lighting and oppressive environmental scale. Photorealistic psychological horror cinematography.

**ABSOLUTE EXCLUSIONS:** No cartoon monsters, exaggerated fantasy creatures, comedic horror, artificial-looking CGI or obvious explanations of the supernatural. Preserve mystery and dread.` },

    {
        Theme9: `**NOIR CRIME THRILLER — URBAN UNDERWORLD**

Set the scene in a shadow-filled urban crime world inspired by classic film noir. Use rain-soaked streets, dim alleyways, smoky offices, old hotels, underground clubs and shadowy city interiors. Characters wear tailored suits, long trench coats, leather shoes and understated formal clothing. Include period-appropriate cars, desk telephones, paper files, cigarettes, glass ashtrays and practical urban props suited to the chosen era. Use hard directional lighting, deep blacks, high-contrast monochrome or restrained colour, reflections and dramatic shadows. Photorealistic crime cinema.

**ABSOLUTE EXCLUSIONS:** No fantasy magic, futuristic technology or visually exaggerated comic-book styling.` },

    {
        Theme10: `**1950s VINTAGE CINEMA — CLASSIC HOLLYWOOD**

Set the scene in an authentic American environment during the 1950s. Include period-correct diners, roadside motels, suburban houses, vintage automobiles, jukeboxes, chrome fixtures and classic street architecture. Characters wear tailored suits, full skirts, fitted dresses, leather jackets, polished shoes and hairstyles appropriate to the decade. Incorporate period household objects, analogue radios, record players and vintage signage. Use warm Technicolor-inspired colours, soft film grain, controlled studio lighting and elegant cinematic compositions. Photorealistic mid-century period drama.

**ABSOLUTE EXCLUSIONS:** No modern vehicles, smartphones, contemporary fashion, flat-screen displays or contemporary architecture.` },

    {
        Theme11: `**ANCIENT GREEK MYTHOLOGY — GODS AND HEROES**

Set the scene in the ancient Greek world of mythology, with monumental marble temples, classical columns, sacred groves, mountain sanctuaries and ancient Mediterranean settlements. Characters wear historically inspired tunics, draped linen garments, leather sandals, bronze armour and flowing cloaks. Incorporate bronze shields, spears, ceremonial vessels, laurel wreaths and carved marble statues. Mythological elements may include subtle divine light, ancient prophecies and supernatural atmospheric events. Use warm Mediterranean sunlight, marble whites, aged gold and deep blue skies. Epic photorealistic mythological cinema.

**ABSOLUTE EXCLUSIONS:** No Roman imperial architecture, medieval armour, modern objects or contemporary clothing.` },

    {
        Theme12: `**VIKING SAGA — NORTHERN REALISM**

Set the scene in the Viking Age, approximately 793–1066 AD, across the Scandinavian coastlines and northern settlements. Show timber longhouses, rugged fjords, rocky shores, wooden longships, fur-covered interiors and remote mountain villages. Characters wear wool tunics, linen garments, leather belts, practical cloaks, fur-lined clothing and historically plausible armour. Include wooden shields, axes, spears, iron tools, woven textiles and carved wooden objects. Use cold natural daylight, smoky firelight, mist, snow and muted northern colours. Gritty photorealistic historical cinematography.

**ABSOLUTE EXCLUSIONS:** No horned helmets, fantasy armour, modern materials, industrial ships or medieval European castle styling.` },

    {
        Theme13: `**UNDERWATER ADVENTURE — DEEP OCEAN EXPLORATION**

Create an immersive underwater world filled with extraordinary marine environments, coral formations, submerged ruins, mysterious shipwrecks and immense ocean depths. Characters wear realistic diving suits, practical breathing apparatus and functional underwater equipment. Incorporate schools of fish, rays, sharks, sea turtles, jellyfish and bioluminescent organisms where appropriate. Use realistic underwater light scattering, suspended particles, caustic sunlight, blue-green gradients and deep abyssal darkness. Photorealistic underwater cinematography with strong environmental scale and natural marine detail.

**ABSOLUTE EXCLUSIONS:** No visible modern technology unless required by the scene, no fantasy mermaids, cartoon sea creatures or artificial aquarium environments.` },

    {
        Theme14: `**NORDIC FOLK HORROR — ANCIENT FOREST MYSTERY**

Set the scene in an isolated northern European village surrounded by ancient forests, dark lakes and remote mountain landscapes. Use traditional timber houses, weathered barns, stone pathways, wooden shrines and dense forests. Characters wear practical wool garments, linen shirts, handmade cloaks and traditional rural clothing. Introduce mysterious folklore symbols, ritual objects, ancient wooden carvings and subtle unexplained phenomena. Use pale overcast daylight, cold mist, muted greens, earthy browns and deep forest shadows. Atmospheric photorealistic folk horror.

**ABSOLUTE EXCLUSIONS:** No bright modern urban environments, fantasy elves, cartoon monsters or contemporary technology.` },

    {
        Theme15: `**ESPIONAGE THRILLER — INTERNATIONAL CONSPIRACY**

Create a sophisticated international espionage environment involving covert operations, secret meetings, surveillance, intelligence agencies and high-stakes deception. Use modern metropolitan locations, secure government buildings, luxury hotels, underground facilities and sophisticated interiors. Characters wear elegant tailored suits, practical operational clothing and understated professional attire. Include realistic communication equipment, secure documents, surveillance systems, vehicles and functional technical devices. Use controlled lighting, polished surfaces, deep shadows and cinematic tension. Photorealistic spy-thriller cinematography.

**ABSOLUTE EXCLUSIONS:** No superhero technology, exaggerated science-fiction gadgets, cartoon action or impossible machinery.` },

    {
        Theme16: `**POST-APOCALYPTIC WILDLIFE — NATURE RECLAIMS THE EARTH**

Depict a future Earth where human civilisation has collapsed and wildlife has reclaimed the planet. Show vast forests growing through abandoned cities, animals roaming deserted streets, birds nesting in ruined skyscrapers and vegetation covering old infrastructure. Animals must display anatomically correct proportions and believable natural behaviour. Use realistic fur, feathers, skin, movement and environmental interaction. Include atmospheric mist, natural sunlight, seasonal weather and expansive landscapes. Photorealistic wildlife documentary cinematography blended with cinematic environmental storytelling.

**ABSOLUTE EXCLUSIONS:** No talking animals, anthropomorphic creatures, cartoon styling or artificial-looking wildlife.` },

    {
        Theme17: `**DARK FANTASY HORROR — CURSED KINGDOM**

Create a sinister medieval world dominated by cursed landscapes, ruined fortresses, abandoned villages and ancient supernatural forces. Characters wear weathered medieval clothing, distressed leather armour, dark cloaks and practical protective garments. Include ancient swords, iron gates, ruined cathedrals, cursed relics and mysterious ritual objects. The environment should feel ancient, hostile and oppressive. Use desaturated earth tones, deep crimson accents, drifting ash, dense fog, firelight and dramatic shadow. Photorealistic dark fantasy horror cinematography.

**ABSOLUTE EXCLUSIONS:** No modern objects, cartoon monsters, polished fantasy armour or bright fairy-tale aesthetics.` },

    {
        Theme18: `**SPACE OPERA — GALACTIC EMPIRE**

Set the scene in a vast interstellar civilisation featuring enormous spacecraft, orbital cities, alien planets, military installations and monumental futuristic architecture. Characters wear sophisticated futuristic uniforms, technical suits, ceremonial garments and practical space equipment. Include massive hangars, spacecraft interiors, planetary vistas, advanced communications and engineered technology. Emphasise immense scale, cinematic silhouettes, luminous control systems and spectacular cosmic environments. Use dramatic blue, gold and violet lighting, realistic materials and epic photorealistic science-fiction cinematography.

**ABSOLUTE EXCLUSIONS:** No medieval castles, historical costumes, contemporary domestic objects or fantasy magic.` },

    {
        Theme19: `**PSYCHOLOGICAL THRILLER — UNRELIABLE REALITY**

Create a visually unsettling world in which ordinary environments gradually become psychologically disturbing. Use realistic apartments, corridors, hotels, empty streets and familiar everyday spaces. Characters wear natural contemporary clothing and display subtle emotional tension through facial expressions and body language. Incorporate mirrors, reflections, unusual framing, distorted spatial relationships, repeating patterns and ambiguous background details. Use controlled desaturated colours, practical lighting, deep shadows and carefully composed cinematic imagery. Photorealistic psychological suspense.

**ABSOLUTE EXCLUSIONS:** No exaggerated supernatural monsters, comedic imagery, cartoon effects or obvious fantasy elements. Keep the disturbing atmosphere grounded in reality.` },

    {
        Theme20: `**NATURE DOCUMENTARY — EPIC NATURAL WORLD**

Create a breathtaking photorealistic natural-history documentary environment featuring extraordinary landscapes, authentic wildlife and realistic ecological behaviour. Show mountains, forests, deserts, oceans, tropical jungles, rivers and expansive wilderness. Animals must display scientifically plausible anatomy, natural movement, authentic social behaviour and realistic interactions with their habitats. Include environmental details such as vegetation, weather, water movement, soil, natural light and seasonal conditions. Use sophisticated wildlife cinematography, expansive aerial perspectives, macro details, natural colours and dramatic but believable atmospheric lighting.

**ABSOLUTE EXCLUSIONS:** No humanised animals, cartoon appearances, fantasy environments, artificial habitats or implausible animal behaviour. Prioritise ecological realism and photographic authenticity.` },
    {
        Grade1: `**PREMIUM LUXURY CINEMATIC**
Strong symmetrical composition with layered foreground, middle ground and background, deep cinematic perspective, no visible clutter, premium luxury atmosphere, realistic glass reflections, atmospheric depth, soft volumetric lighting, 24mm wide-angle cinema lens, deep depth of field, natural perspective, photorealistic photography, extremely detailed materials and reflections, subtle film grain, sophisticated cinematic color grading, high-end commercial cinematography.` },

    {
        Grade2: `**DARK CINEMATIC DRAMA**
Powerful cinematic composition with dramatic visual hierarchy, carefully controlled negative space, rich blacks, deep shadow detail, atmospheric haze, directional volumetric lighting, subtle rim lighting, realistic surface textures, natural reflections, 35mm anamorphic cinema lens, shallow depth of field where appropriate, cinematic contrast, muted desaturated colour palette, subtle film grain, photorealistic textures, premium theatrical movie cinematography.` },

    {
        Grade3: `**NATURAL PHOTOREALISTIC CINEMA**
Authentic natural composition with believable spatial depth, organic foreground framing, realistic environmental details, balanced natural lighting, soft atmospheric perspective, physically accurate materials, realistic shadows and reflections, 50mm cinema lens, natural depth of field, lifelike skin and surface textures, accurate colour reproduction, subtle film grain, restrained cinematic colour grading, professional documentary photography, exceptionally realistic visual detail.` },

    {
        Grade4: `**EPIC BLOCKBUSTER CINEMATOGRAPHY**
Monumental cinematic composition with extraordinary environmental scale, strong foreground framing, layered middle distance and expansive background, dramatic perspective, powerful directional lighting, atmospheric volumetric rays, striking silhouettes, rich tonal separation,  anamorphic 35mm cinema lens, realistic depth of field, highly detailed environmental textures, subtle film grain, rich cinematic colour science, spectacular photorealistic blockbuster cinematography.` },

    {
        Grade5: `**ARTISTIC EDITORIAL CINEMATIC**
Sophisticated editorial composition with refined visual balance, elegant framing, deliberate negative space, carefully controlled geometry, beautiful tonal transitions, soft diffused lighting, subtle atmospheric depth, realistic material qualities, delicate reflections, 85mm portrait cinema lens, refined shallow depth of field, nuanced highlights, natural skin tones, sophisticated colour palette, fine film grain, premium luxury fashion photography, exceptional photorealistic detail.` },
    {
        Set1: `**THE ANCIENT MOUNTAIN KINGDOM**
An enormous medieval kingdom nestled between towering snow-covered mountain ranges. Monumental stone castles rise above terraced villages, ancient bridges cross deep valleys and waterfalls cascade down distant cliffs. Dense pine forests surround the settlements. Dramatic atmospheric clouds, distant mountain peaks, morning mist and golden sunlight create extraordinary environmental scale.` },

    {
        Set2: `**THE FORGOTTEN DESERT EMPIRE**
A vast ancient desert civilisation surrounded by endless golden sand dunes. Monumental sandstone temples, enormous statues, ruined palaces and ancient obelisks emerge from the desert. Wind-blown sand moves across abandoned courtyards while distant mountains disappear into atmospheric haze. Intense golden sunlight and dramatic shadows.` },

    {
        Set3: `**THE ENCHANTED ANCIENT FOREST**
An immense primeval forest containing colossal ancient trees, tangled roots, moss-covered stones and hidden woodland pathways. Sunlight filters through enormous canopies, illuminating drifting particles and delicate ground mist. Small waterfalls flow into crystal-clear streams. Deep emerald vegetation, extraordinary natural scale and mysterious atmospheric depth.` },

    {
        Set4: `**THE CLIFFSIDE CASTLE**
A monumental medieval fortress constructed directly into towering coastal cliffs overlooking a turbulent ocean. Massive stone towers, fortified walls, arched bridges and enormous gateways dominate the landscape. Waves crash against the rocks hundreds of metres below. Storm clouds and shafts of sunlight create an epic architectural composition.` },

    {
        Set5: `**THE VOLCANIC WASTELAND**
An immense volcanic landscape featuring enormous black mountains, rivers of glowing lava, volcanic craters and fields of fractured obsidian rock. Thick smoke rises into a dramatic red-orange sky. Glowing embers drift through the air while distant eruptions illuminate the surrounding mountains. Extreme environmental scale and dramatic geological textures.` },

    {
        Set6: `**THE FLOATING ISLANDS**
A surreal yet photorealistic world containing enormous islands suspended high above an endless sea of clouds. Towering waterfalls spill from their edges into the atmospheric void. Ancient stone temples, forests and waterfalls cover the floating landmasses. Golden sunlight illuminates the clouds and creates extraordinary depth.` },

    {
        Set7: `**THE ANCIENT GREEK ACROPOLIS**
A monumental ancient Greek city built across a series of elevated rocky hills overlooking the Mediterranean Sea. Vast marble temples, enormous columns, sculpted statues, grand staircases and ceremonial courtyards dominate the architecture. Olive groves and distant mountains frame the horizon. Warm Mediterranean sunlight and sophisticated historical realism.` },

    {
        Set8: `**THE FROZEN NORTHERN KINGDOM**
A vast frozen wilderness containing enormous glaciers, snow-covered mountain peaks, frozen lakes and ancient stone fortresses. Ice formations tower above frozen valleys. Northern forests disappear beneath deep snow while pale sunlight illuminates the icy landscape. Atmospheric snowstorms, blue-white colour palette and monumental environmental scale.` },

    {
        Set9: `**THE LOST TROPICAL CIVILISATION**
An ancient civilisation hidden within an enormous tropical rainforest. Monumental stepped pyramids, carved stone temples, overgrown plazas and enormous statues emerge through dense vegetation. Hanging vines cover ancient architecture. Waterfalls descend from surrounding mountains into jungle rivers. Warm sunlight, humid atmospheric haze and rich natural detail.` },

    {
        Set10: `**THE IMPERIAL PALACE GARDENS**
An enormous imperial palace surrounded by symmetrical gardens, marble fountains, elaborate terraces, sculpted hedges and monumental staircases. Ornate architecture combines classical columns, domed buildings and elegant pavilions. Reflective pools mirror the surrounding architecture. Warm golden sunlight, refined luxury and perfectly balanced cinematic composition.` },

    {
        Set11: `**THE ANCIENT STONE DESERT CITY**
A sprawling abandoned city carved directly into towering red sandstone cliffs. Enormous architectural facades, hidden entrances, monumental staircases and ancient ceremonial chambers extend across the rock formations. Desert sand covers the streets and courtyards. Late afternoon sunlight creates deep architectural shadows and rich terracotta colours.` },

    {
        Set12: `**THE MISTY HIGHLAND VALLEY**
A breathtaking landscape of enormous green mountains, rolling hills, cascading waterfalls and winding rivers. Ancient stone ruins stand on isolated ridges overlooking the valley. Thick morning mist moves between mountain peaks. Dramatic sunlight breaks through layered clouds, illuminating the landscape with natural golden light.` },

    {
        Set13: `**THE UNDERWATER LOST CITY**
A colossal ancient civilisation resting beneath a deep ocean. Monumental stone buildings, enormous pillars, submerged temples and intricate architectural formations extend across the seabed. Colourful coral formations grow across the ruins. Sunlight penetrates the water in dramatic volumetric shafts, revealing suspended particles and distant marine life.` },

    {
        Set14: `**THE GALACTIC SPACE STATION**
An enormous futuristic orbital station suspended above a spectacular alien planet. Monumental industrial structures, docking platforms, enormous observation windows and illuminated architectural rings dominate the station. The planet's atmosphere, oceans and continents are visible below. Distant stars and nebulae create extraordinary cinematic scale.` },

    {
        Set15: `**THE ANCIENT NORTHERN FJORDS**
A spectacular Scandinavian coastline featuring enormous mountains rising vertically from deep blue fjords. Small wooden settlements sit beside the water, surrounded by pine forests and waterfalls. Traditional longships rest along ancient wooden harbours. Low clouds drift between mountain peaks, creating dramatic natural depth and epic historical atmosphere.` },

    {
        Set16: `**THE IMPERIAL DESERT FORTRESS**
An enormous fortified desert palace surrounded by towering sandstone walls, monumental gates, defensive towers and elaborate courtyards. Vast desert mountains stretch across the horizon. Ancient banners move in the wind while sunlight illuminates weathered stone architecture. Powerful symmetrical composition and epic historical atmosphere.` },

    {
        Set17: `**THE ANCIENT GIANT WATERFALL**
An immense waterfall plunging thousands of feet from a towering mountain plateau into an enormous turquoise lake. Dense forests, dramatic cliffs and distant mountain ranges surround the water. Clouds of mist rise from the waterfall and catch the sunlight. Monumental natural scale, rich water textures and breathtaking cinematic perspective.` },

    {
        Set18: `**THE ABANDONED GOTHIC CITY**
An enormous deserted Gothic city containing towering cathedrals, pointed arches, monumental stone bridges and narrow cobbled streets. Ancient towers disappear into heavy fog. Weathered statues stand above abandoned plazas. Dark clouds and occasional shafts of cold sunlight create an unsettling atmosphere of forgotten grandeur.` },

    {
        Set19: `**THE GOLDEN SAVANNAH PLAINS**
An immense African savannah extending toward distant mountains beneath a vast dramatic sky. Golden grasses move in the wind, ancient acacia trees create elegant silhouettes and a winding river reflects the setting sun. Natural wildlife habitats, atmospheric dust and expansive horizons create a breathtaking wildlife documentary landscape.` },

    {
        Set20: `**THE CRYSTAL MOUNTAIN CAVERN**
A gigantic underground cavern filled with enormous naturally formed crystal formations, subterranean lakes and monumental mineral structures. Towering crystal columns reflect subtle coloured light across the cavern walls. Fine atmospheric particles float above the water. Extraordinary geological detail and dramatic cinematic lighting.` },

    {
        Set21: `**THE ANCIENT ROMAN EMPIRE**
A magnificent Roman imperial city containing monumental marble temples, enormous amphitheatres, triumphal arches, aqueducts and elaborate public squares. Colossal statues overlook bustling stone avenues. Cypress trees and distant hills frame the architecture. Warm Mediterranean light, historically authentic construction and epic classical composition.` },

    {
        Set22: `**THE STORMBOUND PIRATE HARBOUR**
A vast eighteenth-century Caribbean harbour surrounded by fortified coastal towns, wooden sailing ships, enormous canvas sails and rugged tropical cliffs. Weathered wooden docks extend into dark turquoise water. Stone fortresses overlook the harbour while dramatic storm clouds gather offshore. Authentic maritime architecture and historical atmosphere.` },

    {
        Set23: `**THE HEAVENLY MOUNTAIN TEMPLE**
An enormous sacred temple complex positioned on the summit of an isolated mountain above an endless sea of clouds. Monumental staircases, carved stone gateways, elegant pavilions and ancient statues lead toward the central sanctuary. Golden sunlight illuminates the architecture while distant peaks emerge through atmospheric mist.` },

    {
        Set24: `**THE POST-APOCALYPTIC MEGACITY**
An enormous abandoned modern metropolis slowly reclaimed by nature. Towering skyscrapers, collapsed bridges and ruined highways disappear beneath dense vegetation. Trees grow through abandoned buildings while rivers flow through former urban streets. Heavy atmospheric haze, dramatic clouds and realistic urban decay create a powerful cinematic landscape.` },

    {
        Set25: `**THE ANCIENT CANYON KINGDOM**
A gigantic red-rock canyon containing monumental natural arches, towering sandstone pillars, deep ravines and winding rivers. Ancient stone structures are built into the cliff faces. Small waterfalls descend through narrow rock passages. Warm sunset illumination creates extraordinary depth and rich natural textures.` },

    {
        Set26: `**THE ENCHANTED AUTUMN VALLEY**
An enormous mountainous valley covered in golden, crimson and amber autumn forests. A winding river passes through the landscape, reflecting the colourful trees and dramatic sky. Ancient stone bridges cross the water while distant castles sit on isolated mountain ridges. Soft sunlight, drifting leaves and atmospheric mist.` },

    {
        Set27: `**THE MOONLIT GOTHIC CASTLE**
A gigantic Gothic castle standing on an isolated mountain surrounded by deep forests and jagged cliffs. Hundreds of narrow windows glow faintly against the night. Enormous towers, stone battlements, pointed rooftops and monumental gateways dominate the skyline. A vast moon illuminates the clouds and creates dramatic silver reflections.` },

    {
        Set28: `**THE ALIEN DESERT PLANET**
A spectacular extraterrestrial landscape featuring immense red sand dunes, unusual rock formations, distant mountain ranges and enormous geological structures. A giant ringed planet dominates the sky. Strange but scientifically plausible vegetation grows near isolated water sources. Atmospheric dust, dramatic sunlight and photorealistic science-fiction environmental design.` },

    {
        Set29: `**THE GRAND OPERA PALACE**
An enormous nineteenth-century European palace featuring monumental marble staircases, ornate ceilings, elaborate chandeliers, gilded columns and vast ceremonial halls. Grand arched windows overlook formal gardens. Polished marble floors create realistic reflections while warm architectural lighting emphasises luxurious materials and sophisticated composition.` },

    {
        Set30: `**THE ANCIENT BATTLEFIELD**
An immense historical battlefield extending across rolling green hills beneath a dramatic storm-filled sky. Distant medieval castles overlook the valley. Broken wooden siege structures, abandoned shields and scattered banners create a sense of historical scale. Heavy atmospheric clouds and directional sunlight illuminate the landscape.` },

    {
        Set31: `**THE TROPICAL VOLCANIC ISLAND**
An enormous isolated tropical island containing steep volcanic mountains, dense jungle, black-sand beaches and spectacular coastal waterfalls. Turquoise ocean surrounds the island while dramatic clouds gather around the volcanic summit. Palm forests and rugged cliffs create a luxurious yet wild natural environment.` },

    {
        Set32: `**THE ANCIENT EGYPTIAN TEMPLE COMPLEX**
A vast archaeological landscape containing enormous Egyptian temples, colossal statues, monumental obelisks and intricately carved sandstone columns. Vast ceremonial courtyards extend toward the desert horizon. Ancient hieroglyphs cover weathered stone walls. Strong golden sunlight and atmospheric desert haze create historical cinematic grandeur.` },

    {
        Set33: `**THE NORTHERN LIGHTS WILDERNESS**
An enormous Arctic landscape containing snow-covered mountain ranges, frozen lakes, dark pine forests and isolated wooden cabins. Brilliant green and violet aurora formations stretch across the night sky. Reflections shimmer across frozen water while distant mountain silhouettes create extraordinary depth. Photorealistic natural night cinematography.` },

    {
        Set34: `**THE SUNKEN ATLANTEAN PALACE**
A gigantic ancient underwater palace surrounded by monumental columns, enormous stone statues, submerged courtyards and intricate architectural domes. Colourful marine vegetation grows across the ruins. Huge schools of fish move through the abandoned structures. Deep blue water, natural light shafts and mysterious underwater atmosphere.` },

    {
        Set35: `**THE GRAND ALPINE CHALET LANDSCAPE**
A magnificent Alpine valley surrounded by enormous snow-covered mountains, dramatic rocky peaks and dense evergreen forests. Elegant traditional wooden chalets sit beside frozen lakes and winding mountain roads. Snow falls gently through the air while warm sunlight illuminates distant peaks. Refined European mountain cinematography.` },

    {
        Set36: `**THE ANCIENT JAPANESE IMPERIAL GARDEN**
A monumental traditional Japanese garden containing elegant wooden pavilions, curved bridges, stone lanterns, reflective lakes and meticulously maintained gardens. Cherry blossom trees frame the architecture while distant forested mountains rise behind the complex. Delicate mist, natural reflections and sophisticated peaceful composition.` },

    {
        Set37: `**THE GREAT AFRICAN WATERFALL GORGE**
An immense tropical river plunges through a monumental rocky gorge surrounded by dense rainforest. Powerful waterfalls create enormous clouds of mist that rise above the cliffs. Vegetation clings to the rock faces and distant rainbows appear in the sunlight. Spectacular natural scale and realistic water movement.` },

    {
        Set38: `**THE FUTURISTIC MEGASTRUCTURE**
A gigantic futuristic architectural complex rising above an enormous planetary landscape. Towering geometric structures, monumental bridges, illuminated towers and vast elevated platforms dominate the horizon. Distant atmospheric clouds move between the buildings. Metallic surfaces reflect the surrounding environment. Sophisticated high-end science-fiction architecture.` },

    {
        Set39: `**THE ANCIENT CELTIC SACRED LANDSCAPE**
An enormous mystical-looking but photorealistic landscape of rolling green hills, ancient standing stones, prehistoric stone circles and ruined Celtic monasteries. Dense forests and distant mountains frame the horizon. Morning mist drifts through the valleys. Weathered stone, natural vegetation and soft golden sunlight create a powerful historical atmosphere.` },

    {
        Set40: `**THE GRAND BAROQUE ROYAL SQUARE**
An immense European royal square surrounded by monumental Baroque palaces, ornate facades, grand fountains and elaborate sculptural monuments. Perfectly arranged gardens and stone pathways extend through the composition. Reflective water features capture the surrounding architecture. Luxurious materials, warm natural light and sophisticated architectural symmetry.` },

    {
        Set41: `**THE ENDLESS OCEAN CLIFFS**
An enormous rugged coastline featuring towering cliffs, dramatic rock formations and powerful waves crashing against the shoreline. Seabirds circle above the water while distant islands disappear into atmospheric haze. Storm clouds open to reveal dramatic shafts of sunlight. Deep blue water and natural geological textures create an epic cinematic environment.` },

    {
        Set42: `**THE ANCIENT MAYAN MOUNTAIN CITY**
A colossal ancient Mesoamerican city built across a mountainous rainforest landscape. Enormous stepped pyramids, ceremonial plazas, stone staircases and monumental carved monuments rise above the jungle canopy. Mist moves through the valleys while warm sunlight illuminates the weathered architecture. Authentic archaeological detail and epic historical scale.` },

    {
        Set43: `**THE ENORMOUS ICE CATHEDRAL**
A breathtaking natural ice cavern containing gigantic frozen columns, translucent ice walls, enormous crystal formations and frozen waterfalls. Soft blue light travels through the ice, creating intricate reflections and luminous patterns. A frozen lake extends toward the cavern's monumental central chamber. Photorealistic geological detail and dramatic atmosphere.` },

    {
        Set44: `**THE GOLDEN DESERT SUNSET**
An endless desert landscape containing enormous sculpted sand dunes, isolated rocky mountains and ancient stone monuments. The low sun creates long shadows across the dunes, illuminating their intricate textures in amber and gold. Fine dust moves through the atmosphere. Expansive cinematic composition with a vast dramatic horizon.` },

    {
        Set45: `**THE MEDIEVAL RIVERSIDE CAPITAL**
A magnificent medieval European capital built along an enormous winding river. Monumental stone bridges connect fortified districts, while enormous cathedrals, castle towers and merchant buildings dominate the skyline. Wooden sailing vessels and historic docks line the waterfront. Warm evening light reflects across the water and illuminates the architecture.` },

    {
        Set46: `**THE BIOLUMINESCENT JUNGLE**
An immense tropical rainforest at night containing enormous trees, glowing fungi, luminous flowers and dense exotic vegetation. A winding river reflects subtle blue-green bioluminescence. Fine mist moves between the trees while moonlight penetrates the canopy. Extraordinary organic detail, natural atmospheric depth and cinematic mystery.` },

    {
        Set47: `**THE GRAND VICTORIAN RAILWAY STATION**
A monumental nineteenth-century railway terminal featuring enormous iron arches, glass ceilings, elaborate stone facades and intricate industrial engineering. Vast platforms extend into the distance beneath a spectacular architectural roof. Polished stone floors reflect warm lantern lighting. Authentic Victorian construction, detailed metalwork and cinematic architectural photography.` },

    {
        Set48: `**THE ANCIENT SKY TEMPLE**
An immense monumental temple constructed across the summit of an isolated mountain peak. Huge stone staircases, symmetrical towers, ancient statues and elevated ceremonial platforms overlook a vast landscape of clouds and distant mountains. Strong sunlight creates long shadows across the architecture. Sacred monumental scale and epic fantasy atmosphere.` },

    {
        Set49: `**THE COSMIC NEBULA LANDSCAPE**
An extraordinary deep-space environment featuring enormous colourful nebula formations, distant galaxies, luminous star clusters and massive celestial structures. A mysterious planetary horizon dominates the foreground. Vast clouds of cosmic dust extend across the composition. Realistic astronomical lighting, immense spatial scale and sophisticated photorealistic science-fiction imagery.` },

    {
        Set50: `**THE WORLD'S EDGE**
A monumental landscape at the edge of an immense mountain plateau overlooking an endless ocean of clouds. Towering rock formations, ancient stone ruins and dramatic natural arches frame the foreground. Distant mountain ranges disappear into the horizon. Powerful sunlight breaks through enormous layered storm clouds, creating extraordinary volumetric rays, atmospheric perspective and a breathtaking final cinematic vista.` },

    { Character1: `A distinguished 72-year-old male king with a long silver beard, deeply lined face, piercing blue eyes and an imposing physical presence. Broad shoulders, slightly stooped posture. Wearing an elaborate dark velvet royal robe, embroidered gold details, an ornate crown and heavy signet rings. His expression conveys wisdom, authority and the burden of decades of leadership.` },

    { Character2: `A determined 28-year-old female warrior with an athletic muscular build, olive complexion, sharp green eyes and long dark braided hair. A small scar crosses her left cheek. Wearing practical weathered leather armour, dark wool trousers, reinforced boots and a weathered cloak. Carries a historically appropriate sword and shield. Her expression is fearless and focused.` },

    { Character3: `A charismatic 45-year-old male pirate captain with sun-weathered skin, shoulder-length dark brown hair, a thick salt-and-pepper beard and intense hazel eyes. Wearing a weathered linen shirt, dark waistcoat, leather belt, tricorn hat, worn breeches and tall leather boots. Carries an antique compass and a cutlass.` },

    { Character4: `An elegant 65-year-old female royal advisor with pale skin, silver hair arranged in an elaborate braided hairstyle, intelligent dark eyes and a composed expression. Wearing a richly textured burgundy velvet gown, intricate embroidery, pearl jewellery and a delicate gold necklace. Her posture conveys intelligence, influence and quiet authority.` },

    { Character5: `A curious 12-year-old boy with tousled chestnut hair, freckles, bright blue eyes and a slender build. Wearing a simple linen shirt, worn brown trousers, leather shoes and a weathered travelling cloak. Carries a small leather satchel and an old wooden compass. His expression suggests curiosity and youthful determination.` },

    { Character6: `A mysterious 38-year-old female archaeologist with shoulder-length black hair, warm olive skin, dark brown eyes and a lean athletic build. Wearing practical expedition clothing, a faded khaki shirt, utility trousers, leather boots and a canvas field jacket. Carries a leather notebook, measuring equipment and a canvas shoulder bag.` },

    { Character7: `A formidable 55-year-old male Viking chieftain with a muscular build, long braided grey hair, a thick reddish-grey beard and pale blue eyes. His face is marked by deep scars and weathered skin. Wearing layered wool clothing, fur-lined leather armour, a heavy cloak and iron jewellery. Carries a battle-worn axe.` },

    { Character8: `A sophisticated 32-year-old female scientist with fair skin, shoulder-length auburn hair, grey-green eyes and a slim build. Wearing a fitted dark research jacket, practical trousers and understated professional clothing. Carries a digital tablet and scientific instruments. Her expression is analytical, intelligent and observant.` },

    { Character9: `A rugged 68-year-old male wilderness explorer with deeply weathered skin, thick white beard, pale blue eyes and a broad frame. Wearing a heavy waxed canvas coat, knitted wool sweater, practical outdoor trousers, leather gloves and worn boots. Carries a walking staff and a weathered expedition backpack.` },

    { Character10: `A confident 24-year-old female royal archer with long copper-red hair, pale freckled skin, green eyes and an athletic build. Wearing a dark green leather tunic, fitted leather trousers, bracers and practical boots. Carries a handcrafted wooden longbow and a quiver of arrows.` },

    { Character11: `A 90-year-old male village storyteller with a small frail frame, deeply wrinkled face, gentle brown eyes and long flowing white hair. Wearing a simple earth-coloured wool robe, linen shirt and worn leather sandals. His expression is kind and knowing, with the appearance of someone who has witnessed generations of history.` },

    { Character12: `A powerful 42-year-old female military commander with a strong athletic build, short dark hair, olive complexion and intense brown eyes. Wearing practical dark tactical clothing, a fitted military jacket, utility trousers and heavy boots. Her posture is disciplined and authoritative.` },

    { Character13: `A 19-year-old male apprentice blacksmith with a lean muscular build, messy dark hair, brown eyes and soot-stained skin. Wearing a coarse linen shirt, leather apron, dark trousers and heavy work boots. His hands are calloused and his expression is earnest and determined.` },

    { Character14: `A mysterious 76-year-old female herbalist with long silver-white hair, deeply lined skin, pale green eyes and a slender frame. Wearing layered natural linen garments, a dark wool shawl and an assortment of small handcrafted necklaces. Carries a woven basket containing herbs and medicinal plants.` },

    { Character15: `A distinguished 50-year-old male Victorian detective with a narrow face, neatly trimmed dark moustache, receding hairline and observant grey eyes. Wearing a tailored charcoal three-piece suit, waistcoat, white shirt, pocket watch and long dark overcoat. Carries a leather notebook.` },

    { Character16: `A striking 29-year-old female space explorer with dark skin, short tightly curled black hair, dark brown eyes and an athletic build. Wearing a sophisticated functional spacecraft pressure suit with realistic technical fastenings, reinforced sections and mission equipment. Her expression is confident and intelligent.` },

    { Character17: `A 7-year-old girl with curly blonde hair, bright green eyes, rosy cheeks and a small delicate build. Wearing a simple cream-coloured knitted cardigan, blue dress, woollen socks and practical shoes. Carries a small handmade wooden toy. Her expression is curious and expressive.` },

    { Character18: `A 61-year-old male Buddhist monk with a shaved head, gentle facial features, warm brown eyes and a lean frame. Wearing traditional saffron and burgundy robes with simple sandals. His posture is relaxed and composed, conveying wisdom, discipline and inner peace.` },

    { Character19: `A glamorous 35-year-old female nightclub singer with dark wavy hair, expressive hazel eyes and an elegant hourglass build. Wearing a sophisticated black evening gown with subtle silver detailing, delicate earrings and elegant heels. Her expression conveys confidence, mystery and theatrical charm.` },

    { Character20: `A 47-year-old male desert nomad with dark sun-weathered skin, deep brown eyes, a thick black beard and a lean muscular build. Wearing layered sand-coloured robes, a wrapped headscarf, leather sandals and a weathered leather belt. Carries a traditional walking staff and water flask.` },

    { Character21: `A 58-year-old female pirate navigator with shoulder-length silver-streaked black hair, tanned skin, sharp brown eyes and a sturdy build. Wearing a weathered linen shirt, dark leather waistcoat, worn trousers, broad leather belt and practical sea boots. Carries an antique brass compass and navigational charts.` },

    { Character22: `A 33-year-old male medieval knight with a powerful muscular build, shoulder-length brown hair, short beard and intense blue eyes. Wearing historically inspired steel plate armour over chainmail, a dark red surcoat, leather gloves and heavy boots. Carries a longsword and weathered shield.` },

    { Character23: `A 26-year-old female investigative journalist with medium-brown skin, shoulder-length curly dark hair, expressive dark eyes and a slim athletic build. Wearing contemporary practical clothing consisting of a leather jacket, dark trousers and boots. Carries a notebook, camera bag and recording equipment.` },

    { Character24: `A 79-year-old male retired admiral with silver hair, a neatly maintained white moustache, pale blue eyes and a tall dignified frame. Wearing an immaculate historical naval uniform with brass buttons, epaulettes and carefully polished boots. His expression conveys authority, discipline and experience.` },

    { Character25: `A 40-year-old female tribal healer with dark brown skin, tightly braided black hair, deep brown eyes and a strong build. Wearing natural woven fabrics, handcrafted necklaces, leather accessories and traditional garments appropriate to her fictional community. Her expression is calm, observant and authoritative.` },

    { Character26: `A 16-year-old male street musician with messy dark curls, warm olive skin, brown eyes and a slender frame. Wearing a faded denim jacket, simple T-shirt, worn trousers and canvas shoes. Carries a weathered acoustic guitar. His expression is thoughtful and quietly rebellious.` },

    { Character27: `A 63-year-old female queen with an elegant upright posture, pale complexion, piercing blue eyes and carefully styled silver hair. Wearing an elaborate midnight-blue velvet gown, gold embroidery, a jewelled crown and sophisticated royal jewellery. Her expression conveys regal authority and restrained emotion.` },

    { Character28: `A 31-year-old male wildlife photographer with a lean athletic build, sun-tanned skin, short sandy hair, green eyes and light stubble. Wearing a practical olive field jacket, khaki trousers, hiking boots and a weathered backpack. Carries professional wildlife photography equipment.` },

    { Character29: `A 44-year-old female forensic scientist with pale skin, short dark auburn hair, thin-framed glasses and intelligent grey eyes. Wearing a clean white laboratory coat over professional clothing, practical shoes and disposable laboratory gloves. Her expression is analytical and precise.` },

    { Character30: `A 53-year-old male tribal warrior with a powerful athletic build, dark skin, closely cropped hair, a thick black beard and distinctive facial scars. Wearing historically inspired leather armour, woven fabrics, handcrafted jewellery and practical footwear. Carries a traditional spear and wooden shield.` },

    { Character31: `A 22-year-old female Nordic explorer with fair skin, long platinum-blonde hair, vivid green eyes and a strong athletic build. Wearing a weathered wool tunic, fur-lined leather jacket, fitted trousers, practical boots and a thick travelling cloak. Her expression is adventurous and determined.` },

    { Character32: `A 70-year-old male astronomer with a slender frame, long white hair, a neatly trimmed beard and thoughtful dark eyes. Wearing a dark wool coat, high-collared shirt and simple historical clothing. Carries an antique brass telescope and a collection of handwritten astronomical charts.` },

    { Character33: `A 36-year-old female futuristic engineer with a medium athletic build, warm brown skin, short asymmetrical black hair and dark eyes. Wearing a practical graphite-coloured technical jumpsuit with reinforced shoulders, functional fastenings and a compact utility belt. Her expression is intelligent and confident.` },

    { Character34: `A 48-year-old male Japanese samurai with a lean muscular build, dark eyes, shoulder-length black hair tied traditionally and a neatly maintained moustache. Wearing historically inspired layered samurai armour, a dark indigo kimono, traditional hakama trousers and carrying two sheathed swords.` },

    { Character35: `A 27-year-old female classical dancer with an elegant athletic build, olive complexion, long dark hair arranged in a traditional bun and expressive brown eyes. Wearing a flowing ivory silk performance costume with subtle gold embroidery, delicate jewellery and traditional dance footwear.` },

    { Character36: `A 57-year-old male ship captain with weather-beaten skin, grey hair, a thick beard and piercing blue eyes. Wearing a dark navy maritime coat, knitted sweater, weathered trousers and leather sea boots. Carries an old brass telescope and a ring of cabin keys.` },

    { Character37: `A 10-year-old boy with dark curly hair, large brown eyes, warm olive skin and a slim build. Wearing a simple linen shirt, dark waistcoat, knee-length trousers and worn leather shoes. Carries a small wooden lantern. His expression is adventurous and inquisitive.` },

    { Character38: `A 34-year-old female archaeologist specialising in ancient civilisations, with dark skin, long braided black hair, brown eyes and an athletic build. Wearing practical sand-coloured expedition clothing, reinforced boots, a utility belt and a lightweight canvas jacket. Carries ancient parchment maps and archaeological tools.` },

    { Character39: `A 75-year-old male Catholic priest with a narrow weathered face, short silver hair, gentle blue eyes and a slender frame. Wearing traditional black clerical clothing with a white collar, a dark wool overcoat and simple shoes. Carries an old leather-bound prayer book.` },

    { Character40: `A 30-year-old male professional racing driver with an athletic build, short dark hair, clean-shaven face and focused brown eyes. Wearing a contemporary professional racing suit, protective gloves and racing boots. His expression conveys concentration and competitive determination.` },

    { Character41: `A 46-year-old female mountain guide with a strong athletic build, sun-weathered skin, dark blonde hair tied in a practical ponytail and clear blue eyes. Wearing layered outdoor clothing, a waterproof jacket, insulated trousers, mountaineering boots and a large climbing backpack.` },

    { Character42: `A 64-year-old male African tribal elder with dark weathered skin, a closely cropped grey beard, wise dark eyes and a dignified posture. Wearing elegant traditional woven garments, handcrafted necklaces and a decorative walking staff. His expression conveys patience, authority and deep experience.` },

    { Character43: `A 25-year-old female Victorian inventor with pale skin, dark auburn hair pinned into a practical bun, brown eyes and a slim build. Wearing a historically inspired high-necked blouse, fitted waistcoat, long dark skirt and leather workshop apron. Carries a small brass mechanical instrument.` },

    { Character44: `A 39-year-old male cowboy with a rugged athletic build, weathered complexion, short sandy-brown hair, a thick beard and pale blue eyes. Wearing a traditional brown cowboy hat, faded denim shirt, leather waistcoat, worn jeans, leather boots and a gun belt appropriate to the late nineteenth century.` },

    { Character45: `An elegant 52-year-old female opera singer with fair skin, dark wavy hair, expressive brown eyes and a graceful build. Wearing an elaborate deep burgundy evening gown with intricate embroidery, delicate jewellery and long satin gloves. Her expression is dramatic, sophisticated and emotionally expressive.` },

    { Character46: `A 32-year-old male deep-sea diver with a powerful athletic build, closely cropped dark hair, short beard and green eyes. Wearing a realistic modern technical diving suit, buoyancy equipment, diving mask, breathing apparatus and underwater instruments.` },

    { Character47: `A 59-year-old female former intelligence officer with short silver-blonde hair, sharp grey eyes, fair weathered skin and a fit build. Wearing understated contemporary clothing consisting of a tailored charcoal coat, dark trousers, leather gloves and practical boots. Her expression is composed, observant and guarded.` },

    { Character48: `A 20-year-old male medieval squire with a slender athletic build, shoulder-length chestnut hair, green eyes and a youthful face. Wearing a simple linen tunic beneath a weathered leather gambeson, dark trousers, practical boots and a modest belt. Carries a wooden training sword.` },

    { Character49: `A 43-year-old female wildlife veterinarian with warm brown skin, shoulder-length dark curly hair, dark eyes and a practical athletic build. Wearing a khaki field shirt, olive trousers, outdoor boots and a veterinary field vest. Carries a medical field kit and animal examination equipment.` },

    { Character50: `An imposing 85-year-old male emperor with a tall but frail frame, long flowing silver hair, a carefully groomed white beard and penetrating dark eyes. Wearing an extraordinary ceremonial robe of deep crimson silk with intricate gold embroidery, an elaborate imperial crown and ancient jewelled rings. His expression conveys immense power, age, intelligence and absolute authority.` },

    {
        PhotoStyle1: `Full-body studio portrait standing against a seamless white background, soft even lighting, neutral expression, full-length shot, clean symmetrical composition, high-fashion editorial photography style.`
    },
    {
        PhotoStyle2: `Three-quarter studio portrait standing against a warm grey backdrop, elegant natural pose, soft directional key lighting, subtle shadows, relaxed expression, premium fashion magazine photography style.`
    },
    {
        PhotoStyle3: `Full-body outdoor portrait standing in a natural environment, softly blurred background, gentle daylight, relaxed confident pose, realistic skin texture, professional lifestyle photography style.`
    },
    {
        PhotoStyle4: `Dramatic full-body portrait against a dark charcoal studio background, strong directional side lighting, deep shadows, confident expression, cinematic contrast, luxury editorial photography style.`
    },
    {
        PhotoStyle5: `Mid-length portrait seated on a simple studio stool, neutral beige background, relaxed natural posture, soft diffused lighting, authentic expression, contemporary fashion catalogue photography style.`
    },
    {
        PhotoStyle6: `Full-length character portrait standing against a textured stone wall, natural overcast lighting, understated pose, realistic fabric and skin detail, earthy muted colours, documentary portrait photography style.`
    },
    {
        PhotoStyle7: `Close-up head-and-shoulders studio portrait, looking directly into the camera, seamless light grey background, flattering softbox lighting, sharp facial details, shallow depth of field, professional casting photography style.`
    },
    {
        PhotoStyle8: `Full-body portrait in a minimalist architectural interior, standing naturally beside a large window, soft natural window light, elegant composition, subtle environmental shadows, sophisticated lifestyle editorial photography style.`
    },
    {
        PhotoStyle9: `Full-body fashion portrait against a deep muted colour studio backdrop, expressive confident stance, carefully controlled studio lighting, rich colour contrast, crisp clothing details, avant-garde fashion campaign photography style.`
    },
    {
        PhotoStyle10: `Cinematic environmental portrait standing in a visually rich location, natural atmospheric lighting, composed but authentic expression, balanced foreground and background, realistic textures, premium cinematic character photography style.`
    }

];


module.exports = {
    filepath,
    downloadDir,
    waitForKeypress,
    getInput,
    waitTime,
    waitTimeRandom,
    blocks,
    projectFile
};
