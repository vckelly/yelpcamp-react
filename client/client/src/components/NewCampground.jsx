import { React, useEffect, useState } from 'react'
import { Redirect, useParams, useHistory } from "react-router-dom"; 
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


export default function NewCampground() {
    const history = useHistory();
    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.nativeEvent.target,
                    e.nativeEvent.target[0].value,
                    e.nativeEvent.target[1].value,
                    e.nativeEvent.target[2].value,
                    e.nativeEvent.target[3].value,
                    e.nativeEvent.target[4].value)
        const data = {
            campground: {
                title: e.nativeEvent.target[0].value,
                location: e.nativeEvent.target[1].value,
                price: e.nativeEvent.target[2].value,
                description: e.nativeEvent.target[3].value
            },
            files: {}
        };

        fetch(`http://localhost:5000/campgrounds/`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)

        }).then((res) => {
            if (res.ok) {
                const id = res.url.split('/');
                history.push({
                    pathname: id[id.length-1],
                    state: { 
                        from: 'new'
                    }
                })
            }
            //TODO: Error handling
        })
    };

    const handleTitleChange = (e) => { setTitle(e.target.value) };
    const handlePriceChange = (e) => { setPrice(e.target.value) };
    const handleDescriptionChange = (e) => { setDescription(e.target.value) };
    const handleLocationChange = (e) => { setLocation(e.target.value) };

    return (
        <div className="row">
            <h1 className="text-center">New Campground</h1>
            <div className="col-md-6 offset-md-3 ">
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Form.Group controlId="title" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" 
                                            name="title"  
                                            value={title} 
                                            onChange={handleTitleChange}/>
                        </Form.Group>
                    </div>
                    <div className="mb-3">
                        <Form.Group controlId="location" >
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" 
                                            name="location"  
                                            value={location}
                                            onChange={handleLocationChange}/>
                        </Form.Group>
                    </div>
                    <div className="mb-3">
                        <Form.Group controlId="price" >
                            <Form.Label>Campground Price</Form.Label>
                            <Form.Control type="number" 
                                            name="price"  
                                            value={price} 
                                            onChange={handlePriceChange}/>
                        </Form.Group>
                    </div>
                    <div className="mb-3">
                        <Form.Group controlId="description" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" 
                                            name="description"   
                                            value={description} 
                                            onChange={handleDescriptionChange}/>
                        </Form.Group>
                    </div>
                    <div className="mb-3">
                        <Form.Group controlId="imageFiles" >
                            <span className="form-file-text custom-file-label">Choose image(s)...</span>                   
                            <Form.File id="imageFile" multiple/>   
                        </Form.Group>
                    </div>
                    <Button variant="info" type="submit">Add Campground</Button>{' '}
                </Form>
                <a href="/campgrounds">All Campgrounds</a> 
            </div>
        </div>
    )
};
