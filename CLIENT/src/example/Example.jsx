import React, { useEffect, useState } from 'react'

const Example = () => {

    const [value, setValue] = useState()
    const onHandValue = (val) => setValue(val)

    useEffect(() => {
        console.log('called')
    }, [])

    return (
        <div>
            Example: {value}
            <button onClick={() => onHandValue('awefawef')}>click</button>
        </div>
    )
}

export default Example