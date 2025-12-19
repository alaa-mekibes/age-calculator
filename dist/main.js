class AgeHandling {
    constructor() {
        this.calculateBtn = document.querySelector("#calculate-btn");
        this.day = document.querySelector("#day");
        this.month = document.querySelector("#month");
        this.year = document.querySelector("#year");

        this.days = document.querySelector("#days");
        this.months = document.querySelector("#months");
        this.years = document.querySelector("#years");

        this.dateError = document.querySelector("#date-error");

        this.btnHandling();
    }

    dateValidationChecker() {
        if (this.emptyFields()) return;
        const year = parseInt(this.year.value.trim());
        const month = parseInt(this.month.value.trim());
        const day = parseInt(this.day.value.trim());

        const userDate = new Date(year, month - 1, day);

        if (year === userDate.getFullYear() && month - 1 === userDate.getMonth() && day === userDate.getDate() && userDate < new Date()) {
            this.day.parentElement.setAttribute("data-invalid", "false");
            this.calculate(userDate);
        }
        else {
            this.day.parentElement.setAttribute("data-invalid", "true");
            this.dateError.textContent = "Must be a valid date";
        }
    }

    emptyFields() {
        let isEmpty = false;
        const msg = "this filed is required";
        const fields = [this.day, this.month, this.year];

        fields.forEach((e) => {
            if (e.value === "") {
                e.parentElement.setAttribute("data-invalid", "true");
                e.nextElementSibling.textContent = msg;
                isEmpty = true;
            } else {
                e.parentElement.setAttribute("data-invalid", "false");
                e.nextElementSibling.textContent = "";
            }
        })
        return isEmpty;
    }

    emptyField(index) {
        const fields = [
            { element: this.day, min: 1, max: 31, msg: "Must be a valid day" },
            { element: this.month, min: 1, max: 12, msg: "Must be a valid month" },
            { element: this.year, min: 1900, max: new Date().getFullYear(), msg: "Must be a valid year" }
        ];

        const value = parseInt(fields[index].element.value);
        const isInValid = !value || value < fields[index].min || value > fields[index].max;

        if (isInValid) {
            fields[index].element.parentElement.setAttribute("data-invalid", "true");
            fields[index].element.nextElementSibling.textContent = fields[index].msg;
        } else {
            fields[index].element.parentElement.setAttribute("data-invalid", "false");
            fields[index].element.nextElementSibling.textContent = "";
        }
    }

    btnHandling() {
        // 0 => Day ||| 1 => Month ||| 2 => Year
        this.day.addEventListener("input", () => this.emptyField(0));
        this.month.addEventListener("input", () => this.emptyField(1));
        this.year.addEventListener("input", () => this.emptyField(2));

        this.day.addEventListener("blur", () => this.emptyField(0));
        this.month.addEventListener("blur", () => this.emptyField(1));
        this.year.addEventListener("blur", () => this.emptyField(2));

        this.calculateBtn.addEventListener("click", () => this.dateValidationChecker());
    }

    calculate(userDate, currentDate = new Date()) {
        userDate = new Date(userDate);
        let years = currentDate.getFullYear() - userDate.getFullYear();
        let months = currentDate.getMonth() - userDate.getMonth();
        let days = currentDate.getDate() - userDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        this.years.textContent = years;
        this.months.textContent = months;
        this.days.textContent = days;
    }
}

new AgeHandling();