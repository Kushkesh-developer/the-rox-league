import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../hooks/use-subscription';
import { useLocalStorageAuth } from './AuthGuard';
import PremiumFeatureModal from '../Components/subscription/PremiumFeatureModal';

const PremiumFeatureCheck = ({ featureName, children }) => {
  const { userSubscription } = useAuth();
  const { checkFeatureAccess, isPremiumModalOpen, closePremiumModal, goToSubscriptionPage } = useSubscription();
  const { storedUser } = useLocalStorageAuth();
  const [hasPremiumAccess, setHasPremiumAccess] = useState(null);

  useEffect(() => {
    // First check context-based subscription
    if (userSubscription) {
      const hasAccess = checkFeatureAccess(featureName.toLowerCase());
      setHasPremiumAccess(hasAccess);
      return;
    }
    
    // Fallback to localStorage subscription check
    try {
      const storedSubscription = localStorage.getItem('userSubscription');
      if (storedSubscription) {
        const parsedSubscription = JSON.parse(storedSubscription);
        // Implement a simple check based on subscription data structure
        // This is just an example - adjust according to your actual subscription data
        const hasAccess = parsedSubscription?.tier === 'premium' || 
                         parsedSubscription?.features?.includes(featureName.toLowerCase());
        setHasPremiumAccess(hasAccess);
      } else {
        setHasPremiumAccess(false);
      }
    } catch (error) {
      console.error('Error checking premium access from localStorage:', error);
      setHasPremiumAccess(false);
    }
  }, [userSubscription, featureName, checkFeatureAccess]);

  // Show loading state if still determining premium access
  if (hasPremiumAccess === null) {
    return null; // Or a loading spinner
  }

  return (
    <>
      {children}
      <PremiumFeatureModal 
        open={isPremiumModalOpen || hasPremiumAccess === false} 
        onClose={closePremiumModal} 
        featureName={featureName}
        onSubscribe={goToSubscriptionPage}
      />
    </>
  );
};

export default PremiumFeatureCheck;