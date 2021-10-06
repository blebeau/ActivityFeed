import React, { useState, useEffect } from "react";
import {
    ListGroup,
    ListGroupItem,
} from "react-bootstrap";
import '../css/ActivityFeed.css'




const ActivityDetail = (e) => {

    const [toggleState, setToggleState] = useState(1);

    // Sets the current active tab
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const [calls, setCalls] = useState(null);

    useEffect(() => {
        getCalls();
        // Gets the data to render the call list.
        async function getCalls() {
            try {
                const response = await fetch('https://aircall-job.herokuapp.com/activities');
                console.log('response', response);
                const data = await response.json();

                // Arranges the data by most recent date
                // to oldest date.
                data.sort(function compare(a, b) {
                    var dateA = new Date(a.created_at);
                    var dateB = new Date(b.created_at);
                    return dateB - dateA;
                });
                setCalls(data);
            } catch (err) {
                console.log('err', err)
            }
        }
    }, []);

    async function archive(_id) {
        try {
            console.log(_id)
            const currentArchiveStatus = await fetch(`https://aircall-job.herokuapp.com/activities/${_id}`);
            console.log('currentArchiveStatus', currentArchiveStatus);
            const data = await currentArchiveStatus.json();
            console.log('data', data.is_archived, data)
            await fetch(`https://aircall-job.herokuapp.com/activities/${_id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'

                },
                body: JSON.stringify({
                    is_archived: !data.is_archived,
                })
            })
        } catch (err) {
            console.log('fetch err', err)
        }
    }

    return (
        <div>
            <div className="container">
                <div className="bloc-tabs">
                    <button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}
                    >
                        All Calls
                    </button>
                    <button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(2)}
                    >
                        Archived Calls
                    </button>
                </div>

                <div className="content-tabs">
                    <div
                        className={toggleState === 1 ? "content  active-content" : "content"}
                    >
                        {/* 
                        Creates a list of the items from the API call.
                        The filter removes items based on the archive status.
                        In this case it shows unarchived items
                        */}
                        <ListGroup>
                            {
                                calls && (
                                    calls.map((call, index) => (
                                        <ListGroupItem
                                            className="list-group-item"
                                            key={index}
                                        >
                                            {console.log('calls', calls)}
                                            <div style={{ textAlign: 'center', marginBottom: '1px' }}>{call.from}</div>
                                            <div style={{ float: "right" }}>{new Date(call.created_at).toLocaleTimeString()}</div>
                                            <div style={{ float: "left", marginLeft: '5px' }}>{new Date(call.created_at).toLocaleDateString()}</div>
                                            {!call.is_archived ?
                                                <button style={{ marginLeft: "25%", marginTop: '1px' }} onClick={() => {
                                                    archive(call.id);
                                                    setCalls(calls);
                                                }}>Archive</button> :
                                                <button style={{ marginLeft: "25%", marginTop: '1px' }} onClick={() => {
                                                    archive(call.id);
                                                    setCalls(calls);
                                                }}>Unarchive</button>
                                            }
                                        </ListGroupItem>

                                    )
                                    )
                                )}
                        </ListGroup>
                    </div>

                    <div
                        className={toggleState === 2 ? "content  active-content" : "content"}
                    >
                        {/* 
                        Creates a list of the items from the API call
                        The filter removes items based on the archive status.
                        In this case it shows archived items
                        */}
                        <ListGroup>
                            {
                                calls && (
                                    calls.filter((call) => call.is_archived).map((call, index) => (
                                        <ListGroupItem
                                            key={index}
                                        >
                                            {console.log('calls', calls)}
                                            <div style={{ textAlign: 'center' }}>{call.from}</div>
                                            <div style={{ float: "right" }}>{new Date(call.created_at).toLocaleTimeString()}</div>
                                            <div style={{ float: "left", marginLeft: '5px', marginBottom: '1px' }}>{new Date(call.created_at).toLocaleDateString()}</div>

                                            {call.is_archived ?
                                                <button id="wrapper" style={{ marginLeft: "40%", marginTop: '1px' }} onClick={() => {
                                                    archive(call.id);
                                                    // setCalls(calls);
                                                }}>Unarchive</button> : null
                                            }
                                        </ListGroupItem>

                                    )
                                    )
                                )}
                        </ListGroup>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ActivityDetail;

