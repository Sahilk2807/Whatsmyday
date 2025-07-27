import { zodiacData, tarotCards } from '../data/astrology-data';

export const getZodiacSign = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    return "Capricorn";
};

// A simple seeded random function to ensure the fortune is the same for the whole day.
const seededRandom = (seed: number) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export const getDailyFortune = (zodiacSign: string, name: string) => {
    const today = new Date();
    // Create a seed based on the current date (YYYYMMDD) and zodiac sign
    const seedString = `${today.getFullYear()}${today.getMonth()}${today.getDate()}${zodiacSign}`;
    let seed = 0;
    for (let i = 0; i < seedString.length; i++) {
        seed += seedString.charCodeAt(i);
    }
    
    const signInfo = zodiacData[zodiacSign as keyof typeof zodiacData];
    
    const getRandomItem = <T>(arr: T[]): T => {
        const index = Math.floor(seededRandom(seed++) * arr.length);
        return arr[index];
    };

    const luckyColor = getRandomItem(signInfo.luckyColors);
    const affirmationTemplate = getRandomItem(signInfo.affirmations);

    return {
        zodiacSign: zodiacSign,
        element: signInfo.element,
        wear: `Today, embrace your inner power by wearing **${luckyColor}**. As a ${signInfo.element} sign, this color enhances your natural energy.`,
        avoidWear: `Try to avoid wearing **${getRandomItem(signInfo.unluckyColors)}** today, as it might dampen your vibrant aura.`,
        foodEat: `Nourish yourself with foods like **${getRandomItem(signInfo.foodsToEat)}**.`,
        foodAvoid: `It might be best to avoid **${getRandomItem(signInfo.foodsToAvoid)}** to maintain balance.`,
        direction: `Your suggested direction for focus or travel today is **${getRandomItem(signInfo.directions)}**.`,
        mood: getRandomItem(signInfo.moods),
        luckyNumber: getRandomItem(signInfo.luckyNumbers),
        tarotCard: getRandomItem(tarotCards),
        affirmation: `✨ ${name}, ${affirmationTemplate} ✨`,
    };
};