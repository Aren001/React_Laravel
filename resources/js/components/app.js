import React from 'react';

import axios from 'axios';

import Panel from './panel';






class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //ARRAYS
            tasks: [],

            //new Task Data

            newTaskData: {
                name: '',
                description: '',

            },

            //Edit Task

            editTaskData: {
                id: '',
                name: '',
                description: ''

            },
            //EDIT ADD Variables
            var: true
        }
        this.loadTask = this.loadTask.bind(this);
        this.handleSbmit = this.handleSbmit.bind(this);
        // this.onchange = this.onchange.bind(this);
        this.addTask = this.addTask.bind(this);

        this.editTask = this.editTask.bind(this);
        this.updateTask = this.updateTask.bind(this);

        this.deleteTask = this.deleteTask.bind(this);


    }

    //DidMount
    componentDidMount() {
        this.loadTask();
    }

    //FETCH
    loadTask() {
        axios.get('http://127.0.0.1:8000/api/tasks')
            .then(resp => {
                console.log(resp)//data
                this.setState({
                    tasks: resp.data
                })
                console.log('tasks', this.state.tasks)
            })

    }


    //ADD
    addTask() {

        axios.post('http://127.0.0.1:8000/api/task', this.state.newTaskData)
            .then(resp => {
                this.loadTask();
                // e.preventeDefalt();

                this.setState({
                    tasks: this.state.tasks,
                    newTaskData: {
                        name: '',
                        description: ''
                    },
                    var: true

                })
            })
    }


    //EDIT UPDATE

    editTask(id, name, description) {
        console.log(id)
        this.setState({
            editTaskData: {
                id,
                name,
                description
            },
            var: false
        })
    }

    updateTask() {
        axios.put(`http://127.0.0.1:8000/api/task/${this.state.editTaskData.id}`, {
            name: this.state.editTaskData.name,
            description: this.state.editTaskData.description,

        }).then(resp => {
            this.loadTask();

            //Clean Inputs
            this.setState({
                editTaskData: {
                    id: '',
                    name: '',
                    description: '',

                },
                var: true
            })
        })
    }

    //DELETE


    deleteTask(id) {
        axios.delete(`http://127.0.0.1:8000/api/task/${id}`)
            .then(resp => {
                this.loadTask();
            })
    }



    //FORM

    handleSbmit(e) {
        e.preventDefault();
    }

    // onchange(e){
    //     this.setState({
    //         [e.target.name]:[e.target.value]
    //     })
    // }










    render() {


        return (
            <div className="container">

                {/* Panel */}

                <Panel
                    tasks={this.state.tasks}
                    editTask={this.editTask}
                    deleteTask={this.deleteTask}
                />

                <hr />
                <hr />

                {/* VARIABLES */}

                {this.state.var ?



                    <div>

                        <h1>ADD TASKS</h1>

                        <form onSubmit={this.handleSbmit} >

                            Name <br />
                            <input
                                type='text'
                                name='name'
                                value={this.state.newTaskData.name}
                                onChange={(e) => {
                                    let { newTaskData } = this.state
                                    newTaskData.name = e.target.value
                                    this.setState({ newTaskData })
                                }}
                            />
                            <br />
        Description <br />
                            <input
                                type='text'
                                name='description'
                                value={this.state.newTaskData.description}
                                onChange={(e) => {
                                    let { newTaskData } = this.state
                                    newTaskData.description = e.target.value
                                    this.setState({ newTaskData })
                                }}
                            />
                            <br /><br />

                            <button onClick={this.addTask}>ADD</button>
                        </form>

                    </div>

                    :

                    <div>
                        {/* EDIT  FORM */}

                        <h1>EDIT TASKS</h1>

                        <form onSubmit={this.handleSbmit} >

                            Name <br />
                            <input
                                type='text'
                                name='name'
                                value={this.state.editTaskData.name}
                                onChange={(e) => {
                                    let { editTaskData } = this.state
                                    editTaskData.name = e.target.value
                                    this.setState({ editTaskData })
                                }}
                            />
                            <br />
                            Description <br />
                            <input
                                type='text'
                                name='description'
                                value={this.state.editTaskData.description}
                                onChange={(e) => {
                                    let { editTaskData } = this.state
                                    editTaskData.description = e.target.value
                                    this.setState({ editTaskData })
                                }}
                            />
                            <br /><br />

                            <button onClick={this.updateTask}>EDIT Task</button>
                        </form>

                    </div>
                }




            </div>

        )
    }
}


export default App;


