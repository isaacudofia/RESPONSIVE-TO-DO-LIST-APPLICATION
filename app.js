const inputField = document.querySelector('input')
const addButton = document.querySelector('.add-to-list')
const outputDisplay = document.querySelector('.output-display')
const deleteButton = document.querySelector('.delete-btn')
const dialogDisplay = document.querySelector('.dialog')
var dataArray = []
var editedValue = ''
var targeteditedValue
var editedUniqueID


const checkEventListener = addButton.addEventListener('click', ()=>{
    const inputValue = inputField.value
    const uniqueID = Math.random()
    const data = {uniqueID, inputValue}

    //ADD ITEM IF THE INPUT LENGTH IS GREATER THAN ONE AND CLEAR AFTER ADDING ITEM
    if(inputValue.length > 0 && addButton.textContent === 'ADD TO LIST'){
     dataArray.push(data)
     inputField.value = ''
     dialogDisplay.textContent = 'LIST ADDED SUCCESSFULLY'
     dialogDisplay.style.display = 'block'
     setTimeout(()=> dialogDisplay.style.display = 'none', 3000)

     //ADD DETAILS OF ARRAY TO OUTPUT SCREEN
      outputDisplay.innerHTML = dataArray.map((list)=>{
       return`
        <div class="list">
        <div class="input-detail">
        <p>${list.inputValue}</p>
        </div>
        <div class='action-button'>
        <div class="edit-btn" onclick=editAction(${list.uniqueID}) >EDIT</div>
        <div class="delete-btn" onclick=deleteAction(${list.uniqueID})>DELETE</div>
        </div>
        </div>`
      }).join('')
    }else if(editedValue.length > 0 && addButton.textContent === 'EDIT LIST'){
        let newEditedValue
        if(inputField.value.length > 0){
          newEditedValue = inputField.value
          dialogDisplay.textContent = 'LIST EDITED SUCCESSFULLY'
          dialogDisplay.style.display = 'block'
          setTimeout(()=> dialogDisplay.style.display = 'none', 3000)
        }else{
          newEditedValue = targeteditedValue
          dialogDisplay.style.display = 'none'
        }     
        const editedDataArray = dataArray.map((list)=> list.uniqueID === editedUniqueID ? {...list, inputValue: newEditedValue}: list)
        dataArray = editedDataArray
      outputDisplay.innerHTML = dataArray.map((list)=>{
        return`
         <div class="list">
         <div class="input-detail">
         <p>${list.inputValue}</p>
         </div>
         <div class='action-button'>
         <div class="edit-btn" onclick=editAction(${list.uniqueID}) >EDIT</div>
         <div class="delete-btn" onclick=deleteAction(${list.uniqueID})>DELETE</div>
         </div>
         </div>`
       }).join('')

       addButton.textContent = 'ADD TO LIST'
       inputField.value = ''
    }
})


const deleteAction =(uniqueID)=>{
    const newDataArray = dataArray.filter((list)=> list.uniqueID !== uniqueID)
    dataArray = newDataArray
    dialogDisplay.textContent = 'LIST DELETED SUCCESSFULLY'
    dialogDisplay.style.display = 'block'
    setTimeout(()=> dialogDisplay.style.display = 'none', 3000)
    
    //ADD DETAILS OF ARRAY AFTER FILTER OR DELETING TO OUTPUT SCREEN
    outputDisplay.innerHTML = dataArray.map((newList)=>{
      return`
        <div class="list">
        <div class="input-detail">
        <p>${newList.inputValue}</p>
        </div>
        <div class='action-button'>
        <div class="edit-btn" onclick=editAction(${newList.uniqueID}) >EDIT</div>
        <div class="delete-btn" onclick=deleteAction(${newList.uniqueID})>DELETE</div>
        </div>
        </div>`
    }).join('')
}

const editAction =(uniqueID)=>{
   const findDataObject = dataArray.find((list)=>list.uniqueID == uniqueID)
  //EDIT THE ITEM THAT MATCH THE UNIQUE ID
    inputField.value = findDataObject.inputValue
    editedValue = inputField.value
    addButton.textContent = 'EDIT LIST'
    editedUniqueID = findDataObject.uniqueID
    targeteditedValue = findDataObject.inputValue
}
