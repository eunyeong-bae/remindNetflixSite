import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({loading}) => {
  return (
    <div style={{width:'100%',height:'100%',display:'flex', alignItems:'center', justifyContent:'center'}}>
      <ClipLoader
        color='#dc3545'
        loading={loading}
        size={250}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loading
