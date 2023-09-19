export class StoredData {
    name: string;
    extra: string;
    count: number;
    details?: string[];
    constructor(name: string, extra: string, count: number, details?: string[]) {
        this.name = name;
        this.extra = extra;
        this.count = count;
        this.details = details;
    }
}
