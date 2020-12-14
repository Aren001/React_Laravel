import React from 'react';

const Panel = (props) => {


const {tasks , editTask , deleteTask} = props;


    return (
        <div>
              <table border="1">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>----Action-----</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tasks.map(item => {
                                return (

                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>

                                        <td>
                                            <button onClick={() => editTask(item.id, item.name, item.description)}>EDIT</button>
                                            <button onClick={() =>  deleteTask(item.id)} >DELETE</button>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>


                </table>
        </div>
    )
}
export default Panel;