import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ConsoleLog = { type: 'log'; message: string };
export type ConsoleError = {
  type: 'error';
  message: string;
  source: string;
  lineNumber?: number;
  colNumber?: number;
  error?: Error;
};
export type ConsoleWarn = { type: 'warn'; message: string };
export type ConsoleItem = ConsoleLog | ConsoleError | ConsoleWarn;

@Component({
  selector: 'app-console-output',
  standalone: true,
  imports: [],
  templateUrl: './console-output.component.html',
})
export class ConsoleOutputComponent {
  @Input() consoleItems: ConsoleItem[] = [];
  @Output() clearItems = new EventEmitter();

  onClear() {
    this.clearItems.emit();
  }
}
