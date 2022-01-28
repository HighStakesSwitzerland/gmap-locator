import {Component, OnDestroy} from "@angular/core";
import {Subject, switchMap, takeUntil, timer} from "rxjs";
import {PeerService} from "../lib/infra/peer-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  private _destroy$ = new Subject();

  constructor(private readonly _peerService: PeerService) {
    timer(0, 5000)
      .pipe(
        switchMap(() => this._peerService.initGetAllPeers()),
        takeUntil(this._destroy$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }

}
