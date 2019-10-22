import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import './App.css'
import "react-datepicker/dist/react-datepicker.css";
import {Container,Form,Input,Button,FormGroup,Label,Table} from 'reactstrap';
import {Link} from 'react-router-dom'

class Expenses extends Component {

    emptyItem ={
        id:'103',
        expenseDate: new Date(),
        description: '',
        location: '',
        categories: [1,'Travel']
    }

    constructor(props){
        super(props)
        this.state ={
            date:new Date(),
            isLoading: true,
            expenses: [],
            categories: [],
            item: this.emptyItem
        }
    }

    async remove(id){
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers : {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        ).then(() =>{
            let updatedExpenses = [...this.state.expenses].filter(i => i.id !== id);
            this.setState({expenses : updatedExpenses});
        });
    }


    async componentDidMount(){
        const response= await fetch('/api/categories');
        const body= await response.json();
        this.setState({categories : body, isLoading:false})

        const responseExpenses= await fetch('/api/expenses');
        const bodyExpenses= await responseExpenses.json();
        this.setState({expenses : bodyExpenses, isLoading:false})
    }




    render() { 
        const title =<h3>Add Expense</h3>
        const {categories} =this.state;
        const {expenses,isLoading} =this.state;

        if(isLoading)
            return(<div>Loading....</div>)

        let optionList =
            categories.map((category) =>
                <option id={category.id}>
                    {category.name}
                </option>
                )
        
        let rows=
                expenses.map(expense =>
                    <tr>
                        <td>{expense.description}</td>
                        <td>{expense.location}</td>
                        <td>{expense.category.name}</td>
                        <td>{expense.expense_date}</td>
                        <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
                    </tr>)
        

        return ( 
        <div>
            <AppNav/>

            <Container>
                {title}
                <Form onSubmit = {this.handleSubmit}>
                    <FormGroup>
                        <Label for ="title">Title</Label>
                        <Input type="text" name="title" id="title" onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for ="category">Category</Label>
                        <select>
                            {optionList}
                        </select>
                        <Input type="text" name="category" id="category" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for ="expenseDate">Expense Date</Label>
                        <DatePicker selected={this.state.date} onChange={this.handleChange} onSelect={this.handleSelect}/>
                    </FormGroup>

                    <div className="row">
                    <FormGroup className="col-md-4 mb-3">
                        <Label for ="location">Location</Label>
                        <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                    </FormGroup>
                    </div>

                    <FormGroup>
                        <Button color="primary" type= "submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>


                </Form>

            </Container>
            {''}
                <Container>
                    <h3>Expense List</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Desription</th>
                                <th width="10%">Location</th>
                                <th width="10%">Category</th>
                                <th>Date</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>


                    </Table>
                </Container>

            </div> 
            );
    }
}
 
export default Expenses;