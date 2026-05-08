export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const climateQuizData: Record<Difficulty, QuizQuestion[]> = {
  easy: [
    {
      id: 101,
      question: "What is the main source of oxygen in Earth's atmosphere?",
      options: [
        'Volcanic eruptions',
        'Photosynthesis by green plants',
        'Respiration by animals',
        'Evaporation of water',
      ],
      correctAnswer: 'Photosynthesis by green plants',
      explanation:
        'Photosynthesis by autotrophs (plants and algae) is the primary mechanism that releases O2 as a by-product.',
    },
    {
      id: 102,
      question: 'Which of the following is a renewable resource?',
      options: ['Coal', 'Natural gas', 'Solar energy', 'Petroleum'],
      correctAnswer: 'Solar energy',
      explanation: 'Solar energy is inexhaustible on a human timescale, unlike fossil fuels.',
    },
    {
      id: 103,
      question: 'Which gas is the major anthropogenic contributor to global warming?',
      options: ['Ozone', 'Carbon Dioxide (CO2)', 'Sulfur Dioxide (SO2)', 'Nitrogen (N2)'],
      correctAnswer: 'Carbon Dioxide (CO2)',
      explanation: 'CO2 is the principal greenhouse gas emitted by human activities.',
    },
    {
      id: 104,
      question: "What does the '3 R Principle' of waste management stand for?",
      options: [
        'Reduce, Reuse, Recycle',
        'Regenerate, Renew, Restore',
        'Reduce, Rebuild, React',
        'Refuse, Retain, Recycle',
      ],
      correctAnswer: 'Reduce, Reuse, Recycle',
      explanation: 'Reduce, Reuse, and Recycle are the foundational steps of waste minimization.',
    },
    {
      id: 105,
      question: 'What is the primary cause of rising sea levels globally?',
      options: [
        'Increased rainfall',
        'Melting ice caps and thermal expansion',
        'More boats in the ocean',
        'Underwater volcanic eruptions',
      ],
      correctAnswer: 'Melting ice caps and thermal expansion',
      explanation:
        'As the earth warms, land ice melts into the ocean and water itself expands as it heats up.',
    },
    {
      id: 106,
      question: "What does the term 'carbon footprint' mean?",
      options: [
        'The physical mark left by coal mining',
        'Total greenhouse gas emissions caused by an individual or organization',
        'The amount of carbon in a living organism',
        'A type of fossil footprint',
      ],
      correctAnswer: 'Total greenhouse gas emissions caused by an individual or organization',
      explanation: "It measures the total climate impact of an entity's actions.",
    },
    {
      id: 107,
      question: 'What is deforestation?',
      options: [
        'Planting new trees',
        'The clearing or thinning of forests by humans',
        'A disease affecting pine trees',
        'The seasonal shedding of leaves',
      ],
      correctAnswer: 'The clearing or thinning of forests by humans',
      explanation:
        'Deforestation involves permanently removing trees to make room for something besides forest.',
    },
    {
      id: 108,
      question: 'How does the greenhouse effect actually work?',
      options: [
        'It blocks sunlight from entering the atmosphere',
        "It traps the sun's warmth in Earth's lower atmosphere",
        'It creates physical glass-like domes over cities',
        'It cools the earth by reflecting light',
      ],
      correctAnswer: "It traps the sun's warmth in Earth's lower atmosphere",
      explanation:
        'Greenhouse gases let sunlight pass through, but trap heat that reflects back up from the surface.',
    },
    {
      id: 109,
      question: 'Which everyday activity is a common hidden source of microplastic pollution?',
      options: [
        'Washing synthetic clothing',
        'Using a gas stove',
        'Composting food waste',
        'Riding a bicycle',
      ],
      correctAnswer: 'Washing synthetic clothing',
      explanation:
        'Fleece and synthetic clothes shed tiny plastic microfibers into the water system during washing.',
    },
    {
      id: 110,
      question: "What is 'biodiversity'?",
      options: [
        'A diet consisting of organic foods',
        'The variety of life in the world or in a particular habitat',
        'A method of recycling plastics',
        'The study of single-celled organisms',
      ],
      correctAnswer: 'The variety of life in the world or in a particular habitat',
      explanation: 'Biodiversity encompasses the immense variety and variability of life on Earth.',
    },
  ],

  medium: [
    {
      id: 201,
      question: 'Which layer of the atmosphere contains the ozone shield?',
      options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
      correctAnswer: 'Stratosphere',
      explanation: 'The ozone layer lies 15–35 km high in the stratosphere.',
    },
    {
      id: 202,
      question: "The term 'BOD' is an indicator related to which type of pollution?",
      options: ['Sound pollution', 'Water pollution', 'Soil pollution', 'Air pollution'],
      correctAnswer: 'Water pollution',
      explanation: 'BOD (Biochemical Oxygen Demand) indicates the amount of organic load in water.',
    },
    {
      id: 203,
      question: 'Which specific pollutant is responsible for Minamata disease?',
      options: ['Lead', 'Mercury', 'Cadmium', 'Arsenic'],
      correctAnswer: 'Mercury',
      explanation:
        'Minamata disease is a neurological syndrome caused by severe mercury poisoning.',
    },
    {
      id: 204,
      question: "The 'Chipko Movement' in 1973 was associated with which action?",
      options: [
        'Cleaning the Ganga river',
        'Hugging trees to stop them from being felled',
        'Protesting against dams',
        'Promoting organic farming',
      ],
      correctAnswer: 'Hugging trees to stop them from being felled',
      explanation:
        'Led by Gaura Devi and others in Uttarakhand, villagers hugged trees to prevent logging.',
    },
    {
      id: 205,
      question: "In green building, what does 'adaptive reuse' refer to?",
      options: [
        'Moving a building to a new climate',
        'Renovating existing structures to improve efficiency and avoid demolition',
        'Using plants that adapt to low water',
        "Changing a building's thermostat automatically",
      ],
      correctAnswer: 'Renovating existing structures to improve efficiency and avoid demolition',
      explanation:
        'Adaptive reuse minimizes the carbon footprint by utilizing existing building shells instead of building from scratch.',
    },
    {
      id: 206,
      question:
        'Which environmentalist helped create the Sierra Club to protect Yosemite National Park?',
      options: ['Aldo Leopold', 'John Muir', 'Rachel Carson', 'David Brower'],
      correctAnswer: 'John Muir',
      explanation:
        'John Muir founded the Sierra Club in 1892 to promote conservation, particularly of Yosemite.',
    },
    {
      id: 207,
      question: "What was the target of Greenpeace's very first activist action?",
      options: ['Seal hunting', 'Whale hunting', 'A nuclear weapons test', 'Deep-sea trawling'],
      correctAnswer: 'A nuclear weapons test',
      explanation:
        'Greenpeace originated in 1971 to protest U.S. nuclear testing off the coast of Alaska.',
    },
    {
      id: 208,
      question: "The EPA's 'WaterSense' label is primarily used to identify what?",
      options: [
        'Bottled water quality',
        'Water-efficient products and plumbing fixtures',
        'Safe swimming areas',
        'Drought-resistant plants',
      ],
      correctAnswer: 'Water-efficient products and plumbing fixtures',
      explanation:
        'WaterSense labels products that are at least 20% more water-efficient than average.',
    },
    {
      id: 209,
      question: "Why do LEED frameworks emphasize 'community connectivity'?",
      options: [
        'To increase property taxes',
        'To reduce dependence on cars by locating projects near existing resources',
        'To force people into high-density housing',
        'To standardize architectural styles',
      ],
      correctAnswer: 'To reduce dependence on cars by locating projects near existing resources',
      explanation:
        'Building near existing infrastructure promotes walking and transit, reducing auto emissions.',
    },
    {
      id: 210,
      question: 'What is the primary ecological benefit of planting native and adapted vegetation?',
      options: [
        'They grow faster than weeds',
        'They reduce water usage, support local ecosystems, and need less maintenance',
        'They are cheaper to purchase',
        'They guarantee the attraction of endangered species',
      ],
      correctAnswer: 'They reduce water usage, support local ecosystems, and need less maintenance',
      explanation:
        'Native plants are adapted to local rainfall and soils, eliminating the need for heavy irrigation and fertilizers.',
    },
    {
      id: 211,
      question: 'In an ecological energy pyramid, which group occupies the second trophic level?',
      options: [
        'Producers',
        'Primary consumers (Herbivores)',
        'Secondary consumers (Carnivores)',
        'Decomposers',
      ],
      correctAnswer: 'Primary consumers (Herbivores)',
      explanation:
        'Producers form the base (first level), and herbivores that eat them form the second level.',
    },
    {
      id: 212,
      question:
        'Which of these designs best helps reduce the quantity of stormwater runoff while increasing its quality?',
      options: [
        'Impervious asphalt roads',
        'Constructed wetlands',
        'Concrete drainage pipes',
        'Plastic turf lawns',
      ],
      correctAnswer: 'Constructed wetlands',
      explanation:
        'Constructed wetlands naturally filter pollutants and allow water to slowly percolate back into the ground.',
    },
    {
      id: 213,
      question: "What does 'Green-e' certification guarantee?",
      options: [
        'Organic food sourcing',
        'Renewable Energy Certificates (RECs) and clean energy',
        'Fair trade coffee',
        'Non-toxic paint',
      ],
      correctAnswer: 'Renewable Energy Certificates (RECs) and clean energy',
      explanation:
        'Green-e is a leading certification program for renewable energy in the commercial sector.',
    },
    {
      id: 214,
      question: 'What is the primary focus of the Montreal Protocol?',
      options: [
        'Limiting global temperature rise to 1.5°C',
        'Phasing out Ozone-Depleting Substances (ODS)',
        'Protecting endangered whales',
        'Eliminating single-use plastics',
      ],
      correctAnswer: 'Phasing out Ozone-Depleting Substances (ODS)',
      explanation: 'Signed in 1987, it successfully phased out CFCs to repair the ozone layer.',
    },
    {
      id: 215,
      question: 'What does the acronym IPCC stand for?',
      options: [
        'International Panel on Climate Control',
        'Intergovernmental Panel on Climate Change',
        'Independent Policy on Climate Conservation',
        'Institute for Pollution and Carbon Control',
      ],
      correctAnswer: 'Intergovernmental Panel on Climate Change',
      explanation:
        'The IPCC is the UN body responsible for advancing knowledge on human-induced climate change.',
    },
    {
      id: 216,
      question: "What is the 'Albedo effect'?",
      options: [
        'The measure of how much light hits a surface is reflected without being absorbed',
        'The rate at which glaciers move',
        'The process of coral bleaching',
        'The acidification of ocean waters',
      ],
      correctAnswer:
        'The measure of how much light hits a surface is reflected without being absorbed',
      explanation:
        'High albedo (like white ice) reflects sunlight, cooling the earth. Low albedo (like dark ocean) absorbs heat.',
    },
    {
      id: 217,
      question: 'Which compound is the primary cause of acid rain?',
      options: ['Carbon monoxide', 'Sulfur dioxide (SO2)', 'Methane', 'Ozone'],
      correctAnswer: 'Sulfur dioxide (SO2)',
      explanation:
        'SO2 and Nitrogen Oxides react with water in the atmosphere to form sulfuric and nitric acids.',
    },
    {
      id: 218,
      question:
        'Which term describes the concentration of toxins in an organism as a result of its ingesting other plants or animals in which toxins are more widely disbursed?',
      options: ['Biodegradation', 'Biomagnification', 'Eutrophication', 'Bio-remediation'],
      correctAnswer: 'Biomagnification',
      explanation:
        'Toxins like heavy metals concentrate higher up the food chain, severely affecting apex predators.',
    },
    {
      id: 219,
      question: "What triggers 'eutrophication' in a body of water?",
      options: [
        'An oil spill',
        'Excess nutrients (nitrogen and phosphorus) from agricultural runoff',
        'Overfishing',
        'Plastic pollution',
      ],
      correctAnswer: 'Excess nutrients (nitrogen and phosphorus) from agricultural runoff',
      explanation: "Nutrients cause algal blooms, which deplete oxygen and create 'dead zones'.",
    },
    {
      id: 220,
      question: 'What is the primary driver of Ocean Acidification?',
      options: [
        'Industrial waste dumping',
        'Absorption of atmospheric CO2 by seawater',
        'Oil spills',
        'Agricultural runoff',
      ],
      correctAnswer: 'Absorption of atmospheric CO2 by seawater',
      explanation:
        'The ocean absorbs about 30% of emitted CO2, which reacts with water to form carbonic acid.',
    },
    {
      id: 221,
      question: "In carbon accounting, what do 'Scope 3' emissions refer to?",
      options: [
        'Direct emissions from owned facilities',
        'Indirect emissions from purchased electricity',
        "All other indirect emissions in a company's value chain",
        'Emissions naturally produced by local wildlife',
      ],
      correctAnswer: "All other indirect emissions in a company's value chain",
      explanation:
        'Scope 3 includes upstream (supply chain) and downstream (product use) emissions.',
    },
    {
      id: 222,
      question: "Which principle is core to the concept of a 'Circular Economy'?",
      options: [
        'Designing out waste and pollution',
        'Extract, produce, throw away',
        'Infinite economic growth',
        'Relying strictly on fossil fuels',
      ],
      correctAnswer: 'Designing out waste and pollution',
      explanation:
        'A circular economy aims to keep products and materials in use and regenerate natural systems.',
    },
    {
      id: 223,
      question: "What does 'Blue Carbon' refer to?",
      options: [
        'Carbon emitted by natural gas',
        "Carbon captured by the world's ocean and coastal ecosystems",
        'Carbon stored in geological rock formations',
        'Carbon trapped in arctic permafrost',
      ],
      correctAnswer: "Carbon captured by the world's ocean and coastal ecosystems",
      explanation:
        "Mangroves, salt marshes, and seagrasses are highly efficient at sequestering 'blue' carbon.",
    },
    {
      id: 224,
      question:
        "The proposed geological epoch defined by significant human impact on Earth's ecosystems is called:",
      options: ['Holocene', 'Pleistocene', 'Anthropocene', 'Mesozoic'],
      correctAnswer: 'Anthropocene',
      explanation:
        "Derived from 'anthropo' (human), marking an era where human activity is the dominant influence on climate.",
    },
    {
      id: 225,
      question:
        'Under the Wildlife Protection Act of India, which schedule lists critically endangered species receiving the highest protection?',
      options: ['Schedule I', 'Schedule II', 'Schedule III', 'Schedule V'],
      correctAnswer: 'Schedule I',
      explanation:
        'Schedule I provides absolute protection and imposes the highest penalties for offenses.',
    },
  ],

  hard: [
    {
      id: 301,
      question:
        'Which industrial greenhouse gas has a Global Warming Potential (GWP) of over 23,000 times that of CO2 over a 100-year period?',
      options: [
        'Methane (CH4)',
        'Nitrous Oxide (N2O)',
        'Sulfur Hexafluoride (SF6)',
        'Hydrofluorocarbons (HFCs)',
      ],
      correctAnswer: 'Sulfur Hexafluoride (SF6)',
      explanation:
        'SF6 is the most potent greenhouse gas known, primarily used as an electrical insulator.',
    },
    {
      id: 302,
      question:
        "The 'Polluter Pays Principle' was formally integrated into international environmental law via which agreement?",
      options: [
        'Kyoto Protocol 1997',
        'Rio Declaration 1992',
        'Stockholm Conference 1972',
        'Paris Agreement 2015',
      ],
      correctAnswer: 'Rio Declaration 1992',
      explanation:
        'It was articulated in Principle 16 of the 1992 Rio Declaration on Environment and Development.',
    },
    {
      id: 303,
      question: "What does the 'Nitrogen Cascade' concept describe in environmental science?",
      options: [
        'The physical waterfall created by agricultural runoff',
        'The multi-media transport and sequential effects of a single reactive nitrogen atom across ecosystems',
        'The rapid evaporation of liquid nitrogen',
        'The breakdown of nitrogen in the Haber-Bosch process',
      ],
      correctAnswer:
        'The multi-media transport and sequential effects of a single reactive nitrogen atom across ecosystems',
      explanation:
        'One atom of reactive nitrogen can sequentially cause smog, acid rain, eutrophication, and global warming.',
    },
    {
      id: 304,
      question:
        'In air pollution control, which method is used to remove BOTH Sulfur Dioxide (SO2) and particulates from industrial flue gas?',
      options: [
        'Electrostatic precipitator',
        'Limestone scrubbing (FGD)',
        'Cyclone separator',
        'Catalytic converter',
      ],
      correctAnswer: 'Limestone scrubbing (FGD)',
      explanation:
        'Flue-gas desulphurization (FGD) using limestone captures SO2 and traps some particulate matter simultaneously.',
    },
    {
      id: 305,
      question:
        "The concept of 'Extended Producer Responsibility' (EPR) was first formalized in India's waste management rules for which specific waste stream?",
      options: ['Plastic waste', 'E-waste', 'Biomedical waste', 'Construction debris'],
      correctAnswer: 'E-waste',
      explanation: 'The E-waste (Management and Handling) Rules of 2011 introduced EPR to India.',
    },
    {
      id: 306,
      question:
        'Which benthic macroinvertebrate is considered an excellent biological indicator of clean water due to its high intolerance to pollution?',
      options: ['Tubifex worm', 'Chironomid larva', 'Stone-fly nymph', 'Leech'],
      correctAnswer: 'Stone-fly nymph',
      explanation:
        'Stone-flies require high dissolved oxygen levels, making them highly sensitive to organic pollution.',
    },
    {
      id: 307,
      question:
        'In what year did the Ramsar Convention on Wetlands of International Importance take place?',
      options: ['1965', '1971', '1982', '1992'],
      correctAnswer: '1971',
      explanation: 'The treaty was signed in the Iranian city of Ramsar in 1971.',
    },
    {
      id: 308,
      question:
        'On March 15, 2023, which river was declared the first wild-river national park in Europe, located in Albania?',
      options: ['Danube River', 'Vjosa River', 'Rhine River', 'Loire River'],
      correctAnswer: 'Vjosa River',
      explanation:
        'Albania declared the entire length of the Vjosa River a national park to protect its wild state from damming.',
    },
    {
      id: 309,
      question:
        "Which graphic designer created the 'Mobius loop' (the universal recycling symbol) in 1970 for a Container Corporation of America contest?",
      options: ['Gary Anderson', 'Paul Rand', 'Saul Bass', 'Milton Glaser'],
      correctAnswer: 'Gary Anderson',
      explanation:
        'Gary Anderson designed the iconic three-arrow loop when he was a college student.',
    },
    {
      id: 310,
      question:
        "The chemical 'vinyl chloride' was the primary toxic material released during a massive 2023 train derailment in which US location?",
      options: [
        'Flint, Michigan',
        'East Palestine, Ohio',
        'Centralia, Pennsylvania',
        'Love Canal, New York',
      ],
      correctAnswer: 'East Palestine, Ohio',
      explanation:
        'The East Palestine derailment released roughly 100,000 gallons of toxic vinyl chloride.',
    },
    {
      id: 311,
      question: "Under the Paris Agreement, what is the specific purpose of 'Article 6.4'?",
      options: [
        'Establishing the 1.5°C warming limit',
        'Creating a centralized, UN-supervised mechanism for trading greenhouse gas emissions reductions',
        'Mandating climate finance contributions',
        'Establishing the Loss and Damage fund',
      ],
      correctAnswer:
        'Creating a centralized, UN-supervised mechanism for trading greenhouse gas emissions reductions',
      explanation:
        'Article 6.4 establishes a global carbon market mechanism overseen by a UN supervisory body.',
    },
    {
      id: 312,
      question:
        'Which prominent Brazilian environmentalist and labor leader was assassinated for his work linking rubber tapping to Amazon rainforest preservation?',
      options: ['Marina Silva', 'Chico Mendes', 'Sonia Guajajara', 'Jose Lutzenberger'],
      correctAnswer: 'Chico Mendes',
      explanation:
        'Chico Mendes organized rubber tappers to protect the Amazon from logging and cattle ranching.',
    },
    {
      id: 313,
      question:
        "To protest building dams, David Brower and the Sierra Club ran an ad reading 'Should We Flood the Sistine Chapel So Tourists Can Get Nearer the Ceiling?' Where were these dams proposed?",
      options: [
        'The Grand Canyon',
        'Yosemite Valley',
        'Dinosaur National Monument',
        'Hetch Hetchy',
      ],
      correctAnswer: 'The Grand Canyon',
      explanation:
        'This aggressive media campaign in the 1960s successfully stopped the damming of the Grand Canyon.',
    },
    {
      id: 314,
      question:
        'According to the World Meteorological Organization (WMO), 2024 was confirmed as the warmest year on record. By what margin did it exceed pre-industrial levels?',
      options: ['1.15°C', '1.30°C', '1.55°C', '1.75°C'],
      correctAnswer: '1.55°C',
      explanation:
        'The WMO confirmed an average global temperature of 1.55°C (±0.13°C) above pre-industrial levels in 2024.',
    },
    {
      id: 315,
      question: 'The COP29 UN Climate Conference in 2024 was hosted in which city?',
      options: ['Dubai', 'Baku', 'Belém', 'Glasgow'],
      correctAnswer: 'Baku',
      explanation:
        'COP29 was hosted in Baku, Azerbaijan, focusing heavily on a new global climate finance goal.',
    },
    {
      id: 316,
      question:
        'The upcoming COP30 UN Climate Conference in 2025 will be hosted in Belém, which is located in which country?',
      options: ['Colombia', 'Brazil', 'Indonesia', 'South Africa'],
      correctAnswer: 'Brazil',
      explanation:
        'Belém, located near the Amazon rainforest in Brazil, is the host city for COP30.',
    },
    {
      id: 317,
      question:
        'What is the primary objective of the UAE-Belém Work Programme established at recent COPs?',
      options: [
        'Phasing out coal energy',
        'Finalizing and adopting a list of 100 adaptation indicators',
        'Creating a global carbon tax',
        'Mapping deep ocean trenches',
      ],
      correctAnswer: 'Finalizing and adopting a list of 100 adaptation indicators',
      explanation:
        'It focuses on defining metrics to measure global progress on climate adaptation.',
    },
    {
      id: 318,
      question:
        "In the context of Carbon Capture, Utilization, and Storage (CCUS), what does 'BECCS' stand for?",
      options: [
        'Biological Energy and Carbon Capture System',
        'Bioenergy with Carbon Capture and Storage',
        'Basic Emission Control and Capture Sequence',
        'Biomass Extraction and Carbon Condensation Storage',
      ],
      correctAnswer: 'Bioenergy with Carbon Capture and Storage',
      explanation:
        'BECCS combines bioenergy generation with carbon capture, theoretically resulting in negative emissions.',
    },
    {
      id: 319,
      question:
        'Which LEED rating system is specifically designed for projects where the developer controls the design of the entire building but has no control over interior fit-outs?',
      options: [
        'LEED for New Construction',
        'LEED for Commercial Interiors',
        'LEED for Core & Shell',
        'LEED for Neighborhood Development',
      ],
      correctAnswer: 'LEED for Core & Shell',
      explanation:
        'Core & Shell is for developers who build the base building but lease out interior spaces to tenants.',
    },
    {
      id: 320,
      question:
        "In LEED construction waste management, how is material used as 'alternative daily cover' at a landfill classified?",
      options: ['As diverted material', 'As recycled material', 'As waste', 'As adaptive reuse'],
      correctAnswer: 'As waste',
      explanation:
        'LEED protocols dictate that alternative daily cover (ADC) at landfills does not count toward waste diversion.',
    },
    {
      id: 321,
      question:
        "What environmental phenomenon is defined by the physical 'crazing' of materials like plastics?",
      options: [
        'Melting due to extreme heat',
        'Minute lines appearing in or near the surface as a response to environmental stress',
        'The breaking down of polymers by UV light',
        'The discoloration of plastics in seawater',
      ],
      correctAnswer:
        'Minute lines appearing in or near the surface as a response to environmental stress',
      explanation: 'Crazing refers to a network of fine cracks on the surface of a material.',
    },
    {
      id: 322,
      question:
        'Which Indian Biosphere Reserve was added to the UNESCO World Network of Biosphere Reserves most recently in 2021?',
      options: ['Panna', 'Achanakmar-Amarkantak', 'Kanchenjunga', 'Nanda Devi'],
      correctAnswer: 'Achanakmar-Amarkantak',
      explanation:
        'Achanakmar-Amarkantak in MP/Chhattisgarh was formally recognized by the Man and Biosphere programme.',
    },
    {
      id: 323,
      question:
        'The High Seas Treaty (BBNJ Agreement) aims to protect marine biodiversity in areas beyond national jurisdiction. What percentage of the ocean does this cover?',
      options: ['10%', '30%', 'Over 60%', '90%'],
      correctAnswer: 'Over 60%',
      explanation:
        "The 'high seas' fall outside national EEZs and make up nearly two-thirds of the world's oceans.",
    },
    {
      id: 324,
      question: "The term '40/60 rule' in green building refers to what?",
      options: [
        'Energy vs Water savings',
        'Guidance for choosing the appropriate LEED rating system',
        'The required percentage of regional materials',
        'The ratio of indoor to outdoor water use',
      ],
      correctAnswer: 'Guidance for choosing the appropriate LEED rating system',
      explanation:
        "If a rating system is applicable to <40% of the project, don't use it. If >60%, use it.",
    },
    {
      id: 325,
      question:
        'To evaluate indoor air quality and thermal comfort in a LEED project, which two ASHRAE standards are primarily referenced?',
      options: [
        'ASHRAE 90.1 and 189.1',
        'ASHRAE 55 and 62.1',
        'ASHRAE 15 and 34',
        'ASHRAE 135 and 147',
      ],
      correctAnswer: 'ASHRAE 55 and 62.1',
      explanation:
        'ASHRAE 55 covers Thermal Environmental Conditions, and 62.1 covers Ventilation for Acceptable IAQ.',
    },
    {
      id: 326,
      question:
        'If ecological efficiency between trophic levels is strictly 10%, how much energy from 5,000 kcal of producers reaches a secondary carnivore?',
      options: ['500 kcal', '50 kcal', '5 kcal', '0.5 kcal'],
      correctAnswer: '5 kcal',
      explanation:
        '5000 (producers) -> 500 (herbivores) -> 50 (primary carnivores) -> 5 (secondary carnivores).',
    },
    {
      id: 327,
      question:
        'At COP30, the TFFF initiative mobilized over US$ 6.7 billion. What does TFFF stand for?',
      options: [
        'Trans-national Fossil Fuel Phaseout',
        'Tropical Forest Forever Facility',
        'Technology Finance for Future Farms',
        'Trade Framework for Forestry Finance',
      ],
      correctAnswer: 'Tropical Forest Forever Facility',
      explanation:
        'The TFFF is a massive investment fund launched to guarantee the preservation of tropical forests.',
    },
    {
      id: 328,
      question:
        'Pioneer Frank Shuman warned in the New York Times that oil and coal would exhaust and humans would need solar power. In what decade did he write this?',
      options: ['1880s', '1910s', '1940s', '1970s'],
      correctAnswer: '1910s',
      explanation:
        'Frank Shuman built the first solar thermal power station in Egypt in 1913 and advocated for solar in the 1910s.',
    },
    {
      id: 329,
      question:
        "Which organization publishes the global 'Red List' of threatened species, updated twice in 2023?",
      options: ['WWF', 'UNEP', 'IUCN', 'CITES'],
      correctAnswer: 'IUCN',
      explanation:
        'The International Union for Conservation of Nature (IUCN) maintains the comprehensive Red List.',
    },
    {
      id: 330,
      question:
        'The Mutirão Call, introduced at the UN Climate Conference, is a roadmap specifically targeting the phase-out of what?',
      options: [
        'Single-use plastics',
        'Fossil fuels',
        'Synthetic fertilizers',
        'Internal combustion engines',
      ],
      correctAnswer: 'Fossil fuels',
      explanation:
        'Spearheaded by Denmark and others, the Mutirão Call focuses on accelerating the transition away from fossil fuels.',
    },
    {
      id: 331,
      question:
        "Which of the following is an example of an 'NMA' (Non-Market Approach) under Article 6.8 of the Paris Agreement?",
      options: [
        'Cap-and-trade systems',
        'Bilateral carbon offset trading',
        'Debt-for-nature swaps',
        'Compliance carbon credits',
      ],
      correctAnswer: 'Debt-for-nature swaps',
      explanation:
        'Article 6.8 focuses on cooperation that does NOT involve trading emissions, such as fiscal or technological assistance.',
    },
    {
      id: 332,
      question: "What differentiates a biological 'Population' from a 'Community'?",
      options: [
        'Populations exist in water; communities on land',
        'A population is a single species in an area; a community is multiple interacting species',
        'Populations refer only to humans',
        'There is no difference',
      ],
      correctAnswer:
        'A population is a single species in an area; a community is multiple interacting species',
      explanation:
        'A community consists of all the different populations of species living together in a specific area.',
    },
    {
      id: 333,
      question:
        'According to the 10 New Insights in Climate Science (2025/2026), what specific integration is urged between UNFCCC and CBD?',
      options: [
        'Merging their secretariats',
        'Coordinating forest conservation to safeguard biodiversity and land carbon sinks',
        'Creating a shared currency',
        'Banning deep sea mining',
      ],
      correctAnswer:
        'Coordinating forest conservation to safeguard biodiversity and land carbon sinks',
      explanation:
        'Aligning climate (UNFCCC) and biodiversity (CBD) goals is critical to maximizing natural carbon sinks.',
    },
    {
      id: 334,
      question:
        'Which early environmentalist volunteered with the American Indian Movement during the 1973 occupation of Wounded Knee before founding the Sea Shepherd Society?',
      options: ['David Brower', 'Paul Watson', 'Edward Abbey', 'Aldo Leopold'],
      correctAnswer: 'Paul Watson',
      explanation:
        'Captain Paul Watson had a diverse activist background before focusing on direct action marine conservation.',
    },
    {
      id: 335,
      question:
        'What is the primary function of SMACNA guidelines in the context of LEED certification?',
      options: [
        'Designing energy-efficient lighting',
        'Regulating indoor air quality during the construction phase',
        'Sourcing sustainable wood',
        'Managing stormwater runoff',
      ],
      correctAnswer: 'Regulating indoor air quality during the construction phase',
      explanation:
        "The Sheet Metal and Air Conditioning Contractors' National Association (SMACNA) sets standards to protect ductwork and IAQ during building.",
    },
    {
      id: 336,
      question:
        "In the context of urban heat island reduction, what does a material's SRI measure?",
      options: [
        'Solar Reflectance Index',
        'Structural Resilience Indicator',
        'Sustainable Resource Impact',
        'Synthetic Recycling Index',
      ],
      correctAnswer: 'Solar Reflectance Index',
      explanation:
        "SRI measures a surface's ability to reject solar heat, combining reflectance and thermal emittance.",
    },
    {
      id: 337,
      question:
        'What is the technical difference between DAC (Direct Air Capture) and Point-Source Carbon Capture?',
      options: [
        'DAC uses trees; Point-Source uses machines',
        'DAC removes CO2 from ambient air; Point-Source removes it directly from an exhaust flue',
        'DAC is illegal; Point-Source is mandated',
        'Point-Source is only used in oceans',
      ],
      correctAnswer:
        'DAC removes CO2 from ambient air; Point-Source removes it directly from an exhaust flue',
      explanation:
        'DAC systems act like giant synthetic trees filtering ambient air, while point-source captures emissions before they leave a smokestack.',
    },
    {
      id: 338,
      question: 'Which of these gases is NOT regulated by the original 1997 Kyoto Protocol?',
      options: [
        'Carbon Dioxide (CO2)',
        'Methane (CH4)',
        'Chlorofluorocarbons (CFCs)',
        'Perfluorocarbons (PFCs)',
      ],
      correctAnswer: 'Chlorofluorocarbons (CFCs)',
      explanation:
        'CFCs were already regulated by the Montreal Protocol, so the Kyoto Protocol focused on a different basket of 6 greenhouse gases.',
    },
    {
      id: 339,
      question:
        "What concept is the 'Brundtland Report' (Our Common Future, 1987) most famous for defining?",
      options: [
        'The greenhouse effect',
        'Sustainable development',
        'The ozone hole',
        'Carrying capacity',
      ],
      correctAnswer: 'Sustainable development',
      explanation:
        'It defined sustainable development as meeting the needs of the present without compromising future generations.',
    },
    {
      id: 340,
      question: "What is 'Ocean Alkalinity Enhancement'?",
      options: [
        'Dumping acidic waste into the sea',
        'A geoengineering method to add alkaline substances to the ocean to increase CO2 absorption',
        'A process of desalinating water',
        'Farming kelp for human consumption',
      ],
      correctAnswer:
        'A geoengineering method to add alkaline substances to the ocean to increase CO2 absorption',
      explanation:
        'By mimicking natural weathering, adding crushed silicate or carbonate rocks helps the ocean safely lock away more carbon.',
    },
    {
      id: 341,
      question: "What is the primary role of an 'Autotroph' in an ecosystem?",
      options: [
        'To consume apex predators',
        'To break down dead organic matter',
        'To synthesize its own food from inorganic substances',
        'To regulate water cycles',
      ],
      correctAnswer: 'To synthesize its own food from inorganic substances',
      explanation:
        'Autotrophs (producers) use photosynthesis or chemosynthesis to create energy-rich compounds.',
    },
    {
      id: 342,
      question: "In the context of climate models, what is 'Transient Climate Response' (TCR)?",
      options: [
        'The temperature rise the day after a solar flare',
        'The expected global temperature increase at the exact moment atmospheric CO2 doubles',
        'The cooling effect of volcanic ash',
        'The error margin of a thermometer',
      ],
      correctAnswer:
        'The expected global temperature increase at the exact moment atmospheric CO2 doubles',
      explanation:
        'TCR differs from Equilibrium Climate Sensitivity (ECS), which measures warming after the climate system fully stabilizes.',
    },
    {
      id: 343,
      question: "The 'Keeling Curve' is famous for demonstrating what environmental trend?",
      options: [
        'The decline of polar bear populations',
        'The continuous rise of atmospheric CO2 concentrations since 1958',
        'The depletion of the ozone layer',
        'The rising price of renewable energy',
      ],
      correctAnswer: 'The continuous rise of atmospheric CO2 concentrations since 1958',
      explanation:
        'Named after Charles David Keeling, it plots CO2 measurements taken at the Mauna Loa Observatory.',
    },
    {
      id: 344,
      question: "What does 'LULUCF' sector stand for in UN climate accounting?",
      options: [
        'Low Usage Local Urban Carbon Facilities',
        'Land Use, Land-Use Change and Forestry',
        'Legal Undertakings for Limiting Uncontrolled Carbon Flows',
        'Liquid Uranium and Low-Use Carbon Fuels',
      ],
      correctAnswer: 'Land Use, Land-Use Change and Forestry',
      explanation:
        'LULUCF tracks greenhouse gas fluxes resulting from human activities altering the terrestrial biosphere.',
    },
    {
      id: 345,
      question: "What is a 'Milankovitch Cycle'?",
      options: [
        'A type of recycled paper product',
        "Long-term variations in Earth's orbit and tilt that affect its climate",
        'A chemical pathway in photosynthesis',
        'A method for measuring ocean currents',
      ],
      correctAnswer: "Long-term variations in Earth's orbit and tilt that affect its climate",
      explanation:
        'These cyclical changes relate to eccentricity, axial tilt, and precession, historically driving Ice Ages.',
    },
    {
      id: 346,
      question:
        'Under the Kigali Amendment to the Montreal Protocol, which specific class of gases is being phased down?',
      options: [
        'Chlorofluorocarbons (CFCs)',
        'Hydrofluorocarbons (HFCs)',
        'Carbon Dioxide (CO2)',
        'Methane (CH4)',
      ],
      correctAnswer: 'Hydrofluorocarbons (HFCs)',
      explanation:
        'HFCs were introduced to replace CFCs (to save the ozone), but were later found to be incredibly potent greenhouse gases.',
    },
    {
      id: 347,
      question: "Which of the following best defines 'Climate Forcing' (Radiative Forcing)?",
      options: [
        'Forcing corporations to pay carbon taxes',
        'The difference between incoming solar radiation and outgoing terrestrial radiation',
        'The gravitational pull of the moon on tides',
        'Using geoengineering to block the sun',
      ],
      correctAnswer:
        'The difference between incoming solar radiation and outgoing terrestrial radiation',
      explanation:
        'Positive radiative forcing means Earth receives more incoming energy from sunlight than it radiates to space, causing warming.',
    },
    {
      id: 348,
      question: "What is 'Enhanced Rock Weathering' in the context of carbon removal?",
      options: [
        'Using acid rain to dissolve statues',
        'Spreading crushed silicate rocks on agricultural land to accelerate natural CO2 absorption',
        'Mining coal more efficiently',
        'Using lasers to break down boulders',
      ],
      correctAnswer:
        'Spreading crushed silicate rocks on agricultural land to accelerate natural CO2 absorption',
      explanation:
        'This geoengineering technique speeds up the natural geological carbon cycle to sequester CO2.',
    },
    {
      id: 349,
      question:
        'What was the main finding regarding Antarctic Sea Ice in early 2025 according to the WMO?',
      options: [
        'It had completely melted',
        'It reached its second-lowest extent observed',
        'It recovered to 1980 levels',
        'It formed a bridge to South America',
      ],
      correctAnswer: 'It reached its second-lowest extent observed',
      explanation:
        'The WMO 2024/2025 insights noted record-breaking ocean heat and the second-lowest Antarctic sea ice extent on record.',
    },
    {
      id: 350,
      question:
        "In the context of the UN Framework Convention on Climate Change (UNFCCC), what does 'CBDR-RC' stand for?",
      options: [
        'Carbon Border Deficit Reduction - Regulated Carbon',
        'Common But Differentiated Responsibilities and Respective Capabilities',
        'Climate Based Damage Recovery - Regional Committees',
        'Central Banking Directives for Renewable Capital',
      ],
      correctAnswer: 'Common But Differentiated Responsibilities and Respective Capabilities',
      explanation:
        'This principle acknowledges that all states are responsible for addressing climate change, but not equally, factoring in historical emissions and economic capacity.',
    },
  ],
};

