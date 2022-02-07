import {Component, OnDestroy, OnInit} from "@angular/core";
import {SidebarService} from "../lib/domain/service/sidebar.service";
import {ActivationEnd, Router} from "@angular/router";
import {filter, Subject, takeUntil} from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {

  sidebarOpened: boolean = SidebarService.defaultValue;

  private readonly _destroy$ = new Subject();

  constructor(private readonly _sidebarService: SidebarService,
              private readonly _router: Router) {
  }

  ngOnInit(): void {
    this._sidebarService.asObservable$().subscribe((value) => {
      this.sidebarOpened = value;
    });
    this._router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      takeUntil(this._destroy$)
    ).subscribe(() => this.sidebarOpened = SidebarService.defaultValue)
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }
}
