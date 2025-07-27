import React from 'react';

const About: React.FC = () => {
  return (
    <div className="space-y-4 text-sm">
      <p>
        <strong>What’s My Day – AstroWear & Fortune Guide</strong> is your personal, digital companion for navigating the day with cosmic wisdom and a touch of fun. We believe that a little guidance can make a big difference in how you approach your daily challenges and opportunities.
      </p>
      <p>
        Our app blends ancient astrological principles with modern technology to provide you with unique, personalized insights. By simply entering your name and date of birth, you unlock a daily forecast tailored just for you, including:
      </p>
      <ul className="list-disc list-inside space-y-2 pl-4">
        <li>Lucky colors to wear to enhance your energy.</li>
        <li>Foods that align with your elemental nature.</li>
        <li>A daily tarot card for deeper reflection.</li>
        <li>A personalized affirmation to empower your spirit.</li>
      </ul>
      <p>
        Our goal is to make astrology accessible, practical, and enjoyable for everyone. Whether you're a seasoned zodiac enthusiast or just curious, we hope "What's My Day" adds a little magic to your routine.
      </p>
    </div>
  );
};

export default About;