import { CardSet } from '@/types';

export const koreanDefaultSet: CardSet = {
  id: 'default-korean-basics',
  name: '🇰🇷 Korean Basics',
  description: 'Essential Korean words to get started',
  language: 'korean',
  createdAt: 1000000000000,
  updatedAt: 1000000000000,
  cards: [
    { id: 'k1',  korean: '안녕하세요',      english: 'Hello (formal)',               romanization: 'annyeonghaseyo',    confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k2',  korean: '감사합니다',      english: 'Thank you',                    romanization: 'gamsahamnida',      confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k3',  korean: '죄송합니다',      english: 'I am sorry',                   romanization: 'joesonghamnida',    confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k4',  korean: '네',              english: 'Yes',                          romanization: 'ne',                confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k5',  korean: '아니요',          english: 'No',                           romanization: 'aniyo',             confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k6',  korean: '괜찮아요',        english: 'It\'s okay / Are you okay?',   romanization: 'gwaenchanayo',      confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k7',  korean: '이름이 뭐예요?',  english: 'What is your name?',           romanization: 'ireumi mwoyeyo',    confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k8',  korean: '안녕히 가세요',   english: 'Goodbye (to someone leaving)', romanization: 'annyeonghi gaseyo', confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k9',  korean: '물',              english: 'Water',                        romanization: 'mul',               confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k10', korean: '밥',              english: 'Rice / Meal',                  romanization: 'bap',               confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k11', korean: '하나',            english: 'One',                          romanization: 'hana',              confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k12', korean: '둘',              english: 'Two',                          romanization: 'dul',               confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k13', korean: '셋',              english: 'Three',                        romanization: 'set',               confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k14', korean: '좋아요',          english: 'Good / I like it',             romanization: 'johayo',            confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k15', korean: '학교',            english: 'School',                       romanization: 'hakgyo',            confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k16', korean: '친구',            english: 'Friend',                       romanization: 'chingu',            confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k17', korean: '선생님',          english: 'Teacher',                      romanization: 'seonsaengnim',      confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k18', korean: '사랑해요',        english: 'I love you',                   romanization: 'saranghaeyo',       confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k19', korean: '맛있어요',        english: 'It is delicious',              romanization: 'massisseoyo',       confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'k20', korean: '화장실이 어디예요?', english: 'Where is the bathroom?',    romanization: 'hwajangsiri eodiyeyo', confidence: 'unrated', createdAt: 1000000000000 },
  ],
};

export const chineseDefaultSet: CardSet = {
  id: 'default-chinese-basics',
  name: '🇨🇳 Chinese Basics',
  description: 'Essential Chinese words to get started',
  language: 'chinese',
  createdAt: 1000000000000,
  updatedAt: 1000000000000,
  cards: [
    { id: 'c1',  korean: '你好',       english: 'Hello',                    romanization: 'nǐ hǎo',          confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c2',  korean: '谢谢',       english: 'Thank you',                romanization: 'xiè xie',          confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c3',  korean: '对不起',     english: 'I am sorry',               romanization: 'duì bu qǐ',        confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c4',  korean: '是',         english: 'Yes / It is',              romanization: 'shì',              confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c5',  korean: '不是',       english: 'No / It is not',           romanization: 'bù shì',           confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c6',  korean: '没关系',     english: 'It\'s okay / Never mind',  romanization: 'méi guān xi',      confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c7',  korean: '你叫什么名字?', english: 'What is your name?',    romanization: 'nǐ jiào shénme míngzi', confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c8',  korean: '再见',       english: 'Goodbye',                  romanization: 'zài jiàn',         confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c9',  korean: '水',         english: 'Water',                    romanization: 'shuǐ',             confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c10', korean: '米饭',       english: 'Rice',                     romanization: 'mǐ fàn',           confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c11', korean: '一',         english: 'One',                      romanization: 'yī',               confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c12', korean: '二',         english: 'Two',                      romanization: 'èr',               confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c13', korean: '三',         english: 'Three',                    romanization: 'sān',              confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c14', korean: '好',         english: 'Good / Okay',              romanization: 'hǎo',              confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c15', korean: '学校',       english: 'School',                   romanization: 'xué xiào',         confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c16', korean: '朋友',       english: 'Friend',                   romanization: 'péng yǒu',         confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c17', korean: '老师',       english: 'Teacher',                  romanization: 'lǎo shī',          confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c18', korean: '我爱你',     english: 'I love you',               romanization: 'wǒ ài nǐ',         confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c19', korean: '好吃',       english: 'Delicious',                romanization: 'hǎo chī',          confidence: 'unrated', createdAt: 1000000000000 },
    { id: 'c20', korean: '厕所在哪里?', english: 'Where is the bathroom?',  romanization: 'cèsuǒ zài nǎlǐ',  confidence: 'unrated', createdAt: 1000000000000 },
  ],
};

// Legacy export for local (non-logged-in) users
export const sampleSet = koreanDefaultSet;

export const defaultSets: CardSet[] = [koreanDefaultSet, chineseDefaultSet];
