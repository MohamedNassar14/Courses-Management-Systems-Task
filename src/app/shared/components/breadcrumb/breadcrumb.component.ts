import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconsComponent } from "../icons/icons.component";

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterLink, IconsComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  constructor() { }

  @Input() title: string = '';
  @Input() subTitles: any = [];

  ngOnInit(): void { }
}