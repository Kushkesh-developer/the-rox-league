export const mockPosts = [
    {
      id: 'post1',
      title: 'High-Intensity Interval Training for Beginners',
      description: `HIIT can be intimidating for beginners, but it doesn't have to be! Here's a simple routine to get started: 30 seconds of work followed by 90 seconds of rest. Start with bodyweight exercises like jumping jacks, push-ups, and squats. As you build endurance, decrease rest time and increase work intervals.`,
      coach: {
        id: '1', // Sarah Johnson
        name: 'Sarah Johnson',
        profilePhoto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883'
      },
      datePosted: '2025-04-05T14:30:00Z',
      likes: 124,
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      tags: ['HIIT', 'Beginners', 'Cardio', 'Workout'],
      isEvent: false,
      comments: [
        {
          id: 'comment1',
          text: "This routine has been amazing for me! I have seen results in just 3 weeks.",
          author: {
            id: 'user1',
            name: 'Jamie Smith',
            profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          },
          datePosted: '2025-04-05T15:45:00Z',
          likes: 8,
          replies: [
            {
              id: 'reply1',
              text: 'So glad to hear that! Keep up the great work!',
              author: {
                id: '1',
                name: 'Sarah Johnson',
                profilePhoto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883'
              },
              datePosted: '2025-04-05T16:20:00Z',
              likes: 3
            }
          ]
        }
      ]
    },
    {
      id: 'post2',
      title: 'Marathon Training Workshop - Join Us!',
      description: 'Preparing for your first marathon? Join our 4-week workshop designed to help you build endurance, prevent injuries, and improve your running form. This event includes weekly group runs, nutrition guidance, and personalized training plans.',
      coach: {
        id: '2', // Michael Rodriguez
        name: 'Michael Rodriguez',
        profilePhoto: 'https://images.unsplash.com/photo-1567013127542-490d757e6349'
      },
      datePosted: '2025-04-04T10:15:00Z',
      likes: 98,
      isEvent: true,
      location: 'Central Park, New York',
      tags: ['Marathon', 'Running', 'Training', 'Workshop'],
      bookingSlot: {
        datetime: '2025-04-20T08:00:00Z',
        url: '#'
      },
      comments: []
    },
    {
      id: 'post3',
      title: 'Nutrition Tip: Post-Workout Recovery Foods',
      description: 'What you eat after a workout is just as important as the workout itself. Focus on proteins for muscle recovery and carbohydrates to replenish glycogen stores. My top picks: Greek yogurt with berries, a protein smoothie with banana, or a turkey and avocado wrap.',
      coach: {
        id: '4', // David Kim
        name: 'David Kim',
        profilePhoto: 'https://images.unsplash.com/photo-1618355776464-8666794d2520'
      },
      datePosted: '2025-04-03T08:45:00Z',
      likes: 156,
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1532768778661-1af431dacc6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      tags: ['Nutrition', 'Recovery', 'PostWorkout', 'HealthyEating'],
      isEvent: false,
      comments: [
        {
          id: 'comment2',
          text: 'Do you have any good recipes for vegetarians?',
          author: {
            id: 'user2',
            name: 'Taylor Reed',
            profilePhoto: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          },
          datePosted: '2025-04-03T10:20:00Z',
          likes: 5,
          replies: [
            {
              id: 'reply2',
              text: "Absolutely! Lentil and quinoa bowls with roasted vegetables are perfect. I will share some recipes in my next post.",
              author: {
                id: '4',
                name: 'David Kim',
                profilePhoto: 'https://images.unsplash.com/photo-1618355776464-8666794d2520'
              },
              datePosted: '2025-04-03T11:05:00Z',
              likes: 7
            }
          ]
        }
      ]
    },
    {
      id: 'post4',
      title: 'Strength Training Fundamentals Video',
      description: 'Check out my new video series on proper form for the five basic compound exercises: squats, deadlifts, bench press, overhead press, and rows. Getting these fundamentals right will set you up for safe and effective strength training.',
      coach: {
        id: '4', // David Kim
        name: 'David Kim',
        profilePhoto: 'https://images.unsplash.com/photo-1618355776464-8666794d2520'
      },
      datePosted: '2025-04-02T13:30:00Z',
      likes: 210,
      mediaType: 'video',
      mediaUrl: 'https://www.example.com/sample-video.mp4',
      tags: ['StrengthTraining', 'ProperForm', 'WeightLifting', 'TechniqueVideo'],
      isEvent: false,
      comments: [
        {
          id: 'comment3',
          text: 'Great video! Your explanation of proper squat form finally helped me understand what I was doing wrong.',
          author: {
            id: 'user3',
            name: 'Jordan Lee',
            profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          },
          datePosted: '2025-04-02T15:10:00Z',
          likes: 12,
          replies: []
        },
        {
          id: 'comment4',
          text: 'Can you cover Romanian deadlifts in your next video?',
          author: {
            id: 'user4',
            name: 'Casey Morgan',
            profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
          },
          datePosted: '2025-04-02T16:25:00Z',
          likes: 8,
          replies: []
        }
      ]
    },
    {
      id: 'post5',
      title: 'Yoga Flow for Stress Relief',
      description: 'Try this gentle 20-minute yoga sequence designed to release tension in your neck, shoulders, and back. Perfect for after a long day at work or whenever you need to center yourself.',
      coach: {
        id: '3', // Aisha Patel
        name: 'Aisha Patel',
        profilePhoto: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110'
      },
      datePosted: '2025-04-01T09:15:00Z',
      likes: 178,
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      tags: ['Yoga', 'StressRelief', 'MindfulMovement', 'Wellness'],
      isEvent: false,
      comments: []
    },
    {
      id: 'post6',
      title: 'Pilates Core Workshop - Limited Spots Available',
      description: 'Join me for a specialized workshop focused on strengthening your core through Pilates techniques. This 2-hour session will cover principles of proper alignment and introduce exercises you can incorporate into your daily routine.',
      coach: {
        id: '5', // Emma Lawson
        name: 'Emma Lawson',
        profilePhoto: 'https://images.unsplash.com/photo-1593164842249-d74fc06dae05'
      },
      datePosted: '2025-03-29T11:20:00Z',
      likes: 87,
      isEvent: true,
      location: 'London Fitness Studio, UK',
      tags: ['Pilates', 'CoreStrength', 'Workshop', 'PostureCorrection'],
      bookingSlot: {
        datetime: '2025-04-15T10:00:00Z',
        url: '#'
      },
      comments: []
    },
    {
      id: 'post7',
      title: 'Boxing Fundamentals for Beginners',
      description: 'Want to try boxing but not sure where to start? In this post, I break down the basic stance, footwork, and punches every beginner should master. Boxing is not just about strength, but technique and strategy.',
      coach: {
        id: '6', // Carlos Torres
        name: 'Carlos Torres',
        profilePhoto: 'https://images.unsplash.com/photo-1579191145154-a092c2406c3c'
      },
      datePosted: '2025-03-28T14:45:00Z',
      likes: 122,
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      tags: ['Boxing', 'BeginnerTips', 'BoxingFundamentals', 'FitnessBoxing'],
      isEvent: false,
      comments: []
    }
  ];