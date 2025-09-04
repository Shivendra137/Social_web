import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.compose': 'Report Issue',
    'nav.profile': 'Profile',
    'nav.myReports': 'My Reports',
    'nav.municipalityInfo': 'Municipality Info',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // General
    'app.title': 'Prathmikta',
    'app.subtitle': 'Connecting Citizens with Municipal Corporations',
    'app.digitalIndia': 'Digital India Initiative',
    'lang.switch': 'हिन्दी',
    
    // Homepage
    'home.title': 'Civic Issues Feed',
    'home.subtitle': 'Community Reports & Updates',
    'home.upvote': 'Upvote',
    'home.comment': 'Comment',
    'home.share': 'Share',
    'home.status.pending': 'Pending',
    'home.status.working': 'In Progress',
    'home.status.solved': 'Resolved',
    
    // Compose
    'compose.title': 'Report Civic Issue',
    'compose.subtitle': 'Help improve your community',
    'compose.titleField': 'Issue Title',
    'compose.descField': 'Detailed Description',
    'compose.titlePlaceholder': 'Enter a clear title for the issue',
    'compose.descPlaceholder': 'Describe the issue in detail...',
    'compose.addImages': 'Add Images',
    'compose.submit': 'Submit Report',
    'compose.submitting': 'Submitting...',
    
    // Profile
    'profile.title': 'User Profile',
    'profile.info': 'Profile Information',
    'profile.settings': 'Settings',
    'profile.about': 'About Prathmikta',
    
    // My Reports
    'myReports.title': 'My Reports',
    'myReports.subtitle': 'Track your submitted issues',
    'myReports.edit': 'Edit',
    'myReports.delete': 'Delete',
    'myReports.lastUpdated': 'Last Updated',
    
    // Municipal Dashboard
    'municipal.title': 'Municipal Dashboard',
    'municipal.subtitle': 'Manage Civic Issues',
    'municipal.statistics': 'Statistics',
    'municipal.totalIssues': 'Total Issues',
    'municipal.pendingIssues': 'Pending',
    'municipal.inProgress': 'In Progress',
    'municipal.resolvedIssues': 'Resolved',
    'municipal.updateStatus': 'Update Status',
    'municipal.markPending': 'Mark as Pending',
    'municipal.markWorking': 'Mark as Working',
    'municipal.markSolved': 'Mark as Solved',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.submit': 'Submit',
    'common.close': 'Close',
    'common.government': 'Government of India',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.compose': 'समस्या रिपोर्ट करें',
    'nav.profile': 'प्रोफाइल',
    'nav.myReports': 'मेरी रिपोर्ट',
    'nav.municipalityInfo': 'नगर निगम जानकारी',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.logout': 'लॉगआउट',
    
    // General
    'app.title': 'प्राथमिकता',
    'app.subtitle': 'नागरिकों को नगर निगम से जोड़ना',
    'app.digitalIndia': 'डिजिटल इंडिया पहल',
    'lang.switch': 'English',
    
    // Homepage
    'home.title': 'नागरिक समस्या फीड',
    'home.subtitle': 'समुदायिक रिपोर्ट और अपडेट',
    'home.upvote': 'समर्थन',
    'home.comment': 'टिप्पणी',
    'home.share': 'साझा करें',
    'home.status.pending': 'लंबित',
    'home.status.working': 'प्रगति में',
    'home.status.solved': 'हल हो गया',
    
    // Compose
    'compose.title': 'नागरिक समस्या रिपोर्ट करें',
    'compose.subtitle': 'अपने समुदाय को बेहतर बनाने में मदद करें',
    'compose.titleField': 'समस्या शीर्षक',
    'compose.descField': 'विस्तृत विवरण',
    'compose.titlePlaceholder': 'समस्या के लिए स्पष्ट शीर्षक दर्ज करें',
    'compose.descPlaceholder': 'समस्या का विस्तार से वर्णन करें...',
    'compose.addImages': 'तस्वीरें जोड़ें',
    'compose.submit': 'रिपोर्ट सबमिट करें',
    'compose.submitting': 'सबमिट कर रहे हैं...',
    
    // Profile
    'profile.title': 'उपयोगकर्ता प्रोफाइल',
    'profile.info': 'प्रोफाइल जानकारी',
    'profile.settings': 'सेटिंग्स',
    'profile.about': 'प्राथमिकता के बारे में',
    
    // My Reports
    'myReports.title': 'मेरी रिपोर्ट',
    'myReports.subtitle': 'अपनी सबमिट की गई समस्याओं को ट्रैक करें',
    'myReports.edit': 'संपादित करें',
    'myReports.delete': 'हटाएं',
    'myReports.lastUpdated': 'अंतिम अपडेट',
    
    // Municipal Dashboard
    'municipal.title': 'नगरपालिका डैशबोर्ड',
    'municipal.subtitle': 'नागरिक समस्याओं का प्रबंधन',
    'municipal.statistics': 'आंकड़े',
    'municipal.totalIssues': 'कुल समस्याएं',
    'municipal.pendingIssues': 'लंबित',
    'municipal.inProgress': 'प्रगति में',
    'municipal.resolvedIssues': 'हल हो गया',
    'municipal.updateStatus': 'स्थिति अपडेट करें',
    'municipal.markPending': 'लंबित के रूप में चिह्नित करें',
    'municipal.markWorking': 'कार्यरत के रूप में चिह्नित करें',
    'municipal.markSolved': 'हल के रूप में चिह्नित करें',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.submit': 'सबमिट करें',
    'common.close': 'बंद करें',
    'common.government': 'भारत सरकार',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}