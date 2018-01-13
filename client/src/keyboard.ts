export class Key {
    code: number;
    isDown: boolean;
    isUp: boolean;
    press: () => void;
    release: () => void;
    downHandler: (event: KeyboardEvent) => void;
    upHandler: (event: KeyboardEvent) => void;
}

export function keyCode(keyChar: string) {
    return Number(keyChar.charCodeAt(0));
}
export function key(keyCode: number) {
    let key = new Key();
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}