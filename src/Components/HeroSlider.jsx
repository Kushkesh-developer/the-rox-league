import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from "react-swipeable-views-react-18-fix";

const slides = [
    {
        title: 'Join The Rox League',
        description: 'Be part of the most exciting fitness community and take your workouts to the next level',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        buttonText: 'Join Now',
        buttonLink: '/register',
        color: 'primary'
    },
    {
        title: 'Find Your Partner',
        description: 'Connect with like-minded fitness enthusiasts who match your workout style and goals',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
        buttonText: 'Find Partners',
        buttonLink: '/partners',
        color: 'secondary'
    },
    {
        title: 'Upload Your Workout',
        description: 'Share your achievements, get feedback and climb the leaderboards',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
        buttonText: 'Share Workout',
        buttonLink: '/upload',
        color: 'error'
    },
];

const HeroBox = styled(Box)(({ theme }) => ({
    height: { xs: '70vh', md: '85vh' },
    position: 'relative',
    overflow: 'hidden',
    marginTop: '-64px', // To compensate for AppBar height
    paddingTop: '64px',
}));

const SlideContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
    zIndex: 1,
}));

const SlideBackground = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

const NavButtons = styled(Box)({
    position: 'absolute',
    bottom: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 2,
});

const NavButton = styled(Button)({
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '50%',
    minWidth: '48px',
    width: '48px',
    height: '48px',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

const HeroSlider = () => {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = slides.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [activeStep]);

    return (
        <HeroBox>
            <SwipeableViews
                axis="x"
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                style={{ height: '100%' }}
            >
                {slides.map((slide, index) => (
                    <Box key={index} sx={{ height: '100%' }}>
                        <SlideBackground
                            sx={{ backgroundImage: `url(${slide.image})` }}
                        />
                        <SlideContent>
                            <Container maxWidth="lg">
                                <Box
                                    sx={{
                                        maxWidth: 600,
                                        color: 'white',
                                        textAlign: 'center', // Center text for all screen sizes
                                        p: { xs: 2, md: 0 },
                                        mx: 'auto', // Center box horizontally
                                    }}
                                >
                                    <Typography
                                        variant="h2"
                                        component="h1"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        {slide.title}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 4,
                                            textShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                                        }}
                                    >
                                        {slide.description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color={slide.color}
                                        size="large"
                                        sx={{
                                            py: 1.5,
                                            px: 4,
                                            fontSize: '1.1rem',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        {slide.buttonText}
                                    </Button>
                                </Box>
                            </Container>
                        </SlideContent>
                    </Box>
                ))}
            </SwipeableViews>

            <NavButtons>
                <NavButton onClick={handleBack}>
                    <KeyboardArrowLeft />
                </NavButton>
                <NavButton onClick={handleNext}>
                    <KeyboardArrowRight />
                </NavButton>
            </NavButtons>
        </HeroBox>
    );
};

export default HeroSlider;