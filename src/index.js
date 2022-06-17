import React, {useState} from "react";
import ReactDOM from "react-dom";
import * as antd from "antd";
import { Pagination } from 'antd';
import { BaseTable, features, useTablePipeline } from "ali-react-table";
import "antd/dist/antd.css";
import {useCityDataSource} from "./ncov19-assets.jsx";
import _ from 'lodash'

function Example() {
  const { dataSource: cityData, isLoading } = useCityDataSource()
  
  const [current, setCurrent] = useState(3);

  var targetIndex = 7 + current * 3
  
  const dataSource = cityData.slice(targetIndex, targetIndex+3).flatMap((d) => d.children.slice(0, 4))

  const onChange = page => {
    setCurrent(page);
  };

  const columns = [
    { code: 'provinceName', name: '省份', width: 150, features: { autoRowSpan: true, sortable: true } },
    { code: 'cityName', name: '城市', width: 150, features: { autoRowSpan: true, sortable: true } },
    { code: 'confirmedCount', name: '确诊', align: 'right', features: { autoRowSpan: true, sortable: true } },
    { code: 'curedCount', name: '治愈', align: 'right', features: { autoRowSpan: true, sortable: true } },
    { code: 'deadCount', name: '死亡', align: 'right', features: { autoRowSpan: true, sortable: true } },
  ]

  const pipeline = useTablePipeline({ components: antd })
    .input({ dataSource, columns })
    .use(features.sort({ mode: 'single', defaultSorts: [{ code: 'provinceName', order: 'desc' }] }))
    .use(features.autoRowSpan())

  return (<div>
      <BaseTable defaultColumnWidth={100} isLoading={isLoading} {...pipeline.getProps()} />
      <Pagination current={current} onChange={onChange} total={50} />
    </div>)
  
}

ReactDOM.render(<Example />, document.getElementById("example"));
