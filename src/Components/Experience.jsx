import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/use-subscription';
import { ExperiencePost } from '../types/experience';
import { ExperienceGallery } from '../Components/experience/ExperienceGallery';
import { CreateExperienceModal } from '../Components/experience/CreateExperienceModal';
import PremiumFeatureModal from '../Components/subscription/PremiumFeatureModal';
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const ExperienceWall = () => {
  const { user, isPremiumFeatureEnabled } = useAuth();
  const { isPremiumModalOpen, checkFeatureAccess, closePremiumModal } = useSubscription();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [experiences, setExperiences] = useState(() => {
    const stored = localStorage.getItem('hyrox_experiences');
    return stored ? JSON.parse(stored) : [];
  });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    localStorage.setItem('hyrox_experiences', JSON.stringify(experiences));
  }, [experiences]);

  const handleCreateOrUpdatePost = (post) => {
    const userEmail = localStorage.getItem('auth_user')
      ? JSON.parse(localStorage.getItem('auth_user')).email
      : 'anonymous';

    if (editingPost) {
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === editingPost.id ? { ...exp, ...post } : exp
        )
      );
    } else {
      const newPost = {
        ...post,
        id: Date.now().toString(),
        userId: Date.now().toString(),
        userEmail,
        likes: 0,
      };
      setExperiences((prev) => [newPost, ...prev]);
    }

    setIsCreateModalOpen(false);
    setEditingPost(null);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (postId) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== postId));
  };

  const handleOpenCreate = () => {
    if (checkFeatureAccess('hyrox-experience-wall')) {
      setIsCreateModalOpen(true);
      setEditingPost(null);
    }
  };

  if (!isPremiumFeatureEnabled('hyrox-experience-wall')) {
    return (
      <Container sx={{ py: 8 }}>
        <PremiumFeatureModal
          open={isPremiumModalOpen}
          onClose={closePremiumModal}
          featureName="Hyrox Experience Wall"
        />
      </Container>
    );
  }

  const userEmail =
    user?.email || (localStorage.getItem('auth_user')
      ? JSON.parse(localStorage.getItem('auth_user')).email
      : null);

  return (
    <Container sx={{ py: 8 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          My Hyrox Experiences
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Share Experience
        </Button>
      </Stack>

      <ExperienceGallery
        experiences={experiences}
        onEdit={handleEdit}
        onDelete={handleDelete}
        userEmail={userEmail}
      />

      <CreateExperienceModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingPost(null);
        }}
        onSubmit={handleCreateOrUpdatePost}
        editingPost={editingPost}
      />
    </Container>
  );
};

export default ExperienceWall;
