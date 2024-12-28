import { useEffect , useState} from 'react'
import ITEM from './item'


const LIST = (props) =>{
    useEffect(()=>console.log("list render"),[])
    const allitem = props.itemList

    const [showLater,setShowlater ] = useState(false)
    return(
        <>
        <div className='flex mt-5  font-bold'>
            <div><button className={`p-3  ${showLater?'':'underline shadow rounded border'}`} onClick={()=>setShowlater(false)}>Soon !!</button></div>
            <div> <button className={`p-3  ${showLater?'underline shadow  rounded border':''}`} onClick={()=>setShowlater(true)}>Later..</button></div>
        </div>
          <ul>
                   {allitem.map(e=>{
                        // return <ITEM description={e.description} date={e.date}/>
                      if((e.isLater==false || e.isLater==null) && !showLater ){
                            return <ITEM {...e} 
                            deleteItem={props.deleteItem}  
                            editItem={props.editItem} 
                            key={e.id}
                            changeStatus={props.changeStatus}
                            />
                      }else if(e.isLater==true  && showLater){
                        return <ITEM {...e} 
                            deleteItem={props.deleteItem}  
                            editItem={props.editItem} 
                            key={e.id}
                            changeStatus={props.changeStatus}
                            />
                      }
                   })}
            </ul>
        </>
    )   
}
export default LIST