import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public static defaultValue = true;

  private sidebarStateChanged$ = new BehaviorSubject<boolean>(SidebarService.defaultValue);
  private sidebarStateObservable$ = this.sidebarStateChanged$.asObservable();

  toggle() {
    this.sidebarStateChanged$.next(!this.sidebarStateChanged$.value);
  }

  asObservable$() {
    return this.sidebarStateObservable$;
  }
}
