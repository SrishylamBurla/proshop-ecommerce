
import { Spinner } from 'react-bootstrap'

export const Loader = () => {
  return (
    <Spinner 
        animation='border'
        style={{
            width: "80px",
            height:"80px",
            margin: "auto",
            display: 'block',

        }}
    ></Spinner>
  )
}
