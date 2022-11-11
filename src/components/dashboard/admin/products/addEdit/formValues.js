import * as Yup from 'yup'

export const formValues = {
    model: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    available: '',
    shipping: false
}

export const validation = () => (
    Yup.object({
        model: Yup.string().required('Sorry, the model is required'),
        brand: Yup.string().required('Sorry, the brand  is required'),
        category: Yup.string().required('Sorry, the category  is required'),
        description: Yup.string().required('Sorry, the description  is required'),
        price: Yup.number().required('Sorry, the price  is required'),
        available: Yup.number().required('Do we have stock?'),
        shipping: Yup.boolean().required('Do we offer shipping?')
    })
)