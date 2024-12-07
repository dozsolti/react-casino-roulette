export function calculateFontSize(value: string, chipSize: number) {
    /*
        When chipSize: 64px, the font-size: 25px, 20px or 17px based on the length of the text.
    */
    // Using this formula we can estimate a size based on the label's length.
    const x = Math.log(value.length) + 2.5;

    // Font size should be relative to the chip's size.
    return Math.floor(chipSize / x);
}