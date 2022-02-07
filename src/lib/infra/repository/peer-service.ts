import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, shareReplay, tap} from "rxjs";
import {Chains} from "../../domain/model/chains";

@Injectable({
  providedIn: "root"
})
export class PeerService {

  private readonly internalPeers$ = new BehaviorSubject<Chains>(undefined!);

  constructor(private readonly httpClient: HttpClient) {
  }

  public getAllPeers(): Observable<Chains> {
    return this.internalPeers$.pipe(shareReplay(1));
  }

  public initGetAllPeers(): Observable<Chains> {
    return this.httpClient.get<Chains>("/api/peers").pipe(
      tap(p => this.internalPeers$.next(p))
    );
  }

}
