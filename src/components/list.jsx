import { useEffect } from 'react'
import ITEM from './item'


const LIST = (props) =>{
    useEffect(()=>console.log("list render"),[])
    const allitem = props.itemList
    return(
          <ul className= 'mt-5'>
                   {allitem.map(e=>{
                        // return <ITEM description={e.description} date={e.date}/>
                        return <ITEM {...e} 
                        deleteItem={props.deleteItem}  
                        editItem={props.editItem} 
                        key={e.id}
                        changeStatus={props.changeStatus}
                        />
                   })}
            </ul>
    )   
}
export default LIST