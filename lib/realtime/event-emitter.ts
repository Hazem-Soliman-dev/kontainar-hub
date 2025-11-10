type Listener<T> = (payload: T) => void;

export class EventEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<keyof Events, Set<Listener<Events[keyof Events]>>>();

  on<E extends keyof Events>(event: E, listener: Listener<Events[E]>) {
    const existing = this.listeners.get(event) ?? new Set();
    existing.add(listener as Listener<Events[keyof Events]>);
    this.listeners.set(event, existing);
    return () => this.off(event, listener);
  }

  off<E extends keyof Events>(event: E, listener: Listener<Events[E]>) {
    const existing = this.listeners.get(event);
    if (!existing) return;
    existing.delete(listener as Listener<Events[keyof Events]>);
    if (existing.size === 0) {
      this.listeners.delete(event);
    } else {
      this.listeners.set(event, existing);
    }
  }

  emit<E extends keyof Events>(event: E, payload: Events[E]) {
    const existing = this.listeners.get(event);
    if (!existing) return;
    for (const listener of existing) {
      listener(payload);
    }
  }

  once<E extends keyof Events>(event: E, listener: Listener<Events[E]>) {
    const unsubscribe = this.on(event, (payload) => {
      unsubscribe();
      listener(payload);
    });
    return unsubscribe;
  }

  clear() {
    this.listeners.clear();
  }
}

export function createEventEmitter<Events extends Record<string, unknown>>() {
  return new EventEmitter<Events>();
}