// Helper function to get questions by difficulty
export function getQuestionsByDifficulty(difficulty: Difficulty): QuizQuestion[] {
  return climateQuizData[difficulty];
}

// Helper function to calculate score
export function calculateScore(userAnswers: string[], correctAnswers: string[]): number {
  return userAnswers.filter((answer, index) => answer === correctAnswers[index]).length;
}

// Helper function to get score title
export function getScoreTitle(score: number, total: number): string {
  const percentage = (score / total) * 100;

  if (percentage >= 90) return 'Climate Expert';
  if (percentage >= 80) return 'Eco-Warrior';
  if (percentage >= 70) return 'Environmental Champion';
  if (percentage >= 60) return 'Climate Conscious';
  if (percentage >= 50) return 'Green Advocate';
  if (percentage >= 40) return 'Climate Learner';
  return 'Climate Novice';
}

// Helper function to convert QuizQuestion to Question interface for compatibility
export function convertToLegacyQuestions(questions: QuizQuestion[]): any[] {
  return questions.map((q) => ({
    id: q.id.toString(),
    question: q.question,
    options: q.options,
    correctAnswer: q.options.indexOf(q.correctAnswer),
    explanation: q.explanation,
    difficulty: 'easy' as const, // This would need to be dynamic based on the actual difficulty
    category: 'General', // This would need to be dynamic based on the actual category
  }));
}
