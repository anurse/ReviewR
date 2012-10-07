declare module Knockout {
    interface Observable { }

    interface Observable {
        (newValue: any): void;
        (): any;
        subscribe: (newValue: any) => void;
    }

    interface ObservableArray extends Observable {
        (newValue: any[]): void;
        (): any[];
        subscribe: (newValue: any[]) => void;
        removeAll(): void;
        push(...values: any[]): void;
    }

    declare interface KnockoutObject {
        applyBindings(model: any, rootElement?: Element): void;
        applyBindingsToDescendants(model: any, rootElement?: Element): void;
        renderTemplate(template: string, model: any, options: Object, element: HTMLElement): void;

        observable(value: any): Observable;
        observable(): Observable;
        
        computed(calculation: () => any): Observable;

        observableArray(value: any[]): ObservableArray;
        observableArray(): ObservableArray;
        
        isWriteableObservable(obj: any): bool;
        isObservable(obj: any): bool;
    }
}

declare var ko: Knockout.KnockoutObject;