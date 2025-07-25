import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"


const SearchBox = () => {

    const navigate = useNavigate()
    const {keyword: urlKeyword} = useParams()
    const [keyword, setKeyword] = useState(urlKeyword|| '')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
          navigate(`/search/${keyword}`)
          setKeyword('')
        }else{
          navigate('/')
        }
    }

    useEffect(()=>{

    },[])

  return (
    <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control 
        type="text"
        name='a'
        placeholder="Search products"
        value={keyword}
        onChange={(e)=>setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
        autoComplete="off"
        ></Form.Control>
        <Button type="submit" variant="outline-light" className="p-2 mx-2">
            Search
        </Button>

    </Form>
  )
}

export default SearchBox