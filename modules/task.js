export class Task {
    constructor(title, text, date) {
        this._title = title;
        this._text = text;
        this._date = new Date(date);
    }

}

Task.prototype.displayTask = function(){
    console.log(`Task: ${this._title}\nDescription: ${this._text}\nDue Date: ${this._date.toUTCString()}`);
    return this;
}

Task.prototype.containsWord = function(word){
    if (word == null || word.trim() === "") return console.error("Word cannot be null or empty");
    return this._title.includes(word) || this._text.includes(word);
}

Task.prototype.isBetween = function(startDate, endDate){
    if (startDate == null || endDate == null) return console.error("Start date and end date cannot be null");
    if (new Date(startDate) > new Date(endDate)) return console.error("Start date cannot be after end date");
    return this._date >= new Date(startDate) && this._date <= new Date(endDate);
}
