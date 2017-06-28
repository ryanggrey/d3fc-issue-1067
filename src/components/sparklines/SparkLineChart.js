import * as React from 'react';
import * as d3 from 'd3';
import * as fc from '../../lib/d3fc';
import './SparkLineChart.css';

export class SparkLineChart extends React.Component {

    componentDidMount() {
        this.redraw();
    }

    render() {
        return (
            <div ref={this.getContainerElement} className="SparkLineChart"/>
        );
    }

    redraw() {

        const { data } = this.props;

        const yExtent = fc.extentLinear()
            .accessors([this.getValue])
            .include([0, 1]); // include 1 so if all value are 0 it can still create a gradient.

        const xExtent = fc.extentDate()
            .accessors([(d) => d.date.toDate()]);

        const chartFunction = fc.chartSvgCartesian(d3.scaleTime(), d3.scaleLinear());
        chartFunction.xTicks(this.getTickIntervalForView())
            .xTickFormat(d3.timeFormat('%H'))
            .xDomain(xExtent(data))
            .yDomain(yExtent(data))
            .yOrient('none');

        const gridlines = this.createGridLines();
        const viewLine = this.createLineSeries('main line');

        const multi = fc.seriesSvgMulti().series([gridlines, viewLine]);
        chartFunction.plotArea(multi);

        d3.select(this.chartElement)
            .datum(data)
            .call(chartFunction);
    }

    createGridLines() {
        return fc.annotationSvgGridline()
            .xTicks(this.getTickIntervalForView())
            .yTicks(0)
            .xDecorate(this.createClassNameDecorator('gridlines'));
    }

    createLineSeries(className) {
        return fc.seriesSvgLine().curve(d3.curveMonotoneX)
            .crossValue(this.getDate)
            .mainValue(this.getValue)
            .decorate(this.createClassNameDecorator(className));
    }

    createClassNameDecorator(className) {
        return (selection) => {
            selection.classed(className, true);
        };
    }

    getValue = (d) => d.value;
    getDate = (d) => d.date;

    getTickIntervalForView() {
        return d3.timeHour.every(4);
    }

    getContainerElement = (element) => this.chartElement = element;
}
