import * as React from 'react';

import { SparkLineChart } from '../sparklines/SparkLineChart';
import { DataService } from '../../service/';
import './App.css';

export class App extends React.Component {
    render() {
        return (
            <div className="Dashboard">
                <SparkLineChart data={DataService.getData()} />
            </div>
        );
    }
}
