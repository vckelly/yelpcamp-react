import { React, useEffect, useState } from 'react'
import { Redirect, useParams, useHistory } from "react-router-dom"; 
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'


import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function NewCampground() {

    const history = useHistory();
    const [redirect, setRedirect] = useState(false);
     

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
          title: '',
          location: '',
          price: 1,
          description: '',
          image: null
        },
        validationSchema: validationSchema,
        //TODO: Convert to field-data for file upload? 
        onSubmit: (values) => {
            const data = {
                campground: {
                    title: values.title,
                    location: values.location,
                    price: values.price,
                    description: values.description
                },
                files: [values.image ? values.image : '']
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
                else {
                    //formik.resetForm();
                }
                //TODO: Error handling
            })
        },
    });

    
    return (
    <div>
        <form onSubmit={formik.handleSubmit}>
        <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
            fullWidth
            id="location"
            name="location"
            label="Location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
        />
        <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
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
          value={formik.values.image}
          onChange={formik.handleChange}
          hidden
        />
        </Button>
        <Button color="primary" variant="contained" fullWidth type="submit">
            Add Campground
        </Button>
        </form>
    </div>
    );
};

