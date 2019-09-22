import React, { Component } from 'react'
import axios from "axios"
import { DatePicker } from 'antd';
const {  RangePicker} = DatePicker;

function onChange(date, dateString) {

    console.log(date, dateString); //date:[Moment, Moment] dateString:["2019-08-15", "2019-08-16"]
    // 转成时间戳 new Date().getTime()
    let startTime=new Date(dateString[0]).getTime();  //1565827200000
    let endTime=new Date(dateString[1]).getTime();  //1565913600000
    let spansDays=Math.ceil((endTime-startTime)/1000/60/60/24);  //相差天数

    let startDay=new Date(dateString[0]).getDate();  //开始日期 eg:点击15日就是15日
    // let endDay=new Date(dateString[1]).getDate();   //结束日期
    let startYear=new Date(dateString[0]).getFullYear();  //你点击是哪一年
    let startMonth=new Date(dateString[0]).getMonth();  //点击是几月
    // console.log(startMonth)

    let arr=[]
    for(let i=0;i<=spansDays;i++){
        let ndata=new Date(startYear,startMonth,startDay+i)
        // console.log(ndata)  //Mon Jul 15 2019 00:00:00 GMT+0800 (中国标准时间)
        arr.push(`${ndata.getFullYear()}-${ndata.getMonth()+1}-${ndata.getDate()}`)
        // console.log(arr)
    }
    
    axios.get(`/store/statistics/profit?from=${dateString[0]}&to=${dateString[1]}&store_id=mm`).then((res)=>{
        console.log(res)
        let option=window.option
        option.xAxis[0].data=arr
        option.series[0].data=res.data.result.map(item=>item.count)
        window.instance.setOption(option)
    })
    
   
  }

export default class Line extends Component {
    render() {
        return (
            <div className="Line" style={{width:"1200px",height:"300px"}} >
                <RangePicker onChange={onChange} />
               <div className="lineBox" style={{height:"300px"}} ref="lineBox">

               </div>
            </div>
        )
    }
    componentDidMount(){
        // 挂载到public的index.html的script标签上
        // 实例指的就是接口init()返回的对象
        window.instance =window.echarts.init(this.refs.lineBox)
        // 定义全局的
        // this.instance=instance
        let option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['意向','预购','成交']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            // sub1
            series : [
                 // 控制图表上的数据
                {
                    name:'成交',
                    type:'line',
                    smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default',color:{
                        type:"linear",
                        x:0,
                        y:0,
                        x2:0,
                        y2:1,
                        colorStops:[{
                            offset:0,color:"#03b0f7"
                        },{
                            offset:1,color:"#0081e4"
                        }],
                        global:false
                    }}}},
                    data:[10, 12, 21, 54, 260, 830, 710]
                }
            ]
        };
        window.option=option
        window.instance.setOption(option)

         // 数据得刷新一次得请求一次？如何解决
         axios.get("/store/statistics/catcount?from=2019-07-08&to=2019-08-01&store_id=mm").then((res)=>{
            console.log(res)
        })
    }
}
