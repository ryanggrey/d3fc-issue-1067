import { utc } from 'moment';

export class DataService {

    static getData() {
        const minuteIncrement = 60;
        const fromDate = utc().startOf('day')
            .subtract(minuteIncrement, 'minute');

        const data = DataService.baseData().map((value) => ({
                date: fromDate.add(minuteIncrement, 'minute').clone(),
                value
            })
        );

        return data;
    }

    static baseData() {
        return [
            0.20, 0.20, 0.21, 0.22, 0.23, 0.22, 0.22, 0.23,
            0.26, 0.30, 0.35, 0.42, 0.50, 0.60, 0.78, 0.96,
            1.00, 0.98, 0.99, 0.97, 1.00, 1.00, 0.98, 0.99,
        ];
    }
}
