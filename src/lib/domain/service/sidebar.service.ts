import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {DeviceDetectorService} from "ngx-device-detector";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private static defaultValue = true;
  private sidebarStateChanged$ = new BehaviorSubject<boolean>(SidebarService.defaultValue);
  private sidebarStateObservable$ = this.sidebarStateChanged$.asObservable();

  constructor(private readonly _deviceService: DeviceDetectorService) {
    SidebarService.defaultValue = !this._deviceService.isMobile()
  }

  toggle() {
    this.sidebarStateChanged$.next(!this.sidebarStateChanged$.value);
  }

  toDefaultState() {
    if (this.sidebarStateChanged$.value !== SidebarService.defaultValue) {
      this.sidebarStateChanged$.next(SidebarService.defaultValue);
    }
  }

  asObservable$() {
    return this.sidebarStateObservable$;
  }

  static getDefaultValue() {
    return this.defaultValue;
  }
}
