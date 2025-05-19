



// Example mock data for threads
export const mockThreads= [
  {
    id: 'thread-001',
    title: 'Best OCR Shoes for Wet Conditions',
    content: "I'm looking for recommendations on shoes that work well in muddy and wet racecourses. What do you use?",
    category: 'gear',
    authorId: 'user-100',
    authorName: 'AlexRunner',
    createdAt: '2025-04-20T09:15:00Z',
    comments: [
      {
        id: 'cmt-001',
        content: "VJ shoes are great! They have amazing grip.",
        authorId: 'user-101',
        authorName: 'TrailQueen',
        createdAt: '2025-04-20T10:00:00Z',
        likes: ['user-100']
      }
    ],
    likes: ['user-102'],
  },
  {
    id: 'thread-002',
    title: 'Nutrition Tips for Endurance Athletes',
    content: "How do you fuel before and during a marathon? Looking for some tips, especially around race day breakfast.",
    category: 'nutrition',
    authorId: 'user-102',
    authorName: 'MarathonMike',
    createdAt: '2025-04-18T13:25:00Z',
    comments: [
      {
        id: 'cmt-002',
        content: 'I always stick to oatmeal and a banana before running long distances!',
        authorId: 'user-100',
        authorName: 'AlexRunner',
        createdAt: '2025-04-18T14:05:00Z',
        likes: []
      }
    ],
    likes: ['user-100', 'user-101'],
  },
  {
    id: 'thread-003',
    title: 'How to Overcome Pre-Race Nerves?',
    content: "Any advice on staying calm the night before a competition?",
    category: 'mindset',
    authorId: 'user-103',
    authorName: 'ZenRacer',
    createdAt: '2025-04-19T17:50:00Z',
    comments: [],
    likes: [],
  }
];