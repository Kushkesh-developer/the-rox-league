import React, { createContext, useState, useContext, useEffect } from 'react';

// List of premium features and which plans they're available in
const PREMIUM_FEATURES = {
  'hyrox-experience-wall': ['premium', 'pro'],
  'premium-workouts': ['premium', 'pro'],
  'private-coaching': ['premium', 'pro'],
  'analytics-dashboard': ['premium', 'pro'],
  'priority-support': ['pro'],
  'personalized-training': ['pro'],
  'profile-setup': ['premium', 'pro'],
  'roxexchange': ['premium', 'pro'],
  'roxpartner': ['premium', 'pro'],
  'community-forum': ['premium', 'pro'],
  'messaging': ['premium', 'pro'],
};

// Create context with default values
const AuthContext = createContext({
  isAuthenticated: false,
  userSubscription: null,
  login: async () => false,
  logout: () => {},
  user: null,
  register: async () => false,
  checkSubscription: () => {},
  isPremiumUser: () => false,
  isPremiumFeatureEnabled: () => false,
});

// Create provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null);

  // Restore user session from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  // Check subscription status on component mount and when user changes
  useEffect(() => {
    if (user) {
      checkSubscription();
      // Save user to localStorage on user update
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      setUserSubscription(null);
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  // Check subscription status
  const checkSubscription = () => {
    if (!user) return;
    
    const subscriptionData = localStorage.getItem(`subscription_${user.id}`);
    if (subscriptionData) {
      const subscription = JSON.parse(subscriptionData);
      
      // Check if subscription is expired
      const now = new Date();
      const expiryDate = new Date(subscription.expiryDate);
      
      if (now > expiryDate) {
        // Subscription expired
        if (subscription.autoRenew) {
          // Auto-renew subscription
          const newExpiryDate = new Date();
          newExpiryDate.setDate(newExpiryDate.getDate() + 30); // 30 days validity
          
          subscription.purchaseDate = now.toISOString();
          subscription.expiryDate = newExpiryDate.toISOString();
          
          localStorage.setItem(`subscription_${user.id}`, JSON.stringify(subscription));
          
          setUserSubscription(subscription.planId);
        } else {
          // Subscription expired and not renewed
          localStorage.removeItem(`subscription_${user.id}`);
          setUserSubscription('free');
        }
      } else {
        // Subscription active
        setUserSubscription(subscription.planId);
      }
    } else {
      setUserSubscription('free');
    }
  };

  // Check if a specific premium feature is enabled for the user
  const isPremiumFeatureEnabled = (feature) => {
    if (!userSubscription || userSubscription === 'free') return false;
    
    const allowedPlans = PREMIUM_FEATURES[feature];
    if (!allowedPlans) return false;
    
    return allowedPlans.includes(userSubscription);
  };

  // Check if the user has a premium subscription
  const isPremiumUser = () => {
    return userSubscription === 'premium' || userSubscription === 'pro';
  };

  // Mock register function (would connect to backend in real app)
  const register = async (name, email, password, role = 'athlete') => {
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name && email && password) {
          // In a real app, this would send data to a server
          console.log('User registered:', { name, email, role });
          
          // Auto-set the user after registration
          const mockUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: name,
            email: email,
            role: role,
            subscription: 'free'
          };
          
          setUser(mockUser);
          setIsAuthenticated(true);
          setUserSubscription('free');
          
          // Save user to localStorage
          localStorage.setItem('auth_user', JSON.stringify(mockUser));
          
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  // Mock login function (would connect to backend in real app)
  const login = async (email, password) => {
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful login
        if (email && password) {
          const mockUser = {
            id: '1',
            name: email.split('@')[0],
            email: email,
            role: 'athlete',
            subscription: 'free',
          };
          
          setUser(mockUser);
          setIsAuthenticated(true);
          // Save user to localStorage
          localStorage.setItem('auth_user', JSON.stringify(mockUser));
          
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setUserSubscription(null);
    localStorage.removeItem('auth_user');
  };

  // Provide auth context to child components
  const value = {
    isAuthenticated,
    userSubscription,
    login,
    logout,
    user,
    register,
    checkSubscription,
    isPremiumUser,
    isPremiumFeatureEnabled
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};