import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, switchMap, takeUntil, timer} from "rxjs";
import {Chains} from "../../lib/domain/model/chains";
import {PeerService} from "../../lib/infra/repository/peer-service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  chains$: Observable<Chains>

  private _destroy$ = new Subject();

  constructor(private readonly _peerService: PeerService) {
    timer(0, 5000)
      .pipe(
        switchMap(() => this._peerService.initGetAllPeers()),
        takeUntil(this._destroy$)
      ).subscribe(() => {
    });
  }

  ngOnInit(): void {
    this.chains$ = this._peerService.getAllPeers();
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }

}
