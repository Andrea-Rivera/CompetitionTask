import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, Group } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        console.log(loader)
        this.state = {
            loadJobs: [],
            error: null,
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.renderJobs = this.renderJobs.bind(this);
        
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.loadData(() =>
            this.setState({ loaderData })
        )
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) {

        var link = 'https://talentservicestalentar.azurewebsites.net/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data: {
                activePage: this.state.activePage,
                sortByDate: this.state.sortBy.date,
                showActive: this.state.filter.showActive,
                showClosed: this.state.filter.showClosed,
                showDraft: this.state.filter.showDraft,
                showExpired: this.state.filter.showExpired,
                showUnexpired: this.state.filter.showUnexpired
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                
                this.setState({
                    loadJobs: res.myJobs
                    //totalPages: Math.ceil(res.totalCount / 6)
                }, callback);
            }.bind(this),
            
            error: function (res, a, b) {
                //this.init();

                console.log(res)
                console.log(a)
                console.log(b)
                
            }.bind(this)
        })
    }
    

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        console.log("loadjob array: " + this.state.loadJobs.length);
        const jobs = this.state.loadJobs.length === 0 ? <p>No Jobs Found</p>: this.renderJobs();
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h1>List of Jobs</h1>
                    <div style={{ marginBottom: '50px' }}>
                        <span>
                            <Icon name='filter' /> Filter :
                        <div className="ui inline dropdown">
                                <div className="text">
                                    Choose Filter  
                             </div>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                    <div className="text">

                                        Expired
                                    </div>

                                </div>
                            </div>
                        </span>


                        <span>
                            <Icon name='calendar alternate outline' /> Sort by date :
                        <div className="ui inline dropdown">
                                <div className="text">
                                    Newest First
                             </div>
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                    <div className="text">

                                        Date
                                    </div>

                                </div>
                            </div>
                        </span>
                    </div>

                    <div style={{ marginBottom: '50px' }}>
                        <Card.Group className='jobs'>
                            {jobs}
                        </Card.Group>

                        </div>

                    <div style={{ marginBottom: '50px' }}>
                        <Pagination defaultActivePage={1} totalPages={1} />
                     </div>

                </div>
            </BodyWrapper>
        )
    }

    renderJobs() {
       
        return this.state.loadJobs.map(
            (job) => (
                <JobSummaryCard
                    key={job.id}
                    title={job.title}
                    city={job.location.city}
                    country={job.location.country}
                    summary={job.summary}

                />

            )


        )

    }

}




