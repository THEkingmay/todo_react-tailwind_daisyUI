import LIST from './components/list'
import FormComponents from './components/form'
import { useState,useEffect } from 'react'
import ThemeSwitcher from './components/theme'
export default function App(){
     const [items,setItem] = useState([])
     const [currItemDescription,setDescription] = useState('')
     const [currItemDate, setDate] = useState('')
     const [isEdit,setEditStatus ] = useState(false)
     const [idSelected,setIdSelected ]= useState('')
     const [TODAY,setTODAY] = useState(new Date().toLocaleDateString('en-US'))
     const [theme, setTheme] = useState("");
     const resetEditStatus = () =>{
          setEditStatus(false)
     }
     useEffect(()=>{ 
          console.log('App render')
          setTheme(JSON.parse( localStorage.getItem('localTheme')))
          const storageItem =JSON.parse( localStorage.getItem('storageItem'))
          if(storageItem && storageItem.length>0){
               console.log(storageItem)
               setItem(storageItem)
          }
     },[])

     useEffect(()=>{
          const currentStorage = JSON.stringify(items);
          if (currentStorage !== localStorage.getItem('storageItem')) {
               localStorage.setItem('storageItem', currentStorage);
               console.log("Saved items to localStorage");
          }
          // เลื่อนไปด้านล่าง
          window.scrollTo({
               top: document.documentElement.scrollHeight, // ใช้ scrollHeight เพื่อเลื่อนไปที่ด้านล่างสุด,
               left:0,
               behavior:'smooth'
              })
     },[items])

    const addNewItem = (newItem) =>{
          setItem([...items,newItem])
          console.log("add item app.jsx: ",newItem)
    }
     const deleteItem=(id)=>{
          const userConfirmed = window.confirm("Are you sure you want to delete this?");
          if (!userConfirmed) 
               return
          setItem(items.filter((item)=>item.id!==id))
          console.log("delete item id : ",id)
          if(items.length===1){
               setItem([])      
          }
     }
     const editItem = (id)=>{   
          // เลื่อนหน้าจอไปยังด้านบน
           window.scrollTo({
               top:0,left:0,behavior:'smooth'
           })
          setEditStatus(true)
          const selItem = items.find((item) => item.id === id)
          console.log("edit item : ",selItem)
           // รีเซ็ตค่าก่อนตั้งค่าใหม่
          setDescription('');
          setDate('');
          setIdSelected('');

          // ตั้งค่าใหม่
          setTimeout(() => {
               setDescription(selItem.description);
               setDate(selItem.date);
               setIdSelected(id);
          }, 0); // ใช้ `setTimeout` เพื่อให้ React จัดการ re-render
     }
     const editKnowIdNewData =(newData , id)=>{
          const updatedItems = items.map(e => {
               if (e.id === id) {
                    const formattedDate = new Date(newData[1]);
                   return { ...e, description: newData[0], date: formattedDate.toLocaleDateString('en-US') };
               }
               return e; // คืนค่าเดิมถ้า id ไม่ตรง
           });
          setIdSelected('')
          setItem(updatedItems)
     }
     const changeStatus =(id) =>{
          console.log('change status id : ',id)
          const updatedItems = items.map(e => {
               if (e.id === id) {
                    return {...e,status:!e.status}
               }
               return e; // คืนค่าเดิมถ้า id ไม่ตรง
           });
           setItem(updatedItems)
     }
 
     const handleThemeChange = (e) => {
       const selectedTheme = e.target.value;
       localStorage.setItem('localTheme',JSON.stringify(selectedTheme))
       setTheme(selectedTheme);
       document.documentElement.setAttribute("data-theme", selectedTheme);
     };
     return(
          <div data-theme={theme}className='min-h-screen mx-auto flex flex-col  p-5  text-center shadow-xl'>
                    <ThemeSwitcher handleThemeChange={handleThemeChange} theme={theme}/>
                    <span className='absolute top-0 right-10'>Today : {TODAY}</span>
                    <h1 className="text-3xl font-bold underline">LIST</h1>
                    <FormComponents 
                              addItem={addNewItem} 
                              date={currItemDate} 
                              description={currItemDescription}
                              isEdit={isEdit}
                              resetEditStatus={resetEditStatus}
                              idSelected={idSelected}
                              editKnowIdNewData={editKnowIdNewData}
                         />
                    <LIST 
                         itemList={items}
                         deleteItem={deleteItem} 
                         editItem={editItem}
                         changeStatus={changeStatus}
                         />
          </div>
     )
}