import axios from "axios/index";
import * as React from 'react';
import { Button, Card } from 'semantic-ui-react';
import './App.css';
import NewNote from './components/NewNote';

interface State {
    allNotes: any[];
    open?: boolean;
    name: string;
    text: string;
    idNote: string;
}

class App extends React.Component<any, State> {

   constructor(props: any){
        super(props);
        this.state = {
            allNotes: [],
            idNote: '',
            name: '',
            open: false,
            text: '',
        };

    }

    public componentDidMount() {
        axios.get('http://127.0.0.1:8000/notes')
            .then((res) => {
                this.setState({
                    allNotes: res.data,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

   public func = () => {
        axios.get('http://127.0.0.1:8000/notes')
            .then((res) => {
                this.setState({
                    allNotes: res.data,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public displayNote = () => {
        const notes = this.state.allNotes;
        console.log(notes);
        const display = notes.map((item) =>
            <Card id = {item._id} key = {item._id} className = 'cardNote'>
                <Card.Content>
                    <Card.Header>
                        {item.text}
                    </Card.Header>
                    <Card.Description>
                        {item.title}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra = {true}>
                    <Button onClick = {this.handleClick} id = {item._id}>Edit</Button>
                    <Button onClick = {this.handleDelete} id = {item._id}>Delete</Button>
                </Card.Content>
            </Card>
        );
        return display;
    };

    public handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const arrayNote = this.state.allNotes;
        const editArray = arrayNote.find((items) => items._id === (e.target as HTMLInputElement).id);
        console.log(editArray);
        this.setState({
            idNote: (e.target as HTMLInputElement).id,
            name: editArray.title,
            open: true,
            text: editArray.text,
        });
    };

    public handleDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.delete('http://127.0.0.1:8000/notes/' + (e.target as HTMLInputElement).id)
            .then((res) => {
                this.func();
            })
            .catch((error) => {
                console.log(error);
            });
    };


   public addArray = (value: object) => {
        this.state.allNotes.push(value);
        this.forceUpdate();
    };

    public close = (value:boolean) => {
        this.setState({
            open: value,
        });
    };

    public render() {
       const display = this.displayNote();
        return (
            <div className="App">
                {display}
                <NewNote addNewItem = {this.addArray} open = {this.state.open} onClosed = {this.close} array = {[this.state.name, this.state.text, this.state.idNote]} onDataLoaded = {this.func}/>
            </div>
        );
    }
}

export default App;

