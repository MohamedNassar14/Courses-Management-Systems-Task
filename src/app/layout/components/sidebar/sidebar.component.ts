import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { LanguageService } from '../../../core/services/language.service';
import { IconsComponent } from "../../../shared/components/icons/icons.component";


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, IconsComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  t = inject(LanguageService);

}
