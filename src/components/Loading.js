import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({loading}) => {
  return (
    <ClipLoader
        color='#dc3545'
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
  )
}

export default Loading
