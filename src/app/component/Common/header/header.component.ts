import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../../common/base.component';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'header-app',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule],
})
export class Header extends BaseComponent implements OnInit, OnDestroy {
  isScrolled = false;
  menuItems = [
    { label: 'Trang chủ', link: 'home' }, // Updated link to match app.routes.ts
    { label: 'Đặt phòng', link: 'order' },
    { label: 'Thương hiệu', link: 'brand' },
    { label: 'Hội viên', link: 'member' }
  ];
  activeItemLabel?: string; // Will be set based on the current route

  private routerSubscription!: Subscription;
  private queryParamSubscription!: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    // Subscribe to router events to update active menu item on navigation
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const url = event.urlAfterRedirects; // e.g., '/home', '/order?id=123'
        // Extract the base path part, e.g., 'home' from '/home' or 'order' from '/order?id=123'
        const path = url.split('?')[0].split('/')[1];
        return path || 'home'; // Default to 'home' if path is '/' or empty
      }),
      startWith(this.getCurrentRouteBase()) // Initialize with current route on load
    ).subscribe(currentRouteBase => {
      const activeMenu = this.menuItems.find(item => item.link === currentRouteBase);
      this.activeItemLabel = activeMenu ? activeMenu.label : undefined;
      // If no menu item matches (e.g. route is '/' which redirects to 'home'), set based on 'home'
      if (!this.activeItemLabel && currentRouteBase === 'home') {
        const homeMenu = this.menuItems.find(item => item.link === 'home');
        if (homeMenu) this.activeItemLabel = homeMenu.label;
      }
    });

    // Subscribe to query parameter changes
    this.queryParamSubscription = this.activatedRoute.queryParamMap.subscribe(params => {
      // Example: React to a specific query parameter if needed for header behavior
      const specialHeaderParam = params.get('header_highlight');
      if (specialHeaderParam) {
        console.log(`HeaderComponent: Detected queryParam 'header_highlight' = ${specialHeaderParam}`);
        // Add logic here if the header needs to change based on this query param
      }
    });
  }

  private getCurrentRouteBase(): string {
    const url = this.router.url;
    const path = url.split('?')[0].split('/')[1];
    return path || 'home'; // Default to 'home' if path is '/' or empty
  }

  override ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.queryParamSubscription?.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  setActiveItem(link: string) {
    const activeMenu = this.menuItems.find(x => x.link === link);
    if (activeMenu) {
      // this.activeItemLabel = activeMenu.label; // Set immediately for responsiveness
      // NavigationEnd subscription will also set this, ensuring consistency
      this.router.navigate([`/${activeMenu.link}`]);
    } else {
      console.warn(`HeaderComponent: No menu item found for link: ${link}. Navigating to /home.`);
      this.router.navigate(['/home']); // Fallback navigation
    }
  }
}
