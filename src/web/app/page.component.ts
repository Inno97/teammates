import { Location } from '@angular/common';
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import uaParser from 'ua-parser-js';
import { environment } from '../environments/environment';
import { MotdService } from '../services/motd.service';
import { StatusMessageService } from '../services/status-message.service';
import { Motd } from '../types/api-output';
import { Toast } from './components/toast/toast';

const DEFAULT_TITLE: string = 'TEAMMATES - Online Peer Feedback/Evaluation System for Student Team Projects';

/**
 * Base skeleton for all pages.
 */
@Component({
  selector: 'tm-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {

  @Input() isFetchingAuthDetails: boolean = false;
  @Input() studentLoginUrl: string = '';
  @Input() instructorLoginUrl: string = '';
  @Input() user: string = '';
  @Input() isStudent: boolean = false;
  @Input() isInstructor: boolean = false;
  @Input() isAdmin: boolean = false;
  @Input() isValidUser: boolean = false;
  @Input() pageTitle: string = '';
  @Input() hideAuthInfo: boolean = false;
  @Input() navItems: any[] = [];
  @Input() institute: string = '';
  @Input() motdString: string = '';
  @Input() motdHtml: string = '';

  isCollapsed: boolean = true;
  isUnsupportedBrowser: boolean = false;
  isCookieDisabled: boolean = false;
  browser: string = '';
  isNetworkOnline$: Observable<boolean>;
  version: string = environment.version;
  logoutUrl: string = `${environment.backendUrl}/logout`;
  toast: Toast | null = null;

  /**
   * Minimum versions of browsers supported.
   *
   * Angular browser support: https://angular.io/guide/browser-support
   *
   * Bootstrap 4 browser support: https://getbootstrap.com/docs/4.0/getting-started/browsers-devices/
   */
  minimumVersions: Record<string, number> = {
    Chrome: 45,
    IE: 10,
    Firefox: 40,
    Safari: 7,
    Edge: 44,
  };

  constructor(private router: Router, private route: ActivatedRoute, private title: Title,
              private ngbModal: NgbModal, location: Location,
              private statusMessageService: StatusMessageService, private motdService: MotdService) {
    this.checkBrowserVersion();
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0); // reset viewport
        this.toast = null; // reset toast
        let r: ActivatedRoute = this.route;
        while (r.firstChild) {
          r = r.firstChild;
        }
        r.data.subscribe((resp: any) => {
          this.pageTitle = resp.pageTitle;
          this.title.setTitle(resp.htmlTitle || DEFAULT_TITLE);
        });
      }
    });
    if (environment.frontendUrl) {
      this.logoutUrl += `?frontendUrl=${environment.frontendUrl}`;
    }

    this.isNetworkOnline$ = merge(
        of(navigator.onLine),
        fromEvent(window, 'online').pipe(mapTo(true)),
        fromEvent(window, 'offline').pipe(mapTo(false)),
    );

    // Close open modal(s) when moving backward or forward through history in the browser page
    location.subscribe(() => {
      if (this.ngbModal.hasOpenModals()) {
        this.ngbModal.dismissAll();
      }
    });

    this.statusMessageService.getToastEvent().subscribe((toast: Toast) => {
      this.toast = toast;
    });    
    
    this.motdService.getMotd().subscribe((res: Motd) => {
      if (res.motd) {
        this.setMotd(res.motd, res.date);
      }
    });
  }

  // motd
  isMotdRead: boolean = (localStorage.getItem('isMotdRead') !== null && localStorage.getItem('isMotdRead') === 'true' ? true : false);
  date: string = "";

  private setMotd(motd: string, date: string): void {
    if (!this.isMotdRead || motd == "") {
      this.motdString = motd;
      this.date = date;
      this.motdHtml = 
        "<h1>Message of the Day</h1>" + 
        "<p>" + this.motdString + "</p>" + 
        "<p>" + this.date + "</p>";
    } else {
      this.motdHtml = "";
    }
  }

  hideMotd() {
    document.getElementById('motd')!.style.visibility='hidden';
    document.getElementById('motd')!.style.height='0px';
    localStorage.setItem('isMotdRead', 'true');
    console.log(localStorage.getItem('isMotdRead'));
  }

  private checkBrowserVersion(): void {
    const browser: any = uaParser(navigator.userAgent).browser;
    this.browser = `${browser.name} ${browser.version}`;
    this.isUnsupportedBrowser = !this.minimumVersions[browser.name]
        || this.minimumVersions[browser.name] > parseInt(browser.major, 10);
    this.isCookieDisabled = !navigator.cookieEnabled;
  }

  /**
   * Method to toggle the isCollapsed property when an item on the navbar is clicked,
   * when the user is using a mobile device.
   */
  toggleCollapse(): void {

    // Check if the device is a mobile device
    if (window.innerWidth < 992) {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  /**
   * Method that checks if current page has active modals and close them.
   */
  closeModal(): void {

    if (this.ngbModal.hasOpenModals()) {
      this.ngbModal.dismissAll();
    }
  }
}

/**
 * Directive to emit an event if a click occurred outside the element.
 */
@Directive({ selector: '[tmClickOutside]' })
export class ClickOutsideDirective {
  @Output() tmClickOutside: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}

  /**
   * Method to execute when any part of the document is clicked.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement: HTMLElement = event.target as HTMLElement;

    // Check if the click was outside the element
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.tmClickOutside.emit(event);
    }
  }
}
