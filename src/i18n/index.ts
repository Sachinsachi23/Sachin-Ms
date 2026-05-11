import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to StayNest India",
      "tagline": "Discover Hidden Nature Stays Across India",
      "search": "Search homestays...",
      "trending": "Trending Homestays",
      "monsoon": "Monsoon Escapes",
      "coffee": "Coffee Estate Stays",
      "waterfall": "Waterfall Stays",
      "budget": "Budget Weekend Trips",
      "luxury": "Luxury Nature Resorts",
      "explore": "Explore",
      "favorites": "Favorites",
      "bookings": "Bookings",
      "profile": "Profile",
      "login": "Login",
      "signup": "Sign Up",
      "homestayOwner": "Be a Host",
      "bookNow": "Book Now",
      "hiddenGems": "Hidden Gems",
      "aiAssistant": "AI Travel Assistant",
      "askAi": "Ask StayNest AI anything about your trip..."
    }
  },
  hi: {
    translation: {
      "welcome": "स्टेनेस्ट इंडिया में आपका स्वागत है",
      "tagline": "पूरे भारत में छिपे हुए प्रकृति प्रवासों की खोज करें",
      "search": "होमस्टे खोजें...",
      "trending": "ट्रेंडिंग होमस्टे",
      "monsoon": "मानसून एस्केप्स",
      "coffee": "कॉफी एस्टेट स्टे",
      "waterfall": "झरना स्टे",
      "budget": "बजट वीकेंड ट्रिप्स",
      "luxury": "लक्जरी नेचर रिसॉर्ट्स",
      "explore": "एक्सप्लोर करें",
      "favorites": "पसंदीदा",
      "bookings": "बुकिंग",
      "profile": "प्रोफ़ाइल",
      "login": "लॉगिन",
      "signup": "साइन अप करें",
      "homestayOwner": "मेजबान बनें",
      "bookNow": "अभी बुक करें",
      "hiddenGems": "छिपे हुए रत्न",
      "aiAssistant": "AI ट्रैवल असिस्टेंट",
      "askAi": "अपनी यात्रा के बारे में स्टेनेस्ट AI से कुछ भी पूछें..."
    }
  },
  kn: {
    translation: {
      "welcome": "ಸ್ಟೇ ನೆಸ್ಟ್ ಇಂಡಿಯಾಕ್ಕೆ ಸ್ವಾಗತ",
      "tagline": "ಭಾರತದಾದ್ಯಂತ ಅಡಗಿರುವ ನಿಸರ್ಗ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
      "search": "ಹೋಮ್‌ಸ್ಟೇಗಳನ್ನು ಹುಡುಕಿ...",
      "trending": "ಟ್ರೆಂಡಿಂಗ್ ಹೋಮ್‌ಸ್ಟೇಗಳು",
      "monsoon": "ಮುಂಗಾರು ಸೌಂದರ್ಯ",
      "coffee": "ಕಾಫಿ ಕೊಯ್ಲಿನ ಸ್ಟೇ",
      "waterfall": "ಜಲಪಾತದ ಸೌಂದರ್ಯ",
      "budget": "ಬಜೆಟ್ ವಾರಾಂತ್ಯದ ಪ್ರವಾಸಗಳು",
      "luxury": "ಲಕ್ಸುರಿ ನೇಚರ್ ರೆಸಾರ್ಟ್ಸ್",
      "explore": "ಅನ್ವೇಷಿಸಿ",
      "favorites": "ಮೆಚ್ಚಿನವುಗಳು",
      "bookings": "ಬುಕಿಂಗ್‌ಗಳು",
      "profile": "ಪ್ರೊಫೈಲ್",
      "login": "ಲಾಗಿನ್",
      "signup": "ಸೈನ್ ಅಪ್",
      "homestayOwner": "ಹೋಸ್ಟ್ ಆಗಿ",
      "bookNow": "ಈಗಲೇ ಬುಕ್ ಮಾಡಿ",
      "hiddenGems": "ಗುಪ್ತ ರತ್ನಗಳು",
      "aiAssistant": "AI ಪ್ರಯಾಣ ಸಹಾಯಕ",
      "askAi": "ನಿಮ್ಮ ಪ್ರಯಾಣದ ಬಗ್ಗೆ ಸ್ಟೇ ನೆಸ್ಟ್ AI ಅನ್ನು ಕೇಳಿ..."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
