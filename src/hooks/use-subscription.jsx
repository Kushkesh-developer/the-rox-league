import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function useSubscription() {
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState('');
  const { isPremiumFeatureEnabled } = useAuth();
  const navigate = useNavigate();

  // Function to check if a feature is accessible and show modal if not
  const checkFeatureAccess = (featureName) => {
    if (isPremiumFeatureEnabled(featureName)) {
      return true;
    } else {
      setCurrentFeature(featureName);
      setIsPremiumModalOpen(true);
      return false;
    }
  };

  // Function to directly navigate to subscription page
  const goToSubscriptionPage = () => {
    navigate('/subscription');
  };

  // Function to close the premium modal
  const closePremiumModal = () => {
    setIsPremiumModalOpen(false);
  };

  return {
    checkFeatureAccess,
    isPremiumModalOpen,
    currentFeature,
    closePremiumModal,
    goToSubscriptionPage
  };
}
