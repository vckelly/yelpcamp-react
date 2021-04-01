import { React, useEffect, useState } from 'react'
import { Redirect, useParams } from "react-router-dom"; 
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner';


export default function EditCampground() {

    let { id } = useParams();
    const [redirect, setRedirect] = useState(false);
    const [campgroundState, setCampgroundState] = useState(null);
    const [isDataLoaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchData () {
        try {
            const response = await fetch(`http://localhost:5000/campgrounds/${id}`);
            const json = await response.json();
            setCampgroundState(json);
            setLoaded(true);        
            //console.log(campgroundState);
        } catch (error) {}
        }
        // if (campgroundState.length === 0 ) { 
        //   fetchData() 
        // }
        
        fetchData();
    }, [campgroundState]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.nativeEvent.target[0].value,
                    e.nativeEvent.target[1].value,
                    e.nativeEvent.target[2].value,
                    e.nativeEvent.target[3].value)
        const data = {
            campground: {
                title: e.nativeEvent.target[0].value,
                location: e.nativeEvent.target[1].value,
                price: e.nativeEvent.target[2].value,
                description: e.nativeEvent.target[3].value
            },
            files: {}
        };

        fetch(`http://localhost:5000/camprounds/${id}?_method=PUT`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log("response", res);
            if (res.status === 200) {
                setRedirect(true);
            }
            //TODO: Error handling
        })
    };

    return (
        <div>
        { isDataLoaded ? (     
            <div className="row">
                <h1 className="text-center">Edit Campground</h1>
                <div className="col-md-6 offset-md-3 ">
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Group controlId="title" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title"  placeholder={campgroundState.title} />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group controlId="location" >
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" name="location"  placeholder={campgroundState.location} />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group controlId="price" >
                                <Form.Label>Campground Price</Form.Label>
                                <Form.Control type="number" name="price"  placeholder={campgroundState.price} />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group controlId="description" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description"  placeholder={campgroundState.description} />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <Form.Group controlId="imageFiles" >
                                <span className="form-file-text custom-file-label">Add more image(s)...</span>                   
                                <Form.File id="imageFile" multiple/>   
                            </Form.Group>
                        </div>
                        <Button variant="info" type="submit">Update Campground</Button>{' '}
                    </Form>
                </div>
            </div>
            ) : ((<Spinner animation="border" />))}
        </div>
    )
};
