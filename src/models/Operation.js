import TDate from './TDate.js';
export var OperationType;
(function (OperationType) {
    OperationType[OperationType["PLOWING"] = 0] = "PLOWING";
    OperationType[OperationType["BOWLING"] = 1] = "BOWLING";
    OperationType[OperationType["FERTILIZATION"] = 2] = "FERTILIZATION";
    OperationType[OperationType["WATERING"] = 3] = "WATERING";
    OperationType[OperationType["RIGGING"] = 4] = "RIGGING";
    OperationType[OperationType["HARVESTING"] = 5] = "HARVESTING"; // Сбор урожая
})(OperationType || (OperationType = {}));
export var Assessment;
(function (Assessment) {
    Assessment[Assessment["EXCELLENT"] = 0] = "EXCELLENT";
    Assessment[Assessment["SATISFACTORILY"] = 1] = "SATISFACTORILY";
    Assessment[Assessment["BADLY"] = 2] = "BADLY"; // Плохо
})(Assessment || (Assessment = {}));
export default class Operation {
    constructor(args) {
        const { id = null, type, date, area, comment = null, assessment = null } = args;
        this.id = id;
        this.type = type;
        this.date = new TDate(date);
        this.area = area;
        this.comment = comment;
        this.assessment = assessment;
    }
}
