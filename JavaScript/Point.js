export class Point {

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    show() {
        return `(${this._x}, ${this._y})`;
    }

    equals(p) {
        return p._x == this.x && p._y == this._y;
    }

    // Getter for x
    get x() {
        return this._x;
    }

    // Getter for y
    get y() {
        return this._y;
    }
}