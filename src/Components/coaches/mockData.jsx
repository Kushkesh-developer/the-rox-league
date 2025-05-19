export const mockCoaches = [
    {
      id: '1',
      name: 'Sarah Johnson',
      profilePhoto: 'https://i.pravatar.cc/300?img=1',
      specialities: ['Strength Training', 'HIIT', 'Nutrition Planning'],
      trainingStyles: ['One-on-One', 'High Intensity', 'Goal-Oriented'],
      yearsOfExperience: 8,
      certifications: ['NASM Certified Personal Trainer', 'Precision Nutrition Level 1', 'TRX Certified'],
      location: {
        city: 'New York',
        country: 'USA'
      },
      services: [
        {
          name: 'Personalized Training Session',
          description: 'One-on-one training focused on your specific fitness goals with customized workout plans.',
          price: 85,
          bookingUrl: '/booking/1'
        },
        {
          name: 'Nutrition Consultation',
          description: 'In-depth analysis of your current diet with personalized meal planning and nutritional guidance.',
          price: 65,
          bookingUrl: '/booking/2'
        },
        {
          name: 'Fitness Assessment',
          description: 'Comprehensive evaluation of your fitness level including body composition, strength, and endurance metrics.',
          price: 55,
          bookingUrl: '/booking/3'
        }
      ],
      documents: [
        {
          title: 'Client Onboarding Form',
          url: '#onboarding'
        },
        {
          title: 'Training Philosophy',
          url: '#philosophy'
        }
      ],
      popularity: 94,
      joinedDate: '2021-03-15'
    },
    {
      id: '2',
      name: 'Marcus Williams',
      profilePhoto: 'https://i.pravatar.cc/300?img=11',
      specialities: ['Bodybuilding', 'Weight Loss', 'Sports Conditioning'],
      trainingStyles: ['Progressive Overload', 'Split Training', 'Supportive'],
      yearsOfExperience: 12,
      certifications: ['ISSA Fitness Trainer', 'ACE Certified Personal Trainer', 'Kettlebell Specialist'],
      location: {
        city: 'Los Angeles',
        country: 'USA'
      },
      services: [
        {
          name: 'Elite Personal Training',
          description: 'Premium one-on-one training sessions with advanced techniques and personalized programming.',
          price: 95,
          bookingUrl: '/booking/4'
        },
        {
          name: 'Body Transformation Program',
          description: '12-week comprehensive program designed to dramatically change your physique with progressive workouts.',
          price: 75,
          bookingUrl: '/booking/5'
        }
      ],
      documents: [
        {
          title: 'Liability Waiver',
          url: '#waiver'
        },
        {
          title: 'Training Methods Guide',
          url: '#guide'
        }
      ],
      popularity: 88,
      joinedDate: '2019-07-22'
    },
    {
      id: '3',
      name: 'Aisha Patel',
      profilePhoto: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110',
      specialities: ['Yoga', 'Flexibility', 'Meditation'],
      trainingStyles: ['Group Classes', 'Private Sessions', 'Workshops'],
      yearsOfExperience: 10,
      certifications: ['RYT-500', 'Yoga Therapy Certification', 'Meditation Teacher'],
      location: {
        city: 'Los Angeles',
        country: 'USA'
      },
      documents: [
        {
          title: 'Yoga Philosophy',
          url: '/documents/yoga-philosophy-aisha.pdf'
        },
        {
          title: 'Meditation Guide',
          url: '/documents/meditation-guide-aisha.pdf'
        }
      ],
      services: [
        {
          name: 'Private Yoga Session',
          description: 'One-on-one yoga instruction tailored to your needs and goals.',
          price: 85,
          bookingUrl: 'https://example.com/book-aisha-private'
        },
        {
          name: 'Flexibility Program',
          description: '8-week progressive flexibility program with twice-weekly sessions.',
          price: 320,
          bookingUrl: 'https://example.com/book-aisha-flexibility'
        },
        {
          name: 'Meditation Course',
          description: '4-week introduction to meditation practices with daily guidance.',
          price: 180,
          bookingUrl: 'https://example.com/book-aisha-meditation'
        }
      ],
      popularity: 85,
      joinedDate: '2022-05-20T00:00:00Z'
    },
    {
      id: '4',
      name: 'David Kim',
      profilePhoto: 'https://images.unsplash.com/photo-1618355776464-8666794d2520',
      specialities: ['Powerlifting', 'Bodybuilding', 'Strength'],
      trainingStyles: ['Competition Prep', 'Personalized Training Plans'],
      yearsOfExperience: 15,
      certifications: ['NSCA-CSCS', 'ISSA Master Trainer', 'USA Powerlifting Coach'],
      location: {
        city: 'Chicago',
        country: 'USA'
      },
      documents: [
        {
          title: 'Strength Training Principles',
          url: '/documents/strength-principles-david.pdf'
        }
      ],
      services: [
        {
          name: 'Powerlifting Coaching',
          description: 'Specialized coaching for competitive powerlifters with program design.',
          price: 200,
          bookingUrl: 'https://example.com/book-david-powerlifting'
        },
        {
          name: 'Hypertrophy Focus',
          description: '12-week bodybuilding program with nutrition planning and regular assessments.',
          price: 350,
          bookingUrl: 'https://example.com/book-david-hypertrophy'
        },
        {
          name: 'Technique Analysis',
          description: 'Detailed review of your lifting technique with correction and guidance.',
          price: 120,
          bookingUrl: 'https://example.com/book-david-technique'
        }
      ],
      popularity: 95,
      joinedDate: '2019-11-05T00:00:00Z'
    },
    {
      id: '5',
      name: 'Emma Lawson',
      profilePhoto: 'https://images.unsplash.com/photo-1593164842249-d74fc06dae05',
      specialities: ['Pilates', 'Core Strength', 'Posture Correction'],
      trainingStyles: ['Rehabilitation', 'Private Sessions', 'Group Classes'],
      yearsOfExperience: 7,
      certifications: ['Comprehensive Pilates Certification', 'ACSM-CPT', 'Corrective Exercise Specialist'],
      location: {
        city: 'London',
        country: 'UK'
      },
      documents: [
        {
          title: 'Pilates for Beginners',
          url: '/documents/pilates-beginners-emma.pdf'
        }
      ],
      services: [
        {
          name: 'Private Pilates Session',
          description: 'One-on-one Pilates training with emphasis on proper form and progression.',
          price: 90,
          bookingUrl: 'https://example.com/book-emma-private'
        },
        {
          name: 'Posture Correction Program',
          description: '10-week program focused on alignment and core strength.',
          price: 400,
          bookingUrl: 'https://example.com/book-emma-posture'
        },
        {
          name: 'Group Mat Pilates',
          description: 'Small group Pilates classes with personalized attention.',
          price: 30,
          bookingUrl: 'https://example.com/book-emma-group'
        }
      ],
      popularity: 82,
      joinedDate: '2021-09-15T00:00:00Z'
    },
    {
      id: '6',
      name: 'Carlos Torres',
      profilePhoto: 'https://images.unsplash.com/photo-1579191145154-a092c2406c3c',
      specialities: ['Boxing', 'Kickboxing', 'Self-Defense'],
      trainingStyles: ['Technical Training', 'Fitness Boxing', 'Combat Sports'],
      yearsOfExperience: 11,
      certifications: ['USA Boxing Coach', 'NASM-CPT', 'Muay Thai Level 2'],
      location: {
        city: 'Miami',
        country: 'USA'
      },
      documents: [
        {
          title: 'Boxing Fundamentals',
          url: '/documents/boxing-fundamentals-carlos.pdf'
        }
      ],
      services: [
        {
          name: 'Private Boxing Lesson',
          description: 'One-on-one boxing instruction focused on technique and skill development.',
          price: 80,
          bookingUrl: 'https://example.com/book-carlos-private'
        },
        {
          name: 'Fighter\'s Conditioning',
          description: '8-week program to build stamina, power and agility for combat sports.',
          price: 320,
          bookingUrl: 'https://example.com/book-carlos-conditioning'
        },
        {
          name: 'Self-Defense Course',
          description: '6-session practical self-defense course for real-world situations.',
          price: 250,
          bookingUrl: 'https://example.com/book-carlos-defense'
        }
      ],
      popularity: 88,
      joinedDate: '2020-07-22T00:00:00Z'
    }
  ];
  
  export const getPackagePrice = (servicePrice, sessionCount = 4, discountPercentage= 15) => {
    return Math.round(servicePrice * sessionCount * (1 - discountPercentage / 100));
  };
  
  export const createBulkPackage = (service, sessionCount = 4, discountPercentage = 15) => {
    return {
      name: `${service.name} Package`,
      price: getPackagePrice(service.price, sessionCount, discountPercentage),
      description: `Package of ${sessionCount} ${service.name} sessions with a ${discountPercentage}% discount.`,
      sessionCount: sessionCount,
      originalService: service
    };
  };
  