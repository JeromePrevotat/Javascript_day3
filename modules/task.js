export class Task {
    constructor(title, text, date) {
        this._title = title;
        this._text = text;
        this._date = new Date(date);
    }

    toTableRow(){
        const row = document.createElement('tr');
        const titleTd = document.createElement('td');
        titleTd.textContent = this._title;
        row.appendChild(titleTd);
        const textTd = document.createElement('td');
        textTd.textContent = this._text;
        row.appendChild(textTd);
        const dateTd = document.createElement('td');
        dateTd.textContent = this._date.toUTCString();
        row.appendChild(dateTd);
        const locationTd = document.createElement('td');
        locationTd.textContent = (this._location != null) ? this._location : '';
        row.appendChild(locationTd);
        const projectTd = document.createElement('td');
        projectTd.textContent = (this._project != null) ? this._project : '';
        row.appendChild(projectTd);
        return row;
    }
    
    displayTask(){
        console.log(`Task: ${this._title}\nDescription: ${this._text}\nDue Date: ${this._date.toUTCString()}`);
        return this;
    }
    
    containsWord(word){
        if (word == null || word.trim() === "") return console.error("Word cannot be null or empty");
        return this._title.includes(word) || this._text.includes(word);
    }

    isBetween(startDate, endDate){
        if (startDate == null || endDate == null) return console.error("Start date and end date cannot be null");
        if (new Date(startDate) > new Date(endDate)) return console.error("Start date cannot be after end date");
        return this._date >= new Date(startDate) && this._date <= new Date(endDate);
    }
}


