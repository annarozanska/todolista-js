let todoInput //miejsce gdzie użytkownik wpisuje treść zadania
let errorinfo //info o braku zadania
let addBtn //przycisk add - dodaje nowe elementy do listy
let ulList //lista zadań
let newTodo //nowo dodane li, nowe zadanie

let popup // popup
let popupInfo // tekst w popupie, jak sie doda pusty tekst
let todoToEdit // eddytowanie todo
let popupInput // input w popupie
let popupAddBtn // przycisk zatwierdz w popupie
let popupCloseBtn // przycisk zamknij w popupie



const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    //pobieramy wszystkie elementy
    todoInput = document.querySelector('.todo-input')
    errorinfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput =  document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
    
}

const prepareDOMEvents = () => {
    //nadajemy nasłuchiwanie
    addBtn.addEventListener('click', addNewTodo)
    ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closeTodo)
    popupAddBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterKey)
}


/*
1.tworzymy nowy element /li
2.dodajemy nowy element do ul listy
3.funkcja odpala się na click w przycisku add
4.przekazuje treśc z input i umieszcza ją w nowo utworzonym li
5.funkcja nie dodaje do listy pustego todusa
*/

const addNewTodo = () => {
    if(todoInput.value !== '') {
        newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        createTools() //wywołanie funkcjji z narzędziami
        ulList.appendChild(newTodo)

        todoInput.value = ''
        errorinfo.textContent = ''
    } else {
        errorinfo.textContent = 'Wpisz treść zadania'
    }
}


// funkcja z narzędziami

/*
1.tworzy diva tools
2.dodać klasę tools
3.stworzyć trzy przyciski
4.umieśćić w przyciskach odpowiednią treść i klas
*/

const createTools = () => {
    
    const newTools = document.createElement('div')
    newTools.classList.add('tools')
    newTodo.append(newTools) //dowołanie do nowego todo z funkcji addNewTodo
    
    const completedBtn = document.createElement('button')
    completedBtn.classList.add('complete')
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
    //dodanie do diva
    newTools.append(completedBtn, editBtn, deleteBtn)
}

/* funkcja wykrywajaca kliknięcie w przycisk x lub ok na todusie
*/

const checkClick = e => {
    if(e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if (e.target.matches('.edit')) {
        editTodo(e)
    } else if (e.target.matches('.delete')) {
        deleteTodo(e)
    }
}


/*
popup - funkcja otwierająca i zamykajaca popup
*/

const editTodo = e => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
    console.log(todoToEdit.firstChild);
    popup.style.display = 'flex'
}

const closeTodo = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

/* zmiany w odusie */

const changeTodoText = () => {
    if(popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        popup.style.display = 'none'
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Musisz podać jakąś treść'
    }
}

/* funckja usuwająca elementy z listy */

const deleteTodo = e => {
    e.target.closest('li').remove()

    const allTodo = ulList.querySelectorAll('li')

    if(allTodo.length === 0) {
        errorinfo.textContent = 'Brak zadań na liści.'
    }
}

/* klikniecie entera */

const enterKey = e => {
    if(e.key === 'Enter') {
        addNewTodo()
    }
}





//załaduje się DOM to odpali main
document.addEventListener('DOMContentLoaded', main)