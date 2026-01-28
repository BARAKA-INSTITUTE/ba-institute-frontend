import i18n from '../i18n';
import './LanguageSwitcher.css'; // Add CSS file

const LanguageSwitcher = () => {

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage('en')}
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
        aria-label="Switch to English"
      >
        🇺🇸 EN
      </button>
      <span className="separator">|</span>
      <button
        onClick={() => changeLanguage('fr')}
        className={`lang-btn ${i18n.language === 'fr' ? 'active' : ''}`}
        aria-label="Switch to French"
      >
        🇫🇷 FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;