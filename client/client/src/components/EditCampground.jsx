import { React, useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Field, useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function EditCampground() {

    let { id } = useParams();
    const history = useHistory();
    const [campgroundState, setCampgroundState] = useState(null);
    const [isDataLoaded, setLoaded] = useState(false);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

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
                console.log(campgroundState, title);
            } catch (error) {}
        }
        fetchData();
        console.log(campgroundState, title);
    }, []);

    const validationSchema = yup.object({
        title: yup
          .string('Enter your title')
          .required('title is required'),
        location: yup
          .string('Enter your location')
          .min(3, 'Location should be of minimum 3 characters length')
          .required('location is required'),
        price: yup
          .number('Enter your price')
          .min(1, 'Price should be of minimum of $1')
          .required('price is required'),
        description: yup
          .string('Enter your description')
          .min(3, 'Description should be of minimum 3 characters length')
          .required('description is required'),
    });

    const formik = useFormik({
        initialValues: {
          title: title, 
          location: location, 
          price: price, 
          description: description 
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const data = {
                campground: {
                    title: values.title,
                    location: values.location,
                    price: values.price,
                    description: values.description
                }
            };
            const formData = new FormData();
            formData.append('campground', JSON.stringify(data.campground));
    
            if (files?.target?.files)  { formData.append('image', files.target.files[0]) };
            if (deleteImages) { formData.append('deleteImages', deleteImages) };
            if (data.campground.location !== location) { formData.append('locationChange', true) };
            setLoaded(false);
    
            fetch(`http://localhost:5000/campgrounds/${id}?_method=PUT`, {
                //fetch(('http://localhost:5000/campgrounds/' + id + '?_method=PUT'), {
                credentials: 'include',
                method: 'POST',
                body: formData
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
        },
    });

    
    return (
        <div>
        <ToastContainer />
        { isDataLoaded ? (
            <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                onChange={formik.handleChange}
                value={formik.values.location}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
            />
            <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />

            <Button
                variant="contained"
                component="label"
            >
            Upload Image
            <input
                type="file"
                id="image"
                ref={fileInput}
                onChange={setFiles}
                hidden
            />
            </Button>
            { campgroundState.images.map((img) => {
                return (
                    <div>
                        <img src={img.url} className="img-thumbnail"></img>
                        <Checkbox
                        id={img.filename}
                        label="Delete?"
                        onChange={ e => {
                            setDeleteImages(prev => [...prev, e.target.id]);
                        }}    
                        />
                        <p>Delete Image?</p>
                    </div>
                )
            })}
            <Button color="primary" variant="contained" fullWidth type="submit">
                Edit Campground
            </Button>
            </form>
        ) : (
              <FontAwesomeIcon className="icon" icon="sun" size="7x" spin />
            )
    }
    </div>);
};
//     const handleTitleChange = (e) => { setTitle(e.target.value) };
//     const handlePriceChange = (e) => { setPrice(e.target.value) };
//     const handleDescriptionChange = (e) => { setDescription(e.target.value) };
//     const handleLocationChange = (e) => { setLocation(e.target.value) };

//     return (
//         <div>
//         { isDataLoaded ? (     
//             <div className="row">
//                 <h1 className="text-center">Edit Campground</h1>
//                 <div className="col-md-6 offset-md-3 ">
//                     <Form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <Form.Group controlId="title" >
//                                 <Form.Label>Title</Form.Label>
//                                 <Form.Control type="text" 
//                                               name="title"  
//                                               value={title} 
//                                               onChange={handleTitleChange}/>
//                             </Form.Group>
//                         </div>
//                         <div className="mb-3">
//                             <Form.Group controlId="location" >
//                                 <Form.Label>Location</Form.Label>
//                                 <Form.Control type="text" 
//                                               name="location"  
//                                               value={location}
//                                               onChange={handleLocationChange}/>
//                             </Form.Group>
//                         </div>
//                         <div className="mb-3">
//                             <Form.Group controlId="price" >
//                                 <Form.Label>Campground Price</Form.Label>
//                                 <Form.Control type="number" 
//                                               name="price"  
//                                               value={price} 
//                                               onChange={handlePriceChange}/>
//                             </Form.Group>
//                         </div>
//                         <div className="mb-3">
//                             <Form.Group controlId="description" >
//                                 <Form.Label>Description</Form.Label>
//                                 <Form.Control type="text" 
//                                               name="description"   
//                                               value={description} 
//                                               onChange={handleDescriptionChange}/>
//                             </Form.Group>
//                         </div>
//                         <div className="mb-3">
//                             <Form.Group controlId="imageFiles" >
//                                 <span className="form-file-text custom-file-label">Add more image(s)...</span>                   
//                                 <Form.File id="imageFile"
//                                            name="image"
//                                            type="file"
//                                            ref={fileInput}
//                                            onChange={setFiles}
//                                            multiple
//                                            custom
//                                 />   
//                             </Form.Group>
//                             <Form.Group controlId="deleteImages" >
//                                 { campgroundState.images.map((img) => {
//                                     return (
//                                         <>
//                                             <img src={img.url} className="img-thumbnail"></img>
//                                             <Form.Check 
//                                             type='checkbox'
//                                             id={img.filename}
//                                             label='Delete?'
//                                             onChange={ e => {
//                                                 setDeleteImages(prev => [...prev, e.target.id]);
//                                               }
//                                             }
//                                             />
//                                         </>
//                                     )
//                                 })}
//                             </Form.Group>
//                         </div>
//                         <Button variant="info" type="submit">Update Campground</Button>{' '}
//                     </Form>
//                 </div>
//             </div>
//             ) : (<Spinner animation="border" />)
//         }
//         </div>
//     )
