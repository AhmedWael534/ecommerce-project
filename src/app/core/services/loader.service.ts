import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  public isLoading = new BehaviorSubject<boolean>(false);

  private requestCount = 0;
  private startTime: number = 0;
  private readonly minTime = 500;

  constructor() { }

  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      
      this.startTime = Date.now();
      this.isLoading.next(true);
    }
  }

  hide(): void {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    
    if (this.requestCount === 0) {
      
      const elapsed = Date.now() - this.startTime;

      if (elapsed < this.minTime) {
        
        const timeToWait = this.minTime - elapsed;
        setTimeout(() => {
          
          this.isLoading.next(false);
        }, timeToWait);
      } else {
      
        this.isLoading.next(false);
      }
    }
  }
}