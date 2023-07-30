import React from 'react';

function Title({title, handleTitleChange}) {
    return (
        <div className='flex justify-center items-center text-2xl text-white font-extrabold mb-2'>
            <input
                                    defaultValue={title}
                                    onBlur={(e) => { handleTitleChange(title, e.target.value) }}
                                    type="text"
                                    id={`input-${title}`}
                                    autoComplete="off"
                                    className="w-full text-white bg-transparent text-center"
                                />
        </div>
    );
}

export default Title;