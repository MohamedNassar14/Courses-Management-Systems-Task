// src/app/core/services/translation.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageStore } from '../store/language.store';


@Injectable({ providedIn: 'root' })
export class LanguageService {
  private http = inject(HttpClient);
  private languageStore = inject(LanguageStore);

  private translations = signal<{ [key: string]: any }>({});

  currentLang = computed(() => this.languageStore.language());

  direction = computed(() => this.currentLang() === 'ar' ? 'rtl' : 'ltr');

  constructor() {
    this.loadTranslations(this.currentLang());
  }

  loadTranslations(lang: string) {
    this.http.get(`/assets/i18n/${lang}.json`).subscribe({
      next: (res) => this.translations.set(res as any),
    });
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations();
    for (let k of keys) {
      value = value?.[k];
      if (!value) return key; 
    }
    return value;
  }

  switchLanguage(lang: 'en' | 'ar') {
    this.languageStore.setLanguage(lang);
    this.loadTranslations(lang);

   
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
