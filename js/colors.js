(function() {
  window.addEventListener('load', function() {
    var classes = [
		'fuic-v1-01 darken', // TURQUOISE
		'fuic-v1-01 lighten', // TURQUOISE
		'fuic-v1-02 darken', // EMERALD
		'fuic-v1-02 lighten', // EMERALD
		'fuic-v1-03 darken', // PETER RIVER
		'fuic-v1-03 lighten', // PETER RIVER
		'fuic-v1-04 darken', // AMETHYST
		'fuic-v1-04 lighten', // AMETHYST
		'fuic-v1-05 darken', // WET ASPHALT
		'fuic-v1-05 lighten', // WET ASPHALT
		
		'fuic-v1-06 darken', // GREEN SEA
		'fuic-v1-06 lighten', // GREEN SEA
		'fuic-v1-07 darken', // NEPHRITIS
		'fuic-v1-07 lighten', // NEPHRITIS
		'fuic-v1-08 darken', // BELIZE HOLE
		'fuic-v1-08 lighten', // BELIZE HOLE
		'fuic-v1-09 darken', // WISTERIA
		'fuic-v1-09 lighten', // WISTERIA
		'fuic-v1-10 darken', // MIDNIGHT BLUE
		'fuic-v1-10 lighten', // MIDNIGHT BLUE
		
		'fuic-v1-11 darken', // SUN FLOWER
		'fuic-v1-11 lighten', // SUN FLOWER
		'fuic-v1-12 darken', // CARROT
		'fuic-v1-12 lighten', // CARROT
		'fuic-v1-13 darken', // ALIZARIN
		'fuic-v1-13 lighten', // ALIZARIN
		'fuic-v1-14 darken', // CLOUDS
		'fuic-v1-14 lighten', // CLOUDS
		'fuic-v1-15 darken', // CONCRETE
		'fuic-v1-15 lighten', // CONCRETE
		
		'fuic-v1-16 darken', // ORANGE
		'fuic-v1-16 lighten', // ORANGE
		'fuic-v1-17 darken', // PUMPKIN
		'fuic-v1-17 lighten', // PUMPKIN
		'fuic-v1-18 darken', // POMEGRANATE
		'fuic-v1-18 lighten', // POMEGRANATE
		'fuic-v1-19 darken', // SILVER
		'fuic-v1-19 lighten', // SILVER
		'fuic-v1-20 darken', // ASBESTOS
		'fuic-v1-20 lighten', // ASBESTOS
		
		'fuic-us-01 darken', // Light Greenish Blue
		'fuic-us-01 lighten', // Light Greenish Blue
		'fuic-us-02 darken', // Faded Poster
		'fuic-us-02 lighten', // Faded Poster
		'fuic-us-03 darken', // Green Darner Tail
		'fuic-us-03 lighten', // Green Darner Tail
		'fuic-us-04 darken', // Shy Moment
		'fuic-us-04 lighten', // Shy Moment
		'fuic-us-05 darken', // City Lights
		'fuic-us-05 lighten', // City Lights
		
		'fuic-us-06 darken', // Mint Leaf
		'fuic-us-06 lighten', // Mint Leaf
		'fuic-us-07 darken', // Robin's Egg Blue
		'fuic-us-07 lighten', // Robin's Egg Blue
		'fuic-us-08 darken', // Electron Blue
		'fuic-us-08 lighten', // Electron Blue
		'fuic-us-09 darken', // Exodus Fruit
		'fuic-us-09 lighten', // Exodus Fruit
		'fuic-us-10 darken', // Soothing Breeze
		'fuic-us-10 lighten', // Soothing Breeze
		
		'fuic-us-11 darken', // Sour Lemon
		'fuic-us-11 lighten', // Sour Lemon
		'fuic-us-12 darken', // First Date
		'fuic-us-12 lighten', // First Date
		'fuic-us-13 darken', // Pink Glamour
		'fuic-us-13 lighten', // Pink Glamour
		'fuic-us-14 darken', // Pico-8 Pink
		'fuic-us-14 lighten', // Pico-8 Pink
		'fuic-us-15 darken', // American River
		'fuic-us-15 lighten', // American River
		
		'fuic-us-16 darken', // Bright Yarrow
		'fuic-us-16 lighten', // Bright Yarrow
		'fuic-us-17 darken', // Orangeville
		'fuic-us-17 lighten', // Orangeville
		'fuic-us-18 darken', // Chi-Gong
		'fuic-us-18 lighten', // Chi-Gong
		'fuic-us-19 darken', // Prunus Avium
		'fuic-us-19 lighten', // Prunus Avium
		'fuic-us-20 darken', // Dracula Orchid
		'fuic-us-20 lighten', // Dracula Orchid
		
		'fuic-au-01 darken', // Beekeeper
		'fuic-au-01 lighten', // Beekeeper
		'fuic-au-02 darken', // Spiced Nectarine
		'fuic-au-02 lighten', // Spiced Nectarine
		'fuic-au-03 darken', // Pink Glamour
		'fuic-au-03 lighten', // Pink Glamour
		'fuic-au-04 darken', // June Bud
		'fuic-au-04 lighten', // June Bud
		'fuic-au-05 darken', // Coastal Breeze
		'fuic-au-05 lighten', // Coastal Breeze
		
		'fuic-au-06 darken', // Turbo
		'fuic-au-06 lighten', // Turbo
		'fuic-au-07 darken', // Quince Jelly
		'fuic-au-07 lighten', // Quince Jelly
		'fuic-au-08 darken', // Carmine Pink
		'fuic-au-08 lighten', // Carmine Pink
		'fuic-au-09 darken', // Pure Apple
		'fuic-au-09 lighten', // Pure Apple
		'fuic-au-10 darken', // Hint of Ice Pack
		'fuic-au-10 lighten', // Hint of Ice Pack
		
		'fuic-au-11 darken', // Middle Blue
		'fuic-au-11 lighten', // Middle Blue
		'fuic-au-12 darken', // Heliotrope
		'fuic-au-12 lighten', // Heliotrope
		'fuic-au-13 darken', // Exodus Fruit
		'fuic-au-13 lighten', // Exodus Fruit
		'fuic-au-14 darken', // Deep Koamaru
		'fuic-au-14 lighten', // Deep Koamaru
		'fuic-au-15 darken', // Soaring Eagle
		'fuic-au-15 lighten', // Soaring Eagle
		
		'fuic-au-16 darken', // Greenland Green
		'fuic-au-16 lighten', // Greenland Green
		'fuic-au-17 darken', // Steel Pink
		'fuic-au-17 lighten', // Steel Pink
		'fuic-au-18 darken', // Blurple
		'fuic-au-18 lighten', // Blurple
		'fuic-au-19 darken', // Deep Cove
		'fuic-au-19 lighten', // Deep Cove
		'fuic-au-20 darken', // Wizard Grey
		'fuic-au-20 lighten', // Wizard Grey
		
		'fuic-gb-01 darken', // Protoss Pylon
		'fuic-gb-01 lighten', // Protoss Pylon
		'fuic-gb-02 darken', // Periwinkle
		'fuic-gb-02 lighten', // Periwinkle
		'fuic-gb-03 darken', // Rise-N-Shine
		'fuic-gb-03 lighten', // Rise-N-Shine
		'fuic-gb-04 darken', // Download Progress
		'fuic-gb-04 lighten', // Download Progress
		'fuic-gb-05 darken', // Seabrook
		'fuic-gb-05 lighten', // Seabrook
		
		'fuic-gb-06 darken', // Vanadyl Blue
		'fuic-gb-06 lighten', // Vanadyl Blue
		'fuic-gb-07 darken', // Matt Purple
		'fuic-gb-07 lighten', // Matt Purple
		'fuic-gb-08 darken', // Nanohanacha Gold
		'fuic-gb-08 lighten', // Nanohanacha Gold
		'fuic-gb-09 darken', // Skirret Green
		'fuic-gb-09 lighten', // Skirret Green
		'fuic-gb-10 darken', // Naval
		'fuic-gb-10 lighten', // Naval
		
		'fuic-gb-11 darken', // Nasturcian Flower
		'fuic-gb-11 lighten', // Nasturcian Flower
		'fuic-gb-12 darken', // Lynx White
		'fuic-gb-12 lighten', // Lynx White
		'fuic-gb-13 darken', // Blueberry Soda
		'fuic-gb-13 lighten', // Blueberry Soda
		'fuic-gb-14 darken', // Mazarine Blue
		'fuic-gb-14 lighten', // Mazarine Blue
		'fuic-gb-15 darken', // Blue Nights
		'fuic-gb-15 lighten', // Blue Nights
		
		'fuic-gb-16 darken', // Harley Davidson Orange
		'fuic-gb-16 lighten', // Harley Davidson Orange
		'fuic-gb-17 darken', // Hint of Pensive
		'fuic-gb-17 lighten', // Hint of Pensive
		'fuic-gb-18 darken', // Chain Gang Grey
		'fuic-gb-18 lighten', // Chain Gang Grey
		'fuic-gb-19 darken', // Pico Void
		'fuic-gb-19 lighten', // Pico Void
		'fuic-gb-20 darken', // Electromagnetic
		'fuic-gb-20 lighten', // Electromagnetic
		
		'fuic-ca-01 darken', // Jigglypuff
		'fuic-ca-01 lighten', // Jigglypuff
		'fuic-ca-02 darken', // Casandora Yellow
		'fuic-ca-02 lighten', // Casandora Yellow
		'fuic-ca-03 darken', // Pastel Red
		'fuic-ca-03 lighten', // Pastel Red
		'fuic-ca-04 darken', // Megaman
		'fuic-ca-04 lighten', // Megaman
		'fuic-ca-05 darken', // Wild Caribbean Green
		'fuic-ca-05 lighten', // Wild Caribbean Green
		
		'fuic-ca-06 darken', // Lián Hóng Lotus Pink
		'fuic-ca-06 lighten', // Lián Hóng Lotus Pink
		'fuic-ca-07 darken', // Double Dragon Skin
		'fuic-ca-07 lighten', // Double Dragon Skin
		'fuic-ca-08 darken', // Amour
		'fuic-ca-08 lighten', // Amour
		'fuic-ca-09 darken', // Cyanite
		'fuic-ca-09 lighten', // Cyanite
		'fuic-ca-10 darken', // Dark Mountain Meadow
		'fuic-ca-10 lighten', // Dark Mountain Meadow
		
		'fuic-ca-11 darken', // Jade Dust
		'fuic-ca-11 lighten', // Jade Dust
		'fuic-ca-12 darken', // Joust Blue
		'fuic-ca-12 lighten', // Joust Blue
		'fuic-ca-13 darken', // Nasu Purple
		'fuic-ca-13 lighten', // Nasu Purple
		'fuic-ca-14 darken', // Light Blue Ballerina
		'fuic-ca-14 lighten', // Light Blue Ballerina
		'fuic-ca-15 darken', // Fuel Town
		'fuic-ca-15 lighten', // Fuel Town
		
		'fuic-ca-16 darken', // Aqua Velvet
		'fuic-ca-16 lighten', // Aqua Velvet
		'fuic-ca-17 darken', // Bleu De France
		'fuic-ca-17 lighten', // Bleu De France
		'fuic-ca-18 darken', // Bluebell
		'fuic-ca-18 lighten', // Bluebell
		'fuic-ca-19 darken', // Storm Petrel
		'fuic-ca-19 lighten', // Storm Petrel
		'fuic-ca-20 darken', // Imperial Primer
		'fuic-ca-20 lighten', // Imperial Primer
		
		'fuic-cn-01 darken', // Golden Sand
		'fuic-cn-01 lighten', // Golden Sand
		'fuic-cn-02 darken', // Coral
		'fuic-cn-02 lighten', // Coral
		'fuic-cn-03 darken', // Wild Watermelon
		'fuic-cn-03 lighten', // Wild Watermelon
		'fuic-cn-04 darken', // Peace
		'fuic-cn-04 lighten', // Peace
		'fuic-cn-05 darken', // Grisaille
		'fuic-cn-05 lighten', // Grisaille
		
		'fuic-cn-06 darken', // Orange
		'fuic-cn-06 lighten', // Orange
		'fuic-cn-07 darken', // Bruschetta Tomato
		'fuic-cn-07 lighten', // Bruschetta Tomato
		'fuic-cn-08 darken', // Watermelon
		'fuic-cn-08 lighten', // Watermelon
		'fuic-cn-09 darken', // Bay Wharf
		'fuic-cn-09 lighten', // Bay Wharf
		'fuic-cn-10 darken', // Prestige Blue
		'fuic-cn-10 lighten', // Prestige Blue
		
		'fuic-cn-11 darken', // Lime Soap
		'fuic-cn-11 lighten', // Lime Soap
		'fuic-cn-12 darken', // French Sky Blue
		'fuic-cn-12 lighten', // French Sky Blue
		'fuic-cn-13 darken', // Saturated Sky
		'fuic-cn-13 lighten', // Saturated Sky
		'fuic-cn-14 darken', // White
		'fuic-cn-14 lighten', // White
		'fuic-cn-15 darken', // City Lights
		'fuic-cn-15 lighten', // City Lights
		
		'fuic-cn-16 darken', // UFO Green
		'fuic-cn-16 lighten', // UFO Green
		'fuic-cn-17 darken', // Clear Chill
		'fuic-cn-17 lighten', // Clear Chill
		'fuic-cn-18 darken', // Bright Greek
		'fuic-cn-18 lighten', // Bright Greek
		'fuic-cn-19 darken', // Anti-Flash White
		'fuic-cn-19 lighten', // Anti-Flash White
		'fuic-cn-20 darken', // Twinkle Blue
		'fuic-cn-20 lighten', // Twinkle Blue
		
		'fuic-nl-01 darken', // Sunflower
		'fuic-nl-01 lighten', // Sunflower
		'fuic-nl-02 darken', // Energos
		'fuic-nl-02 lighten', // Energos
		'fuic-nl-03 darken', // Blue Martina
		'fuic-nl-03 lighten', // Blue Martina
		'fuic-nl-04 darken', // Lavender Rose
		'fuic-nl-04 lighten', // Lavender Rose
		'fuic-nl-05 darken', // Bara Red
		'fuic-nl-05 lighten', // Bara Red
		
		'fuic-nl-06 darken', // Radiant Yellow
		'fuic-nl-06 lighten', // Radiant Yellow
		'fuic-nl-07 darken', // Android Green
		'fuic-nl-07 lighten', // Android Green
		'fuic-nl-08 darken', // Mediterranean Sea
		'fuic-nl-08 lighten', // Mediterranean Sea
		'fuic-nl-09 darken', // Lavender Tea
		'fuic-nl-09 lighten', // Lavender Tea
		'fuic-nl-10 darken', // Very Berry
		'fuic-nl-10 lighten', // Very Berry
		
		'fuic-nl-11 darken', // Puffins Bill
		'fuic-nl-11 lighten', // Puffins Bill
		'fuic-nl-12 darken', // Pixelated Grass
		'fuic-nl-12 lighten', // Pixelated Grass
		'fuic-nl-13 darken', // Merchant Marine Blue
		'fuic-nl-13 lighten', // Merchant Marine Blue
		'fuic-nl-14 darken', // Forgotten Purple
		'fuic-nl-14 lighten', // Forgotten Purple
		'fuic-nl-15 darken', // Hollyhock
		'fuic-nl-15 lighten', // Hollyhock
		
		'fuic-nl-16 darken', // Red Pigment
		'fuic-nl-16 lighten', // Red Pigment
		'fuic-nl-17 darken', // Turkish Aqua
		'fuic-nl-17 lighten', // Turkish Aqua
		'fuic-nl-18 darken', // 20000 Leagues Under the Sea
		'fuic-nl-18 lighten', // 20000 Leagues Under the Sea
		'fuic-nl-19 darken', // Circumorbital Ring
		'fuic-nl-19 lighten', // Circumorbital Ring
		'fuic-nl-20 darken', // Magenta Purple
		'fuic-nl-20 lighten', // Magenta Purple
		
		'fuic-fr-01 darken', // Flat Flesh
		'fuic-fr-01 lighten', // Flat Flesh
		'fuic-fr-02 darken', // Melon Melody
		'fuic-fr-02 lighten', // Melon Melody
		'fuic-fr-03 darken', // Livid
		'fuic-fr-03 lighten', // Livid
		'fuic-fr-04 darken', // Spray
		'fuic-fr-04 lighten', // Spray
		'fuic-fr-05 darken', // Paradise Green
		'fuic-fr-05 lighten', // Paradise Green
		
		'fuic-fr-06 darken', // Squash Blossom
		'fuic-fr-06 lighten', // Squash Blossom
		'fuic-fr-07 darken', // Mandarin Red
		'fuic-fr-07 lighten', // Mandarin Red
		'fuic-fr-08 darken', // Azraq Blue
		'fuic-fr-08 lighten', // Azraq Blue
		'fuic-fr-09 darken', // Dupain
		'fuic-fr-09 lighten', // Dupain
		'fuic-fr-10 darken', // Aurora Green
		'fuic-fr-10 lighten', // Aurora Green
		
		'fuic-fr-11 darken', // Iceland Poppy
		'fuic-fr-11 lighten', // Iceland Poppy
		'fuic-fr-12 darken', // Tomato Red
		'fuic-fr-12 lighten', // Tomato Red
		'fuic-fr-13 darken', // Yuè Guāng Lán Blue
		'fuic-fr-13 lighten', // Yuè Guāng Lán Blue
		'fuic-fr-14 darken', // Good Samaritan
		'fuic-fr-14 lighten', // Good Samaritan
		'fuic-fr-15 darken', // Waterfall
		'fuic-fr-15 lighten', // Waterfall
		
		'fuic-fr-16 darken', // Carrot Orange
		'fuic-fr-16 lighten', // Carrot Orange
		'fuic-fr-17 darken', // Jalapeno Red
		'fuic-fr-17 lighten', // Jalapeno Red
		'fuic-fr-18 darken', // Dark Sapphire
		'fuic-fr-18 lighten', // Dark Sapphire
		'fuic-fr-19 darken', // Forest Blues
		'fuic-fr-19 lighten', // Forest Blues
		'fuic-fr-20 darken', // Reef Encounter
		'fuic-fr-20 lighten', // Reef Encounter
		
		'fuic-de-01 darken', // Fusion Red
		'fuic-de-01 lighten', // Fusion Red
		'fuic-de-02 darken', // Orange Hibiscus
		'fuic-de-02 lighten', // Orange Hibiscus
		'fuic-de-03 darken', // Flirtatious
		'fuic-de-03 lighten', // Flirtatious
		'fuic-de-04 darken', // Reptile Green
		'fuic-de-04 lighten', // Reptile Green
		'fuic-de-05 darken', // Maximum Blue Green
		'fuic-de-05 lighten', // Maximum Blue Green
		
		'fuic-de-06 darken', // Desire
		'fuic-de-06 lighten', // Desire
		'fuic-de-07 darken', // Beniukon Bronze
		'fuic-de-07 lighten', // Beniukon Bronze
		'fuic-de-08 darken', // NYC Taxi
		'fuic-de-08 lighten', // NYC Taxi
		'fuic-de-09 darken', // Algal Fuel
		'fuic-de-09 lighten', // Algal Fuel
		'fuic-de-10 darken', // Turquoise Topaz
		'fuic-de-10 lighten', // Turquoise Topaz
		
		'fuic-de-11 darken', // High Blue
		'fuic-de-11 lighten', // High Blue
		'fuic-de-12 darken', // C64 NTSC
		'fuic-de-12 lighten', // C64 NTSC
		'fuic-de-13 darken', // Lighter Purple
		'fuic-de-13 lighten', // Lighter Purple
		'fuic-de-14 darken', // Twinkle Blue
		'fuic-de-14 lighten', // Twinkle Blue
		'fuic-de-15 darken', // Blue Grey
		'fuic-de-15 lighten', // Blue Grey
		
		'fuic-de-16 darken', // Boyzone
		'fuic-de-16 lighten', // Boyzone
		'fuic-de-17 darken', // Royal Blue
		'fuic-de-17 lighten', // Royal Blue
		'fuic-de-18 darken', // Gloomy Purple
		'fuic-de-18 lighten', // Gloomy Purple
		'fuic-de-19 darken', // Innuendo
		'fuic-de-19 lighten', // Innuendo
		'fuic-de-20 darken', // Blue Horizon
		'fuic-de-20 lighten', // Blue Horizon
		
		'fuic-in-01 darken', // Orchid Orange
		'fuic-in-01 lighten', // Orchid Orange
		'fuic-in-02 darken', // Spiro Disco Ball
		'fuic-in-02 lighten', // Spiro Disco Ball
		'fuic-in-03 darken', // Honey Glow
		'fuic-in-03 lighten', // Honey Glow
		'fuic-in-04 darken', // Sweet Garden
		'fuic-in-04 lighten', // Sweet Garden
		'fuic-in-05 darken', // Falling Star
		'fuic-in-05 lighten', // Falling Star
		
		'fuic-in-06 darken', // Rich Gardenia
		'fuic-in-06 lighten', // Rich Gardenia
		'fuic-in-07 darken', // Clear Chill
		'fuic-in-07 lighten', // Clear Chill
		'fuic-in-08 darken', // Sarawak White Pepper
		'fuic-in-08 lighten', // Sarawak White Pepper
		'fuic-in-09 darken', // Keppel
		'fuic-in-09 lighten', // Keppel
		'fuic-in-10 darken', // Ship's Officer
		'fuic-in-10 lighten', // Ship's Officer
		
		'fuic-in-11 darken', // Fiery Fuchsia
		'fuic-in-11 lighten', // Fiery Fuchsia
		'fuic-in-12 darken', // Bluebell
		'fuic-in-12 lighten', // Bluebell
		'fuic-in-13 darken', // Georgia Peach
		'fuic-in-13 lighten', // Georgia Peach
		'fuic-in-14 darken', // Oasis Stream
		'fuic-in-14 lighten', // Oasis Stream
		'fuic-in-15 darken', // Bright Ube
		'fuic-in-15 lighten', // Bright Ube
		
		'fuic-in-16 darken', // Magenta Purple
		'fuic-in-16 lighten', // Magenta Purple
		'fuic-in-17 darken', // Ending Navy Blue
		'fuic-in-17 lighten', // Ending Navy Blue
		'fuic-in-18 darken', // Sasquatch Socks
		'fuic-in-18 lighten', // Sasquatch Socks
		'fuic-in-19 darken', // Pine Glade
		'fuic-in-19 lighten', // Pine Glade
		'fuic-in-20 darken', // Highlighter Lavender
		'fuic-in-20 lighten', // Highlighter Lavender
		
		'fuic-ru-01 darken', // Creamy Peach
		'fuic-ru-01 lighten', // Creamy Peach
		'fuic-ru-02 darken', // Rosy Highlight
		'fuic-ru-02 lighten', // Rosy Highlight
		'fuic-ru-03 darken', // Soft Blue
		'fuic-ru-03 lighten', // Soft Blue
		'fuic-ru-04 darken', // Brewed Mustard
		'fuic-ru-04 lighten', // Brewed Mustard
		'fuic-ru-05 darken', // Old Geranium
		'fuic-ru-05 lighten', // Old Geranium
		
		'fuic-ru-06 darken', // Sawtooth Aak
		'fuic-ru-06 lighten', // Sawtooth Aak
		'fuic-ru-07 darken', // Summertime
		'fuic-ru-07 lighten', // Summertime
		'fuic-ru-08 darken', // Cornflower
		'fuic-ru-08 lighten', // Cornflower
		'fuic-ru-09 darken', // Tigerlily
		'fuic-ru-09 lighten', // Tigerlily
		'fuic-ru-10 darken', // Deep Rose
		'fuic-ru-10 lighten', // Deep Rose
		
		'fuic-ru-11 darken', // Purple Mountain Majesty
		'fuic-ru-11 lighten', // Purple Mountain Majesty
		'fuic-ru-12 darken', // Rogue Pink
		'fuic-ru-12 lighten', // Rogue Pink
		'fuic-ru-13 darken', // Squeaky
		'fuic-ru-13 lighten', // Squeaky
		'fuic-ru-14 darken', // Apple Valley
		'fuic-ru-14 lighten', // Apple Valley
		'fuic-ru-15 darken', // Pencil Lead
		'fuic-ru-15 lighten', // Pencil Lead
		
		'fuic-ru-16 darken', // Purple Corallite
		'fuic-ru-16 lighten', // Purple Corallite
		'fuic-ru-17 darken', // Flamingo Pink
		'fuic-ru-17 lighten', // Flamingo Pink
		'fuic-ru-18 darken', // Blue Curacao
		'fuic-ru-18 lighten', // Blue Curacao
		'fuic-ru-19 darken', // Porcelain Rose
		'fuic-ru-19 lighten', // Porcelain Rose
		'fuic-ru-20 darken', // Biscay
		'fuic-ru-20 lighten', // Biscay
		
		'fuic-es-01 darken', // Jacksons Purple
		'fuic-es-01 lighten', // Jacksons Purple
		'fuic-es-02 darken', // C64 Purple
		'fuic-es-02 lighten', // C64 Purple
		'fuic-es-03 darken', // Swan White
		'fuic-es-03 lighten', // Swan White
		'fuic-es-04 darken', // Summer Sky
		'fuic-es-04 lighten', // Summer Sky
		'fuic-es-05 darken', // Celestial Green
		'fuic-es-05 lighten', // Celestial Green
		
		'fuic-es-06 darken', // Lucky Point
		'fuic-es-06 lighten', // Lucky Point
		'fuic-es-07 darken', // Liberty
		'fuic-es-07 lighten', // Liberty
		'fuic-es-08 darken', // Hot Stone
		'fuic-es-08 lighten', // Hot Stone
		'fuic-es-09 darken', // Devil Blue
		'fuic-es-09 lighten', // Devil Blue
		'fuic-es-10 darken', // Palm Springs Splash
		'fuic-es-10 lighten', // Palm Springs Splash
		
		'fuic-es-11 darken', // Fluorescent Red
		'fuic-es-11 lighten', // Fluorescent Red
		'fuic-es-12 darken', // Synthetic Pumpkin
		'fuic-es-12 lighten', // Synthetic Pumpkin
		'fuic-es-13 darken', // Crocodile Tooth
		'fuic-es-13 lighten', // Crocodile Tooth
		'fuic-es-14 darken', // Mandarin Sorbet
		'fuic-es-14 lighten', // Mandarin Sorbet
		'fuic-es-15 darken', // Spiced Butternut
		'fuic-es-15 lighten', // Spiced Butternut
		
		'fuic-es-16 darken', // Eye Of Newt
		'fuic-es-16 lighten', // Eye Of Newt
		'fuic-es-17 darken', // Chilean Fire
		'fuic-es-17 lighten', // Chilean Fire
		'fuic-es-18 darken', // Grey Porcelain
		'fuic-es-18 lighten', // Grey Porcelain
		'fuic-es-19 darken', // Alameda Ochre
		'fuic-es-19 lighten', // Alameda Ochre
		'fuic-es-20 darken', // Desert
		'fuic-es-20 lighten', // Desert
		
		'fuic-se-01 darken', // Highlighter Pink
		'fuic-se-01 lighten', // Highlighter Pink
		'fuic-se-02 darken', // Dark Periwinkle
		'fuic-se-02 lighten', // Dark Periwinkle
		'fuic-se-03 darken', // Megaman
		'fuic-se-03 lighten', // Megaman
		'fuic-se-04 darken', // Fresh Turquoise
		'fuic-se-04 lighten', // Fresh Turquoise
		'fuic-se-05 darken', // Minty Green
		'fuic-se-05 lighten', // Minty Green
		
		'fuic-se-06 darken', // Sizzling Red
		'fuic-se-06 lighten', // Sizzling Red
		'fuic-se-07 darken', // Free Speech Blue
		'fuic-se-07 lighten', // Free Speech Blue
		'fuic-se-08 darken', // Spiro Disco Ball
		'fuic-se-08 lighten', // Spiro Disco Ball
		'fuic-se-09 darken', // Jade Dust
		'fuic-se-09 lighten', // Jade Dust
		'fuic-se-10 darken', // Green Teal
		'fuic-se-10 lighten', // Green Teal
		
		'fuic-se-11 darken', // Nârenji Orange
		'fuic-se-11 lighten', // Nârenji Orange
		'fuic-se-12 darken', // Yriel Yellow
		'fuic-se-12 lighten', // Yriel Yellow
		'fuic-se-13 darken', // Sunset Orange
		'fuic-se-13 lighten', // Sunset Orange
		'fuic-se-14 darken', // Hint of Elusive Blue
		'fuic-se-14 lighten', // Hint of Elusive Blue
		'fuic-se-15 darken', // Good Night!
		'fuic-se-15 lighten', // Good Night!
		
		'fuic-se-16 darken', // Chrome Yellow
		'fuic-se-16 lighten', // Chrome Yellow
		'fuic-se-17 darken', // Vibrant Yellow
		'fuic-se-17 lighten', // Vibrant Yellow
		'fuic-se-18 darken', // Red Orange
		'fuic-se-18 lighten', // Red Orange
		'fuic-se-19 darken', // London Square
		'fuic-se-19 lighten', // London Square
		'fuic-se-20 darken', // Black Pearl
		'fuic-se-20 lighten', // Black Pearl
		
		'fuic-tr-01 darken', // Bright Lilac
		'fuic-tr-01 lighten', // Bright Lilac
		'fuic-tr-02 darken', // Pretty Please
		'fuic-tr-02 lighten', // Pretty Please
		'fuic-tr-03 darken', // Light Red
		'fuic-tr-03 lighten', // Light Red
		'fuic-tr-04 darken', // Mandarin Sorbet
		'fuic-tr-04 lighten', // Mandarin Sorbet
		'fuic-tr-05 darken', // Unmellow Yellow
		'fuic-tr-05 lighten', // Unmellow Yellow
		
		'fuic-tr-06 darken', // Light Purple
		'fuic-tr-06 lighten', // Light Purple
		'fuic-tr-07 darken', // Young Salmon
		'fuic-tr-07 lighten', // Young Salmon
		'fuic-tr-08 darken', // Red Orange
		'fuic-tr-08 lighten', // Red Orange
		'fuic-tr-09 darken', // Radiant Yellow
		'fuic-tr-09 lighten', // Radiant Yellow
		'fuic-tr-10 darken', // Dorn Yellow
		'fuic-tr-10 lighten', // Dorn Yellow
		
		'fuic-tr-11 darken', // Wintergreen
		'fuic-tr-11 lighten', // Wintergreen
		'fuic-tr-12 darken', // Electric Blue
		'fuic-tr-12 lighten', // Electric Blue
		'fuic-tr-13 darken', // Neon Blue
		'fuic-tr-13 lighten', // Neon Blue
		'fuic-tr-14 darken', // Light Slate Blue
		'fuic-tr-14 lighten', // Light Slate Blue
		'fuic-tr-15 darken', // Shadowed Steel
		'fuic-tr-15 lighten', // Shadowed Steel
		
		'fuic-tr-16 darken', // Weird Green
		'fuic-tr-16 lighten', // Weird Green
		'fuic-tr-17 darken', // Hammam Blue
		'fuic-tr-17 lighten', // Hammam Blue
		'fuic-tr-18 darken', // Spiro Disco Ball
		'fuic-tr-18 lighten', // Spiro Disco Ball
		'fuic-tr-19 darken', // Light Indigo
		'fuic-tr-19 lighten', // Light Indigo
		'fuic-tr-20 darken', // Baltic Sea
		'fuic-tr-20 lighten', // Baltic Sea
	];
	
    var elements = document.querySelectorAll(".colors-js");
    for (var i = 0; i < elements.length; i++) {
      var selectedClasses = classes[Math.floor(Math.random() * classes.length)].split(' ');
      for (var c = 0; c < selectedClasses.length; c++) {
        elements[i].classList.add(selectedClasses[c]); //Can only add one at a time!
      }
    }
  });
})();
