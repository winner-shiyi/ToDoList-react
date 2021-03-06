
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import LocalDb from '../vendor/localDb'

import TodoHeader from './TodoHeader.js'
import TodoMain from './TodoMain.js'
import TodoFooter from './TodoFooter.js'

//es6写法
class App extends React.Component { 
    constructor(...args) { 
        super(...args)
        this.db = new LocalDb('ReactDemo')
        this.state = { 
            todos: this.db.get('todos') || [],
            isAllChecked: false,
        }
    }

    // 判断是否所有任务的状态都完成，同步底部的全选框
    allChecked() {
        let isAllChecked = false
        if (this.state.todos.every(todo => todo.isDone)) {
            isAllChecked = true
        }
        
        this.setState({   //改变状态，组件重绘
            todos: this.state.todos,
            isAllChecked: isAllChecked,
        })
    }

    // 添加任务，是传递给Header组件的方法
    addTodo(todoItem){
        this.state.todos.push(todoItem) 
        this.db.set('todos', this.state.todos)
        this.allChecked()
    }

    // 删除当前的任务，传递给TodoItem的方法
    deleteTodo(index){
        this.state.todos.splice(index, 1)
        this.setState({todos: this.state.todos})
        this.db.set('todos', this.state.todos)
    }

    // 清除已完成的任务，传递给Footer组件的方法
    clearDone(){
        let todos = this.state.todos.filter(todo => !todo.isDone)   //过滤掉数组中todo.isDone为true的item。
        this.setState({
            todos: todos,
            isAllChecked: false,
        })
        this.db.set('todos', todos)
    }

    // 改变任务状态，传递给TodoItem和Footer组件的方法
    changeTodoState(index, isDone, isChangeAll=false){   //初始化isChangeAll为false，区分全部改变和单个改变
        if(isChangeAll){     //操作全部todo
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone
                    return todo
                }),
                isAllChecked: isDone,
            })
        }else{   //操作具体其中某一个todo
            this.state.todos[index].isDone = isDone
            this.allChecked()
        }
        this.db.set('todos', this.state.todos)
    }

    //组件渲染方法
    render() {
        let info = {
            isAllChecked: this.state.isAllChecked,
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0,
        }
        return (
            <div className="todo-wrap">
                <TodoHeader addTodo={this.addTodo.bind(this)} />
                <TodoMain todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)} changeTodoState={this.changeTodoState.bind(this)} />
                <TodoFooter {...info} changeTodoState={this.changeTodoState.bind(this)} clearDone={this.clearDone.bind(this)} />
            </div>
        )
    }
}

//取消eslint 对document没定义的报错
/* eslint-disable */
ReactDOM.render(<App/>, document.getElementById('app'))

export default App
