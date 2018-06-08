export class Field {
    name: string;
    displayName: string;
    type: string = 'string';

    constructor(name: string, displayName: string, type: string) {
        this.name = name;
        if (type != null) {
            this.type = type;
        }
        if (displayName != null) {
            this.displayName = displayName;
        }
    }

    public getColumnDisplayName(): string {
        if (this.displayName == null) {
            return this.name.replace(/^[a-z]|[A-Z]/g, function (v, i) {
                return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
            });
        }
        else {
            return this.displayName;

        }
    }

    public isDateField(): boolean {
        if (this.type == 'date') {
            return true;
        } else {
            return false;
        }
    }

    public isStringField(): boolean {
        if (this.type == 'string') {
            return true;
        } else {
            return false;
        }
    }
}
