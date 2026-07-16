// Historical Forest Fire Data (1983 - 2025)
// Sources: 
// - US: National Interagency Fire Center (NIFC) / National Interagency Coordination Center (NICC)
// - Canada: Canadian National Fire Database (CNFDB) / Natural Resources Canada / CIFFC

const wildfireData = {
  // US data. Primary unit for US NIFC reports is Acres.
  us: [
    { year: 1983, fires: 18229, area: 1323666 },
    { year: 1984, fires: 20493, area: 1148409 },
    { year: 1985, fires: 82591, area: 2896147 },
    { year: 1986, fires: 85907, area: 2719162 },
    { year: 1987, fires: 71300, area: 2447296 },
    { year: 1988, fires: 72750, area: 5009290 },
    { year: 1989, fires: 48949, area: 1827310 },
    { year: 1990, fires: 66481, area: 4621621 },
    { year: 1991, fires: 75754, area: 2953578 },
    { year: 1992, fires: 87394, area: 2069929 },
    { year: 1993, fires: 58810, area: 1797574 },
    { year: 1994, fires: 79107, area: 4073579 },
    { year: 1995, fires: 82234, area: 1840546 },
    { year: 1996, fires: 96363, area: 6065998 },
    { year: 1997, fires: 66196, area: 2856959 },
    { year: 1998, fires: 81043, area: 1329704 },
    { year: 1999, fires: 92487, area: 5626093 },
    { year: 2000, fires: 92250, area: 7393493 },
    { year: 2001, fires: 84079, area: 3570911 },
    { year: 2002, fires: 73457, area: 7184712 },
    { year: 2003, fires: 63629, area: 3960842 },
    { year: 2004, fires: 65461, area: 8097880 },
    { year: 2005, fires: 66753, area: 8689389 },
    { year: 2006, fires: 96385, area: 9873745 },
    { year: 2007, fires: 85705, area: 9328045 },
    { year: 2008, fires: 78979, area: 5292468 },
    { year: 2009, fires: 78792, area: 5921786 },
    { year: 2010, fires: 71971, area: 3422724 },
    { year: 2011, fires: 74126, area: 8711367 },
    { year: 2012, fires: 67774, area: 9326238 },
    { year: 2013, fires: 47579, area: 4319546 },
    { year: 2014, fires: 63312, area: 3595613 },
    { year: 2015, fires: 68151, area: 10125149 },
    { year: 2016, fires: 67743, area: 5509995 },
    { year: 2017, fires: 71499, area: 10026086 },
    { year: 2018, fires: 58083, area: 8767492 },
    { year: 2019, fires: 50477, area: 4664364 },
    { year: 2020, fires: 58950, area: 10122336 },
    { year: 2021, fires: 58985, area: 7125643 },
    { year: 2022, fires: 68988, area: 7577183 },
    { year: 2023, fires: 56580, area: 2693910 },
    { year: 2024, fires: 64897, area: 8924884 },
    { year: 2025, fires: 77850, area: 5131474 },
    { year: 2026, fires: 39520, area: 3633827, projectedArea: 6500000, projectedFires: 58000, isPreliminary: true }
  ],

  // Canada data. Primary unit for Canada CWFIS reports is Hectares.
  canada: [
    { year: 1983, fires: 8311, area: 1194200 },
    { year: 1984, fires: 8580, area: 765400 },
    { year: 1985, fires: 8948, area: 755200 },
    { year: 1986, fires: 6813, area: 950100 },
    { year: 1987, fires: 10708, area: 1085600 },
    { year: 1988, fires: 10363, area: 1336100 },
    { year: 1989, fires: 11197, area: 7559600 },
    { year: 1990, fires: 10111, area: 934400 },
    { year: 1991, fires: 10327, area: 1584700 },
    { year: 1992, fires: 9068, area: 868700 },
    { year: 1993, fires: 6043, area: 1967700 },
    { year: 1994, fires: 9763, area: 6296000 },
    { year: 1995, fires: 8486, area: 7095100 },
    { year: 1996, fires: 6349, area: 1854900 },
    { year: 1997, fires: 6148, area: 630700 },
    { year: 1998, fires: 10723, area: 4614300 },
    { year: 1999, fires: 7632, area: 1624600 },
    { year: 2000, fires: 5349, area: 665300 },
    { year: 2001, fires: 7753, area: 626400 },
    { year: 2002, fires: 7861, area: 2770400 },
    { year: 2003, fires: 8230, area: 1743400 },
    { year: 2004, fires: 6680, area: 3183800 },
    { year: 2005, fires: 7542, area: 1671500 },
    { year: 2006, fires: 9820, area: 2250800 },
    { year: 2007, fires: 6917, area: 1542200 },
    { year: 2008, fires: 6278, area: 1712100 },
    { year: 2009, fires: 7210, area: 775000 },
    { year: 2010, fires: 7291, area: 3052500 },
    { year: 2011, fires: 7911, area: 1811734 },
    { year: 2012, fires: 6246, area: 4268420 },
    { year: 2013, fires: 6654, area: 4260379 },
    { year: 2014, fires: 5016, area: 4545655 },
    { year: 2015, fires: 7029, area: 3908375 },
    { year: 2016, fires: 5259, area: 1319573 },
    { year: 2017, fires: 5654, area: 3589424 },
    { year: 2018, fires: 7111, area: 2326357 },
    { year: 2019, fires: 4062, area: 1786215 },
    { year: 2020, fires: 4014, area: 218262 },
    { year: 2021, fires: 6710, area: 4078895 },
    { year: 2022, fires: 5658, area: 1576205 },
    { year: 2023, fires: 6837, area: 17606547 },
    { year: 2024, fires: 5844, area: 5374344 },
    { year: 2025, fires: 6199, area: 8426718 },
    { year: 2026, fires: 3540, area: 2384033, projectedArea: 4800000, projectedFires: 5500, isPreliminary: true }
  ],

  // Regional shares based on historical averages (percentage of total fires, percentage of total area)
  // These represent the relative share of fire activity across major geographic subdivisions.
  regions: {
    us: [
      { id: "us_alaska", name: "Alaska", areaShare: 0.30, fireShare: 0.03, desc: "Sparsely populated boreal forest. Fires are less frequent but can grow into massive complexes, burning millions of acres with minimal suppression." },
      { id: "us_west", name: "Western US", areaShare: 0.60, fireShare: 0.35, desc: "Includes California, Northwest, Southwest, and Rockies. High fire frequency with extreme intensity due to drought, complex topography, and high fuel loads." },
      { id: "us_east_south", name: "Eastern & Southern US", areaShare: 0.10, fireShare: 0.62, desc: "Characterized by a high number of human-caused fires, but they are suppressed quickly and average fire sizes remain small." }
    ],
    canada: [
      { id: "ca_north", name: "Northern Territories", areaShare: 0.25, fireShare: 0.08, desc: "Yukon, Northwest Territories, and Nunavut. Massive wilderness areas where fires are primarily lightning-caused and left to burn naturally to maintain ecosystem health." },
      { id: "ca_west", name: "Western Canada", areaShare: 0.60, fireShare: 0.60, desc: "BC, Alberta, Saskatchewan, and Manitoba. The most active region, experiencing severe seasonal droughts, pine beetle infestations, and intense boreal forest fires." },
      { id: "ca_east_atlantic", name: "Central & Eastern Canada", areaShare: 0.15, fireShare: 0.32, desc: "Ontario, Quebec, and Atlantic Provinces. Mixed forests with less frequent fire cycles, though years like 2023 can see extreme activity when blocking high-pressure systems cause intense heat waves." }
    ]
  },

  // Metadata for outlier/trend analysis
  outliers: {
    1989: {
      country: "canada",
      title: "1989 Canada Fire Storms",
      subtitle: "The Historical Boreal Inferno",
      stat: "7.56M Hectares Burned",
      desc: "An exceptionally dry spring followed by intense summer lightning storms sparked massive fires across Manitoba, Saskatchewan, and Ontario. Over 11,000 fires were recorded, a historical count record. In Manitoba alone, 25,000 people were evacuated from 24 communities as fire complexes threatened towns. This season stood as the benchmark for Canadian wildfire destruction for over three decades."
    },
    2004: {
      country: "us",
      title: "2004 Alaska Record Season",
      subtitle: "The Midnight Smoke",
      stat: "6.6M Acres Burned in Alaska",
      desc: "Alaska experienced its worst wildfire season in recorded history. An unusually warm, dry summer combined with record-breaking lightning strikes ignited hundreds of fires. Out of the 8.1M total acres burned across the entire United States, over 6.6M were in Alaska alone. Smoke from these fires blanketed Fairbanks and parts of Canada for weeks, creating hazardous air quality conditions."
    },
    2015: {
      country: "us",
      title: "2015 US Double Digit Record",
      subtitle: "Widespread Western Burning",
      stat: "10.13M Acres Burned",
      desc: "The U.S. surpassed 10 million acres burned in a single year for the first time on record since 1983. Extreme drought in the Pacific Northwest and Alaska drove this record. Alaska accounted for 5.1M acres, while Washington and Oregon experienced catastrophic losses, including the Okanogan Complex, which became Washington's largest wildfire in state history at the time."
    },
    2020: {
      country: "us",
      title: "2020 US Wildfire Crisis",
      subtitle: "The Red Skies of California & Oregon",
      stat: "10.12M Acres Burned",
      desc: "A year defined by record-breaking heatwaves and dry lightning complexes. California experienced its worst fire season on record, with over 4.3M acres burned and the first 'gigafire' (August Complex, >1 million acres). Strong wind events pushed fires through Western Oregon, destroying entire towns and casting an eerie orange-red glow over major cities like San Francisco and Portland."
    },
    2023: {
      country: "canada",
      title: "2023 Canadian Pyro-Crisis",
      subtitle: "The Global Record Breaker",
      stat: "17.6M Hectares Burned",
      desc: "By far the most destructive wildfire season in North American history, burning more than triple the long-term Canadian average. Extreme drought and early summer heat caused concurrent outbreaks across Quebec, Alberta, BC, and the NWT. Standard firefighting resources were overwhelmed, leading to the mobilization of thousands of international firefighters. Smoke plumes traveled thousands of miles, choking air quality in New York City, Chicago, and Western Europe, and releasing over 1.7 billion tonnes of CO₂ equivalent."
    },
    2025: {
      country: "canada",
      title: "2025 Canadian Drought Follow-up",
      subtitle: "The Second-Worst Season on Record",
      stat: "8.43M Hectares Burned",
      desc: "Coming off the back of dry winters and persistent soil moisture deficits, the 2025 season saw early starts and extreme fire behavior in the western provinces and northern territories. Burning over 8.4 million hectares, it solidified a clear trend of larger, more persistent fires that burn deep into the organic soil layer."
    }
  }
};
