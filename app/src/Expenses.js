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


    async componentDidMount(){
        const response= await fetch('/api/categories');
        const body= await response.json();
        this.setState({categories : body, isLoading:false})

        const responseExpenses= await fetch('/api/expenses');
        const bodyExpenses= await responseExpenses.json();
        this.setState({expenses : body, isLoading:false})
    }




    render() { 
        const title =<h3>Add Expense</h3>
        const {categories} =this.state;
        const {expenses,isLoading} =this.state;

        if(isLoading)
            return(<div>Loading....</div>)

        let optionList =
            categories.map(category =>
                <option id={category.id}>
                    {category.name}
                </option>)

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
                                <th width=''></th>
                                <th width=''></th>
                                <th width=''></th>
                                <th width=''></th>
                                <th width=''></th>
                            </tr>
                        </thead>


                    </Table>
                </Container>

            </div> 
            );
    }
}
 
export default Expenses;