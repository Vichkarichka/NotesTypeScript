import axios from "axios/index";
import * as React from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import './NewNote.css';

interface State {
    nameNote?: string;
    textNote?: string;
    open?: boolean;
    name?: string;
    idNote?: string;
}

class NewNote extends React.Component<any, State> {
    constructor(props: any){
        super(props);
        this.state = {
            idNote: '',
            name: '',
            nameNote: '',
            open: false,
            textNote: '',
        };
    }
   public show = () => {
        this.setState({
            open: true,
        });
    };

   public close = () => {
        this.setState({
            nameNote: '',
            open: false,
            textNote: '',
        }, () => {
            this.props.onClosed(false);
        });
    };

    public handleInput = (e: React.SyntheticEvent) => {
        const name = (e.target as HTMLInputElement).name;
        const value = (e.target as HTMLInputElement).value;
        this.setState({[name]: value});
    };

    public handleClick = () => {
        const data = {
            name: this.state.nameNote,
            text: this.state.textNote,
        };

        axios.post('http://127.0.0.1:8000/notes', data)
            .then((res) => {
                this.props.addNewItem(res.data);
                this.setState({
                    nameNote: '',
                    open: false,
                    textNote: '',
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public handleUpdate = () => {

        const data = {
            name: this.state.nameNote,
            text: this.state.textNote,
        };

        axios.post('http://127.0.0.1:8000/notes/' + this.state.idNote, data)
            .then((res) => {
                this.setState({
                    open: false,
                }, () =>{
                    this.props.onDataLoaded();
                    this.props.onClosed(false);});
            })
            .catch((error) => {
                console.log(error);
            });
    };

    public componentWillReceiveProps (nextProps:any) {
        if(nextProps.open !== this.state.open) {
            this.setState({
                idNote: nextProps.array[2],
                nameNote: nextProps.array[1],
                open: true,
                textNote: nextProps.array[0],
            });
        }
    };

    public render() {
        const { nameNote, textNote, open } = this.state;
        return (
            <Modal trigger={
                <div className='ContainerDiv'>
                <Button className='NewNote' onClick = {this.show}>Add new note</Button>
                </div>
            } open={open}>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Add Notes</Header>
                        <Form >
                            <Form.Field>
                                <Form.Input placeholder='Name note' onChange={this.handleInput} name = 'nameNote' value={nameNote} />
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea autoHeight = {true} placeholder='Text note' onChange={this.handleInput}  name = 'textNote' value={textNote} />
                            </Form.Field>
                        </Form>
                        {
                            this.props.open &&
                            <div>
                                <Button onClick={this.handleUpdate}>Edit</Button>
                                <Button onClick={this.close}>Cancel</Button>
                            </div> || <div>
                                <Button onClick={this.handleClick}>Add</Button>
                                <Button onClick={this.close}>Cancel</Button>
                            </div>
                        }
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default NewNote;