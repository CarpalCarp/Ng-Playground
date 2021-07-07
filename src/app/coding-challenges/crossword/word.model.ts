export class Word {
    private _valueLength: number;
    constructor(private _value: string) {
        this._valueLength = _value.length;
    }

    get value() {
        return this._value;
    }

    get valueLength() {
        return this._valueLength;
    }
}