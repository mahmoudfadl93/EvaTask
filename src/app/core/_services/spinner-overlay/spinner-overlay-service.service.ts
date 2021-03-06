import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ProgressSpinnersComponent } from '@core/components/progress-spinners/progress-spinners.component';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';

@Injectable()
export class SpinnerOverlayServiceService {

  private overlayRef: OverlayRef = undefined!;

  constructor(private readonly overlay: Overlay) { }

  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());

  private show(): void {

    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(ProgressSpinnersComponent));
    });
  }

  private hide(): void {

    this.overlayRef.detach();
    this.overlayRef = undefined!;
  }
}
