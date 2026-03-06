// src/app/store/language/language.store.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageStore {
  language = signal(localStorage.getItem('language') || 'en');

  setLanguage(lang: 'en' | 'ar') {
    localStorage.setItem('language', lang);
    this.language.set(lang);
  }
}