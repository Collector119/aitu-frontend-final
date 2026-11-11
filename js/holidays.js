const HOLIDAYS_URL = "https://date.nager.at/api/v3/NextPublicHolidays/KZ";
const HOLIDAYS_TO_SHOW = 5;

class HolidayList {
    constructor(url) {
        this.url = url;
        this.list = document.querySelector("#holidays-list");
        this.status = document.querySelector("#holidays-status");
    }

    async load() {
        this.status.textContent = "Loading the holidays...";
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error("The server answered with status " + response.status);
            }
            const holidays = await response.json();
            this.show(holidays);
        } catch (error) {
            this.status.textContent = "The list of holidays is not available now.";
        }
    }

    // The API returns the holidays of the whole next year, only the nearest ones are shown
    show(holidays) {
        this.status.textContent = "";
        const nearestHolidays = holidays.slice(0, HOLIDAYS_TO_SHOW);
        for (const holiday of nearestHolidays) {
            const date = new Date(holiday.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
            const item = document.createElement("li");
            item.textContent = date + " - " + holiday.name;
            this.list.appendChild(item);
        }
    }
}

const holidayList = new HolidayList(HOLIDAYS_URL);
holidayList.load();
