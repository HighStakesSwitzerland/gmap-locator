import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, ReplaySubject, tap} from "rxjs";
import {Chains} from "../../domain/model/chains";

@Injectable({
  providedIn: "root"
})
export class PeerService {

  private readonly internalPeers$ = new ReplaySubject<Chains>();

  constructor(private readonly httpClient: HttpClient) {
  }

  public getAllChains(): Observable<Chains> {
    return this.internalPeers$.asObservable();
  }

  public initGetAllPeers(): Observable<Chains> {
    return this.httpClient.get<Chains>("/api/peers").pipe(
      tap(p => this.internalPeers$.next(p))
    );
  }

}
