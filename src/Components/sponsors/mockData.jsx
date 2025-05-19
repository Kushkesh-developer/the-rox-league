export const mockSponsors = [
  {
    id: '1',
    name: 'TechFlex Solutions',
    logoUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    industryType: 'Technology',
    description: 'TechFlex Solutions is a leading tech company specializing in fitness wearables and performance tracking software for athletes and fitness enthusiasts.',
    history: 'Founded in 2015, TechFlex began as a startup focused on helping athletes track their performance metrics. Over the years, we have expanded our offerings to include a wide range of fitness tracking solutions.',
    mission: 'To empower athletes and fitness enthusiasts with cutting-edge technology that helps them achieve their goals and push their limits.',
    featuredOffer: '30% discount on our premium fitness tracking package for all ROX League members.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    websiteUrl: 'https://example.com/techflex',
    joinDate: '2023-01-15',
    popularityScore: 95
  },
  {
    id: '2',
    name: 'GreenPath Nutrition',
    logoUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    industryType: 'Health & Nutrition',
    description: 'GreenPath Nutrition provides organic, plant-based nutritional supplements and meal plans designed specifically for athletes and active individuals.',
    history: 'GreenPath was established in 2012 by a team of nutritionists and former professional athletes who recognized the need for clean, sustainable nutrition for performance.',
    mission: 'To fuel athletic performance through clean, sustainable nutrition while protecting our planet for future generations of athletes.',
    featuredOffer: 'Free personalized nutrition consultation and 15% off your first supplement order.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    websiteUrl: 'https://example.com/greenpath',
    joinDate: '2023-06-22',
    popularityScore: 87
  },
  {
    id: '3',
    name: 'Olympus Gear',
    logoUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    industryType: 'Sports Equipment',
    description: 'Olympus Gear designs and manufactures high-performance athletic equipment and apparel for serious athletes and weekend warriors alike.',
    history: 'With over 25 years in the industry, Olympus Gear has become synonymous with quality and innovation in athletic equipment design.',
    mission: 'To create gear that empowers athletes to reach new heights of performance, comfort, and style.',
    featuredOffer: 'Exclusive ROX League collection featuring premium workout gear at member-only prices.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    websiteUrl: 'https://example.com/olympusgear',
    joinDate: '2022-11-05',
    popularityScore: 92
  },
  {
    id: '4',
    name: 'Vital Recovery',
    logoUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    industryType: 'Wellness',
    description: 'Vital Recovery specializes in recovery technology, techniques, and products that help athletes bounce back faster and perform better.',
    history: 'Vital Recovery was founded in 2018 by sports medicine professionals looking to make cutting-edge recovery methods accessible to all athletes.',
    mission: 'To revolutionize athletic recovery, enabling athletes to train harder, perform better, and extend their careers through optimal recovery practices.',
    featuredOffer: '20% discount on recovery sessions and products for all ROX League members.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    websiteUrl: 'https://example.com/vitalrecovery',
    joinDate: '2024-01-10',
    popularityScore: 81
  },
  {
    id: '5',
    name: 'WildLife Athletic',
    logoUrl: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d',
    industryType: 'Apparel',
    description: 'WildLife Athletic creates sustainable athletic wear from recycled materials, combining performance, style, and environmental responsibility.',
    history: 'Founded by environmentalist athletes in 2019, WildLife Athletic has been pioneering eco-friendly performance wear from day one.',
    mission: 'To prove that high-performance athletic wear can coexist with environmental sustainability and social responsibility.',
    featuredOffer: 'New member special: Buy one get one 50% off on all WildLife performance wear.',
    featuredImageUrl: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
    websiteUrl: 'https://example.com/wildlife',
    joinDate: '2023-09-18',
    popularityScore: 78
  }
];

export const getIndustryTypes = () => {
  const industries = mockSponsors.map(sponsor => sponsor.industryType);
  return [...new Set(industries)]; // Get unique industry types
};

export const filterSponsors = (
  sponsors,
  searchTerm,
  industryType
) => {
  return sponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !industryType || sponsor.industryType === industryType;
    return matchesSearch && matchesIndustry;
  });
};

export const sortSponsors = (
  sponsors,
  sortOption
) => {
  return [...sponsors].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    } else {
      // 'popular' is default
      return b.popularityScore - a.popularityScore;
    }
  });
};
