
"use client";

import { useState, useEffect, useMemo, useCallback } from 'react'; // Added useCallback
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GameCard } from '@/components/GameCard';
import { ArrowLeft, Gamepad2, Utensils, Scale, Brain } from 'lucide-react'; // Added Brain

const translations = {
  'zh-CN': {
    backButton: '返回主页',
    pageTitle: '休闲驿站',
    pageDescription: '选择一项活动来放松一下。',
    gameStationButton: '小游戏驿站',
    foodFinderButton: '去哪吃',
    legalInfoButton: '法律普及',
    personalityTestButton: '人格测试', // New translation
    gameStationAriaLabel: '进入小游戏驿站',
    foodFinderAriaLabel: '进入去哪吃模块',
    legalInfoAriaLabel: '进入法律普及模块',
    personalityTestAriaLabel: '进入人格测试模块', // New translation
  },
  'en': {
    backButton: 'Back to Home',
    pageTitle: 'Rest Stop',
    pageDescription: 'Choose an activity to relax.',
    gameStationButton: 'Mini Game Station',
    foodFinderButton: 'Where to Eat',
    legalInfoButton: 'Legal Info',
    personalityTestButton: 'Personality Test', // New translation
    gameStationAriaLabel: 'Enter Mini Game Station',
    foodFinderAriaLabel: 'Enter Where to Eat module',
    legalInfoAriaLabel: 'Enter Legal Info module',
    personalityTestAriaLabel: 'Enter Personality Test module', // New translation
  }
};

type LanguageKey = keyof typeof translations;

export default function RestHubPage() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>('zh-CN');
  const router = useRouter();

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const browserLang: LanguageKey = navigator.language.toLowerCase().startsWith('en') ? 'en' : 'zh-CN';
      setCurrentLanguage(browserLang);
    }
  }, []);

  const t = useMemo(() => translations[currentLanguage], [currentLanguage]);

  const handleGameStationClick = useCallback(() => router.push('/rest/games'), [router]);
  const handleFoodFinderClick = useCallback(() => router.push('/food-finder'), [router]);
  const handleLegalInfoClick = useCallback(() => router.push('/legal-info'), [router]);
  const handlePersonalityTestClick = useCallback(() => router.push('/personality-test'), [router]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground py-10 sm:py-16 px-4 items-center">
      <header className="w-full max-w-xl mb-8 sm:mb-12 self-center">
        <Link href="/" passHref>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backButton}
          </Button>
        </Link>
      </header>

      <main className="w-full max-w-lg flex flex-col items-center text-center flex-grow">
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-4">
          {t.pageTitle}
        </h1>
        <p className="text-muted-foreground mb-10 text-base sm:text-lg max-w-xs sm:max-w-sm">
            {t.pageDescription}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
          <GameCard 
            title={t.gameStationButton} 
            icon={Gamepad2} 
            onClick={handleGameStationClick} 
            ariaLabel={t.gameStationAriaLabel}
          />
          <GameCard 
            title={t.foodFinderButton} 
            icon={Utensils} 
            onClick={handleFoodFinderClick} 
            ariaLabel={t.foodFinderAriaLabel}
          />
          <GameCard 
            title={t.legalInfoButton} 
            icon={Scale} 
            onClick={handleLegalInfoClick} 
            ariaLabel={t.legalInfoAriaLabel}
          />
          <GameCard 
            title={t.personalityTestButton} 
            icon={Brain} // Using Brain icon
            onClick={handlePersonalityTestClick} 
            ariaLabel={t.personalityTestAriaLabel}
          />
        </div>
      </main>
    </div>
  );
}
