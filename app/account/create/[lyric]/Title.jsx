import React from 'react';

function Title({title}) {
    return (
        <div className='flex justify-center items-center text-2xl text-white font-extrabold mb-2'>
            {title}
        </div>
    );
}

export default Title;