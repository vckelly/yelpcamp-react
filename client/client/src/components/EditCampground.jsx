import { React, useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from "react-router-dom"; 
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner';


export default function EditCampground() {

    let { id } = useParams();
    const history = useHistory();
    const [campgroundState, setCampgroundState] = useState(null);
    const [isDataLoaded, setLoaded] = useState(false);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState(null);

    const fileInput = useRef(null);

    useEffect(() => {
        async function fetchData () {
        try {
            const response = await fetch(`http://localhost:5000/campgrounds/${id}`);
            const json = await response.json();
            setTitle(json.title);
            setLocation(json.location);
            setPrice(json.price);
            setDescription(json.description);
            setCampgroundState(json);
            setLoaded(true);        
            //console.log(campgroundState);
        } catch (error) {}
        }

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, location, price, description, files.target?.files[0], fileInput?.current.files);
        // console.log(e.nativeEvent.target,
        //             e.nativeEvent.target[0].value,
        //             e.nativeEvent.target[1].value,
        //             e.nativeEvent.target[2].value,
        //             e.nativeEvent.target[3].value,
        //             e.nativeEvent.target[4].value)

        var fileObj  = {
            'lastModified'     : files.target.files[0].lastModified,
            'lastModifiedDate' : files.target.files[0].lastModifiedDate,
            'name'             : files.target.files[0].name,
            'size'             : files.target.files[0].size,
            'type'             : files.target.files[0].type
         }; 

        const data = {
            campground: {
                title: title,
                location: location,
                price: price,
                description: description
            },
            files: [fileObj]
        };
        console.log(data);
        fetch(`http://localhost:5000/campgrounds/${id}?_method=PUT`, {
            //fetch(('http://localhost:5000/campgrounds/' + id + '?_method=PUT'), {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)

        }).then((res) => {
            console.log("response", res);
            if (res.ok) {
                const id = res.url.split('/');
                history.push({
                    pathname: '/campgrounds/' + id[id.length-1],
                    state: { 
                        from: 'edit'
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
        <div>
        { isDataLoaded ? (     
            <div className="row">
                <h1 className="text-center">Edit Campground</h1>
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
                                <span className="form-file-text custom-file-label">Add more image(s)...</span>                   
                                <Form.File id="imageFile"
                                           type="file"
                                           ref={fileInput}
                                           onChange={setFiles}
                                           multiple
                                           custom
                                />   
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
