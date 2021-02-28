import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceEndpoints } from '../types/api-const';
import { Motd, PrevMotd } from '../types/api-output';
import { HttpRequestService } from './http-request.service';

/**
 * Handles getting of MotD.
 */
@Injectable({
  providedIn: 'root',
})
export class MotdService {
  constructor(private httpRequestService: HttpRequestService) {}

  /**
   * Gets the message of the day.
   */
  getMotd(): Observable<Motd> {
    return this.httpRequestService.get(ResourceEndpoints.MOTD);
  }

  /**
   * Gets previous message of the day.
   */
  getPrevMotd(): Observable<PrevMotd> {
    return this.httpRequestService.get(ResourceEndpoints.PREVMOTD);
  }

}
