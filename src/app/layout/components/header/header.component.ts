import { Component, inject } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  imports: [OverlayPanelModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private langService = inject(LanguageService);

  currentLang = this.langService.currentLang;

  switchTo(lang: 'en' | 'ar') {
    this.langService.switchLanguage(lang);
  }
}
