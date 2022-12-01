import React, { useState } from "react"
import { useFormik } from "formik"
import { errorHelper } from "utils/tools"
import * as Yup from 'yup'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Button, Collapse, List, ListItem, ListItemText, TextField } from "@material-ui/core"


const RangeSelect = (props) => {

    const [open, setOpen] = useState(props.initState)

    const handleCollapseOpen = () => setOpen(!open)

    const formik = useFormik({
        initialValues: { min: 0, max: 10000 },
        validationSchema: Yup.object({
            min: Yup.number().min(0, 'The minimum is 0'),
            max: Yup.number().max(10000, 'The max is 10000')
        }),
        onSubmit: (values) => {
            props.handleRange([values.min, values.max])
        }
    })
    return (
        <div className="collapse_items_wrapper">
            <List>
                <ListItem onClick={handleCollapseOpen} >
                    <ListItemText
                        primary={props.title}
                        className='collapse_title'
                    />
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </ListItem>
                <Collapse in={open} timeout='auto'>
                    <List component="div" disablePadding>
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <div>
                                <TextField
                                    placeholder='€ Min'
                                    name="min"
                                    variant="outlined"
                                    type='number'
                                    {...formik.getFieldProps('min')}
                                    {...errorHelper(formik, 'min')}
                                />
                            </div>
                            <br />
                            <div>
                                <TextField
                                    placeholder='€ Max'
                                    name="max"
                                    variant="outlined"
                                    type='number'
                                    {...formik.getFieldProps('max')}
                                    {...errorHelper(formik, 'max')}
                                />
                            </div>
                            <Button
                                color="secondary"
                                size="small"
                                variant="outlined"
                                type="submit"
                                className="mt-3"
                            >
                                Search
                            </Button>
                        </form>
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default RangeSelect 