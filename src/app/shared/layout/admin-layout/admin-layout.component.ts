import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { SidebarAdminComponent } from "../../component/sidebar-admin/sidebar-admin.component";
import { PopupProductAdminComponent } from "../../../features/admin/components/product/popup-product-admin/popup-product-admin.component";
import { AdminTableComponent } from "../../../features/admin/components/product/admin-table/admin-table.component";
import { Router, RouterOutlet } from '@angular/router';
import { AppCookieService } from '../../services/utils/cookie/app-cookie.service';
import { Store } from '@ngrx/store';
import { selectProfileState } from '../../../state/auth/selector/profile.selector';
import { Profile } from '../../models/Auth/Profile';
import { SignalrService } from '../../services/utils/signalr/signalr.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarAdminComponent, PopupProductAdminComponent, AdminTableComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('popup') popup!: ElementRef;

  @ViewChild('toggleButtonNotification') toggleButtonNotification!: ElementRef;
  @ViewChild('popupNotification') popupNotification!: ElementRef;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  toastrService = inject(ToastrService);
  cookie = inject(AppCookieService);
  router = inject(Router);
  store = inject(Store);

  signalRService = inject(SignalrService);

  isOpenSideBar = true;
  isOpenPopup = false;
  isOpenPopupNotification = false;

  profile$ = this.store.select(selectProfileState);
  profile: Profile = {
    username: '',
    email: '',
    role: ''
  }
  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    this.profile$.subscribe((profile) => {
      if (profile) {
        this.profile = profile;
      }
    });
    this.signalRService.startConnection();
    this.signalRService.addNotificationDataListener();

    this.signalRService.message.subscribe((message) => {
      if (!message) {
        return;
      }
      this.toastrService.success(message);
    })
  }

  @HostListener('document:click', ['$event'])
  windowClick(e: Event) {
    if (!this.popup.nativeElement.contains(e.target)) {
      this.isOpenPopup = false;
    }
    if (!this.popupNotification.nativeElement.contains(e.target)) {
      this.isOpenPopupNotification = false;
    }
  }

  togglePopup(e: Event) {
    e.stopPropagation();
    this.isOpenPopup = !this.isOpenPopup;
  }


  togglePopupNotifiction(e: Event) {
    e.stopPropagation();
    this.isOpenPopupNotification = !this.isOpenPopupNotification;
  }

  logout() {
    this.cookie.remove('token');
    this.router.navigateByUrl('/login');
  }

}

