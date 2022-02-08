import {Component, HostBinding, OnDestroy, OnInit} from "@angular/core";
import {SidebarService} from "../lib/domain/service/sidebar.service";
import {ActivationEnd, Router} from "@angular/router";
import {filter, Subject, takeUntil} from "rxjs";
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {

  @HostBinding('class')
  public className = '';

  public sidebarOpened: boolean = SidebarService.defaultValue;

  private readonly _destroy$ = new Subject();
  private readonly darkClassName = 'darkMode';


  constructor(private readonly _sidebarService: SidebarService,
              private readonly _router: Router,
              private readonly overlay: OverlayContainer) {
  }

  ngOnInit(): void {
    this._sidebarService.asObservable$().subscribe((value) => {
      this.sidebarOpened = value;
    });

    this._router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      takeUntil(this._destroy$)
    ).subscribe(() => this.sidebarOpened = SidebarService.defaultValue);

  }

  public onDarkModeSwitch(event: boolean) {
    this.className = event ? this.darkClassName : '';
    if (event) {
      this.overlay.getContainerElement().classList.add(this.darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(this.darkClassName);
    }

  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }
}
