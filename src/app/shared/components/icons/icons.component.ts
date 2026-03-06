import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS } from '../../icons/icons';

@Component({
  selector: 'app-icons',
  imports: [],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})
export class IconsComponent {
  constructor(private sanitizer: DomSanitizer) { }

  @Input() iconKey!: string;
  iconSVG: SafeHtml = '';

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['iconKey']) {
      const rawSvg = ICONS[this.iconKey] || '';
      this.iconSVG = this.sanitizer.bypassSecurityTrustHtml(rawSvg);
    }
  }
}
