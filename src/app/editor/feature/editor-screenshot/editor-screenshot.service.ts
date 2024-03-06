import { ElementRef, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class EditorScreenshotService {
  iframeElement?: ElementRef;
  constructor() {}

  async getScreenShot() {
    if (!this.iframeElement) {
      throw new Error('iframe element is not defined');
    }
    const element = this.iframeElement?.nativeElement as HTMLIFrameElement;
    if (!element.contentWindow) {
      throw new Error(
        "iframe element's contentWindow property is null or undefined"
      );
    }

    const messageId = uuidv4();
    element.contentWindow.postMessage(
      JSON.stringify({ type: 'sendScreenshot', id: messageId }),
      '*'
    );

    return new Promise((resolve) => {
      const onMessage = (e: MessageEvent) => {
        const { data } = e;
        if (data.type === 'screenshotResult' && data.id === messageId) {
          window.removeEventListener('message', onMessage);
          resolve(data.dataUrl);
        }
      };
      window.addEventListener('message', onMessage);
    });
  }
}
