'use strict'

import React from 'react'
import ReactDOM from 'react-dom'



class TodoItem extends React.Component {

    //改变任务是否已完成的状态
    handlerChange() {
        let isDone = !this.props.isDone
        this.props.changeTodoState(this.props.index, isDone)
    }

    // 鼠标移入事件
    handlerMouseOver() {
        ReactDOM.findDOMNode(this).style.background = '#eee'
        ReactDOM.findDOMNode(this.refs.delButton).style.display = 'inline-block'
    }

    handlerMouseOut() {
        ReactDOM.findDOMNode(this).style.background = '#fff'
        ReactDOM.findDOMNode(this.refs.delButton).style.display = 'none'
    }

    // 删除当前任务
    handlerDelete(){
        this.props.deleteTodo(this.props.index)
    }


    render() {
        let className = this.props.isDone ? 'task-done' : ''
        return (
            <li onMouseOver={this.handlerMouseOver.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)} key={this.props.index}>
                <label>
                    <input type="checkbox" checked={this.props.isDone} onChange={this.handlerChange.bind(this)} />
                    <span className={className}>{this.props.text}</span>
                </label>
                <button ref="delButton" className="btn btn-danger" onClick={this.handlerDelete.bind(this)}>删除</button>
            </li>
        )
    }

}


export default TodoItem
