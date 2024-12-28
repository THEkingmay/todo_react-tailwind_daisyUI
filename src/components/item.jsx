import PropTypes  from 'prop-types'
import { useEffect, useState } from 'react'
import React from 'react';

const ITEM = ({
    id,
    description,
    writeDate,
    date,status,
    deleteItem,
    editItem,
    changeStatus,
}) =>{
    useEffect(()=>console.log("item render"),[])
    const [isCheck , setCheck ] = useState(status)
    return(
    <li className={` p-2 rounded-md shadow mt-2 border flex justify-between `}>
       <div className="w-3/4 flex flex-col  items-start border-r">
                <div className='w-full text-start p-2'>
                    <span className='underline font-bold'>
                        Description
                    </span>
                    <br />
                    <span className={`break-words text-lg ${isCheck?"line-through":""}`}>
                    {description.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                        {line}
                        <br />
                        </React.Fragment>
                    ))}
                    </span>
                </div>
                <div className={`w-full text-start p-2 border-t text-md ${isCheck?"line-through":""}`}>
                    <div>write  , {writeDate}</div>
                    <div>date  , {date} </div>
                </div>
       </div>
        <div className='ml-2 flex flex-col w-1/4 '>
                <button className='btn btn-sm  shadow  text-xs rounded-md ' onClick={()=>editItem(id)}>EDIT</button>
                <button className='btn mt-2 btn-sm shadow  text-xs rounded-md' onClick={()=>deleteItem(id)}>DELETE</button>
                <div className='mt-2 '><input  className="checkbox" type="checkBox" defaultChecked={isCheck} onChange={()=>{{changeStatus(id)};setCheck(!isCheck)}}/></div>
        </div>
    </li>
    )
}


ITEM.propTypes={
    description:PropTypes.string.isRequired,
    date:PropTypes.string.isRequired
}
export default ITEM
