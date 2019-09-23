import React, { Component } from 'react'
import {Switch,Route,Redirect} from "react-router-dom"

export default class RouterView extends Component {
    render() {
        return (
            <Switch>
                {this.props.routes.map((item,index)=>{
                    if(item.redirect){
                        return <Redirect key={index} from={item.path} to={item.redirect}></Redirect>
                    }else{
                        return <Route key={index} path={item.path} render={()=>{
                            return <item.component children={item.children}/>
                        }}></Route>
                    }
                })}
            </Switch>
        )
    }
}
