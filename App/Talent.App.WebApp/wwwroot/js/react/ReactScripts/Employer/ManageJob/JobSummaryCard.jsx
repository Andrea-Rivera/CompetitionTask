
import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Button, Card, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
    
       
    }


    render() {
        return (
            <Card className="ui cards custom-size">
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Label color="black" ribbon="right">
                        <Icon name="user" size="small" /> 0
                    </Label>
                    <Card.Meta>{this.props.city}, {this.props.country}</Card.Meta>
                    <Card.Description>
                        {this.props.summary}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div>
                        {!this.props.expired ? <Label color="red" floated="left" size="tiny">
                            Expired
          </Label> : null}
                        <Button.Group size="mini" floated="right">
                            <Button basic color="blue">
                                <Icon name="ban" size="small" />
                                Close
            </Button>
                            <Button basic color="blue">
                                <Icon name="edit" size="small" />
                                <Link
                                    to={{
                                        pathname: `/EditJob/${this.props.id}`
                                    }}> Edit
                                </Link>
                            </Button>
                            <Button basic color="blue">
                                <Icon name="copy outline" size="small" />
                                Copy
            </Button>
                        </Button.Group>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}



