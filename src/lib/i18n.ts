export const translations = {
  en: {
    nav: {
      courses: 'Courses',
      careers: 'Careers',
      myProgress: 'My Progress',
      getPro: 'Get Pro',
      myProfile: 'My Profile',
      myAccount: 'My Account',
      settings: 'Settings',
      signIn: 'Sign In',
      signInSignUp: 'Sign In / Sign Up',
    },
    hero: {
      tagBadge: 'Center for Sustainability & Inclusive Development',
      title: 'Empowering Action for a Sustainable and Inclusive Future.',
      description:
        'CSID delivers structured, research-backed courses on climate mitigation, adaptation, resilience, and recovery — empowering learners and professionals to drive meaningful change.',
      startLearning: 'Start Learning Today',
      watchDemo: 'Watch Demo',
      learnersEnrolled: 'active learners',
      researchModules: 'research modules',
      certificate: 'certificate',
    },
    stats: {
      activeLearners: 'Active Learners',
      researchModules: 'Research Modules',
      globalExperts: 'Global Experts',
      certificationsIssued: 'Certifications Issued',
    },
    footer: {
      tagline: 'Empowering action for a sustainable and inclusive future.',
      connectSocial: 'Connect with us on social media to stay updated!',
      company: 'Company',
      support: 'Support',
      aboutUs: 'About Us',
      careers: 'Careers',
      contactUs: 'Contact Us',
      faq: 'FAQ',
      copyright:
        '© 2026 CSID — Center for Sustainability & Inclusive Development. All rights reserved.',
    },
  },
  hi: {
    nav: {
      courses: 'पाठ्यक्रम',
      careers: 'करियर',
      myProgress: 'मेरी प्रगति',
      getPro: 'प्रो पाएं',
      myProfile: 'मेरी प्रोफ़ाइल',
      myAccount: 'मेरा खाता',
      settings: 'सेटिंग्स',
      signIn: 'साइन इन',
      signInSignUp: 'साइन इन / साइन अप',
    },
    hero: {
      tagBadge: 'स्थिरता और समावेशी विकास केंद्र',
      title: 'संवर्धनीय और समावेशी भविष्य के लिए कार्रवाई को सशक्त बनाना।',
      description:
        'CSID जलवायु शमन, अनुकूलन, लचीलापन और पुनर्प्राप्ति पर संरचित, अनुसंधान-समर्थित पाठ्यक्रम प्रदान करता है।',
      startLearning: 'आज सीखना शुरू करें',
      watchDemo: 'डेमो देखें',
      learnersEnrolled: 'सक्रिय शिक्षार्थी',
      researchModules: 'शोध मॉड्यूल',
      certificate: 'प्रमाणपत्र',
    },
    stats: {
      activeLearners: 'सक्रिय शिक्षार्थी',
      researchModules: 'शोध मॉड्यूल',
      globalExperts: 'वैश्विक विशेषज्ञ',
      certificationsIssued: 'जारी प्रमाणपत्र',
    },
    footer: {
      tagline: 'संवर्धनीय और समावेशी भविष्य के लिए कार्रवाई को सशक्त बनाना।',
      connectSocial: 'अपडेट रहने के लिए हमें सोशल मीडिया पर फॉलो करें!',
      company: 'कंपनी',
      support: 'सहायता',
      aboutUs: 'हमारे बारे में',
      careers: 'करियर',
      contactUs: 'संपर्क करें',
      faq: 'सामान्य प्रश्न',
      copyright: '© 2026 CSID — स्थिरता और समावेशी विकास केंद्र। सर्वाधिकार सुरक्षित।',
    },
  },
} as const;

export type Language = 'en' | 'hi';
export type Translations = typeof translations.en;

export function getTranslations(lang: Language): Translations {
  return (translations[lang] ?? translations.en) as Translations;
}

export const SUPPORTED_LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
];
