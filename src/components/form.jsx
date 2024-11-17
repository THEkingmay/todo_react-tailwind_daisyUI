import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function FormComponents(props) {
    useEffect(() => console.log('Form render'), [])
    useEffect(() => {
        setDescription(props.description)
        if (props.date) {
            const date = new Date(props.date);
            const dateFormatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            setDate(dateFormatted);
        }        
    }, [props.description, props.date])
    // กำหนดค่าเริ่มต้นสำหรับ description และ date จาก props
    const [description, setDescription] = useState(props.description || '')  // ถ้า props ไม่มี description ให้เริ่มต้นเป็น string ว่าง
    const [date, setDate] = useState(props.date || new Date().toISOString().split('T')[0])  // ถ้า props ไม่มี date ให้ใช้วันที่ปัจจุบัน
    const [editTxt,setEditTxt] = useState('ADD')
    
    useEffect(()=>{
        if(props.isEdit){
            setEditTxt('EDIT')
        }else setEditTxt('ADD')
    },[props.isEdit])
    
    const descriptionHandle = (event) => {
        setDescription(event.target.value)
    }
    const dateHandle = (event) => {
        setDate(event.target.value)
    }

    const saveData = (event) => {
        event.preventDefault()
        // ตรวจสอบว่า description และ date ไม่เป็นค่าว่าง
        if (description === '' || date === '') {
            console.log("Data must not be null")
            return
        }
        if(props.isEdit){
            console.log("This is edit")
            props.resetEditStatus()
            props.editKnowIdNewData([description,date],props.idSelected)
            setDescription('')
            setDate(new Date().toISOString().split('T')[0])
            return
        }
    
        const formattedDate = new Date(date).toLocaleDateString('en-US')
        const itemData = {
            id: uuidv4(),
            description,
            writeDate: new Date().toLocaleDateString('en-US'),
            date: formattedDate,
            status: false
        }

        // ส่งข้อมูล itemData ไปยัง parent component (App)
        props.addItem(itemData)

        // รีเซ็ตค่าในฟอร์ม
        setDescription('')
        setDate(new Date().toISOString().split('T')[0])  // รีเซ็ตวันที่เป็นวันที่ปัจจุบัน
    }

    return (
        <div>
            <form className='flex  flex-col items-start'>
                <div className="flex flex-col items-start w-full p-3">
                    <label className='text-l font-bold'>Description</label>
                    <textarea
                        rows="3"
                        cols="50"
                        placeholder="description"
                        onChange={descriptionHandle}
                        value={description}
                        className='textarea border shadow w-full p-3 text-md'
                    />
                </div>
                <div className="flex flex-col flex flex-col items-start w-full p-3">
                    <label className='text-l font-bold'>Date (mm/dd/yyyy)</label>
                    <input
                        type="date"
                        onChange={dateHandle}
                        value={date}
                        className='input border shadow w-full p-3 text-md'
                    />
                </div>
                <div className="w-full flex justify-center">
                    <button className='btn  btn-sm  shadow  w-2/3 p-2 rounded-l' type="submit" onClick={saveData}>{editTxt}</button>
                </div>
            </form>
        </div>
    )
}