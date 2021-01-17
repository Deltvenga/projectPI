export default class BuyMark {
    constructor(markLocation, markType, markValue) {
        this.location = markLocation;
        this.type = markType;
        this.value = markValue;
        this.date = new Date();
    }
}