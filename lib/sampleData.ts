import { CardSet } from '@/types';

export const sampleSet: CardSet = {
  id: 'sample-greetings',
  name: 'Greetings & Basics',
  description: 'Essential Korean phrases to get started',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  cards: [
    { id: '1', korean: '안녕하세요', english: 'Hello (formal)', romanization: 'annyeonghaseyo', confidence: 'unrated', createdAt: Date.now() },
    { id: '2', korean: '감사합니다', english: 'Thank you', romanization: 'gamsahamnida', confidence: 'unrated', createdAt: Date.now() },
    { id: '3', korean: '죄송합니다', english: 'I am sorry', romanization: 'joesonghamnida', confidence: 'unrated', createdAt: Date.now() },
    { id: '4', korean: '네', english: 'Yes', romanization: 'ne', confidence: 'unrated', createdAt: Date.now() },
    { id: '5', korean: '아니요', english: 'No', romanization: 'aniyo', confidence: 'unrated', createdAt: Date.now() },
    { id: '6', korean: '괜찮아요', english: 'It\'s okay / Are you okay?', romanization: 'gwaenchanayo', confidence: 'unrated', createdAt: Date.now() },
    { id: '7', korean: '잠깐만요', english: 'Wait a moment', romanization: 'jamkkanmanyo', confidence: 'unrated', createdAt: Date.now() },
    { id: '8', korean: '이름이 뭐예요?', english: 'What is your name?', romanization: 'ireumi mwoyeyo?', confidence: 'unrated', createdAt: Date.now() },
    { id: '9', korean: '물', english: 'Water', romanization: 'mul', confidence: 'unrated', createdAt: Date.now() },
    { id: '10', korean: '밥', english: 'Rice / Meal', romanization: 'bap', confidence: 'unrated', createdAt: Date.now() },
    { id: '11', korean: '하나', english: 'One', romanization: 'hana', confidence: 'unrated', createdAt: Date.now() },
    { id: '12', korean: '둘', english: 'Two', romanization: 'dul', confidence: 'unrated', createdAt: Date.now() },
    { id: '13', korean: '셋', english: 'Three', romanization: 'set', confidence: 'unrated', createdAt: Date.now() },
    { id: '14', korean: '좋아요', english: 'Good / I like it', romanization: 'johayo', confidence: 'unrated', createdAt: Date.now() },
    { id: '15', korean: '안녕히 가세요', english: 'Goodbye (to someone leaving)', romanization: 'annyeonghi gaseyo', confidence: 'unrated', createdAt: Date.now() },
  ],
};
