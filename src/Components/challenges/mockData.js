export const mockChallenges = [
    {
      id: '1',
      name: '30-Day Push-up Challenge',
      type: 'rep-based',
      startDate: '2025-05-01',
      endDate: '2025-05-30',
      eventType: 'strength',
      difficultyLevel: 'intermediate',
      rules: 'Complete as many push-ups as possible in one set. Form must be perfect.',
      scoring: 'Winners will be determined by the highest number of perfect form push-ups.',
      demoInstructions: 'Keep your core tight, back straight, and lower your chest until it nearly touches the ground.',
      demoVideo: 'https://example.com/pushup-demo',
      createdBy: {
        id: 'coach1',
        name: 'Coach Mike',
        role: 'coach'
      },
      participants: [
        {
          userId: '1',
          userName: 'John Doe',
          profilePhoto: null,
          result: {
            reps: 50,
            proof: 'https://example.com/proof1',
            submittedAt: '2025-05-15T10:00:00Z'
          },
          gender: 'male',
          region: 'North America',
          ageGroup: '25-34'
        }
      ],
      winners: ['1']
    },
    {
      id: '2',
      name: '5K Time Trial',
      type: 'time-based',
      startDate: '2025-05-10',
      endDate: '2025-05-20',
      eventType: 'endurance',
      difficultyLevel: 'beginner',
      rules: 'Run 5 kilometers on a flat surface. Indoor or outdoor running is allowed.',
      scoring: 'Winners will be determined by the fastest completion time.',
      demoInstructions: 'Pace yourself and maintain a steady rhythm throughout the run.',
      demoVideo: 'https://example.com/5k-demo',
      createdBy: {
        id: 'coach2',
        name: 'Coach Sarah',
        role: 'coach'
      },
      participants: [],
      winners: []
    }
  ];
  