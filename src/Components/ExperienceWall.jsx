import React, { useState, useEffect } from 'react';
import { useSubscription } from '../hooks/use-subscription';
import { ExperienceCard } from './experience/ExperienceCard';
import { CreateExperienceModal } from '../Components/experience/CreateExperienceModal';
import { ExperienceFilters } from '../Components/experience/ExperienceFilter';
import PremiumFeatureModal from '../Components/subscription/PremiumFeatureModal';
import Header from './Header';
import { useToast } from "../hooks/use-toast";
import { Button, Container, Typography, Grid, Box } from '@mui/material';
import { Plus } from 'lucide-react';

const ExperienceWall = () => {
  const { isPremiumModalOpen, closePremiumModal } = useSubscription();
  const { toast } = useToast();
  
  // Initialize states
  const [userEmail, setUserEmail] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [experiences, setExperiences] = useState(() => {
    const stored = localStorage.getItem('hyrox_experiences');
    return stored ? JSON.parse(stored) : [];
  });

  const [editingPost, setEditingPost] = useState(null);
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [hashtagFilter, setHashtagFilter] = useState('');

  // Get user from localStorage
  useEffect(() => {
    try {
      const userString = localStorage.getItem('1');
      
      if (userString) {
        const userData = JSON.parse(userString);
        console.log("Found user data:", userData);
        
        if (userData && userData.email) {
          setUserEmail(userData.email);
          console.log("User email set to:", userData.email);
        } else {
          setUserEmail(null);
          console.log("User object found but no email property");
        }
      } else {
        console.log("No user data found with key '1'");
        setUserEmail(null);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setUserEmail(null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hyrox_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    let filtered = experiences;

    if (searchQuery) {
      filtered = filtered.filter(exp =>
        exp.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(exp => exp.eventType === typeFilter);
    }

    if (hashtagFilter) {
      filtered = filtered.filter(exp =>
        exp.hashtags.some(tag =>
          tag.toLowerCase().includes(hashtagFilter.toLowerCase())
        )
      );
    }

    setFilteredExperiences(filtered);
  }, [experiences, searchQuery, typeFilter, hashtagFilter]);

  // Function to handle access button click
  const handleAccessButtonClick = () => {
    setShowMainContent(true);
    // Optionally mock a user email for demonstration purposes
    if (!userEmail) {
      setUserEmail("guest@example.com");
    }
  };

  const handleCreateOrUpdatePost = (post) => {
    if (editingPost) {
      setExperiences(prev =>
        prev.map(exp => (exp.id === editingPost.id ? { ...exp, ...post } : exp))
      );
      toast({ title: 'Experience updated', description: 'Your experience has been successfully updated.' });
    } else {
      const newPost = {
        ...post,
        id: Date.now().toString(),
        userId: Date.now().toString(),
        userEmail,
        likes: 0,
        comments: [],
      };
      setExperiences(prev => [newPost, ...prev]);
      toast({ title: 'Experience shared', description: 'Your experience has been successfully shared.' });
    }

    setIsCreateModalOpen(false);
    setEditingPost(null);
  };

  const handleLike = (postId) => {
    setExperiences(prev =>
      prev.map(exp => (exp.id === postId ? { ...exp, likes: exp.likes + 1 } : exp))
    );
  };

  const handleComment = (postId, content) => {
    setExperiences(prev =>
      prev.map(exp =>
        exp.id === postId
          ? {
              ...exp,
              comments: [
                ...exp.comments,
                {
                  id: Date.now().toString(),
                  userId: Date.now().toString(),
                  userEmail,
                  content,
                  date: new Date().toISOString(),
                  replies: [],
                },
              ],
            }
          : exp
      )
    );
  };

  const handleReply = (postId, commentId, content) => {
    setExperiences(prev =>
      prev.map(exp =>
        exp.id === postId
          ? {
              ...exp,
              comments: exp.comments.map(comment =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: [
                        ...comment.replies,
                        {
                          id: Date.now().toString(),
                          userId: Date.now().toString(),
                          userEmail,
                          content,
                          date: new Date().toISOString(),
                        },
                      ],
                    }
                  : comment
              ),
            }
          : exp
      )
    );
  };

  const handleReport = (type) => {
    toast({ title: `${type === 'post' ? 'Experience' : 'Comment'} reported`, description: "Thank you for your report. We'll review it shortly." });
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (postId) => {
    setExperiences(prev => prev.filter(exp => exp.id !== postId));
    toast({ title: 'Experience deleted', description: 'Your experience has been successfully deleted.' });
  };

  const handleOpenCreate = () => {
    setIsCreateModalOpen(true);
    setEditingPost(null);
  };

  return (
    <div>
      <Header />
      <Container sx={{ py: 8 }}>
        {userEmail === null && !showMainContent ? (
          // Show upgrade message with access button
          <>
            <PremiumFeatureModal
              open={isPremiumModalOpen}
              onClose={closePremiumModal}
              featureName="Hyrox Experience Wall"
            />
            <Box textAlign="center" mt={10}>
              <Typography variant="h4" mb={4}>
                Upgrade to access the Hyrox Experience Wall
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleAccessButtonClick}
                sx={{ mt: 2 }}
              >
                Access Experience Wall
              </Button>
            </Box>
          </>
        ) : (
          // Show main content if email is found or button was clicked
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h4" fontWeight="bold">
                My Hyrox Experiences
              </Typography>
              <Button variant="contained" color="primary" onClick={handleOpenCreate} startIcon={<Plus size={20} />}>
                Share Experience
              </Button>
            </Box>

            <ExperienceFilters
              onSearch={setSearchQuery}
              onTypeFilter={setTypeFilter}
              onHashtagFilter={setHashtagFilter}
            />

            <Grid container spacing={3}>
              {filteredExperiences.map((post) => (
                <Grid  size={{xs:12,md:6,lg:4}} key={post.id}>
                  <ExperienceCard
                    post={post}
                    isOwner={post.userEmail === userEmail}
                    onLike={() => handleLike(post.id)}
                    onComment={(content) => handleComment(post.id, content)}
                    onReply={(commentId, content) => handleReply(post.id, commentId, content)}
                    onReport={handleReport}
                    onEdit={() => handleEdit(post)}
                    onDelete={() => handleDelete(post.id)}
                  />
                </Grid>
              ))}
            </Grid>

            <CreateExperienceModal
              isOpen={isCreateModalOpen}
              onClose={() => {
                setIsCreateModalOpen(false);
                setEditingPost(null);
              }}
              onSubmit={handleCreateOrUpdatePost}
              editingPost={editingPost}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default ExperienceWall;