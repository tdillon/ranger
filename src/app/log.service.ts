import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { LogEntry } from "./log-entry";

export type Severity = 'info' | 'warn' | 'error';
export type LogMessage = { message: string, severity: Severity, time: Date }

@Injectable()
export class LogService {

  logs: ReplaySubject<LogMessage>;
  observable: Observable<LogMessage>;

  constructor() {
    this.logs = new ReplaySubject(100);
    this.observable = this.logs.asObservable();
    this.add('LogService constructor');
  }

  add(message: string, severity: Severity = 'info') {
    this.logs.next({ message, severity, time: new Date() });
  }

  info(message: string) {
    this.add(message, 'info')
  }

  warn(message: string) {
    this.add(message, 'warn')
  }

  error(message: string) {
    this.add(message, 'error')
  }

  getLog() {
    return this.observable;
  }

}
